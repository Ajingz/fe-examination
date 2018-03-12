/*
* @Author: user
* @Date:   2017-09-01 20:31:08
* @Last Modified by:   user
* @Last Modified time: 2017-09-08 12:49:43
*/
'use strict';
require('./index.css');
var nav = require('page/common/nav/index.js');
require('page/common/header/index.js');
var _im = require('util/im.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');


var page = {
	data :{

	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadCart();
	},
	bindEvent :function(){
		var _this = this;
		//选中/取消选中购物车商品
		$(document).on('click','.cart-select',function(){
			var $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');
			//切换选中状态
			if($this.is(':checked')){
				_cart.selectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
			//取消选中
			else{
				_cart.unselectProduct(productId,function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
		});
		//全选/取消全选购物车商品
		$(document).on('click','.cart-select-all',function(){
			var $this = $(this);
			if($this.is(':checked')){
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			}
			//取消全选
			else{
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				},function(errMsg){
					_this.showCartError();
				});
			};
		});
		//商品数量加减
		$(document).on('click','.count-btn',function(){
			var type        = $(this).hasClass('plus') ? 'plus' : 'minus',
                $pCount     = $(this).siblings('.count-input'),
                currCount   = parseInt($pCount.val()),
                productId   = $(this).parents('.cart-table').data('product-id'),
                minCount    = 1,
                maxCount    = $pCount.data('max') || 1,
                newCount    = 0;
           if(type === 'plus'){
                if(currCount >= maxCount){
                    _im.errorTips('该商品数量已达到上限');
                    return;
                }
                newCount = currCount + 1;
            }else if(type === 'minus'){
                if(currCount <= minCount){
                    return;
                }
                newCount = currCount - 1;
            };
            _cart.updateProduct({
            	productId : productId,
            	count　: newCount　
            },function(res){
				_this.renderCart(res);
			},function(errMsg){
				_this.showCartError();
			});
		});
		//删除单个商品
		$(document).on('click','.cart-delete',function(){
			if(window.confirm('确认要删除该商品？')){
				var productId   = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		//删除选中商品
		$(document).on('click','.delete-selected',function(){
			if(window.confirm('确认要删除选中商品？')){
				var arrProductIds = [],
					$selectedItem = $('.cart-select:checked');
				for(var i = 0, iLength = $selectedItem.length; i<iLength;i++ ) {
					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}  
				if(arrProductIds.length){
					_this.deleteCartProduct(arrProductIds.join(','));
				}
				else{
					_im.errorTips('您还没有选中要删除的商品');
				}

			}
		});
		//提交购物车
		$(document).on('click','.btn-submit',function(){
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
				window.location.href = "./order-confirm.html";
			}else{
				_im.errorTips('请选择商品后再提交');
			}
		});
	},
	//加载购物车
	loadCart :function(){
		var _this =this;
		//获取购物车列表
		_cart.getCartList(function(res){
			_this.renderCart(res);
		},function(errMsg){
			_this.showCartError();
		});			
	},
	//渲染购物车
	renderCart : function(data){
		this.filter(data);
		//缓存购物车信息
		this.data.cartInfo = data;
		//生成html
		var cartHtml = _im.renderHtml(templateIndex,data);
		$('.page-wrap').html(cartHtml);
		//更新导航条购物车数量
		nav.loadCartCount();
	},
	//显示错误信息
	showCartError : function(){
		$('.page-wrap').html('<p class="err-tip">哪里不对了，刷新下试试吧</p>')
	},
	//删除指定商品，支持批量
	deleteCartProduct :function(productIds){
		var _this = this;
        _cart.deleteCartProduct(productIds, function(res){
            _this.renderCart(res);
        }, function(errMsg){
            _this.showCartError();
        });
	},
	filter : function(data){
 		data.notEmpty = !!data.cartProductVoList.length;
	}
};
$(function(){
	page.init();
})

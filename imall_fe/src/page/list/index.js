/*
* @Author: user
* @Date:   2017-09-01 20:31:08
* @Last Modified by:   user
* @Last Modified time: 2017-09-04 00:07:35
*/
'use strict';
require('./index.css');
var _im = require('util/im.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');
var Pagination = require('util/pagination/index.js');

var page = {
	data :{
		listParam : {
			keyword : _im.getUrlParam('keyword') || '',
			categoryId : _im.getUrlParam('categoryId') || '',
			orderBy : _im.getUrlParam('orderBy') || 'default',
			pageNum : _im.getUrlParam('pageNum') || 1,
			pageSize : _im.getUrlParam('pageSize') || 1
		}
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadList();
	},
	bindEvent :function(){
		var _this=this;
		$('.sort-item').click(function(){
			var $this = $(this);
				_this.data.listParam.pageNum = 1;
			//点击默认排序
			if($this.data('type')==='default'){
				//已经是active样式
				if($this.hasClass('active')){
					return;
				}else{
					$this.addClass('active').sublings('.sort-item')
						.removeClass('active asc desc');
						_this.data.listParam.orderBy = 'default';
				}
			}
			//点击价格排序
			else{
				if($this.data('type')==='price'){
					$this.addClass('active').siblings('.sort-item')
						.removeClass('active asc desc');
					//判断升序降序
					if(!$this.hasClass('asc')){
						$this.addClass('asc').removeClass('desc');
						_this.data.listParam.orderBy = 'price_asc';
					}else{
						$this.addClass('desc').removeClass('asc');
						_this.data.listParam.orderBy = 'price_desc';
					}
				}
			}
			_this.loadList();
		});
	},
	//加载list
	loadList :function(){
		var _this = this,
			listHtml ='',
			listParam = this.data.listParam,
			$pListCon = $('.p-list-con');
		$pListCon.html('<div class="loading"></div>');
		//删除参数中不必要的字段
		listParam.categoryId ? 
		(delete listParam.keyword) : (delete listParam.categoryId);
		_product.getProductList(listParam,function(res){
			listHtml = _im.renderHtml(templateIndex, {
				list : res.list
			});
			$pListCon.html(listHtml);
			_this.loadPageination({
				hasPreviousPage :res.hasPreviousPage,
				prePage : res.prePage,
				hasNextPage :res.hasNextPage,
				nextPage : res.nextPage,
				pageNum : res.pageNum,
				pages : res.pages
			});
		},function(errMsg){
			_im.errorTips(errMsg)
		})
	},
	//加载分页信息
	loadPageination : function(pageInfo){
		var _this=this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({},pageInfo,{
			container : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum=pageNum;
				_this.loadList();
			}
		}));
	}
};
$(function(){
	page.init();
})

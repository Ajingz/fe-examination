/*
* @Author: user
* @Date:   2017-07-26 21:21:04
* @Last Modified by:   user
* @Last Modified time: 2017-09-06 16:25:10
*/

'use strict';

var _im = require('util/im.js');
var _cart ={
	//获取购物车数量
	getCartCount : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error : reject
		})
	},
	//添加到购物车
	addToCart : function(productInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/add.do'),
			data : productInfo,
			success : resolve,
			error : reject
		})
	},
	//获取购物车
	getCartList : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/list.do'),
			success : resolve,
			error : reject
		})
	},
	//选中购物车商品
	selectProduct : function(productId,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/select.do'),
			data : {
				productId : productId
			},
			success : resolve,
			error : reject
		})
	},
	//取消选中购物车商品
	unselectProduct : function(productId,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/un_select.do'),
			data : {
				productId : productId,
			},
			success : resolve,
			error : reject
		})
	},
	//全选购物车商品
	selectAllProduct : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/select_all.do'),
			success : resolve,
			error : reject
		})
	},
	//取消全选购物车商品
	unselectAllProduct : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/un_select_all.do'),
			success : resolve,
			error : reject
		})
	},
	//更新购物车商品数量
	updateProduct : function(productInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/update.do'),
			data : productInfo,
			success : resolve,
			error : reject
		})
	},
	//删除指定商品
	deleteCartProduct : function(productIds,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/cart/delete_product.do'),
			data : {
				productIds : productIds,
			},
			success : resolve,
			error : reject
		})
	}
}
module.exports = _cart;
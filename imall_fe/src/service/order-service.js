/*
* @Author: user
* @Date:   2017-09-07 11:41:58
* @Last Modified by:   user
* @Last Modified time: 2017-09-13 14:14:25
*/
'use strict';

var _im = require('util/im.js');
var _order ={
	//获取商品列表
	getProductList : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/order/get_order_cart_product.do'),
			success : resolve,
            error   : reject
		})
	},
	//提交订单
	createOrder : function(orderInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/order/create.do'),
			data : orderInfo,
			success : resolve,
            error   : reject
		})
	},
	//获取订单信息
	getOrderList : function(listParam,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/order/list.do'),
			data : listParam,
			success : resolve,
            error   : reject
		})
	},
	//订单详情
	getOrderDetail : function(orderNumber,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/order/detail.do'),
			data : {
				orderNo : orderNumber
			},
			success : resolve,
            error   : reject
		})
	},
	//取消订单
	cancelOrder : function(orderNumber,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/order/cancel.do'),
			data : {
				orderNo : orderNumber
			},
			success : resolve,
            error   : reject
		})
	},
}
module.exports = _order;
/*
* @Author: user
* @Date:   2017-08-30 10:41:29
* @Last Modified by:   user
* @Last Modified time: 2017-09-13 14:17:20
*/
'use strict';
require('./index.css');
var _im = require('util/im.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');
var _order = require('service/order-service.js');

//page逻辑部分
var page = {
	data :{
		orderNumber : _im.getUrlParam('orderNumber')
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad :function(){
		navSide.init({
			name : 'order-detail'
		});
		this.loadDetail();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click','.order-cancel',function(){
			if(window.confirm('确认要取消该订单吗')){
				_order.cancelOrder(_this.data.orderNumber,function(res){
					_im.successTips('该订单取消成功');
					_this.loadDetail();				
				},function(errMsg){
					_im.errorTips(errMsg);
		});
			}
		})
	},
	//加载订单列表
	loadDetail : function(){
		var _this = this,
			orderDetailHtml = '',
			$content = $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(_this.data.orderNumber,function(res){
			_this.dataFilter(res);
			//渲染html
			orderDetailHtml = _im.renderHtml(templateIndex,res);
			$content.html(orderDetailHtml);
		},function(errMsg){
			$content.html('<p class="err-tip">'+ errMsg +'</p>');
		});
	},
	dataFilter : function(data){
		data.needPay = data.status ===10;
		data.isCancelable = data.status ===10;
	},
};

$(function(){
	page.init();
})
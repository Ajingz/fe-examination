/*
* @Author: user
* @Date:   2017-08-30 10:41:29
* @Last Modified by:   user
* @Last Modified time: 2017-09-13 20:34:35
*/
'use strict';
require('./index.css');
var _im = require('util/im.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var templateIndex = require('./index.string');
var _payment = require('service/payment-service.js');

//page逻辑部分
var page = {
	data :{
		orderNumber : _im.getUrlParam('orderNumber')
	},
	init:function(){
		this.onLoad();
	},
	onLoad :function(){
		this.loadPaymentInfo();
	},
	
	//加载Z
	loadPaymentInfo : function(){
		var _this = this,
			paymentHtml = '',
			$pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(_this.data.orderNumber,function(res){
			//渲染html
			paymentHtml = _im.renderHtml(templateIndex,res);
			$pageWrap.html(paymentHtml);
			_this.listOrderStatus();
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">'+ errMsg +'</p>');
		});
	},
	//监听订单状态
	listOrderStatus :function(){
		var _this = this;
		_this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber,function(res){
				if(res === true){
					window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			},function(errMsg){

			},5e3)
		})
	}

};

$(function(){
	page.init();
})
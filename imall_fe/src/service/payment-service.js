/*
* @Author: user
* @Date:   2017-09-13 16:19:04
* @Last Modified by:   user
* @Last Modified time: 2017-09-13 16:42:44
*/
'use strict';

var _im = require('util/im.js');
var _payment ={

	//获取支付信息
	getPaymentInfo : function(orderNumber,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/order/pay.do'),
			data : {
				orderNo : orderNumber
			},
			success : resolve,
            error   : reject
		})
	},
	//获取订单状态
	getPaymentStatus : function(orderNumber,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/order/query_order_pay_status.do'),
			data : {
				orderNo : orderNumber
			},
			success : resolve,
            error   : reject
		})
	},

}
module.exports = _payment;
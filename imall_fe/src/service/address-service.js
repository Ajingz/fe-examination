/*
* @Author: user
* @Date:   2017-09-07 17:52:00
* @Last Modified by:   user
* @Last Modified time: 2017-09-12 17:16:59
*/
'use strict';

var _im = require('util/im.js');
var _address ={
	//获取地址列表
	getAddressList : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/shipping/list.do'),
			data :{
				pageSize : 50
			},
			success : resolve,
            error   : reject
		})
	},
	//新建地址
	save : function(addressInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/shipping/add.do'),
			data :addressInfo,
			success : resolve,
            error   : reject
		})
	},
	//更细地址
	update : function(addressInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/shipping/update.do'),
			data :addressInfo,
			success : resolve,
            error   : reject
		})
	},
	//删除地址
	deleteAddress : function(shippingId,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/shipping/del.do'),
			data :{
				shippingId : shippingId
			},
			success : resolve,
            error   : reject
		})
	},
	//获取单条地址信息
	getAddress : function(shippingId,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/shipping/select.do'),
			data :{
				shippingId : shippingId
			},
			success : resolve,
            error   : reject
		})
	},
}
module.exports = _address;
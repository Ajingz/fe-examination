/*
* @Author: user
* @Date:   2017-07-26 21:21:04
* @Last Modified by:   user
* @Last Modified time: 2017-09-04 20:51:40
*/

'use strict';

var _im = require('util/im.js');
var _product ={
	//获取商品列表
	getProductList : function(listParam,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/product/list.do'),
			data : listParam,
			success : resolve,
            error   : reject
		})
	},
	//获取商品详细信息
	getProductDetail : function(productId,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/product/detail.do'),
			data : {
				productId : productId
			},
			success : resolve,
            error   : reject
		})
	},

}
module.exports = _product;
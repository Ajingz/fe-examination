/*
* @Author: user
* @Date:   2017-07-26 11:52:54
* @Last Modified by:   user
* @Last Modified time: 2017-08-29 21:20:28
*/

'use strict';
require('./index.css');
var _im = require('util/im.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

//导航条
var nav={
	init : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;//链式操作中，指向调用者
	},
	bindEvent:function(){
		//登录点击事件
		$('.js-login').click(function(){
			_im.doLogin();
		})
		//注册点击事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		})
		//退出事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(err){
				_im.errorTips(err);
			});
		})
	},
	//加载用户信息
	loadUserInfo:function(){
		_user.checkLogin(function(res){
				 $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
			},function(err){
				//do nothing;
			});
	},
	//加载购物车数量
	loadCartCount:function(){
		_cart.getCartCount(function(res){
				$('.nav .cart-cont').text(res||0);
			},function(err){
				$('.nav .cart-cont').text(0);
			});		
	},
};

module.exports = nav.init();
/*
* @Author: user
* @Date:   2017-08-30 10:41:29
* @Last Modified by:   user
* @Last Modified time: 2017-08-30 14:12:27
*/
'use strict';
require('./index.css');
var _im = require('util/im.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateIndex = require('./index.string');
var _user = require('service/user-service.js');


//page逻辑部分
var page = {
	init:function(){
		this.onLoad();
	},
	onLoad :function(){
		navSide.init({
			name : 'user-center'
		})
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml= _im.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_im.errorTips(errMsg);
		})
	}
	
};

$(function(){
	page.init();
})
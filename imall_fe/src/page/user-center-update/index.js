/*
* @Author: user
* @Date:   2017-08-30 10:41:29
* @Last Modified by:   user
* @Last Modified time: 2017-08-31 00:29:13
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
		this.bindEvent();
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
	},
	//验证字段信息
	validateForm : function(formData){
		var result={
			status : false,
			msg    : ''
		};
		if(!_im.validate(formData.phone,'phone')){
			result.msg='手机号格式不正确';
			return result;
		};
		if(!_im.validate(formData.email,'email')){
			result.msg='邮箱格式不正确';
			return result;
		};
		if(!_im.validate(formData.question,'require')){
			result.msg='提示问题不能为空';
			return result;
		};
		if(!_im.validate(formData.answer,'require')){
			result.msg='提示问题答案不能为空';
			return result;
		};
		//验证通过，返回正确提示
		result.status = true;
		result.msg='验证通过';
		return result;
	},
	bindEvent : function(){
		var _this=this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone : $.trim($('#phone').val()),
				email : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer : $.trim($('#answer').val())
			},

			validateResult = _this.validateForm(userInfo);

			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res,msg){
					_im.successTips(msg);
					window.location.href = './user-center.html';
				},
					function(errMsg){
						_im.errorTips(errMsg);
				})
			}//验证失败
			else{
				//错误提示
				_im.errorTips(validateResult.msg);
			};	
		});

	},		
};

$(function(){
	page.init();
})
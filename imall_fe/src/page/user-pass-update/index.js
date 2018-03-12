/*
* @Author: user
* @Date:   2017-08-30 10:41:29
* @Last Modified by:   user
* @Last Modified time: 2017-08-31 14:30:02
*/
'use strict';
require('./index.css');
var _im = require('util/im.js');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');


//page逻辑部分
var page = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	//加载侧栏
	onLoad :function(){
		navSide.init({
			name : 'user-pass-update'
		})
	},
	//验证字段信息
	validateForm : function(formData){
		var result={
			status : false,
			msg    : ''
		};
		if(!_im.validate(formData.password,'require')){
			result.msg='原密码不能为空';
			return result;
		};
		if(!formData.passwordNew ||formData.passwordNew.length < 6){
			result.msg='密码长度不能少于6位';
			return result;
		};
		if(formData.passwordNew!= formData.passwordConfirm){
			result.msg='两次输入密码不一致';
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
				password : $.trim($('#password').val()),
				passwordNew : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val()),
			},

			validateResult = _this.validateForm(userInfo);

			if(validateResult.status){
				//更改密码
				_user.updatepassword({
					passwordOld : userInfo.password ,
					passwordNew : userInfo.passwordNew
				},function(res,msg){
					_im.successTips(msg);
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
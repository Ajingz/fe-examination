/*
* @Author: user
* @Date:   2017-07-22 18:09:50
* @Last Modified by:   user
* @Last Modified time: 2017-08-28 23:22:16
*/

'use strict';
require('./index.css');
var _im = require('util/im.js');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
	show  :function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide :function(){
		$('.error-item').hide().find('.err-msg').text();
	}
};
//page逻辑部分
var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent :function(){
		var _this=this;
		//登录按钮点击
		$('#submit').click(function(){
			_this.submit();
		});
		//按下回车提交
		$('user-content').keyup(function(){
			if(e.keyCode ===13){
				_this.submit();
			}
		});
	},
	//提交表单
	submit : function(){
		var formData ={
				username : $.trim($('#username').val()),
				password : $.trim($('#password').val())
		},
			//表达验证结果
			validateResult = this.formValidate(formData);
			//验证成功
			if(validateResult.status){
				_user.login(formData,function(res){
					window.location.href = _im.getUrlParam('redirect')|| './index.html'},
					function(errMsg){
						formError.show(errMsg);
				})
			}
			//验证失败
			else{
				//错误提示
				formError.show(validateResult.msg);
			}
	},
	formValidate : function(formData){
		var result={
			status : false,
			msg    : ''
		};
		if(!_im.validate(formData.username,'require')){
			result.msg='用户名不能为空';
			return result;
		};
		if(!_im.validate(formData.password,'require')){
			result.msg='密码不能为空';
			return result;
		};
		//验证通过，返回正确提示
		result.status = true;
		result.msg='验证通过';
		return result;
	},
};

$(function(){
	page.init();
})
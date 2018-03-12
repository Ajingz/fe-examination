/*
* @Author: user
* @Date:   2017-07-22 18:09:50
* @Last Modified by:   user
* @Last Modified time: 2017-08-29 20:01:46
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
		if(!username){
            return;
            }
		//验证username
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			//异步验证用户名是否存在
			_user.checkUsername(username,function(res){
				   formError.hide();
				},function(errMsg){
					formError.show(errMsg);
				});
		});
		//注册按钮点击
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
				password : $.trim($('#password').val()),
				passwordConfirm : $.trim($('#password-confirm').val()),
				phone : $.trim($('#phone').val()),
				email : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer : $.trim($('#answer').val())

		},
			//表达验证结果
			validateResult = this.formValidate(formData);
			//验证成功
			if(validateResult.status){
				_user.register(formData,function(res){
					window.location.href = './result.html?type=register';},
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
			alert('');
		};
		if(!_im.validate(formData.password,'require')){
			result.msg='密码不能为空';
			return result;
		};
		if(formData.password.length < 6){
			result.msg='密码长度不能少于6位';
			return result;
		};
		if(formData.password != formData.passwordConfirm){
			result.msg='两次输入密码不一致';
			return result;
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
};

$(function(){
	page.init();
})
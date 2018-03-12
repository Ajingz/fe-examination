/*
* @Author: user
* @Date:   2017-07-26 21:21:04
* @Last Modified by:   user
* @Last Modified time: 2017-08-31 14:24:31
*/

'use strict';

var _im = require('util/im.js');
var _user ={
	//登录
	login : function(userInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/login.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//注册
	register : function(userInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/register.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//检查用户名
	checkUsername : function(username,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/check_valid.do'),
			data : {
				type :'username',
				str  : username
			},
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//获取用户密码提示问题
	getQuestion : function(username,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/forget_get_question.do'),
			data : {
				username : username
			},
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//检查密码提示问题答案
	checkAnswer : function(userInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/forget_check_answer.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//重置密码
	resetPassword : function(userInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/forget_reset_password.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//修改用户信息
	updateUserInfo : function(userInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/update_information.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//登录状态下修改密码
	updatepassword : function(userInfo,resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/reset_password.do'),
			data : userInfo,
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//检查登录状态
	checkLogin : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
            error   : reject
		})
	},
	//加载用户信息
	getUserInfo : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/get_information.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	},
	//登出
	logout : function(resolve, reject){
		_im.request({
			url : _im.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		})
	}
}
module.exports = _user;
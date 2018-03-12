/*
* @Author: user
* @Date:   2017-07-27 16:31:40
* @Last Modified by:   user
* @Last Modified time: 2017-09-02 17:17:52
*/

'use strict';
require('./index.css');
var _im = require('util/im.js');

//通用页面头部
var header={
	init : function(){
		this.bindEvent();	
		this.onload();
	},
	onload :function(){
		var keyword = _im.getUrlParam('keyword');
		//keyword存在，回填输入框
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this=this;
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车，默认提交
		$('#search-input').keyup(function(e){
			//13是回车键
			if(e.keyCode ===13){
				_this.searchSubmit();
			}
		});
	},
	//搜索提交
	searchSubmit :function(){
		var keyword = $.trim($('#search-input').val());
		if(keyword){
			window.location.href = './list.html?keyword='+keyword;
		}else{
			_im.goHome();
		}
	}
	
};

header.init();
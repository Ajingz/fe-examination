/*
* @Author: user
* @Date:   2017-09-07 11:32:01
* @Last Modified by:   user
* @Last Modified time: 2017-09-12 17:07:17
*/
'use strict';
var _im = require('util/im.js');
var _address = require('service/address-service.js');
var _cities = require('util/cities/index.js');
var templateAddressModal = require('./address-modal.string');


var addressModal = {
	show : function(option){
		this.$modalWrap = $('.modal-wrap');
		this.option = option;
		this.option.data = option.data || {};
		//渲染页面
		this.loadModal();
		//绑定事件
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//省份和二级城市的联动
		this.$modalWrap.find('#receiver-province').change(function(){
			var selectedProvince = $(this).val();
			_this.loadCities(selectedProvince);
		});
		//提交保存
		this.$modalWrap.find('.address-btn').click(function(){
			var receiverInfo = _this.getReceiverInfo(),
				isUpdate = _this.option.isUpdate;
			//使用新地址且验证通过
			if(!isUpdate && receiverInfo.status){
				_address.save(receiverInfo.data,function(res){
					_im.successTips('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_im.errorTips(errMsg)
				});
			}
			//更新地址且验证通过
			else if(isUpdate && receiverInfo.status){
				_address.update(receiverInfo.data,function(res){
					_im.successTips('地址修改成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				},function(errMsg){
					_im.errorTips(errMsg)
				});
			}
			//验证不通过
			else{
				_im.errorTips(receiverInfo.errMsg || '哪里不对了');
			};
		});
		//点击modal内容区不关闭弹窗
		this.$modalWrap.find('.modal-container').click(function(e){
			e.stopPropagation(); 
		});
		//点击叉号或蒙版区域关闭弹窗
		this.$modalWrap.find('.close').click(function(){
			_this.hide();
		});
	},
	loadModal : function(){
		var addressModalHtml = _im.renderHtml(templateAddressModal,{
			isUpdate : this.option.isUpdate,
			data : this.option.data
		});
		this.$modalWrap.html(addressModalHtml);
		//加载省份
		this.loadProvince();
	},
	//加载省份
	loadProvince : function(){
		var provinces = _cities.getProvince() || [],
			$provinceSelect = this.$modalWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces));
		//如果更新地址并且有省份信息，做省份回填
		if(this.option.isUpdate && this.option.data.receiverProvince){
			$provinceSelect.val(this.option.data.receiverProvince);
			//加载城市
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	//加载某省份城市信息
	loadCities : function(provinceName){
		var cities = _cities.getCities(provinceName) || [],
			$citiesSelect = this.$modalWrap.find('#receiver-city');
		$citiesSelect.html(this.getSelectOption(cities));
		//如果更新地址并且有城市信息，做城市回填
		if(this.option.isUpdate && this.option.data.receiverCity){
			$citiesSelect.val(this.option.data.receiverCity);
		}

	},
	//获取表单中收件人信息并做表单验证
	getReceiverInfo : function(){
		var receiverInfo = {
				receiverName : $.trim(this.$modalWrap.find('#receiver-name').val()),
				receiverProvince :this.$modalWrap.find('#receiver-province').val(),
				receiverCity : this.$modalWrap.find('#receiver-city').val(),
				receiverAddress : $.trim(this.$modalWrap.find('#receiver-address').val()),
				receiverPhone : $.trim(this.$modalWrap.find('#receiver-phone').val()),
				receiverZip : $.trim(this.$modalWrap.find('#receiver-zip').val()),
		},
			result = {
				status : false
			};
		if(this.option.isUpdate){
			receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
		};
		//表单验证
		if(!receiverInfo.receiverName){
			result.errMsg = '请输入收件人姓名';
		}else if(!receiverInfo.receiverProvince)
		{
			result.errMsg = '请输入收件人所在省份';
		}else if(!receiverInfo.receiverCity)
		{
			result.errMsg = '请输入收件人所在城市';
		}else if(!receiverInfo.receiverAddress)
		{
			result.errMsg = '请输入收件人详细地址';
		}else if(!receiverInfo.receiverPhone)
		{
			result.errMsg = '请输入收件人联系方式';
		}
		//所有验证都通过
		else{
			result.status = true;
			result.data = receiverInfo;
		}
		return result;
		
	},
	//获取select框的选项，输入：array,输出：HTML
	getSelectOption : function(optionArray){
		var html = '<option value="">请选择</option>';
		for(var i=0,length = optionArray.length; i<length; i++){
			html+= '<option value="'+optionArray[i]+'">'+optionArray[i]+'</option>';
		};
		return html;
	},
	hide : function(){
		this.$modalWrap.empty();
	}
};
module.exports = addressModal;
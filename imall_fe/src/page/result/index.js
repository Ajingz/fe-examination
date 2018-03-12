/*
* @Author: user
* @Date:   2017-07-31 21:28:40
* @Last Modified by:   user
* @Last Modified time: 2017-09-13 21:59:53
*/

'use strict';
require('./index.css');
var _im = require('util/im.js');
require('page/common/nav-simple/index.js');

$(function(){
	var type        = _im.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
        if(type === 'payment'){
        	var orderNumber = _im.getUrlParam('orderNumber'),
        		$orderNumber = $element.find('.order-number');
        	$orderNumber.attr('href',$orderNumber.attr('href')+orderNumber)
        }
    //显示对应的提示工具
    $element.show();

    
})
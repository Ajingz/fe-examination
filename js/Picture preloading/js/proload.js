//图片预加载
(function($){
    function proload(imgs,options){
    	this.imgs=(typeof(imgs)==='string')?[imgs]:imgs;//判断imgs是否为单个字符串或是数组
    	this.opt=$.extend({},proload.DEFAULTS,options); //将each和all还有传递的参数合成
        if(this.opt!='unordered '){
        	this._overload(); 
        }else{
        	this._unoverload();//下划线表明为内部函数
        }
    	

    }
    //proload中的默认参数
    proload.DEFAULTS={
    	status:'unordered ',
    	each:null, //每一张图片加载完后执行此方法
    	all:null//所有图片加载完后执行此方法
    }
	proload.prototype._overload=function(){//有序加载
		var imgs=this.imgs;
		var len=imgs.length;
		var opt=this.opt;
		var count=0;
		load();
		
		function load(){

			var obj=new Image();
			$(obj).on('load error',function(){
				opt.each&&opt.each(count); 
				if(count>=len){ //所有图片加载完毕
					opt.all&&opt.all();
				}else{
					load();
				}
				count++;
			});
			obj.src=imgs[count];
			
		}
	}
    proload.prototype._unoverload=function(){ //无序加载
    	var imgs=this.imgs;
    	var len=imgs.length;
    	var opt=this.opt;
    	var count=0;

    	$.each(imgs,function(i,src){  //src是imgs数组中的元素
    		if(typeof('src')!='string') return; //若src不是字符串，直接返回
			var proObj=new Image();
			$(proObj).on('load error',function(){
				opt.each&&opt.each(count); //如果没有传递参数，opt.each为null，先判断this.each是否存在，
				count++;

				if(count>=len-1){
				opt.all&&opt.all();
				}
			})
			proObj.src=src;
		})
    }
//调用插件的方法
    //$.fn.extend ->$('#img').proload(); 第一种，附在标签上
    $.extend({
    	proload:function(imgs,opts){
    		new proload(imgs,opts); //   	
    	}
    }
    	
  );
})(jQuery);
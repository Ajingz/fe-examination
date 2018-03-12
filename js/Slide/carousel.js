;(function(){
 
var Carousel = function(poster){
 //alert(poster.attr("data-setting"));
 //保存单个旋转木马对象
 var self=this;
 this.poster = poster;
 this.posterul=poster.find("ul.poster-list");
 this.nextBtn=poster.find("div.poster-next-btn");
 this.prevBtn=poster.find("div.poster-prev-btn");
 this.posterFrist=poster.find("li.poster-item").eq(0);
 this.posterLast=poster.find("li.poster-item").last();
 this.posterItems=poster.find("li.poster-item");

 this.flag=true;//解决多次点击切换的bug,为true时加载，为FALSE时不加载
 //配置默认参数
 this.setting={
				"width":1000,  //幻灯片宽
				"height":290,  //幻灯片高
				"posterWidth":550, //第一帧宽
				"posterHeight":290, //第一帧高
				"scale":0.8, //记录显示比例关系
				"autoPlay":true,
				"delay":2000,    											 				
				"speed":300, 
				"display":"middle",
				}
	$.extend(this.setting,this.getSetting())
	//console.log(this.setting);
 	this.setValue();
	this.setRightItem();
    //右按钮点击
	this.nextBtn.click(function(){ //this访问不到carouseRotate，发生漂移，需要重新保存
		if(self.flag){
		 self.flag=false;
		 self.carouseRotate("left");
		}
		})
    //左按钮点击
	this.prevBtn.click(function(){ //this访问不到carouseRotate，发生漂移，需要重新保存
		if(self.flag){
		 self.flag=false;
		 self.carouseRotate("right");
		}
		})
	//自动播放
	if(this.setting.autoPlay){
	this.displayRotate();
      this.poster.hover(function(){
			window.clearInterval(self.timer);
			},function(){
			self.displayRotate();
			});
	}
};


Carousel.prototype={
	//自动播放
	displayRotate:function(){
		var self = this;
		 this.timer=window.setInterval(function(){
			self.nextBtn.click();
			},this.setting.delay);
		},
	//左旋转
	carouseRotate:function(dir){
		var _this_=this;
		var zIndexAttr=[];
		if(dir==="left"){
			//alert("left");
			this.posterItems.each(function(){
			var self=$(this),
			    prev=self.prev().get(0)?self.prev():_this_.posterLast,
                width=prev.width(),
				height=prev.height(),
				zIndex=prev.css("zIndex"),
				opacity=prev.css("opacity"),
				left=prev.css("left"),
				top=prev.css("top");
                zIndexAttr.push(zIndex);
				self.animate({
					width:width,
					height:height,
					//zIndex:zIndex,
					opacity:opacity,
					left:left,
					top:top
					},function(){
						_this_.flag=true;
						});
				})
				this.posterItems.each(function(i){
				   $(this).css("zIndex",zIndexAttr[i]);
					});
		}else if(dir==="right"){
			this.posterItems.each(function(){
			var self=$(this),
			    next=self.next().get(0)?self.next():_this_.posterFrist,
                width=next.width(),
				height=next.height(),
				zIndex=next.css("zIndex"),
				opacity=next.css("opacity"),
				left=next.css("left"),
				top=next.css("top");
				zIndexAttr.push(zIndex);
				self.animate({
					width:width,
					height:height,
					//zIndex:zIndex,
					opacity:opacity,
					left:left,
					top:top
					},function(){
						_this_.flag=true;
						});
				})
				this.posterItems.each(function(i){
				   $(this).css("zIndex",zIndexAttr[i]);
					});
				}
		},
	//右边帧的宽高和层级
	setRightItem:function(){
		var self=this;
		var posterIt=this.posterItems.slice(1);
		var slicesize=posterIt.size()/2;
		var level=Math.floor(this.posterItems.size()/2);
		var rightIt=posterIt.slice(0,slicesize);
		var leftIt=posterIt.slice(slicesize);

		var rw=this.setting.posterWidth;
		var rh=this.setting.posterHeight;
		var fristLeft=(this.setting.width-this.setting.posterWidth)/2;
		var gap=fristLeft/level;
		var offsetleft=fristLeft+rw;
		
		rightIt.each(function(i){
			level--;
			rw = rw*self.setting.scale;
			rh = rh*self.setting.scale;
			var j=i;
			$(this).css({
				zIndex:level,
				width:rw,
				height:rh,
				opacity:1/(++j),
				left:offsetleft+(++i)*gap-rw,				
				top:self.setDisplay(rh),
				})

			})
		//左边帧的宽度和层级
		var loop=Math.floor(this.posterItems.size()/2),
		    lw= rightIt.last().width(),
			lh=rightIt.last().height(); 
			 
		leftIt.each(function(i){
			$(this).css({
				zIndex:i,
				width:lw,
				height:lh,
				opacity:1/(loop--),
				left:i*gap,
				top:self.setDisplay(lh),
				})
			lw=lw/self.setting.scale;
			lh=lh/self.setting.scale;
			})		
	},

	 //幻灯片展示方式
	 setDisplay:function(hh){
		var dispalyed=this.setting.display;
		var top=0;
		if(dispalyed==="top"){
             top=0;
		   }else if(dispalyed==="bottom"){
			  top= this.setting.height-hh;
			  }else if(dispalyed==="middle"){
				 top= (this.setting.height-hh)/2;
				  };		  
		 return top;
	 	},

	//设置配置参数值去控制基本的宽度高度
	setValue:function(){
		this.poster.css({
			width:this.setting.width,
			height:this.setting.height,
			})
		this.posterul.css({
			width:this.setting.width,
			height:this.setting.height,
			})
		var w=(this.setting.width-this.setting.posterWidth)/2;
		this.nextBtn.css({
			width:w,
			height:this.setting.height,
			zIndex:Math.ceil(this.posterItems.size()/2),
			})
		this.prevBtn.css({
			width:w,
			height:this.setting.height,
			zIndex:Math.ceil(this.posterItems.size()/2),
			})
		this.posterFrist.css({
			width:this.setting.posterWidth,
			height:this.setting.posterHeight,
			left:w,
			zIndex:Math.floor(this.posterItems.size()/2),
			})
			
		},
	
	//获取人工配置参数
	getSetting:function(){
		var setting = this.poster.attr("data-setting");
		if(setting&&setting!=''){
			return $.parseJSON(setting);
			}else{
		return {};
			}
		}
	
};
Carousel.init = function(posters){
		var _this_ = this;
		posters.each(function(){
		new  _this_($(this));
		});
};
window['Carousel']=Carousel;
	})(jQuery);
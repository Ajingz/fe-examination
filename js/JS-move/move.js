//startMove(obj,{attr1:itag1,attr2:itag2},fn)
function startMove(obj,json,fn){ //fn回调函数
	clearInterval(obj.timer); //清空整体定时器
	obj.timer=setInterval(function(){
		var flag=true;//建立标杆，假设
		for(var attr in json)
	{
		//获取属性值
		var icur=0;
		if(attr=='opacity'){
			icur=parseFloat(getStyle(obj,attr))*100;//获取小数
			}
		else{
			 icur=parseInt(getStyle(obj,attr)); //宽高等属性
				}
		//速度
		var speed=(json[attr]-icur)/8;
		speed=speed>0?Math.ceil(speed):Math.floor(speed);
		//判断当前值和目标值,检测停止
		if(icur!=json[attr]){
			flag=false;
		}
		if(attr=='opacity')
	   {
		obj.style.filter='alpha(opacity:'+(icur+speed)+')'; //前面两个引号一对后面两个引号一对，用来传给css用的filter
		obj.style.opacity=(icur+speed)/100; 
		}
		else{
		obj.style[attr]=icur+speed+'px';
		}
	}
		if(flag){
		clearInterval(obj.timer);
		if(fn){
			fn();
			}
		}
		},30)
	}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
		}
	else{
		return getComputedStyle(obj,false)[attr];
		}
	}

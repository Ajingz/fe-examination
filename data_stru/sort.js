//排序算法

//数组测试平台
function cArray(num){
	this.number = num;
	this.dataStore = [];
	this.top = 0;
	this.insert = insert;
	this.setData = setData;
	this.clear = clear;
	this.toString = toString;
	this.swap = swap;
	this.maopao = maopao;
	this.selSort = selSort;
	this.insertSort = insertSort;
	//this.shellsort = shellsort;
	this.shellsortAJ = shellsortAJ; //自己
	this.shellsort1 = shellsort1;
	this.gaps = [5,3,1];
	this.mergesort = mergesort;
	this.mergeArr = mergeArr;
	this.qsort = qsort;
}
function setData(){
	for(var i=0;i<this.number;i++){
		this.dataStore[i] = Math.floor(Math.random()*(this.number+1));
	}
}
function insert(ele){
	return this.dataStore[this.top++] = ele;
}
function clear(){
	for(var i=0;i<this.dataStore.length;i++){
		this.dataStore[i] = 0;
	}
}
function toString(){
	var str = '';
	for(var i=0;i<this.dataStore.length;i++){
		str += this.dataStore[i] + " ";
		if(i>0&&i%10==0){
			str += '\n';
		}
	}
	return str;
}
//交换数组元素
function swap(arr,index1,index2){
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
}
//冒泡排序
function maopao(){
	for(var j=0;j<this.dataStore.length-1;j++){
		for(var i=0;i<this.dataStore.length;i++){
			if(this.dataStore[i]>this.dataStore[i+1]){
				this.swap(this.dataStore,i,i+1);
			}
		}
	}
}
//选择排序
function selSort(){
	for(var i=0;i<this.dataStore.length-1;i++){
		for(var j=i+1;j<this.dataStore.length;j++){
			if(this.dataStore[i]>this.dataStore[j]){
				this.swap(this.dataStore,i,j);
			}
		}
	}
}
//插入排序
function insertSort(){
	for(var i=0;i<this.dataStore.length;i++){
		inner = i;
		while(inner>=0&&this.dataStore[inner]>this.dataStore[inner+1]){
			this.swap(this.dataStore,inner,inner+1);
			--inner;
		}
	}
}
//希尔排序
// function shellsort(){
// 	for(var g=0;g<this.gaps.length;++g){
// 		for(var i =this.gaps[g];i<this.dataStore.length;++i){
// 			var temp = this.dataStore[i];
// 			for(var j=i;j>=this.gaps[g]&&this.dataStore[j-this.gaps[g]]>temp;j-=this.gaps[g]){
// 				this.dataStore[j] = this.dataStore[j-this.gaps[g]];
// 			}
// 			this.dataStore[j] = temp;
// 		}
// 	}
// }
function shellsortAJ(){
	for(var g=0;g<this.gaps.length;++g){
		var h = this.gaps[g];
		for(var i = h;i<this.dataStore.length;i++){
			for(var j=i;this.dataStore[j-h]>this.dataStore[j]&&j>=h;j-=h){
				this.swap(this.dataStore,j-h,j);
			}
		}	
	}
}
//动态计算间隔的希尔排序
function shellsort1(){
	var N = this.dataStore.length;
	var h = 1;
	while(h<N/3){
		h = 3*h +1;
	}
	while(h>=1){
		for(var i = h;i<this.dataStore.length;i++){
			for(var j=i;this.dataStore[j-h]>this.dataStore[j]&&j>=h;j-=h){
				this.swap(this.dataStore,j-h,j);
			}
		}
		h = (h-1)/3;
	}
}
//归并排序
function mergesort(){
	if(this.dataStore.length<2){
		return;
	}
	var step = 1;
	var left,right;
	while(step <this.dataStore.length){
		left = 0;
		right = step;
		while(right+step<this.dataStore.length){
			this.mergeArr(this.dataStore,left,left+step,right,right+step);
			left = right + step;
			right = left + step;
		}
		if(right<this.dataStore.length){
			this.mergeArr(this.dataStore,left,left+step,right,this.dataStore.length);
		}
		step *=2;
	}
}
function mergeArr(arr,lstart,lstop,rstart,rstop){
	var leftArr = new Array(lstop-lstart);
	var rightArr = new Array(rstop-rstart);
	var k = lstart;
	for(var i=0;i<leftArr.length;i++){
		leftArr[i] = arr[k];
		++k;
	}
	k = rstart;
	for(var j=0;j<rightArr.length;j++){
		rightArr[j] = arr[k];
		++k;
	}
	leftArr.push(Infinity);
	rightArr.push(Infinity);
	var m = 0,n=0;
	for(var k = lstart;k<rstop;k++){
		if(leftArr[m]<=rightArr[n]){
			arr[k] = leftArr[m];
			++m;
		}else if(leftArr[m]>rightArr[n]){
			arr[k] = rightArr[n];
			++n;
		}
	}
}
function qsort(arr){
	if(arr.length==0){
		return [];
	}
	var ele = arr[0];
	var leftArr = new Array();
	var rightArr = new Array();
	for(var i=1;i<arr.length;i++){
		if(arr[i]>ele){
			rightArr.push(arr[i]);
		}else{
			leftArr.push(arr[i])
		}	
	}
	return qsort(leftArr).concat(ele,qsort(rightArr));

}
//示例
var num = 10000;
var array = new cArray(num);
array.setData();
var s = new Date().getTime();
array.maopao();
var st = new Date().getTime();
console.log('maopao '+(st-s));

array.setData();
var s = new Date().getTime();
array.selSort();
var st = new Date().getTime();
console.log('sel '+(st-s));

array.setData();
var s = new Date().getTime();
array.insertSort();
var st = new Date().getTime();
console.log('insert '+(st-s));

array.setData();
var s = new Date().getTime();
array.shellsortAJ();
var st = new Date().getTime();
console.log('shell '+(st-s));

array.setData();
var s = new Date().getTime();
array.mergesort();
var st = new Date().getTime();
console.log('mergesort '+(st-s));

array.setData();
var s = new Date().getTime();
array.qsort(array.dataStore);
var st = new Date().getTime();
console.log('qsort '+(st-s));
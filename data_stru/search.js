//检索算法
function Search(num){
	this.number = num;
	this.dataStore = [];
	this.setData = setData;
	this.swap = swap;
	this.toString = toString;
	this.seqSearch = seqSearch;//找任意值
	this.searchMin = searchMin;//找最小值
	this.search = search; //自组织方式查找
	this.binsearch = binsearch; //二分法查找
	this.insertSort = insertSort;
	this.count = count;
}
function setData(){
	for(var i=0;i<this.number;i++){
		this.dataStore[i] = Math.floor(Math.random()*(this.number+1));
	}
}
function swap(arr,index1,index2){
	var temp = arr[index1];
	arr[index1] = arr[index2];
	arr[index2] = temp;
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
function insertSort(){
	for(var i=0;i<this.dataStore.length;i++){
		inner = i;
		while(inner>=0&&this.dataStore[inner]>this.dataStore[inner+1]){
			this.swap(this.dataStore,inner,inner+1);
			--inner;
		}
	}
}
function seqSearch(ele){
	for(var i = 0;i<this.dataStore.length;i++){
		if(ele === this.dataStore[i]){
			return true;
		}else{
			return false;
		}
	}
}
function searchMin(){
	var min = this.dataStore[0];
	for(var i=1;i<this.dataStore.length;i++){
		if(this.dataStore[i]<min){
			min = this.dataStore[i];
		}
	}
	return min;
}
function search(ele){
	for(var i=0;i<this.dataStore.length;i++){
		if(ele == this.dataStore[i] && i>(this.dataStore.length*0.2)){
			swap(this.dataStore,0,i);
			return true;
		}else if(ele == this.dataStore[i]){
			return true;
		}
	}
	return false;
}
//二分法
function binsearch(ele){
	var top = this.dataStore.length-1;
	var bottom = 0;
	var arr = [];
	while(bottom <= top){
		var mid = Math.floor((top+bottom)/2);
		if(ele == this.dataStore[mid]){
			return mid;
		}else if(ele > this.dataStore[mid]){
			bottom = mid +1;
		}else{
			top = mid-1;
		}
		arr.push(top);
		arr.push(bottom);
		console.log(arr);
	}
	return false;
}
//计算是否有重复数据
function count(ele){
	var count = 0;
	var positon = this.binsearch(ele);
	if(positon>-1){
		++count;
		for(var i=positon+1;i<this.dataStore.length;i++){
			if(this.dataStore[i]==ele){
				++count;
			}else{
				break;
			}
		}
		for(var i=positon-1;i>=0;i--){
			if(this.dataStore[i]==ele){
				++count;
			}else{
				break;
			}
		}
	}
	return count; 
}

var num = 10;
var sear = new Search(num);
sear.dataStore = [2, 3, 4, 5, 5, 5, 6, 7, 5, 10 ];
sear.insertSort();
console.log(sear.toString());
console.log(sear.binsearch(5));
console.log(sear.count(5));
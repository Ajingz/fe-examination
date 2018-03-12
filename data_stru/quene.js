function Quene(){
	this.dataStore = [];
	this.push = push;
	this.delete = del;
	this.front = front; //队首
	this.back = back;//队尾
	this.toString = toString;
	this.empty = empty;
}
function push(ele){
	this.dataStore.push(ele);
}
function del(){
	return this.dataStore.shift();
}
function front(){
	return this.dataStore[0];
}
function back(){
	return this.dataStore[this.dataStore.length-1];
}
function toString(){
	console.log(this.dataStore);
}
function empty(){
	if(this.dataStore.length===0){
		return true;
	}else{
		return false;
	}
}

//双向队列
function twoQuene(){
	this.dataStore = [];
	this.frontPush = frontPush; //队头添加
	this.backPush = backPush; //队尾添加
	this.frontDelete = frontDelete;
	this.backDelete = backDelete;
	this.front = front; //队首
	this.back = back;//队尾
	this.toString = toString;
	this.empty = empty;
}
function frontPush(ele){
	this.dataStore.unshift(ele);
}
function backPush(ele){
	this.dataStore.push(ele);
}
function frontDelete(){
	return this.dataStore.shift();
}
function backDelete(){
	return this.dataStore.pop();
}
function front(){
	return this.dataStore[0];
}
function back(){
	return this.dataStore[this.dataStore.length-1];
}
function toString(){
	console.log(this.dataStore);
}
function empty(){
	if(this.dataStore.length===0){
		return true;
	}else{
		return false;
	}
}

//使用双向队列判断给定单词是否为回文
function judge(word){
	var que = new twoQuene();
	var word = word.trim();
	for(var i =0;i<word.length;i++){
		que.backPush(word[i]);
	}
	while(que.dataStore.length>1){
		if(que.frontDelete()!= que.backDelete()){
			console.log(que.dataStore.length);
			return false;
		}
	}
	return true;
}
//示例
console.log(judge('aca'));
console.log(judge('word'));

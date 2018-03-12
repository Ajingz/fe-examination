// 列表类
function List () {
    this.listSize = 0; // 列表的元素个数
    this.pos = 0; // 列表的当前位置
    this.dataStore = []; // 初始化一个空数组来保存列表元素
    this.clear = clear; // 清空列表中的所有元素
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.hasNext = hasNext;
    this.hasPrev = hasPrev;
    this.length = length;
    this.currPos = currPos; // 返回列表的当前位置
    this.moveTo = moveTo;
    this.getElement = getElement; // 返回当前位置的元素
    this.contains = contains;
}
// append: 给列表添加元素
function append (element) {
    this.dataStore[this.listSize++] = element;
}
// find: 在列表中查找某一元素 indexOf?
function find (element) {
    for (let i = 0; i < this.dataStore.length; i++) {
        if (this.dataStore[i] === element) {
            return i;
        }
    }
    return -1;
}
// remove: 从列表中删除元素
function remove (element) {
    let foundAt = this.find(element);
    if (foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        this.listSize--;
        return true;
    }
    return false;
}
// length: 列表中有多少个元素 与listSize区别?
function length () {
    return this.listSize;
}
// toString: 显示列表中的元素
function toString () {
    return this.dataStore;
}
// insert: 向列表中插入一个元素
function insert (element, after) {
    let insertPos = this.find(after);
    if (insertPos > -1) {
        this.dataStore.splice(insertPos + 1, 0, element);
        this.listSize++;
        return true;
    }
    return false;
}
// clear: 清空列表中所有的元素
function clear () {
    delete this.dataStore;
    this.dataStore.length = 0;
    this.listSize = this.pos = 0;
}
// contains: 判断给定值是否在列表中 find?
function contains (element) {
    for (let i = 0; i < this.dataStore.length; i++) {
        if (this.dataStore[i] === element) {
            return true;
        }
    }
    return false;
}
// 遍历列表
function front () {
    this.pos = 0;
}
function end () {
    this.pos = this.listSize - 1;
}
function prev () {
    --this.pos;
}
function next () {
    if (this.pos < this.listSize) {
        ++this.pos;
    }
}
function currPos () {
    return this.pos;
}
function moveTo (position) {
    this.pos = position;
}
function getElement () {
    return this.dataStore[this.pos];
}
function hasNext () {
    return this.pos < this.listSize;
}
function hasPrev () {
    return this.pos >= 0;
}

//增加一个向列表中插入元素的方法，该方法只在待插元素大于列表中所有元素时才进行插入操作
List.prototype.insertThen = function(ele){
	var dataStr = [],dataNum = [];
	function compare(a,b){
		return a-b;
	}
	for(var i=0;i<this.dataStore.length;i++){
		if(typeof(this.dataStore[i])==='number'){
			dataNum.push(this.dataStore[i]);
		}else{
			dataStr.push(this.dataStore[i]);
		} 
	}
	if(typeof(ele)==='number'){
		dataNum.sort(compare);
		if(dataNum[0]<ele){
			this.append(ele);
		}
	}else{
		dataStr.push(ele)
		dataStr.sort();
		if(dataStr[dataStr.length-1]===ele){
			this.append(ele);
		}
	}
}
//示例
var DataThen = new List();
DataThen.append(`Mazey`);
DataThen.append(`Cherrie`);
DataThen.append(`Luna`);
DataThen.append(`John`);
DataThen.append(`July`);
DataThen.append(23);
DataThen.append(73);
console.log(DataThen.toString()); 
DataThen.insertThen(99);
DataThen.insertThen(12);
console.log(DataThen.toString()); 
DataThen.insertThen(`Jay`);
DataThen.insertThen(`Zero`);
console.log(DataThen.toString()); 

//创建person类，用于保存人的姓名和信息。创建一个至少包含10个person对象的列表。显示列表中所有拥有相同性别的人
function Person(){
	this.data = [];
	this.save = save;
	this.dis = dis;
}
function save(name,sex){
	var per=[name,sex];
	this.data.push(per);
}
function dis(sex){
	var result = [];
	for(var i=0;i<this.data.length;i++){
		if(this.data[i][1]===sex){
			result.push(this.data[i][0]);
		}
	}
	return result;
}
//示例
var people = new Person();
people.save(`Mazey`, `male`);
people.save(`John`, `male`);
people.save(`Zero`, `male`);
people.save(`July`, `male`);
people.save(`Bob`, `male`);
people.save(`Ada`, `female`);
people.save(`Cherrie`, `female`);
people.save(`Luna`, `female`);
people.save(`Lucy`, `female`);
people.save(`June`, `female`);
console.log(people.data);
console.log(people.dis(`male`)); // ["Bob", "July", "Zero", "John", "Mazey"]
console.log(people.dis(`female`));

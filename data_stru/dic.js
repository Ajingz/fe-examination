//dictionary类
function Dictionary(){
    this.dataStore = new Array();
    this.add = add;
    this.find = find;
    this.remove = remove;
    this.disAll = disAll;
    this.count = count;
    this.clear = clear;
}
function add(key,value){
    this.dataStore[key] = value;
}
function find(key){
    return this.dataStore[key];
}
function remove(key){
    delete this.dataStore[key];
}
function disAll(){
    var dataKey = Array.prototype.slice.call(Object.keys(this.dataStore));
    //var dataKey = Object.keys(this.dataStore);
    for(var key in dataKey){
        console.log(dataKey[key]+','+this.dataStore[dataKey[key]]);
    }
}
//显示单个
function dis(key){
    console.log(this.dataStore);
}

function count(){
    var n=0;
    for(var key in Object.keys(this.dataStore)){
        ++n;
    }
    return n;
}
function clear(){
    Object.keys(this.dataStore).forEach(function(key){
        delete this.dataStore[key];
    },this);
}
//示例
var phone = new Dictionary();
phone.add('zj','123');
phone.add('zyl','456');
phone.add('lll','789');
phone.add('yxq','123');
phone.disAll();
phone.clear();
phone.display();

//用Dictionary写一个程序，该程序用来存储一段文本中各个单词出现的次数
var text = 'the brown the the jumped over the blue the';
var dic = new Dictionary();
var arr = text.split(' ').sort();
var brr = [];
var j = 0
for(var i=0;i<arr.length;i++){
    if(brr.indexOf(arr[i])==-1){
        brr.push(arr[i]);
        dic.add(arr[i],1);
    }else{
       dic.add(arr[i],j+=1);
    }
}
dic.disAll();
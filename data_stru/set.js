//set类
function Set(){
    this.dataStore = [];
    this.add = add;
    this.remove = remove;
    this.contain = contain; //检测元素是否属于集合
    this.union = union;//并集
    this.interset = interset;//交集
    this.diff = diff; //补集
    this.subset = subset; //子集
    this.show =show;
}
function add(data){
    if(this.dataStore.indexOf(data)<0){
        this.dataStore.push(data);
        return true;
    }else{
        return false;
    }
}
function remove(data){
    var ele = this.dataStore.indexOf(data);
    if(ele>-1){
        this.dataStore.splice(ele,1);
        return true;
    }else{
        return false;
    }
}
function show(){
    console.log(this.dataStore);
}
function contain(data){
    if(this.dataStore.indexOf(data)>-1){
        return true;
    }else{
        return false;
    } 
}
function union(set){
    var tempSet = new Set();
    for(var i=0;i<this.dataStore.length;i++){
        tempSet.add(this.dataStore[i]);
    }
    for(var i=0;i<set.dataStore.length;i++){
        if(!tempSet.contain(set.dataStore[i])){
            tempSet.add(set.dataStore[i]);
        }
    }
}
function interset(set){
    var tempSet = new Set();
    for(var i=0;i<this.dataStore.length;i++){
        if(tempSet.contain(set.dataStore[i])){
            tempSet.add(this.dataStore[i]);
        }
    }
}
function diff(set){
    var tempSet = new Set();
    for(var i=0;i<this.dataStore.length;i++){
        if(!tempSet.contain(set.dataStore[i])){
            tempSet.add(this.dataStore[i]);
        }
    } 
}
function subset(set){
    if(this.dataStore.length<set.dataStore.length){
        for(var i=0;i<this.dataStore.length;i++){
            if(!set.contain(this.dataStore[i])){
                return false;
            }
        }
        return true;
    }else{
        return false;
    }
}
//该方法返回比传入元素大的元素中最小的那个
Set.prototype.higher = function(ele){
    this.dataStore.sort(function(a,b){
        return a-b;
    });
    for(var i=0;i<this.dataStore.length;i++){
        if(this.dataStore[i]>ele){
            return this.dataStore[i];
        }
    }
}
//该方法返回比传入元素小的元素中最大的那个
Set.prototype.lower = function(ele){
    this.dataStore.sort(function(a,b){
        return b-a;
    });
    for(var i=0;i<this.dataStore.length;i++){
        if(this.dataStore[i]<ele){
            return this.dataStore[i];
        }
    }
}
//示例
let s = new Set();
s.add(23);
s.add(3);
s.add(2);
s.add(24);
s.add(73);
console.log(s.higer(27));
console.log(s.lower(27));
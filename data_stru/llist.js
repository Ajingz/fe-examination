// Node类
function Node (element) {
    this.element = element;
    this.next = null;
}
// LinkedList类,单向链表
function LList () {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.findPre = findPre;
    this.remove = remove;
    this.display = display;
}

function find(item){
    var currNode = this.head;
    while(currNode.element != item){
        currNode = currNode.next;
    }
    return currNode;
}
function insert(newEle,item){
    var newNode = new Node(newEle);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
}
function display(){
    var currNode = this.head;
    while(!(currNode.next==null)){
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}
function findPre(item){
    var currNode = this.head;
    while(!(currNode.next==null)&&(currNode.next.element != item)){
        currNode = currNode.next;
    }
    return currNode;
}
function remove(item){
    var preNode = this.findPre(item);
    if(!(preNode.next==null)){
        preNode.next = preNode.next.next;
    }
}
//实现advance(n)方法，使当前节点向前移动n个节点
LList.prototype.advance = function(n,item){
    if(this.findPre(item).element != 'head' ){
        while(n--){
            this.prever(item);
        }
    }
}
//移动一个节点的方法
LList.prototype.prever = function(item){
    var currNode = this.find(item);
    var preNode = this.findPre(item);
    var nextNode = currNode.next;
    var prepreNode = this.findPre(preNode.element);
    prepreNode.next = currNode;
    preNode.next = currNode.next;
    currNode.next = preNode;
}

//示例
let names = new LList();
names.insert('Mazey', 'head');
names.insert('Cherrie', 'Mazey');
names.insert('John', 'Cherrie');
names.insert('Luna', 'John');
names.insert('Ada', 'Luna');
names.display();
console.log('---');
names.advance(1, 'Luna');
names.display();

//双向链表
// Node类
function Node (element) {
    this.element = element;
    this.next = null;
    this.pre = null;
}
// LinkedList类
function CList () {
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.findList = findList; //找最后一个节点
    this.disRev = disRev; //反序显示双向链表
}

function find(item){
    var currNode = this.head;
    while(currNode.element != item){
        currNode = currNode.next;
    }
    return currNode;
}
function insert(newEle,item){
    var newNode = new Node(newEle);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    newNode.pre = currNode;
    currNode.next = newNode;
}
function display(){
    var currNode = this.head;
    while(!(currNode.next==null)){
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

function remove(item){
    var currNode = this.find(item);
    if(!(currNode.next==null)){
        currNode.pre.next = currNode.next;
        currNode.next.pre = currNode.pre;
        currNode.pre = null;
        currNode.next = null;
    }
}

function findList(){
    var currNode = this.head;
    while(!(currNode.next==null)){
        currNode = currNode.next;
    }
    return currNode;
}

function disRev(){
    var currNode = this.head;
    currNode = this.findList();
    while(!(currNode.pre==null)){
        console.log(currNode.element);
        currNode = currNode.pre;
    }
}
//实现advance(n)方法，使当前节点向前移动n个节点
CList.prototype.back = function(n,item){
    var currNode = this.find(item);
    if(currNode.next != null){
        while(n--){
            this.backMove(item);
        }
    }
    
}
//移动一个节点的方法
CList.prototype.backMove = function(item){
    var currNode = this.find(item);
    var nextNode = currNode.next;
    var neneNode = nextNode.next;
    var preNode = currNode.pre;

    nextNode.pre = currNode.pre;
    currNode.next = nextNode.next;
    nextNode.next = currNode;
    neneNode.pre = currNode;
    preNode.next = nextNode; 
}

//示例
let names = new CList();
names.insert('Mazey', 'head');
names.insert('Cherrie', 'Mazey');
names.insert('John', 'Cherrie');
names.insert('Luna', 'John');
names.insert('Ada', 'Luna');
names.display();
console.log('---');
names.back(2, 'John');
names.display();

//循环链表解决杀人游戏
function Node (element) {
    this.element = element;
    this.next = null;
}
// LinkedList类
function List () {
    this.head = new Node('head');
    this.head.next = this.head;
    this.find = find;
    this.insert = insert;
    this.remove = remove;
    this.display = display;
    this.findPre = findPre;
    this.com = com;
}

function find(item){
    var currNode = this.head;
    while(currNode.element != item){
        currNode = currNode.next;
    }
    return currNode;
}
function insert(newEle,item){
    var newNode = new Node(newEle);
    var currNode = this.find(item);
    newNode.next = currNode.next;
    currNode.next = newNode;
}
function display(){
    var currNode = this.head;
    var arr = [];
    while(!(currNode.next==null)&&!(currNode.next.element=='head')){
        arr.push(currNode.next.element);
        currNode = currNode.next;
    }
    console.log(arr);
}

function remove(item){
    var preNode = this.findPre(item);
    if(!(preNode.next==null)&& !(preNode.next.element=='head')){
        preNode.next = preNode.next.next;
    }
}
function findPre(item){
    var currNode = this.head;
    while(!(currNode.next==null)&&(currNode.next.element != item)){
        currNode = currNode.next;
    }
    return currNode;
}

//计算总共节点
function com(){
    var currNode = this.head;
    var i = 0;
    while(!(currNode.next==null)&&!(currNode.next.element=='head')){
        currNode = currNode.next;
        i +=1;
    }
    return i;
}
List.prototype.fun = function(item,n){
    var currNode = this.find(item);
    for(var num = this.com();num>2;num--){
        var l = n;
        while(--l){
            currNode = currNode.next;
        }
        var ele = currNode.element; 
        this.remove(ele);
        currNode = currNode.next;
    }
}

//示例
let names = new List();
names.insert('1', 'head');
names.insert('2', '1');
names.insert('3', '2');
names.insert('4', '3');
names.insert('5', '4');
names.insert('6', '5');
names.insert('7', '6');
names.insert('8', '7');
names.insert('9', '8');
names.insert('10', '9');
names.insert('11', '10');
names.insert('12', '11');
names.display();
names.fun('1',3);
console.log('---');
names.display();
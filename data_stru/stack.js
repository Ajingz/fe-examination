function Stack(){
	this.dataStore = [];
	this.top = 0;
	this.push = push; //入栈
	this.pop = pop; //出栈
	this.peek = peek; //返回栈顶元素
}
function push(ele){
	this.dataStore[this.top++] = ele;
}
function pop(){
	return this.dataStore[--this.top];
}
function peek(){
	return this.dataStore[this.top-1];
}

//1用栈来判断算数表达式中的括号是否匹配
function findWrongBrace (express) {
    let s = new Stack();
    for (let i = 0; i < express.length; ++i) {
        if (express[i] === `(`) {
            s.push(i);
        } else if (express[i] === `)`) {
            s.pop();
        }
    }
    return `${express}的第${s.peek() + 1}个字符是不匹配的括号。`;
}
// 示例
 console.log(findWrongBrace(`2.3 + 23 / 12 + (3.14159 * 0.24)`)); 

//2使用两个栈，一个用来存储操作数，一个用来存储操作符，实现一个函数，将中缀表达式转换为后缀表达式，利用栈对该表达式求值
var op = new Stack();
var operator = new Stack();

function conver(express){
	express.split('');
	op.push(express[0]);
	op.push(express[2]);
	operator.push(express[1]);
	return op.pop()+''+operator.pop()+''+op.pop();
}

//3佩兹糖果盒
var candy = 'wwrywyrryywyr';
var Can = new Stack();
var newC = '';
for(var i=0;i<candy.length;i++){
	if(candy[i]!='y'){
		Can.push(candy[i]);
	}
}
while(Can.top>0){	 
	newC += Can.pop();
}
console.log(newC);

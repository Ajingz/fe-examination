//创建一个记录学生成绩的对象，提供一个添加成绩的方法以及一个显示平时成绩的方法
function score(){
	this.dataStore = [];
	this.add = add;	
	this.average = average;
}
//添加成绩
function add(temp){
	this.dataStore.push(temp);
}
//显示平时成绩
function average(){
	var total;
	for(var i=0;i<this.dataStore.length;i++){
		total += this.dataStore[i];
	}
	return total/this.dataStore.length;
}

//将一组单词存储在一个数组中，按正序和倒序分别显示
 var word = ['apple','banana','orange','milk','soap'];
 word.sort();
 console.log(word);
 word.sort().reverse();
  console.log(word);

 //修改weeklyTemps对象，用二维数组存储每月有用数据，显示月平均数，具体某一周平均数和所有周平均数
 function weeklyTemps(){
 	this.month = [];
 	this.add = add;
 	this.average = average;
 }

 function add(){
 	for(var i =0;i<5;i++){
 		var week = []
 		for(var j=0;j<7;j++){
 			week[j] = Math.floor(Math.random()*101);
 			if(i===4&&j>0){
 				break;
 			}
 		}
 		this.month[i] = week;
 	}
 }

 function average(){
 	var monthTotal=0,weekTotal = 0;
 	for(var i =0;i<this.month.length;i++){
 		for(var j=0;j<this.month[i].length;j++){
 			monthTotal += this.month[i][j];
 			weekTotal += this.month[i][j];
 		}		
 		console.log(weekTotal/this.month[i].length);
 		weekTotal = 0;
 	}
 	console.log(monthTotal/30);
 }
 var mon = new weeklyTemps();
 mon.add();
 mon.average();

 //创建一个对象，将字母存在数组中，并可以将字母连起来显示单词
 function wordR(){
 	this.word = ['a','p','p','l','e'];
 	this.fun = fun;
 }
 function fun(){
 	var words = this.word.reduce(concat);
 	console.log(words);
 }
 function concat(a,b){
	return a+b;
}
 var ww = new wordR();
 ww.fun();




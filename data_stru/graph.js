function Graph(v){
	this.vertices = v;
	this.verText = [];
	this.edges = 0;
	this.adj = [];
	for(var i=0;i<this.vertices;i++){
		this.adj[i] = [];
		// this.adj[i].push("");
	}
	this.add = add;
	this.show = show;
	this.marked = [];
	for(var i=0;i<this.vertices;i++){
		this.marked[i] =false;
	}
	this.dfs = dfs;
	this.bfs = bfs;
	this.edgeTo = [];
	this.pathTo = pathTo;
	this.stack = [];//存储深度优先搜索结果
	this.topSort = topSort;
}
function add(v,w){
	this.adj[v].push(w);
	this.adj[w].push(v);
	this.edges++;
}
function show(){
	for(var i = 0;i<this.vertices;i++){
		console.log(i+':');
		for(var j=0;j<this.vertices;j++){
			if(this.adj[i][j]!=null){
				console.log(this.adj[i][j]);
			}
		}
	}
}
//深度优先搜索
function dfs(v){
	this.marked[v] = true;
	if(this.adj[v]!=undefined){
		this.stack.push(v);
		for(var w in this.adj[v]){
			if(!this.marked[this.adj[v][w]]){
				this.dfs(this.adj[v][w]);
			}
		}
	}
}
//广度优先搜索
function bfs(s){
	var queue = [];
	this.marked[s] = true;
	queue.push(s);
	while(queue.length>0){
		var v = queue.shift();
		//console.log(v);
		for(var w in this.adj[v]){
			if(!this.marked[this.adj[v][w]]){
				this.marked[this.adj[v][w]] = true;
				this.edgeTo[this.adj[v][w]] = v;
				queue.push(this.adj[v][w]);
			}
		}
	}
	
}
//查找最短路径,广度优先搜索
function pathTo(s,v){
	this.bfs(s);
	if(!this.marked[v]){
		return undefined;
	}
	var path = [];
	for(var i=v;i!=s;i=this.edgeTo[i]){
		path.push(i);
	}
	path.push(s);
	return path;

}
//拓扑排序，深度优先
function topSort(){
	this.dfs(0);
	for(var j =0;j<this.stack.length;j++){
		if(this.stack[j]!=undefined){
			console.log(this.verText[this.stack[j]]);
		}
	}
}

//示例
var gg = new Graph(6);
gg.add(1,2);
gg.add(2,5);
gg.add(1,3);
gg.add(1,4);
gg.add(0,1);
gg.verText = ['aa','bb','cc','dd','ee','ff'];
// gg.show();
//gg.dfs(0);
// gg.bfs(0);
// var path = gg.pathTo(0,2);
// while(path.length>0){
// 	console.log(path.pop());	
// }
gg.topSort();
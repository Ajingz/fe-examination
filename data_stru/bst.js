//二叉树数据结构
function Node(data,left,right){
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}
function show(){
    return this.data;
}
//二叉树
function BTS(){
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.preOrder = preOrder;
    this.backOrder = backOrder;
    this.getMax = getMax; //查找最大值
    this.getMin = getMin; //查找最小值
    this.find = find; //查找指定值
    this.del = del; //删除指定节点
    this.num = num; //返回节点个数
}
function insert(ele){
    var node = new Node(ele,null,null);
    if(this.root==null){
        this.root = node;
    }else{
        var temp = this.root;
        var currNode = temp;
        while(true){
            if(ele<currNode.data){
                if(currNode.left==null){
                    currNode.left = node;
                    break;
                }
                currNode = currNode.left;
            }else{
                if(currNode.right==null){
                    currNode.right = node;
                    break;
                }
                currNode = currNode.right;
            }   
        }
    }
}
//中序遍历
function inOrder(node){
    if(node!=null){
        inOrder(node.left);
        console.log(node.data);
        inOrder(node.right); 
    }
}
//前序遍历
function preOrder(node){
    if(node!=null){
        console.log(node.data);
        preOrder(node.left);
        preOrder(node.right); 
    }
}
//后序遍历
function backOrder(node){
    if(node!=null){
        backOrder(node.left);
        backOrder(node.right);
        console.log(node.data); 
    }
}
//查找最大值
function getMax(){
    var node = this.root;
    while(node.right!=null){
            node = node.right;
    }
    return node;
}
//查找最小值
function getMin(){
    var node = this.root;
    while(node.left!=null){
            node = node.left;
    }
    return node;
}
function find(data){
    var node = this.root;
    var pre;
    while(node!=null){
        if(data === node.data){
            return node;
        }else if(data<node.data){
            pre = node;
            node = node.left;
        }else{
            pre = node;
            node = node.right;
        }
        console.log(pre.data);
    }
    return null;
    
}
function del(data){
    var node = this.root;
    var nodePre;
    while(node!=null){
        if(data === node.data){
            break;
        }else if(data<node.data){
            nodePre = node;
            node = node.left;
        }else{
            nodePre = node;
            node = node.right;
        }
    }
    if(node.left!=null){
        lnode = node.left;
        var pre;
        while(true){
            if(lnode.right!=null){
                 pre = lnode;
                 lnode = lnode.right; 
            }else{
                break;
            }       
        }
        if(pre){
            pre.right = null;    
        }         
    }else{
        lnode = node;
    } 
    if(nodePre.left.data == data){
        nodePre.left = lnode;
        lnode.right = node.right;
    }else{
        nodePre.right = lnode;
        lnode.right = node.right;
    }   
}
function num(){
    var node = this.root;
    var arr = [];
    ll(node);
    function ll(node){
        if(node!=null){
            ll(node.left);
            ll(node.right);
            arr.push(node.data); 
        }  
    }
    return arr.length;
}
//示例
var bts = new BTS();
bts.insert(23);
bts.insert(13);
bts.insert(54);
bts.insert(7);
bts.insert(15);
bts.insert(46);
bts.insert(77);
bts.insert(48);
bts.insert(42);
bts.insert(73);
bts.insert(80);
// bts.preOrder(bts.root);
// bts.backOrder(bts.root);
// console.log(bts.getMax().data);
// console.log(bts.find(45).data);
// bts.del(77);
console.log(bts.num());
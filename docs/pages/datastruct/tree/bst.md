二叉树的查找、添加和删除元素都非常快，本文基于《数据结构和算法JavaScript描述》这本书，记录实现二叉树及一些方法。

先来认识一些名词。

* 二叉树：子节点不超过两个
* 叶子结点：没有任何子节点
* 树的深度：树的层数就是树的深度

#### 1. 定义Node类 
既然二叉树是由节点来实现的，那我们先来定义一个Node类

``` JavaScript
function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}

function show() {
    return this.data;
}
```

#### 2. 定义BST类
BST也就是二叉树，该类包含一个数据成员Node类，初始化根结点root为空，并实现插入、遍历的方法


``` JavaScript
// 二叉树实现类
function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
    this.preOrder = preOrder;
    this.postOrder = postOrder;
}
```
#### 3. 实现二叉树的插入
(1) 如果root为空，该节点为根结点。

(2)二叉树的左节点总是小于右节点，所以要判断当前节点与插入节点的大小关系。

(3)当前节点的子节点（按照实际情况，左或右）为空时，插入。设置当前节点left（或者right）为插入节点。

下面是实现的方法。

``` JavaScript
function insert(data) {
    var newNode = new Node(data, null, null);
    var currNode = this.root;
    if (currNode == null) {
        currNode = newNode;
    }
    while(true) {
        var parent = currNode;
        if (data < currNode.data) { 
            currNode = currNode.left;
            if (currNode == null) { // 只有节点为空才会插入，否则一直循环，直到找到适合的地方插入
                currNode = newNode;
                break;
            }
        } else {
            currNode = currNode.right;
            if (currNode == null) {
                currNode = newNode;
                break;
            }
        }
    }
}
```
#### 4. 二叉树的遍历
二叉树的遍历包含中序遍历（按照元素大小遍历，左根右）、先序遍历（根左右）和后序遍历（左右根）。用递归实现实现方法如下：


``` JavaScript
// 中序遍历
function inOrder(node) {
    if (node != null) {
        inOrder(node.left);
        console.log(node.data);
        inOrder(node.right);
    }
}
// 先序遍历
function prOrder(node) {
    if (node != null) {
        console.log(node.data);
        prOrder(node.left);
        prOrder(node.right);
    }
}
// 后序遍历
function postOrder(node) {
    if (node != null) {
        postOrder(node.left);
        postOrder(node.right);
        console.log(node.data);
    }
}
```
递归的实质其实是栈。

#### 5. 二叉树的查找
包括查找最小值、查找最大值和查找指定值（返回该值所在的节点）。


``` JavaScript
// 最小值
function getMin() {
    var currNode = this.root;
    while (currNode != null) {
        currNode = currNode.left;
    }
    return currNode ? currNode.data : null; // 如果root为null
}
// 最大值
function getMax() {
    var currNode = this.root;
    while(currNode != null) {
        currNode = currNode.right;
    }
    return currNode ? currNode.data : null;
}
// 查找给定值
function find(data) {
    var currNode = this.root;
    while (currNode != null) {
        if (data < currNode.data) {
            currNode = currNode.left;
        } else if (data > currNode.data) {
            currNode = currNode.right;
        } else {
            return currNode;
        }
    }
}
```

#### 6. 二叉树的删除
二叉树的删除实现是比较麻烦的。分为三种情况：1)无子节点 2)有一个子节点 3)有两个子节点，其中第三种情况是最麻烦的。下面我们来看怎么实现这个方法。


``` JavaScript
// 删除
function remove(data) {
    root = removeNode(this.root, data);
}

function removeNode(node, data) {
    if (node == null) {
        return null;
    }
    if (data == node.data) {
        // 没有子节点
        if (node.left == null && node.right == null) {
            return null;
        }
        // 有一个节点
        if (node.left == null) {
            return node.right;
        }
        if (node.right == null) {
            return node.left;
        }
        // 处理有两个子节点的情况 1.复制适合的节点，赋值给将要删除的节点 2.删除被复制的节点（该节点没有/只有一个子节点）
        var tempNode = getSmallest(node.right);
        node.data = data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    } else if (data < node.data) {
        node.left = removeNode(node.left, data);
    } else {
        node.right = removeNode(node.right, data);
    }
}
// 找到右侧最小节点
function getSmallest(node) {
    while (node != null) {
        node = node.left;
    }
    return node;
}
```
二叉树的删除，有以下两个正确的做法。

1.将左节点的最大值节点作为新节点。
2.将右侧节点最小值作为新节点。

当然，本文仅限于存储数字类型的节点，如果要存储字符串类型，那就得在insert方法改一改了。




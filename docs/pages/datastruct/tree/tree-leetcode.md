# leetcode里二叉树的经典题目



94，98，100，101，104，144，145，235，236



代码AC



#### [98. 验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree/)   ==> 待定

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root, prev) {
	
}
```





#### [100. 相同的树](https://leetcode-cn.com/problems/same-tree/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
	if (p === null && q === null) {
    return true
  }
  if (p === null || q === null) {
    return false
  }
  return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
```



#### [101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if (root === null) {
    return true
  }
  return check(root.left, root.right)
};
// 转化成相同的树来求解
function check(p, q) {
  if (p === null && q === null) {
    return true
  }
  if (p === null || q === null) {
    return false
  }
  return p.val === q.val && check(p.left, q.right) && check(p.right, q.left)
}
```





#### [104. 二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  if (root === null) {
    return 0
  }
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```





#### [144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  let stack = []
  let result = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      result.push(root.val)
      root = root.left
    }
    root = stack.pop()
    root = root.right
  }
  return result
};
```



#### [94二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  let result = []
  let stack = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    result.push(root.val)
    root = root.right
  }
  return result
};
```





#### [145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  let stack = []
  let result = []
  if (root === null) {
    return result
  }
  stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    result.push(node.val)
    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
  }
  return result.reverse()
};
```



#### [235. 二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 1.递归
var lowestCommonAncestor = function(root, p, q) {
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  }
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  }
  return root
};
// 2.迭代
var lowestCommonAncestor = function(root, p, q) {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right
    } else {
      return root
    }
  }
  return null
};
```



#### [236. 二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/)

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (root === null || root === p || root === q) {
    return root
  }
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)
  return left === null ? right : right === null ? left : root
};
```




























































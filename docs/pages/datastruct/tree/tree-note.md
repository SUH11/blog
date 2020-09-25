# 树



1. 树是什么

   树是一种分层数据的抽象模型。





2. 树的相关术语
   - 根节点
   - 子树
     - 左子树
     - 右子树
   - 二叉树
     - 二叉搜索树（BST）
     - 自平衡二叉搜索树（AVL）
       - 任何一个节点左右两侧子树的高度之差最多为1
       - 添加或移除节点时，AVL树会尽可能尝试转换为完全树。
       - 红黑树
         - 多次插入和删除的自平衡树，红黑树是比较好的
         - 插入和删除频率较低（我们更需要多次进行搜索操作），那么AVL树比红黑树更好



3. 树的遍历
   - 前序遍历
   - 中序遍历
   - 后序遍历
     - 递归
     - 非递归



4. 红黑树
   1. 每个节点不是红的就是黑的
   2. 树的根节点是黑的；
   3. 所有叶节点都是黑的（用NULL引用表示的节点）；
   4. 如果一个节点是红的，那么它的两个子节点都是黑的；
   5. 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点；
   6. 从给定的节点到它的后代节点（NULL叶节点）的所有路径包含相同数量的黑色节点。



leetcode题目：

| 题目 | 地址                                                         |                             题解                             | 通过率 | 难度 |
| :--: | :----------------------------------------------------------- | :----------------------------------------------------------: | :----: | :--: |
|  94  | [二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal) | [855](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/solution) | 72.6%  | 中等 |
|  98  | [验证二叉搜索树](https://leetcode-cn.com/problems/validate-binary-search-tree) | [968](https://leetcode-cn.com/problems/validate-binary-search-tree/solution) | 32.3%  | 中等 |
| 100  | [相同的树](https://leetcode-cn.com/problems/same-tree)       |  [945](https://leetcode-cn.com/problems/same-tree/solution)  | 60.1%  | 简单 |
| 101  | [对称二叉树](https://leetcode-cn.com/problems/symmetric-tree) | [1093](https://leetcode-cn.com/problems/symmetric-tree/solution) | 52.9%  | 简单 |
| 104  | [二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree) | [1245](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/solution) | 74.9%  | 简单 |
| 144  | [二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal) | [651](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/solution) | 66.6%  | 中等 |
| 145  | [二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal) | [615](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution) | 72.3%  | 中等 |
| 235  | [二叉搜索树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree) | [377](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-search-tree/solution) | 64.9%  | 简单 |
| 236  | [二叉树的最近公共祖先](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree) | [616](https://leetcode-cn.com/problems/lowest-common-ancestor-of-a-binary-tree/solution) | 65.2%  | 中等 |


常用的方法：

1. 递归
1. 模拟栈


























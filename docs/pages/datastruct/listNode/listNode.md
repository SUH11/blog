# 链表概览



简单分为单链表、双链表（有previos指针指向前面的节点）

```javascript
function listNode(val) {
  this.val = val
  this.next = null
}
```

也分为普通链表和环形链表

![](https://cdn.nlark.com/yuque/0/2020/png/388398/1590576349874-df4c2e1d-f6d2-4a98-b78f-90e3a08a5906.png)

leetcode题目：

| [删除链表中的节点](https://leetcode-cn.com/problems/delete-node-in-a-linked-list) | [356](https://leetcode-cn.com/problems/delete-node-in-a-linked-list/solution) | 81.5% | 简单 |  |
| :-: | :-- | --- | --- | --- |
| 面试题24 | [反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof)  <br />设置当前节点的prev指向cu rr.next | [396](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/solution) | 75.2% | 简单 |
| 206 | [反转链表](https://leetcode-cn.com/problems/reverse-linked-list) | [4970](https://leetcode-cn.com/problems/reverse-linked-list/solution) | 69.1% | 简单 |
| 面试题52 | [两个链表的第一个公共节点](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof)   <br />a + b + c = b + c + a | [191](https://leetcode-cn.com/problems/liang-ge-lian-biao-de-di-yi-ge-gong-gong-jie-dian-lcof/solution) | 63.8% | 简单 |
| 21 | [合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists)  <br />归并 | [1155](https://leetcode-cn.com/problems/merge-two-sorted-lists/solution) | 62.6% | 简单 |
| 160 | [相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists)  <br />a + b + c = b + c + a | [552](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/solution) | 54.7% | 简单 |
| 141 | [环形链表](https://leetcode-cn.com/problems/linked-list-cycle)  <br />判断有无环：用快慢指针 | [717](https://leetcode-cn.com/problems/linked-list-cycle/solution) | 48.0% | 简单 |
| 203 | [移除链表元素](https://leetcode-cn.com/problems/remove-linked-list-elements) | [402](https://leetcode-cn.com/problems/remove-linked-list-elements/solution) | 45.5% | 简单 |
| 445 | [两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii) | [520](https://leetcode-cn.com/problems/add-two-numbers-ii/solution) | 57.3% | 中等 |
| 142 | [环形链表 II](https://leetcode-cn.com/problems/linked-list-cycle-ii)  <br />判断相遇点：<br />1. 判断是否有环<br />2. 无：退出<br />3.有：相遇点fast走1，头节点slow走1<br />4. fast=slow就是相遇点<br />2(F + a) = F + a + b + a | [422](https://leetcode-cn.com/problems/linked-list-cycle-ii/solution) | 50.4% | 中等 |
| 2 | [两数相加](https://leetcode-cn.com/problems/add-two-numbers)  <br />链表不能反转，用栈 | [2408](https://leetcode-cn.com/problems/add-two-numbers/solution) | 37.4% | 中等 |
| 23 | [合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists)  <br />1. 先归并 | [821](https://leetcode-cn.com/problems/merge-k-sorted-lists/solution) | 51.7% | 困难 |


常用的方法：

1. 逆序用栈，例如反转链表
1. 判断相交：

```
a + b + c = b + c + a
```

​                                           ![image.png](https://cdn.nlark.com/yuque/0/2020/png/388398/1590576392906-c06610aa-fa3f-4150-95cf-7c6fa8bbe6ac.png)


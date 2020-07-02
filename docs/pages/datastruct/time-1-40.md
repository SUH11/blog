# 算法笔记 - leetcode







1.链表和数组

题目：206 141 142

```javascript
/**
 * [206] 反转链表
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  let prev = null
  let curr = head
  while (curr) {
    [prev, curr.next, curr] = [curr, prev, curr.next]
  }
}
```

```javascript
/**
 * [142] 环形链表 II
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  let fast = head
  let slow = head
  let start = head
  while(fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
    	while(start) {
        if (start === slow) {
          return start
        }
        start = start.next
        slow = slow.next
      } 
    }
  }
  return null
}
```



2.堆、栈、队列

题目：20 703 239

用队列实现栈

用栈实现队列



3.哈希表

题目：242 1 15 18



4.树、二叉树、二叉搜索树、二叉树遍历

题目：98 235 236



5.递归、分治

题目：50 169



6.贪心算法

题目：122



7.广度优先搜索



8.深度优先搜索














































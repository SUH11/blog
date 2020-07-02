# leetcode里链表的经典题目





代码AC

### [206] **反转链表**

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
    // 注意位置
    [prev, curr.next, curr] = [curr, prev, curr.next]
  }
}
```



### [142] **环形链表 II**

```javascript
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
  // 方法：1.路径比较 2.设置一个时间 3.Set 4.快慢指针
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



### [203] **移除链表元素**

```javascript
/*
 * [203] 移除链表元素
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
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (head, val) {
  let ele = {
    next: head
  }
  let curr = ele
  while(curr.next) {
    if (curr.next.val === val) {
      curr.next = curr.next.next
    } else {
      curr = curr.next
    }
  }
  return ele.next
}
```



### [445] 两数相加 II

```javascript
/**
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let s1 = []
  let s2 = []
  while (l1 || l2) {
    if (l1) {
      s1.push(l1.val)
      l1 = l1.next
    }
    if (l2) {
      s2.push(l2.val)
      l2 = l2.next
    }
  }
  let exceed = 0
  let curr = null
  let next
  while (s1.length || s2.length) {
    const sum = (s1.pop() || 0) + (s2.pop() || 0) + exceed
    exceed = parseInt(sum / 10)
    next = curr
    curr = {
      val: sum % 10,
      next
    }
  }
  if (exceed) {
    next = curr
    curr = {
      val: exceed,
      next
    }
  }
  return curr
};
```










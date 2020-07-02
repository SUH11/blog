# leetcode里链表的经典题目





代码AC

### [[206] **反转链表**](https://leetcode-cn.com/problems/reverse-linked-list/)

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



### [[142] **环形链表 II**](https://leetcode-cn.com/problems/linked-list-cycle-ii/)

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



### [[203] **移除链表元素**](https://leetcode-cn.com/problems/remove-linked-list-elements/)

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



### [[445] 两数相加 II](https://leetcode-cn.com/problems/add-two-numbers-ii/)

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



### [[23] 合并K个排序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if (!lists ||!lists.length) {
    return null
  }
  // 分治
  return mergeSort(lists, 0, lists.length - 1)
};
function mergeSort(list, l, r) {
  if (l === r) {
    return list[l]
  }
  const mid = parseInt((l + r) >> 1)
  return merge(mergeSort(list, l, mid), mergeSort(list, mid + 1, r))
}
function merge(l1, l2) {
  let ele = {
    next: null
  }
  let curr = ele
  while (l1 && l2) {
    let val
    if (l1.val < l2.val) {
      val = l1.val
      l1 = l1.next
    } else {
      val = l2.val
      l2 = l2.next
    } 
    curr.next = {
      val,
      next: null
    }
    curr = curr.next
  }
  if (l1) {
    curr.next = l1
  }
  if (l2) {
    curr.next = l2
  }
  return ele.next
}
```






# leetcode里动态规划的经典题目



509,

70，120，152，121，122，123，188，309，714，300，322，72

代码AC





#### [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  let dp = [1, 1, 2]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};
```


















































































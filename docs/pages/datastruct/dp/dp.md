# 动态规划

#### 步骤

1. 递归+记忆化 —> 递推
2. 状态的定义:opt[n], dp[n], fib[n]
3. 状态转移⽅方程:opt[n] = best_of(opt[n-1], opt[n-2], ...) 4. 最优⼦子结构







leetcode题目：

| 题目 | 地址                                                         |                             题解                             | 通过率 | 难度 |
| :--: | :----------------------------------------------------------- | :----------------------------------------------------------: | :----: | :--: |
| 509  | [斐波那契数](https://leetcode-cn.com/problems/fibonacci-number) | [488](https://leetcode-cn.com/problems/fibonacci-number/solution) | 66.3%  | 简单 |
|  70  | [爬楼梯](https://leetcode-cn.com/problems/climbing-stairs)   | [1684](https://leetcode-cn.com/problems/climbing-stairs/solution) | 50.5%  | 简单 |
| 120  | [三角形最小路径和](https://leetcode-cn.com/problems/triangle) |  [915](https://leetcode-cn.com/problems/triangle/solution)   | 66.7%  | 中等 |
| 152  | [乘积最大子数组](https://leetcode-cn.com/problems/maximum-product-subarray) | [610](https://leetcode-cn.com/problems/maximum-product-subarray/solution) | 40.2%  | 中等 |
| 121  | [买卖股票的最佳时机](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock) | [1735](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution) | 54.8%  | 简单 |
| 122  | [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii) | [1036](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/solution) | 62.8%  | 简单 |
| 123  | [买卖股票的最佳时机 III](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii) | [320](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iii/solution) | 45.0%  | 困难 |
| 188  | [买卖股票的最佳时机 IV](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv) | [221](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/solution) | 30.3%  | 困难 |
| 309  | [最佳买卖股票时机含冷冻期](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown) | [431](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/solution) | 57.1%  | 中等 |
| 714  | [买卖股票的最佳时机含手续费](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee) | [188](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/solution) | 68.2%  | 中等 |
| 300  | [最长上升子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence) | [858](https://leetcode-cn.com/problems/longest-increasing-subsequence/solution) | 45.2%  | 中等 |
| 322  | [零钱兑换](https://leetcode-cn.com/problems/coin-change)     | [896](https://leetcode-cn.com/problems/coin-change/solution) | 41.1%  | 中等 |
|  72  | [编辑距离](https://leetcode-cn.com/problems/edit-distance)   | [574](https://leetcode-cn.com/problems/edit-distance/solution) | 59.7%  | 困难 |


常用的方法：

1. 先暴力，再递归，最后递推
1. 想所有的可能性


















































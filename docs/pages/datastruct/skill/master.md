# Master公式



### 1. Master公式

![T(N) = a*T(\frac{N}{b}) + O(N^d)](https://math.jianshu.com/math?formula=T(N)%20%3D%20a*T(%5Cfrac%7BN%7D%7Bb%7D)%20%2B%20O(N%5Ed))

> - a：子问题被调用的次数
> - ![\frac{N}{b}](https://math.jianshu.com/math?formula=%5Cfrac%7BN%7D%7Bb%7D)：子问题的规模
> - N：母问题的规模
> - d：额外操作的次数

1. 当![log_{b}a < d](https://math.jianshu.com/math?formula=log_%7Bb%7Da%20%3C%20d)时，![O(N^d)](https://math.jianshu.com/math?formula=O(N%5Ed))；
2. 当![log_{b}a > d](https://math.jianshu.com/math?formula=log_%7Bb%7Da%20%3E%20d)时，![O(N^{log_{b}a})](https://math.jianshu.com/math?formula=O(N%5E%7Blog_%7Bb%7Da%7D))；
3. 当![log_{b}a = d](https://math.jianshu.com/math?formula=log_%7Bb%7Da%20%3D%20d)时，![O(N^d*logN)](https://math.jianshu.com/math?formula=O(N%5Ed*logN))；



参考：

|                             算法                             |                             公式                             |                           运算时间                           | 备注 |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| [二分搜寻算法](https://zh.wikipedia.org/wiki/二分搜尋演算法) | ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/ff067abb820d6c0a7cbdac9267dbcf9b041c5d81) | ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/65bac5223de9c91eb3e89a032b5c51fd3041dc66) |      |
|      [二叉树](https://zh.wikipedia.org/wiki/二叉树)遍历      | ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/58df4e2f5501d18aa5375b7d251701a7ab80a743) | ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/a6351206e27071559aa4472579095994f650d76b) |      |
|      [合并排序](https://zh.wikipedia.org/wiki/合併排序)      | ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/cf3f59c1c465b6e6804d35581269f1d75f62cca0) | ![](https://wikimedia.org/api/rest_v1/media/math/render/svg/a6351206e27071559aa4472579095994f650d76b) |      |





### 2. Master公式的应用举例

> 使用递归求最大值

```javascript
function getMax(arr, l, r) {
  if (l === r) {
    return arr[l] // d = 1
  }
  const mid = (l + r) >> 1
  const lMax = getMax(arr, l, mid) // n/2 b = 2, a = 2
  const rMax = getMax(arr, mid + 1, r)
  return Math.max(lMax, rMax)
}
```

- 解析：如上是求数组中的最大值的方法，将数组划分成左半部和右半部，求出左边最大值，在求出右边的最大值，最后比较左右的最大值，求出整个数组的最大值。

- 因为将数组划分为左右两部分，所以子问题的规模为![\frac{N}{2}](https://math.jianshu.com/math?formula=%5Cfrac%7BN%7D%7B2%7D)，即b = 2，又有`const lMax = getMax(arr, l, mid)`和`const rMax = getMax(arr, mid + 1, r)`的两次调用，所以a = 2，剩下来，有`return arr[l]`、`const mid = (l + r) >> 1`、`return Math.max(lMax, rMax)`三个常数级的操作，所以d = 0。

  将a,b,d代入，则其Master公式可表示为：![T(N) = 2 * T(\frac{N}{2}) + O( 1 )](https://math.jianshu.com/math?formula=T(N)%20%3D%202%20*%20T(%5Cfrac%7BN%7D%7B2%7D)%20%2B%20O(%201%20))

  根据Master公式，![log_b{a} = log_2{2} = 1 > d = 0](https://math.jianshu.com/math?formula=log_b%7Ba%7D%20%3D%20log_2%7B2%7D%20%3D%201%20%3E%20d%20%3D%200)，所以，复杂度为![O(N^{log_ba}) = O(N)](https://math.jianshu.com/math?formula=O(N%5E%7Blog_ba%7D)%20%3D%20O(N))

### 3. 注意事项

使用Master公式分析递归问题复杂度时，**各子问题的规模应该是一致的**，否则不能使用Master公式。









参考：[维基百科]([https://zh.wikipedia.org/wiki/%E4%B8%BB%E5%AE%9A%E7%90%86](https://zh.wikipedia.org/wiki/主定理))

转自：[数据结构与算法学习(二)——Master公式及其应用](https://www.jianshu.com/p/ad9ca164c8ce)


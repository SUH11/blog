# 节流防抖



1. ### 节流

   触发一个事件后，在一段时间内，不重复触发

   > 隔一段时间发一次请求，防止触发间隔太短，浏览器卡死

```javascript
function throttle(fn, interval) {
  let prev = 0
  return function() {
    let now = Date.now()
    let _this = this
    if (now - prev >= interval) {
      fn.apply(_this, arguments)
      prev = now 
    }
  }
}
```



2. ### 防抖

   在第一次触发事件的时候，不立即执行该事件，而是给一个期望值，例如：200ms。

   1. 在200ms内该事件没有重复，执行该函数

   2. 在200ms内该事件重复执行，那么当前计时被取消，重新开始计时
   3. 只执行最后触发的事件

   > 用户点击按钮一段时间后没有再次点击的情况才去发起网络请求，防止用户多次点击提交

   ```javascript
   // 1. 简版
   function debounce(fn, interval = 300) {
     let timer = null
     return function(...args) {
       timer && clearTimeout(timer)
       timer = setTimeout(() => {
         fn.apply(this, args)
       }, interval)
     }
   }
   
   // 2. 加立即执行
   function debounce(fn, interval, immediate) {
     let timer = null
     let debounced = function(..._args) {
       timer && clearTimeout(timer)
       if (immediate) {
         let callNow = !timer
         if (callNow) {
           fn.apply(this, _args)
         }
         timer = setTimeout(() => {
           timer = null
         }, interval)
       } else {
         timer = setTimeout(() => {
           fn.apply(this, _args)
         }, interval)
       }
     }
     debounced.cancel = function() {
       clearTimeout(timer)
       timer = null
     }
     return debounced
   }
   ```



























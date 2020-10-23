## **requestAnimationFrame**

1. 希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画

   requestAnimationFrame(step)

2. 如果要循环调用，回调函数自身必须再次执行requestAnimationFrame(step)

3. step回调函数会被传入：DOMHighResTimeStamp

   DOMHighResTimeStamp指示当前被 requestAnimationFrame() 排序的回调函数被触发的时间

4. 返回值：一个 long 整数，请求 ID ，是回调列表中唯一的标识

   可以传这个ID给cancelAnimationFrame取消回调函数

```javascript
let start = null
const element = document.getElementById('SomeElementYouWantToAnimate')
element.style.position = 'absolute'

function step(timestamp) {
  console.log('timestamp:::', timestamp)
  if (!start) {
    start = timestamp
  }
  let progress = timestamp - start
  element.style.left = Math.min(progress / 10, 200) + 'px'
  if (progress < 2000) {
    const timer = window.requestAnimationFrame(step)
    if (timer > 50) {
      window.cancelAnimationFrame(timer)
    }
  }
}
window.requestAnimationFrame(step)
```

cancelAnimationFrame


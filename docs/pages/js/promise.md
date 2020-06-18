### Promise

异步解决方案：

1. callback
2. 事件监听
3. 发布订阅（观察者模式）
4. Promise
5. Generator
6. sync await
7. web worker

Promise / A+ 规范

https://juejin.im/post/5c4b0423e51d4525211c0fbc



手写Promise

```javascript
const PENDING = 'pending'
const RESOLVE = 'resolved'
const REJECTED = 'rejected'
function MPromise(fn) {
  this.state = PENDING
  this.value = null
  this.resolvedCallbacks = []
  this.rejectedCallbacks = []
  
  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
  
  function resolve(value) {
    if (this.state === PENDING) {
      this.state = RESOLVED
      this.value = value
      this.resolvedCallbacks.map(cb => cb(this, value))
    }
  }
  function reject(value) {
    if (this.state === PENDING) {
      this.state = REJECTED
      this.value = value
      this.rejectedCallbacks.map(cb => cb(this, value))
    }
  }
}
MPromise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
  if (this.state === PENDING) {
    this.resolvedCallbacks.push(resolvedCallbacks)
    this.rejectedCallbacks.push(rejectedCallbacks)
  }
  if (this.state === RESOLVE) {
    onFulfilled(this.value)
  }
  if (this.state === REJECTED) {
    onRejected(this.value)
  }
}
```




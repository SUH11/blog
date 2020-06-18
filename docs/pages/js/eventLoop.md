Event Loop

一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

宏任务：`setTimeout`	`MessageChannel`	`postMessage`	`setImmediate`	`script`  `I/O`  `UI rendering`

微任务：`Promise.then`  `proccess.nextTick`	`MutationObserver` 

Event Loop执行顺序：

- 首先执行同步代码，这属于宏任务
- 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
- 执行所有微任务
- 当执行完所有微任务后，如有必要会渲染页面
- 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 `setTimeout` 中的回调函数



Node中的Event Loop

和浏览器的Event Loop完全不同。

宏任务：

1. timer
2. I/O
3. idle、prepare
4. poll
5. check
6. close callbacks

微任务：

process.nextTick

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会**清空队列中的所有回调函数**，并且优先于其他 microtask 执行。
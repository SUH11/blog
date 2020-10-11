# 面试知识点复盘1



1. css

   flex的属性有哪些？

   css动画有哪些？过渡动画有哪些？

   垂直居中方案有哪些？

   

2. js基础

   canvas绘画 + echarts

   说一下什么是原型链☑️

   - 原型链：如果在第一个对象上没有找到需要的属性或者方法引用，引擎就会继续在[[Prototype]]关联的对象上进行查找。

   同理，如果在后者中也没有找到需要的引用就会继续查找它的[[Prototype]]，以此类推。这一系列对象的链接被称为“原型链”。

   **call apply bind的区别？**☑️

   - call、bind、apply都是显示绑定this
   - call、apply会立即执行，bind会返回原函数
   - call参数是一个个的，apply参数是数组（数组解构会不会费时间？）

   节流防抖是什么？

   手写bind、节流防抖

   节流防抖、列表多次点击 只返回最后一个（节流）

   new做了什么？

   什么是跨域？跨域的解决方案有哪些？

   首屏加载优化方案有哪些？

   深拷贝怎么做？手写深拷贝？

   递归和快排的区别？

   eventloop宏任务、微任务的区别？

   DOM事件机制？

   event.addEventListener()的第三个参数是什么？true false分别代表什么？

   什么是闭包？写过闭包嚒？用闭包实现过什么功能嚒？

   浏览器垃圾回收机制？

   性能优化的方案？

   

   

   箭头函数和普通函数的区别？

   generate是什么？async await是什么？async/await的实现原理？

   

3. vue

   vue响应式原理？

   Object.defineProperty和proxy的区别？

   vue3.0里proxy的实现原理？

   new Vue的过程是怎么样的？（只执行了this._init()函数）

   阅读过vue-cli的源码嚒？

   vue-router有哪些模式？实现的原理？

   vuex的action和mutation为什么要先异步再同步？

   什么是虚拟DOM？有什么优点和缺点？

   diff算法的具体实现是什么？

   

4. react

   react生命周期？

   hooks用过嚒？

   redux了解嚒？

   函数式组件和class组件有什么区别？

   mixin好处是什么，坏处是什么。代码说明。为什么react 之前使用，现在不推荐使用？

   

5. webpack

   loader和plugin的区别？

   常用的plugin有哪些？

   打包的时候很慢，怎么做优化？

   编译器原理？

   



6. http

   url从浏览器按下的整个过程？

   https是什么？

   说一下https一次请求的过程？

   https怎么实现安全？

   对称加密、非堆成加密算法？签名是干什么的？

   tcp连接三次握手？

   401，403的区别？301，302的区别？



7. 主观性题目

   你有从0到1的项目嚒？哪个项目是你自己搭建的？

   说一下你遇到的困难

   你印象最深刻的是哪个项目？

   为什么离职？

   平时怎么学习？

   你选择一家新公司，会基于哪些点来考虑？

   个人规划和职业发展？



8. 其他

   git流了解过嚒？

   vue和react的区别？

   vue的diff和react的diff？



9. node

   node了解嚒？

   egg是基于哪个框架封装的？koa

   node中间件了解嚒？（同react中间件）
























# call apply bind原理及实现



**绑定优先级**

1. new绑定

2. 显示绑定
3. 隐式绑定
4. 默认绑定



1. ### call、apply原理

   call apply会劫持原来对象的方法，继承传入对象的属性

   ```javascript
   function Person() {
   	this.name = 'I am Person'
   }
   Person.prototype.name = 'myname'
   Person.prototype.showName = function() { // 1.劫持了这个方法
   	console.log('劫持另外一个对象的方法，继承另外一个对象的属性', this.name) // call后这里是name，并不是myname
   }
   
   var obj = {
   	name: 'name', // 2.继承了这个属性
   	myName: 'this is my name'
   }
   var p = new Person()
   
   p.showName.call(obj) // 劫持了obj的属性，并继承了p(Person的实例)的方法
   ```

   

   **call实现**

   ```javascript
   // 1. 使用
   let p = new Person()
   let obj = {
     name: 'objName'
   }
   p.showName.call(obj) // 这里的this是showName函数
   
   // 2. 实现
   Function.prototype.call = function(context) {
     if (typeof this !== 'function') {
       throw new TypeError('Error....')
     }
     context = context || window
     context.fn = this
     const args = [...arguments].slice(1)
     const result = context.fn(...args) // 这里是：Man.fn, 把Man这个函数传进去当作this调用了[其实就是当作对象来调用了]
     delete context.fn
     return result
   }
   ```

   **apply实现**

   ```javascript
   // 1. 使用
   p.showName.apply(obj)
   
   // 2. 实现
   Function.prototype.apply = function(context) {
     if (typeof this !== 'function') {
       throw new TypeError('Error....')
     }
     context = context || window
     context.fn = this
     if (arguments[1]) {
       context.fn(...arguments[1])
     } else {
       context.fn()
     }
     delete context.fn
     return result
   }
   ```

   特性：

   	1. call参数是一个一个的
    	2. apply参数是数组
    	3. call、apply会立即执行，bind返回原函数



2. ### bind

   不管我们给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定

   首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。
   硬绑定：硬绑定的bar不可能再修改它的this

   **特点：**

   - this硬绑定
   - 不会立即执行
   - 直接返回一个函数
   - 多次使用bind，只绑定第一个对象，并将参数进行合并

   **手写bind：**

   > bind原理：
   > 	1.返回了一个新函数
   > 	2.将this（传入的参数）关键字绑定到该函数
   > 	3.参数合并，将bind函数的参数与原来的函数参数合并作为参数传给创建的新的函数
   > 	4.返回该函数

   ```javascript
   if (!Function.prototype.bind) {
     Function.prototype._bind = function() {
       var _arguments = Array.prototype.slice.call(arguments)
       var _target = _arguments.shift()
       var _this = this
   
       var fn = function() {
         var _args = Array.prototype.slice.call(arguments)
         var obj = this instanceof fn ? this : target // 解决new的问题
         _this.apply(obj, _arguments.concat(_args))
       }
       fn.prototype = Object.create(this.prototype)
       return fn
     }
   }
   
   // 测试
   function A(a,b){
     this.a = a
     this.b = b
   }
   var c = {x: 10}
   var a = A._bind(c, 1)
   var b = new a(2) // {a: 1, b: 2}
   
   console.log(b)
   ```

   
















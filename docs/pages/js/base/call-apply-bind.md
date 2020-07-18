
**绑定优先级**
	1. new绑定
	2. 显示绑定
	3. 隐式绑定
	4. 默认绑定


**call实现**

```javascript
Function.prototype.myCall = function(context) {
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
Function.prototype.myApply = function(context) {
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



**bind**
不管我们给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定

首先，`new` 的方式优先级最高，接下来是 `bind` 这些函数，然后是 `obj.foo()` 这种调用方式，最后是 `foo` 这种调用方式，同时，箭头函数的 `this` 一旦被绑定，就不会再被任何方式所改变。
硬绑定：硬绑定的bar不可能再修改它的this

手写bind：

> bind原理：
> 		1.返回了一个新函数
> 		2.将this（传入的参数）关键字绑定到该函数
> 		3.参数合并，将bind函数的参数与原来的函数参数合并作为参数传给创建的新的函数
> 		4.返回该函数

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
var cc = {x: 10}
var a = A._bind(c, 1)
var b = new a(2) // {a: 1, b: 2}

console.log(b)
```
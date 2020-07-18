# this



### this

从函数内部引用函数自身

```javascript
function foo(num) {
	console.log('Foo: ', num)
	
	this.count ++ // 创建了一个全局变量，值为NaN
}
foo.count = 0

for (var i = 0; i < 10; i++) {
	if (i > 5) {
		foo(i) // 6 7 8 9 
	}
}

console.log(foo.count) // 0
```

如果要从函数对象内部引用它自身，那只使用this是不够的。一般来说你需要通过一个指向函数对象的词法标识符（变量）来引用它。

> 引用当前正在运行的函数对象：arguments.callee // 已弃用

解决1:

使用foo标识符替代this来引用函数对象：

```javascript
function foo(num) {
	console.log('Foo: ', num)
	foo.count ++ // 
}
...
```

解决2:

强制this指向foo

```javascript
// ...
for (var i = 0; i < 10; i++) {
	if (i > 5) {
		foo.call(foo, i) // 使用call可以确保this指向函数foo本身
	}
}
// ...
```

`this在任何情况下都不指向函数的词法作用域`

错误示范：

```javascript
function foo() {
	var a = 2
	this.bar() // 错误1
}
function bar() {
	console.log(this.a)
}
foo()
```

> 每当你想要把this和词法作用域的查找混合使用时，一定要提醒自己，这是无法实现的。
>
> this是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。

理解this：

	1. 分析调用位置

   	2. 绑定规则：默认绑定、隐式绑定、显示绑定

(1)默认绑定

```javascript
// 默认绑定
function foo() {
	console.log(this.a)
}
var a = 2

foo() // 2
```

（2）隐式绑定：另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含

> 对象属性引用链中只有上一层或者说最后一层在调用位置中起作用

```javascript
// 隐式绑定
function foo() {
	console.log(this.a)
}
var obj2 = {
	a: 42,
	foo: foo
}
var obj1 = {
	a: 2,
	obj2: obj2
}
obj1.obj2.foo() // 42
```



```javascript
// 隐式绑定：隐式丢失
function foo() {
	console.log(this.a)
}

var obj = {
	a: 2,
	foo: foo
}

var bar = obj.foo // 这是一个饮用，引用foo函数本身，使用了默认绑定
var a = 'oops, global'

bar() // oops, global
```

（3）显示绑定：call、apply、bind、new

```javascript
// 都是Function.prototype下的方法
// call apply会立即执行，bind返回原函数
foo.call(obj, arg1, arg2...)
foo.apply(obj, [arg1, arg2])
const newFn = foo.bind(obj, arg1, arg2...)
```

call apply会劫持另外一个对象的方法，继承另外一个对象的属性

```javascript
function Person() {
	this.name = 'I am Person'
}
Person.prototype.name = 'myname'
Person.prototype.showName = function() {
	console.log('劫持另外一个对象的方法，继承另外一个对象的属性', this.name) // call后这里是name，并不是myname
}

var obj = {
	name: 'name',
	myName: 'this is my name'
}
var p = new Person()

p.showName.call(obj) // 劫持了obj的属性，并继承了p(Person的实例)的方法
```



手写bind：

```javascript
/**
	bind原理：
		1.返回了一个新函数
		2.将this（传入的参数）关键字绑定到该函数
		3.参数合并，将bind函数的参数与原来的函数参数合并作为参数传给创建的新的函数
		4.返回该函数
*/
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

call的实例用法：

```javascript
var obj = {
  a: 10,
  showName: function() {
    console.log('name: ', this.a)
  }
}
function foo() {
  console.log(this.a)
  console.log(this.showName)
}
foo.call(obj) // 10 name: 10
```

硬绑定：硬绑定的bar不可能再修改它的this

```javascript
// 硬绑定
function foo() {
  console.log(this.a)
}

var obj = {
  a: 2
}

var bar = function() {
  foo.call(obj)
}

bar() // 2
setTimeout(bar, 100)

bar.call(window) // 2
```

new绑定：

​	   在JavaScript中，构造函数只是一些使用new操作符时被调用的函数。它们并不会属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一种特殊的函数类型，它们只是被new操作符调用的普通函数而已。

​        实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

> new的过程：
>
> 1．创建（或者说构造）一个全新的对象。
>
> 2．这个新对象会被执行[[Prototype]]连接。
>
> 3．这个新对象会绑定到函数调用的this。
>
> 4．如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

优先级：

	1. new绑定

   	2. 显示绑定
   	3. 隐式绑定
   	4. 默认绑定

> polyfill代码主要用于旧浏览器的兼容

判断this：

1．函数是否在new中调用（new绑定）？如果是的话this绑定的是新创建的对象。

```javascript
var bar = new foo()
```

2．函数是否通过call、apply（显式绑定）或者硬绑定调用？如果是的话，this绑定的是指定的对象。

```javascript
var bar = foo.call(obj2)
```

3．函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this绑定的是那个上下文对象。

```javascript
var bar = obj1.foo()
```

4．如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到undefined，否则绑定到全局对象。

```javascript
var bar = foo()
```

就是这样。对于正常的函数调用来说，理解了这些知识你就可以明白this的绑定原理了。不过……凡事总有例外。

> 如果你把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则：

bind(..)可以对参数进行柯里化

> 如果函数并不关心this的话，你仍然需要传入一个占位值，这时null可能是一个不错的选择

```javascript
// 柯里化
function foo(a, b) {
  console.log('a: ', a, ' b: ', b)
}
foo.apply(null, [2, 3])

var bar = foo.bind(null, 2)
bar(3)
```

间接引用：

```javascript
function foo() {
  console.log(this.a)
}

var a = 2
var o = {
  a: 3,
  foo: foo
}
var p = {
  a: 4
}

o.foo() // 3
// 赋值表达式p.foo = o.foo的返回值是目标函数的引用，
// 因此调用位置是foo()而不是p.foo()或者o.foo()。
// 根据我们之前说过的，这里会应用默认绑定。
(p.foo = o.foo)() // 2
```

箭头函数：箭头函数的绑定无法被修改。（new也不行！）


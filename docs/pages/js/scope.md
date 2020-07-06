# 作用域



##### 作用域

`LHS`：变量出现在赋值操作的左侧

​			不成功的LHS引用会导致自动隐式地创建一个全局变量（非严格模式下），该变量使用LHS引用的目标作为标识符，或者抛出**ReferenceError**异常（严格模式下）

`RHS`：变量出现在赋值操作的右侧	retrieve his source value 获取到它的值

​		  不成功的RHS引用会导致抛出**ReferenceError**异常



ReferenceError：同作用域判别失败相关

TypeError：则代表作用域判别成功了，但是对结果的操作是非法或不合理的。

```javascript
function foo(a) { // RHS LHS(隐式分配变量)
	var b = a // RHS LHS
	return a + b // RHS RHS
}
var c = foo(2) // LHS
```



##### 欺骗词法：修改作用域

##### eval

​	eval(..)函数可以接受一个字符串为参数，并将其中的内容视为好像在书写时就存在于程序中这个位置的代码。换句话说，可以在你写的代码中用程序生成代码并运行，就好像代码是写在那个位置的一样。

```javascript
var b = 10
foo('var b = 2', 1) // 1 2，局部作用域覆盖了原来的b
function foo(str, a) {
	eval(str)
	console.log(a, b)
} 
```

setTimeout(..)和setInterval(..)的第一个参数可以是字符串，字符串的内容可以被解释为一段动态生成的函数代码。这些功能已经过时且并不被提倡。

##### with

​	with通常被当作重复引用同一个对象中的多个属性的快捷方式，可以不需要重复引用对象本身

```javascript
function foo(obj) {
  with (obj) {
    a = 2 // 这里是LHS
  }
}
var obj1 = {
  a: 10
}
var obj2 = {
  b: 20
}
foo(obj1)
console.log(obj1.a) // 10
foo(obj2)
console.log(obj2.a) // undefined
console.log(a) // 2 泄漏到全局作用域了
```

with可以将一个没有或有多个属性的对象处理为一个完全隔离的词法作用域，因此这个对象的属性也会被处理为定义在这个作用域中的词法标识符。

尽管with块可以将一个对象处理为词法作用域，但是这个块内部正常的var声明并不会被限制在这个块的作用域中，而是被添加到with所处的函数作用域中。

##### 性能：

JavaScript引擎会在编译阶段进行数项的性能优化，但如果引擎在代码中发现了eval(..)或with，它只能简单地假设关于标识符位置的判断都是无效的，因为无法在词法分析阶段明确知道eval(..)会接收到什么代码，这些代码会如何对作用域进行修改，也无法知道传递给with用来创建新词法作用域的对象的内容到底是什么

总结：1. eval可以改变作用域，例子：更改代码的发生顺序

​			2. with会隔离一个对象属性作为作用域块，在该块类用var会被添加到with的函数作用域

​			3. 性能：在with和eval里的代码无法做优化



##### 立即执行函数表达式

```
var a = 2
(function IIFE() {
	var a = 3
	console.log(a) // 3
})()
console.log(a) // 2
```

try/catch的catch分句会创建一个块作用域

```javascript
try {
	// ...
} catch (err) {
	// ...
}
```



##### let

let为其声明的变量隐式地劫持了所在的块作用域。

暂时性死区（TDZ）：由于代码中的变量还没有初始化而不能被引用的情况。

```javascript
{
  a = 2 // ReferenceError
  typeof b // undefined
  typeof a // ReferenceError
  let a 
}

var b = 3
// b = a + b + 5在参数b（=右边的b，而不是函数外的那个）的TDZ中访问b，所以会出错。而访问a却没有问题，因为此时刚好跨出了参数a的TDZ。
// 虽然参数a和b都有默认值，但是函数不带参数时，arguments数组为空。
function foo(a = 42, b = a + b + 5) { // a不报错，b报错
  // ...
}
注意：arguments数组已经被废止
```



##### 变量提升

函数声明会被提升，但是函数表达式却不会被提升

```javascript
foo() // TypeError: foo is not a function

var foo = function() {
	console.log('foo')
}
```

函数声明和变量声明都会被提升，是函数会首先被提升，然后才是变量

```javascript
foo() // 1
var foo
function foo() {
	console.log(1)
}
foo = function() {
	console.log(2)
}
// 实际执行顺序
function foo() { // 得到提升
  console.log(1)
}
foo()
foo = function() {
  console.log(2)
}
```



##### 闭包

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域之外执行。

```javascript
function foo() {
	var a = 2
	
	function bar() { // bar()依然持有对该作用域的引用，而这个引用就叫作闭包。
		console.log(a)
	}
	
	return bar
}
var baz = foo() // a在自己定义的词法作用域以外的地方执行
baz() // 2
```

无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都可以观察到闭包。

```javascript
function wait(message) {
	setTimeout(function timer() {
		console.log(message)
	}, 1000)
}
wait('Hello, look!')
```

在`定时器`、`事件监听器`、`Ajax请求`、`跨窗口通信`、`Web Workers`或者任何其他的异步（或者同步）任务中，**只要使用了回调函数，实际上就是在使用闭包！**

```javascript
// 延迟函数的回调会在循环结束时才执行
for (var i = 1; i <= 5; i++) {
	setTimeout(function timer() {
		console.log(i) // 6 6 6 6 6  五次六
	}, i * 1000)
}
```

实际情况是尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此实际上只有一个i。

改成IIFE：

```javascript
for (var i = 1; i <= 5; i++) {
	(function() {
		var j = i // 需要存储迭代中i的值
		setTimeout(function timer() {
			console.log(j)
		}, j * 1000)
	})()
}
```

改成let：

```javascript
//  let创建了一个作用域块
for (let i = 1; i <= 5; i++) { // 每次迭代i都会被声明，
	setTimeout(function timer() {
		console.log(i)
	}, i * 1000)
}
```



##### 模块模式

1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态。


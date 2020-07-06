# 内置对象



##### 内置对象 *（内建函数）*

1. String
2. Number
3. Boolean
4. Object     
5. Function
6. Array
7. Date       只有构造形式，没有文字形式
8. RegExp
9. Error 
10. Symbol  ES6新增

> 注意：大写是对象，小写才是类型
>
> 原始值"I am a string"并不是一个对象，它只是一个字面量，并且是一个不可变的值。如果要在这个字面量上执行一些操作，比如获取长度、访问其中某个字符等，那需要将其转换为String对象。
>
> 在必要时语言会自动把字符串字面量转换成一个String对象
>
> 所以我们首选更简单的文字形式。建议只在需要那些额外选项时使用构造形式。

```javascript
var str = new String('abc')
typeof str // object
// new String("abc")创建的是字符串"abc"的封装对象，而非基本类型

// 封装对象包装
Object.prototype.toString.call([1, 2, 3]) // "[object Array]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(/abc/) // "[object RegExp]"

// 封装对象释疑
var a = new Boolean(false)
if (!a) { // 我们为false创建了一个封装对象，然而该对象是真值
  console.log('Oops') // 执行不到这里
}

// 拆封
var a = new String('abc')

a.valueOf() // abc

var b = a + '' // abc

// Array

```

Array

```javascript
// Array构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。
var arr = new Array(1, 2, 3)
arr // [1, 2, 3]

// 将包含至少一个“空单元”的数组称为“稀疏数组”
var arr2 = []
```

RegExp()

```javascript
// 动态定义正则表达式  new RegExp("pattern", "flags")
var name = 'Kyle'
var naemPattern = new RegExp('\\b(? :' + name + ')+\\b', 'ig')
var matches = 'Kyleaaa'.match(namePattern)
```

Date()

```javascript
// 获取Unix时间戳
if (!Date.now) {
  Date.now = function() {
    return (new Date()).getTime()
  	// 或者
  	// return +new Date()
  }
  
}
```

Error

```javascript
function foo(x) {
  if (!x) {
    throw new Error('x was not provided')
  }
}
```

Symbol

我们可以使用Symbol(..)原生构造函数来自定义符号。但它比较特殊，不能带new关键字，否则会出错：

```javascript
var sym = Symbol('my own symbol')
typeof sym // 'symbol'

var a = {}
a[sym] = 'foobar'
Object.getOwnPropertySymbols(a) // [Symbol(my own symbol)]
```


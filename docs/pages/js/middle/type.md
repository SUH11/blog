# 类型





##### 类型

6种主要类型

1. string
2. number
3. boolean
4. null       没有构造形式     
5. undefined     没有构造形式
6. object
7. symbol (ES6新增)

> 除对象外，其他统称为“基本类型”
>
> 简单基本类型（string、boolean、number、null和undefined）本身并不是对象

```javascript
// 注意
typeof null === 'object'  // true

// 复合条件
(!a && typeof a === 'object') // true

// object的一个“子类型”  函数是“可调用对象”
typeof function a(){} === 'function' 
```

*typeof运算符总是会返回一个字符串*



undefined和undeclared

已在作用域中声明但还没有赋值的变量，是undefined的。相反，还没有在作用域中声明过的变量，是undeclared的。

```javascript
var a

a // undefined
b // ReferenceError: b is not defined

typeof a // undefined
typeof b // undefined
```

##### 数组

虽然添加了命名属性（无论是通过．语法还是[]语法），数组的length值并未发生变化。

```javascript
let arr = [1, 2, 3]
arr.name = 'Arrya'
arr.length // 3

// 如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当作数字索引来处理。
arr['10'] = 10
arr.length // 11

// 类数组的转换
function foo() {
  return Array.prototype.slice.call(arguments)
}
foo('a', 'b', 'c')

// ES6
var arr = Array.from(arguments)
```

遍历数组

arr.some()

arr.every()

*every(..)和some(..)中特殊的返回值和普通for循环中的break语句类似，它们会提前终止遍历。*

for ... of

```javascript
var arr = [1, 2, 3]

// for..of循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的next()方法来遍历所有返回值。
for (var v of arr) {
  console.log(v) // 1 2 3
}

// 迭代器
// 数组有内置的迭代器

var myArray = [1, 2, 3]
var it = myArray[Symbol.iterator]() // @@iterator本身并不是一个迭代器对象，而是一个返回迭代器对象的函数

it.next() // { value: 1, done: false }
```

目标：自己实现一个迭代器

```javascript
// 对象的迭代器
var myObject = {
  a: 2,
  b: 3
}

Object.defineProperty(myObject, Symbol.iterator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    var o = this
    var idx = 0
    var ks = Object.keys(o)
    
    return {
      next: function() {
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        }
      }
    }
  }
})

// 测试代码
var it = myObject[Symbol.iterator]()

it.next() // { value: 2, done: false }

for (var v of myObject) {
  console.log(v) // 2 3
}

// 其他例子：无限随机数
```



##### 字符串

字符串不可变是指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串。而数组的成员函数都是在其原始值上进行操作。

```javascript
var str = 'foo'

// 方法
str.length
str.indexOf('o')
str.concat('bar')

str.toUpperCase()

// 借用数组方法
Array.prototype.join.call(str, '-') // f-o-o
Array.prototype.map.call(a, function(v) {
  return v.toUpperCase() + '.'
}).join('') // F.O.O
```

反转字符串

```javascript
// 因为字符串是不变的，所以不能用借用数组方法来反转
// Array.prototype.reverse.call(str)会报错
var strNew = str.split('').reverse().join('')
```



##### 数字string

基于IEEE 754 标准，双精度格式（64位二进制）

```javascript
var a = 0.42
// 小数点前面的0可以省略
var b = .42
// 小数点后小数部分最后面的0也可以省略
var c = 42.
// 特别大和特别小的数字默认用指数格式显示
var d = 5e10 // 50,000,000,000
d.toExponential() // "5e+10"

var f = 42.59
a.toFixed(0) // 四舍五入，指定为补齐
```

解决0.1 + 0.2 === 0.3方案

```javascript
// 设置一个误差范围值，通常称为“机器精度”
if (!Number.EPSILON) {
  Number.EPSILON = Math.pow(2, -52)
}

function numberCloseEnoughToEqual(n1, n2) {
  return Math.abs(n1 - n2) < Number.EPSILON
}

// 最大/小浮点数
Number.MAX_VALUE
Number.MIN_VALUE
// 最大安全整数
Number.MAX_SAFE_INTEGER  // （2^53 - 1）
Number.MIN_SAFE_INTEGER  // -（2^53 - 1）

// 有时JavaScript程序需要处理一些比较大的数字，如数据库中的64位ID等。由于JavaScript的数字类型无法精确呈现64位数值，所以必须将它们保存（转换）为字符串。

// 整型检查:Number.isInteger
Number.isInteger(42) // true
Number.isInteger(42.000) // true
Number.isInteger(42.1) // false

// Number.isInteger polyfill
if (!Number.isInteger) {
  Number.isInteger = function(num) {
    return typeof num === 'number' && num % 1 == 0
  }
}

// 安全的整数:Number.isSafeInteger()
Number.isSafeInteger(Number.MAX_SAFE_INTEGER)

// Number.isSafeInteger polyfill
if (!Number.isSafeInteger) {
  Number.isSafeInteger = function(num) {
    return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER
  }
}
```



null指空值（empty value），曾赋过值，但是目前没有值

undefined指没有值（missing value），

void______没有返回值

```javascript
// 可以给undefined赋值,永远不要重新定义undefined。
undefined = 2
```



特殊的数字

1. NaN

> 不是数字的数字
>
> NaN是JavaScript中唯一一个不等于自身的值。

```javascript
NaN != NaN

var a = 2 / 'foo'
var b = 'foo'

a // NaN
b // foo

window.isNaN(a) // true
window.isNaN(b) // true

// Number.isNaN ES6新增

// Number.isNaN polyfill
if (!Number.isNaN) {
  Number.isNaN = function(n) {
    return typeof n === 'number' && window.isNaN(n)
  }
}
Number.isNaN(b) // false
```

2. 无穷数：Infinity

```javascript
var a = 1 / 0 // Infinity
var b = -1 / 0 // -Infinity
```

3. 负零

JSON.stringify(-0)返回"0"，而JSON.parse("-0")返回-0。

```javascript
JSON.stringify(-0) // 0
JSON.parse("-0") // -0

-0 === 0 // true
```

应用场景：

​       有些应用程序中的数据需要以级数形式来表示（比如动画帧的移动速度），数字的符号位（sign）用来代表其他信息（比如移动的方向）。此时如果一个值为0的变量失去了它的符号位，它的方向信息就会丢失。所以保留0值的符号位可以防止这类情况发生。

4. 特殊等式

ES6中新加入了一个工具方法Object.is(..)来判断两个值是否绝对相等，可以用来处理上述所有的特殊情况：

```javascript
// Object.is() ES6
var a = 2 / 'foo'
var b = -3 * 0

Object.is(a, NaN) // true
Object.is(b, -0) // true
Object.is(-0, 0) // false

// Object.is polyfill
if (!Object.is) {
  Object.is = function(v1, v2) {
    // 判断 -0
    if (v1 === 0 && v2 === 0) {
      return 1 / v1 === 1 / v2
    } 
    // 判断NaN
    if (v1 !== v2) {
      return v2 !== v2
    }
    // 其他
    return v1 === v2
  }
}
```

*能使用==和===（参见第4章）时就尽量不要使用Object.is(..)，因为前者效率更高、更为通用。Object.is(..)主要用来处理那些特殊的相等比较。*



##### 值和引用

简单值

*简单值（即标量基本类型值，scalar primitive）总是通过值复制的方式来赋值/传递，包括null、undefined、字符串、数字、布尔和ES6中的symbol。*

复合值

*复合值（compound value）——对象（包括数组和封装对象，参见第3章）和函数，则总是通过引用复制的方式来赋值/传递。*

```javascript
// 函数参数问题
function foo(x) {
  x.push(4)
  x // [1, 2, 3, 4]
  
  x = [4, 5, 6] //重新赋值，并不影响a当前引用的[1, 2, 3, 4]
  x.push(7)
  x // [4, 5, 6, 7]
  
  // 如果要将a的值变为[4,5,6,7]，必须更改x指向的数组，而不是为x赋值一个新的数组。
  /*
  	x.length = 0
  	x.push(4, 5, 6, 7)
  	
  	a // [4, 5, 6, 7]
  */
}

var a = [1, 2, 3]

foo(a)
a // [1, 2, 3, 4] ???
// 我们不能通过引用x来更改引用a的指向，只能更改a和x共同指向的值。

// 注意：我们无法自行决定使用值复制还是引用复制，一切由值的类型来决定。
foo(a.slice()) // 浅副本
```



##### 
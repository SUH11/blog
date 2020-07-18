# 类型转换



##### 强制类型转换

```javascript
var a = 42
var b = a + '' // 隐式强制类型转换
var c = String(a) // 显示强制类型转换
```

JSON字符串化

所有安全的JSON值（JSON-safe）都可以使用JSON.stringify(..)字符串化

> 不安全的JSON值：undefined、function、symbol（ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）的对象都不符合JSON结构标准，其他支持JSON的语言无法处理它们。
>
> 对包含循环引用的对象执行JSON.stringify(..)会出错。

```javascript
var o = {}
var a = {
  b: 42,
  c: o,
  d: function() {}
}
o.e = a // 循环引用

JSON.stringify(a) // 这里会报错

// 自定义JSON序列化：来定义JSON.stringify函数返回什么样的值
a.toJSON = function() {
  return { b: this.b }
}
JSON.stringify(a) // "{"b": 42}"

JSON.stringify(a, function(k, v) {
  if (key !== 'a') 
    return v
}, 2) // 第二个参数是对key val的处理，第三个参数是space，输出的缩进格式
```

##### ToNumber

其中true转换为1, false转换为0。undefined转换为NaN, null转换为0。

true    			1

false   			0

null				 0

undefined     NaN

##### ToBoolean

(1) 可以被强制类型转换为false的值(2) 其他（被强制类型转换为true的值）

(2) 其他（被强制类型转换为true的值）

假值：undefined、null、false、+0 -0 NaN、""



##### 字符串和数字之间的显式转换

```javascript
var a = 42
// JavaScript引擎会自动为42创建一个封装对象，然后对该对象调用toString()。这里显式转换中含有隐式转换。
a.toString()

var c = 3.14
// +运算符显式地将c转换为数字
var d = +c

// 日期显式转换为数字
var d = new Date()
+d // 1585741458009 强制类型转换为数字，返回结果为Unix时间戳，以毫秒为单位
```

##### Number



##### parseInt

解析允许字符串中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换不允许出现非数字字符，否则会失败并返回NaN。

parseInt(..)先将参数强制类型转换为字符串再进行解析，

```javascript
parseInt(1/0, 19) // 18
===> parseInt('Infinity', 19)
19进制	10进制
0				0
...			...
9				9
a				10
b				11
...			...	
h				17
i				18
// parseInt解析字符串的时候解析到I就停止了，所以i是18

parseInt(0.0000008) // 8   8e-7
parseInt(false, 16)	// 250 "fa"
parseInt(parseInt, 16) // 15   "function ...."
parseInt('103', 2)	// 2
```

*ES5之前的parseInt(..)有一个坑导致了很多bug。即如果没有第二个参数来指定转换的基数（又称为radix）, parseInt(..)会根据字符串的第一个字符来自行决定基数。如果第一个字符是x或X，则转换为十六进制数字。如果是0，则转换为八进制数字。*

##### parseFloat

##### Boolean

Boolean(..)（不带new）是显式的ToBoolean强制类型转换



##### 隐式类型转换

1. 字符串和数字

+

```javascript
// 1.数组遇上+
// 先ToPrimitive，再[[DefaultValue]]

// 如果+的其中一个操作数是字符串（或者通过以上步骤可以得到字符串），则执行字符串拼接；否则执行数字加法。
'1' + 10 // '110'
1 + '10' // '110'

[] + {} // '[object object]'
{} + [] // 0

// a + '' 会对a调用valueOf()方法，然后通过ToString抽象操作将返回值转换为字符串
var a = {
  valueOf: function () {
    return 42
  },
  toString: function() {
    return 4
  }
}
a + '' // '42'
// String(a)则直接调用ToString
String(a) // '4'
```

-是数字减法运算符，因此a -0会将a强制类型转换为数字。也可以使用a ＊ 1和a /1

```javascript
// - / *
var a = '3.14'
var b = a - 0
b // 3.14

var a = [3]
var b = [1]
a - b // 2

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      sum += arguments[i]
    }
  }
```

2. 布尔值到数字

```javascript
// 有且只有一个数时，为真
function onlyOne() {
  /**
  var sum = 0
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      sum += arguments[i]
    }
  }
 */
  var sum = Array.from(arguments).reduce((prev, curr) => {
   	/**
    if (curr) {
      prev += curr // 防止字符串拼接
    }
    */
    
    return prev += Number(!!curr) //  防止字符串拼接
  }, 0)
  
  return sum == 1
}
var a = true
var b = false

onlyOne(a, b) // true
onlyOne('41', 0) // 这样要考虑字符串拼接
```

3. 隐式强制类型转布尔值

```javascript
// 1.
if () {}

// 2.第二个条件
for (var a = 0; i <=9; i++) {} 

// 3.
while () 
do while()
  
// 4.三元表达式
a ? b : c

// 5.|| && 返回的是操作数中的一个
var a = 42
var b = 'abc'
a || b // 42

function foo() { console.log(a) }
var a = 42
a && foo() // 42 “守护运算符”

var a = 42
var b = null
var c = 'foo'
if (a && (b || c)) { // 这里返回的是foo，再由if转化成true
  console.log('yep')
}
```

4. 符号的强制类型转换

```javascript
var s1 = Symbol('cool')
String(s1) // "Symbol(cool)"

var s2 = Symbol('not cool')
s2 + '' // TypeError
```

*符号不能够被强制类型转换为数字（显式和隐式都会产生错误），但可以被强制类型转换为布尔值（显式和隐式结果都是true）*

5. === 和 ==

==允许在相等比较中进行强制类型转换，而===不允许

（1）性能：

有人觉得==会比===慢，实际上虽然强制类型转换确实要多花点时间，但仅仅是微秒级（百万分之一秒）的差别而已。

如果进行比较的两个值类型相同，则==和===使用相同的算法，所以除了JavaScript引擎实现上的细微差别之外，它们之间并没有什么不同。如果两个值的类型不同，我们就需要考虑有没有强制类型转换的必要，有就用==，没有就用===，**不用在乎性能**。

（2）字符串和数字的相等比较

```javascript
NaN !== NaN
+0 === -0

Type(x) ===> number   x == ToNumber(y)
Type(x) ===> string   ToNumber(x) === y
// 总：有数字有字符串，将字符串转为数字

```

（3）其他类型和布尔类型的比较

```javascript
var a = '42'
var b = true
a == b // false

Type(x) ===> boolean  ToNumber(x) == y
Type(y) ===> boolean  x === ToNumber(y)
// 总：有布尔类型，布尔类型转Number

'41' == false
==> '41' == 0
==>  41  == 0
```

（3）null和undefined的相等比较

```javascript
// x 为null，y 为undefined
null == undefined // true

// 总：在==中null和undefined是一回事，可以相互进行隐式强制类型转换
```

（4）对象和非对象的相等比较

```javascript
Type(x) ===> string/number Type(y) ===> object
=====> x == ToPrimitive(y)
Type(x) ===> object  Type(y) ===> string/number
=====> ToPrimitive(x) == y
// 总：对象和字符串或者数字比较，总是对象要转

备注：ToPrimitive 会调用对象的valueOf()方法
var a = 42
var b = [42]

a == b // true

// 因为没有对应的封装对象，所以null和undefined不能够被封装（boxed）,Object(null)和Object()均返回一个常规对象。
var a = null // 或者是undefined
var b = Object(a)
a == b // false

var a = 'abc'
var b = Object(a)
a == b // true

// 
if (a == 2 && a == 3) {
  // ...
}
var i = 2
Number.prototype.valueOf = function() {
  return i++
}
var a = new Number(42) // 要用new的方式调用才可以
if (a == 2 && a == 3) {
  console.log('Yep...')
}
```

```javascript
// 一些常见的比较
'0' == null // false '0' == 'null' 
'0' == undefined // false '0' == 'undefined'
'0' == false // true  0 == false => false == false
'0' == NaN // false
'0' == 0 // true
'0' == '' // false
字符串 == null/undefined/false/NaN 
转化成
数字  == null / undefined / false / NaN

false == null // false
false == undefined // false
false == NaN // false
false == 0 // true    ==> false == 'false'
false == '' // true ==> false == 0 ==> false == false
false == [] // true ==> false == '' ==> false == 0 => false == false
false == {} // !!!!!!!!!!!!!!!!

'' == null // false
'' == undefined // false 
'' == NaN // false
'' == 0 // true 0 == 0
'' == [] // true
'' == {} // !!!!!!!!!!!!!

// null、undefined与其他类型的值比较时，结果都为false
// 除了：null == undefined
0 == null // false
0 == undefined // false
0 == NaN // false
0 == [] // true 0 == '' => 0 == 0 ==> true
0 == {}
// ToNumber:  
true => 1 
false => 0 
undefined => NaN
null => 0

[] == ![] // true [] == false => '' == false =>  0 ==> false => false == false
2 == [2] // true 2 == '2' => 2 == 2 => true
'' == [null] // true '' == '' => true
[null].toString() // ''
0 == '\n' // true 0 == '' > 0 == 0 => true
// ''、'\n'等空字符被ToNumber强制类型转换为0

42 == '43' // false
'foo' == 42 // false
'true' == true // false

42 == '42' // true
'foo' == ['foo'] // true

特殊情况：
[] + {} // {}出现在+运算符表达式中，因此它被当作一个值（空对象）来处理。
// '' + '[object object]' => '[object object]'
{} + [] // {}被当作一个独立的空代码块（不执行任何操作）, + [] =>  + '' => 0
```

注意：1. 如果两边的值中有true或者false，千万不要使用==。

2. 如果两边的值中有[]、""或者0，尽量不要使用==。
3. 所以==和===选择哪一个取决于是否允许在相等比较中发生强制类型转换。



6. typeof操作是绝对安全的

7. 抽象关系比较

```javascript
// a < b
1. 比较双方都是字符串（后半部分）
ToPrimitive
var a = ['42']
var b = ['042']
a < b // false   '4' > '0'

2.其他情况（前半部分）
ToNumber
var a = { b: 42 }
var b = { b: 43 }
a < b // [object object] < [object object]
a == b // false
a > b // false

//  a <= b 会被处理为b < a， 然后将结果反转   实际是!(b < a)
a <= b // true
a >= b // true
```


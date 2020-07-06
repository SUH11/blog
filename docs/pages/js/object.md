# 对象



#### 对象

声明方式：

```javascript
// 声明形式
var obj = { key: value ...}
// 构造形式
var obj = new Object()
obj.key = value
```



在对象属性名中数字会被转换成字符串

```javascript
myObj[3] = 10
// ==> myObj."3" = 10   和数组不一样
// 可计算属性名
myObj = {
  [prefix + 'bar']: 'hello'
}
```

*从技术角度来说，函数永远不会“属于”一个对象，所以把对象内部引用的函数称为“方法”似乎有点不妥。*

##### 复制对象

浅复制：简单基本类型复制成功，属性对象复制的是引用 Object.assign(target, source...)

```javascript
var newObj = Object.assign({}, myObj)
// 由于Object.assign(..)就是使用=操作符来赋值，所以源对象属性的一些特性（比如writable）不会被复制到目标对象。
```

Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。也就是说，如果对象的属性值为简单类型（如string， number），通过Object.assign({},srcObj);得到的新对象为`深拷贝`；如果属性值为对象或其它引用类型，那对于这个对象而言其实是`浅拷贝`的。

深复制：1. 循环引用问题

```javascript
var newObj = JSON.parse(JSON.stringify(someObj))
// JSON安全：可以被序列化为一个JSON字符串并且可以根据这个字符串解析出一个结构和值完全一样的对象
```



##### 属性描述符

```javascript
var obj = {}

Object.defineProperty(obj, 'a', {
  value: 2,
  writable: true, // 是否可以修改属性的值   不可修改会提示：TypeError
  configurable: true, // 是否可配置，单向操作，不可撤销
  enumerable: true
})

obj.a // 2
```

configurable特点：

	1. 为true时，可用Object.defineProperty()修改属性描述符

   	2. 把configurable修改成false是单向操作，无法撤销！
   	3. 要注意有一个小小的例外：即便属性是configurable:false，我们还是可以把writable的状态由true改为false，但是无法由false改为true
   	4. configurable:false还会禁止删除这个属性

对象常量

结合writable:false和configurable:false就可以创建一个真正的常量属性（不可修改、重定义或者删除）

```javascript
// 对象常量
var obj = {}

Object.defineProperty(obj, 'CONSTAN', {
  value: 42,
  writable: false,
  configurable: false
})

// 禁止拓展
Object.preventExtensions(obj)
obj.b = 3
obj.b // undefined

// 密封
// 调用Object.preventExtensions(..)并把所有现有属性标记为configurable:false
Object.seal(obj)

// 冻结
// 1.调用Object.seal(..)并把所有“数据访问”属性标记为writable:false
// 2.应用在对象上的级别最高的不可变性
// 3.它会禁止对于对象本身及其任意直接属性的修改（这个对象引用的其他对象是不受影响的）。
// 也就是：所有属性configurable: false, writable: false preventExtensions
Object.freeze(obj)
```

[[Get]]

[[Put]]

Getter和Setter

当你给一个属性定义getter、setter或者两者都有时，这个属性会被定义为“访问描述符”（和“数据描述符”相对）。对于访问描述符来说，JavaScript会忽略它们的value和writable特性，取而代之的是关心set和get（还有configurable和enumerable）特性。

```javascript
// 有getter setter，忽略writable，关心set get (configurable, enumerable)
var obj = {
  get a() {
    return 2
  }
}

Object.defineProperty(obj, 'b', {
  get: function() {
    return this.a * 2
  }
})

obj.a // 2
obj.b // 4
```




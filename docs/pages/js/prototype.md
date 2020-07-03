# 原型



<img src="https://res.weread.qq.com/wrepub/epub_22806945_84" style="zoom:30%;" />

图中由下到上的箭头表明这是**委托关联**，不是复制操作。



1. #### [[Prototype]]是什么

   JavaScript中的对象有一个特殊的[[Prototype]]内置属性，其实就是**对于其他对象的引用**。

   > 几乎所有yo对象在创建时[[Prototype]]属性都会被赋予一个非空的值。

   - 对其他对象的引用

     ```javascript
     const obj = {
       a: 2
     }
     const myObj = Object.create(obj)
     myObj.a // 2 如果obj中也找不到a并且[[Prototype]]链不为空的话，就会继续查找下去。
     ```

   - 用**for...in**遍历对象和查找[[Prototype]]类似、**in**也会一样

     - enumerable属性为true

   - 所有**普通的[[Prototype]]链**最终都会指向内置的**Object.prototype**

   - 属性的设置和屏蔽

     ```javascript
     myObj.foo = 'bar'
     ```

     > 如果foo不是直接存在于myObject中，[[Prototype]]链就会被遍历，类似[[Get]]操作。如果原型链上找不到foo, foo就会被直接添加到myObject上。

   



2. #### 常见的原型/继承

prototype属性关联

```javascript
function Foo(name) {
  this.name = name
}
function Bar(name, label) {
  Foo.call(this)
  this.label = label
}
Bar.prototype = Object.create(Foo.prototype)
```

用**Object.create(..)**会凭空创建一个“新”对象并把新对象内部的[[Prototype]]关联到你指定的对象（本例中是Foo.prototype）。



3. #### 修改[[Prototype]]关联

**._ _proto_ _**

- ._ _proto_ _实际上并不存在于你正在使用的对象中
- 和其他的常用函数（.toString()、.isPrototypeOf(..)，等等）一样，存在于内置的Object.prototype中
- 访问（获取值）a._ _proto_ _ _时，实际上是调用了a._ _proto__()（调用getter函数）

> 这个奇怪的.__proto__（在ES6之前并不是标准！）属性“神奇地”引用了内部的[[Prototype]]对象，如果你想直接查找（甚至可以通过．__proto__.__ptoto__..．来遍历）原型链的话，这个方法非常有用。

._ _proto_ _的实现

```javascript
Object.defineProperty(Object.prototype, "__proto__", {
  get: funcntion() {
  	return Object.getPrototypeOf(this)
	},
  set: function(o) {
    Object.setPrototypeOf(this, o)
    return o
  }
})
```

> ES6：Object.setPrototypeOf()






















## 继承

1. 组合继承

```javascript
function Parent(value) {
  this.value = value
} 
Parent.prototype.getValue = function() {
  console.log(this.value)
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent() // 1. constructor指向Parent 2. 调用了Parent的构造函数，造成挂载多余的Parent属性

var child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

2. 寄生组合继承

```javascript
function Parent(value) {
  this.value = value
}
Parent.prototype.getValue = function() {
  console.log(this.value)
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
var child = new Child(1)

child.getValue() // 1
child instanceof Parent // true
```

3. class

```javascript
class Parent {
  constructor(value) {
    this.value = value
  }
  getValue() {
    console.log(this.value)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
  }
}
const child = new Child('abc')
child.getValue()
```


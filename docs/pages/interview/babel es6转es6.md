## babel ES5 转 ES6实现

es5:

```javascript
class Parent {
  constructor(name) {
    this.name = name;// 实例的私有属性
    this.age = 18
  }
  
 
  // 属于实例的公有属性，也就是相当于原型上的属性
  getName() {
    console.log(this.name);
  }
  
  
}
 
let p = new Parent('xxx');
p.showAge()
```

es6:

```javascript
"use strict";

function _instanceof(left, right) { 
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { 
    return !!right[Symbol.hasInstance](left); 
  } else { 
    return left instanceof right; 
  } 
}

function _classCallCheck(instance, Constructor) { 
  if (!_instanceof(instance, Constructor)) { 
  	throw new TypeError("Cannot call a class as a function"); 
	} 
}

function _defineProperties(target, props) { 
  for (var i = 0; i < props.length; i++) { 
    var descriptor = props[i]; 
    descriptor.enumerable = descriptor.enumerable || false; 
    descriptor.configurable = true; 
    if ("value" in descriptor) 
      descriptor.writable = true; 
    Object.defineProperty(target, descriptor.key, descriptor); 
  } 
}

function _createClass(Constructor, protoProps, staticProps) { 
  if (protoProps) 
    _defineProperties(Constructor.prototype, protoProps); 
  if (staticProps) 
    _defineProperties(Constructor, staticProps); 
  return Constructor; 
}

var Parent = /*#__PURE__*/function () {
  function Parent(name) {
    _classCallCheck(this, Parent);

    this.name = name; // 实例的私有属性

    this.age = 18;
  } // 属于实例的公有属性，也就是相当于原型上的属性


  _createClass(Parent, [{
    key: "getName",
    value: function getName() {
      console.log(this.name);
    }
  }]);

  return Parent;
}();

var p = new Parent('xxx');
p.showAge();
```





其他：static

```javascript
// 静态方法不需要实例化对象，是通过类直接调用的
class Person {
  constructor() {
    this.age = 19
  }
  static showAge() {
    // return this.age
    console.log('showAge.....')
  }
}
Person.showAge()
let p = new Person()
p.showAge() // p.showAge is not a function....
```


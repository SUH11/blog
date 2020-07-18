# 类



类的继承

​	多重继承

混入

	1. 显示混入

```javascript
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }
  return targetObj
}

var Vehicle = {
  engines: 1,
  ignition: function() {
    console.log('Vehicle ignition')
  },
  drive: function() {
    console.log('Vehicle drive')
  }
}

var Car = mixin(Vehicle, {
  wheels: 4,
  drive: function() {
    Vehicle.drive.call(this)
    console.log('Rolling on all ' + this.wheels + ' wheels!')
  }
})
```

2. 混合复制

```javascript
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }
  return targetObj
}

var Vehicle = {
  // ...
}

var Car = mixin(Vehicle, {})
mixin({
  wheels: 4,
  drive: function() {
    Vehicle.drive.call(this)
    console.log('Rolling on all ' + this.wheels + ' wheels!')
  }
})
               
```

*JavaScript中的函数无法（用标准、可靠的方法）真正地复制，所以你只能复制对共享函数对象的引用*

3. 寄生混入

```javascript
function Vehicle() {
  this.engines = 1
}
Vehicle.prototype.ignition = function() {
  console.log('Turning on my engine....')
}
Vehicle.prototype.drive = function() {
  this.ignition()
  cnsole.log('Steering and moving forward!')
}

// 寄生类
function Car() {
  var car = new Vehicle()
  
  car.wheels = 4
  
  var vehDrive = car.drive
  
  car.drive = function() {
    vehDrive.call(this)
    console.log('Rolling on all ' + this.wheels + ' wheels!')
  }
  return car
}

var myCar = new Car()
myCar.drive()
```

4. 隐式混入

```javascript
var Something = {
  cool: function() {
    this.greeting = 'Hello world'
    this.count = this.count ? this.count + 1 : 1
  }
}

var Another = {
  cool: function() {
    Somthing.cool.call(this)
  }
}
// 最终的结果是Something.cool()中的赋值操作都会应用在Another对象上而不是Something对象上。
```

多态

总结：

	1. 类意味着复制。

   	2. 态（在继承链的不同层次名称相同但是功能不同的函数）看起来似乎是从子类引用父类，但是本质上引用的其实是复制的结果。


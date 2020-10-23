# 浅/深拷贝





1. ### 拷贝的方法

   分为**浅拷贝**和**深拷贝**

   **浅拷贝：拷贝的是引用的内存地址**

   1. 对象的`Object.assgin()`

      `Object.assign()`拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。也就是说，如果对象的属性值为简单类型（如`string， number`），通过`Object.assign({},srcObj)`;得到的新对象为`深拷贝`；如果属性值为对象或其它引用类型，那对于这个对象而言其实是`浅拷贝`的。

      ```javascript
      var newObj = Object.assign({}, myObj)
      // 由于Object.assign(..)就是使用=操作符来赋值，所以源对象属性的一些特性（比如writable）不会被复制到目标对象。
      ```

   2. 数组的`slice`、`concat`

   3. 解构赋值

   **深拷贝：新开的一个内存地址**

   1. JSON.stringify() -> JSON.parse()

      不适用情况：

      - 有function，会过滤function
      - 值为undefined，会报错

   2. 遍历/递归

      - 判断Array
      - 判断Object
      - 简单类型，直接赋值



2. 对象深拷贝实现

   > 1. 判断数组
   > 2. 判断Object
   > 3. 简单类型，赋值

   ```javascript
   function deepCopy(obj) {
     if (!obj) {
       return obj
     }
     let isArr = Array.isArray(obj)
     let target = isArr ? [] : {}
     for (let key in obj) {
       if (Array.isArray(obj[key])) {
         target[key] = obj[key].map(item => item)
       } else if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
         target[key] = deepCopy(obj[key])
       } else {
         target[key] = obj[key]
       }
     }
   	return target
   }
   ```

   
















# Vue源码解读-1



### Vue的工作机制

![](https://raw.githubusercontent.com/SUH11/images/master/vue/1.vue.png)				 	

1. ### 初始化

   在 new Vue() 时会调用_init()进行初始化，会初始化各种实例方法、全局方法、执行一些生命周期、初始化props、data等状态。其中最重要的是data的「**响应化**」处理。

   初始化之后调用 $mount 挂载组件，主要执行编译和首次更新

2. ### 编译

   - parse:使用正则解析template中的vue的指令(v-xxx) 变量等等 形成抽象语法树AST

   - optimize:标记一些静态节点，用作后面的性能优化，在diff的时候直接略过
   -  generate:把第一部生成的AST 转化为渲染函数 render function

3. ### 更新

   数据修改触发setter，然后监听器会通知进行修改，通过对比新旧vdom树，得到最小修改，就是 patch ，然后只需要把这些差异修改即可









## 手写简版Vue代码

测试代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <p>{{name}}</p>
    <p k-text="name"></p>
    <p>{{age}}</p>
    <p>{{dobule}}</p>
    <input type="text" k-model="name">
    <button @click="changeName">button</button>
    <div k-html="html"></div>
  </div>
  <script src="./compile.js"></script>
  <script src="./kvue.js"></script>
  <script>
    const app = new KVue({
      el: '#app',
      data: {
        name: 'name',
        age: 10,
        dobule: 10,
        test: 'i am test...',
        foo: {
          bar: 'bar'
        },
        html: '<button>这是一个按钮</button>'
      },
      created() {
        console.log('starting....')
        setTimeout(() => {
          this.name = '我是测试'
        })
      },
      methods: {
        changeName() {
          this.name = 'abc'
          this.age = 1
        }
      }
    })
    
    app.$data.test = 'hello, .....'
  </script>
</body>
</html>
```

kvue.js

```javascript
// new Vue({
//   data() {
//     return {
//       config: {
//         a: 10,
//         b: 20
//       }
//     }
//   }
// })

/**
 * 1. 通过Object.defineProperty方法拦截属性
 * 2. dep和key是一对一的
*/
class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    this.observe(this.$data)

    // 测试代码
    // new Watcher(this, 'test')
    // this.$data.test

    new Compile(options.el, this)
  }

  observe(value) {
    if (!value || typeof value !== 'object') {
      return
    } 

    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
      this.proxyData(key)
    })
  }

  // 在vue根上定义属性代理data中的数据
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }

  // 形成闭包了：new Vue()实例一直对属性又引用，实例不释放，就一直有引用
  defineReactive(obj, key, val) {
    
    this.observe(val)

    const dep = new Dep()

    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal
          dep.notify()
        }
      }
    })
  }
}

// Dep：管理若干watcher实例，它和key一对一关系
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(watcher) {
    this.deps.push(watcher)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}
// vue1.0不需要vdom
// vue2.0做了改进，一个组件一个watcher，数据变化就通知watcher，再去做diff算法
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb

    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  update() {
    // console.log(`${this.key}属性update`)
    this.cb.call(this.vm, this.vm[this.key])
  }
}
```

compile编译器：

```javascript
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      // 1. 将el里的元素放到fragment里操作
      this.$fragment = this.node2Fragment(this.$el)

      // 2. 编译
      this.compile(this.$fragment)

      // 3. 编译完了再放回去
      this.$el.appendChild(this.$fragment)
    }
  }

  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    while ((child = el.firstChild)) {
      fragment.appendChild(child)
    }
    return fragment
  }
  
  // 闪屏的问题
  // 提前编译过了，所以没有闪屏问题
  compile(el) {
    const childNodes = el.childNodes

    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        // console.log('编译元素：', node.nodeName)
        this.compileElement(node)
      } else if (this.isInterpolation(node)) {
        // console.log('编译文本：', node.textContent)
        this.compileText(node)
      }
      // 递归编译
      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  isElement(node) {
    return node.nodeType === 1
  }

  // 包含插值表达式
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  compileText(node) {
    console.log(RegExp.$1) 
    // RegExp.$1 : 匹配的分组部分

    const exp = RegExp.$1
    this.update(node, this.$vm, exp, 'text')
  }

  compileElement(node) {
    // 查看node的特性中是否有k-xx @xx
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name
      const exp = attr.value
      
      if (attrName.startsWith('k-')) { // k-text k-model k-html
        const dir = attrName.substring(2)
        this[dir] && this[dir](node, this.$vm, exp)
      } else if (attrName.startsWith('@')) { //  事件
        // 事件
        const eventName = attrName.substring(1)
        this.eventHandler(node, this.$vm, exp, eventName)
      }
    })
  }

  text(node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }
  
  html(node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }
  
  model(node, vm, exp) {
    this.update(node, vm, exp, 'model')
    node.addEventListener('input', e => {
      vm[exp] = e.target.value
    })
  }

  update(node, vm, exp, dir) {
    const fn = this[dir + 'Updator']
    fn && fn(node, vm[exp])

    new Watcher(vm, exp, function() {
      fn && fn(node, vm[exp])
    })
  }

  textUpdator(node, value) {
    node.textContent = value
  }
  
  htmlUpdator(node, value) {
    node.innerHTML = value
  }
  
  modelUpdator(node, value) {
    node.value = value
  }

  eventHandler(node, vm, exp, eventName) {
    const fn = vm.$options.methods && vm.$options.methods[exp]
    if (eventName && fn) {
      node.addEventListener(eventName, fn.bind(vm))
    }
  }
}
```




























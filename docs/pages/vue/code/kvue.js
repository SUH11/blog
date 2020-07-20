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

    new Watcher(this, 'test')
    this.$data.test
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

class Watcher {
  constructor(vm, key) {
    this.vm = vm
    this.key = key

    Dep.target = this
  }

  update() {
    console.log(`${this.key}属性update`)
  }
}
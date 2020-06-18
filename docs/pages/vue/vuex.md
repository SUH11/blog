# vuex使用及实现

<a name="3a6e11c9"></a>
#### Vuex - 使用

[官网地址](https://vuex.vuejs.org/zh/)

vuex是插件，所以必须要use

store是全局的，且是单向数据流：

[https://vuex.vuejs.org/vuex.png](https://vuex.vuejs.org/vuex.png)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/388398/1574249075881-3cb90da1-1cf4-4a38-ae63-c0af09c74b2f.png#align=left&display=inline&height=551&name=image.png&originHeight=551&originWidth=701&size=30808&status=done&width=701)

复杂的逻辑都放在actions里，要更改只能经过commit调用Mutations来更改state。

例子：

```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuxe)

export default new Vuex.Store({
  state: { count: 0 },
  getters: { 
    count: state => state.count // 也可以这样用
  },
  mutations: {
    addCount(state, num = 10) {
      state.count += num
    }
  },
  actions: {
    changeCount({ commit }, num) {
      commit('addCount', num)
    }
  }
})
```

要在main.js里用一下

```javascript
// main.js
import store from '/store'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

tips： vue-router和vuex是打包销售，强关联，因为在router和vuex里头用到了vue

在页面上使用：

```html
//test.vue
<template>
	<div @click="addCount">
  	{{ $store.state.count }}  
    {{ $store.getter.count }}
  </div>
</template>
<script>
export default {
  methods: {
    // 点击就可以更改count了
    addCount() {
      this.$store.dispatch('changeCount', 999) // changeCount是actions中的名字
    }
  }
}
</script>
```

如果有多个store的情况下，建议使用命名空间，更改一下我们的例子：

```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import count from './modules/count'


Vue.use(Vuxe)

export default new Vuex.Store({
  modules: {
    count
  },
  getter: {
    count: state => state.count.count // 也可以这样获取
  }
})
```

用一个新的文件来存放modules：

```javascript
// modules/count.js
const count = {
  namespaced: true, // 要设为true
  state: { count: 0 },
  mutations: {
    addCount(state, num = 10) {
      state.count += num
    }
  },
  actions: {
    changeCount({ commit }, num) {
      commit('addCount', num)
    }
  }
}
export default count
```

template里要修改一下：

```html
//test.vue
<template>
	<div @click="addCount">
  	{{ $store.state.count.count }}  
    {{ $store.getter.count }}
  </div>
</template>
<script>
export default {
  methods: {
    // 点击就可以更改count了
    addCount() {
      // 这里要加上count/
      this.$store.dispatch('count/changeCount', 999) // changeCount是actions中的名字
    }
  }
}
</script>
```

~~待补充：如何实现一个简版的vuex~~<br />Vuex

- vuex是一个插件（与vue强关联，即只能用在vue上）
- 实现四个东西：state/mutations/actions/getters
- 创建Store
- 数据响应式

```javascript
let Vue
function install(_Vue) {
  // 这样store执行的时候，就有了Vue，不用import 
  // 这也是为啥Vue.use必须在新建store之前
  Vue = _vue
  
  Vue.mixin({
    beforeCreate() {
      // 这样才能获取到传递进来的store
			// 只有root元素才有store，所以判断一下
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

class Store {
  constructor(options) {
    // Vue的实例，可以用响应式
    this.state = new Vue({
      data: options.state
    })
    this.mutations = options.mutations
    this.actions = options.actions
    this.getters && handleGetters(options.getters)
  }
  
  // commit调用mutations的方法
  commit = (type, arg) => {
    this.mutations[type](this.state, arg)
  }
  
  // dispatch调用的actions里的方法
  dispatch(type, arg) {
    this.actions[type]({
      commit: this.commit,
      state: this.state
    }, arg)
  }
  
 // 数据响应式
  handleGetters(getters) {
    this.getters = {}
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state) // this.state指的是constructor里的state
        }
      })
    })
  }
}

export default { Store, install }
```

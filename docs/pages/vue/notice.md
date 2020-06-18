# Vue之Notice提示框实现

<a name="ef941690"></a>
#### Notice提示框

1、创建create方法，将该方法挂载到Vue上，并返回一个Component

2、创建Notice展示组件

```javascript
// create.js
import Vue from 'vue'

export default function create(component, props) {
  const vm = new Vue({
    render(h) {
    	return h(component, props) // 返回vnode
  	}
  }).$mount() // $mount里面会调render生成vnode，生成的vnode会执行update函数生成DOM
  
  // 手动挂载
  document.body.appendChild(vm.$el)
  
  const comp = vm.$children[0] // 挂载在vm下的元素，现在只有component
  
  // 销毁
  comp.remove = function() {
    document.body.removeChild(vm.$el)
    vm.$destroy()
  }
  return comp
}
```

Notice提示框：

```vue
// Notice.vue
<template>
	<div v-if="isShow" style="position: absolute; top: 10px; left: 40%; border: 10px solid red; background: white;">
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
  </div>
</template>
<script>
	export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      },
      duration: {
        type: Number, 
        default: 1000
      }
    },
    methods: {
      show() {
        this.isShow = true
        setTimeout(this.hide, this.duration)
      },
      hide() {
        this.isShow = false
      }
    }
  }
</script>
```

使用

```javascript
// main.js
import create from './util/create'

Vue.prototype.$create = create
```

```vue
// Test.vue
<template>
	<div @click="showModal()">click me</div>
</template>
<script>
  import Notice from './Notice'
	export default {
    methods: {
      showModal() {
        const notice = this.$create(Notice, {
          title: '这是标题',
          message: '这是内容',
          duration: 2000
        })
        
        notice.show()
      }
    }
  }
</script>
```


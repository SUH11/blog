# Vue常见问题

#### Vue

##### 组件之间的通信方式？

```javascript
/*
	1. 父到子：props、refs
		2.3+：.sync / $listeners
		$parent
		$children
	2. 子到父：$emit
	3. 兄弟：共同祖辈 $parent	$root
	4. 祖先后代：provide	inject
	5. 任意组件：vuex
*/
data() {
	return {
		name: 'abc'
	}
},
provide: {
	pName: this.name
	pName: () => this.name // 响应式
}

// parent
<input :value.sync="value">
// child
this.$emit('update:value', 1)
```



##### 插槽是什么？

v-slot ，当我们写一个组件的时候，又一些地方是动态的，就可以用slot插入了

```html
v-slot:default
v-slot:content
<slot :foo="childFoot"></slot>
<div v-slot-content="ctx">{{ctx.foo}}</div>
```

react中的插槽：this.props.children



v-model是什么？v-model是语法糖？vue有哪些指令？怎么使用？vue中标签怎么绑定事件？

```js
/* 
	 1. v-model其实是语法糖，可以实现双向绑定
	 2. 用法：<input v-model="form" @click="doSomething"/>
	 3. 指令：
	 		v-model 
	 		v-bind			==><img :src="srcPath" /> 
	 		v-on		v-once
	 		v-if 		v-else-if		v-else
	 		v-show 
	 		v-for 
	 		v-html
	 		v-slot
*/
```



v-show和v-if的区别？

```js
/* 
	 1. v-show: display: block/none
	 2. v-if : 涉及到底层的编译，false的时候根本不需渲染了
*/
```



Vue双向绑定的原理？

```js
/*
	总的来说是使用：数据劫持 + 发布订阅者来实现双向绑定
		1. 对象：使用Object.defineProperty()的getter setter监听属性的变化
		2. 数组：在原型链上拦截数组的七大方法，怎么拦截：直接使用
		
	defineProperty劣势:
		1. 通过数组下标方式不会触发响应式
		2. 给对象新增属性也不会触发响应式
*/
Array.prototype.push = function() {},
// 3. 七大方法：
push()
pop()
shift()
unshift()
reverse()
sort()
splice()
```



Proxy和Object.defineProperty()的优劣？

```javascript
/*
	Object.defineProperty:
		1. 不能监听数组的变化
		2. 必须遍历对象的每个属性
		优点：兼容IE9

	Proxy:
		1. 可以直接监听对象而非属性
		2. 可以监听数组的变化
		3. 有很多种拦截方法
		4. proxy返回新对象，直接操作这个对象即可
	缺点：ES6的规范，兼容性不太好
*/
```



Vue的响应式描述？

```javascript
/*
	1. 每个组件，即Vue Component都会有一个对应的Watcher
	2. Vue的data属性会被添加getter和setter
	3. 当Vue Component render函数执行的时候，data会被触发，getter方法被调用，此时Vue会收集Vue Component所依赖的data，这个过程也就是依赖收集
	4. data改动的时候，会调用setter方法，此时会通知所有的依赖，进行render函数更新
*/
```



什么是Virtual DOM？

```javascript
/*
	本质上是一个Object对象。
	1. 描述了DOM对象，例如nodeType class content children 等等，可以理解为是DOM的抽象语法树
	2. 根据Virtual DOM可以生成真正的DOM节点，继而生成页面
*/
```



Virtual DOM的实现原理？diff算法？

```javascript
/*
	实现原理：
    1. 状态变更时，记录新树和旧树的差异
    2. 最后把差异更新到真正的DOM里
    3. 这个过程也就是patch打补丁的过程
  diff算法：
  	updateChildren（）
  	sameNode
*/
```



既然Vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟DOM进行diff检测差异?

```javascript
/*
	现在前端框架有两种方式来侦测数据变化：一种是pull，另一种是push
	
	pull：
		代表是React。
		React如何侦测的：1. 用setState显式更新
									 2. 然后react会一层层地进行Virtual DOM diff找出差异，然后patch到DOM上
									 3. 其实React也不知道哪里发生了变化，只知道有变化，然后暴力diff查找
		这就是典型的pull方式
	push：
		代表是vue。
			1. 当Vue程序初始化的时候就会对数据data进行依赖的收集,一但数据发生变化,响应式系统就会立刻得知,因此Vue是一开始就知道是「在哪发生变化了」
			2. 但是这又会产生一个问题,如果你熟悉Vue的响应式系统就知道,通常一个绑定一个数据就需要一个Watcher,一但我们的绑定细粒度过高就会产生大量的Watcher,这会带来内存以及依赖追踪的开销,而细粒度过低会无法精准侦测变化
			3. 因此Vue的设计是选择中等细粒度的方案,在组件级别进行push侦测的方式,也就是那套响应式系统,通常我们会第一时间侦测到发生变化的组件,然后在组件内部进行Virtual Dom Diff获取更加具体的差异,而Virtual Dom Diff则是pull操作,Vue是push+pull结合的方式进行变化侦测的.
  	
*/
```



Vue的key有什么用？

```javascript
/*
	定义：
	是vue里vnode标记的唯一id，通过这个key，diff操作可以更准确、更快速
		1. 如果不加key,那么vue会选择复用节点(Vue的就地更新策略),导致之前节点的状态被保留下来,会产生一系列的bug.
  	2. key的唯一性可以被Map数据结构充分利用,相比于遍历查找的时间复杂度O(n),Map的时间复杂度仅仅为O(1).
*/
```



Vue的data什么时候可以使用对象？

new Vue的时候可以使用对象。

因为如果每个组件都用对象的话，会造成属性共享的问题，而new Vue只执行一次，所以没有这个问题。



Vue组件封装

```js
/* 1. 简单的局部组件封装：直接写一个vue文件，传参通过props就可以了，需要的使用通过import引入即可

	 2. 全局的组件封装：用Vue.component全局注册组件，用的时候就不用import了
*/
Vue.component('svg-icon', <SvgIcon>)
<svg-icon />
```



对Vue的template编译的理解？

```js
// 主要有两个过程
// 1. 转化成AST抽象语法树，类似Object这么一个对象，描述各个节点之间的关系
/* 		大概的一个过程是：
				1）调用createCompile（其实是createCompilerCreator函数）将template和options传入该函数，
				所以接下来的过程除了编译之外，还合并了options。
				2）createCompile里，调用parse方法，
				3）parse方法里调用了parseHTML，这个过程也就是将template字符串模版转化成AST抽象语法树的过程
				4）parsHTML：用正则将标签抽离出来，其实也就是几个类型：字符串、html标签、{{}}、
*/

// 2. 再通过render函数，返回VNode
```

1. 将模版解析成AST抽象语法树，其实也就是js对象
2. 优化AST
3. 将AST转换成render函数



Vue的nextTick原理分析？

1. nextTick是DOM更新结束之后再调用
2. 2.4之前用的是微任务，2.4之后用的



Vue、React和Angular的区别？

Vue和Angular：

```javascript
/*
	相同点：
		1.都支持指令
		2.支持过滤器
		3.支持双向绑定
		4.不支持低端浏览器
	不同点：
		1.vue入门简单/angular入门较难，angular使用TypeScript开发，vue可以使用js也可以使用TypeScript
		2.在性能上，angular依赖数据做脏检查，所以watcher越多越慢
		3.vue使用依赖追踪，更新异步队列，所有数据都是独立触发
*/
```

Vue和React：

```javascript
/*
	相同点：
		1.vue使用.vue文件，react使用jsx，两者都需要编译后使用
		2.中心思想相同：都是组件化的思想
		3.都不内置router ajax
		4.都支持mixins
	不同点：
		1. react是数据单向流，只用了diff算法，vue是双向绑定，diff算法+数据劫持
		2. react做的事情很少，大多交给社区去做；vue内置的东西比较多，而且是渐进式框架，除了vue还有vue-router vuex
		3. vue是渐进式的，react还要学习jsx
*/
```



Vue的生命周期？

```javascript
/*
	生命周期：
		vue实例从创建到销毁的过程。
		开始创建 --> 初始化数据 --> 编译模版 --> 挂载DOM -->   渲染 --> 更新 --> 销毁
	意义：
		可以在vue生命周期内进行一些操作
	第一次加载页面：
		beforeCreated		loading
		created		ajax	结束loading
		beforeMounted
		mounted		DOM渲染完成
*/
// 完整的生命周期：
beforeCreated
created
beforeMounted
mounted
beforeUpdate	虚拟 DOM 打补丁之前
update
beforeDestory
destory

// 创建前/后
 1. beforeCreated() 还没有挂在元素$el和data都是undefined
 2. created data inject有了，$el还没有

// 载入前/后
 3. beforeMounted() $el和data都有了，但是此时的el还是dom虚拟节点
 4. mounted()  挂在完成，页面可以渲染数据来
// 更新前/后
 // 数据变化会触发这两个生命周期
 5. beforeUpdate()
 6. update()
// 销毁前/后
 7. beforeDestory()
 8. destory()
```



Vue的keep-alive？

```javascript
/*
	1. vue的内置组件，能在组件切换过程中，将状态保留在内存中，防止重复渲染DOM
	2. keep-alive是一个抽象组件，自身不会渲染一个DOM元素，也不会出现在父组件链中
	3. 在routes的meta里设置：meta: { keepAlive: true }
	4. 独特生命周期：activated deactivated
*/
```



computed和watch的区别？

```javascript
/*
	computed:
		1. 计算属性，使用比较消耗性能的场景，
		2. 具有缓存性
	watch：
		1. 监听某个数据发生变化，然后回调
		2. 页面重新渲染，值没有发生变化 就不会调用
		
	computed和watch都支持对象的写法
	小结：依赖其他属性的时候，用computed
*/
watch: {
  obj: {
    handle(newVal) {
      console.log(111)
    },
    deep: true
  }
}
```



vue router 的路由实现？

```javascript
/*
	hash: 
		#及后面的字符，称之为hash，用window.location.hash来读取
		特点：1. hash虽然在url中，但对不包含在http请求路径里
				 2. 用来指导浏览器动作的，对服务器安全无用，也不会重新页面
	history：
		采用html5的新特性：pushState() replaceState()，可以对浏览器记录栈进行修改
		特点：1. 前端的 URL 必须和实际向后端发起请求的 URL 一致，后端如果缺少对路由处理，将返回 404 错误
				 2. 需要后台支持
*/
```



Vue-Router路由嵌套？vue-router有哪些组件？

```js
/*
	 1. 用router-view 来实现组件嵌套
	 2. router-view router-link
*/
const routes = [
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: '/home/child/:id',
        component: Child
      }
    ]
  }
]
<div>
	home
	<router-view></router-view>
</div>
<div>
	<router-link to="/home/child/10">go to child</router-link>     
</div>

```



vue-router的导航钩子？

有三个：

- 全局路由
- 路由独享守卫
- 组件独享守卫

```javascript
// 1. 全局路由守卫
import router from './router'
router.beforeEach
router.beforeResolve // 全局解析守卫(2.5.0+) 在beforeRouteEnter调用之后调用
router.afterEach
```



```javascript
// 2. 路由独享守卫
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      beforeEnter(to, from, next) {
        // ..
      }
    }
  ]
})
```



```javascript
// 2. 组件独享守卫
export default {
  data() {
    return {}
  },
  beforeEnter() {}, // 不能 获取组件实例 this
  beforeRouteUpdate() {},
  beforeRouteLeave() {} 
}
```



```js
// 1.定义动态路由 router/index.js
import Router from 'vue-router'
Vue.use(Router)
const asyncRoute = []
export default new Router()
export asyncRoute

// 2.一般的导航钩子放在permission.js文件里 permission.js
import router from './router/index'
router.beforeEach(function(to, from, next) {
  if (!store.user.acount) {
    // 
    // 请求getUserInfo拿到数据，再把动态路由添加进去
    router.addRoutes()
  } else {
    next()
  }
})
router.afterEach(() => {
  // ...
})

// 3.导航钩子除了全局的钩子外，还有组件内部钩子，这个钩子要注意下this的使用，这里this还没有拿到，不过一般很少用
```



Vuex是什么？

```javascript
/*
	是什么？
    1. vuex 就是一个仓库，仓库里放了很多对象。其中 state 就是数据源存放地，对应于一般 vue 对象里面的 data
    2. state 里面存放的数据是响应式的，vue组件从store读取数据，若是 store 中的数据发生改变，依赖这相数据的组件也会发生更新
    3. 通过mapState把全局的state和getters映射到当前组件的computed 计算属性
  有五种属性：
  	state
  	getters
  	mutations
  	action
  	module
*/
```



```js
// 1. vue框架中的状态管理，可以实现跨组件通信
// 2. 用法：和vue-router一样，也是插件，所以：
Vue.use(Vuex)
const store = new Vuex({
  modules: {
    app
  }
})
export store

// 3. 在具体的组件里使用vuex：
import { mapState } from 'vuex'

computed: {
  ...mapState({
    userInfo: state => state.user.userInfo
  })
}
```



vue-loader是什么？

```js
// 1. 是webpack打包的时候将.vue文件解析成js文件的一个loader
```



对MVVM的理解？优缺点？


最后：从源码学习，才能知其然并知其所以然
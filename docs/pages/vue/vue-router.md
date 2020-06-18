# vue-router使用及简单实现

##### Vue Router

安装：vue-cli 3   --->vue add router

配置

```javascript
// router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router) // use插件，说明vue-router是一个插件

export default new Router({
  mode: 'history', // hash | history | abstract
  // process.env.BASE_URL = http://localhost/base 则base不会列入路由匹配范围
  base: process.env.BASE_URL, 
  routes: [
    {
      path: '/home',
      name: 'home', // 重定向的时候有用
      // 路由层级代码分割，生成分片(about.[hash].js)
			// 当路由房问时会懒加载.
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    }
  ]
})
```

指定路由器

```javascript
// main.js
import Vue from 'vue'
import router from './router'
import App from './App'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

路由视图

发生嵌套，要有router-view

/list 相对于根组件，list相对于父组件

传对象，不合理，用vuex

$route变量的解耦

```javascript
// router.js

...
{
  path: '/detail/id', 
  component: Detail, 
  props: true 
}
...

// list.vue
<router-link to="/detail/1"></router-link>

// detail.vue
<template>
	<div>{{ id }}</div>   // 在这里就可以当成props来用了，不需要 $route.params.id 来获取了
</template>
...
props: {
  id: {
    type: String,
    default: '' 
  }
}
```

路由守卫

```javascript
// router.js
const router = new Router({
  mode: 'history', // hash | history | abstract
  // process.env.BASE_URL = http://localhost/base 则base不会列入路由匹配范围
  base: process.env.BASE_URL, 
  routes: [
    {
      path: '/home',
      meta: { auth: true }, // 需要认真的页面
      name: 'home', // 重定向的时候有用
      // 路由层级代码分割，生成分片(about.[hash].js)
			// 当路由房问时会懒加载.
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    }
  ]
})
// 守卫
router.beforeEach((to, from, next) => {
  // 这里对进入路由的所有页面进行拦截，看是否需要登录，是否需要验证
  if (to.meta.auth && !window.isLogin) {
    // 去登录,这里做验证逻辑
    // next('/login') 
    if (window.confirm('请登录')) {
      next()
    } else {
      // 不登录
      next('/')
    }
  } else {
    // 不需要登录
    next()
  }
})
```

路由独享守卫

```javascript
// router.js
...
{
  path: '/detail/id', 
  component: Detail,
  beforeEnter(to, from, next) {
    if (!window.isLogin) {
      next('/login')
    } else {
      next()
    }
  }
}
...
```

路由组件内的守卫

```javascript
export default {
  beforeRouteEnter(to, from, next) {
    // this不能用 可以用next写回调函数，具体看文档
  },
  beforeRouteUpdate(to, from, next) {},
  beforeRouteLeave(to, from, next) {}
}
```

> 完整的导航解析流程

> 1. 导航被触发
> 2. 调用全局的beforeEach守卫
> 3. 在重用的组件里调用beforeRouteUpdate守卫
> 4. 在路由配置里调用beforeEnter
> 5. 在被激活的组件里调用beforeRouteEnter
> 6. 调用全局的beforeResolve守卫（2.5+）
> 7. 导航被确认
> 8. 调用全局的afterEnter钩子
> 9. 触发DOM更新



动态路由

```javascript
// 异步获取路由
api.getRoutes().then(routes => {
  const routeConfig = routes.map(route => mapComponent(route))
  router.addRoutes(routeConfig)
})

// 映射关系
const compMap = {
  'Home': () => import("./view/Home.vue")
}

// 递归替换
function mapComponent(route) {
  route.component = compMap[route.component]
  if (route.children) {
    route.children = route.children.map(child => mapComponent(child))
  }
  return route
}
```

面包屑

```javascript
// Breadcrumb.vue
watch: {
  $route() {
    console.log(this.$route.matched)
    this.crumbData = this.$route.matched.map(m => m.name)
  }
}
```

简版的vue-router hash模式

```javascript
import Home from "./views/Home";
import About from "./views/About";
import Vue from "vue";

class VueRouter{
  constructor(options) {
    this.$options = options
    this.routeMap = {}
  }
  init() {
    this.bindEvents()
    this.createRouteMap(this.$options)
    this.initComponent()
  }
  bindEvents() {
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  onHashChange() {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  createRouteMap(options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
    })
  }
  initComponent() {
    // <router-link>
    Vue.component('router-link', {
      props: { to: String },
      render(h) {
        return h('a', { attrs: { href: '#' + this.to } }, [this.$slots.default])
      }
    })
    // router-view
    Vue.component('router-view', {
      render: h => {
        const comp = this.routeMap[this.app.current]
        return h(comp)
      }
    })
  }
}

VueRouter.install = function(Vue) {
  // 混入
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}

Vue.use(VueRouter);

export default new VueRouter({
  routes: [{ path: "/", component: Home }, { path: "/about", component: About }]
});
```

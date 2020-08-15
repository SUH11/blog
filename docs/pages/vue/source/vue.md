# Vue源码解读



思维导图：https://www.processon.com/view/link/5d1eb5a0e4b0fdb331d3798c#map



入口文件

虚拟DOM：每个节点都会有一个JS对象相对应，描述真实DOM的JS对象

​	Vnode类型：6种





如何判断是服务器渲染？

```js
// src/core/util/env.js
export const inBrowser = typeof window !== 'undefined' // 判断是否浏览器环境
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
let _isServer
export const isServerRendering = () => {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server'
    } else {
      _isServer = false
    }
  }
  return _isServer
}
```



new Vue做了什么？

```js
function Vue() {
  this._init()
}
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```



this._init()函数做了什么？

- 初始化 `vm.$options`

- `initLifecycle(vm)`

  - 初始化生命周期：把组件实例用到常用属性初始化
  - $parent
  - $root
  - $children

- `initEvents(vm)`

  - 比如有一个组件，嵌套了`<List>`组件，这个组件有个叫@changeName=“handleChangeName”的事件，那么`<List>`组件会将父组件里的`@changeName`事件添加到自己身上，`updateComponentListeners -> updateListeners(src/core/vdom/helpers/update-listeners.js)`
  - 真正执行的是：updateListeners方法
    - updateListeners：是一个帮助函数，比较新旧事件，并更新

  ```javascript
  export function initEvents (vm: Component) {
    vm._events = Object.create(null)
    vm._hasHookEvent = false
    // init parent attached events
    const listeners = vm.$options._parentListeners
    if (listeners) {
      // 真正的添加监听的：还是在children
      updateComponentListeners(vm, listeners)
    }
  }
  ```

- `initRender(vm)`

  - 初始化**插槽**：`$slots $scopedSlots`初始化
  - `vm.$createElement`函数声明
    - vm._c编译器需要用到
    - $createElement
  - `$attrs  $listeners`响应化

  ```javascript
  export function initRender (vm: Component) {
    vm._vnode = null // the root of the child tree
    vm._staticTrees = null // v-once cached trees
    const options = vm.$options
    const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
    const renderContext = parentVnode && parentVnode.context
    vm.$slots = resolveSlots(options._renderChildren, renderContext)
    vm.$scopedSlots = emptyObject
    // 编译器需要用到（内部方法）
    vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
    // 用户编写的用到
    vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)
  
    const parentData = parentVnode && parentVnode.data
  
    /* istanbul ignore else */
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
  }
  ```

  

- `callHook(vm, 'beforeCreate')`

- `initInjections(vm)`

- `initState(vm)`

- `initProvide(vm)`

- `callHook(vm, 'created')`

```js
initLifecycle(vm) // 初始化生命周期：把组件实例用到常用属性初始化，例如$parent/$root/$children 
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```







patchVnode

​	属性更新

​	文本更新

​	子节点更新




























# Vue源码解读-2



flow是什么？

vue的静态代码检查，Facebook出品，react也是用的flow

这个选择最根本的还是在于工程上成本和收益的考量。Vue 2.0 本身在初期的快速迭代阶段是用 ES2015 写的，整个构建工具链也沿用了 Vue 1.x 的基于 ES 生态的一套（Babel, ESLint, Webpack, Rollup...)，全部换 TS 成本过高，短期内并不现实。

相比之下 Flow 对于已有的 ES2015 代码的迁入/迁出成本都非常低

注意：flow已经停止维护了

> 作者：尤雨溪
> 链接：https://www.zhihu.com/question/46397274/answer/101193678
> 来源：知乎
> 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





package.json

​	  输出： "main": "dist/vue.runtime.common.js",   // require的入口 

 				 "module": "dist/vue.runtime.esm.js", // import 的入口

> runtime：仅包含运行时的版本，包含核心代码但是没有模版编译器，例如：vue.runtime.js
>
> umd：默认包含运行时和编译器，用于浏览器的script标签例如：vue.js
>
> commonjs：cjs规范用于旧版打包器，如browserify、webpack1.例如：vue.runtime.common.js
>
> esm：ES module规范，用于webpack2+版本，例如：vue.runtime.esm.js
>
> **Compiler VS Runtime**
>
> 带compiler版本支持template选项，可以实时编译模版
>
> runtime版本不支持template，体积小，需要借助webpack把tepmlate解析称render函数



webpack - vue-loader ：提前编译成渲染函数





render、el、template、$mount的优先级？

render > template > el > 



lifecycle.js：src/core/instance/lifecycle.js

```javascript
vm.$parent = parent
vm.$root = parent ? parent.$root : vm

vm.$children = []
vm.$refs = {}
```

> 快速复制路径：(shift + ) option + command + c 
>

initEvents：src/core/instance/events.js

父组件传递的需要处理的事件

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



initRender：src/core/instance/render.js

$slots

$scopedSlots初始化

$attrs 响应化

$listeners 响应化

```javascript
export function initRender (vm: Component) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context
  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  const parentData = parentVnode && parentVnode.data

  defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
  defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
}
```



initInjections



initState：src/core/instance/state.js

执行各种数据状态初始化的地方，包括数据响应化

```javascript
export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  // 初始化所有属性
  if (opts.props) initProps(vm, opts.props)
  // 初始化回调函数
  if (opts.methods) initMethods(vm, opts.methods)
  // 数据响应化
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch) 
  }
}
```



initProvide

先initInjections注入，后initProvide提供








































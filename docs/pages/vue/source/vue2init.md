# Vue.js源码分析之new Vue的this._init

vue版本：2.6.10<br />debug：entry-runtime-with-compiler.js<br />在打包的时候，加了--sourcemap，方便调试<br />
<br />我们用浏览器打断点的方式来看学习，今天的例子是官网上的vue/examples/commits/index.html<br />在new Vue()打了一个断点，然后点击单步执行，执行到这个位置：<br />![](https://cdn.nlark.com/yuque/0/2019/jpeg/388398/1562582613050-c91ae3cb-bf34-4f8c-a763-8ffdcfcaa40c.jpeg#align=left&display=inline&height=323&originHeight=627&originWidth=1080&size=0&status=done&width=556)<br />可以看到进入了src/core/instance/index.js，vue的构造函数就是写在这里，看起来非常简洁，下面混入了五个方法，这里并没有定义_init方法，那这个方法哪来的呢？<br />到这里，我们要先去了解这五个方法：

- initMixin(Vue)<br />
- stateMixin(Vue)<br />
- eventsMixin(Vue)<br />
- lifecycleMixin(Vue)<br />
- renderMixin(Vue)<br />

先来看下initMixin，找到该方法：
```javascript
export function initMixin (Vue: Class<Component>) {  
  Vue.prototype._init = function (options?: Object) {    
    const vm: Component = this    
    vm._isVue = true    
    // merge options    
    vm.$options = mergeOptions(      
      resolveConstructorOptions(vm.constructor),   
      options || {},      
      vm    
    )    
    // 把自己挂载这个属性    
    vm._renderProxy = vm    
    vm._self = vm        
    initLifecycle(vm)    
    initEvents(vm)    
    initRender(vm)    
    callHook(vm, 'beforeCreate')    
    initInjections(vm)     
    initState(vm)    
    initProvide(vm)     
    callHook(vm, 'created')        
    if (vm.$options.el) {      
      vm.$mount(vm.$options.el)    
    }  
  }
}
```
stateMixin只在Vue的原型上挂了_init方法，接着往下看，有这么几行：
```javascript
vm.$options = mergeOptions(        
  resolveConstructorOptions(vm.constructor),        
  options || {},        
  vm      
)
```
从字面上看，是将options合并起来，该方法的作用是将options参数挂载到vm.$options上，跳到该方法：
```javascript
export function mergeOptions (  
	parent: Object,  child: Object,  
	vm?: Component): Object {    
  normalizeProps(child, vm) 
  // props属性序列化  
  normalizeInject(child, vm) 
  // Inject序列化  
  normalizeDirectives(child) 
  // 指令序列化  
  let key  
  for (key in child) {    
    if (!hasOwn(parent, key)) {      
      mergeField(key)    
    }  
  }  
  return options
}
```
 一些属性做了序列化处理，序列化的过程比较简单，这里就不说明了。后面我们会用到这些属性。<br />在for循环里，将我们传进去的options合并起来了，接下来，我们看那几个最重要的方法。<br />
<br />先从 **initLifecycle**(vm) 开始：
```javascript
export function initLifecycle (vm: Component) {  
  const options = vm.$options  
  // something else  
  vm.$parent = parent  
  vm.$root = parent ? parent.$root : vm  
  vm.$children = []  
  vm.$refs = {}  
  // 每个组件实例是都有一个watcher，保存在vm._watcher上  
  vm._watcher = null    
  vm._inactive = null  
  vm._directInactive = false  
  vm._isMounted = false  
  vm._isDestroyed = false  
  vm._isBeingDestroyed = false
}
```
这个方法是初始化一些参数。<br />
<br />第二个方法是： **initEvents**(vm)
```javascript
export function initEvents (vm: Component) {  
  // vm._events会把$on等方法的event放到这里  
  vm._events = Object.create(null)   
  vm._hasHookEvent = false  
  const listeners = vm.$options._parentListeners  
  if (listeners) {    
    updateComponentListeners(vm, listeners)  
  }
}
```
可以看到，这里listeners是调用了父级的listeners，也就说：parent中的listeners实际的执行者是child，不是parent。<br />
<br />接下来是：**initRender**<br />这个方法涉及到虚拟DOM，这里先跳过，只需要知道，它会返回一个vnode对象即可。<br />
<br />然后是：**callHook**
```javascript
export function callHook (vm: Component, hook: string) {    
  // 获取到该生命周期的钩子函数    
  const handlers = vm.$options[hook]     
  const info = `${hook} hook`    
  if (handlers) {        
    for (let i = 0, j = handlers.length; i < j; i++) {            
      invokeWithErrorHandling(handlers[i], vm, null, vm, info) 
      // 并在该函数内部执行        
    }    
  }
}
```
这里有一个**invokeWithErrorHandling**方法，该方法的作用是：<br />1）做try catch处理<br />2）catch的话执行handleError<br />那handdleError是什么呢？我们直接来看代码：
```javascript
export function handleError (err: Error, vm: any, info: string) {  
  try {    
    if (vm) {      
      let cur = vm      
      while ((cur = cur.$parent)) {        
        const hooks = cur.$options.errorCaptured        
        if (hooks) {          
          for (let i = 0; i < hooks.length; i++) {            
            try {              
              const capture = hooks[i].call(cur, err, vm, info) === false
              if (capture) 
                return            
            } catch (e) {              
              globalHandleError(e, cur, 'errorCaptured hook')            
            }          
          }        
        }      
      }    
    }    
    globalHandleError(err, vm, info)  
  } 
}
```
循环条件是cur=cur.$parent，也就是每次循环都将$parent赋值给cur，直到$parent为空，所以errorCaptured可以捕获子孙组件的错误。<br />handleError会一次执行父组件的errorCaptured钩子函数和全局的config.errorHandler（globalHandleError）。<br />2）<br />总的来说，在钩子的执行过程中，会发生的错误由handleError捕获，handleError会把错误层层传递。也就说：这是一个Vue专门处理错误的方法！<br />生命周期的所有钩子：<br />    beforeCreate<br />    created    <br />    beforeMount<br />    mounted<br />    beforeUpdate<br />    beforeDestroy<br />    destroyed<br />    activated<br />    deactivated<br />    errorCaptured<br />
<br />下面我们接着看：**initInjections**
```javascript
export function initInjections (vm: Component) {    
  // 获取到options上的inject，为什么能获取到呢，    
  // 因为我们在initLifeCycle做了normalizeInject    
  const result = resolveInject(vm.$options.inject, vm)     
  if (result) {        
    toggleObserving(false)        
    Object.keys(result).forEach(key => {            
      defineReactive(vm, key, result[key])        
    })        
    toggleObserving(true)    
  }
}
```
这个函数做了两件事：<br />1）自底向上，获取inject结果（在resolveInject里做while循环）。<br />2）通知defineReactive函数不要将内容转换成响应式，因为在provide层已经做了响应式了。<br />
<br />**initState**方法：
```javascript
export function initState (vm: Component) {    
  vm._watchers = [] 
  // 这主要是给$watch用的，每个watch都会新建一个Watcher    
  const opts = vm.$options    // 初始化props    
  // 因为在initLifeCycle调用了normalizeProps方法，    
  // 所以options能直接方法props    
  if (opts.props) 
    initProps(vm, opts.props)       
  // 初始化methods    
  if (opts.methods) 
    initMethods(vm, opts.methods)     
  if (opts.data) {        
    // 初始化data        
    initData(vm)        
  } else {        
    observe(vm._data = {}, true /* asRootData */)    
  }    
  // 初始化computed    
  if (opts.computed) initComputed(vm, opts.computed)        
  // Firefox的window上也有一个watch方法，所以要判断以下    
  if (opts.watch && opts.watch !== nativeWatch) {        
    initWatch(vm, opts.watch)    // 初始化watch    
  }
}
```
这里值得关注的是：在初始化的时候，包括props、methods、computed、watch都做了**响应式处理**，感兴趣的详细看看，都比较简单。<br />
<br />再来看看：**initProvide**方法
```javascript
export function initProvide (vm: Component) {        
  const provide = vm.$options.provide    
  if (provide) {        
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide    
  }
}
```
这个方法就比较好理解了，如果有options有provide，直接挂载到vm._provide上。<br />那为啥这里能直接访问vm.$options.provide呢？因为我们在mergeOptions做了序列化处理，能直接访问$options.provide 。<br />
<br />最后会调一下**created**的钩子，和我们上面说的callHook是一样的，就不重复了。<br />
<br />_init方法的最后会判断options是否有el元素，有的话直接调用$mount挂载。<br />

```javascript
if (vm.$options.el) {  
  vm.$mount(vm.$options.el)
}
```
以上就是new Vue里_intit做的事了。

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
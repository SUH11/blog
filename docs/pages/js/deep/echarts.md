# Echarts，保存为图片，从源码简单分析

echarts版本: 4.04

echarts canvas，保存为图片，怎么实现：

## 一、echarts介绍

看官网即可

https://echarts.apache.org/zh/index.html

## 二、demo分析

#### 1、实现一个echarts demo：

```javascript
// 一个简单的柱状图
function dragChart(domName) {
  const chart = this.$echarts.init(this.$refs.domName)
  const option = {
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false }, // 数据视图
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true } // 保存为图片
      }
    },
    xAxis: { // x轴
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: { // y轴
        type: 'value'
    },
    series: [{ 
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
    }]
	};
	
  chart.clear()
  chart.setOption(options)
  this.$echartsResize(chart)
}
```

渲染后：

![](https://user-gold-cdn.xitu.io/2020/4/22/171a109953d40302?w=800&h=652&f=png&s=33359)

#### 2、分析echarts demo里用到了什么方法和属性

```javascript
1. this.$echarts.init
2. options的toolbox属性
3. chart.clear()
4. chart.setOption
5. this.$echartsResize(chart)
```

（1）分析：$echarts.init，从init方法开始寻找，

位置：node_modules/echarts/src/echarts.js

因为这个方法是暴露出来的，所以直接搜索`export function init` ，找到了init方法：

```javascript
// src/echarts.js 1777 line
/**
 * @param {HTMLElement} dom
 * @param {Object} [theme]
 * @param {Object} opts
 */
export function init(dom, theme, opts) {
  // ....
    var chart = new ECharts(dom, theme, opts); // 这里把demo里的this.$refs.domName传进去了
    chart.id = 'ec_' + idBase++;
    instances[chart.id] = chart;

    modelUtil.setAttribute(dom, DOM_ATTRIBUTE_KEY, chart.id);

    enableConnect(chart);

    return chart;
}
```

直接看返回值，返回是Echarts的一个实例，Echart应该就是全局的类了，就像Vue里的new Vue一样。

和Vue里又有何不同：

Vue里顶级root是需要我们手动new并挂载的，如：

```javascript
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

每次组件都是一个vue实例，且不需要我们在执行new，compile会自动帮我们编译，（也就是不需要自己写 render: h => h(ComponentA)类似的代码）

但是echarts只是一个普通的类库，也没有compile，更好的理解是：当成一个function，每次调用，都会在传进去的画布上生成canvas



（2）分析chart.setOption()

找到Echarts方法

```javascript
// src/echarts.js ECharts类
/**
 * @module echarts~ECharts
 */
function ECharts(dom, theme, opts) {
  // ...
}
// line 249
var echartsProto = ECharts.prototype; // 这里有引用关系，直接在原型链上找:echartsProto.setOption
```

在当前文件搜：echartsProto.setOption

```javascript
/**
 * @param {Object} option
 * @param {Object|boolean} [opts] opts or notMerge.
 * @param {boolean} [opts.notMerge=false]
 * @param {boolean} [opts.lazyUpdate=false] Useful when setOption frequently.
 */
echartsProto.setOption = function (option, notMerge, lazyUpdate) {
  // ...
  if (!this._model || notMerge) {
    // 有一个专门管理option的类
    var optionManager = new OptionManager(this._api);
    var theme = this._theme;
    var ecModel = this._model = new GlobalModel(null, null, theme, optionManager);
    ecModel.scheduler = this._scheduler;
    ecModel.init(null, null, theme, optionManager);
  }
  // setOption调用的是GlobalModel的方法，而GlobalModel的setOption方法又是optionManager里的方法
  this._model.setOption(option, optionPreprocessorFuncs);
		// ...
};
```

OptionManager类

```javascript
// src/model/OptionManager.js
/**
 * TERM EXPLANATIONS:
 *
 * [option]:
 *
 *     An object that contains definitions of components. For example:
 *     var option = {
 *         title: {...},
 *         legend: {...},
 *         visualMap: {...},
 *         series: [
 *             {data: [...]},
 *             ...
 *         ]
 *     };
 *
 */
function OptionManager(api) {
    this._api = api;
    this._timelineOptions = [];
    this._mediaList = [];
    this._mediaDefault;
    this._currentMediaIndices = [];
    this._optionBackup;
    this._newBaseOption;
}
```

从注释可以看到，这个方法主要用来给每一个实例初始化options

GlobalModel类

```javascript
// src/model/GlobalModel.js
// 这个类实现了很多方法，重点看下 init、setOption、resetOption、mergeOption方法
var GlobalModel = Model.extend({
		// 初始化参数
    init: function (option, parentModel, theme, optionManager) {
        theme = theme || {};
        this.option = null; // Mark as not initialized.
        this._theme = new Model(theme);
        // 并存储optionManager，因为初始化的option是放在optionManager进行管理的
        this._optionManager = optionManager; 
    },
		
    setOption: function (option, optionPreprocessorFuncs) {
        assert(
            !(OPTION_INNER_KEY in option),
            'please use chart.getOption()'
        );
				// 这里直接调用的就是optionManager的setOption
        this._optionManager.setOption(option, optionPreprocessorFuncs);

        this.resetOption(null);
    },
    resetOption: function (type) {
        var optionChanged = false;
        var optionManager = this._optionManager;
        // ...
        return optionChanged;
    },

    /**
     * @protected
     */
    mergeOption: function (newOption) {
      // 这个方法太长了，个人认为主要的作用就是将用户传进去的option和
      // 当前的this._optionManager的一个合并，并以用户传进去的option属性优先
      // 也就是类似Object.assign(a, b),b的属性会覆盖a的属性
        var option = this.option;
        var componentsMap = this._componentsMap;
        var newCptTypes = [];

        resetSourceDefaulter(this);
				// ...
    },
	// ...
}
```

做可视化项目时，自己也写过一个mergeOption方法，原因是：

##### 1、每做一个折线图（或其他），都要经过这一个步骤：

- init()
- clear()
- setOption()
- $echartsResize(chart) // 浏览器

也就是demo的步骤

##### 2、那可否把这些都封装起来，只开放option和dom节点

经过思考后，决定设置一个默认的option对象，并将传进来的newOption做一个合并，也就类似mergeOption方法了


回归正题～总结一下chart.setOption：

- chart是实际上是Echarts的实例，setOption是其原型链上的方法；
- setOption经过一些兼容处理，并new OptionManager和new GlobalModel两个类；
- OptionManager方法初始化一些option选项；
- GlobalModel将对OptionManager有引用关系，后面方便修改或引用OptionManager类方法；
- chart.setOption调用了GlobalModel的setOption方法；
- 而GlobalModel的setOption又调用了OptionManager的setOption方法；
- resetOption会调用mergeOption；

这样就canvas就渲染出来了



（3）回过头来看options的toolbox属性

直接在dist/echart.js搜索saveAsImage，因为在src下文件太多可能搜不到：

```javascript
// line 85668
// 这个文件是打包后的，所以会特别大，我们还是挑重点的来看：
// 
var saveAsImageLang = lang.toolbox.saveAsImage;

function SaveAsImage(model) {
    this.model = model;
}
// 保存为图片的时候，一些默认参数
SaveAsImage.defaultOption = {
    show: true,
    icon: 'M4.7,22.9L29.3,45.5L54.7,23.4M4.6,43.6L4.6,58L53.8,58L53.8,43.6M29.2,45.1L29.2,0',
    title: saveAsImageLang.title,
    type: 'png',
  // ...
    lang: saveAsImageLang.lang.slice()
};
// 对SaveAsImage原型链的引用
var proto$4 = SaveAsImage.prototype;
// 添加点击的方法
proto$4.onclick = function (ecModel, api) {
    var model = this.model;
    var title = model.get('name') || ecModel.get('title.0.text') || 'echarts';
    var $a = document.createElement('a');
    var type = model.get('type', true) || 'png';
    $a.download = title + '.' + type;
    $a.target = '_blank';
  	// getConnectedDataURL是重点，我们回到src/echarts.js搜一下这个方法
    var url = api.getConnectedDataURL({
        type: type,
        backgroundColor: model.get('backgroundColor', true)
            || ecModel.get('backgroundColor') || '#fff',
        excludeComponents: model.get('excludeComponents'),
        pixelRatio: model.get('pixelRatio')
    });
    $a.href = url;
   // 下载的兼容
    // Chrome and Firefox ...
    // IE ....
    
};
// 这里是将saveAsImage存起来
register$1(
    'saveAsImage', SaveAsImage
);
// line 75012
function register$1(name, ctor) {
    features[name] = ctor;
}
```

getConnectedDataURL方法：

```javascript
echartsProto.getConnectedDataURL = function (opts) {
    // ...
    if (connectedGroups[groupId]) {
       // ...
        zrUtil.each(instances, function (chart, id) {
            if (chart.group === groupId) {
              // getRenderedCanvas 这个方法是获取当前实例的canvas
                var canvas = chart.getRenderedCanvas(
                    zrUtil.clone(opts)
                );
                var boundingRect = chart.getDom().getBoundingClientRect();
                // ...
            }
        });
        // ...
        zr.refreshImmediately();
				// toDataURL方法canvas可以导出image，这里才是重点
        return targetCanvas.toDataURL('image/' + (opts && opts.type || 'png'));
    }
    else {
        return this.getDataURL(opts);
    }
};
```

getRenderedCanvas方法：

```javascript
/**
 * Get canvas which has all thing rendered
 */
echartsProto.getRenderedCanvas = function (opts) {
    if (!env.canvasSupported) {
        return;
    }
    opts = opts || {};
    opts.pixelRatio = opts.pixelRatio || 1;
    opts.backgroundColor = opts.backgroundColor
        || this._model.get('backgroundColor');
    var zr = this._zr;
  // 这里出现了zr.painter!这个东西很重要的样子，居然能从zr.painter获取到当前实例的canvas
    return zr.painter.getRenderedCanvas(opts);
};
```

zr.painter是什么东西呢？我也不知道是什么…

chart.clear()和$echartsResize方法也可以靠类似的方法找出来了，这里就不再讲述了



总结：echarts是如何做到保存图片的呢？

其实是调用了原生的方法canvasElement.toDataURL(params)。

在init的时候，实例一个Echarts，执行setOption时候，render canvas，render好了之后，就可以调用写好的getConnectedDataURL方法，将之前render的canvas保存为图片，当然echarts做了很多兼容。

echarts是一个非常大的库，阅读起来还是非常困难的




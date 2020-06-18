# Canvas Api

CanvasAPI<br />
<br />文档：[https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)<br />

<a name="r4vIX"></a>
### 1. canvas元素


```html
<canvas id="canvas" width="600" height="600"></canvas>
<!--
	注意：1. <canvas> 标签只有两个属性—— width和height
				 没有设置：默认width：300 height：150
				 该元素可以使用CSS来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸
				 如果CSS的尺寸与初始画布的比例不一致，它会出现扭曲。
-->
```


<a name="RCVcP"></a>
### 2. 画布


```javascript
let oCanvas = document.getElementById('canvas')
// getContext : 获得渲染上下文和它的绘画功能
let ctx = oCanvas.getContext('2d')
```


<a name="rTdJ4"></a>
### 3. 栅栏

<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/388398/1592384807637-4d37b9d9-2e36-424b-bc68-828e1f05729d.png#align=left&display=inline&height=223&margin=%5Bobject%20Object%5D&name=image.png&originHeight=223&originWidth=241&size=5615&status=done&style=none&width=241)
<a name="DYJCY"></a>
### 4. 一些API


```javascript
let oCanvas = document.getElementById('canvas')
// getContext : 获得渲染上下文和它的绘画功能
let ctx = oCanvas.getContext('2d') 

// 绘制矩形 : fillReact(x, y, width, height)
ctx.fillRect(25, 25, 100, 100)
ctx.clearRect(45, 45, 60, 60)
ctx.strokeRect(50, 50, 50, 50) // 清除指定矩形区域，让清除部分完全透明


/*
绘制路径
	1. 首先，你需要创建路径起始点。
  2. 然后你使用画图命令去画出路径。
  3. 之后你把路径封闭。
  4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。
*/
ctx.beginPath()
ctx.moveTo(75, 50);
ctx.lineTo(100, 75);
ctx.lineTo(100, 25);
ctx.fill() // ctx.stroke()

/*
	画圆
		注意：arc()函数中表示角的单位是弧度，不是角度。角度与弧度的js表达式:
				弧度=(Math.PI/180)*角度。
*/
ctx.begin()
ctx.fillStyle = 'red'
ctx.arc(200, 200, 0, 360 * Math.PI / 180, false)
ctx.fill()

/*
	贝塞尔曲线
		quadraticCurveTo(cp1x, cp1y, x, y)
			绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。
		bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
			绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。
*/
ctx.beginPath()
ctx.moveTo(75,25)
ctx.quadraticCurveTo(25,25,25,62.5)
ctx.stroke()

/*
	 color
*/
ctx.begin()
ctx.strokeStyle = 'rgba(0, 0, 0, .5)' // ctx.fillStyle = 'red'
ctx.arc(300, 300, 0, 360 * Math.PI / 180)
ctx.stroke()

/*
	line Style
		lineWidth = value
		lineGap = type    设置线条末端样式
		lineJoin = type		设定线条与线条间接合处的样式。
		getLineDash()			返回一个包含当前虚线样式，长度为非负偶数的数组。
		
	渐变 Gradients
		用线性或者径向的渐变来填充或描边
			createLinearGradient
			createRadialGradient
	
	阴影 Shadows
			shadowOffsetX = float
			shadowOffsetY = float
			shadowBlur = float
			shadowColor = color
*/
ctx.save()
ctx.font = '60px impact'
ctx.textBaseline = 'top'
ctx.fillStye = 'red'
ctx.shadowOffsetX = 10
ctx.shadowOffsetY = 10
ctx.shadowColor = 'green'
ctx.shadowBlur = 5
var w = ctx.measureText('我是最棒的！').width
var h = 60
ctx.fillText('我是最棒的!', (ctx.width - w) / 2, 450)
ctx.restore()

/*
	save()
		保存画布(canvas)的所有状态
	restore()
		save 和 restore 方法是用来保存和恢复 canvas 状态的，都没有参数。Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。
*/

/*
	图片
*/
function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0);
    ctx.beginPath();
    ctx.moveTo(30,96);
    ctx.lineTo(70,66);
    ctx.lineTo(103,76);
    ctx.lineTo(170,15);
    ctx.stroke();
  }
  img.src = 'images/backdrop.png';
}

/*
	点击区域（hit region）
    CanvasRenderingContext2D.addHitRegion() 
    	在canvas上添加一个点击区域。
    CanvasRenderingContext2D.removeHitRegion() 
    	从canvas上移除指定id的点击区域。
    CanvasRenderingContext2D.clearHitRegions() 
    	移除canvas上的所有点击区域。
*/
```


<a name="s0nbv"></a>
### 5. canvas优化


```javascript
/*
	1. 避免浮点数的坐标点，用整数取而代之
	2. 不要在用drawImage时缩放图像
	3. 使用多层画布去画一个复杂的场景
	4. 用CSS transforms特性缩放画布
	5. 关闭透明度
	6. 有动画，请使用window.requestAnimationFrame() 而非window.setInterval()
*/
```

# CSS3属性



1. transition属性

```css
/* transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0) */
.div ul {
  height: 0;
  transform: scaleY(0);
  transition: transform, height .5s linear 2s;
  /*
  	transition-property: transform, height;
  	transition-duration: .5s;
  	transition-timing-function: linear;
  	transition-delay: 2s
  */
}
```

2. animation动画

```css
/* 
animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），是否暂停动画（默认running）
*/
.div {
  animation: move 2s linear .5s infinite alternate forwards paused
}
/*
  animation-name
  animation-duration
  animation-timing-function : linear ease ease-in ease-out ease-in-out cubic-bezier(n,n,n,n)
  animation-delay
  animation-iteration-count : n | infinite
  animation-direction : normal | reverse | alternate | alternate-reverse
  animation-fill-mode : forwards | backwards | both
  animation-play-state : paused | running
*/

@keyframes move {
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
}
```

例子：loading

其他例子：https://www.html5tricks.com/demo/css3-loading-cool-styles/index.html

```html
// html
<div class="loading">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

```css
/* css */
.loading {
  display: flex;
  height: 100px;
  align-items: center;
  justify-content: center;
}
.loading div {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background: #4b9cdb;
  margin-right: 4px;
  animation: loading 2s infinite;
}
.loading div:nth-child(2) {
  animation-delay: .15s;
}
.loading div:nth-child(3) {
  animation-delay: .3s;
}
.loading div:nth-child(4) {
  animation-delay: .45s;
}
.loading div:nth-child(5) {
  animation-delay: .6s;
}
@keyframes loading {
  0% { transform: translateY(0); }
  35% { transform: translateY(0); opacity: .3; }
  50% { transform: translateY(-20px); opacity: .8; }
  75% { transform: translateY(3px); opacity: .8; }
  55% { transform: translateY(-3px); }
}
```



3. transform

transform:适用于2D或3D转换的元素
transform-origin：转换元素的位置（围绕那个点进行转换）。默认(x,y,z)：(50%,50%,0)

```css
.div {
	transform: rotate(30deg) 
    				 translate(20px 20px) 
    				 scale(.8) 
    				 skew(10deg,10deg) 
    				 rotate3d(10,10,10,90deg)
}
```



4. 选择器

地址：https://www.w3school.com.cn/cssref/css_selectors.asp

看这个就可以了：

阮一峰的css选择器笔记：http://www.ruanyifeng.com/blog/2009/03/css_selectors.html

全面：https://segmentfault.com/a/1190000007815822

LVHA顺序：

```css
a:link {}
a:visited {}
a:hover {}
a:active {}
```

##### 1.关系选择器：

| 选择器 | 名称                   | 描述                           |
| ------ | ---------------------- | :----------------------------- |
| `E F`  | 包含选择器（包含孙子） | 选择所有包含在E元素里面的F元素 |
| `E>F`  | 子选择器（不包含孙子） | 选择所有作为E元素的子元素F     |
| `E+F`  | 相邻选择器（必须紧邻） | 选择紧贴在E元素之后的F元素     |
| `E~F`  | 兄弟选择器（不用紧邻） | 选择E元素所有兄弟元素F         |

##### 2.伪类选择器：

| 选择器          | 描述                                      |
| --------------- | ----------------------------------------- |
| E:first-child   | 匹配父元素的第一个子元素E，可跨孙子级查找 |
| E:first-of-type | 匹配同类型中的第一个同级兄弟元素E         |
| E:nth-child(n)  | 匹配父元素的第n个子元素E                  |
| E::selection    | 该元素选中之后                            |

**E:first-of-type 总是能命中父元素的第1个为E的子元素，不论父元素第1个子元素是否为E；而E:first-child里的E元素必须是它的兄弟元素中的第一个元素，否则匹配失效。**

```html
// html
<div>
	<header>
  	<p>1</p>
  </header>
  <p>2</p>
  <p>3</p>
</div>

// css
div p:first-child {} 1
div p:first-of-type {} 1, 2

// html
<div>
	<header></header>
  <p>2</p>
  <p>3</p>
</div>

// css
div p:first-child {} 匹配不到
div p:first-of-type {} 2
```



5. 阴影

```
box-shadow: 水平阴影的位置 
						垂直阴影的位置 
						模糊距离 
						阴影的大小 
						阴影的颜色 
						阴影开始方向（默认是从里往外，设置inset就是从外往里）;
text-shadow: text-shadow:水平阴影，垂直阴影，模糊的距离，以及阴影的颜色。
```

```css
.box {
  width: 100px;
  hegiht: 100px;
  background: yellowgreen;
  box-shadow: 0 0 10px 20px red inset;
}
```



6. 边框

(1) border-image

border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘制偏移的量（默认0） 铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;

```css
.box {  
  width: 100px;  
  hegiht: 100px;  
  background: yellowgreen;  
  border: 15px;
  border-image: url('https://user-gold-cdn.xitu.io/2017/11/15/15fbf4081f22448c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1');
  border-image-slice: 30;
  border-image-repeat: round;
  border-image-outset: 0;
}
```

(2) bordr-radius

```css
/* n1-n4四个值的顺序是：左上角，右上角，右下角，左下角 */
.div {
  border-radius: n1 n2 n3 n4/n1 n2 n3 n4;
}
```

```css
.box {
  width: 100px;
  height: 100px;
  background: yellowgreen;
  border-radius: 100px;
}
/* 半圆 */
.box {
  width: 200px;
  height: 100px;
  background: yellowgreen;
  border-radius: 100px 100px 0 0 / 100px 100px 0 0;
}
```



7. 背景

1）background-clip : border-box | padding-box | content-box

2）background-origin: 0 0;

3）background-size: 100px 100px

4）多张背景图



8. 倒影

`-webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片`



9. 文字

```css
/* 换行 */
.box1 {
  width: 100px;
  height: 100px;
  word-break: break-all; /* break-all keep-all normal */
}

.box2 {
  width: 100px;
  height: 100px;
  word-wrap: break-word; /* normal break-word */
}

/* 超出显示省略号 */
.box2 {
  width: 100px;
  height: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

/* 多行超出显示省略号*/
.box2 {
  overflow: hidden;
  text-overflow: ellipsis; /* clip ellipsis string(firefox) */
  display: box;
  line-clamp: 2;
  box-orient: vertical;
  /* 行距的处理 */
  padding: 0 10px;
  line-height: 30px;
  height: 60px; /* 高度=行高*行数 */
}

```



10. 颜色

（1）rgba

（2）hsla

11.渐变

（1）linear-gradient

方向：一字型，逆时针

```css
.box {
  width: 200px;
  height: 200px;
  background: linear-gradient(
    45deg, 
    red 0,
    red 10%,
    blue 10%,
    blue 20%,
    yellowgreen 20%,
    yellowgreen 30%,
    gray 30%,
    gray 100%
  );
  transform: rotate(-45deg) scale(.6);
  border: 3px solid blue;
}
```

（2）radial-gradient

（3）conic-gradient

锥性渐变：https://www.cnblogs.com/coco1s/p/7079529.html

12.Filter

过滤器

```css
.img {
  width: 300px;
  height: 300px;
  filter: grayscale(100%);
}
/*
	filter: grayscale(100%) 黑白色
					sepia(100%)	褐色
					saturate(2)	饱和度
					hue-rotate(90deg)	色相旋转
					invert(1)	反色
					opacity(.5) 透明度
					brightness(.5)	亮度
					contrast(2)	对比度
					blur(3px)	模糊
					drop-shadow(0 0 10px blue)	阴影
*/
```

13.弹性布局

传统布局：display + float + position

弹性布局：display: flex;

```html
<div class="parent">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>
```

```css
/*
	父容器属性：
		display: flex;
		flex-direction: row | column …
		flex-wrap: 
		a:
		justify-content:(x轴)
		align-items:（y轴）
		align-content: 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。（多根轴线的y轴对齐）
*/
.parent {
  height: 400px;
  border: 1px solid red;
  display: flex;
  flex-grow: row nowrap;
}
/*
	item属性：
		order:
		flex-grow:
		flex-shrink:
		flex-basic:
		flex: flex-grow | flex-shrink | flex-basic (0 1 auto)
		align-self:
*/
.item {
  width: 200px;
  height: 100px;
  background: yellowgreen;
}
```

实例：http://www.ruanyifeng.com/blog/2015/07/flex-examples.html

骰子实例：https://codepen.io/LandonSchropp/pen/KpzzGo?__cf_chl_jschl_tk__=c1f96913cafd95f2e63216c02894c71003f3a5db-1588071407-0-AbjwEEmHBtMqy4YNVVfyhCKGqPbl10cLBXtK-LX_I4AYubG-U1eWnqnA-kX7H_1MqEeJlzX0rmfhu1h4Ndi4BbVeAg7VhWB75OJL7FVNer2sfiHyPn5Mc3nSBq_ukEHYA0J2HPm6plWe63yXSgftiozRQfaRntBpv6H5whQSXwrQH0JawpzUoZyhahb-UC8n3Yph-fysHmjVyHLseXnOwhOW5hUPatwMmWWtGlEyjwTppolTusAZmcHOR7eoxfI7dkI7yQrHNe-V-MPbJXrlwq8POiyRmRoyH428f_fbx030YADhFZjgjUV8aB3uwwqidmmRgN_vo6QkSZN6YMUcKozxJkA27KjTJMWVDxtITzuf

14.栅格布局

grid：https://www.jianshu.com/p/d183265a8dad

例子1:https://jsbin.com/guvivum/edit?html,css,output

设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

```css
/*
	容器属性
		display: grid | inline-grid
		grid-template-columns: 33.3% 33.3% 33.3%
													 repeat(3, 33.3%)
													 repeat(auto-fill, 100px)
													 150px 1fr 2fr
													 1fr 1fr minmax(100px, 1fr)
													 100px auto 100px
						网格线名称			  [c1] 100px [c2] 100px [c3] 100px [c4]
		grid-template-rows:
		
		grid-column-gap:
		grid-row-gap:
		grid-gap:
		gap:
		
		grid-template-areas:
		grid-auto-flow:

		justify-items:
		align-items:
		palce-items:

		justify-content:
		align-content:
		place-content:

		grid-auto-columns:
		grid-auto-rows:
		
		grid-template:
		grid:
*/

/*
	项目属性
		grid-column-start:
		grid-column-end:
		grid-row-start:
		grid-row-end:

		grid-column:
		grid-row:
		
		grid-area:

		justify-self:
		align-self:
		palce-self:
*/

/*九宫格*/
.container {
  display: grid;
  grid-template-columns: repeat(3, 33.33%);
  grid-template-rows: repeat(3, 33.33%)
}
```

15.多列布局

```html
<div class="newspaper">
		当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界。
</div>
```

```css
.div {
	column-count: 3; /*列数*/
  column-rule: 2px solid red; /*分隔样式*/
}
```

16.合模型定义

```css
.div {
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid yellowgreen;
  background: red;
  box-sizing: border-box;
}	
```

17.媒体查询

```css
body {
  background: #fff;
}

@media screen and (max-width: 960px) {
  body {
    background: yellowgreen;
  }
}

@media screen and (max-width: 600px) {
  body {
    background: blue;
  }
}

@media screen and (max-width: 480px) {
  body {
    background: red;
  }
}
```

18.混合模式

```css
background-blend-mode
mix-blend-mode
```

总结：

回流、重绘、BFC

文章：https://blog.csdn.net/u014697639/article/details/80311559

##### ::after 和 :after的区别：

1. 一个冒号表示是伪类，两个冒号表示是伪元素。

> 伪元素的操作对象是新生成的dom元素，而不是原来dom结构里就存在的；而伪类恰好相反，伪类的操作对象是原来的dom结构里就存在的元素。

2. 伪元素与伪类的根本区别在于：操作的对象元素是否存在于原来的dom结构里。



CSS揭秘例子总结

1. 边框内圆角

```html
	<div class="border">
		当我年轻的时候，我梦想改变这个世界；当我成熟以后，我发现我不能够改变这个世界，我将目光缩短了些，决定只改变我的国家；当我进入暮年以后，我发现我不能够改变我们的国家，我的最后愿望仅仅是改变一下我的家庭，但是，这也不可能。当我现在躺在床上，行将就木时，我突然意识到：如果一开始我仅仅去改变我自己，然后，我可能改变我的家庭；在家人的帮助和鼓励下，我可能为国家做一些事情；然后，谁知道呢?我甚至可能改变这个世界
	</div>
```

```css
.border {
  width: 300px;
  background: tan;
  box-shadow: 0 0 0 5px #655;
  outline: 10px solid #655;
}
```

2. 条纹渐变

如果我们把第二个色标的位置值设置为0，那它的位置就总是会被浏览器调整为前一个色标的位置值

```css
body {
  background: linear-gradient(45deg, 
    													#fb3 25%, #58a 0, #58a 75%,
  														#fb3 0, #fb3 75%, #58a); /* 生成贴片要无缝对接*/
}
```

![image-20200430105247358](/Users/su/Library/Application Support/typora-user-images/image-20200430105247358.png)

3. 圆点阵列

```css
body {
	background: #655;
  background-image: radial-gradient(tan 20%, transparent 0),
    								radial-gradient(tan 20%, transparent 0);
  background-size: 30px 30px;
  backgorund-position: 0 0, 15px 15px;
}
```

![image-20200430114046856](/Users/su/Library/Application Support/typora-user-images/image-20200430114046856.png)

4. 平行四边形

```css
.skew {
  width: 100px;
  padding: 16px 0;
  position: relative;
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
}
.skew::after {
  content: '';
  position: absolute;
  left:0; right: 0; top: 0; bottom: 0;
  background: #58a;
  transform: skew(-45deg); /* 边形运用到伪元素身上 */
}
```

5. 棱形图片

```css
img {
  max-width: 250px;
  clip-path: polypon(50% 0, 100% 50%, 50% 100%, 0 50%);
  transition: 1s;
}
img:hover {
  clip-path: polypon(0 0, 100% 0, 100% 100%, 0 100%);
}
```

clip-path: polygon多边形

![image-20200430184301519](/Users/su/Library/Application Support/typora-user-images/image-20200430184301519.png)

6. 切角效果

![image-20200504143311574](/Users/su/Library/Application Support/typora-user-images/image-20200504143311574.png)



```css
.box {
  width: 200px;
  height: 200px;
  background: #58a;
  background: linear-gradient(-45deg, transparent 15px, #58a 0) bottom right,
    					linear-gradient(45deg, transparent 15px #58a 0) bottom left,
    					linear-gradient(135deg, transparent 15px, #58a 0) top left,
    					linear-gradient(-135deg, transparent 15px, #58a 0) top right;
  background-size: 50% 50%;
  background-repeat: no-repeat;
}
/*弧形切角*/
.box {
  background: radial-gradient(circle at top left, transparent 15px, #58a 0) top left,
    					radial-gradient(circel at top right, transparent 15px, #58a 0) top right,
    					radial-gradient(circel at bottom left, transparent 15px, #58a 0) bottom left,
    					radial-gradient(circel at bottom right,transparent 15px, #58a 0) bottom right;
}

```

8. 梯形

transform: perspective,设置元素被查看位置的视图

```css
.tab {
	width: 200px;
  padding: 16px 0;
  position: relative;
}
.tab::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0; top: 0;
  background: #58a;
  transform: perspective(16px) rotateX(5deg) scaleY(1.3);
  transform-origin: bottom;
}
```

9. 简单的饼图

```css
.pie {
	width: 100px;
  height: 100px;
  border-radius: 50%;
  background: yellowgreen;
  background-image: linear-gradient(to right, transparent 50%, currentColor 0);
  color: #655;
}
.pie::before {
  content: '';
  display: block;
  margin-left: 50%;
  height: 100%;
  border-radius: 0 100% 100% 0 / 50%;
  background-color: inherit;
  transform-origin: left;
  animation: spin 3s linear infinite, bg 6s step-end infinite;
}
@keyframes spin {
  to { transform: rotate(.5turn); }
}
@keyframes bg {
  50% { background-color: currentColor; }
}

```

10. 毛玻璃

```css
/*毛玻璃效果*/
body {
    min-height: 100vh;
    box-sizing: border-box;
    margin: 0;
    padding-top: calc(50vh - 6em);
    font: 150%/1.6 Baskerville, Palatino, serif;
}

body, main::before {
    background: url("http://csssecrets.io/images/tiger.jpg") 0 / cover fixed;
}

main {
    position: relative;
    margin: 0 auto;
    padding: 1em;
    max-width: 23em;
    background: hsla(0, 0%, 100%, .25) border-box;
    border-radius: .3em;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .3) inset,
                0 .5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, .3);
    overflow: hidden;
}
main::before {
    content: '';
    position: absolute;
    top: 0; right: 0; left: 0; bottom: 0;
    margin: -30px;
    z-index: -1;
    filter: blur(20px)
}
```

11. 折角效果

```css
.zhejiao {
    position: relative;
    width: 12em;
    background: #58a;
    background: linear-gradient(-150deg, transparent 1.5em, #58a 0);
    padding: 2em;
    color: white;
    font: 100%/1.6 Baskerville, Polatino, serif;
    border-radius: .5em;
}
.zhejiao::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 1.73em; height: 3em;
    background: linear-gradient(to left bottom, transparent 50%, rgba(0,0,0,.2) 0, rgba(0,0,0,.4)) 100% 0 no-repeat;
    transform: translateY(-1.3em) rotate(-30deg);
    transform-origin: bottom right;
    border-bottom-left-radius: .5em;
    box-shadow: -.2em .2em .3em -.1em rgba(0,0,0,.15)
}
```

12. 插入换行

```html
<dl>
  <dt>name: </dt>
  <dd>name1</dd>
  
  <dt>email: </dt>
  <dd>email1</dd>
  <dd>email2</dd>
</dl>
```

```css
dt, dd {
  display: inline;
  margin: 0;
}
dd {
  font-weight: bold;
}
dd + dt::before {
  content: '\A'; /*\A表示换行符*/
  white-space: pre;
}
dd + dd:before {
  content: ',';
  font-weight: normal;
  margin: 0 .25em 0 -.25em;
}
```

13. 文本行斑马条纹

pre: tab-size指定多少个字符缩进

```css
pre {
	padding: .5em;
  line-height: 1.5;
  background: linear-gradient(#efd8d4 50%, #fbf0ec 0);
  background-size: auto 3em;
  background-origin: content-box;
  font-family: Consolas, Monaco, monospace;
}
```

14. &符号

```css
<h1>HTML & CSS</h1>

@font-face {
    font-family: Ampersand;
    src: local('Baskerville-Italic'), local('GoudyOldStyleT-Italic'), local('Garamond-Italic'), local('Palatino-Italic');
    unicode-range: U+26;
}

h1 {
    font-family: Ampersand, Helvetica, sans-serif;
}
```

15. 下划线

```css
/* 直线 */
a {
  background: linear-gradient(gray, gray) no-repeat;
  background-size: 100% 1px;
  background-position: 0 1em;
  text-shadow: .25em 0 white, -.25em 0 white; /*防止下划线穿过字体*/
}
/*虚线*/
a {
  background: linear-gradient(90deg, gray 66%, transparent 0) repeat-x;
  background-size: .2em 2px;
  background-position: 0 1em;
}
/*波浪线*/
a {
      background: linear-gradient(-45deg, transparent 40%, red 0, red 60%, transparent 0) 0 1em,
                  linear-gradient(45deg, transparent 40%, red 0, red 60%, transparent 0) .1em 1em;
    background-repeat: repeat-x;
    background-size: .2em .1em;
    text-shadow: .05em 0 white, -.05em 0 white;
}
```

16. 自定义复选框

```css
input[type="checkbox"] {
  position: absolute;
  clip: react(0, 0, 0, 0);
}
input[type="checkbox"] + label::before {
	content: '\a0';
	display: inline-block;
	vertical-align: .2em;
	width: .8em;
	height: .8em;
	margin-right: .2em;
	border-radius: .2em;
	background: silver;
	text-indent: .15em;
	line-height: .65;
}

input[type="checkbox"]:checked + label::before {
	content: '\2713';
	background: yellowgreen;
}

input[type="checkbox"]:focus + label::before {
	box-shadow: 0 0 .1em .1em #58a;
}

input[type="checkbox"]:disabled + label::before {
	background: gray;
	box-shadow: none;
	color: #555;
	cursor: not-allowed;
}

body {
	font: 150%/1.6 sans-serif;
}
```

![image-20200504171625749](/Users/su/Library/Application Support/typora-user-images/image-20200504171625749.png)

17. 弱化背景

（1）box-shadow

```css
.dialog {
	position: fixed;
  left: 50%; top: 50%;
  margin-left: -200px;
  box-shadow: 0 0 50vmax rgba(0, 0, 0, .8);
}
```

（2）blur

```css
/*dialog.open*/
.main {
  filter: blur;
}
```

background-attachment: local / scroll



18. 满幅的背景，定宽的内容

```css
footer {
  padding: 1em calc(50% - 450px);
  background: #ccc;
}
```

19. 垂直居中

```css
/* 1.绝对定位 */
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

■vw是与视口宽度相关的。与常人的直觉不符的是，1vw实际上表示视口宽度的1%，而不是100%。

■与vw类似，1vh表示视口高度的1%。

■当视口宽度小于高度时，1vmin等于1vw，否则等于1vh。

■当视口宽度大于高度时，1vmax等于1vw，否则等于1vh。

```css
/* 2.基于vh */
.center {
  width: 18em;
  margin: 50vh auto 0;
  transform: translateY(-50%);
}
```

```css
/* 2.基于flex */
body {
  display: flex;
  min-height: 100vh;
}
.center {
  width: 18em;
  margin: auto;
}
```

20. 固定的页脚

方法：设置页脚的高度，然后设置内容区域的最小高度min-height



css面试题

1.css盒模型

低版本IE：宽度 = content（width + padding + margin） + margin   = box-sizing: border-box

标准：宽度 = width + padding + border + margin = box-sizing: content-box

box-sizing: border-box | content-box



2.
















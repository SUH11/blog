# 弹性布局



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
		order: 排列的方向
		flex-grow: 放大缩小
		flex-shrink: 默认值为1，如果没有显示定义该属性，将会自动按照默认值1在所有因子相加之后计算比率来进行空间收缩
		flex-basic: flex-grow | flex-shrink
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
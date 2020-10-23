# 事件委托（事件代理）



事件代理（Event Delegation），又称之为事件委托。是JavaScript中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定在子元素的响应事件（click、keydown......）委托给父元素，让父元素担当事件监听的职务。

事件代理的原理是DOM元素的**事件冒泡**。

> 事件绑定的三种形式：
>
> 	1. 行内绑定
>  	2. oUl.onclick = fn 
>  	3. oUl.addEventListener('click', function() {}, false) // false是冒泡，true是捕获



例子：

​	有一个ul列表，包含了很多的li，
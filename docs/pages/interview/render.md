# html页面渲染的过程



1. #### 解析html文件，创建DOM树

   自上而下解析，遇到link、style、script标签都会发生阻塞

   - css加载不会阻塞html文件的解析；但会阻塞DOM的渲染和JS语句的执行

   - js会阻塞html的解析和dom的渲染

   - 没有defer和async的script标签会立即加载并执行

   - async：js的加载执行、html的解析渲染并行

   - defer：html解析完，才执行

     

   **DOMContentLoaded和onload的区别**

   DOMContentLoaded在html解析完毕后执行，loload在页面完全加载完成后执行（包括样式和图片）

   

2. #### 解析css，生成CSSOM树，css对象模型

3. #### DOM和css合并，构建渲染树

4. #### 进行布局和描绘，也就是回流和重绘

   - 回流

     > 渲染树中的一部分因为元素的规模尺寸，布局，隐藏等改变而需要重新构建

   - 重绘

     > 根据元素的新属性重新绘制，使元素呈现新的外观

   回流一定发生重绘，重绘不一定发生回流





参考文章：https://blog.csdn.net/qq_33583069/article/details/108266800
# 移动端遇到的问题？





1. 一像素问题
   - 背景
   - 用transform



2. click事件会有300ms的延迟

   因为在移动端里，浏览器需要等待一段时间来判断此次用户操作是单击还是双击，所以就有click 300ms 的延迟机制

   解决方案：

   1. 禁用缩放

      > 当 `HTML`文档头部包含如下 `meta` 标签时：表明这个页面是不可缩放的，那双击缩放的功能就没有意义了，此时浏览器可以禁用默认的双击缩放行为并且去掉 `300ms` 的点击延迟
      >
      > `content="user-scalable=no"`

      ```html
      <meta name="viewport" content="user-scalable=no">
      <meta name="viewport" content="initial-scale=1,maximum-scale=1">
      ```

   2. 更改默认的视口宽度

      > 它没有完全禁用缩放，而只是禁用了浏览器默认的双击缩放行为，但用户仍然可以通过双指缩放操作来缩放页面。

   3. 引入 `fastclick` 库来解决

      `FastClick` 的实现原理是在检测到 `touchend` 事件的时候，会通过 `DOM` 自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。






























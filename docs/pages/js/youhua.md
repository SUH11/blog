**浏览器**

script标签：defer	async

回流：修改布局

重绘：更改外观，例如color

回流一定发生重绘，重绘不一定发生回流。

如何减少重绘和回流？

1. transform代替top
2. visibility代替display：none；
3. css节点层级扁平化



**提示如何加速：**

1. 从文件大小考虑
2. 从 `script` 标签使用上来考虑
3. 从 CSS、HTML 的代码书写上来考虑
4. 从需要下载的内容是否需要在首屏使用上来考虑



**性能优化**

1. 图片

   加载优化，用css代替图片

   小图用base64

   雪碧图

   选择正确的图片格式：例如大图就尽量不要选用png

2. DNS预解析

3. 节流

   隔一段时间发一次请求，防止触发间隔太短，浏览器卡死

```javascript
function throttle(fn, interval = 300) {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this, arguments);
            canRun = true;
        }, interval);
    };
}
```



4. 防抖

用户点击按钮一段时间后没有再次点击的情况才去发起网络请求，防止用户多次点击提交

```javascript
function debounce(fn, interval = 300) {
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this, arguments);
        }, interval);
    };
}
```



5. 预加载

```html
<link rel="preload" href="http://www.xx.com">
```

6. 预渲染

```html
<link rel="prerender" href="http://www.xx.com">
```

7. 懒加载

   懒加载就是将不关键的资源延后加载。

   例如：图片的懒加载，只有图片出现在可视区的时候，才加载

8. CDN


# 项目里如何做优化？



可以从两个方面来考虑：

	1. 网络层面
 	2. 编译代码



参考文章：https://blog.csdn.net/weixin_42755677/article/details/108232479?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-8.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-8.channel_param



1. 网络

   输入url--->返回资源这个过程分析。

   1. 浏览器从地址栏的输入中获得服务器的 IP 地址和端口号；

   2. 浏览器用 TCP 的三次握手与服务器建立连接；

   3. 浏览器向服务器发送拼好的报文；

   4. 服务器收到报文后处理请求，同样拼好报文再发给浏览器；

   5. 浏览器解析报文，渲染输出页面。

   可以做的：

   1. 开启gzip压缩
   2. 利用浏览器/服务器缓存，cache-control字段

   - If-Modified-Since
   - If-None-Match
   - If-Unmodified-Since
   - If-Match
   - If-Range
   - ETag

   3. CDN加速
   4. 升级http协议为https



2. 编译
   1. 分包，打包成多个文件，按需加载
   2. 代码压缩
   3. Tree sharking 
   4. 抽离组件，减少代码体积



3. 打包速度
   1. 用Happypack将js单线程，变成多线程方式，对loader打包
   2. 用webpack-bundle-analysis插件查看哪些文件过大，进行优化












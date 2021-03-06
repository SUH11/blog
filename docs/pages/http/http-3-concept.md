# 与HTTP相关的各种概念



<a data-fancybox title="" href="https://static001.geekbang.org/resource/image/51/64/5102fc33d04b59b36971a5e487779864.png">![](https://static001.geekbang.org/resource/image/51/64/5102fc33d04b59b36971a5e487779864.png)</a>

1. #### 网络世界

   互联网世界更像是由数不清的大小岛屿组成的“千岛之国”。



2. #### 浏览器

   http里的请求方



3. #### Web服务器

   http里的应答方

   - Apache
   - Nginx



4. #### CDN

   CDN，全称是“Content Delivery Network”，翻译过来就是“**内容分发网络**”。它应用了 HTTP 协议里的缓存和代理技术，代替源站响应客户端的请求。

   > 可以缓存源站的数据，让浏览器的请求不用“千里迢迢”地到达源站服务器，直接在“半路”就可以获取响应

   - 网络加速
   - 负载均衡
   - 安全防护
   - 边缘计算
   - 跨运营商网络



5. #### 爬虫

   HTTP 协议并没有规定用户代理后面必须是“真正的人类”，它也完全可以是“机器人”，这些“机器人”的正式名称就叫做“爬虫”（Crawler），实际上是一种可以**自动访问 Web 资源的应用程序**。



6. #### HTML/WebService/WAF

   WAF：网络应用防火墙

   > 它是应用层面的“防火墙”，专门检测 HTTP 流量，是防护 Web 应用的安全技术。



### 总结

1. 互联网上绝大部分资源都使用 HTTP 协议传输；
2. 浏览器是 HTTP 协议里的请求方，即 User Agent；
3. 服务器是 HTTP 协议里的应答方，常用的有 Apache 和 Nginx；
4. CDN 位于浏览器和服务器之间，主要起到缓存加速的作用；
5. 爬虫是另一类 User Agent，是自动访问网络资源的程序。



​	


























































# HTTP的缓存代理

缓存代理：可以让请求不必走完整个后续处理流程，“就近”获得响应结果。

​					HTTP 的服务器缓存功能主要由代理服务器来实现（即缓存代理）

1. 缓存代理服务

   代理收到源服务的数据做的两件事：

   ​	第一，把报文转发给客户端。

   ​	第二，把报文存入自己的Cache里。

   *代理“既是客户端，又是服务器”，同时也“既不是客户端，又不是服务器”*



2. 源服务器的缓存控制

   - max-age
   - no-store
   - no-cache
   - must-revalidate

   这四种属性可以约束客户端，也可以约束代理。

   如何区分：

   - private：缓存只能在客户端保存
   - public：缓存完全开放，谁都可以存，谁都可以用

   缓存失效校验：（要有Last-modified和ETag）

   - must-revalidate：只要过期必须回源服务器验证
   - proxy-revalidate：代理的缓存过期后必须验证，客户端不必回源，只需验证到代理这个环节
   - s-maxage：在代理上能存多久
   - max-age：客户端还是用这个字段
   - no-transform：禁止处理（例如对数据做优化）

   > ⚠️源服务器在设置完“Cache-Control”后必须要为报文加上“Last-modified”或“ETag”字段。
   >
   > 否则，客户端和代理后面就无法使用条件请求来验证缓存是否有效，也就不会有 304 缓存重定向。



3. 客户端的缓存控制
   - no-store
   - only-if-cached
   - no-cache
   - max-age
   - max-stale：代理上的缓存过期了也可以接受，但不能过期太多，超过 x 秒也会不要
   - min-fresh：绝对不允许过期，还有min-fresh=x，x秒之后还是有效的
   - no-transform



4. 其他问题

   - X-Cache：缓存是否命中

   - X-Hit：命中率

   - X-Accel：自定义字段，被谁加速

   - **Vary字段**

     > ```bash
     > # 内容协商后，会有不同的字符集、编码、浏览器版本等
     > Vary: Accept-Encoding
     > Vary: User-Agent
     > ```

   - **Puarge**清理缓存

     > 什么时候要清理？
     >
     > 1. 过期的数据应该及时淘汰，避免占用空间；
     > 2. 源站的资源有更新，需要删除旧版本，主动换成最新版（即刷新）；
     > 3. 有时候会缓存了一些本不该存储的信息，例如网络谣言或者危险链接，必须尽快把它们删除。



如何学习nginx: 只要理解的http的缓存代理，nginx的是比较容易掌握的，可以结合nginx的文档，看proxy相关的指令，逐条对照http的功能。



### 总结

1. 计算机领域里最常用的性能优化手段是“时空转换”，也就是“时间换空间”或者“空间换时间”，HTTP 缓存属于后者；
2. 缓存代理是增加了缓存功能的代理服务，缓存源服务器的数据，分发给下游的客户端；
3. “Cache-Control”字段也可以控制缓存代理，常用的有“private”“s-maxage”“no-transform”等，同样必须配合“Last-modified”“ETag”等字段才能使用；
4. 缓存代理有时候也会带来负面影响，缓存不良数据，需要及时刷新或删除。































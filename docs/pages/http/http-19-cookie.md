# HTTP的Cookie

http是无状态的

​	优点：服务器没有状态差异，可以很容易地组成集群

​	缺点：无法支持需要记录状态的事务操作

[MDN文档Cookie](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies)：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies



1. 什么是Cookie

   服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。

   Cookie使无状态的http协议也能记录状态信息（类似小纸条）



2. 工作过程

   响应头字段：**Set-Cookie**

   请求头字段：**Cookie**

   a. 浏览器第一次访问，服务器响应response header加上 Set-Cookie

   b. 浏览器保存Set-Cookie的值

   c. 浏览器第二次访问会在request header加上Cookie字段

注意：

设置多个Cookie：

```
Set-Cookie: name=a
set-Cookie: age=18
```



3. Cookie的属性

   a. 设置 Cookie 的生存周期：

   ​	**Expires**过期时间（绝对时间）

   ​	**Max-Age**相对时间（秒，优先级更高）

   b. **Domain**所属域名

   ​	**Path**路径（通常用/）

   c. Cookie的安全性

   ​	**HttpOnly**Cookie 只能通过浏览器 HTTP 协议传输，禁止其他方式访问

   ​	**SameSite**：Strict不能随着跳转链接跨站发送；Lax允许GET/HEAD，禁止POST

   ​	**Secure**只能用https加密传输

注意：Chrome 计划将`Lax`变为默认设置。这时，网站可以选择显式关闭`SameSite`属性，将其设为`None`。不过，前提是必须同时设置`Secure`属性（Cookie 只能通过 HTTPS 协议发送），否则无效。

下面的设置无效。

> ```bash
> Set-Cookie: widget_session=abc123; SameSite=None
> ```

下面的设置有效。

> ```bash
> Set-Cookie: widget_session=abc123; SameSite=None; Secure
> ```



4. Cookie的应用

   身份识别

   广告追踪

   > 为了防止滥用 Cookie 搜集用户隐私，互联网组织相继提出了 `DNT`（Do Not Track）和 `P3P`（Platform for Privacy Preferences Project），但实际作用不大。



### 总结

1. Cookie 是服务器委托浏览器存储的一些数据，让服务器有了“记忆能力”；
2. 响应报文使用 Set-Cookie 字段发送“key=value”形式的 Cookie 值；
3. 请求报文里用 Cookie 字段发送多个 Cookie 值；
4. 为了保护 Cookie，还要给它设置有效期、作用域等属性，常用的有 Max-Age、Expires、Domain、HttpOnly 等；
5. Cookie 最基本的用途是身份识别，实现有状态的会话事务。






























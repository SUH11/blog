# 响应状态码



状态行

<a data-fancybox title="" href="https://static001.geekbang.org/resource/image/a1/00/a1477b903cd4d5a69686683c0dbc3300.png">![](https://static001.geekbang.org/resource/image/a1/00/a1477b903cd4d5a69686683c0dbc3300.png)</a>





1. #### 状态码

   RFC 标准里规定的状态码是三位数，所以取值范围就是从 000 到 999。

   RFC 标准把状态码分成了五类，由 000~999 变成了 100~599

   这五类的具体含义是：

   1. **1××：提示信息**，表示目前是协议处理的中间状态，还需要后续的操作；
   2. **2××：成功**，报文已经收到并被正确处理；
   3. **3××：重定向**，资源位置发生变动，需要客户端重新发送请求；
   4. **4××：客户端错误**，请求报文有误，服务器无法处理；
   5. **5××：服务器错误**，服务器在处理请求时内部发生了错误。

   > 目前 RFC 标准里总共有 41 个状态码，但状态码的定义是开放的，允许自行扩展



2. #### 1××

   1××类状态码属于提示信息，是协议处理的中间状态，实际能够用到的时候很少。

   > 我们偶尔能够见到的是“**101 Switching Protocols**”。
   >
   > 它的意思是客户端使用 **Upgrade** 头字段，要求在 HTTP 协议的基础上改成其他的协议继续通信，比如 **WebSocket**。而如果服务器也同意变更协议，就会发送状态码 101，但这之后的数据传输就不会再使用 HTTP 了。



3. #### 2××

   **2××类状态码表示服务器收到并成功处理了客户端的请求**

   - **200 OK**

     - 表示一切正常

   - **204 No Content**

     - 与“200 OK”基本相同，**但响应头后没有 body 数据**

   - **206 Partial Content**

     - 服务器成功处理了请求

       - 但 body 里的数据不是资源的全部，而是其中的一部分。

       - 通常还会伴随着头字段“**Content-Range**”

         > 例如“Content-Range: bytes 0-99/2000”，意思是此次获取的是总计 2000 个字节的前 100 个字节

     - HTTP 分块下载或断点续传的基础，在客户端发送“范围请求”、要求获取资源的部分数据时出现



3. #### 3xx

   3××类状态码表示**客户端请求的资源发生了变动**，客户端必须用新的 URI 重新发送请求获取资源，也就是通常所说的“重定向”，包括著名的 301、302 跳转。

   - **301 Moved Permanently**
     - 永久重定向
     - 此次请求的资源已经不存在了，需要改用改用新的 URI 再次访问。
     - 例如：http升级到https
     - 会更新书签和记录
     - **Location** 指明后续要跳转的 URI
   - **302 Found**
     - 临时重定向
     - 请求的资源还在，但需要暂时用另一个 URI 来访问
     - 例如：系统维护
     - **Location** 指明后续要跳转的 URI
   - **304 Not Modified**
     - 表示资源未修改
     - 它用于 If-Modified-Since 等条件请求，用于缓存控制
     - 可理解为：缓存重定向



4. #### 4××

   4××类状态码表示客户端发送的请求报文有误，服务器无法处理，它就是真正的“错误码”含义了。

   - **400 Bad Request**
     - 表示请求报文有错误
     - 只是一个笼统的错误，客户端看到 400 只会是“一头雾水”“不知所措”
   - **401 Unauthorized**
     - 未授权，通常表示没有权限
   - **403 Forbidden**
     - 表示服务器禁止访问资源
     - 例如信息敏感、法律禁止等，
     - 如果服务器友好一点，可以在 body 里详细说明拒绝请求的原因，不过现实中通常都是直接给一个“闭门羹”
   - **404 Not Found**
     - 表示资源在本服务器上未找到，所以无法提供给客户端

   4××里剩下的一些代码较明确地说明了错误的原因，都很好理解，开发中常用的有：

   - **405 Method Not Allowed**
     - 不允许使用某些方法操作资源
     - 例如不允许 POST 只能 GET；
   - 406 Not Acceptable：资源无法满足客户端请求的条件，例如请求中文但只有英文；
   - 408 Request Timeout：请求超时，服务器等待了过长的时间；
   - 409 Conflict：多个请求发生了冲突，可以理解为多线程并发时的竞态；413 Request Entity Too Large：请求报文里的 body 太大；
   - 414 Request-URI Too Long：请求行里的 URI 太大；
   - 429 Too Many Requests：客户端发送了太多的请求，通常是由于服务器的限连策略；
   - 431 Request Header Fields Too Large：请求头某个字段或总体太大；



5. #### 5xx

   5××类状态码表示客户端请求报文正确，但服务器在处理时内部发生了错误，无法返回应有的响应数据，是服务器端的“错误码”。

   - **500 Internal Server Error**

     - 与 400 类似，也是一个通用的错误码
     - 服务器究竟发生了什么错误我们是不知道的

   - **501 Not Implemented**

     - 表示客户端请求的功能还不支持

   - **502 Bad Gateway**

     - 通常是服务器作为网关或者代理时返回的错误码
     - 表示服务器自身工作正常，访问后端服务器时发生了错误

   - **503 Service Unavailable**

     - 表示服务器当前很忙，暂时无法响应服务

     - 503 是一个“临时”的状态，很可能过几秒钟后服务器就不那么忙了，可以继续提供服务

       > 503 响应报文里通常还会有一个“**Retry-After**”字段，指示客户端可以在多久以后再次尝试发送请求。







### 总结

1. 状态码在响应报文里表示了服务器对请求的处理结果；
2. 状态码后的原因短语是简单的文字描述，可以自定义；
3. 状态码是十进制的三位数，分为五类，从 100 到 599；
4. 2××类状态码表示成功，常用的有 200、204、206；
5. 3××类状态码表示重定向，常用的有 301、302、304；
6. 4××类状态码表示客户端错误，常用的有 400、403、404；
7. 5××类状态码表示服务器错误，常用的有 500、501、502、503。




























































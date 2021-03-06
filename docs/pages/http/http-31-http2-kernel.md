# HTTP/2内核解析



1. 连接前言

   > 由于 HTTP/2“事实上”是基于 TLS，所以在正式收发数据之前，会有 TCP 握手和 TLS 握手

   **Magic**

   - TLS 握手成功之后，客户端必须要发送一个“连接前言”（connection preface），用来确认建立 HTTP/2 连接。

     ```bash
     # 纯文本的 ASCII 码格式，请求方法是关键字“PRI”，全文只有 24 个字节：
     PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n
     ```

     

2. 头部压缩

   报文还是由“Header+Body”构成的

   - 必须要用“**HPACK**”算法来压缩头部数据

     - “HPACK”算法是专门为压缩 HTTP 头部定制的算法
     - 客户端和服务器各自维护一份“索引表”，也可以说是“字典”（这有点类似 brotli），压缩和解压缩就是查表和更新表的操作。

   - HTTP/2 废除了原有的起始行概念

     - 伪头字段

       > 把起始行里面的请求方法、URI、状态码等统一转换成了头字段的形式

       - 静态表

       <a data-fancybox title="静态表" href="https://static001.geekbang.org/resource/image/76/0c/769dcf953ddafc4573a0b4c3f0321f0c.png">![静态表](https://static001.geekbang.org/resource/image/76/0c/769dcf953ddafc4573a0b4c3f0321f0c.png)</a>

       - 动态表

         > 随着在 HTTP/2 连接上发送的报文越来越多，两边的“字典”也会越来越丰富，最终每次的头部字段都会变成一两个字节的代码，原来上千字节的头用几十个字节就可以表示了，压缩效果比 gzip 要好得多。

         <a data-fancybox title="动态表" href="https://static001.geekbang.org/resource/image/5f/6f/5fa90e123c68855140e2b40f4f73c56f.png">![动态表](https://static001.geekbang.org/resource/image/5f/6f/5fa90e123c68855140e2b40f4f73c56f.png)</a>

   - 二进制帧

     - 把报文拆成二进制的帧准备发送

       - 帧长度
       - 帧类型
         - 数据帧：HEADERS 帧和 DATA 帧，存放的是 HTTP 报文
         - 控制帧：SETTINGS、PING、PRIORITY 等则是用来管理流的控制帧
       - 标志位
       - 流标志位
         - 从乱序的帧里识别出具有相同流 ID 的帧序列，按顺序组装起来就实现了虚拟的“流”

       <a data-fancybox title="二进制帧格式" href="https://static001.geekbang.org/resource/image/61/e3/615b49f9d13de718a34b9b98359066e3.png">![二进制帧格式](https://static001.geekbang.org/resource/image/61/e3/615b49f9d13de718a34b9b98359066e3.png)</a>



3. 流与多路复用

   **流是二进制帧的双向传输序列**

   在 HTTP/2 连接上，虽然帧是乱序收发的，但只要它们都拥有相同的流 ID，就都属于一个流，而且在这个流里帧不是无序的，而是有着严格的先后顺序。

   HTTP/2 的流有哪些特点？

   1. **流是可并发的，实现“多路复用”；**

   2. 客户端和服务器都可以创建流，双方互不干扰；
   3. **流是双向的；**
   4. **流之间没有固定关系，彼此独立，但流内部的帧是有严格顺序的**；
   5. 流可以设置优先级；
   6. 流 ID 不能重用，只能顺序递增，客户端发起的 ID 是奇数，服务器端发起的 ID 是偶数；
   7. 在流上发送“RST_STREAM”帧可以随时终止流，取消接收或发送；
   8. 第 0 号流比较特殊，不能关闭，也不能发送数据帧，只能发送控制帧，用于流量控制。

   http/2本身默认就会是长连接，所以**永远不需要“Connection”头字段（keepalive 或 close）**



​	**流状态转换**

​		<a data-fancybox title="" href="https://static001.geekbang.org/resource/image/d3/b4/d389ac436d8100406a4a488a69563cb4.png">![](https://static001.geekbang.org/resource/image/d3/b4/d389ac436d8100406a4a488a69563cb4.png)</a>





### 总结

1. HTTP/2 必须先发送一个“连接前言”字符串，然后才能建立正式连接；
2. HTTP/2 废除了起始行，统一使用头字段，在两端维护字段“Key-Value”的索引表，使用“HPACK”算法压缩头部；
3. HTTP/2 把报文切分为多种类型的二进制帧，报头里最重要的字段是流标识符，标记帧属于哪个流；
4. 流是 HTTP/2 虚拟的概念，是帧的双向传输序列，相当于 HTTP/1 里的一次“请求 - 应答”；
5. 在一个 HTTP/2 连接上可以并发多个流，也就是多个“请求 - 响应”报文，这就是“多路复用”。




















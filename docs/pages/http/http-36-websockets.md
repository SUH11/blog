# WebSocket



1. 为什么要有 WebSocket？

   HTTP/2 针对的是“队头阻塞”

    WebSocket 针对的是**“请求 - 应答”**通信模式。

   半双工：请求-应答

   - 双向收发数据，但同一时刻只能一个方向上有动作，传输效率低
   - “被动”通信模式：服务器只能“被动”响应客户端的请求，无法主动向客户端发送数据。

   > 为了克服 HTTP“请求 - 应答”模式的缺点，WebSocket 就“应运而生”了。它原来是 HTML5 的一部分，后来“自立门户”，形成了一个单独的标准，RFC 文档编号是 6455。



2. WebSocket 的特点

   - 全双工：客户端和服务器都可以随时向对方发送数据

   - 二进制帧结构：结束标志位 + 操作码 + 帧长度 + 掩码

     - FIN
     - Opcode
     - MASK
     - Payload len
     - Masking-key

     ![](https://static001.geekbang.org/resource/image/29/c4/29d33e972dda5a27aa4773eea896a8c4.png)

   - 协议名

     - “ws”：明文 WebSocket 协议
     - “wss”：加密的 WebSocket 协议

   - 默认端口：80 和 443



3. WebSocket 的握手

   1. 标准的 HTTP GET 请求

   - 但要带上两个协议升级的专用头字
     - “Connection: Upgrade”，表示要求协议“升级”；
     - “Upgrade: websocket”，表示要“升级”成 WebSocket 协议
   - 为了防止普通的 HTTP 消息被“意外”识别成 WebSocket，握手消息还增加了两个额外的认证用头字段
     - Sec-WebSocket-Key：一个 Base64 编码的 16 字节随机数，作为简单的认证密钥；
     - Sec-WebSocket-Version：协议的版本号，当前必须是 13。

   2. 服务器收到 HTTP 请求报文，看到上面的四个字段，就知道这不是一个普通的 GET 请求，而是 WebSocket 的升级请求，于是就不走普通的 HTTP 处理流程，而是构造一个特殊的“**101 Switching Protocols**”响应报文



### 总结

WebSocket 虽然是在应用层，但使用方式却与“TCP Socket”差不多，过于“原始”，用户必须自己管理连接、缓存、状态，开发上比 HTTP 复杂的多，所以是否要在项目中引入 WebSocket 必须慎重考虑。

1. HTTP 的“请求 - 应答”模式不适合开发“实时通信”应用，效率低，难以实现动态页面，所以出现了 WebSocket；
2. WebSocket 是一个“全双工”的通信协议，相当于对 TCP 做了一层“薄薄的包装”，让它运行在浏览器环境里；
3. WebSocket 使用兼容 HTTP 的 URI 来发现服务，但定义了新的协议名“ws”和“wss”，端口号也沿用了 80 和 443；
4. WebSocket 使用二进制帧，结构比较简单，特殊的地方是有个“掩码”操作，客户端发数据必须掩码，服务器则不用；
5. WebSocket 利用 HTTP 协议实现连接握手，发送 GET 请求要求“协议升级”，握手过程中有个非常简单的认证机制，目的是防止误连接。






























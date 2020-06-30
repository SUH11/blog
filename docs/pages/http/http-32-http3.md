# HTTP/3



1. #### HTTP/2 的“队头阻塞”

   HTTP/2 虽然使用“帧”“流”“多路复用”，没有了“队头阻塞”，但这些手段都是在应用层里，而在下层，也就是 TCP 协议里，还是会发生“队头阻塞”。

   **由于这种“队头阻塞”是 TCP 协议固有的，所以 HTTP/2 即使设计出再多的“花样”也无法解决。**

   解决办法：“**QUIC**”协议，让 HTTP 跑在 QUIC 上而不是 TCP 上。

   <a data-fancybox title="协议栈" href="https://static001.geekbang.org/resource/image/d2/03/d263202e431c84db0fd6c7e6b1980f03.png">![协议栈](https://static001.geekbang.org/resource/image/d2/03/d263202e431c84db0fd6c7e6b1980f03.png)</a>

​	

2. #### QUIC

   下层抽掉TCP，用UDP代替

   在它之上把 TCP 的那一套连接管理、拥塞窗口、流量控制等“搬”了过来，“去其糟粕，取其精华”，打造出了一个全新的可靠传输协议，可以认为是“新时代的 TCP”。

   

   **QUIC特点**

   - 快
     - QUIC 基于 UDP，而 UDP 是“无连接”的，不需要“握手”和“挥手”，所以天生就要比 TCP 快

   - 安全

     - QUIC 全面采用加密通信

   - 使用TSL1.3

     - 0-RTT、1-RTT 连接
     - 但 QUIC 并不是建立在 TLS 之上，而是内部“包含”了 TLS

     

   **QUIC的内部细节**

   - 基本数据传输单位：包、帧

     - 一个包由多个帧组成，包面向的是“连接”，帧面向的是“流”。

   - 使用不透明的“连接 ID”来标记通信的两个端点

     - 解除了 TCP 里连接对“IP 地址 + 端口”（即常说的四元组）的强绑定，支持“连接迁移”（Connection Migration）。

       > 比如你下班回家，手机会自动由 4G 切换到 WiFi。这时 IP 地址会发生变化，TCP 就必须重新建立连接。而 QUIC 连接里的两端连接 ID 不会变，所以连接在“逻辑上”没有中断，它就可以在新的 IP 地址上继续使用之前的连接，消除重连的成本，实现连接的无缝迁移。

       包：

       <a data-fancybox title="" href="https://static001.geekbang.org/resource/image/ae/3b/ae0c482ea0c3b8ebc71924b19feb9b3b.png">![](https://static001.geekbang.org/resource/image/ae/3b/ae0c482ea0c3b8ebc71924b19feb9b3b.png)</a>

     QUIC流：

     <a data-fancybox title="" href="https://static001.geekbang.org/resource/image/9a/10/9ab3858bf918dffafa275c400d78d910.png">![](https://static001.geekbang.org/resource/image/9a/10/9ab3858bf918dffafa275c400d78d910.png)</a>

3. HTTP/3

   因为 QUIC 本身就已经支持了加密、流和多路复用，所以 HTTP/3 的工作减轻了很多，把流控制都交给 QUIC 去做。

   调用的不再是 TLS 的安全接口，也不是 Socket API，而是专门的 QUIC 函数（还没有形成标准）

   HTTP/3没有指定默认的端口号

   



### 总结

1. HTTP/3 基于 QUIC 协议，完全解决了“队头阻塞”问题，弱网环境下的表现会优于 HTTP/2；
2. QUIC 是一个新的传输层协议，建立在 UDP 之上，实现了可靠传输；
3. QUIC 内含了 TLS1.3，只能加密通信，支持 0-RTT 快速建连；
4. QUIC 的连接使用“不透明”的连接 ID，不绑定在“IP 地址 + 端口”上，支持“连接迁移”；
5. QUIC 的流与 HTTP/2 的流很相似，但分为双向流和单向流；
6. HTTP/3 没有指定默认端口号，需要用 HTTP/2 的扩展帧“Alt-Svc”来发现。


















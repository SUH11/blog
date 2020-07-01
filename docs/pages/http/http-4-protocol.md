# 与HTTP相关的各种协议



<a data-fancybox title="" href="https://static001.geekbang.org/resource/image/1e/81/1e7533f765d2ede0abfab73cf6b57781.png">![](https://static001.geekbang.org/resource/image/1e/81/1e7533f765d2ede0abfab73cf6b57781.png)</a>



1. #### TCP/IP

   TCP/IP 协议实际上是一系列网络通信协议的统称，其中最核心的两个协议是 TCP 和 IP，其他的还有 UDP、ICMP、ARP 等等，共同构成了一个复杂但有层次的协议栈。

   - TCP 协议
     - Transmission Control Protocol：“传输控制协议”
     -  属于“传输层”
     - 位于 IP 协议之上，基于 IP 协议提供可靠的、字节流形式的通信，是 HTTP 协议得以实现的基础
   - IP 协议
     - Internet Protocol
     - 属于“网际层”
     - 主要目的是解决寻址和路由问题，以及如何在两点间传送数据包

   HTTP = HTTP over TCP/IP



2. #### DNS

   **域名系统**：用有意义的名字来作为 IP 地址的等价替代

   - 域名用“.”分隔成多个单词
   - 级别从左到右逐级升高，最右边的被称为“顶级域名”

   **域名解析**：想要使用 TCP/IP 协议来通信仍然要使用 IP 地址，所以需要把域名做一个转换，“映射”到它的真实 IP



3. #### URI/URL

   URI（Uniform Resource Identifier），中文名称是 **统一资源标识符**，使用它就能够唯一地标记互联网上资源。

   URL（Uniform Resource Locator）， **统一资源定位符**，也就是我们俗称的“网址”，它实际上是 URI 的一个子集，不过因为这两者几乎是相同的，差异不大，所以通常不会做严格的区分。

   ```bash
   # 协议名：http 
   # 主机名：nginx.org 
   # 路径：/en/download.html
   http://nginx.org/en/download.html
   ```

   - 协议名：即访问该资源应当使用的协议，在这里是“http”；
   - 主机名：即互联网上主机的标记，可以是域名或 IP 地址，在这里是“nginx.org”；
   - 路径：即资源在主机上的位置，使用“/”分隔多级目录，在这里是“/en/download.html”。



4. #### HTTPS

   HTTP = HTTP over SSL/TLS

   SSL/TLS：负责加密通信的安全协议，建立在 TCP/IP 之上，所以也是个可靠的传输协议，可以被用作 HTTP 的下层



5. #### 代理

   代理（Proxy）是 HTTP 协议中请求方和应答方中间的一个环节，作为“中转站”，**既可以转发客户端的请求，也可以转发服务器的应答**。

   - 匿名代理：完全“隐匿”了被代理的机器，外界看到的只是代理服务器；
   - 透明代理：顾名思义，它在传输过程中是“透明开放”的，外界既知道代理，也知道客户端；
   - 正向代理：靠近客户端，代表客户端向服务器发送请求；
   - 反向代理：靠近服务器端，代表服务器响应客户端的请求；

   **CDN也是一种代理**：

   - 负载均衡：把访问请求均匀分散到多台机器，实现访问集群化；
   - 内容缓存：暂存上下行的数据，减轻后端的压力；
   - 安全防护：隐匿 IP, 使用 WAF 等工具抵御网络攻击，保护被代理的机器；
   - 数据处理：提供压缩、加密等额外的功能。



### 总结

1. TCP/IP 是网络世界最常用的协议，HTTP 通常运行在 TCP/IP 提供的可靠传输基础上；
2. DNS 域名是 IP 地址的等价替代，需要用域名解析实现到 IP 地址的映射；
3. URI 是用来标记互联网上资源的一个名字，由“协议名 + 主机名 + 路径”构成，俗称 URL；
4. HTTPS 相当于“HTTP+SSL/TLS+TCP/IP”，为 HTTP 套了一个安全的外壳；
5. 代理是 HTTP 传输过程中的“中转站”，可以实现缓存加速、负载均衡等功能。






























# HTTP有哪些特点？



特点

首先， HTTP 协议是一个“灵活可扩展”的传输协议

第二个特点， HTTP 协议是一个“可靠”的传输协议。

第三个特点，HTTP 协议是一个应用层的协议。

第四个特点，HTTP 协议使用的是请求 - 应答通信模式。

第五个特点，HTTP 协议是无状态的。



1. HTTP 是灵活可扩展的，可以任意添加头字段实现任意功能；
2. HTTP 是可靠传输协议，基于 TCP/IP 协议“尽量”保证数据的送达；
3. HTTP 是应用层协议，比 FTP、SSH 等更通用功能更多，能够传输任意数据；
4. HTTP 使用了请求 - 应答模式，客户端主动发起请求，服务器被动回复请求；
5. HTTP 本质上是无状态的，每个请求都是互相独立、毫无关联的，协议不要求客户端或服务器记录请求相关的信息。





1. 简单、灵活、易于扩展”



2. 应用广泛、环境成熟



3. 无状态

   “双刃剑”

   好处：



4. 明文传输



5. 不安全



6. 性能

   不算差，不够好





1. HTTP 最大的优点是简单、灵活和易于扩展；
2. HTTP 拥有成熟的软硬件环境，应用的非常广泛，是互联网的基础设施；
3. HTTP 是无状态的，可以轻松实现集群化，扩展性能，但有时也需要用 Cookie 技术来实现“有状态”；
4. HTTP 是明文传输，数据完全肉眼可见，能够方便地研究分析，但也容易被窃听；
5. HTTP 是不安全的，无法验证通信双方的身份，也不能判断报文是否被窜改；
6. HTTP 的性能不算差，但不完全适应现在的互联网，还有很大的提升空间。






















































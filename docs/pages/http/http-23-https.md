# HTTPS - 1





1. #### 为什么要有 HTTPS？

   因为http不安全，天生“明文”，整个传输过程完全透明，任何人都能够在链路中截获、修改或者伪造请求 / 响应报文，数据不具有可信性。



2. #### 什么是安全？

   **机密性**（Secrecy/Confidentiality）是指对数据的“保密”，只能由可信的人访问，对其他人是不可见的“秘密”

   **完整性**（Integrity，也叫一致性）是指数据在传输过程中没有被篡改

   **身份认证**（Authentication）是指确认对方的真实身份，也就是“证明你真的是你”，保证消息只能发送给可信的人。

   **不可否认**（Non-repudiation/Undeniable），意思是不能否认已经发生过的行为



3. #### 什么是https？

   - 默认端口443
   - 语义上和 HTTP 完全一样，优缺点也“照单全收”（当然要除去“明文”和“不安全”）
     - http = HTTP over TCP/IP	
     - https = HTTPS over SSL/TLS

   **SSL/TLS**

   - SSL 即安全套接层（Secure Sockets Layer），在 OSI 模型中处于第 5 层（会话层）

   - TLS1.0 实际上就是 SSLv3.1
     - 目前应用最广泛的是TLS1.2（2008）
     - TLS 由`记录协议`、`握手协议`、`警告协议`、`变更密码规范协议`、`扩展协议`等几个子协议组成，综合使用了`对称加密`、`非对称加密`、`身份认证`等许多密码学前沿技术。

   例子

   <a data-fancybox title="" href="https://static001.geekbang.org/resource/image/5e/24/5ead57e03f127ea8f244d715186adb24.png">![](https://static001.geekbang.org/resource/image/5e/24/5ead57e03f127ea8f244d715186adb24.png)</a>

   > TLS 是 1.2
   >
   > 密码套件：ECDHE-RSA-AES256-GCM-SHA384
   >
   > ​				   密钥交换算法 + 签名算法 + 对称加密算法 + 摘要算法
   >
   > ​					“握手时使用 ECDHE 算法进行密钥交换，用 RSA 签名和身份认证，握手后的通信使用 AES 对称算法，密钥长度 256 位，分组模式是 GCM，摘要算法 SHA384 用于消息认证和产生随机数。”

   **OpenSSL**

   - 著名的开源密码学程序库和工具包，
     - 几乎支持所有公开的加密算法和协议，已经成为了事实上的标准，
     - 许多应用软件都会使用它作为底层库来实现 TLS 功能，包括常用的 Web 服务器 Apache、Nginx 等。

   - OpenSSL 是从另一个开源库 SSLeay 发展出来的
     - 目前有三个主要的分支：1.02（不维护） 	1.1.0（不维护）	1.1.1







### 总结

1.  因为 HTTP 是明文传输，所以不安全，容易被黑客窃听或篡改；
2.  通信安全必须同时具备机密性、完整性、身份认证和不可否认这四个特性；
3.  HTTPS 的语法、语义仍然是 HTTP，但把下层的协议由 TCP/IP 换成了 SSL/TLS；
4.  SSL/TLS 是信息安全领域中的权威标准，采用多种先进的加密技术保证通信安全；
5.  OpenSSL 是著名的开源密码学工具包，是 SSL/TLS 的具体实现。


















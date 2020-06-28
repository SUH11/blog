# HTTPS4 - TLS1.2



1. ###### https建立连接

   按回车：浏览器首先要从 URI 里提取出协议名和域名

   > https：443、DNS解析 ===>得到IP地址===>三次握手

   http：建立连接后，浏览器会立即发送请求报文

   https：它需要再用另外一个“握手”过程，在 TCP 上建立安全连接，之后才是收发 HTTP 报文。



2. ###### TLS协议组成

   子协议：

   - **记录协议**
     - 规定了 TLS 收发数据的基本单位：记录
   - **警报协议**
     - 向对方发出警报信息，有点像是 HTTP 协议里的状态码
     - 收到警报后另一方可以选择继续，也可以立即终止连接
   - **握手协议**
     - 浏览器和服务器会在握手过程中协商 TLS 版本号、随机数、密码套件等信息，然后交换证书和密钥参数，最终双方协商得到会话密钥，用于后续的混合加密系统。
   - **变更密码规范协议**
     - 它非常简单，就是一个“通知”，告诉对方，后续的数据都将使用加密保护
     - 那么反过来，在它之前，数据都是明文的。

   ![https://static001.geekbang.org/resource/image/69/6c/69493b53f1b1d540acf886ebf021a26c.png](https://static001.geekbang.org/resource/image/69/6c/69493b53f1b1d540acf886ebf021a26c.png)

   ![TLS过程](https://static001.geekbang.org/resource/image/9c/1e/9caba6d4b527052bbe7168ed4013011e.png)

   client								server

   -----------------1---------------->

   1.Client Hello ：客户端的版本号、支持的密码套件，还有一个**随机数C**（用于后续生成会话密钥）

   ```
   Handshake Protocol: Client Hello
       Version: TLS 1.2 (0x0303) // 1. 客户端的版本号
       Random: 1cbf803321fd2623408dfe… // 2. 随机数
       Cipher Suites (17 suites) // 3. 支持的密码套件
           Cipher Suite: TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256 (0xc02f)
           Cipher Suite: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (0xc030)
   ```

   <----------------2-----------------

   2.Server Hello：**随机数S，确认TLS版本号、使用的密码套件**（ECDHE）

   ```javascript
   Handshake Protocol: Server Hello
       Version: TLS 1.2 (0x0303) // 1. 版本号
       Random: 0e6320f21bae50842e96… // 2. 随机数
       Cipher Suite: TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 (0xc030) // 3. 密码套件(从客户端支持的密码套件中选)
   ```

   <----------------3-----------------

   3.Server Key Exchange：里面是**椭圆曲线的公钥**（Server Params），用来实现密钥交换算法，再加上自己的私钥签名认证。

   ```
   Handshake Protocol: Server Key Exchange
       EC Diffie-Hellman Server Params
           Curve Type: named_curve (0x03)
           Named Curve: x25519 (0x001d)
           Pubkey: 3b39deaf00217894e...
           Signature Algorithm: rsa_pkcs1_sha512 (0x0601)
           Signature: 37141adac38ea4...
   ```

   <----------------4-----------------

   4.Server Hello Done

   这样第一个消息往返就结束了（两个 TCP 包），结果是客户端和服务器通过明文共享了三个信息：**Client Random**、**Server Random** 和 **Server Params**。

​		

​		----------------5----------------->

​		5.Client Key Exchange: 客户端按照密码套件的要求，也生成一个椭圆曲线的公钥

		Handshake Protocol: Client Key Exchange
	EC Diffie-Hellman Client Params
	    Pubkey: 8c674d0e08dc27b5eaa…
​		目前：server ====>客户端的公钥

​					client =====>服务端的公钥

​		算出了：**Pre-Master**（也就是一个随机数）

​		现在：**Client Random、Server Random 和 Pre-Master**

​	

​		----------------6----------------->

​		6.Change Cipher Spec：之后该用会话密钥加密通信

​		----------------7----------------->

​		7.Finished：所有握手数据的摘要

> ​		服务器也是同样的操作，发“Change Cipher Spec”和“Finished”消息，双方都验证加密解密 OK，握手正式结束，后面就收发被加密的 HTTP 请求和响应了。

​		----------------8----------------->

​		8.Change Cipher Spec：之后该用会话密钥加密通信

​		----------------9----------------->

​		9.Finished：所有握手数据的摘要

​		



### 总结

1. HTTPS 协议会先与服务器执行 TCP 握手，然后执行 TLS 握手，才能建立安全连接；
2. 握手的目标是安全地交换对称密钥，需要三个随机数，第三个随机数“Pre-Master”必须加密传输，绝对不能让黑客破解；
3. “Hello”消息交换随机数，“Key Exchange”消息交换“Pre-Master”；
4. “Change Cipher Spec”之前传输的都是明文，之后都是对称密钥加密的密文。




































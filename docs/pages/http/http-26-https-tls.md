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




















































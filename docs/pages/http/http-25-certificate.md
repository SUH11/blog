# HTTPS-3-数字签名和证书



加密算法不能解决的问题：

	1.  **通过窃听收集到足够多的密文**，再尝试着修改、重组后发给网站。因为没有完整性保证，服务器只能“照单全收”，然后他就可以通过服务器的响应获取进一步的线索，最终就会破解出明文
 	2.  黑客也可以伪造身份发布公钥。如果你拿到了假的公钥，混合加密就完全失效了





1. #### 摘要算法

   实现**完整性**：也就是常说的**散列函数**、**哈希函数**

   > 1. 实际上是把数据从一个“大空间”映射到了“小空间”，所以就存在“冲突”（collision，也叫碰撞）的可能性
   >
   > 2. TLS 用来生成伪随机数
   >
   >    TLS 推荐使用的是 SHA-1 的后继者：SHA-2

   **完整性：**摘要算法保证了“数字摘要”和原文是完全等价的。所以，我们只要在原文后附上它的摘要，就能够保证数据的完整性。

   > 不过摘要算法不具有机密性，如果明文传输，那么黑客可以修改消息后把摘要也一起改了，网站还是鉴别不出完整性。

   

2. #### 数字签名

   私钥 + 摘要算法 = 数字签名

   加密算法结合摘要算法，我们的通信过程可以说是比较安全了。但这里还有漏洞，就是**通信的两个端点**（endpoint）。

   非对称加密里的“私钥”，使用私钥再加上摘要算法，就能够实现“数字签名”，同时实现“身份认证”和“不可否认”

   > 例子：
   >
   > ​	比如，你用自己的私钥签名一个消息“我是小明”。网站收到后用你的公钥验签，确认身份没问题，于是也用它的私钥签名消息“我是某宝”。你收到后再用它的公钥验一下，也没问题，这样你和网站就都知道对方不是假冒的，后面就可以用混合加密进行安全通信了。

​	

3. #### 数字证书和CA

   “**公钥的信任**”问题

   找一个公认的可信第三方，让它作为“信任的起点，递归的终点”，构建起公钥的信任链 ——CA

   - CA：对公钥的签名认证 = 包含序列号、用途、颁发者、有效时间

   - CA有哪些

     - 免费的：Let’s Encrypt
     - 收费的：DigiCert、VeriSign、Entrust

   - 证书分 DV、OV、EV 三种

     - DV最低 EV最高

     - CA 怎么证明自己呢？

       > 小一点的 CA 可以让大 CA 签名认证，但链条的最后，也就是 Root CA，就只能自己证明自己了，这个就叫“自签名证书”（Self-Signed Certificate）或者“根证书”（Root Certificate）

     <a data-fancybox title="https://static001.geekbang.org/resource/image/8f/9c/8f0813e9555ba1a40bd2170734aced9c.png" href="https://static001.geekbang.org/resource/image/8f/9c/8f0813e9555ba1a40bd2170734aced9c.png">![https://static001.geekbang.org/resource/image/8f/9c/8f0813e9555ba1a40bd2170734aced9c.png](https://static001.geekbang.org/resource/image/8f/9c/8f0813e9555ba1a40bd2170734aced9c.png)</a>

   上网的时候只要服务器发过来它的证书，就可以验证证书里的签名，顺着证书链（Certificate Chain）一层层地验证，直到找到根证书，就能够确定证书是可信的，从而里面的公钥也是可信的。



4. #### 证书体系的弱点

   - 如果 CA 失误或者被欺骗，签发了错误的证书，虽然证书是真的，可它代表的网站却是假的。
   - CA 被黑客攻陷，或者 CA 有恶意，因为它（即根证书）是信任的源头，整个信任链里的所有证书也就都不可信了。

   **解决办法**

   - 证书吊销列表
   - 在线证书状态协议



### 总结

1. 摘要算法用来实现完整性，能够为数据生成独一无二的“指纹”，常用的算法是 SHA-2；
2. 数字签名是私钥对摘要的加密，可以由公钥解密后验证，实现身份认证和不可否认；
3. 公钥的分发需要使用数字证书，必须由 CA 的信任链来验证，否则就是不可信的；
4. 作为信任链的源头 CA 有时也会不可信，解决办法有 CRL、OCSP，还有终止信任。





























































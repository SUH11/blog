# TLS1.3特性



TLS1.3 的三个主要改进目标：**兼容**、**安全**与**性能**。



1. #### 最大化兼容

   原因：由于 1.1、1.2 等协议已经出现了很多年，很多应用软件、中间代理（官方称为“MiddleBox”）只认老的记录协议格式，更新改造很困难，甚至是不可行（设备僵化）。

   解决办法：保持现有的记录格式不变，通过“伪装”来实现兼容，使得 TLS1.3 看上去“像是”TLS1.2。

   **扩展协议**

   - “Hello”消息后面就必须有“`supported_versions`”扩展



2. #### 强化安全

   - 减肥瘦身
     - 明确禁止在记录协议里使用压缩；
     - 废除了 RC4、DES 对称加密算法；
     - 废除了 ECB、CBC 等传统分组模式；
     - 废除了 MD5、SHA1、SHA-224 摘要算法；
     - 废除了 RSA、DH 密钥交换算法和许多命名曲线

   - 只保留部分
     - 保留 AES、ChaCha20 对称加密算法；
     - 分组模式只能用 AEAD 的 GCM、CCM 和 Poly1305；
     - 摘要算法只能用 SHA256、SHA384；
     - 密钥交换算法只有 ECDHE 和 DHE；
     - 椭圆曲线也被“砍”到只剩 P-256 和 x25519 等 5 种

   好处：原来众多的算法、参数组合导致密码套件非常复杂，难以选择，而现在的 TLS1.3 里只有 5 个套件，无论是客户端还是服务器都不会再犯“选择困难症”了



3. #### 提升性能

   - TLS1.3 压缩了以前的“Hello”协商过程
   - 删除了“Key Exchange”消息

   由2RTT --->1RTT

   TLS1.3:

   <a data-fancybox title="TLS1.3握手" href="https://static001.geekbang.org/resource/image/4d/b0/4d1df4d07dbb1c2500fc4ea69ecf7ab0.png">![TLS1.3握手](https://static001.geekbang.org/resource/image/4d/b0/4d1df4d07dbb1c2500fc4ea69ecf7ab0.png)</a>

   TLS1.2:

   <a data-fancybox title="TLS1.2握手" href="https://static001.geekbang.org/resource/image/69/6c/69493b53f1b1d540acf886ebf021a26c.png">![TLS1.2握手](https://static001.geekbang.org/resource/image/69/6c/69493b53f1b1d540acf886ebf021a26c.png)</a>

3. #### 握手分析

   <a data-fancybox title="TLS1.3" href="https://static001.geekbang.org/resource/image/7a/db/7a2bc39fdbb421cf72a01e887e9156db.png">![TLS1.3](https://static001.geekbang.org/resource/image/7a/db/7a2bc39fdbb421cf72a01e887e9156db.png)</a>

   ----------1---------->

   1.Client Hello

   - TLS Version
   - Client Random（随机数）
   - Cipher Suites(密码套件)
   - **supperoted_versions**
   - **supported_groups**
   - **signature_algorithms**
   - **key_share**
   - **pre_shared_key**
   - **early_data**
     - 可以直接发送数据

   <----------2----------

   2.Server Hello

   - TLS Version
   - Server Random
   - Cipher Suite(ECDHE)
   - supperted_versions
   - key_share
   - ChangeCipherSpec
     - 在算出主密钥后，服务器立刻发出“Change Cipher Spec”消息，比 TLS1.2 提早进入加密通信
   - Encrypted Extensions
   - Certificate
   - Certificate Verify
     - 用服务器的私钥把前面的曲线、套件、参数等握手数据加了签名
   - Finished

   这时只交换了两条消息，客户端和服务器就拿到了四个共享信息：**Client Random** 和 **Server Random**、**Client Params** 和 **Server Params**，两边就可以各自用 ECDHE 算出“**Pre-Master**”，再用 HKDF 生成主密钥“**Master Secret**”

   ----------3---------->

   2.ChangeCipherSpec、Finished





### 总结

1. 为了兼容 1.1、1.2 等“老”协议，TLS1.3 会“**伪装**”成 TLS1.2，新特性在“扩展”(**supported_versions**)里实现；
2. 1.1、1.2 在实践中发现了很多安全隐患，所以 TLS1.3 大幅度删减了加密算法，只保留了 **ECDHE**、**AES**、**ChaCha20**、**SHA-2** 等极少数算法，强化了安全；
3. TLS1.3 也简化了握手过程，完全握手只需要一个消息往返**1RTT**，提升了性能。




































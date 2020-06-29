# 我应该迁移到HTTPS吗？



1. 迁移的必要性

   - 移动开发建议迁移
     - Apple、Android、某信等开发平台在 2017 年就相继发出通知，要求所有的应用必须使用 HTTPS 连接，禁止不安全的 HTTP。

   - “迁移到 HTTPS”已经不是“要不要做”的问题，而是“要怎么做”的问题了



2. 迁移的顾虑
   - 慢
     - 惯性思维：HTTPS 会增加服务器的成本，增加客户端的时延，影响用户体验。
     - 其实现在服务器和客户端的运算能力都已经有了很大的提升，性能方面完全没有担心的必要，而且还可以应用很多的优化解决方案
     - 在经过适当优化之后，HTTPS 的额外 CPU 成本小于 1%，额外的网络成本小于 2%
   - 贵
     - 免费证书的 CA：其中最著名的是“Let’s Encrypt”
   - 难
     - HTTPS 涉及的知识点太多、太复杂，有一定的技术门槛，不能很快上手。



3. 申请证书

   **Let’s Encrypt**

   - 申请证书时应当同时申请 **RSA** 和 **ECDSA** 两种证书
     - 在 Nginx 里配置成双证书验证，这样服务器可以自动选择快速的椭圆曲线证书，同时也兼容只支持 RSA 的客户端

   - 如果申请 RSA 证书，私钥至少要 2048 位，摘要算法应该选用 SHA-2
     - SHA256、SHA384 
   - “Let’s Encrypt”证书的有效期很短，只有 90 天，时间一到就会过期失效，所以必须要定期更新。



4. 配置 HTTPS

   Nginx

   ```nginx
   listen                443 ssl; 
   
   ssl_certificate       xxx_rsa.crt;  #rsa2048 cert
   ssl_certificate_key   xxx_rsa.key;  #rsa2048 private key
   
   ssl_certificate       xxx_ecc.crt;  #ecdsa cert
   ssl_certificate_key   xxx_ecc.key;  #ecdsa private ke
   
   # 1.强制 Nginx 只支持 TLS1.2 以上的协议，打开“Session Ticket”会话复用
   ssl_protocols               TLSv1.2 TLSv1.3;
   
   ssl_session_timeout         5m;
   ssl_session_tickets         on;
   ssl_session_ticket_key      ticket.key;
   
   # 2.密码套件的选择方面，建议是以服务器的套件优先。这样可以避免恶意客户端故意选择较弱的套件、降低安全等级，然后密码套件向 TLS1.3“看齐”，只使用 ECDHE、AES 和 ChaCha20，支持“False Start”。
   ssl_prefer_server_ciphers   on;
   
   
   ssl_ciphers   ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-CHACHA20-POLY1305:ECDHE+AES128:!MD5:!SHA1;
   ```

   配置完成，可以访问[SSLLabs](https://www.ssllabs.com/)测试网站的安全程度，它会模拟多种客户端发起测试，打出一个综合的评分。



5. 重定向跳转

   把不安全的 HTTP 网址用 301 或 302“重定向”到新的 HTTPS 网站，这在 Nginx 里也很容易做到，使用“return”或“rewrite”都可以。

   ```nginx
   return 301 https://$host$request_uri;             #永久重定向
   rewrite ^  https://$host$request_uri permanent;   #永久重定向
   ```

   但这种方式有两个问题。一个是重定向增加了网络成本，多出了一次请求；另一个是存在安全隐患，重定向的响应可能会被“中间人”窜改，实现“会话劫持”，跳转到恶意网站。

   不过有一种叫**“HSTS”**（HTTP 严格传输安全，HTTP Strict Transport Security）的技术可以消除这种安全隐患。HTTPS 服务器需要在发出的响应头里添加一个“Strict-Transport-Security”的字段，再设定一个有效期，例如：

   ```nginx
   Strict-Transport-Security: max-age=15768000; includeSubDomains
   ```

   这相当于告诉浏览器：我这个网站必须严格使用 HTTPS 协议，在半年之内（182.5 天）都不允许用 HTTP，你以后就自己做转换吧，不要再来麻烦我了。

   > Chrome 浏览器只会在第一次连接时使用 HTTP 协议，之后就会都走 HTTPS 协议
   >
   > 有了“HSTS”的指示，以后浏览器再访问同样的域名的时候就会自动把 URI 里的“http”改成“https”，直接访问安全的 HTTPS 网站。这样“中间人”就失去了攻击的机会，而且对于客户端来说也免去了一次跳转，加快了连接速度。





### 总结

1. 从 HTTP 迁移到 HTTPS 是“大势所趋”，能做就应该尽早做；
2. 升级 HTTPS 首先要申请数字证书，可以选择免费好用的“Let’s Encrypt”；
3. 配置 HTTPS 时需要注意选择恰当的 TLS 版本和密码套件，强化安全；
4. 原有的 HTTP 站点可以保留作为过渡，使用 301 重定向到 HTTPS。


























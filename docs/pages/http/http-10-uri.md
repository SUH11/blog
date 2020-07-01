# 网址是什么



uri：统一资源标识符

url：统一资源定位符

uri = url + urn



1. #### URI的格式

   <a data-fancybox title="" href="https://static001.geekbang.org/resource/image/46/2a/46581d7e1058558d8e12c1bf37d30d2a.png">![](https://static001.geekbang.org/resource/image/46/2a/46581d7e1058558d8e12c1bf37d30d2a.png)</a>

   <a data-fancybox title="" href="https://static001.geekbang.org/resource/image/ff/38/ff41d020c7a27d1e8191057f0e658b38.png">![](https://static001.geekbang.org/resource/image/ff/38/ff41d020c7a27d1e8191057f0e658b38.png)</a>

   - scheme: 协议名
   - 身份信息“user:passwd@”
     - 不推荐使用了
   - 主机名：host+port
   - path：标记资源所在位置
     - /开头
   - query
   - fragment

2. #### 转义

   非 ASCII 码或特殊字符转换成十六进制字节值，然后前面再加上一个“%”。

   > 例如，空格被转义成“%20”，“?”被转义成“%3F”。而中文、日文等则通常使用 UTF-8 编码后再转义，例如“银河”会被转义成“%E9%93%B6%E6%B2%B3”。





### 总结

1. URI 是用来唯一标记服务器上资源的一个字符串，通常也称为 URL；
2. URI 通常由 scheme、host:port、path 和 query 四个部分组成，有的可以省略；
3. scheme 叫“方案名”或者“协议名”，表示资源应该使用哪种协议来访问；
4. “host:port”表示资源所在的主机名和端口号；
5. path 标记资源所在的位置；
6. query 表示对资源附加的额外要求；
7. 在 URI 里对“@&/”等特殊字符和汉字必须要做编码，否则服务器收到 HTTP 报文后会无法正确处理。




















































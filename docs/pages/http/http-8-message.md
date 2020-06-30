# 报文



1. TCP报文

   ![](https://static001.geekbang.org/resource/image/17/95/174bb72bad50127ac84427a72327f095.png)



2. HTTP报文

   ![](https://static001.geekbang.org/resource/image/62/3c/62e061618977565c22c2cf09930e1d3c.png)

   HTTP 协议的请求报文和响应报文的结构基本相同，由三大部分组成：

   - 起始行（start line）：描述请求或响应的基本信息；
   - 头部字段集合（header）：使用 key-value 形式更详细地说明报文；
   - 消息正文（entity）：实际传输的数据，它不一定是纯文本，可以是图片、视频等二进制数据。

    ![](https://static001.geekbang.org/resource/image/b1/df/b191c8760c8ad33acd9bb005b251a2df.png)

   请求行 + 头部(header) + 空行 + 实体(body)



3. 起始行

   - 请求：请求行

     ![](https://static001.geekbang.org/resource/image/36/b9/36108959084392065f36dff3e12967b9.png)

     ```
     # Method: GET URI: / Version: HTTP/1.1
     GET / HTTP/1.1
     ```

   - 响应：状态行

     ![](https://static001.geekbang.org/resource/image/a1/00/a1477b903cd4d5a69686683c0dbc3300.png)

     ```
     # Version: HTTP/1.1 StatusCode: 200 Reason: OK
     HTTP/1.1 200 OK
     
     HTTP/1.1 404 Not Found
     ```



4. 头部字段

   请求头或响应头

   ![](https://static001.geekbang.org/resource/image/1f/ea/1fe4c1121c50abcf571cebd677a8bdea.png)

   ![](https://static001.geekbang.org/resource/image/cb/75/cb0d1d2c56400fe9c9988ee32842b175.png)

   使用头字段需要注意下面几点：

   1. 字段名不区分大小写
      - 例如“Host”也可以写成“host”，但首字母大写的可读性更好；
   2. 字段名里不允许出现空格，可以使用连字符“-”，但不能使用下划线“_”。
      - 例如，“test-name”是合法的字段名，而“test name”“test_name”是不正确的字段名；
   3. 字段名后面必须紧接着“:”，不能有空格，而“:”后的字段值前可以有多个空格；
   4. 字段的顺序是没有意义的，可以任意排列不影响语义；
   5. 字段原则上不能重复，除非这个字段本身的语义允许
      - 例如 Set-Cookie。

   常用头字段

   - **通用字段**：在请求头和响应头里都可以出现；
     - Date：通常出现在响应头里，表示 HTTP 报文创建的时间，使用这个时间再搭配其他字段决定缓存策略
   - **请求字段**：仅能出现在请求头里，进一步说明请求信息或者额外的附加条件；
     - Host字段：只能出现在请求头里，它同时也是唯一一个要求必须出现的字段
     - User-Agent：只出现在请求头里，使用一个字符串来描述发起 HTTP 请求的客户端
   - **响应字段**：仅能出现在响应头里，补充说明响应报文的信息；
     - Server：只能出现在响应头，告诉客户端当前正在提供 Web 服务的软件名称和版本号
   - **实体字段**：它实际上属于通用字段，但专门描述 body 的额外信息。
     - Content-Length：body的长度，





### 总结

1. HTTP 报文结构就像是“大头儿子”，由“起始行 + 头部 + 空行 + 实体”组成，简单地说就是“header+body”；
2. HTTP 报文可以没有 body，但必须要有 header，而且 header 后也必须要有空行，形象地说就是“大头”必须要带着“脖子”；
3. 请求头由“请求行 + 头部字段”构成，响应头由“状态行 + 头部字段”构成；
4. 请求行有三部分：请求方法，请求目标和版本号；状态行也有三部分：版本号，状态码和原因字符串；
5. 头部字段是 key-value 的形式，用“:”分隔，不区分大小写，顺序任意，除了规定的标准头，也可以任意添加自定义字段，实现功能扩展；
6. HTTP/1.1 里唯一要求必须提供的头字段是 Host，它必须出现在请求头里，标记虚拟主机名。




























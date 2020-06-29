# http的实体数据



1. #### 数据类型与编码

   多用途互联网邮件拓展：Multipurpose Internet Mail Extendsions

   MIME type:

   ​	type/subtype

   - text : text/html, text/css, text/plain
   - image
   - audio/video
   - application

   Encoding type:

   - gizp
   - deflate
   - br	

   

2. #### 数据类型使用的头字段

   内容协商：客户端用 `Accept` 头告诉服务器希望接收什么样的数据，而服务器用 `Content` 头告诉客户端实际发送了什么样的数据

```javascript
// 也就是MIME type
Accept: text/html,application/xml,image/webp,image/png
```

<a data-fancybox title="image-20200622102431305" href="https://raw.githubusercontent.com/SUH11/images/master/http/15-1.png">![image-20200622102431305](https://raw.githubusercontent.com/SUH11/images/master/http/15-1.png)</a>

- **Accept** 字段标记的是客户端可理解的 MIME type

- **Content-Type** 告诉实体数据的真实类型

- **Accept-Encoding** 字段标记的是客户端支持的压缩格式

- **Content-Encoding** 服务器实际使用的压缩格式放在响应头字段

- **Accept-Language** 字段标记了客户端可理解的自然语言

- **Content-Language** 服务器告诉客户端实体数据使用的实际语言类型

> 字符集在 HTTP 里使用的请求头字段是 Accept-Charset
>
> 但响应头里却没有对应的 Content-Charset，而是在 Content-Type 字段的数据类型后面用“charset=xxx”来表示

注意：`Content-Type`是实体字段，也是通用字段，请求和响应都可以用。

3. 内容协商的质量值

   q：权重的最大值是 1，最小值是 0.01，默认值是 1，如果值是 0 就表示拒绝。

```
Accept: text/html,application/xml;q=0.9,*/*;q=0.8
```



4. #### 内容协商的结果

内容协商的过程是不透明的，每个 Web 服务器使用的算法都不一样

Vary字段：表示服务器依据了 Accept-Encoding、User-Agent 和 Accept 这三个头字段，然后决定了发回的响应报文。

```
Vary: Accept-Encoding,User-Agent,Accept
```



### 总结

1. 数据类型表示实体数据的内容是什么，使用的是 MIME type，相关的头字段是 Accept 和 Content-Type；
2. 数据编码表示实体数据的压缩方式，相关的头字段是 Accept-Encoding 和 Content-Encoding；
3. 语言类型表示实体数据的自然语言，相关的头字段是 Accept-Language 和 Content-Language；
4. 字符集表示实体数据的编码方式，相关的头字段是 Accept-Charset 和 Content-Type；
5. 客户端需要在请求头里使用 Accept 等头字段与服务器进行“内容协商”，要求服务器返回最合适的数据；
6. Accept 等头字段可以用“,”顺序列出多个可能的选项，还可以用“;q=”参数来精确指定权重。






























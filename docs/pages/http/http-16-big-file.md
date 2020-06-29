# HTTP传输大文件的方法



1. #### 数据压缩

   Accept-Encoding

   Content-Encoding

> gzip 等压缩算法通常只对文本文件有较好的压缩率，而图片、音频视频等多媒体数据本身就已经是高度压缩的，再用 gzip 处理也不会变小（甚至还有可能会增大一点），所以它就失效了。



2. #### 分块传输

   Transfer-Encoding: chunked

   ![image-20200622104747418](/Users/su/Library/Application Support/typora-user-images/image-20200622104747418.png)



3. #### 范围请求

   允许客户端在请求头里使用专用字段来表示只获取文件的一部分，相当于是客户端的“化整为零”

   服务器：Accept-Ranges: bytes

   `Range` 的格式也很灵活，起点 x 和终点 y 可以省略，能够很方便地表示正数或者倒数的范围。假设文件是 100 个字节，那么：

   - “0-”表示从文档起点到文档终点，相当于“0-99”，即整个文件；
   - “10-”是从第 10 个字节开始到文档末尾，相当于“10-99”；
   - “-1”是文档的最后一个字节，相当于“99-99”；
   - “-10”是从文档末尾倒数 10 个字节，相当于“90-99”。

   服务器收到 `Range` 字段后，需要做四件事

   ​	第一，它必须检查范围是否合法，不合法：416

   ​	第二，如果范围正确，206 Partial Content (相当于200)

   ​	第三，服务器要添加响应字段：Content-Range 

   ​	第四，发送数据

例子：

```
// 请求
GET /16-2 HTTP/1.1
Host: www.chrono.com
Range: bytes=0-31

// 返回
HTTP/1.1 206 Partial Content
Content-Length: 32
Accept-Ranges: bytes
Content-Range: bytes 0-31/96
```

注：

看视频的拖拽进度需要范围请求，常用的下载工具里的多段下载、断点续传也是基于它实现的，要点是：

- 先发个 HEAD，看服务器是否支持范围请求，同时获取文件的大小；
- 开 N 个线程，每个线程使用 Range 字段划分出各自负责下载的片段，发请求传输数据；
- 下载意外中断也不怕，不必重头再来一遍，只要根据上次的下载记录，用 Range 请求剩下的那一部分就可以了。

Range针对的是原数据



4. #### 多段数据

   范围请求一次只获取一个片段，其实它还支持在 Range 头里使用多个“x-y”，一次性获取多个片段数据。

   MIME 类型：`multipart/byteranges`

![image-20200622110844685](https://raw.githubusercontent.com/SUH11/images/master/http/16-1.png)

例子：

```html
// 请求
GET /16-2 HTTP/1.1
Host: www.chrono.com
Range: bytes=0-9, 20-29

// 响应
HTTP/1.1 206 Partial Content
Content-Type: multipart/byteranges; boundary=00000000001
Content-Length: 189
Connection: keep-alive
Accept-Ranges: bytes

--00000000001
Content-Type: text/plain
Content-Range: bytes 0-9/96

// this is
--00000000001
Content-Type: text/plain
Content-Range: bytes 20-29/96

ext json d
--00000000001--
```

要注意这四种方法不是互斥的，而是可以混合起来使用



### 总结

1. 压缩 HTML 等文本文件是传输大文件最基本的方法；
2. 分块传输可以流式收发数据，节约内存和带宽，使用响应头字段“Transfer-Encoding: chunked”来表示，分块的格式是 16 进制长度头 + 数据块；
3. 范围请求可以只获取部分数据，即“分块请求”，实现视频拖拽或者断点续传，使用请求头字段“Range”和响应头字段“Content-Range”，响应状态码必须是 206；
4. 也可以一次请求多个范围，这时候响应报文的数据类型是“multipart/byteranges”，body 里的多个部分会用 boundary 字符串分隔。




































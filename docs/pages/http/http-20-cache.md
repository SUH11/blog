# HTTP的缓存控制

请求 - 应答：缓存分为**浏览器缓存**和**客户端缓存**



1. 服务器的缓存控制

   Cache-Control：通用字段

   > Cache-Control: max-age=30
   >
   > 注意：max-age包含了在链路过程中所有节点停留的时间

   - max-age
   - no-store：不允许缓存，例如秒杀页面
   - no-cache：可以缓存，但在使用之前必须要去服务器验证是否过期，是否有最新的版本；
   - must-revalidate：如果缓存不过期就可以继续使用，但过期了如果还想用就必须去服务器验证。

   > 生鲜速递来举例说明：
   >
   > no-store：买来的西瓜不允许放进冰箱，要么立刻吃，要么立刻扔掉；
   >
   > no-cache：可以放进冰箱，但吃之前必须问超市有没有更新鲜的，有就吃超市里的；
   >
   > must-revalidate：可以放进冰箱，保鲜期内可以吃，过期了就要问超市让不让吃。



2. 客户端的缓存控制

   Cache-Control

   > Cache-Control：max-age=0 = Cache-Control: no-cache



3. 条件请求if

   条件请求一共有 5 个头字段：

   - If-Modified-Since
   - If-None-Match
   - If-Unmodified-Since
   - If-Match
   - If-Range

   先了解下，If-Modified-Since / If-None-Match。

   第一次的响应报文预先提供：Last-modified 和 ETag

   第二次请求时，带上缓存值，验证资源是否最新。

   如果没有变，返回304 -  Not Modified，浏览器更新有效期，然后使用缓存。

   > ETag：是资源的一个唯一标识
   >
   > ETag 还有“强”“弱”之分。
   >
   > 1. 强 ETag 要求资源在字节级别必须完全相符
   > 2. 弱 ETag 在值前有个“W/”标记，只要求资源在语义上没有变化，但内部可能会有部分发生了改变
   >
   > 生鲜例子：
   >
   > 你打电话给超市，“我这个西瓜是 3 天前买的，还有最新的吗？”。超市看了一下库存，说：“没有啊，我这里都是 3 天前的。”于是你就知道了，再让超市送货也没用，还是吃冰箱里的西瓜吧。这就是“`if-Modified-Since`”和“`Last-modified`”。
   >
   > 但你还是想要最新的，就又打电话：“有不是沙瓤的西瓜吗？”，超市告诉你都是沙瓤的（Match），于是你还是只能吃冰箱里的沙瓤西瓜。这就是“`If-None-Match`”和“`弱 ETag`”。
   >
   > 第三次打电话，你说“有不是 8 斤的沙瓤西瓜吗？”，这回超市给了你满意的答复：“有个 10 斤的沙瓤西瓜”。于是，你就扔掉了冰箱里的存货，让超市重新送了一个新的大西瓜。这就是“`If-None-Match`”和“`强 ETag`”。
   >
   > 总结：
   >
   > 1. If-Modified-Since + Last-modified
   > 2. If-None-Match + 弱ETag
   > 3. If-None-Match + 强ETag



### 总结

1. 缓存是优化系统性能的重要手段，HTTP 传输的每一个环节中都可以有缓存；
2. 服务器使用“Cache-Control”设置缓存策略，常用的是“max-age”，表示资源的有效期；
3. 浏览器收到数据就会存入缓存，如果没过期就可以直接使用，过期就要去服务器验证是否仍然可用；
4. 验证资源是否失效需要使用“条件请求”，常用的是“if-Modified-Since”和“If-None-Match”，收到 304 就可以复用缓存里的资源；
5. 验证资源是否被修改的条件有两个：“Last-modified”和“ETag”，需要服务器预先在响应报文里设置，搭配条件请求使用；
6. 浏览器也可以发送“Cache-Control”字段，使用“max-age=0”或“no-cache”刷新数据。












































module.exports = {
    title: '空山新雨后', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '前端笔记', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
        ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
        ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css' }],
        ['link', { rel: 'icon', href: '/logo.jpeg' }],  //浏览器的标签栏的网页图标
    ],
    markdown: {
        lineNumbers: true
    },
    serviceWorker: true,
    themeConfig: {    
        logo: '/logo.jpeg',
        lastUpdated: 'lastUpdate', // string | boolean
        nav: [
            { text: '首页', link: '/' },
            {
                text: '分类',
                ariaLabel: '分类',
                items: [
                    { text: 'CSS', link: '/pages/css/css.md' },
                    { text: 'JavaScript', link: '/pages/js/eventLoop.md' },
                ]
            },
            // { text: '功能演示', link: '/pages/folder1/test3.md' },
            { text: 'Github', link: 'https://github.com/SUH11' },
        ],
        displayAllHeaders: false,
        sidebar: [
            {
                title: 'JavaScript',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    { title: '1. Event Loop', path: '/pages/js/eventLoop.md' },
                    { title: '2. 继承', path: '/pages/js/extend.md' },
                    { title: '3. 模块化', path: '/pages/js/module.md' },
                    { title: '4. Promise', path: '/pages/js/promise.md' },
                    { title: '5. XMLHttpRequest', path: '/pages/js/XMLHttpRequest.md' },
                    { title: '6. 手写call apply bind', path: '/pages/js/call-apply-bind.md' },
                    { title: '7. JavaScript位运算', path: '/pages/js/byte.md' },
                    { title: '作用域', path: '/pages/js/scope.md' },
                    { title: '闭包', path: '/pages/js/closure.md' },
                    { title: 'this', path: '/pages/js/this.md' },
                    { title: '事件', path: '/pages/js/event.md' },
                    { title: '提升', path: '/pages/js/promote.md' },
                    { title: '原型', path: '/pages/js/prototype.md' },
                    { title: 'canvas相关API', path: '/pages/js/canvasapi.md' },
                    { title: 'echarts保存为图片，从源码简单分析', path: '/pages/js/echarts.md' },
                    { title: '常用优化方法', path: '/pages/js/youhua.md' },
                ]
            },
            {
                title: 'CSS',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    { title: '1.css知识点', path: '/pages/css/css.md' },
                    { title: 'currentColor', path: '/pages/css/currentColor.md' }
                ]
            },
            {
                title: 'Vue',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    { title: 'vue里的指令', path: '/pages/vue/directive.md' },
                    { title: 'vue常见问题', path: '/pages/vue/question.md' },
                    { title: 'vuex使用及实现', path: '/pages/vue/vuex.md' },
                    { title: 'vue-router使用及简单实现', path: '/pages/vue/vue-router.md' },
                    { title: '简单提示框', path: '/pages/vue/notice.md' },
                    { title: 'vue.js源码分析之this._init', path: '/pages/vue/vue2init.md' },
                ]
            },
            {
                title: 'React',   // 必要的
                collapsable: true, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    { title: 'React-ssr', path: '/pages/react/react-ssr.md' }
                ]
            },
            {
                title: 'Webpack',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    { title: '1.webpack打包参数及常用包', path: '/pages/webpack/params.md' }
                ]
            },
            {
                title: 'HTTP详解',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    { title: 'HTTP笔记前言', path: '/pages/http/course_http.md' },
                    { title: '1. HTTP的前世今生', path: '/pages/http/http-1-history.md' },
                    { title: '2. HTTP是什么', path: '/pages/http/http-2-http.md' },
                    { title: '3. 与HTTP相关的各种概念', path: '/pages/http/http-3-concept.md' },
                    { title: '4. 与HTTP相关的各种协议', path: '/pages/http/http-4-protocol.md' },
                    { title: '5. 常说的“四层”和“七层”到底是什么？', path: '/pages/http/http-5-layer.md' },
                    { title: '6. 域名', path: '/pages/http/http-6-domain.md' },
                    { title: '7. 键入网址再按下回车，发生了什么？', path: '/pages/http/http-7-enter.md' },
                    { title: '8. HTTP报文', path: '/pages/http/http-8-message.md' },
                    { title: '9. HTTP的请求方法', path: '/pages/http/http-9-methods.md' },
                    { title: '10. URI', path: '/pages/http/http-10-uri.md' },
                    { title: '11. 响应状态码', path: '/pages/http/http-11-statuscode.md' },
                    { title: '12. HTTP有哪些特点？', path: '/pages/http/http-12-character.md' },
                    { title: '13. HTTP的实体数据', path: '/pages/http/http-15-body.md' },
                    { title: '14. HTTP传输大文件的方法', path: '/pages/http/http-16-big-file.md' },
                    { title: '15. HTTP的连接管理', path: '/pages/http/http-17-connect.md' },
                    { title: '16. HTTP的重定向和跳转', path: '/pages/http/http-18-redirect.md' },
                    { title: '17. HTTP的Cookie', path: '/pages/http/http-19-cookie.md' },
                    { title: '18. HTTP的缓存控制', path: '/pages/http/http-20-cache.md' },
                    { title: '19. HTTP的代理服务', path: '/pages/http/http-21-proxy.md' },
                    { title: '20. HTTP的缓存代理', path: '/pages/http/http-22-cache-proxy.md' },
                    { title: '21. HTTPS是什么', path: '/pages/http/http-23-https.md' },
                    { title: '22. 对称加密和非对称加密', path: '/pages/http/http-24-encrypt.md' },
                    { title: '23. 数字签名和证书', path: '/pages/http/http-25-certificate.md' },
                    { title: '24. TLS', path: '/pages/http/http-26-https-tls.md' },
                    { title: '25. TLS1.3特性详解', path: '/pages/http/http-27-tls1.3.md' },
                    { title: '26. https的优化', path: '/pages/http/http-28-https.md' },
                    { title: '27. 应该迁移到https嚒', path: '/pages/http/http-29-can-i-move-to-https.md' },
                    { title: '28. http/2介绍', path: '/pages/http/http-30-http2.md' },
                    { title: '29. http/2详解', path: '/pages/http/http-31-http2-kernel.md' },
                    { title: '30. http/3介绍', path: '/pages/http/http-32-http3.md' },
                    { title: '31. 应该迁移到http/2嚒', path: '/pages/http/http-33-can-i-move-to-http2.md' },
                    { title: '32. Nginx介绍', path: '/pages/http/http-34-nginx.md' },
                    { title: '33. CDN是什么', path: '/pages/http/http-35-cdn.md' },
                    { title: '34. WebSocket介绍', path: '/pages/http/http-36-websockets.md' },
                    { title: '35. http性能优化', path: '/pages/http/http-37-youhua1.md' },
                ]
            },
            {
                title: '算法和数据结构',
                collapsable: true, 
                sidebarDepth: 1,
                children: [
                    { title: '104二叉树的最大深度', path: '/pages/datastruct/104.md' },
                    { title: '链表概览', path: '/pages/datastruct/listNode.md' },
                    { title: '链表题目', path: '/pages/datastruct/listNode-leetcode.md' },
                    { title: 'JavaScript实现二叉树笔记', path: '/pages/datastruct/bst.md' },
                    { title: '判断对角线', path: '/pages/datastruct/line.md' }
                ]
            },
            {
                title: 'Git常见用法',
                collapsable: true, 
                sidebarDepth: 1,
                children: [
                    { title: 'git不同用户怎么切换', path: '/pages/git/local.md' }
                ]
            },
            {
                title: '实战',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    { title: 'egg+mongodb项目搭建', path: '/pages/practice/egg_mongo.md' }
                ]
            },
            {
                title: '其他',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    { title: '复习计划表', path: '/pages/other/review.md' },
                    { title: '时间规划', path: '/pages/other/note.md' },
                    { title: 'element ui合并单元格', path: '/pages/other/table.md' },
                    // { title: '风起苍岚 18 - 28', path: '/pages/manhua/index.md' },
                    { title: '随笔1 - 2020.06.05', path: '/pages/other/20200605.md' },
                ]
            },
        ]
    }
}
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
            { text: 'JavaScript', link: '/pages/js/base/eventLoop.md' },
          ]
        },
        { text: 'Github', link: 'https://github.com/SUH11' },
      ],
      displayAllHeaders: false,
      sidebar: [
        {
          title: '算法和数据结构',
          collapsable: false, 
          sidebarDepth: 2,
          children: [
            {
              title: '链表',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '链表概览', path: '/pages/datastruct/listNode/listNode.md' },
                { title: '链表题目', path: '/pages/datastruct/listNode/listNode-leetcode.md' },
              ]
            },
            {
              title: '分治、递归',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '分治、递归概览', path: '/pages/datastruct/recursion/recursion.md' },
                { title: '分治、递归题目', path: '/pages/datastruct/recursion/recursion-leetcode.md' },
              ]
            },
            {
              title: '树',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '树概览', path: '/pages/datastruct/tree/tree-note.md' },
                { title: '二叉树题目', path: '/pages/datastruct/tree/tree-leetcode.md' },
                { title: '104二叉树的最大深度', path: '/pages/datastruct/tree/104.md' },
                { title: 'JS实现二叉树笔记', path: '/pages/datastruct/tree/bst.md' },
              ]
            },
            {
              title: '动态规划',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '动态规划概览', path: '/pages/datastruct/dp/dp.md' },
                { title: '动态规划题目', path: '/pages/datastruct/dp/dp-leetcode.md' },
              ]
            },
            {
              title: '排序算法',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '排序算法总览', path: '/pages/datastruct/sort/sort.md' },
              ]
            },
            {
              title: '常用技巧',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '判断对角线', path: '/pages/datastruct/skill/line.md' },
                { title: 'Master公式', path: '/pages/datastruct/skill/master.md' }
              ]
            },
          ]
        },
        {
          title: 'JavaScript',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              title: '基础',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '1. Event Loop', path: '/pages/js/base/eventLoop.md' },
                { title: '2. 继承', path: '/pages/js/base/extend.md' },
                { title: '3. 模块化', path: '/pages/js/base/module.md' },
                { title: '4. Promise', path: '/pages/js/base/promise.md' },
                { title: '5. XMLHttpRequest', path: '/pages/js/base/XMLHttpRequest.md' },
                { title: '6. 手写call apply bind', path: '/pages/js/base/call-apply-bind.md' },
                { title: '7. JavaScript位运算', path: '/pages/js/base/byte.md' },
                { title: '8. requestAnimationFrame', path: '/pages/js/base/requestAnimationFrame.md' },
              ]
            },
            {
              title: '深入浅出',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '作用域', path: '/pages/js/middle/scope.md' },
                { title: '闭包', path: '/pages/js/middle/closure.md' },
                { title: 'this', path: '/pages/js/middle/this.md' },
                { title: '对象', path: '/pages/js/middle/object.md' },
                { title: '内置对象', path: '/pages/js/middle/inner-object.md' },
                { title: '类型', path: '/pages/js/middle/type.md' },
                { title: '类型转换', path: '/pages/js/middle/switch-type.md' },
                { title: '事件', path: '/pages/js/middle/event.md' },
                { title: '提升', path: '/pages/js/middle/promote.md' },
                { title: '原型', path: '/pages/js/middle/prototype.md' },
                { title: '正则表达式', path: '/pages/js/middle/reg.md' },
                { title: 'Class 类', path: '/pages/js/middle/class.md' },
                { title: 'canvas相关API', path: '/pages/js/middle/canvasapi.md' },
              ]
            },
            {
              title: '进阶',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '编译原理', path: '/pages/js/deep/compiler.md' },
                { title: 'echarts保存为图片，从源码简单分析', path: '/pages/js/deep/echarts.md' },
                { title: '常用优化方法', path: '/pages/js/deep/youhua.md' },
              ]
            },
          ]
        },
        {
          title: 'CSS知识点',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              title: '基础',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '1.css知识点', path: '/pages/css/css.md' },
              ]
            },
            {
              title: 'CSS3',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: '2.css3知识点', path: '/pages/css/css3.md' },
                { title: 'currentColor', path: '/pages/css/currentColor.md' }
              ]
            },
          ]
        },
        {
          title: 'Vue',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            {
              title: '基础',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: 'vue里的指令', path: '/pages/vue/base/directive.md' },
              ]
            },
            {
              title: '原理',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: 'vuex使用及实现', path: '/pages/vue/source/vuex.md' },
                { title: 'vue-router使用及简单实现', path: '/pages/vue/source/vue-router.md' },
                { title: '简单提示框', path: '/pages/vue/components/notice.md' },
                { title: 'vue.js源码分析之this._init', path: '/pages/vue/source/vue2init.md' },
              ]
            },
            {
              title: '深入浅出',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                { title: 'vue常见问题', path: '/pages/vue/deep/question.md' },
                { title: '面试关于Vue的文章', path: '/pages/vue/deep/url.md' },
              ]
            }, 
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
          title: '小程序',   // 必要的
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: 1,    // 可选的, 默认值是 1
          children: [
            { title: '问题列表', path: '/pages/mini/question.md' }
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
            { title: 'TODO LIST', path: '/pages/other/todo.md' },
            { title: 'element ui合并单元格', path: '/pages/other/table.md' },
            // { title: '风起苍岚 18 - 28', path: '/pages/manhua/index.md' },
            { title: '随笔1 - 2020.06.05', path: '/pages/other/20200605.md' },
          ]
        },
    ]
  }
}
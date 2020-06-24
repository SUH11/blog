module.exports = {
    title: 'SUH首页', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
    description: '前端笔记', // meta 中的描述文字，用于SEO
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
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
                    { title: '15. HTTP的实体数据', path: '/pages/http/http-15-body.md' },
                    { title: '16. HTTP传输大文件的方法', path: '/pages/http/http-16-big-file.md' },
                    { title: '17. HTTP的连接管理', path: '/pages/http/http-17-connect.md' },
                    { title: '18. HTTP的重定向和跳转', path: '/pages/http/http-18-redirect.md' },
                    { title: '19. HTTP的Cookie', path: '/pages/http/http-19-cookie.md' },
                    { title: '20. HTTP的缓存控制', path: '/pages/http/http-20-cache.md' },
                    { title: '21. HTTP的代理服务', path: '/pages/http/http-21-proxy.md' },
                    { title: '22. HTTP的缓存代理', path: '/pages/http/http-22-cache-proxy.md' },
                ]
            },
            {
                title: '算法和数据结构',
                collapsable: true, 
                sidebarDepth: 1,
                children: [
                    { title: '1.104二叉树的最大深度', path: '/pages/datastruct/104.md' },
                    { title: '链表', path: '/pages/datastruct/listNode.md' },
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
            }
        ]
    }
}
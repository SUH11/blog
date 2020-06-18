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
                    { title: '1.Event Loop', path: '/pages/js/eventLoop.md' },
                    { title: '2.继承', path: '/pages/js/extend.md' },
                    { title: '3.模块化', path: '/pages/js/module.md' },
                    { title: '4.Promise', path: '/pages/js/promise.md' },
                    { title: '5.XMLHttpRequest', path: '/pages/js/XMLHttpRequest.md' },
                    { title: '6.手写call apply bind', path: '/pages/js/call-apply-bind.md' },
                    { title: '7.JavaScript位运算', path: '/pages/js/byte.md' },
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
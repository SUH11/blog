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
                    { title: '4.Promise', path: '/pages/js/promise.md' }
                ]
            },
            {
                title: 'CSS',
                collapsable: true,
                sidebarDepth: 1,
                children: [
                    { title: '1.css知识点', path: '/pages/css/css.md' }
                ]
            },
            {
                title: 'Docker',
                collapsable: true, 
                sidebarDepth: 1,
                children: [
                    { title: '小试牛刀Docker', path: '/pages/docker/note.md' }
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
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
    plugins: [
      // '@vuepress/pwa',
      '@vuepress/back-to-top'
    ],
    markdown: {
      lineNumbers: true
    },
    serviceWorker: true,
    sidebarDepth: 3,
    themeConfig: {    
      logo: '/logo.jpeg',
      lastUpdated: '上次更新', // string | boolean
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
          children: [
            {
              title: '链表',
              collapsable: true,
              children: [
                '/pages/datastruct/listNode/listNode',
                '/pages/datastruct/listNode/listNode-leetcode'
              ]
            },
            {
              title: '分治、递归',
              collapsable: true,
              sidebarDepth: 1,
              children: [
                '/pages/datastruct/recursion/recursion.md',
                '/pages/datastruct/recursion/recursion-leetcode.md'
              ]
            },
          ]
        },
      ]
  }
}
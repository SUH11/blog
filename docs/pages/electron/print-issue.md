## Electron打印问题排查



1. 问题

   Windows/Mac下客户端打印会导致页面崩溃、卡死

2. 重现环境

   系统：Windows

   Electron：10.1.5

   这个打印的页面是用Electron的webview嵌入的，用浏览器访问点击**打印**是正常的，崩溃是在客户端才有的。

3. 排查过程

   1. 建一个小demo环境

      - 安装electron

        ```bash
        npm init -y
        npm install electron --save
        ```

      - 1. 新建 main.js

        ```javascript
        const { app, BrowserWindow } = require('electron')
        
        function createWindow() {
            const mainWindow = new BrowserWindow({
                width: 1200, 
                height: 700,
                webPreferences: {
                    webviewTag: true,
                    nativeWindowOpen: true,
                    enableRemoteModule: true
                }
            })
            mainWindow.loadURL(`file://${__dirname}/index.html`)
            mainWindow.webContents.openDevTools()
            console.log('i am ready')
            setTimeout(() =>{
                // mainWindow.webContents.print()
            }, 5000)
        }
        app.on('ready', createWindow)
        ```

        2.新建index.html，并找一个html文件放到同级目录下

        ```html
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Hello World!</title>
          </head>
          <body>
            <h1 onclick="myPrint()">print me</h1>
            <script>
              function myPrint(){
                let iframe = document.createElement('iframe')
                iframe.setAttribute("style", "width:100%; height:100%; visibility:visible; overflow:hidden;")
                iframe.setAttribute('src', './1.html') //  just PDF crash...
                iframe.type = "application/pdf"
                const oBody = document.getElementsByTagName('body')[0]
                oBody.appendChild(iframe)
                iframe.contentWindow.print()
              }
            </script>
          </body>
        </html>
        ```

        ```bash
        # 3. 运行项目
        electron .
        ```

        一个小环境就搭建好了。

      2. 执行

         点击打印是没有问题的，换了v10.1.2、v11.0.1、 v9.3.4等好多版本都是OK的。

         Google和GitHub上都看了，发现Electron有很多打印的bug，试了几个，发现一个场景是有问题的：

         ```html
         <script>
           document.addEventListener('click', () => {
             window.print() // 这里会发生卡死
           })
         </script>
         ```

         但并不是我要的场景

      3. 模拟线上环境

         线上出bug的打印环境是用webview嵌套的，于是模拟了webview嵌套的代码，并且webview里也是用`window.print()`来打印的：

         ```java
         // index.html增加标签：
         <webview id="foo" src="./index2.html" style="display:inline-flex; width:640px; height:80vh"></webview>
         ```

         ```html
         <!- index2.html ->
         <!DOCTYPE html>
         <html>
           <head>
             <meta charset="UTF-8">
             <title>Hello World!</title>
           </head>
           <body>
             <h1 onclick="myPrint()">print me</h1>
             <script>
               function myPrint(){
                 let iframe = document.createElement('iframe')
                 iframe.setAttribute("style", "width:100%; height:100%; visibility:visible; overflow:hidden;")
                 iframe.setAttribute('src', './1.html')
                 iframe.type = "application/pdf"
                 const oBody = document.getElementsByTagName('body')[0]
                 oBody.appendChild(iframe)
                 iframe.contentWindow.print()
               }
             </script>
           </body>
         </html>
         ```

         还是没有复现

      4. 在线上环境打断点

         打断点的过程中，发现window.print()打印的不是html，是pdf，于是将`1.html`改为`1.pdf`。

         最终，复现了！！！

         试了很多个版本（同上），发现只要打印PDF就会卡死。

4. 结论

   Electron的问题，8及之前是保存为文件，所以没有问题。之后的版本是直接启动打印机，但打印PDF都有bug。

5. 处理

   最后，给Electron提了个issue，如下：

   https://github.com/electron/electron/issues/26587

   只能等electron更新了
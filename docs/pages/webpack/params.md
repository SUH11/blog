##### webpack几个重要的参数

默认文件：webpack.config.js

```javascript
const path = require('path')
module.exports = {
  entry: {
    index: './src/index.js',
    login: './src/login.js'
  },
  output: {
    filename: '[name]_[chunkhash:8].js',
    path: path.resovle(__dirname, './dist')
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  watch: false,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000 // 每秒检查一次变动
  },
  
  devServer: {
    port: 8081,
    contentBase: './dist',
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost: 9000'
      }
    },
    hotOnly: true
  },
  optimization: {
    usedExports: true, // 摇树
    splitChunks: { // 代码分割
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /react|react-dom/,
          name: 'react_chunks',
          chunks: 'all',
          priority: 0
        },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common_chunks',
          chunks: 'all'
          priority: -10
        },
        default: {
          miniChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		title: '首页',
  		inject: 'body',
  		template: './src/index.html'
		}),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.png$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'image/',
            limit: 20480
          }
        }
      }
    ]
  }
}
```

1. entry
2. output
3. mode
4. devtool
5. plugins
6. module
7. optimization: usedExports, splitChunks

**常见的plugins**

- html-webpack-plugin

- clean-webpack-plugin

- mini-css-extra-pluin

- webpack-bundle-analyzer

  

```js
const HtmlWebpackPlugin = require('html-webpack-plugin') // html模版
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 每次打包都删掉之前的打包的代码
const MiniCssExtraPlugin = require('mini-css-extra-plugin') // 分离css文件，不放在head里
const { BundleAnalyzer } = require('webpack-bundle-analyzer') // 打包分析
const CompressionWebpackPlugin = require('compression-webpack-plugin') // gzip压缩？

const webpack = require('webapck') 
// webpack内置的plugin
new webpack.HotModuleReplacementPlugin() // 局部更新插件,启动HMR后，css抽离会不不⽣生效，还有不不⽀支持contenthash， chunkhash

// webpack-dev-server : 
// 1. devServer把打包后的模块 不不会放在dist⽬目录下，⽽而是放到内存中，从⽽而提升速度
// 2. 跨域
npm install webapck-dev-server --save-dev
// package.json
"script": {
  "server": "webpack-dev-server"
}
// webpack.config.js
devServer: {
  port: 8081,
  baseContent: './dist',
  open: true,
  proxy: {
    '/api': {
      target: 'http://localhost:8081'
    }
  }
}
```


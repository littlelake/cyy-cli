var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
var PROJECT = require('./project.config');
var IP = require('ip').address();

console.log(__dirname)
module.exports = {
  entry: {
    'index': './src/index.ts'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, PROJECT.PATH.DEV)
  },
  devtool: 'cheap-module-eval-source-map',
  // 引用文件时省略后缀名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css']
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模板html的路径
      template: path.resolve(__dirname, PROJECT.PATH.SRC, 'index.html'),
      // 在body插入
      inject: true,
      // 页面上的资源加hash
      hash: true,
      cache: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, PROJECT.PATH.SRC),
    // gzip 压缩
    compress: true,
    port: 3000,
    // 当使用内联模式(inline mode)时，在开发工具(DevTools)的控制台(console)将【bu】显示消息
    clientLogLevel: 'none',
    // 当使用HTML5 History API，任意的 404 响应可以提供为 index.html 页面
    historyApiFallback: true,
    // host 设置为本机 ip 
    host: IP,
    inline: true,
    // 热替换特性
    hot: true,
    // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    noInfo: false,
    // 编译出错时，全屏覆盖
    overlay: true,
    // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见
    quiet: true,
    // 自动打开浏览器
    open: true,
    // 与监视文件相关的控制选项
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000
    },
    // 隐藏 Child extract-text-webpack-plugin 的输出信息
    stats: {
      children: false
    },
  }
};
/**
 * Created by huangwei on 2017/5/5.
 */
//const path = require('path')
import path from 'path'

var webpack = require('webpack')

//导入那个自动生成index.html，并且导入bundle.js
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry : path.join(__dirname,'src/main.js'),
    output : {
        path : path.join(__dirname,'dist'), //导出的路径文件夹
        filename: 'bundle.js' //导出成的文件
    },
    module: {
        loaders: [
            {
                test: /vue-preview.src.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|ttf|jpg|svg|gif)$/,
                loader: 'url-loader?limit=4000'//当图片大小小于4k,用base64表示
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/ //排除node_modules
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename : 'index.html', //最终在内存中生成的文件名称，并且这个文件会在浏览器中自动打开
            template : 'template.html' //生成index.html的参照模版
        }),
        //这个插件帮我们做了两件事，es6转es5,再压缩
        // 压缩js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false //去掉版权信息等注释
        }),
        // 代码顺序优化
        new webpack.optimize.OccurrenceOrderPlugin()
    ] //实例化插件
    
}
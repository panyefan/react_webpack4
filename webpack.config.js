var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin'); // html模板插件
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包css插件
var proxy = require('http-proxy-middleware');

var config = {
    entry: {
        app:path.resolve(__dirname, './src/App.js'),
    },
    output: {
        path: path.resolve(__dirname, './html'),
        publicPath: '/html/',
        filename: '[name].min.js',
        chunkFilename: '[id].[name].[chunkhash:8].min.js' //chunk生成的配置
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev')
            }
        }),
        new webpack.HotModuleReplacementPlugin(), // 热模块替换插件
        new htmlWebpackPlugin({
            title: 'react项目',
            filename: './index.html',
            favicon: 'favicon.ico',
            template: './src/app.html',
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].[name].[chunkhash:8].css"
        })
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendors'
                },
                'async-vendors': {
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    chunks: 'async',
                    name: 'async-vendors'
                },
                'async-components': {
                    test: /[\\/]src[\\/]components[\\/]/,
                    minChunks: 2,
                    chunks: 'async',
                    name: 'async-components'
                },
            }
        },
        runtimeChunk: { name: 'runtime' }
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test:/\.css|styl$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader','stylus-loader']
            },
            {
                test: /\.(png|jpg|woff|eot|ttf|svg)$/,
                loader: 'url-loader?limit=1&name=images/[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            }

        ]
    },
    devServer: {
        disableHostCheck: true,
        port: 29303,
        hot:true,
        proxy: {
            // 开发环境 begin
            '/api_dev_adm/': {
                target: 'https://adm.hstydev.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api_dev_adm': '' }
            },
            '/api_dev_service/': {
                target: 'https://service.hstydev.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api_dev_service': '' }
            },
            '/api_dev_mch/': {
                target: 'https://mch.hstydev.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api_dev_mch': '' }
            },
            // 开发环境 end
            '/pic/': {
                target: ' https://adm.hstydev.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/pic': '/pic' }
            },
            '/static/': {
                target: 'https://adm.hstydev.com',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/static': '/static' }
            }
        }
    }
}

module.exports = config;
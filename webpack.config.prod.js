var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包css插件
var FastUglifyJsPlugin = require('fast-uglifyjs-plugin');

var config = {
    entry: {
        app: path.resolve(__dirname, './src/App.js'),
    },
    output: {
        path: path.resolve(__dirname, './html'),
        filename: '[name].min.js',
        chunkFilename: '[id].[chunkhash:8].min.js'   //chunk生成的配置
    },
    performance: {
        hints: false
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new htmlWebpackPlugin({
            title: '企业福利管理系统',
            filename: './index.html',
            favicon: 'favicon.ico',
            template: './src/app.html',
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: true //删除空白符与换行符
            }
        }),
        new FastUglifyJsPlugin({
            output: {
                comments: false,  // remove all comments
            },
            compress: {
                warnings: false
            },
            debug: false,
            cache: false,
            cacheFolder: path.resolve(__dirname, '.otherFolder'),
            workerNum: 2
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash:8].css",
            chunkFilename: "[id].[chunkhash:8].css"
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
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: 'postcss.config.js'
                            }
                        }
                    },
                    {
                        loader: 'less-loader'
                    },
                ],
            },
            {
                test: /\.(png|jpg|woff|eot|ttf|svg)$/,
                loader: 'url-loader?limit=2048&name=images/[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            }

        ]
    }
}

module.exports = config;
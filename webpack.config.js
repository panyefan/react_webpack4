var path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin'); // html模板插件
var CopyWebpackPlugin = require("copy-webpack-plugin");
var HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 打包css插件

var config = {
    entry: {
        app: path.resolve(__dirname, './src/App.js'),
    },
    output: {
        path: path.resolve(__dirname, './html'),
        filename: '[name].min.js',
        chunkFilename: '[id].[name].[chunkhash:8].min.js' //chunk生成的配置
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('dev')
            }
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            /**
             * 在这里引入 manifest 文件
             */
            manifest: require('./dll/vendor-manifest.json')
        }),
        new webpack.HotModuleReplacementPlugin(), // 热模块替换插件
        new htmlWebpackPlugin({
            title: '企业福利管理系统',
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
        }),
        new CopyWebpackPlugin([
            {
                from: "./dll/vendor.dll.js",
                to: "dll.js"
            }
        ]),
        new HtmlWebpackIncludeAssetsPlugin({
            assets: ['dll.js'],
            append: false,
        }),
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
    },
    devServer: {
        disableHostCheck: true,
        port: 8088,
        hot: true,
        proxy: {
            // 开发环境 begin
            '/api_dev_adm/': {
                target: 'http://kj.lex55.top',
                secure: false,
                changeOrigin: true,
                pathRewrite: { '^/api_dev_adm': '' }
            }
        }
    }
}

module.exports = config;
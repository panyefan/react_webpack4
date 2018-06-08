# 一、React webpack4 配置优化
## 1、之前做的项目，webpack配置文件没有优化好，编译后的包文件太大了，每个js文件都包含公共部分的代码，源文件7M多的，编译后的包文件达到60M左右；
## 2、经过webpack配置的优化，源文件7M多的，编译后的包文件为8M左右；
## 3、这个项目只是一个demo，不过目录结构和webpack配置文件，和已经做好的上线项目基本一致；
## 4、这个demo项目原文件大小（不包括node_modules文件）为530 KB (542,908 字节)，编译后的包文件为777 KB (796,037 字节)
# 二、webpack关键配置
```
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
				test: /[\\/]src[\\/]components[\\/],
				minChunks: 2,
				chunks: 'async',
				name: 'async-components'
			}
		}
	},
	runtimeChunk: { name: 'runtime' }
},
```
# 三、运行本项目
```
// 下载本项目到本地，运行以下命令进行模块安装
npm install

// 安装好之后，运行项目，启动成功之后，访问http://localhost:29303/html/#/
npm run dev

// 编译生产环境使用的包文件
npm run build
```
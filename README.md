# 本React项目框架特色
### 1、使用mobx状态管理
### 2、使用antd的UI库
### 3、使用less的CSS预处理框架
### 4、使用react-router路由
### 5、使用postcss、autoprefixer插件对CSS样式自动添加前缀
### 6、开发环境使用webpack.DllPlugin，提前打包一些基本不怎么修改的文件，提高打包效率

# 运行本项目
```
// 下载本项目到本地，运行以下命令进行模块安装
npm install --save-dev

// 开发环境：提前打包一些基本不怎么修改的文件
npm run dll

// 运行项目，启动成功之后，访问http://localhost:8088/#/login
npm run dev

// 生产环境：编译使用的包文件
npm run build
```
![image](https://github.com/panyefan/react_webpack4/blob/master/src/images/1.png)
![image](https://github.com/panyefan/react_webpack4/blob/master/src/images/2.png)
![image](https://github.com/panyefan/react_webpack4/blob/master/src/images/3.png)
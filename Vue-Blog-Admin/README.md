# [使用Vue搭建的博客后台前端页面](http://suvllian.com)

## 项目目录说明  
```
.
|-- buikd                            // 项目开发环境配置build
|-- config                           // 项目开发环境配置
|-- src                              // 源码目录
|   |-- 后台Api                       // php后台数据接口
|   |-- Api                          // 前端数据请求接口
|       |-- index.js                 // Vue-Resource配置
|       |-- resource.js              // Api函数
|   |-- assets                       // 图片
|   |-- components                   // 页面组件
|       |-- Article                  // 文章
|       |-- Book                     // 书籍
|       |-- Travel                   // 图片
|       |-- common                   // 公用组件
|   |-- app.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|   |-- route.js                     // 路由配置
|-- .babelrc                         // ES6语法编译配置
|-- index.html                       // 程序入口html文件
|-- README.md                        // 项目说明
|-- package.json                     // 配置项目相关信息，通过执行 npm init 命令创建
.
```

## vue全家桶
```
vue                                   // 构建用户界面的
vue-router                            // 路由  
vue-resource                          // 通过ajax请求数据 
```  

## 页面说明
```
/aIndex                               // 添加文章页
/aView                                // 文章管理页
/bIndex                               // 添加图书页
/bView                                // 图书管理页
/tImage                               // 添加图片页
/tView                                // 图片管理页
/                                     // 首页
*    
```

## 安装步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

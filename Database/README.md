# 用Vue做数据库课设(工资管理系统)  

------  

## 目录结构

```
.
├── README.md         
├── build                    // 项目build配置
├── config                   // 项目配置 
├── dist                     // 项目build目录
├── logs                     // 生产环境日志目录
├── src                      // 生产目录
│   ├── api                  // API 请求
│   ├── assets               // css 和图片资源
│   ├── components           // 组件
│   └── vuex                 // vuex相关文件, user
│   └── App.vue              // 根组件
│   └── routes.js            // 路由配置
│   └── main.js              // 入口文件
├── .babelrc                 // babel配置
|——  index.html              // 主页html
|——  package.json            // 配置文件
.
```


## 功能说明  

>     员工输入工号登录之后，根据工号进行判断进入不同的界面。   
    一共有三个等级，不同的等级的权限不同。  
> 
    1、普通员工  
    2、副经理  
    3、Boss    
 
>  1、普通员工权限   
>>  
1.查看自己所有信息  
2.修改基本信息  
3.修改登录密码  

>  2、副经理权限   
>>  
1.查看自己所有信息  
2.查看本部门所有员工信息(可用工号和姓名搜索)
3.添加员工(只能添加本部门员工)  
4.修改登录密码  

>  3、Boss权限   
>>  
1.查看所有部门报表 
2.查看所有员工信息(可用工号、姓名和部门名称搜索) 
3.添加员工  
4.查看年度报表  
5.修改登录密码  

##  开发说明  

后台使用PHP从数据库读取数据并返回JSON数据至前端。api代码参见

## 安装步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
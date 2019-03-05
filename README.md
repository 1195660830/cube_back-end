# cube_web

#### 项目介绍
毕业设计,魔方赛事网站

用户客户端 : 新闻 赛事 赛事详情 报名

管理员客户端 : 新闻管理 赛事管理 报名管理

服务端 : 基于 hapi 

#### 软件架构
软件架构说明

基础设施搭建
1. IED ,测试,调试准备,代码版本控制
    1. 安装supervisor,自动重新起,避免开发时手动重启项目
    2. chrome 运行调试 测试
    3. VScode 单不调试功能测试
    4. git 代码管理
    5. 配置 gitignore
    6. gitee 码云 远端代码同步
2. 引入 hapi 组件,并运行
3. 调整包结构为可迭代可维护架构
4. 引入 ENV2 区分开发环境和生产环境
5. 引入 前后端最佳实践,swagger
    1. swgger 配置
    2. joi 自动注入
6. 阿里云服务器,配置
    1. nginx 端口映射
    2. node 环境
    3. mysql 数据库 安装,开放远端调试接口
7. 引入 Sequelize-cli
    1. 表结构设计
    2. 远端数据库 建库 建表
    3. 模板数据,设计,填充
8. Sequelize 单表使用, 分页
9. 引入 JWT 前后端分离项目 必须的身份验证功能


2018/12/04 基础搭建完成

接下来的任务
1. 熟悉框架
2. 建立一个基础架构分支名为 basicServer ,一个即将 即将开发进行开发的分支名为 dev
3. 完成首页新闻,赛事两套接口,增删改查

2018/12/09 四个接口完成(踩了,很多大坑)

接下来的任务
1. 给添加操作 添加 用户 权限


#### 安装教程

1. npm install  // 安装模块依赖
2. cp .env.example .env //由于使用了 ENV2 ,且私密环境不作为信息上传公开的代码管理,需要以.env.example为模板,单独配置一个 .env 文件
3. 设置正确路径，端口
4. node app.js // supervisor app.js

#### sequelize 使用方式

### 介绍,sequelize,是连接数据库的工具,类似java的JDBC

sequelize migrate 是用于管理 数据库 建表 添加字段使用的,在建表的同时,需要类似git的操作,每一步都会记录下来,并且还需写下回退操作.

相关操作
D:\cube_web>node_modules\.bin\sequelize migration:create --name competiton-tablen-add_col // 初始化一个操作 注意填写内容有区别,目前分为 建表和添加列 两种
D:\cube_web>node_modules\.bin\sequelize db:migrate // 运行操作

sequelize seed 是用于给空表添加一些测试数据的工具,同样有记录功能,但是已有数据的表,再次添加就会报错
D:\cube_web>node_modules\.bin\sequelize init:seeders --name init-competition // 添加一个操作
D:\cube_web>node_modules\.bin\sequelize db:seed:all // 一次性直接添加所有操作,但是注意遇到非空表,会报错
D:\cube_web>node_modules\.bin\sequelize db:seed --seed 20190305142853-init-competition //执行指定操作
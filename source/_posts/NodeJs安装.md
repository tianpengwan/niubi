---
layout: p
title: NodeJs安装
date: 2024-08-06 10:04:06
categories: 开发
tags: nodejs
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17229101180991722910117222.png
---
node版本选择要考虑所使用工具和框架整合的兼容性。下一代前端构建工具vite要求"node": "^18.0.0 || >=20.0.0"；主流vue3 ui框架element plus要求"node": ">= 18"；样式检查工具stylelint要求"node": ">=18.12.0"；

基于这些考虑，选择大版本号18的最新长期稳定版的安装程序：

#### 1、下载

进入nodejs官网[下载](https://nodejs.org/en/download/prebuilt-installer/current)

以当前最新版V22.5.1 windows版本下载为例：



![image-20240806091239093](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-08-06/4fba2170cf8ab93fbd14d4c7e5f8fc36.png)

下载好后，点击安装程序（node-ｖ版本号-x操作系统代码.msi），本例所下载的文件名是：node-v22.5.1-x64.msi。然后点击安装，选择自己要安装的路径，默认是Ｃ盘，你可以按自己需要修改安装位置，然后按Node.js  Setup的安装提示点击下一步直到安装完成。

#### 2、检查当前版本

`win`+`r`打开cmd窗口:

```shell
#查看node版本
node -v  
#查看npm版本
npm -v
```

![image-20240806091946636](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-08-06/f95254c4ab9616c58870829dcb931e62.png)

版本无误接着进行下一步

#### 3、配置npm下载时的默认安装目录和缓存日志目录

可以使用以下命令查看 npm 安装信息：

```shell
列出当前的 npm 配置信息
npm config list
查看所有配置
npm config list -l
获取全局模块的安装根目录
npm root -global
查看npm全局安装保存路径
npm config get prefix
查看npm安装缓存cache路径
npm config get cache
```

如果想修改 npm 全局安装包的位置路径，可以按照以下步骤进行操作：

1、在你希望的位置创建一个文件夹用于存放全局安装的包，建议选择刚才安装的nodejs文件的位置，方便管理

![image-20240806093358949](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-08-06/7ecc601ea4956b45b9b6273c5b9081fb.png)

打开终端，执行以下命令设置全局安装路径：

```shell
npm config set prefix "D:\Download\nodejs\npm_global"
```

设置缓存路径（可根据需要修改路径）：

```shell
npm config set cache "D:\Download\nodejs\npm_cache"
```

![image-20240806093704427](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-08-06/fa050ec3f2f93e29a3a834bb082f9a74.png)

执行完成之后会自动生成这两个文件夹，如果没有检查一下文件夹的权限，自己是不是管理员权限

![image-20240806094147598](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-08-06/cf86a8aa0d28bb3087a8d1c35384a810.png)



#### 4、npm配置镜像站
安装 cnpm

```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```

查看cnpm配置

```shell
cnpm config list
```

![image-20240806100230508](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-08-06/d9b4cb35a240eaa9f86e216fbeb6dfa0.png)

npm 淘宝镜像已经从  网页链接http://registry.npm.taobao.org/ 切换到了  网页链接http://registry.npmmirror.com/
旧域名也将停止服务。

2024年1 月，淘宝原镜像域名（http://registry.npm.taobao.org/）的 HTTPS 证书到期，旧的 npm 淘宝镜像在使用时有可能会出错。


---
title: MySQL本地安装
date: 2024-06-11 11:19:48
categories: mysql
tags: mysql
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17180775324071718077531593.png
---
# 超级详细的mysql本地安装指南

### 1、下载

进入MySQL官方网站（[MySQL Community Downloads](https://dev.mysql.com/downloads/installer/)），按下图顺序点击“进入下载页面

![image-20240611112331061](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/55da30b72c705d01f25b641a66d3fef7.png)

MSI Installer有两个，选哪个都可以

第一个是联网在线安装，会在线下载安装包。
第二个是离线安装，下载到本地进行安装。

点击“[Downloda](https://dev.mysql.com/downloads/file/?id=528488)”进入下载页面。

![image-20240611112654357](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/e2a724335149bdb524d5c8916a7a0f39.png)

### 2、安装

#### 1点击刚下载的安装器

![image-20240611112909893](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/91ec710d35c611a977a5920cdd1b4f59.png)

#### 2选择仅下载MySQL服务

![image-20240611113100143](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/8924fae0f0797023c5581910dd599420.png)

#### 3点击next，进入下载界面，点击Execute执行下载

![image-20240611113144279](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/7a8250ad0754de2062b7a072461b0862.png)

![image-20240611113300511](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/10df9cef6f239fc39737e7c41b768909.png)

#### 4next

![image-20240611113328678](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/d391d2ecfb8149e7cd9d1c2a3179b664.png)

#### 5默认配置3306，不用修改，next

![image-20240611113403103](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/5071106b6159f588e871cb0256261ba9.png)

#### 5勾选密码校验

第一个是强密码校验，mysql推荐使用最新的数据库和相关客户端，MySQL8换了加密插件，所以如果选第一种方式，很可能你的navicat等客户端连不上mysql8。

**所以这里一定要选第二个（下图红框的地方）**，因为我们后面使用mysql客户端navicat版本是9.X，它链接mysql用的是就是这个加密算法，所以这一步很重要。（重要的事情说三遍）

![image-20240611113426646](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/4310bc1a9cc9a869e10a8734bef18b31.png)

#### 6配置密码

![image-20240611113759621](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/cf63af58db8f584c67254907ae4e94f3.png)

#### 7，继续next

![image-20240611113945622](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/1f4f75dfcd7f54829462c7c2d29442a7.png)

![image-20240611114002726](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/0c13008ee9a1d1e1183f72c35c43bc71.png)

#### 8应用配置

![image-20240611114035454](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/6d4270d294996ab871c2b30c4294bad7.png)

#### 安装完成

![image-20240611114105903](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/5d98067d284ebc5a4f2a0f7e826e6f4c.png)

![image-20240611114124344](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/304dda65991dcda94a362c317dd89ef7.png)

### 3、测试

#### 连接配置

打开连接工具，测试，其他默认，输入刚才的密码

![image-20240611114159350](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/e2ad2331a3bba355e62389fa959d0732.png)

#### 测试连接

![image-20240611114213727](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-11/f405e83eb9a2f44e07ecea2e2e9791fc.png)

大功告成！

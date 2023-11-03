---
title: alist配置
abbrlink: 34872
categories: 网盘
tags: alist
date: 2023-07-31 09:33:25
---
## Alist+RaiDrive挂载阿里云盘

记录挂载阿里云盘，alist加阿里云盘实在太香了~

Alist + RaiDrive 实现网盘挂载，Alist可以添加很多类型网盘，[如阿里云盘](https://www.aliyundrive.com/drive)、百度云盘、天翼云盘等等

### 安装AList

AList 的安装方式有很多，这里我以 Windows 的手动安装为例

1. alist[下载链接](https://github.com/alist-org/alist/releases/tag/v3.16.3)，找到自己相应的系统版本并下载

![image-20231020153008960](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/773e467b3771f428b5fdf5960a6ec39f.png)

2. 解压文件，并将 `alist.exe` 文件置于一个单独的文件夹

   （刚下好的里面只有一个alist.exe文件）

3. 点击上方地址栏，输入`cmd`回车

   ![image-20231020153903567](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/3561ab8d0c5fd6704e21208df1d5654d.png)

4. 输入`alist server`回车，若看到`start server @ 0.0.0.0:端口号`则代表启动成功，启动成功之后不要关闭窗口
   ![image-20231020153130683](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/e332d6e2727d0ca91269597cf7b2d09e.png)

5. 用浏览器打开http://127.0.0.1:5244，点击下方登录，默认用户名为**admin**，默认密码在终端界面，登录后页面右上角会有提示

![image-20231020153759965](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/b7ee3ecb08e03645eaef917a0267cc47.png)



忘记密码新可以开一个终端 ，输入alist admin  会显示密码

![image-20231020153338900](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/2094fb6f1ceb9b7e10fb57ec3ae1f697.png)



### AList后台配置

#### 修改密码

点击下方管理，可以修改用户名和密码

![image-20231020181440083](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/e41f41a90e4922f59654b730d106bf78.png)



#### 添加存储

切换到存储选项卡，点击添加，不同网盘的配置方式不同，可看[官方文档](https://alist.nn.ci/zh/guide/drivers/aliyundrive_open.html)

![image-20231020154207543](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/162f2522a70169107962c4dc87934b01.png)

##### 阿里云盘

1. 打开 AList阿里云盘 [官方文档](https://alist.nn.ci/zh/guide/drivers/aliyundrive_open.html)，点击获取 Token
2. 将 Token 填入刷新令牌中
3. 根文件夹ID默认为`root`，若想添加单独的文件夹，只需用阿里云盘打开文件夹，网址最后的就是根文件夹ID

### 安装 RaiDrive

在 Windows 电脑上，我们可以使用 RaiDrive 将 AList 挂载到本地

1. 打开 [RaiDrive](https://www.raidrive.com/) 官网，下载最新版 RaiDrive 并安装
2. 安装完成后打开 RaiDrive，点击添加

![image-20231020154426297](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/d57942351c25f2122550bc3275963341.png)

选择 NAS 里的 Webdav，选择一个盘符，取一个名字；取消勾选**地址**，填上地址（`127.0.0.1`）和端口号，路径填 `dav`，再填上用户名和密码，点击连接

![Snipaste_2023-10-20_15-50-21](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/3f96fb4f1614cd521f0fbcdc596b521b.png)

就能在此电脑这里直接管理 AList 上的文件上的文件

![image-20231020155138821](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-20/8f6bb2de60a98111602c8015811c148b.png)

> 注意：因为`RaiDrive`无法识别容量所以才显示`7.99EB`

好了，这时候就挂在成功啦！

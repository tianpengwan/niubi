---
title: 📪安装Centos7
date: 2024-11-24 16:40:51
categories: 开发
tags: centos
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17328623557461732862354912.png
---
#### 1、虚拟机安装向导

打开虚拟机VMware，新建虚拟机，选择自定义模式

![image-20241123144044987](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/dd25a6d109653f994a69076dbd3532ed.png)

![image-20241123144119546](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/555a7b74709f581dc5acee7014b54737.png)

这里选稍后安装操作系统

![image-20241123144137666](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/e1a5836c0913b33757986c29af0d5da6.png)

选linux 操作系统

![image-20241123144200243](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/6e03e3339da219a96c2a4c4170cb780b.png)

给虚拟机起名字

![image-20241123144248890](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/9b90ed60860afec08f642cde1c02e2c5.png)

这里处理器不用选太多，8就够了

![image-20241123144313842](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/e2079fd9d0be87e50249bf429d93b276.png)

内存不能小于处理器数量，选10G或者16G

![image-20241123144331659](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/ff36a92b722563e6566837795c36edb1.png)

一路默认，这里确保选NAT

![image-20241123144348475](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/8655bbb094c1b9a661bcc2fceb919319.png)

![image-20241123144403155](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/d8739dca72d0d6c024badcbe4acda961.png)

![image-20241123144418531](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/ce22f9cdd1f7118ad0fbc21d77f12361.png)

![image-20241123144433715](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/bc49edb6ba737b437e5caec57b82b1c2.png)

这里可以多填一些，20G

![image-20241123144452451](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/34022e4b881d87e86c8032083f9d20ea.png)

![image-20241123144509698](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/a15cec10cbbeadc6bed4c048c65ff99e.png)

自定义硬件，去配置linux iso文件

![image-20241123144529034](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/81da0677a8ae5a114e9c6d86892bb44a.png)

![image-20241123144641979](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/76abf9b9a80927a43649e6829a1f2d05.png)

centos7 iso地址

访问[阿里云镜像站](https://mirrors.aliyun.com/centos/7/isos/x86_64/) ，选择标记镜像文件下载

![image-20241123144801982](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/d5169d7319f1abf4c6659f70c224fa53.png)

#### 2、启动虚拟机

![image-20241123145518401](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/5ece9fe260fafea596d99e72e472ff3c.png)

安装centos7

![image-20241123145544495](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/a50adb5221ffd1fb71be824a8c1d051e.png)

安装过程

![image-20241123145653793](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/b3452473eb3def169c502ce2649d4d14.png)

选择安装语言

![image-20241123145734000](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/561c8788d05c5c3b2313fe630ad69f40.png)

进入安装信息摘要

![image-20241123145800154](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/cb339230516424e49ce62b4b601cd683.png)

安装位置默认![image-20241123145826176](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/43aa14acd58b7d94a9fae9ca7fbce145.png)

进去，点个完成![image-20241123145855560](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/a0b4925d98347776bdc9aec798d915c8.png)

软件选择，选最小安装，附加选项全选

![image-20241123145936040](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/6b14da0e80eb52b765e2135c96fc5ef7.png)

![image-20241123150021584](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/9a3696a2cdc435d5ac7e472db605a40b.png)

网路和主机名

![image-20241123150049416](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/ad946a2c55216d2fd58de441db1be39a.png)

![image-20241123150205384](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/1fec9e5186703b2381d51f51c98e77fd.png)

设置好后开始安装

![image-20241123150250225](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/74b666ff6bcadeb0423c3569a07dde37.png)

设置root密码![image-20241123150332854](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/07992858000248299473758646a690d5.png)

提示密码太短在点一次完成就行![image-20241123150343775](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/e0f543abe414af279816fd0d2fd2fbb4.png)

不用创建其他用户

![image-20241123150410540](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/1f60cf0cb7dbcdde51c5c0fc8366d45a.png)

完成之后重启虚拟机

![image-20241123150636372](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/6362bf577de7b3a3541c02fb8c1ea022.png)

#### 3、Xshell连接CentOS7

访问 [官网](https://www.xshell.com/zh/free-for-home-school/)，安装 xshell 和 xftp

![image-20241123150800690](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/0a3e63dc7d42998010486a8e7fd65b4c.png)

打开Xshell7新建会话

ip填刚才的ip

![image-20241123151109892](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/db9de8b7ded778d6c83b47d656ed1124.png)

没记住也可以用命令行，查看ip

```shell
ip addr
```

![image-20241123151356973](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/8996aed5bef654dfa02e023fa86087c9.png)

新建会话

![image-20241123151051893](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/c08c955ccfea163168979fffe31e4115.png)

接受保存

![image-20241123151541284](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/4fb46868b33c03f4927c1f82c8be147c.png)

输入用户名和密码

![image-20241123151615450](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/0a107a222f8c6c8de01b672355146050.png)

![image-20241123151656995](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/d64bc42c73f70a5edda6c52ed239a687.png)

登录成功

![image-20241123151724284](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/edf48c0c25e72be72d5df2c34b5fa122.png)

打开Xftp新建会话 步骤和刚才一样

登录成功之后可以把本机文件拖入到虚拟机中

![image-20241123151956354](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/930cecbbeaf8f3e617eed22f9cc9b513.png)

如果没有`wget`，要安装，访问 [阿里云镜像库](https://mirrors.aliyun.com/centos/7.9.2009/os/x86_64/Packages/)，点击下载标记版本

![image-20241123152211692](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/cae2c2003990c7331608ad253a2fde95.png)

打开 Xftp ，找到刚下载的 wget，设置虚拟机路径 `/home` ,直接用鼠标把 wget 拖拉到右侧，这样就传输过去了

![image-20241123152534932](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/50f738e89b758c9147e5a05128faaad1.png)

在Xshell里输入 `cd /home`，这样就可以看到要安装的 wget 了

![image-20241123152749466](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/c5c7cddb600484a962ca06e3b35a2afe.png)

安装 wget

```shell
rpm -ivh wget-1.14-18.el7_6.1.x86_64.rpm
```

![image-20241123153328964](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/1fb87dbda4bcf6dc25be387befe61569.png)

备份

```shell
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup
```

下载新的`CentOS-Base.repo`

```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
```



清理yum缓存，重新生成

```shell
yum clean all 
yum makecache
```

安装vim

```
 yum install vim
```

![image-20241123154943332](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/a1db4349338497685d99bf8d80fcfad4.png)

按y确定安装

![image-20241123154956492](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/6e1dc294cc321bf84d3a04e4dd6cedb7.png)

**附：Vim日常使用命令**

打开文件
vim [文件路径]/[文件名]
1-正常模式
    打开后显示为正常模式，其他模式下按Esc进入正常模式
2-命令模式
    正常模式下，按 Shift+：进入命令模式（Tips：注意英文输入模式下）

```
:w        保存不退出
:q        退出
:wq       保存并退出
:wq!      强制保存并退出
```

3-插入模式
    正常模式下，按 i 进入编辑模式

```
Ctrl+u        删除当前行
```


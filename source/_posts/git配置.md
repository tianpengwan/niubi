---
layout: title
title: git配置
date: 2024-05-11 16:27:10
categories: git
tags: git配置
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17154168758251715416874953.png
---
## git github配置

配置Git和GitHub的基本步骤如下：

### 1、安装Git：

Windows: 访问 [Git for Windows](https://gitforwindows.org/) 下载安装。

Mac: 使用Homebrew `brew install git` 或访问 [Git下载页面](https://git-scm.com/download/mac) 下载安装。

#### 2、 配置Git的用户名和邮箱：

   ```shell[Cyberpunk2077.exe - 快捷方式.lnk](..%2F..%2F..%2F..%2F..%2FGame%2F2077%2F2077%2F2077%2F2077%2FCyberpunk.2077.Ultimate.Edition.v2.12.H1-P2P%2FCyberpunk%202077%2Fbin%2Fx64%2FCyberpunk2077.exe%20-%20%BF%EC%BD%DD%B7%BD%CA%BD.lnk)
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
   ```

显示当前的Git配置

   ```shell
 git config --list
   ```

#### 3、生成SSH密钥：

   ```shell
ssh-keygen -t rsa -b 4096 -C "你的邮箱"
   ```

按照提示完成密钥生成，输入名称，可不输入，一直回车

默认会在`~/.ssh`目录下生成`id_rsa`和`id_rsa.pub`。

ssh目录

```shell
C:\Users\qiao\.ssh
```

如果生成在当前文件目录，就新建.ssh文件，再把刚才的两个文件复制过去

####   4、将SSH公钥添加到GitHub：

打开`~/.ssh/id_rsa.pub`文件，复制内容。

登录GitHub，点击右上角的用户头像 -> Settings -> SSH and GPG keys -> New SSH key。

![image-20240511152710421](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-11/86cff38b28bba32403f159e4836566c1.png)

在Title栏填写描述，将复制的公钥粘贴到Key文本区域。

![image-20240511152844190](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-11/d491eb2f90bd5c35627d566edfc677ed.png)

点击“Add SSH key”保存。

####    5、测试SSH连接：

   ```shell
ssh -T git@github.com
   ```

![image-20240511154655192](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-11/554cbe5023d4b84c35e849da646d55ef.png)

如果看到类似于 "Hi username! You've successfully authenticated, but GitHub does not provide shell access." 的消息，说明SSH设置成功


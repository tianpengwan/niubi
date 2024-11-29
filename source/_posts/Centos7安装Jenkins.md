---
title: 📬Centos7安装Jenkins
date: 2024-11-27 16:40:51
categories: 开发
tags: centos
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17328625687471732862567977.png
---
## Jenkins 安装

### 当前环境

- CentOS 7.8
- Java 11（注意当前 jenkins 支持的 Java 版本最低为 Java11）
- FinalShell 3.9（操作环境）

### 一、linux安装 Jenkins

#### 1. 添加 Jenkins 源

执行下面两条命令：

```shell
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo --no-check-certificate
rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
```

#### 2. 通过 yum 安装 Jenkins

```shell
yum -y install jenkins
```

如果没有安装上

![image-20241124140941773](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-24/613eee72242fa7dc6fa6c2b5c538ed6c.png)

**安装Jenkins时遇到“没有可用软件包”的错误，通常是因为以下几个原因**‌：

1. ‌**本地仓库中没有包含Jenkins的官方软件源**‌：确保你的系统中已经包含了Jenkins的官方软件源。可以通过添加额外的仓库如`epel-release`来解决。具体步骤如下：
   - 运行命令 `yum install epel-release -y` 来安装`epel-release`。
   - 运行命令 `yum-config-manager --enable epel` 来启用该仓库‌。



#### 3. 修改 Jenkins 端口号

1. Jenkins 默认端口号为 8080，输入`vim /etc/sysconfig/jenkins`进行编辑，将 JENKINS_PORT 修改为自己想要的端口号，前提得保证修改后的这个端口没有被其他的进程占用。
2. 这里修改了可能还不能生效，还需要修改另一个地方，输入以下指令进行编辑

```shell
vim/usr/lib/systemd/system/jenkins.service
#找到下面的文字 
Environment="JENKINS_PORT=8080"
#修改为自己想要的端口号 
#:wq退出
```

 3. 修改完成后，重新加载配置文件，随后再重启 Jenkins，此时的启动端口应该已经变成你修改的端口号了。

```shell
#重新加载配置文件 
systemctl daemon-reload
#重启jenkins 
systemctl restart jenkins
```

#### 启动 Jenkins

Jenkins 可以单独指定 Java 路径，在`/etc/init.d/jenkins`文件加上你的 java 路径即可：

```
candidates="/usr/local/jdk/jdk-11.0.25/bin/java"
```

![image-20241123212740526](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/ec9df1e3417b524f11e9e1bd488fe209.png)

1. 输入`service jenkins start`，会弹出提示：Starting jenkins (via systemctl):，意思是正在启动，第一次启动比较耗时，此时耐心等待。如果提示超时失败，没关系，jenkins 仍然在启动，只是第一次启动比较耗时。
2. 如果提示内容不是超时失败，那大概率是你的 Java 没安装好或者版本不对。
3. 放行刚刚配置的端口

```
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key 
apt-key add -sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ >/etc/apt/sources.list.d/jenkins.list'
apt-get update
apt-get install jenkins
```

```
vim /etc/sysconfig/jenkins
```

![image-20241124005442637](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-24/c580df8553b9755f72d1193ada7b8c64.png)



### 二、WAR文件（推荐）

Jenkins的Web应用程序ARchive（WAR）文件版本可以安装在任何支持Java的操作系统或平台上。

**要下载并运行Jenkins的WAR文件版本，请执行以下操作:**

1. 将[最新的稳定Jenkins WAR包](http://mirrors.jenkins.io/war-stable/latest/jenkins.war) 下载到您计算机上的相应目录。
2. 在下载的目录内打开一个终端/命令提示符窗口到。
3. 运行命令java -jar jenkins.war
4. 浏览http://localhost:8080并等到*Unlock Jenkins*页面出现。
5. 继续使用[Post-installation setup wizard](https://www.jenkins.io/zh/doc/book/installing/#setup-wizard)后面步骤设置向导。

将[最新的稳定Jenkins WAR包](http://mirrors.jenkins.io/war-stable/latest/jenkins.war)下载到您计算机上的相应目录。

**Notes:**

- 不像在Docker中下载和运行有Blue Ocean的Jenkins，这个过程不会自动安装Blue Ocean功能， 这将分别需要在jenkins上通过 [**Manage Jenkins**](https://www.jenkins.io/zh/doc/book/managing) > [**Manage Plugins**](https://www.jenkins.io/zh/doc/book/managing/plugins/)安装。 在[Getting started with Blue Ocean](https://www.jenkins.io/zh/doc/book/blueocean/getting-started/)有关于安装Blue Ocean的详细信息 。.
- 您可以通过`--httpPort`在运行`java -jar jenkins.war`命令时指定选项来更改端口。例如，要通过端口9090访问Jenkins，请使用以下命令运行Jenkins： `java -jar jenkins.war --httpPort=9090`

```
java -jar jenkins.war --httpPort=9099
```

81f7f372edd54dcba39a02c5de228853

![image-20241125094610884](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-25/4f364e45dcc6e06706c565bff67fc796.png)



![image-20241125094937159](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-25/84f9ea466573edfb39ac945cfc80dcac.png)





![image-20241125095011287](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-25/6e04161c794eb8f403ecc1898a4cb0ce.png)





![image-20241125095030942](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-25/40d5f37b30728cc89bef430536a7e750.png)



![image-20241125095142463](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-25/ff91ecec2214ec33a11c4aedae84eb91.png)

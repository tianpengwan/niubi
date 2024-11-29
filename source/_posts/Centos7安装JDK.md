---
title: 📭Centos7安装JDK
date: 2024-11-25 16:40:51
categories: 开发
tags: centos
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17328624797461732862479440.png
---
### 安装JDK

去[官网](https://www.oracle.com/java/technologies/downloads/#java8)下载JDK8

![image-20241123155725832](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/db245c9fab6841d9e53a149343e77ca4.png)

通过Xftp拖入到虚拟机

![image-20241123160103652](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/134db244a64f0bf750aaa8b25d56d3bc.png)



进入安装目录解压：

```
tar -zxvf jdk8.tar.gz
```

![image-20241123170103356](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/a5278ec15a70f213f212a1fe9d8cb2a4.png)

修改解压后的名称

![image-20241123170136044](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/e2b73119ea144907ee586bd133aa23fe.png)

修改配置文件：

```
vim /etc/profile
```

添加配置：

![image-20241123170227510](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/7a77beb85e6bef759fc797be674235ee.png)

```shell
export JAVA_HOME=/usr/local/jdk1.8 export CLASSPATH=$:CLASSPATH:$JAVA_HOME/lib/ export PATH=$PATH:$JAVA_HOME/bin
```

​          

刷新配置：

```
source /etc/profile
```

​     

任意一个目录 查看java 版本

```shell
java -version
```

![image-20241123170407886](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/7e93be5ddad32d0da64e7a81503a602e.png)

出来版本则安装成功

### 安装maven

进入[官网](https://maven.apache.org/download.cgi)  选择下载maven版本

![image-20241123171139920](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/429a310fc65ab9e974b84bfbf584dd61.png)

下载到本地后通过Xftp传输到虚拟机

![image-20241123172356350](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/ea36a68de8cc8181e1969b2941431cc1.png)

解压

```shell
tar -zxvf apache-maven-3.9.9-bin.tar.gz
```

![image-20241123172608037](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/3d224f8428cc0a113c415bdee0be1d39.png)

设置环境变量

```
vim /etc/profile
```

![image-20241123172950798](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/75c344fead6d9be1ba2ac47c0df830b2.png)

```shell
export MAVEN_HOME=/usr/local/maven/apache-maven-3.9.9
export PATH=$PATH:$MAVEN_HOME/bin
```

刷新配置：

```shell
source /etc/profile
```

​     

任意一个目录 查看maven版本

```shell
mvn -version
```

![image-20241123173204098](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/01b30b9de453418c9b27ec237921ee5b.png)

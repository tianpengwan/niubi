---
title: 📫Centos7安装Docekr
date: 2024-11-26 16:40:51
categories: 开发
tags: centos
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17328625120141732862511760.png
---
#### 1.卸载旧版

首先如果系统中已经存在旧的Docker，则先卸载：

```shell
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine \
    docker-selinux 
```

确保有root 权限，没有的话需要加 sudo 



#### 2.配置Docker的yum库

安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。

```shell
yum install -y yum-utils device-mapper-persistent-data lvm2
```

使用以下命令来设置稳定的仓库。阿里云仓库

```shell
yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

输入命令安装docker 和 containerd：      

```shell
yum install -y docker-ce docker-ce-cli containerd.io
```

docker-ce为社区免费版本

#### 3.启动 Docker

```shell
systemctl start docker
service docker start
```

   关闭和重启

```shell
systemctl stop docker  # 停止docker服务
systemctl restart docker  # 重启docker服务
```

验证是否安装成功

```shell
docker version   
```

![image-20241123141502560](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-11-23/04d8d978411a4125a604f986feb2f605.png)

设置开机自启

```shell
systemctl enable docker
```

 

#### 设置阿里云镜像

****

​    **阿里云镜像加速**

```shell
mkdir -p /etc/docker 

tee /etc/docker/daemon.json <<-'EOF' {  "registry-mirrors": ["https://3n4m4jry.mirror.aliyuncs.com"] } EOF             
```



重新加载文件并重启docker

```
systemctl daemon-reload
systemctl restart docker
```


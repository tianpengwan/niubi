---
title: 🍉Linux安装mysql5
date: 2022-10-12 16:05:31
categories: 开发
tags: mysql
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161896821131716189681529.png
---

## 一、下载mysql安装包

```shell
wget http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
```

## 二、安装mysql

```shell
yum localinstall mysql57-community-release-el7-8.noarch.rpm 
```

## 三、检测是否安装成功

```shell
yum repolist enabled | grep "mysql.*-community.*"
```

## 四、选择安装版本

```shell
#进入此文件可以看到mysql5的各种版本
#其中enabled=1是选择安装，enabled=0是不安装，文件内默认为5.7
vim /etc/yum.repos.d/mysql-community.repo    
```

#### mysql-community.repo文件

```shell
[mysql-connectors-community]
name=MySQL Connectors Community
baseurl=http://repo.mysql.com/yum/mysql-connectors-community/el/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

[mysql-tools-community]
name=MySQL Tools Community
baseurl=http://repo.mysql.com/yum/mysql-tools-community/el/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
[mysql-connectors-community]
name=MySQL Connectors Community
baseurl=http://repo.mysql.com/yum/mysql-connectors-community/el/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

[mysql-tools-community]
name=MySQL Tools Community
baseurl=http://repo.mysql.com/yum/mysql-tools-community/el/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

# Enable to use MySQL 5.5
[mysql55-community]
name=MySQL 5.5 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.5-community/el/7/$basearch/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

# Enable to use MySQL 5.6
[mysql56-community]
name=MySQL 5.6 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.6-community/el/7/$basearch/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

[mysql57-community]
name=MySQL 5.7 Community Server
baseurl=http://repo.mysql.com/yum/mysql-5.7-community/el/7/$basearch/
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql

[mysql-tools-preview]
name=MySQL Tools Preview
baseurl=http://repo.mysql.com/yum/mysql-tools-preview/el/7/$basearch/
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-mysql
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556
```

## 五、安装mysql

```shell
yum install mysql-community-server 
#直接这样安装5.7可能会报以下错误
# 若没有报以下错误直接跳过解决问题的命令
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/0450ba8fe8864a61b20e772f87d9889c.png)

> 导致这样的原因是MySQL GPG 密钥已过期导致使用下方命令重新进行安装

```shell
 # 更新GPG秘钥
 #安装mysql
rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022 
yum install mysql-community-server  
```

![安装成功](https://img-blog.csdnimg.cn/0408a3070fb84f1caa0194596de8d40b.png)

## 六、开启mysql并设置自启

```shell
# 开启mysql服务
 # 设置开机自启
systemctl start mysqld    
systemctl enable mysqld  
```

## 七、修改mysql的密码

### 7.1、mysql5.7

#### 7.1.1、查看初始密码

```shell
# 在安装完mysql5.7后，会自动生成一个密码，使用下方命令可查看密码：
grep 'temporary password' /var/log/mysqld.log   
```

![密码](https://img-blog.csdnimg.cn/23894edc47e74fb6940c68d1b6a5444e.png)

#### 7.1.2、修改密码

```shell
 # 登录mysql 使用上方命令查看的密码进行登录
# 此处修改密码有限制规则  这里进行修改规则

 #设置密码的长度为4位以上
 #设置密码的简易程度最低
 #修改root用户的密码为root
mysql -uroot -p 
set global validate_password_length=4;  
set global validate_password_policy=0;    
set password for 'root'@'localhost'=password('root');   
```

### 7.2、mysql5.6

```shell
#跳过密码进行登录
#修改root用户的密码为root 
mysql -uroot --skip-password 
set password for 'root'@'localhost'=password('root');  
```

## 八、设置远程登录

```shell
 GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION;
```




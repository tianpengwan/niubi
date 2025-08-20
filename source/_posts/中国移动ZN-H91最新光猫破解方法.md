---
abbrlink: 35a
categories:
  - - 技术教程
cover: 'https://ghtpdl.20010501.xyz/tptp/mmexport1733481756261.png'
date: '2024-12-06T02:34:06.117560+08:00'
tags:
  - 光猫破解
  - 中国移动
title: 中国移动ZN-H91最新光猫破解方法
updated: '2024-12-09T00:52:40.551+08:00'
---
# 中国移动ZN-H91最新光猫破解方法

## 步骤1

光猫后面账户密码登录浏览器输入：

```

http://192.168.1.1/cgi-bin/getGateWay.cgi

```

显示 `yes` 不行就刷新一下就可以了。

## 步骤2

![mmexport1733478621897.png](https://ghtpdl.20010501.xyz/tptp/mmexport1733478621897.png)连接 Telnet：![mmexport1733478625467.png](https://ghtpdl.20010501.xyz/tptp/mmexport1733478625467.png)

- IP 地址：`192.168.1.1`
- 账户：`CMCCAdmin`
- 密码：`s2@We3%Dc#`

## 步骤3

输入代码：

```bash

vi /var/romfile.cfg

```

## 步骤4

![mmexport1733478628919.png](https://ghtpdl.20010501.xyz/tptp/mmexport1733478628919.png)查看代码第183行，代码如下：

- 账户：`admin`
- 密码：`Qxg%1oyy`

```xml

<TR64Entry/>

<Entry0 Active="Yes" username="admin" web_passwd="Qxg%1oyy" display_mask="FF FF FF FF FF F"/>

<Entry1 Active="Yes" username="user" web_passwd="1ad722bb" display_mask="BF 00 0F 19 07 00"/>

<Entry2 Active="Yes" username="user3" web_passwd="1234" display_mask="AF 00 07 08 07 00 03"/>

<FtpEntry Active="No" ftp_username="admin" ftp_passwd="1234" ftp_port="21" />

<ConsoleEntry Active="Yes" console_username="admin" console_passwd="1234" />

</Account>

```

![mmexport1733481756261.png](https://ghtpdl.20010501.xyz/tptp/mmexport1733481756261.png)

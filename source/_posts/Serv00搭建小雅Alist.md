---
abbrlink: ''
categories:
- - 技术教程
date: '2024-08-09T11:22:31.723483+08:00'
cover: https://ghtpdl.20010501.xyz/Qexo/24/8/OIP-C%20(1)_7f66845f09cc8a86ba80f4084b9071b3.jfif
tags:
- Serv00
- 小雅Alist
- GitHub
- FreeBSD
title: Serv00搭建小雅Alist
updated: '2024-08-16T15:52:59.219+08:00'
---
在Serv00搭建小雅Alist的步骤可能会有些复杂，但我会尽量清晰地为您说明。请注意，由于Serv00的环境和配置可能随时间变化，以下步骤仅供参考，具体操作时请以Serv00的最新文档和指南为准。

### 1. 前期准备

#### 1.1 注册Serv00账号

* 前往Serv00官网注册账号，并确保填写的信息真实有效。
* 注册完成后，根据邮件提示进行账户验证和登录。

#### 1.2 获取必要信息

* 登录Serv00控制台，获取相关的MySQL数据库连接信息和SSH登录信息。

### 2. 安装Alist

由于Serv00使用的是FreeBSD系统，而Alist官方可能没有直接支持FreeBSD的版本，但您可以通过以下方式安装：

#### 2.1 查找并下载FreeBSD版本的Alist

* 在GitHub等开源平台寻找适用于FreeBSD的Alist构建版本或相关项目。[ansoncloud8/am-alist-freebsd: 根据官网alist源码自动构建alist（FreeBSD版本）可以部署文件,实现serv00部署. (github.com)](https://github.com/ansoncloud8/am-alist-freebsd)
* 下载最新版本的Alist可执行文件到Serv00服务器。

#### 2.2 设置Alist

* 将下载的Alist文件放置在适当的位置，例如在`~/domains/alist`目录下。
* 赋予Alist执行权限：`chmod +x alist`。
* 首次运行Alist以生成配置文件（此时可能需要设置一些基础信息）：`./alist server`。
* 根据首次运行生成的提示和说明，对Alist进行基本配置。

---
abbrlink: ''
categories:
- - 技术教程
cover: https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEWqSxqSnBTgG3uTOi1Esrdg2n1X_gETgACNCgAApTnUVYCGdRKF0_GUjwE.png
date: '2026-07-05T22:49:47.239609+08:00'
tags:
- 监控
title: 99元/年阿里云服务器搭建大华摄像头智能云回放（Frigate+ZLMediaKit极简方案）
updated: '2026-07-05T22:49:48.796+08:00'
---
前两天回老家发现监控云回放功能没有了，这摄像头不就成了个摆设了吗？

![BQACAgUAAyEGAASHRsPbAAEWqUFqSnGfHunKo6G7L_y9nkvDUVxEVQACTCgAApTnUVaE_S2LjGLAWjwE.jpg](https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEWqUFqSnGfHunKo6G7L_y9nkvDUVxEVQACTCgAApTnUVaE_S2LjGLAWjwE.jpg)

发现开通还挺贵的，想到还有一个阿里云的服务器所以就搭建了一套低成本、高实用的监控云回放搭建方案：依托99元/年超低价阿里云轻量服务器，搭配中国电信宽带、大华摄像头，通过ZLMediaKit流媒体转发+Frigate智能事件录像架构，完美实现远程实时查看、智能云回放功能。


先看成果图（猫猫都能识别哦）

![BQACAgUAAyEGAASHRsPbAAEWqUZqSnIfhLFuxhiRnGPI8jVyz-r2_AACUSgAApTnUVaDCGqb8MvPHjwE.jpg](https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEWqUZqSnIfhLFuxhiRnGPI8jVyz-r2_AACUSgAApTnUVaDCGqb8MvPHjwE.jpg)

![BQACAgUAAyEGAASHRsPbAAEWqUlqSnJn5PwAAdXh6H_QqAjTBlLYLiMAAlQoAAKU51FWh8VndgHGjOE8BA.jpg](https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEWqUlqSnJn5PwAAdXh6H_QqAjTBlLYLiMAAlQoAAKU51FWh8VndgHGjOE8BA.jpg)

整套方案最大的核心优势是按需录像、极致省存储，摒弃传统24小时不间断录制的冗余模式，仅在画面发生异动时自动保存录像，最大程度利用低配服务器存储空间，百元级成本实现媲美商用NVR的监控效果，新手也能零基础落地。

一、方案整体架构与优势

1. 核心设备与环境

- 服务器：阿里云99元/年轻量应用服务器（低配够用、性价比拉满）
- 网络环境：中国电信家用宽带（稳定性强，适配监控流传输）
- 监控设备：大华IP摄像头（支持RTSP推流协议，市面主流型号通用）
- 核心服务：ZLMediaKit（流媒体转发、拉推流调度）+ Frigate（AI智能检测、事件录像存储）

2. 方案核心亮点
   1. 存储节能：Frigate智能识别画面变动，无人无异动不录像，节省80%以上存储空间
   2. 流畅稳定：ZLMediaKit优化流媒体传输，适配电信宽带，远程预览、回放无卡顿，可以使用局域网直接传。
   3. 自主可控：所有录像文件存储在个人阿里云服务器，隐私安全不泄露，随时远程调取

二、前期准备工作

1. 阿里云99元/年服务器一台，已安装CentOS/Debian系统，开放服务器80、443、8888、554等流媒体常用端口
2. 大华摄像头正常通电联网，与路由器局域网连通
3. 手机安装「大华云商APP」，完成摄像头初始化绑定
4. 服务器预装Docker、Docker-Compose环境（低配服务器一键安装即可，适配性无压力）

三、详细搭建实操步骤

第一步：大华云商APP配置摄像头推流地址

这是设备接入的基础步骤，需先让摄像头稳定推送视频流至服务器：

1. 手机打开大华云商APP，登录账号后，自动搜索并绑定已联网的大华摄像头，完成设备初始化、密码重置、局域网激活
2. 进入摄像头「设备设置」-「高级设置」，找到RTSP推流配置选项
3. 自定义摄像头推流地址，格式适配ZLMediaKit接收规则，填写服务器公网IP+自定义端口与流名称，保存配置
4. 配置完成后，重启摄像头，确保设备正常在线、推流无中断，为后续流媒体转发做好铺垫

第二步：Docker部署两大核心服务（ZLMediaKit+Frigate）

整套服务采用Docker容器化部署，无需复杂编译，一键启动、自动适配低配服务器资源，互不冲突。

1. 部署ZLMediaKit流媒体服务

ZLMediaKit负责接收大华摄像头的RTSP推流，完成视频流转发、转码，支撑实时预览与回放调取，是监控流传输的核心：

1. 服务器终端执行ZLMediaKit官方Docker部署命令，拉取最新镜像并创建容器
2. 映射服务器8080、554、1935等核心端口，开启后台持久运行模式
3. 部署完成后，通过「服务器IP+8080端口」访问ZLMediaKit后台，查看流接收状态，确认大华摄像头推流已成功接入、无丢包、无报错。

2. 部署Frigate智能监控录像服务

Frigate作为核心智能NVR服务，负责画面检测、事件识别、录像存储，是实现省存储回放的关键：

1. 终端执行Docker部署命令，拉取Frigate镜像，创建独立容器
2. 配置容器挂载目录，将录像存储路径映射至服务器本地目录，方便后续调取回放文件
3. 查看docker ZLMediaKit服务本地IP地址连接速度快不卡顿

第三步：Frigate核心配置——异动触发录像（省存储核心）

这是我的配置可以直接使用


默认监控设备24小时持续录像，会快速耗尽低配服务器存储空间，我们通过精准配置，实现仅画面变动时录制：

1. 进入Frigate配置文件，修改核心录像规则，关闭「24小时不间断录像」模式
2. 开启AI异动检测功能，自定义检测灵敏度，可识别人员、车辆、移动物体等有效画面变动，过滤光影晃动、蚊虫飞过等无效干扰
3. 设置录像策略：画面无变动时自动暂停录制，检测到异动瞬间启动预录+全程录制，异动结束后延时几秒停止保存
4. 配置录像存储时效、文件压缩规则，自动清理过期录像，循环利用存储空间，彻底解决低配服务器存储不足问题
5. 保存配置并重启Frigate容器，使智能录像规则生效

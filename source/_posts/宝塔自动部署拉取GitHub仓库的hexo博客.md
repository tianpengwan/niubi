---
abbrlink: ''
categories:
- - 技术教程
date: '2025-08-17T18:40:51.053688+08:00'
tags:
- hexo
title: 宝塔自动部署拉取GitHub仓库的hexo博客
updated: '2025-08-18T02:50:50.160+08:00'
---
事情的起因是我要无意间发现了之前申请的{% label 又拍云cdn免费试用活动 blue %}。刚好我感觉部署在{% label Cloudflare purple %}的速度太慢了，于是我就想体验一下国内的cdn加速是什么感觉。用{% label Cloudflare purple %}页面规则

"20010501.xyz/*"到

"cn.20010501.xyz/*"。但是又拍云cdn服务都是需要备案和国内主机的，所以不得不把{% label GitHub red %}上的博客文件部署到{% label 阿里云服务器 green %}上。因为我之前使用的是{% label GitHub red %}当仓库，{% label Cloudflare purple %}部署生成，{% label qexo orange %}管理。所以我还是打算继续使用{% label qexo orange %}，把服务器作为一个静态页面生成器使用。



总体思路是{% label qexo orange %}管理{% label GitHub red %}文件生成（{% label Cloudflare purple %}+{% label 阿里云服务器 green %}+其他页面生成器） 这里需要示意图



以下是使用{% label 宝塔面板 blue %}实现{% label GitHub red %}仓库中的Hexo博客自动部署到服务器的完整流程（当{% label GitHub red %}文件变化时触发自动部署）：



📦 1. 服务器环境准备



- 安装{% label 宝塔面板 blue %}执行对应系统的安装命令（以Ubuntu为例）：

"wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec"安装后记录面板地址、用户名和密码，确保安全组放行

""8888""端口。

- 安装依赖在{% label 宝塔面板 blue %}的“软件商店”安装：

   - {% label Nginx purple %}：用于托管静态博客文件。

   - {% label Git green %}：用于拉取{% label GitHub red %}代码。



⚙️ 2. 配置{% label 宝塔面板 blue %}{% label WebHook插件 orange %}



1. 在{% label 宝塔面板 blue %}的“软件商店”搜索并安装{% label WebHook插件 orange %}。

2. 添加{% label WebHook插件 orange %}脚本：

   - 脚本名称：如

""Hexo-Auto-Deploy""

   - 执行命令：填写部署脚本（见下方脚本示例）。

#!/bin/bash

cd /www/wwwroot/你的网站目录  # 替换为实际路径

git reset --hard

git pull origin main  # 根据分支名调整（如main或master）

# 若需重新生成Hexo静态文件（如仓库含Hexo源码）：

# npm install && hexo clean && hexo g

3. 保存后复制生成的{% label WebHook URL orange %}（形如

""http://服务器IP:端口/hook?access_key=密钥""）。



🔗 3. {% label GitHub red %}仓库设置WebHook



1. 进入{% label GitHub red %}仓库 → Settings → Webhooks → Add webhook。

2. 填写配置：

   - Payload URL: 粘贴{% label 宝塔面板 blue %}生成的{% label WebHook URL orange %}

   - Content type: 

""application/json""

   - Secret: 留空（或与{% label 宝塔面板 blue %}{% label WebHook插件 orange %}密钥一致）

   - 触发事件: 选择

""Just the push event""

3. 新建一个静态页面根目录设置为

"hexo public"这个文件夹——这是{% label Hexo blue %}生成静态网站的输出目录。当你运行

"hexo generate"命令后，{% label Hexo blue %}会将

"source"文件夹中的Markdown文件和主题文件等转换为HTML，并保存在

"public"目录下。这个目录是最终用于发布的网站内容。

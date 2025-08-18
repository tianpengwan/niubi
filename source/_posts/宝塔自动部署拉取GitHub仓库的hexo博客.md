---
abbrlink: ''
categories:
- - 技术教程
cover: https://cftcr2.20010501.xyz/PicHoro/1755479687394(1).webp
date: '2025-08-17T18:40:51.053688+08:00'
tags:
- hexo
title: 宝塔自动部署拉取GitHub仓库的hexo博客
updated: '2025-08-18T09:44:45.147+08:00'
---

{% p blue, **背景与需求** %}
无意间发现又拍云CDN的免费试用活动（提供每月 **10GB存储+15GB流量**）[1](@ref)。由于原部署在 **{% span red, Cloudflare %}** 的博客访问速度较慢（尤其国内用户），希望改用国内CDN加速服务。但国内CDN需满足 **{% u 备案域名 %}** 和 **{% u 国内服务器 %}** 两大条件[2,3](@ref)，因此需将GitHub托管的博客迁移至阿里云服务器。

{% p green, **解决方案设计** %}
保留 **{% span purple, qexo %}** 作为博客管理系统，将阿里云服务器作为静态资源生成节点，形成多平台协同架构：

qexo管理 → GitHub仓库 → 触发自动部署 → 阿里云服务器生成静态页面 → 又拍云CDN加速


{% folding 更新: 技术实现细节, blue %}
**通过宝塔面板实现GitHub到服务器的自动部署流程：**
1. **服务器环境配置**  
   - 安装宝塔面板：执行 `wget -O install.sh https://download.bt.cn/install/install_6.0.sh && sh install.sh`[9](@ref)  
   - 创建Git仓库：`git init --bare blog.git` 并配置钩子文件 `post-receive`[12](@ref)  

bash

!/bin/sh

git --work-tree=/www/wwwroot/blog --git-dir=/home/git/repos/blog.git checkout -f

2. **本地与服务器联动**  
- 在Hexo的 `_config.yml` 中新增阿里云部署地址：  

yaml

deploy:

- type: gitrepo: git@server:/home/git/repos/blog.gitbranch: master

- 添加SSH公钥到服务器 `authorized_keys` 实现免密推送[9](@ref)  
3. **自动化触发**  
GitHub Actions 或 Webhook 监听仓库更新，推送后自动执行：  

bash

hexo clean && hexo g && hexo d

{% endfolding %}

{% p orange, **关键优势** %}
- **速度提升**：国内用户通过又拍云CDN访问，延迟降低50%+[3](@ref)  
- **无缝管理**：继续使用qexo编辑内容，GitHub仍为版本控制核心  
- **资源免费**：又拍云联盟提供12个月免费资源（需在网站底部添加其LOGO及链接）[1](@ref)

{% btns rounded grid5 %}
{% btn https://blog.anheyu.com/posts/d50a.html, 安知鱼标签语法, %}
{% btn https://www.upyun.com/league, 又拍云联盟, %}
{% btn https://blog.csdn.net/2302_80729149/article/details/146304980, 宝塔部署指南, %}
{% endbtns %}


![1755477834160.webp](https://cftcr2.20010501.xyz/PicHoro/1755477834160.webp)
就是这样咯

---

### 🛠️ 一、服务器环境准备

1. **安装宝塔面板**
   
   执行对应系统的安装命令（以 Ubuntu 为例）：
   
   ```
   wget -O install.sh https://download.bt.cn/install/install-ubuntu_6.0.sh && sudo bash install.sh ed8484bec
   ```
   
   * 安装后记录面板地址、用户名和密码，确保安全组放行端口。
2. **安装依赖**
   
   在宝塔面板的“软件商店”安装以下组件：
   
   * **Nginx**：托管静态博客文件。
   * **Git**：拉取 GitHub 代码。
   * **Node.js**：JavaScript 运行环境。

---

### ⚙️ 二、配置宝塔 WebHook 插件

1. **拉取 Hexo 静态文件到网站目录**
   
   ```
   cd /www/wwwroot
   git clone git@github.com:你的用户名/Hexo仓库.git hexo
   # 修改目录权限（根据实际需求操作）
   ```
   
   ![mmexport1755476054606.webp](https://cftcr2.20010501.xyz/PicHoro/mmexport1755476054606.webp)
2. **添加 WebHook 脚本**
   
   * 在宝塔面板安装 **WebHook 插件**。
     ![mmexport1755476060516.webp](https://cftcr2.20010501.xyz/PicHoro/mmexport1755476060516.webp)
   * 添加脚本：
     
     **名称**：如 `Hexo-Auto-Deploy`
     
     **执行脚本**：
     
     ```
     #!/bin/bash
     git config --global --add safe.directory /www/wwwroot/blog.example.com
     echo "------------------------------------------------"
     echo "[$(date +"%Y-%m-%d %H:%M:%S")] WebHook触发开始执行"
     
     cd /www/wwwroot/blog.example.com || { echo "错误：目录不存在！"; exit 1; }
     git stash save "Auto-stash by webhook on $(date +'%Y-%m-%d')"
     echo "✅ 本地修改已暂存"
     
     git_output=$(git pull 2>&1)
     git_status=$?
     git stash pop
     if [ $? -ne 0 ]; then
         echo "⚠️ 注意：恢复时存在冲突，请手动检查以下文件："
         git diff --name-only --diff-filter=U
     fi
     
     if [ $git_status -ne 0 ]; then
         echo "代码拉取失败！错误信息："
         echo "$git_output"
         exit 1
     else
         echo "代码更新成功："
         echo "$git_output"
     fi
     
     npm install --no-fund --silent 2>&1
     [ $? -eq 0 ] && echo "✅ 依赖安装完成" || { echo "❌ 依赖安装失败"; exit 1; }
     
     echo "---- 构建开始 ----"
     npx hexo generate --silent 2>&1
     [ $? -eq 0 ] && echo "✅ 静态文件生成成功" || { echo "❌ 生成失败"; exit 1; }
     
     PUBLIC_DIR="/www/wwwroot/blog.example.com/public"
     chown -R www:www "$PUBLIC_DIR"
     chmod 755 -R "$PUBLIC_DIR"
     echo "权限已更新: $(ls -ld $PUBLIC_DIR)"
     echo "------ 部署完成 [耗时: ${SECONDS}s] ------"
     exit 0
     ```
   * 保存后复制生成的 **WebHook URL**（形如 `http://服务器IP:端口/hook?access_key=密钥`）。

---

### 🔗 三、GitHub 仓库设置 WebHook

1. 进入仓库 → **Settings → Webhooks → Add webhook**。
2. 配置参数：
   
   * **Payload URL**：粘贴宝塔生成的 WebHook URL。
     ![mmexport1755476057459.webp](https://cftcr2.20010501.xyz/PicHoro/mmexport1755476057459.webp)
   * **Content type**：`application/json`。
   * **Secret**：留空。
   * **触发事件**：选择 `Just the push event`。

---

### 🌐 四、部署静态网站

1. 在宝塔面板新建网站：
   
   * **根目录**设置为 `/www/wwwroot/hexo/public`（Hexo 生成静态文件的输出目录）。
2. 运行 `hexo generate`后，所有内容将保存在 `public`目录下，作为最终发布版本。
3. 为网站绑定域名，配置 HTTPS 证书。


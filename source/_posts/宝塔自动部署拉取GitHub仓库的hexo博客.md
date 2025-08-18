---
abbrlink: ''
categories:
- - 技术教程
cover: https://cftcr2.20010501.xyz/PicHoro/1755479687394(1).webp
date: '2025-08-17T18:40:51.053688+08:00'
tags:
- hexo
title: 宝塔自动部署拉取GitHub仓库的hexo博客
updated: '2025-08-18T09:20:12.644+08:00'
---
事情的起因是我要无意间发现了之前申请的又拍云cdn免费试用活动。刚好我感觉部署在Cloudflare的速度太慢了，于是我就想体验一下国内的cdn加速是什么感觉。用Cloudflare页面规则20010501.xyz/\*到cn.20010501.xyz/\*。但是又拍云cdn服务都是需要备案和国内主机的，所以不得不把GitHub上的博客文件部署到阿里云服务器上。因为我之前使用的是GitHub当仓库，Cloudflare部署生成，qexo管理。所以我还是打算继续使用qexo，把服务器作为一个静态页面生成器使用。 总体思路是qexo管理GitHub文件生成（Cloudflare+阿里云服务器+其他页面生成器） 以下是使用宝塔面板实现GitHub仓库中的Hexo博客自动部署到服务器的完整流程（当GitHub文件变化时触发自动部署）

![1755477834160.webp](https://cftcr2.20010501.xyz/PicHoro/1755477834160.webp)

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

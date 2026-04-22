---
abbrlink: ''
categories:
- - 技术教程
date: '2026-04-23T01:58:29.341989+08:00'
tags: []
title: 用CloudflareWorker+D1数据库搭建MoonTVPlus
updated: '2026-04-23T02:05:31.235+08:00'
---
<div align="center">
<img src="https://cftcr2.20010501.xyz/PicHoro/S60423-02322258_mark.webp" width="24%">
<img src="https://cftcr2.20010501.xyz/PicHoro/S60423-02323987_mark.webp" width="24%">
<img src="https://cftcr2.20010501.xyz/PicHoro/S60423-02331112_mark.webp" width="24%">
<img src="https://cftcr2.20010501.xyz/PicHoro/S60423-02340597_mark.webp" width="24%">
</div>


# 一、准备工作

你需要准备好这些账号/信息：

##### 1. Cloudflare 账号（免费即可）

##### 2. GitHub 账号（免费）

##### 3. 手机/电脑浏览器，能正常访问 Cloudflare 和 GitHub 控制台

# 二、Fork 项目仓库

##### 1. 打开项目地址：https://github.com/mtvpls/MoonTVPlus

##### 2. 点击右上角的 Fork，将仓库复制到你的 GitHub 账号下。

##### 3. 等待 Fork 完成，进入你自己的  你的用户名/MoonTVPlus  仓库页面。

# 三、创建 Cloudflare D1 数据库

##### 1. 登录 Cloudflare 控制台，进入你的账户。

##### 2. 点击左侧菜单 存储和数据库 → D1 SQL 数据库。

##### 3. 点击 创建数据库：

名称：自定义，比如  moontvplus-db

点击 创建。

![S60423-01471120_mark.webp](https://cftcr2.20010501.xyz/PicHoro/S60423-01471120_mark.webp)

##### 4. 进入数据库详情页，复制两个关键信息（后面要用）：

Database ID （页面里的 UUID）

 Account ID （CF账户ID 主页可查看）

#  四、创建 Cloudflare API Token

##### 1. 在 Cloudflare 控制台，点击右上角你的头像 → 我的资料 → API 令牌。

##### 2. 点击 创建令牌，选择 Workers模版。

##### 3. 配置权限：添加D1数据库

![S60423-01500673_mark.webp](https://cftcr2.20010501.xyz/PicHoro/S60423-01500673_mark.webp)

##### 4. 账户资源选择：包括 → 所有账户

##### 5. 点击 继续以显示摘要 → 创建令牌，复制生成的 Token（只显示一次，务必保存）。

#  五、配置 GitHub Secrets（环境变量）

##### 1. 进入你 Fork 的  你的用户名/MoonTVPlus  仓库页面。

##### 2. 点击上方 Settings（设置） → 左侧菜单 Secrets and variables → Actions。

##### 3. 点击 New repository secret，按下面列表逐个添加：

![S60423-01413609_com.webp](https://cftcr2.20010501.xyz/PicHoro/S60423-01413609_com.webp)

```
# 必填
CLOUDFLARE_ACCOUNT_ID=你的CF账户ID
CLOUDFLARE_API_TOKEN=你的CF授权令牌
D1_DATABASE_ID=你的D1数据库ID
NEXT_PUBLIC_STORAGE_TYPE=d1
USERNAME=admin
PASSWORD=自定义登录密码

# 选填（观影房功能，关闭即可）
WATCH_ROOM_ENABLED=false
WATCH_ROOM_SERVER_TYPE=internal
WATCH_ROOM_EXTERNAL_SERVER_URL=
WATCH_ROOM_EXTERNAL_SERVER_AUTH=

```

#  六、通过 GitHub Actions 部署到 Cloudflare

![S60423-01420374_com.webp](https://cftcr2.20010501.xyz/PicHoro/S60423-01420374_com.webp)

##### 1. 回到你 Fork 的仓库页面，点击上方 Actions。

##### 2. 你会看到  Deploy to Cloudflare  工作流，点击它。

##### 3. 点击右侧 Run workflow → 选择  main  分支 → 点击 Run workflow 触发部署。

##### 4. 等待部署完成（约 2-3 分钟），状态显示 ✅ 绿色对勾就是成功了。

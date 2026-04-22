---
abbrlink: ''
categories:
- - 技术教程
date: '2026-04-23T01:58:29.341989+08:00'
tags: []
title: 用CloudflareWorker+D1数据库搭建MoonTVPlus
updated: '2026-04-23T01:58:37.870+08:00'
---
一、准备工作

你需要准备好这些账号/信息：

1. Cloudflare 账号（免费即可）
2. GitHub 账号（免费）
3. 手机/电脑浏览器，能正常访问 Cloudflare 和 GitHub 控制台

二、Fork 项目仓库

1. 打开项目地址：https://github.com/mtvpls/MoonTVPlus
2. 点击右上角的 Fork，将仓库复制到你的 GitHub 账号下。
3. 等待 Fork 完成，进入你自己的  你的用户名/MoonTVPlus  仓库页面。

三、创建 Cloudflare D1 数据库

1. 登录 Cloudflare 控制台，进入你的账户。
2. 点击左侧菜单 存储和数据库 → D1 SQL 数据库。
3. 点击 创建数据库：

名称：自定义，比如  moontvplus-db

点击 创建。
4. 进入数据库详情页，复制两个关键信息（后面要用）：

Database ID （页面里的 UUID）

 Account ID （浏览器地址栏里，cloudflare.com/后面的一串字符）

 五、创建 Cloudflare API Token

1. 在 Cloudflare 控制台，点击右上角你的头像 → 我的资料 → API 令牌。
2. 点击 创建令牌，选择 创建自定义令牌。
3. 配置权限（关键步骤，和你截图里的配置一致）：
资源 权限 操作
用户 成员资格 读取
帐户 Workers 脚本 编辑
帐户 Cloudflare Pages 编辑
帐户 D1 编辑
4. 账户资源选择：包括 → 所有账户
5. 点击 继续以显示摘要 → 创建令牌，复制生成的 Token（只显示一次，务必保存）。

 六、配置 GitHub Secrets（环境变量）

1. 进入你 Fork 的  你的用户名/MoonTVPlus  仓库页面。
2. 点击上方 Settings（设置） → 左侧菜单 Secrets and variables → Actions。
3. 点击 New repository secret，按下面列表逐个添加：

Secret 名称 值（你自己的） 说明
 CLOUDFLARE_ACCOUNT_ID  你的 Cloudflare Account ID 从 Cloudflare 控制台复制
 CLOUDFLARE_API_TOKEN  你刚创建的 API Token 带 Workers/Pages/D1 权限
 D1_DATABASE_ID  你的 D1 数据库 ID 数据库详情页复制的 UUID
 NEXT_PUBLIC_STORAGE_TYPE   d1  指定使用 D1 数据库存储
 USERNAME  自定义（如  admin ） 后台登录用户名
 PASSWORD  自定义强密码 后台登录密码
 WATCH_ROOM_ENABLED   false （或  true ） 是否启用观影房功能，不需要填  false 
 WATCH_ROOM_SERVER_TYPE   internal （或  external ） 观影房服务器类型，不需要可不填
 WATCH_ROOM_EXTERNAL_SERVER_URL  外部服务器地址（可选） 启用外部服务器时填写
 WATCH_ROOM_EXTERNAL_SERVER_AUTH  外部服务器鉴权密钥（可选） 启用外部服务器时填写

提示：如果你不需要观影房功能，直接把  WATCH_ROOM_ENABLED  设为  false ，其他  WATCH_ROOM_*  变量可以不填。

 七、通过 GitHub Actions 部署到 Cloudflare Pages

1. 回到你 Fork 的仓库页面，点击上方 Actions。
2. 你会看到  Deploy to Cloudflare  工作流，点击它。
3. 点击右侧 Run workflow → 选择  main  分支 → 点击 Run workflow 触发部署。
4. 等待部署完成（约 2-3 分钟），状态显示 ✅ 绿色对勾就是成功了。

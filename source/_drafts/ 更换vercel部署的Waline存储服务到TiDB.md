---
abbrlink: ''
categories:
- - 技术教程
cover: https://cftcr2.20010501.xyz/PicHoro/1770383872210.webp
date: '2026-02-06T21:00:15.361246+08:00'
tags: []
title: 更换vercel部署的Waline存储服务到TiDB
updated: '2026-02-06T21:54:38.082+08:00'
---
# 首先登录导出.json的评论数据

提示 [Leancloud 即将停止对外服务](https://github.com/orgs/walinejs/discussions/3370)。如果你正在使用它作为评论存储服务，请尽快迁移你的评论数据。

注册创建 TiDB 数据库 [教程](https://waline.js.org/guide/deploy/tidb.html)

![mmexport1770382703254.webp](https://cftcr2.20010501.xyz/PicHoro/mmexport1770382703254.webp)

**TIDB_DB:TiDB数据库库名**

**TIDB_USER:TiDB数据库的用户名**

**TIDB_PASSWORD:TiDB数据库的密码**

**TIDB_HOST:127.0.0.1**

**TIDB_PORT:4000**

**TIDB_PORT:wl_**

**TIDB_CHARSET:utf8mb4**

# 需要点击才能显示密码

![mmexport1770382700931.webp](https://cftcr2.20010501.xyz/PicHoro/mmexport1770382700931.webp)

# 如图 添加环境变量

登录评论后台导入刚刚导出.json评论数据就大功告成了 第一次千万不能直接用QQ登录 不然会出现错误 需要重置管理员密码（按下面的代码重置后注册登录就可以了）

```
USE waline;
DELETE FROM `wl_Users`;
```

![mmexport1770382698882.webp](https://cftcr2.20010501.xyz/PicHoro/mmexport1770382698882.webp)

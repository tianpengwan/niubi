---
abbrlink: ''
categories:
- - 技术教程
cover: https://cftcr2.20010501.xyz/PicHoro/1774196983530(1).webp
date: '2026-03-23T00:48:38.310543+08:00'
tags: []
title: 解决Hexo博客发布文章后更新不及时
updated: '2026-03-23T00:48:40.778+08:00'
---
# Hexo 博客缓存问题与解决方案

## 遇到的问题

我的 Hexo 博客部署在 Cloudflare 上，使用 GitHub 作为代码仓库。最近发布文章时发现，由于浏览器和 CDN 的**强缓存**，更新文章后，刷新页面却看不到新内容。

* **电脑端**尚可通过 `Ctrl + F5` 进行强制刷新来解决。
* **手机端**就非常尴尬，往往需要完全清除浏览器记录或开启无痕模式，经常要折腾半天才能刷出新内容。

## 解决方案：`_headers` 文件

我们可以为部署平台（如 Vercel, GitHub Pages, Netlify, Cloudflare Pages 等）创建一个 **`_headers` 文件**。这个文件就像一份给浏览器的“缓存说明书”，可以精确地告诉浏览器：哪些内容需要缓存，以及缓存多久。

下面是优化后的缓存配置策略，已整合为一份完整的配置：

```nginx
# 所有 HTML 页面：不缓存，每次请求最新版本
/*.html
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

# 首页、分页、标签页、分类页等路径：同样不缓存
/
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

/page/*
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

/tag/*
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

/category/*
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache
  Expires: 0

# 静态资源：JS、CSS、图片、图标等，长期缓存（一年）
/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.png
/*.jpg
/*.jpeg
/*.gif
/*.ico
/*.svg
  Cache-Control: public, max-age=31536000, immutable
```

## 配置说明与好处

* **`/*.html`**：匹配所有文章页面、独立页面和首页HTML文件。
* **`no-cache, no-store`**：指令浏览器不要缓存或本地存储这些内容。
* **`must-revalidate`**：要求浏览器每次都必须向服务器验证内容的有效性。
* **`Expires: 0`**：设置资源立即过期。

**应用此配置后，效果立竿见影：**

1. **内容实时更新**：发布文章后能立刻显示，再也看不到陈旧的缓存内容，无需手动清除浏览器缓存。
2. **访问速度依旧快**：此方案设计合理，在确保HTML（文章、首页）每次获取最新的同时，继续对JS、CSS、图片等静态资源进行长达一年的缓存，充分利用缓存优势。
3. **无额外负担**：仅禁止缓存体积很小的HTML文件，不会增加服务器流量压力。
4. **SEO友好**：搜索引擎每次抓取都能获得最新内容，避免了因缓存导致网站内容更新不被收录的问题。

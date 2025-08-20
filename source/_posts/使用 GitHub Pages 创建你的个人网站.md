---
abbrlink: caab
categories:
  - - 技术教程
date: '2024-07-12T16:35:09.039031+08:00'
cover: 'https://tc.20010501.xyz/file/59f604a703de092b7314f.jpg'
tags:
  - GitHub Pages
title: 使用 GitHub Pages 创建你的个人网站
updated: '2024-07-12T20:19:11.957+08:00'
---
# 使用 GitHub Pages 创建你的个人网站

## 简介

GitHub Pages 是一个静态站点托管服务，允许你将 Markdown 文件、HTML 文件或其他静态内容托管在 GitHub 上，并且免费提供。通过 GitHub Pages，你可以创建个人博客、项目展示页或是公司主页等。本文将介绍如何使用 GitHub Pages 快速搭建一个简单的个人网站。

## 步骤

### 1. 创建一个新的 GitHub 仓库

首先，登录到你的 GitHub 账户，然后点击右上角的 `+` 号，选择 `New repository`。

- 仓库名称：建议使用 `<your-username>.github.io` 这样的格式，这样 GitHub Pages 才能正常工作。
- 公开/私有：根据你的需求选择公开或私有仓库。公开仓库任何人都可以访问，而私有仓库则需要授权。
- 描述：简要描述你的仓库用途。
- 初始化设置：可以选择是否初始化仓库，是否添加 `.gitignore` 文件和 LICENSE 文件。

创建完成后，你会进入仓库的主页面。

### 2. 添加内容

GitHub Pages 支持多种静态网站生成工具，如 Jekyll、Hugo 等。这里我们以最简单的 Markdown 文件为例来介绍。

1. 在仓库的根目录下创建一个名为 `index.md` 的文件。
2. 编辑 `index.md` 文件，输入一些基本的 Markdown 内容。例如：

```markdown
---
title: 我的个人网站
---

# 欢迎来到我的个人网站！

这里是我分享编程知识和个人项目的平台。

## 关于我

我是一名软件工程师，专注于 Web 开发和数据科学。

## 最新项目

- [项目A](#)
- [项目B](#)

## 联系方式

你可以通过以下方式联系到我：

- 邮箱: example@example.com
- Twitter: @example
```

3. 保存并提交更改。

### 3. 配置 GitHub Pages

1. 进入仓库的 `Settings` 页面。
2. 滚动到 `GitHub Pages` 部分。
3. 选择 `Source` 下拉菜单，选择 `main` 分支（或者其他你希望用来部署的分支）。
4. 选择 `Theme`，这里有很多预设的主题供你选择，选择适合你网站风格的主题。
5. 点击 `Save` 按钮保存配置。

### 4. 查看效果

配置完成后，GitHub Pages 会自动部署你的网站。你可以在 `GitHub Pages` 部分找到你的网站 URL，通常是 `https://<your-username>.github.io`。

## 进阶技巧

### 自定义域名

如果你希望使用自定义域名，可以在仓库的 `Settings` 页面中添加 CNAME 记录，并将域名指向 GitHub 提供的 URL。

### 使用 Jekyll 或 Hugo

如果你想使用更强大的静态网站生成工具，可以使用 Jekyll 或 Hugo。GitHub Pages 默认支持 Jekyll，只需在仓库根目录下创建 `_config.yml` 文件并配置相关参数即可。

## 结论

通过 GitHub Pages，你可以轻松创建和发布自己的个人网站。无论是简单的博客还是复杂的企业网站，GitHub Pages 都是一个非常实用的工具。希望这篇文章能帮助你快速上手 GitHub Pages，创建出属于自己的网站。

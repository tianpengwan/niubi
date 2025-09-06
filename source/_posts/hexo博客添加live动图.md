---
abbrlink: 1ef3
categories: []
cover: https://cftcr2.20010501.xyz/PicHoro/1757173197761.webp
date: '2025-09-02T19:07:39.090797+08:00'
tags: []
title: hexo博客添加live动图
updated: '2025-09-06T23:44:17.778+08:00'
---
# 演示

{% livephoto https://cftcr2.20010501.xyz/PicHoro/1757173197761.webp https://cftcr2.20010501.xyz/PicHoro/1757173192196.mp4 %}

{% livephoto https://cftcr2.20010501.xyz/PicHoro/P20250902-182539.webp https://cftcr2.20010501.xyz/PicHoro/P20250902-182539-1.webm %}

# 安装

在 Hexo 博客根目录下执行以下命令：

```
npm install hexo-live-photo --save
```

# 配置

在 Hexo 的主配置文件 _config.yml 中添加以下选项：

```
livephoto:
  enable: true
  autoplay: true
  hover_to_play: true
  click_to_play: true
  lazy_load: true
  threshold: 0.8
  badge: true
  badge_text: 'Live'
  badge_position: 'bottom-left'
  loading_animation: true
  preload: 'auto'
  keep_observing: false
  hover_delay: 300
  weixin_disable_autoplay: true
```

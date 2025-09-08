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

# PJAX优化

以下是针对安知鱼主题的 PJAX 兼容代码，用于在页面切换后重新初始化 Hexo-live-photo 插件：

关键点说明：

1. 事件监听：代码监听 
"pjax:complete" 事件，这是安知鱼主题中 PJAX 加载完成后的标准事件。
2. 初始化方法：使用 
"detectLivePhotos()" 来检测和初始化新添加的 Live Photo 容器。
3. 懒加载支持：如果配置了懒加载，会重新设置 Intersection Observer 以确保新元素被正确观察。
4. 错误处理：检查实例和方法是否存在，避免运行时错误。

使用说明：

1. 将下面代码保存到安知鱼主题的自定义 JavaScript 文件中（例如 
"source/js/custom.js"）。
2. 确保主题配置中引入了该文件（通常通过 
"inject:" 配置项实现）。
3. 如果 PJAX 事件名称不是 
"pjax:complete"，请根据主题实际事件调整（如 
"pjax:success"）。

如果问题仍然存在，请检查浏览器控制台是否有错误信息，并确保 Hexo-live-photo 插件的 JavaScript 已正确加载。

```
// 监听 PJAX 完成事件，重新初始化 Hexo-live-photo 插件
document.addEventListener('pjax:complete', function () {
  // 检查全局配置是否启用
  if (window.LivePhotoConfig && window.LivePhotoConfig.enable) {
    // 如果 LivePhotoPage 实例已存在，则重新检测新的 Live Photo 容器
    if (window.livePhotoPage && typeof window.livePhotoPage.detectLivePhotos === 'function') {
      window.livePhotoPage.detectLivePhotos();
      
      // 如果配置了懒加载，可能需要重新设置 Intersection Observer
      if (window.LivePhotoConfig.lazy_load) {
        window.livePhotoPage.setupIntersectionObserver();
      }
    } else {
      // 如果实例不存在，创建新的 LivePhotoPage 实例
      window.livePhotoPage = new LivePhotoPage(window.LivePhotoConfig);
    }
  }
});
```
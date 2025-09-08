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

<!-- Live图容器 -->
<div class="live-figure-container" style="position: relative; display: inline-block; width: 100%; max-width: 640px; margin: 1rem auto; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
  <!-- 静态封面图 -->
  <img src="https://cftcr2.20010501.xyz/PicHoro/P20250908-143830.webp" alt="Live图封面" style="width: 100%; height: auto; display: block;">
  
  <!-- Live指示标志 -->
  <div class="live-indicator" style="position: absolute; top: 12px; right: 12px; background-color: rgba(255, 0, 0, 0.8); color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; pointer-events: none;">
    LIVE
  </div>
  
  <!-- 视频元素 -->
  <video class="live-video" preload="none" muted loop style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; transition: opacity 0.3s ease; object-fit: cover;">
    <source src="https://cftcr2.20010501.xyz/PicHoro/P20250908-143830-1.mp4" type="video/mp4">
    您的浏览器不支持HTML5视频播放
  </video>
  
  <!-- 声音控制按钮 -->
  <button class="volume-control" style="position: absolute; bottom: 12px; right: 12px; background: rgba(0, 0, 0, 0.6); border: none; border-radius: 50%; width: 32px; height: 32px; color: white; cursor: pointer; opacity: 0; transition: opacity 0.3s ease; display: flex; align-items: center; justify-content: center;">
    <!-- 正常声音图标 -->
    <svg class="volume-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: block;">
      <path d="M12.5 5.5L8 10H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3l4.5 4.5V5.5z"></path>
      <path d="M16 9c1.5 1 1.5 3 0 4"></path>
      <path d="M18 7c2.5 2 2.5 6 0 8"></path>
    </svg>
    <!-- 静音图标（带斜杠的声音图标） -->
    <svg class="mute-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
      <path d="M12.5 5.5L8 10H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h3l4.5 4.5V5.5z"></path>
      <path d="M16 9c1.5 1 1.5 3 0 4"></path>
      <path d="M18 7c2.5 2 2.5 6 0 8"></path>
      <line x1="20" y1="5" x2="8" y2="17" stroke="currentColor" stroke-width="2"></line>
    </svg>
  </button>
</div>

<script>
// 初始化Live图函数
function initLiveFigures() {
  const liveContainers = document.querySelectorAll('.live-figure-container:not([data-initialized])');
  
  liveContainers.forEach(container => {
    const video = container.querySelector('.live-video');
    const volumeBtn = container.querySelector('.volume-control');
    const volumeIcon = container.querySelector('.volume-icon');
    const muteIcon = container.querySelector('.mute-icon');
    let isMuted = true;
    
    // 标记为已初始化
    container.setAttribute('data-initialized', 'true');
    
    // 预加载视频（但不自动播放）
    video.load();
    
    // 初始状态显示静音图标（因为默认静音）
    volumeIcon.style.display = 'none';
    muteIcon.style.display = 'block';
    
    // 鼠标悬停时播放视频
    container.addEventListener('mouseenter', function() {
      video.style.opacity = '1';
      video.play().catch(e => console.log('自动播放阻止:', e));
      
      // 显示音量控制按钮
      volumeBtn.style.opacity = '1';
    });
    
    // 鼠标离开时暂停并隐藏视频
    container.addEventListener('mouseleave', function() {
      video.style.opacity = '0';
      video.pause();
      
      // 隐藏音量控制按钮
      volumeBtn.style.opacity = '0';
    });
    
    // 音量控制按钮点击事件
    volumeBtn.addEventListener('click', function(e) {
      e.stopPropagation(); // 防止事件冒泡
      isMuted = !isMuted;
      video.muted = isMuted;
      
      // 切换图标显示
      if (isMuted) {
        volumeIcon.style.display = 'none';
        muteIcon.style.display = 'block';
      } else {
        volumeIcon.style.display = 'block';
        muteIcon.style.display = 'none';
      }
    });
  });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initLiveFigures);

// 监听可能的PJAX事件（兼容安知鱼主题）
// 安知鱼主题可能使用的事件包括：pjax:success, pjax:complete, pjax:end
// 我们同时监听多个可能的事件以确保兼容性
document.addEventListener('pjax:success', initLiveFigures);
document.addEventListener('pjax:complete', initLiveFigures);
document.addEventListener('pjax:end', initLiveFigures);

// 如果以上事件都不适用，可以使用MutationObserver监听DOM变化
// 这是一种更通用的解决方案，适用于任何PJAX实现
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      // 延迟执行以确保DOM完全加载
      setTimeout(initLiveFigures, 100);
    }
  });
});

// 开始观察body元素的变化
observer.observe(document.body, {
  childList: true,
  subtree: true
});
</script>


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
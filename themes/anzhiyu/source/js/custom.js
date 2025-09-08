// 增强版的 Hexo-live-photo PJAX 兼容解决方案
document.addEventListener('pjax:complete', function() {
  console.log('PJAX 完成，尝试重新初始化 Live Photo 插件...');
  
  // 方法1: 直接调用 detectLivePhotos 方法
  if (window.livePhotoPage && typeof window.livePhotoPage.detectLivePhotos === 'function') {
    try {
      window.livePhotoPage.detectLivePhotos();
      console.log('通过 detectLivePhotos 方法重新初始化成功');
    } catch (e) {
      console.error('detectLivePhotos 方法调用失败:', e);
    }
  }
  
  // 方法2: 重新创建 LivePhotoPage 实例（更彻底的解决方案）
  if (window.LivePhotoConfig && window.LivePhotoConfig.enable) {
    try {
      // 先尝试销毁旧实例（如果存在）
      if (window.livePhotoPage && window.livePhotoPage.observer) {
        window.livePhotoPage.observer.disconnect();
      }
      
      // 创建新实例
      window.livePhotoPage = new LivePhotoPage(window.LivePhotoConfig);
      console.log('通过重新创建实例初始化成功');
    } catch (e) {
      console.error('重新创建实例失败:', e);
    }
  }
  
  // 方法3: 手动查找并初始化所有未初始化的容器
  setTimeout(function() {
    const containers = document.querySelectorAll('.live-photo-container:not([data-initialized])');
    if (containers.length > 0) {
      console.log('发现', containers.length, '个未初始化的 Live Photo 容器');
      
      if (window.livePhotoPage && window.livePhotoPage.livePhotos) {
        containers.forEach(container => {
          try {
            const livePhoto = new LivePhoto(container, window.LivePhotoConfig || {});
            window.livePhotoPage.livePhotos.push(livePhoto);
            container.setAttribute('data-initialized', 'true');
            
            // 如果启用了懒加载，需要重新观察新元素
            if (window.livePhotoPage.config.lazy_load && window.livePhotoPage.observer) {
              window.livePhotoPage.observer.observe(container);
            }
          } catch (e) {
            console.error('初始化单个容器失败:', e);
          }
        });
      }
    }
  }, 300); // 延迟执行，确保 DOM 完全更新
});

// 添加错误事件监听，帮助调试
document.addEventListener('pjax:error', function(e) {
  console.error('PJAX 加载出错:', e);
});

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

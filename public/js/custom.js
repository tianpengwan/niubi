function initLivePhoto() {
  if (window.LivePhotoConfig && window.LivePhotoConfig.enable) {
    window.livePhotoPage = new LivePhotoPage(window.LivePhotoConfig);
  }
}

// 首次页面加载
document.addEventListener("DOMContentLoaded", initLivePhoto);

// PJAX 完成后重新初始化
document.addEventListener("pjax:complete", initLivePhoto);
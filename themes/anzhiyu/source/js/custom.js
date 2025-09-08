// 保存原始的初始化函数
const originalInit = LivePhotoPage.prototype.init;

// 重写 LivePhotoPage 的 init 方法，使其可重复调用
LivePhotoPage.prototype.init = function() {
  // 先清理现有的实例和观察器
  if (this.observer) {
    this.observer.disconnect();
    this.observer = null;
  }
  this.livePhotos = []; // 清空旧实例数组

  // 调用原始初始化逻辑
  originalInit.call(this);
};

// 在 PJAX 完成后重新初始化整个 LivePhotoPage
document.addEventListener('pjax:complete', function () {
  // 检查全局实例是否存在且配置启用
  if (window.livePhotoPage && window.LivePhotoConfig && window.LivePhotoConfig.enable) {
    window.livePhotoPage.init(); // 调用重写后的 init 方法
  }
});
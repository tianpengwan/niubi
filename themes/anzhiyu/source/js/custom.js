// 监听 DOM 变化，当有新 Live Photo 容器添加时自动初始化
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1 && node.classList.contains('live-photo-container')) {
          // 初始化新添加的容器
        }
      });
    }
  });
});

observer.observe(document.body, { childList: true, subtree: true });
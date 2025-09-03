---
abbrlink: 1ef3
categories: []
date: '2025-09-02T19:07:39.090797+08:00'
tags: []
title: hexo博客添加live动图
updated: '2025-09-02T19:07:39.486+08:00'
---
# 演示


<figure class="live-photo muted">
  <video 
    class="live-photo-video" 
    poster="https://cftcr2.20010501.xyz/PicHoro/P20250902-182539.webp" 
    loop 
    muted 
    playsinline
    preload="metadata"
  >
    <!-- 添加多种格式支持 -->
    <source src="https://cftcr2.20010501.xyz/PicHoro/P20250902-182539-1.mp4" type="video/mp4">
    <img src="hhttps://cftcr2.20010501.xyz/PicHoro/P20250902-182539.webp" alt="Live photo">
  </video>
  
  <!-- 动态Live标识 -->
  <div class="live-badge">
    <div class="live-pulse"></div>
    <span>LIVE</span>
  </div>
  
  <!-- 增强可见性的声音控制按钮 -->
  <button class="sound-control">
    <svg class="sound-icon sound-on" viewBox="0 0 24 24">
      <path fill="white" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
    </svg>
    <svg class="sound-icon sound-off" viewBox="0 0 24 24">
      <path fill="white" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12Z"/>
    </svg>
    <div class="sound-icon-backdrop"></div>
  </button>
  
  <div class="live-photo-overlay">
    <div class="live-photo-caption">日落时分的城市天际线</div>
    <div class="live-photo-date">2025年8月15日 19:28:54</div>
  </div>
  
  <!-- 加载指示器 -->
  <div class="loading-indicator">
    <div class="loading-spinner"></div>
    <div class="loading-text">加载中...</div>
  </div>
  
  <!-- 网络状态指示器 -->
  <div class="network-status">
    <span class="network-icon">📶</span>
    <span class="network-text">网络状态: 良好</span>
  </div>
</figure>

<style>
.live-photo {
  position: relative;
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background: #f0f0f0;
}

.live-photo:hover {
  transform: translateY(-5px);
}

.live-photo-video {
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
  min-height: 300px;
  object-fit: cover;
}

/* 动态Live标识样式 */
.live-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(2px);
}

.live-pulse {
  width: 10px;
  height: 10px;
  background: #ff0000;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(255, 0, 0, 0);
  }
  100% {
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

/* 声音控制按钮 - 增强可见性 */
.sound-control {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.sound-control:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.sound-icon {
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 2;
}

.sound-icon-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.sound-on {
  display: none;
}

.live-photo.muted .sound-off {
  display: block;
}

.live-photo:not(.muted) .sound-off {
  display: none;
}

.live-photo:not(.muted) .sound-on {
  display: block;
}

.live-photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding: 20px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.live-photo:hover .live-photo-overlay {
  opacity: 1;
}

.live-photo-caption {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

.live-photo-date {
  font-size: 0.9rem;
  opacity: 0.8;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

/* 加载指示器 */
.loading-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.loading-indicator.hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.loading-text {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 网络状态指示器 */
.network-status {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(2px);
}

.network-icon {
  font-size: 1rem;
}

.network-status.poor .network-icon {
  color: #ff4d4d;
}

.network-status.moderate .network-icon {
  color: #ffcc00;
}

.network-status.good .network-icon {
  color: #00cc66;
}

/* 质量切换按钮 */
.quality-selector {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  z-index: 10;
  cursor: pointer;
  transition: background 0.3s;
}

.quality-selector:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>

<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const livePhoto = document.querySelector('.live-photo');
    const video = document.querySelector('.live-photo-video');
    const soundControl = document.querySelector('.sound-control');
    const loadingIndicator = document.querySelector('.loading-indicator');
    const networkStatus = document.querySelector('.network-status');
    
    if (video) {
      // 网络状态检测
      function checkNetworkStatus() {
        if (navigator.connection) {
          const connection = navigator.connection;
          const downlink = connection.downlink; // Mbps
          const type = connection.effectiveType;
          
          if (downlink > 5 || type === '4g') {
            networkStatus.classList.add('good');
            networkStatus.classList.remove('moderate', 'poor');
            networkStatus.querySelector('.network-text').textContent = '网络状态: 良好';
          } else if (downlink > 1 || type === '3g') {
            networkStatus.classList.add('moderate');
            networkStatus.classList.remove('good', 'poor');
            networkStatus.querySelector('.network-text').textContent = '网络状态: 中等';
          } else {
            networkStatus.classList.add('poor');
            networkStatus.classList.remove('good', 'moderate');
            networkStatus.querySelector('.network-text').textContent = '网络状态: 较差';
          }
        } else {
          networkStatus.querySelector('.network-text').textContent = '网络状态: 未知';
        }
      }
      
      // 初始化网络状态
      checkNetworkStatus();
      
      // 监听网络变化
      if (navigator.connection) {
        navigator.connection.addEventListener('change', checkNetworkStatus);
      }
      
      // 智能加载策略
      const loadVideo = () => {
        if (video.readyState < 2) { // 0 = HAVE_NOTHING, 1 = HAVE_METADATA
          // 根据网络状态调整加载策略
          if (networkStatus.classList.contains('poor')) {
            // 慢速网络：只加载元数据
            video.preload = "metadata";
            loadingIndicator.querySelector('.loading-text').textContent = "网络较差，加载中...";
          } else {
            // 正常网络：加载完整视频
            video.preload = "auto";
            loadingIndicator.querySelector('.loading-text').textContent = "加载中...";
          }
          
          video.load();
        }
      };
      
      // 页面加载后开始加载视频
      setTimeout(loadVideo, 300);
      
      // 视频加载事件处理
      video.addEventListener('loadeddata', function() {
        loadingIndicator.classList.add('hidden');
        
        // 尝试自动播放（静音模式）
        this.play().catch(e => {
          console.log("自动播放失败:", e);
        });
      });
      
      video.addEventListener('progress', function() {
        // 显示缓冲进度
        if (this.buffered.length > 0) {
          const bufferedEnd = this.buffered.end(this.buffered.length - 1);
          const percent = (bufferedEnd / this.duration) * 100;
          loadingIndicator.querySelector('.loading-text').textContent = 
            `加载中... ${Math.min(100, Math.round(percent))}%`;
        }
      });
      
      // 处理加载错误
      video.addEventListener('error', function() {
        loadingIndicator.querySelector('.loading-text').textContent = "加载失败，请刷新页面";
      });
      
      // 悬停播放功能
      video.addEventListener('mouseenter', function() {
        // 检查缓冲状态
        if (this.readyState < 3) { // 3 = HAVE_FUTURE_DATA
          loadingIndicator.classList.remove('hidden');
          loadingIndicator.querySelector('.loading-text').textContent = "准备播放...";
        }
        
        this.play().catch(e => {
          console.log("悬停播放失败:", e);
        });
      });
      
      video.addEventListener('mouseleave', function() {
        this.pause();
        this.currentTime = 0;
      });
      
      // 声音控制功能
      soundControl.addEventListener('click', function() {
        video.muted = !video.muted;
        livePhoto.classList.toggle('muted', video.muted);
      });
      
      // 确保视频在视口内时自动加载
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadVideo();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(video);
      
      // 页面可见时加载视频
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          loadVideo();
        }
      });
      
      // 添加重试机制
      video.addEventListener('stalled', function() {
        console.log("视频加载卡顿，尝试重新加载");
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.querySelector('.loading-text').textContent = "网络不稳定，重新加载...";
        this.load();
      });
      
      // 添加缓冲指示
      video.addEventListener('waiting', function() {
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.querySelector('.loading-text').textContent = "缓冲中...";
      });
      
      video.addEventListener('playing', function() {
        loadingIndicator.classList.add('hidden');
      });
    }
  });
})();
</script>





```
<figure class="live-photo muted">
  <video 
    class="live-photo-video" 
    poster="https://cftcr2.20010501.xyz/PicHoro/P20250815-192854.webp" 
    loop 
    muted 
    playsinline
    preload="metadata"
  >
    <!-- 添加多种格式支持 -->
    <source src="https://cftcr2.20010501.xyz/PicHoro/P20250815-192854-1.mp4" type="video/mp4">
    <source src="https://cftcr2.20010501.xyz/PicHoro/P20250815-192854-1.webm" type="video/webm">
    <img src="https://cftcr2.20010501.xyz/PicHoro/P20250815-192854.webp" alt="Live photo">
  </video>
  
  <!-- 动态Live标识 -->
  <div class="live-badge">
    <div class="live-pulse"></div>
    <span>LIVE</span>
  </div>
  
  <!-- 增强可见性的声音控制按钮 -->
  <button class="sound-control">
    <svg class="sound-icon sound-on" viewBox="0 0 24 24">
      <path fill="white" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
    </svg>
    <svg class="sound-icon sound-off" viewBox="0 0 24 24">
      <path fill="white" d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12Z"/>
    </svg>
    <div class="sound-icon-backdrop"></div>
  </button>
  
  <div class="live-photo-overlay">
    <div class="live-photo-caption">日落时分的城市天际线</div>
    <div class="live-photo-date">2025年8月15日 19:28:54</div>
  </div>
  
  <!-- 加载指示器 -->
  <div class="loading-indicator">
    <div class="loading-spinner"></div>
    <div class="loading-text">加载中...</div>
  </div>
  
  <!-- 网络状态指示器 -->
  <div class="network-status">
    <span class="network-icon">📶</span>
    <span class="network-text">网络状态: 良好</span>
  </div>
</figure>

<style>
.live-photo {
  position: relative;
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background: #f0f0f0;
}

.live-photo:hover {
  transform: translateY(-5px);
}

.live-photo-video {
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
  min-height: 300px;
  object-fit: cover;
}

/* 动态Live标识样式 */
.live-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 20px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(2px);
}

.live-pulse {
  width: 10px;
  height: 10px;
  background: #ff0000;
  border-radius: 50%;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 8px rgba(255, 0, 0, 0);
  }
  100% {
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

/* 声音控制按钮 - 增强可见性 */
.sound-control {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.sound-control:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

.sound-icon {
  width: 24px;
  height: 24px;
  position: relative;
  z-index: 2;
}

.sound-icon-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  z-index: 1;
}

.sound-on {
  display: none;
}

.live-photo.muted .sound-off {
  display: block;
}

.live-photo:not(.muted) .sound-off {
  display: none;
}

.live-photo:not(.muted) .sound-on {
  display: block;
}

.live-photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  padding: 20px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.live-photo:hover .live-photo-overlay {
  opacity: 1;
}

.live-photo-caption {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

.live-photo-date {
  font-size: 0.9rem;
  opacity: 0.8;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

/* 加载指示器 */
.loading-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.loading-indicator.hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.loading-text {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 网络状态指示器 */
.network-status {
  position: absolute;
  top: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 5px;
  backdrop-filter: blur(2px);
}

.network-icon {
  font-size: 1rem;
}

.network-status.poor .network-icon {
  color: #ff4d4d;
}

.network-status.moderate .network-icon {
  color: #ffcc00;
}

.network-status.good .network-icon {
  color: #00cc66;
}

/* 质量切换按钮 */
.quality-selector {
  position: absolute;
  bottom: 15px;
  left: 15px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  z-index: 10;
  cursor: pointer;
  transition: background 0.3s;
}

.quality-selector:hover {
  background: rgba(0, 0, 0, 0.8);
}
</style>

<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const livePhoto = document.querySelector('.live-photo');
    const video = document.querySelector('.live-photo-video');
    const soundControl = document.querySelector('.sound-control');
    const loadingIndicator = document.querySelector('.loading-indicator');
    const networkStatus = document.querySelector('.network-status');
    
    if (video) {
      // 网络状态检测
      function checkNetworkStatus() {
        if (navigator.connection) {
          const connection = navigator.connection;
          const downlink = connection.downlink; // Mbps
          const type = connection.effectiveType;
          
          if (downlink > 5 || type === '4g') {
            networkStatus.classList.add('good');
            networkStatus.classList.remove('moderate', 'poor');
            networkStatus.querySelector('.network-text').textContent = '网络状态: 良好';
          } else if (downlink > 1 || type === '3g') {
            networkStatus.classList.add('moderate');
            networkStatus.classList.remove('good', 'poor');
            networkStatus.querySelector('.network-text').textContent = '网络状态: 中等';
          } else {
            networkStatus.classList.add('poor');
            networkStatus.classList.remove('good', 'moderate');
            networkStatus.querySelector('.network-text').textContent = '网络状态: 较差';
          }
        } else {
          networkStatus.querySelector('.network-text').textContent = '网络状态: 未知';
        }
      }
      
      // 初始化网络状态
      checkNetworkStatus();
      
      // 监听网络变化
      if (navigator.connection) {
        navigator.connection.addEventListener('change', checkNetworkStatus);
      }
      
      // 智能加载策略
      const loadVideo = () => {
        if (video.readyState < 2) { // 0 = HAVE_NOTHING, 1 = HAVE_METADATA
          // 根据网络状态调整加载策略
          if (networkStatus.classList.contains('poor')) {
            // 慢速网络：只加载元数据
            video.preload = "metadata";
            loadingIndicator.querySelector('.loading-text').textContent = "网络较差，加载中...";
          } else {
            // 正常网络：加载完整视频
            video.preload = "auto";
            loadingIndicator.querySelector('.loading-text').textContent = "加载中...";
          }
          
          video.load();
        }
      };
      
      // 页面加载后开始加载视频
      setTimeout(loadVideo, 300);
      
      // 视频加载事件处理
      video.addEventListener('loadeddata', function() {
        loadingIndicator.classList.add('hidden');
        
        // 尝试自动播放（静音模式）
        this.play().catch(e => {
          console.log("自动播放失败:", e);
        });
      });
      
      video.addEventListener('progress', function() {
        // 显示缓冲进度
        if (this.buffered.length > 0) {
          const bufferedEnd = this.buffered.end(this.buffered.length - 1);
          const percent = (bufferedEnd / this.duration) * 100;
          loadingIndicator.querySelector('.loading-text').textContent = 
            `加载中... ${Math.min(100, Math.round(percent))}%`;
        }
      });
      
      // 处理加载错误
      video.addEventListener('error', function() {
        loadingIndicator.querySelector('.loading-text').textContent = "加载失败，请刷新页面";
      });
      
      // 悬停播放功能
      video.addEventListener('mouseenter', function() {
        // 检查缓冲状态
        if (this.readyState < 3) { // 3 = HAVE_FUTURE_DATA
          loadingIndicator.classList.remove('hidden');
          loadingIndicator.querySelector('.loading-text').textContent = "准备播放...";
        }
        
        this.play().catch(e => {
          console.log("悬停播放失败:", e);
        });
      });
      
      video.addEventListener('mouseleave', function() {
        this.pause();
        this.currentTime = 0;
      });
      
      // 声音控制功能
      soundControl.addEventListener('click', function() {
        video.muted = !video.muted;
        livePhoto.classList.toggle('muted', video.muted);
      });
      
      // 确保视频在视口内时自动加载
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            loadVideo();
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(video);
      
      // 页面可见时加载视频
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          loadVideo();
        }
      });
      
      // 添加重试机制
      video.addEventListener('stalled', function() {
        console.log("视频加载卡顿，尝试重新加载");
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.querySelector('.loading-text').textContent = "网络不稳定，重新加载...";
        this.load();
      });
      
      // 添加缓冲指示
      video.addEventListener('waiting', function() {
        loadingIndicator.classList.remove('hidden');
        loadingIndicator.querySelector('.loading-text').textContent = "缓冲中...";
      });
      
      video.addEventListener('playing', function() {
        loadingIndicator.classList.add('hidden');
      });
    }
  });
})();
</script>
```

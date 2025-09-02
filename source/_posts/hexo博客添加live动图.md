---
abbrlink: ''
categories: []
date: '2025-09-02T19:07:39.090797+08:00'
tags: []
title: hexo博客添加live动图
updated: '2025-09-02T19:07:39.486+08:00'
---
# 演示

<figure class="live-photo">
  <video 
    class="live-photo-video" 
    poster=" https://cftcr2.20010501.xyz/PicHoro/P20250902-182539.webp
" 
    loop 
    muted 
    playsinline
  >
    <source src=" https://cftcr2.20010501.xyz/PicHoro/P20250902-182539-1.mp4" type="video/mp4">
    <img src="https://cftcr2.20010501.xyz/PicHoro/P20250815-192854.webp" alt="Live photo">
  </video>
  
  <!-- 动态Live标识 -->
  <div class="live-badge">
    <div class="live-pulse"></div>
    <span>LIVE</span>
  </div>
  
  <div class="live-photo-overlay">
    <div class="live-photo-caption">干饭饭</div>
    <div class="live-photo-date">2025年9月2日 18:58:54</div>
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
}
.live-photo:hover {
  transform: translateY(-5px);
}
.live-photo-video {
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
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
}
.live-photo:hover .live-photo-overlay {
  opacity: 1;
}
.live-photo-caption {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 5px;
}
.live-photo-date {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.live-photo-video');
  
    if (video) {
      video.addEventListener('mouseenter', function() {
        this.play();
      });
  
      video.addEventListener('mouseleave', function() {
        this.pause();
        this.currentTime = 0;
      });
    }
  });
})();
</script>


```
<figure class="live-photo">
  <video 
    class="live-photo-video" 
    poster=" https://cftcr2.20010501.xyz/PicHoro/P20250902-182539.webp
" 
    loop 
    muted 
    playsinline
  >
    <source src=" https://cftcr2.20010501.xyz/PicHoro/P20250902-182539-1.mp4" type="video/mp4">
    <img src="https://cftcr2.20010501.xyz/PicHoro/P20250815-192854.webp" alt="Live photo">
  </video>
  
  <!-- 动态Live标识 -->
  <div class="live-badge">
    <div class="live-pulse"></div>
    <span>LIVE</span>
  </div>
  
  <div class="live-photo-overlay">
    <div class="live-photo-caption">干饭饭</div>
    <div class="live-photo-date">2025年9月2日 18:58:54</div>
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
}
.live-photo:hover {
  transform: translateY(-5px);
}
.live-photo-video {
  width: 100%;
  height: auto;
  display: block;
  cursor: pointer;
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
}
.live-photo:hover .live-photo-overlay {
  opacity: 1;
}
.live-photo-caption {
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 5px;
}
.live-photo-date {
  font-size: 0.9rem;
  opacity: 0.8;
}
</style>
<script>
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('.live-photo-video');
  
    if (video) {
      video.addEventListener('mouseenter', function() {
        this.play();
      });
  
      video.addEventListener('mouseleave', function() {
        this.pause();
        this.currentTime = 0;
      });
    }
  });
})();
</script>
```

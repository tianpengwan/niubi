// scripts/livephoto.js
hexo.extend.filter.register('after_render:html', function (str, data) {
  const livePhotoStyle = `
  <style>
    .live-photo {
      width: 100%;
      max-width: 800px;
      height: auto;
      aspect-ratio: 4 / 3;
      margin: 20px 0;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: inline-block;
    }
    .live-photo img, .live-photo video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
    }
  </style>
  `;

  const livePhotoScript = `
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var livePhotoElements = document.querySelectorAll('.live-photo');
      if (livePhotoElements.length > 0) {
        // 动态加载 LivePhotosKit JS 库
        var script = document.createElement('script');
        script.src = 'https://cdn.apple-livephotoskit.com/lpk/1/livephotoskit.js';
        script.onload = function() {
          livePhotoElements.forEach(function(element) {
            var photoSrc = element.getAttribute('data-photo-src');
            var videoSrc = element.getAttribute('data-video-src');
            if (photoSrc && videoSrc) {
              var player = LivePhotosKit.Player(element);
              player.photoSrc = photoSrc;
              player.videoSrc = videoSrc;
              element.addEventListener('mouseenter', function() { player.play(); });
              element.addEventListener('mouseleave', function() { player.pause(); });
              element.addEventListener('touchstart', function() { player.play(); });
              element.addEventListener('touchend', function() { player.pause(); });
            }
          });
        };
        document.head.appendChild(script);
      }
    });
  </script>
  `;

  // 将样式和脚本添加到最终的 HTML 中
  if (str.includes('class="live-photo"')) { // 判断页面中是否有 live-photo 元素，有才注入
    str = str.replace('</head>', livePhotoStyle + '</head>');
    str = str.replace('</body>', livePhotoScript + '</body>');
  }
  return str;
});

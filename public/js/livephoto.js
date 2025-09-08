document.addEventListener('DOMContentLoaded', function() {
    const livePhotos = document.querySelectorAll('.live-photo-container');
    
    livePhotos.forEach(container => {
        const video = container.querySelector('.live-photo-video');
        const muteBtn = container.querySelector('.live-photo-mute-btn');
        
        // 初始化视频设置
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        
        // 更新静音按钮状态
        const updateMuteButton = () => {
            muteBtn.textContent = video.muted ? '🔇' : '🔊';
        };
        updateMuteButton();
        
        // 静音按钮事件
        muteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            video.muted = !video.muted;
            updateMuteButton();
        });
        
        // 鼠标悬停事件
        container.addEventListener('mouseenter', () => {
            video.currentTime = 0;
            video.play().catch(e => console.error("播放失败:", e));
        });
        
        container.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
        
        // 触摸设备支持
        container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        }, { passive: false });
    });
});
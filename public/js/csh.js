/**
 * PJAX加载完成后自动重新初始化(改进版)
 * 解决初始化时机、事件绑定和组件状态问题
 */

// 初始化函数示例（实际使用时替换为您的初始化逻辑）
function initializeComponents() {
    console.log("执行初始化...");
    // 这里放置您的初始化代码，例如：
    // - 绑定事件处理程序
    // - 初始化UI组件
    // - 设置状态变量
    // - 加载动态内容
    
    // 示例：初始化Live Photo组件
    initLivePhotos();
}

// 初始化Live Photo组件（示例）
function initLivePhotos() {
    const livePhotos = document.querySelectorAll('.live-photo-container');
    
    livePhotos.forEach(container => {
        // 确保组件只初始化一次
        if (container.dataset.initialized) return;
        container.dataset.initialized = "true";
        
        const video = container.querySelector('.live-photo-video');
        const muteBtn = container.querySelector('.live-photo-mute-btn');
        
        // 确保视频循环播放且默认静音
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        
        // 静音按钮状态
        let isMuted = true;
        
        // 更新静音按钮图标
        function updateMuteButton() {
            muteBtn.innerHTML = isMuted ? '🔇' : '🔊';
        }
        updateMuteButton();
        
        // 静音按钮点击事件
        muteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            isMuted = !isMuted;
            video.muted = isMuted;
            updateMuteButton();
        });
        
        // 鼠标悬停播放视频
        container.addEventListener('mouseenter', function() {
            video.currentTime = 0;
            video.play().catch(e => console.error("播放失败:", e));
        });
        
        // 鼠标离开暂停视频
        container.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
        });
    });
}

// 清理函数（在PJAX加载前执行）
function cleanupComponents() {
    console.log("执行清理...");
    // 这里放置清理代码，例如：
    // - 移除事件监听器
    // - 重置组件状态
    // - 清理全局变量
    
    // 示例：清理Live Photo组件的事件监听器
    const livePhotos = document.querySelectorAll('.live-photo-container');
    livePhotos.forEach(container => {
        // 移除所有自定义事件监听器
        const newContainer = container.cloneNode(true);
        container.parentNode.replaceChild(newContainer, container);
        
        // 重置初始化标记
        delete container.dataset.initialized;
    });
}

// 监听pjax:send事件（PJAX开始加载时）
document.addEventListener('pjax:send', function() {
    console.log("PJAX开始加载，执行清理");
    cleanupComponents();
});

// 监听pjax:success事件
document.addEventListener('pjax:success', function(event) {
    console.log("PJAX加载完成，等待DOM更新");
    
    // 使用MutationObserver确保DOM完全更新
    const observer = new MutationObserver(function(mutations) {
        observer.disconnect();
        console.log("DOM更新完成，开始重新初始化");
        initializeComponents();
    });
    
    // 观察整个文档的变化
    observer.observe(document, {
        childList: true,
        subtree: true
    });
});

// 页面首次加载时执行初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("页面首次加载，执行初始化");
    initializeComponents();
});

// 监听pjax:error事件
document.addEventListener('pjax:error', function(event) {
    console.error("PJAX加载失败", event);
    // 错误处理后可尝试重新初始化
    initializeComponents();
});
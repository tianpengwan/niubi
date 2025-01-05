function createDengBox(position, text) {
    const dengBox = document.createElement('div');
    dengBox.className = `deng-box${position}`;
    dengBox.style.position = 'fixed';
    dengBox.style.zIndex = '9999';
    dengBox.style.pointerEvents = 'none';

    // 设置位置 (使用vw/vh，需要调整数值以适应你的布局)
    if (position === 1) {
        dengBox.style.top = '-10vw';
        dengBox.style.left = '-1vw';
    } else if (position === 2) {
        dengBox.style.top = '-8vw';
        dengBox.style.left = '20vw';
    } else if (position === 3) {
        dengBox.style.top = '-9vw';
        dengBox.style.right = '1.5vw';
    } else if (position === 4) {
        dengBox.style.top = '-8vw';
        dengBox.style.right = '20vw';
    }

    dengBox.innerHTML = `
        <div class="deng">
            <div class="xian"></div>
            <div class="deng-a">
                <div class="deng-b"><div class="deng-t">${text}</div></div>
            </div>
            <div class="shui shui-a"><div class="shui-c"></div><div class="shui-b"></div></div>
        </div>
    `;

    const style = document.createElement('style');
    style.innerHTML = `
        .deng-box .deng {
            position: relative;
            width: 20vw; /* 使用视口宽度 */
            height: 15vw; /* 使用视口宽度 */
            margin: 5vw; /* 使用视口宽度 */
            background: rgba(216, 0, 15, 0.8);
            border-radius: 50%;
            -webkit-transform-origin: 50% -100px;
            animation: swing 3s infinite ease-in-out; /* 简化动画，移除-webkit-前缀 */
            box-shadow: -5px 5px 10vw 4px rgba(250, 108, 0, 1); /* 简化阴影 */
        }
        /* ... 其他样式保持不变，但可以使用vw/vh替换px ... */
        .deng-t {
            font-size: 10vw; /* 使用视口宽度，调整大小 */
        }

        @keyframes swing { /* 移除-webkit-前缀，使动画兼容性更好 */
            0% { transform: rotate(-10deg) }
            50% { transform: rotate(10deg) }
            100% { transform: rotate(-10deg) }
        }

        /* 媒体查询，针对不同屏幕尺寸调整 */
        @media (max-width: 768px) {
            .deng-box .deng { width: 30vw; height: 22.5vw; margin: 10vw; }
            .deng-t { font-size: 8vw; }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(dengBox);
}

createDengBox(1, '春');
createDengBox(2, '节');
createDengBox(3, '乐');
createDengBox(4, '快');

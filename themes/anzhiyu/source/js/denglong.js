 // 创建并添加元素
function createDengContainer() {
    const container = document.createElement('div');
    container.className = 'deng-container';

    // 从当前脚本的 URL 获取参数
    const scriptSrc = document.currentScript.src;
    const urlParams = new URLSearchParams(scriptSrc.split('?')[1]); // 获取 '?'
    const customText = urlParams.get('text'); // 获取参数名为'text'的值

    // 将获取的文本分割为字符数组，如果没有提供文本，则使用默认的“新年快乐”
    const texts = customText ? customText.split('') : ['新', '年', '快', '乐'];

    texts.forEach((text, index) => {
        const box = document.createElement('div');
        box.className = 'deng-box';

        const deng = document.createElement('div');
        deng.className = 'deng';

        const xian = document.createElement('div');
        xian.className = 'xian';

        const dengA = document.createElement('div');
        dengA.className = 'deng-a';

        const dengB = document.createElement('div');
        dengB.className = 'deng-b';

        const dengT = document.createElement('div');
        dengT.className = 'deng-t';
        dengT.textContent = text;

        dengB.appendChild(dengT);
        dengA.appendChild(dengB);
        deng.appendChild(xian);
        deng.appendChild(dengA);

        const shuiA = document.createElement('div');
        shuiA.className = 'shui shui-a';

        const shuiC = document.createElement('div');
        shuiC.className = 'shui-c';
        const shuiB = document.createElement('div');
        shuiB.className = 'shui-b';

        shuiA.appendChild(shuiC);
        shuiA.appendChild(shuiB);
        deng.appendChild(shuiA);
        box.appendChild(deng);
        container.appendChild(box);
    });

    document.body.appendChild(container);
}

// 添加CSS样式
function addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = `
        .deng-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 60px;
    width: 100%;
    height: auto;
    opacity: 0.9;
    z-index: 9999;
    pointer-events: none;
    flex-wrap: wrap;
}

.deng-box {
    position: relative;
    margin: 10px;
    flex: 0 0 120px; /* 保持最小宽度 */
}

.deng {
    position: relative;
    width: 100%;  /* 使用百分比宽度 */
    height: 100%; /* 使用百分比高度 */
    max-width: 120px; /* 设置最大宽度，防止在较大屏幕上过大 */
    max-height: 90px;  /* 设置最大高度 */
    background: rgba(216, 0, 15, .8);
    border-radius: 50% 50%;
    animation: swing 3s infinite ease-in-out;
    box-shadow: -5px 5px 50px 4px #fa6c00;
}

.deng-a {
    width: 85%; /* 百分比宽度 */
    height: 100%; /* 百分比高度 */
    background: rgba(216, 0, 15, .1);
    border-radius: 50%;
    border: 2px solid #dc8f03;
    margin-left: 7.5%; /* 百分比边距 */
    display: flex;
    justify-content: center;
}

.deng-b {
    width: 70%; /* 百分比宽度 */
    height: 90%; /* 百分比高度 */
    background: rgba(216, 0, 15, .1);
    border-radius: 60%;
    border: 2px solid #dc8f03;
}

.xian {
    position: absolute;
    top: -20%; /* 百分比 top */
    left: 50%; /* 水平居中 */
    transform: translateX(-50%); /* 微调水平位置 */
    width: 2%; /* 百分比宽度 */
    height: 20%; /* 百分比高度 */
    background: #dc8f03;
}

.shui-a {
    position: relative;
    width: 5%; /* 百分比宽度 */
    height: 22%; /* 百分比高度 */
    margin: -5% 0 0 47.5%; /* 百分比边距，调整以居中 */
    animation: swing 4s infinite ease-in-out;
    transform-origin: 50% -45%; /* 百分比 transform-origin */
    background: orange;
    border-radius: 0 0 5px 5px;
}

.deng-t {
    font-family: '华文行楷', Arial, sans-serif;
    font-size: 3.2rem;
    color: #dc8f03;
    font-weight: 700;
    line-height: 1;
}

/* 媒体查询，适应不同屏幕宽度 */
@media (max-width: 768px) {
    .deng-box {
        flex: 0 0 80px; /* 减小每个灯笼的宽度 */
    }
    .deng {
        max-width: 80px; /* 减小最大宽度 */
        max-height: 60px; /* 减小最大高度 */
    }
    .deng-t {
        font-size: 2.4rem; /* 减小字体大小 */
    }
}

@media (max-width: 480px) {
    .deng-box {
        flex: 0 0 60px; /* 进一步减小每个灯笼的宽度 */
    }
    .deng {
        max-width: 60px; /* 进一步减小最大宽度 */
        max-height: 45px; /* 进一步减小最大高度 */
    }
    .deng-t {
        font-size: 1.8rem; /* 进一步减小字体大小 */
    }
}

@keyframes swing {
    0% { transform: rotate(-10deg); }
    50% { transform: rotate(10deg); }
    100% { transform: rotate(-10deg); }
}

function init() {
    addStyles();
    createDengContainer();
}

init();

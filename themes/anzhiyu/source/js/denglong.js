function createDengBox(position, text) {
    const dengBox = document.createElement('div');
    dengBox.className = `deng-box${position}`;
    dengBox.style.position = 'fixed';
    dengBox.style.zIndex = '9999';
    dengBox.style.pointerEvents = 'none';

    // 设置位置
    if (position === 1) {
        dengBox.style.top = '-30px';
        dengBox.style.left = '-1px';
    } else if (position === 2) {
        dengBox.style.top = '-25px';
        dengBox.style.left = '184px';
    } else if (position === 3) {
        dengBox.style.top = '-28px';
        dengBox.style.right = '11px';
    } else if (position === 4) {
        dengBox.style.top = '-26px';
        dengBox.style.right = '183px';
    }

    // 创建灯笼内部结构
    dengBox.innerHTML = `
        <div class="deng">
            <div class="xian"></div>
            <div class="deng-a">
                <div class="deng-b"><div class="deng-t">${text}</div></div>
            </div>
            <div class="shui shui-a"><div class="shui-c"></div><div class="shui-b"></div></div>
        </div>
    `;

    // 添加CSS样式
    const style = document.createElement('style');
    style.innerHTML = `
        .deng-box${position} .deng {
            position: relative;
            width: 120px;
            height: 90px;
            margin: 50px;
            background: rgba(216, 0, 15, 0.8);
            border-radius: 50% 50%;
            -webkit-transform-origin: 50% -100px;
            -webkit-animation: swing ${position === 1 ? '3s' : position === 2 || position === 4 ? '4s' : '5s'} infinite ease-in-out;
            box-shadow: -5px 5px ${position === 1 || position === 3 ? '50px' : '30px'} 4px rgba(${position === 1 || position === 3 ? '250, 108, 0' : '252, 144, 61'}, 1);
        }
        .deng-a {
            width: 100px;
            height: 90px;
            background: rgba(216, 0, 15, 0.1);
            margin: 12px 8px 8px 10px;
            border-radius: 50% 50%;
            border: 2px solid #dc8f03;
        }

        .deng-b {
            width: 45px;
            height: 90px;
            background: rgba(216, 0, 15, 0.1);
            margin: -2px 8px 8px 26px;
            border-radius: 50% 50%;
            border: 2px solid #dc8f03;
        }

        .xian {
            position: absolute;
            top: -50px;
            left: 60px;
            width: 2px;
            height: 50px;
            background: #dc8f03;
        }

        .shui-a {
            position: relative;
            width: 5px;
            height: 20px;
            margin: -5px 0 0 59px;
            -webkit-animation: swing 4s infinite ease-in-out;
            -webkit-transform-origin: 50% -45px;
            background: #ffa500;
            border-radius: 0 0 5px 5px;
        }

        .shui-b {
            position: absolute;
            top: 14px;
            left: -2px;
            width: 10px;
            height: 10px;
            background: #dc8f03;
            border-radius: 50%;
        }

        .shui-c {
            position: absolute;
            top: 18px;
            left: -2px;
            width: 10px;
            height: 35px;
            background: #ffa500;
            border-radius: 0 0 0 5px;
        }

        .deng:before {
            position: absolute;
            top: -7px;
            left: 29px;
            height: 12px;
            width: 60px;
            content: " ";
            display: block;
            z-index: 999;
            border-radius: 5px 5px 0 0;
            border: solid 1px #dc8f03;
            background: #ffa500;
            background: linear-gradient(to right, #dc8f03, #ffa500, #dc8f03, #ffa500, #dc8f03);
        }

        .deng:after {
            position: absolute;
            bottom: -7px;
            left: 10px;
            height: 12px;
            width: 60px;
            content: " ";
            display: block;
            margin-left: 20px;
            border-radius: 0 0 5px 5px;
            border: solid 1px #dc8f03;
            background: #ffa500;
            background: linear-gradient(to right, #dc8f03, #ffa500, #dc8f03, #ffa500, #dc8f03);
        }

        .deng-t {
            font-family: 华文行楷,Arial,Lucida Grande,Tahoma,sans-serif;
            font-size: 3.2rem;
            color: #dc8f03;
            font-weight: bold;
            line-height: 85px;
            text-align: center;
        }

        @-webkit-keyframes swing {
            0% { -webkit-transform: rotate(-10deg) }
            50% { -webkit-transform: rotate(10deg) }
            100% { -webkit-transform: rotate(-10deg) }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(dengBox);
}

// 使用函数创建灯笼
createDengBox(1, '春');
createDengBox(2, '节');
createDengBox(3, '乐');
createDengBox(4, '快');
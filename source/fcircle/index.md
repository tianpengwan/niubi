---
title: 朋友圈
date: 2022-01-29 15:23:17
---


<!-- 定义容器 -->
<div id="hexo-circle-of-friends-root"></div>

<!-- 配置信息 -->
<script>
    let UserConfig = {
        // 填写你的 API 地址
        private_api_url: 'https://pyq.20010501.xyz/',
        // 点击加载更多时，一次最多加载几篇文章，默认10
        page_turning_number: 12,
        // 头像加载失败时，默认头像地址
        error_img: 'https://20010501.xyz/img/fluid.png',
        // 进入页面时第一次的排序规则
        sort_rule: 'created'
    };
</script>

<!-- 引入 JavaScript 文件 -->
<script type="text/javascript" src="https://uipv4.zywvvd.com:33030/HexoFiles/js/friend-circle/app.min.js"></script>
<script type="text/javascript" src="https://uipv4.zywvvd.com:33030/HexoFiles/js/friend-circle/bundle.js"></script>

<!-- 初始化函数 -->
<script>
    // 初始化函数
    (function() {
        // 初始化函数调用
        initCircleOfFriends(UserConfig);
        // 监听主题切换
        document.documentElement.addEventListener('theme-switch', function() {
            updateTheme();
        });

        // 更新主题样式
        function updateTheme() {
            const theme = document.documentElement.getAttribute('data-theme');
            const root = document.getElementById('hexo-circle-of-friends-root');

            if (theme === 'dark') {
                root.classList.add('dark-theme');
            } else {
                root.classList.remove('dark-theme');
            }
        }

        // 初始加载时更新主题样式
        updateTheme();
    })();
</script>
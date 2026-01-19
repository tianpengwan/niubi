/**
 * 朋友圈文章展示JS文件
 * 功能：动态生成朋友圈文章展示页面
 * 使用方法：在HTML中引入此文件即可
 */

(function() {
    'use strict';
    
    // 全局变量
    let allArticlesData = [];
    let filteredArticles = [];
    
    // 主初始化函数
    function initFriendCircle() {
        // 如果容器已存在，先清理
        const existingContainer = document.getElementById('friendCircleContainer');
        if (existingContainer) {
            existingContainer.remove();
        }
        
        // 创建主容器
        const container = document.createElement('div');
        container.id = 'friendCircleContainer';
        container.className = 'friend-circle-container';
        
        // 将容器添加到body
        document.body.appendChild(container);
        
        // 添加样式
        addStyles();
        
        // 构建HTML结构
        buildHTMLStructure(container);
        
        // 初始化数据
        initData();
    }
    
    // 添加样式
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
            }
            
            .friend-circle-container {
                width: 100%;
                max-width: 1400px;
                margin: 0 auto;
                padding: 20px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .fc-header {
                text-align: center;
                margin-bottom: 25px;
            }
            
            .fc-title {
                background: linear-gradient(45deg, #FFD700, #FFA500);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                font-size: 2.2rem;
                margin-bottom: 15px;
                text-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
                font-weight: 700;
            }
            
            .fc-stats-container {
                display: flex;
                justify-content: center;
                gap: 12px;
                margin-bottom: 20px;
                flex-wrap: nowrap;
                overflow-x: auto;
                padding: 10px 0;
                -webkit-overflow-scrolling: touch;
            }
            
            .fc-stats-container::-webkit-scrollbar {
                display: none;
            }
            
            .fc-stat-card {
                background: rgba(255, 255, 255, 0.15);
                border-radius: 15px;
                padding: 15px 20px;
                text-align: center;
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                min-width: 110px;
                flex: 0 0 auto;
            }
            
            .fc-stat-card:hover {
                transform: translateY(-3px);
                background: rgba(255, 255, 255, 0.2);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            }
            
            .fc-stat-icon {
                font-size: 1.8rem;
                margin-bottom: 8px;
                display: block;
            }
            
            .fc-stat-number {
                color: #FFD700;
                font-size: 1.6rem;
                font-weight: bold;
                margin-bottom: 3px;
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            }
            
            .fc-stat-label {
                color: #87CEEB;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .fc-controls-section {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .fc-last-updated {
                background: rgba(255, 255, 255, 0.15);
                color: #87CEEB;
                padding: 10px 15px;
                border-radius: 12px;
                text-align: center;
                font-size: 0.9rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
                max-width: 90%;
                backdrop-filter: blur(10px);
            }
            
            .fc-controls {
                display: flex;
                gap: 10px;
                justify-content: center;
                flex-wrap: wrap;
                width: 100%;
            }
            
            .fc-random-btn, .fc-refresh-btn {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #1a2a6c;
                border: none;
                padding: 12px 20px;
                border-radius: 40px;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
                position: relative;
                overflow: hidden;
                flex: 1;
                min-width: 140px;
                max-width: 200px;
            }
            
            .fc-random-btn:hover, .fc-refresh-btn:hover {
                transform: translateY(-2px) scale(1.03);
                box-shadow: 0 6px 18px rgba(255, 215, 0, 0.4);
            }
            
            .fc-random-btn:active, .fc-refresh-btn:active {
                transform: translateY(0);
            }
            
            .fc-refresh-btn {
                background: linear-gradient(135deg, #87CEEB, #1E90FF);
                box-shadow: 0 4px 12px rgba(135, 206, 235, 0.3);
            }
            
            .fc-refresh-btn:hover {
                box-shadow: 0 6px 18px rgba(135, 206, 235, 0.4);
            }
            
            .fc-search-container {
                width: 100%;
                max-width: 500px;
                margin: 0 auto;
            }
            
            .fc-search-input {
                width: 100%;
                padding: 12px 20px;
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 40px;
                background: rgba(255, 255, 255, 0.1);
                color: #FFD700;
                font-size: 1rem;
                outline: none;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }
            
            .fc-search-input:focus {
                border-color: #87CEEB;
                box-shadow: 0 0 12px rgba(135, 206, 235, 0.4);
                background: rgba(255, 255, 255, 0.15);
            }
            
            .fc-search-input::placeholder {
                color: rgba(255, 255, 255, 0.5);
            }
            
            .fc-random-article-card {
                background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(135, 206, 235, 0.1));
                border-radius: 15px;
                padding: 20px;
                margin: 15px 0 25px 0;
                border: 2px solid rgba(255, 215, 0, 0.3);
                box-shadow: 0 8px 24px rgba(255, 215, 0, 0.2);
                position: relative;
                overflow: hidden;
                width: 100%;
                max-width: 100%;
            }
            
            .fc-random-article-card::before {
                content: '🎲 随机推荐';
                position: absolute;
                top: 8px;
                right: 8px;
                background: linear-gradient(45deg, #FFD700, #FFA500);
                color: #1a2a6c;
                padding: 4px 12px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
            }
            
            .fc-random-article-content {
                display: flex;
                align-items: center;
                gap: 20px;
            }
            
            .fc-random-article-avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #FFD700;
                box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
                flex-shrink: 0;
            }
            
            .fc-random-article-info {
                flex: 1;
                min-width: 0;
            }
            
            .fc-random-article-title {
                color: #FFD700;
                font-size: 1.3rem;
                font-weight: bold;
                margin-bottom: 8px;
                line-height: 1.3;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .fc-random-article-author {
                color: #87CEEB;
                font-size: 0.95rem;
                margin-bottom: 10px;
                font-weight: 600;
                cursor: pointer;
                display: inline-block;
            }
            
            .fc-random-article-author:hover {
                color: #FFFFFF;
                text-decoration: underline;
            }
            
            .fc-random-article-excerpt {
                color: rgba(255, 255, 255, 0.85);
                font-size: 0.95rem;
                line-height: 1.5;
                margin-bottom: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .fc-random-article-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
                flex-wrap: wrap;
            }
            
            .fc-random-article-btn {
                background: linear-gradient(135deg, #FFD700, #FFA500);
                color: #1a2a6c;
                border: none;
                padding: 10px 18px;
                border-radius: 40px;
                font-size: 0.95rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
                flex: 1;
                min-width: 120px;
            }
            
            .fc-random-article-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
            }
            
            .fc-another-random-btn {
                background: linear-gradient(135deg, #87CEEB, #1E90FF);
                box-shadow: 0 3px 10px rgba(135, 206, 235, 0.3);
            }
            
            .fc-another-random-btn:hover {
                box-shadow: 0 5px 15px rgba(135, 206, 235, 0.4);
            }
            
            .fc-articles-section {
                margin-top: 15px;
            }
            
            .fc-article-count {
                color: #FFD700;
                font-size: 1rem;
                text-align: center;
                margin-bottom: 15px;
                padding: 8px 15px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                display: inline-block;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .fc-articles-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .fc-article-item {
                background: rgba(255, 255, 255, 0.08);
                border-radius: 15px;
                padding: 20px;
                transition: all 0.3s ease;
                border: 1px solid rgba(255, 255, 255, 0.1);
                cursor: pointer;
                display: flex;
                flex-direction: column;
                height: 100%;
                position: relative;
                overflow: hidden;
            }
            
            .fc-article-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, #FFD700, #87CEEB);
                border-radius: 15px 15px 0 0;
            }
            
            .fc-article-item:hover {
                transform: translateY(-5px);
                background: rgba(255, 255, 255, 0.12);
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
                border-color: rgba(255, 255, 255, 0.2);
            }
            
            .fc-article-header {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .fc-author-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 15px;
                border: 2px solid #FFD700;
                box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
            }
            
            .fc-article-info {
                flex: 1;
                min-width: 0;
            }
            
            .fc-article-title {
                color: #87CEEB;
                font-size: 1.2rem;
                font-weight: bold;
                margin-bottom: 8px;
                line-height: 1.3;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .fc-article-meta {
                display: flex;
                flex-direction: column;
                gap: 5px;
                color: #FFD700;
                font-size: 0.85rem;
            }
            
            .fc-author-name {
                cursor: pointer;
                transition: color 0.3s ease;
                display: inline-block;
                font-weight: 600;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .fc-author-name:hover {
                color: #FFFFFF;
                text-decoration: underline;
            }
            
            .fc-article-excerpt {
                color: rgba(255, 255, 255, 0.85);
                font-size: 0.95rem;
                line-height: 1.5;
                margin-top: 15px;
                flex-grow: 1;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            
            .fc-article-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .fc-article-date {
                color: #87CEEB;
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .fc-read-more {
                color: #FFD700;
                text-decoration: none;
                font-size: 0.9rem;
                font-weight: 600;
                transition: all 0.3s ease;
                padding: 6px 12px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            
            .fc-read-more:hover {
                color: #FFFFFF;
                background: rgba(255, 255, 255, 0.2);
                transform: translateX(3px);
            }
            
            .fc-loading {
                display: none;
                text-align: center;
                color: #FFD700;
                font-size: 1.1rem;
                padding: 30px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                margin: 15px 0;
            }
            
            .fc-loading.active {
                display: block;
            }
            
            .fc-footer {
                text-align: center;
                margin-top: 35px;
                padding-top: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .fc-footer a {
                color: #FFD700;
                text-decoration: none;
                font-size: 1.1rem;
                font-weight: bold;
                transition: all 0.3s ease;
                padding: 8px 16px;
                border-radius: 40px;
                background: rgba(255, 255, 255, 0.1);
                display: inline-block;
            }
            
            .fc-footer a:hover {
                color: #FFFFFF;
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
            }
            
            /* 模态框样式 */
            .fc-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                z-index: 1000;
                justify-content: center;
                align-items: center;
            }
            
            .fc-modal-content {
                background: rgba(26, 42, 108, 0.9);
                backdrop-filter: blur(15px);
                border-radius: 15px;
                padding: 20px;
                width: 90%;
                max-width: 500px;
                max-height: 80vh;
                overflow-y: auto;
                border: 2px solid #FFD700;
            }
            
            .fc-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }
            
            .fc-modal-title {
                color: #FFD700;
                font-size: 1.3rem;
            }
            
            .fc-close-btn {
                color: #87CEEB;
                font-size: 1.8rem;
                cursor: pointer;
                transition: color 0.3s ease;
                line-height: 1;
            }
            
            .fc-close-btn:hover {
                color: #FFD700;
            }
            
            .fc-modal-articles {
                list-style: none;
            }
            
            .fc-modal-article-item {
                padding: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .fc-modal-article-item:hover {
                background: rgba(255, 255, 255, 0.1);
                transform: translateX(3px);
            }
            
            .fc-modal-article-title {
                color: #87CEEB;
                font-size: 1.1rem;
                margin-bottom: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .fc-modal-article-date {
                color: #FFD700;
                font-size: 0.85rem;
                margin-bottom: 8px;
            }
            
            .fc-modal-article-excerpt {
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
                line-height: 1.4;
                max-height: 2.8em;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .fc-no-results {
                text-align: center;
                color: #FFD700;
                padding: 30px;
                font-size: 1.1rem;
                grid-column: 1 / -1;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 12px;
            }
            
            /* 移动端响应式调整 */
            @media (max-width: 768px) {
                .friend-circle-container {
                    padding: 15px;
                    border-radius: 15px;
                }
                
                .fc-title {
                    font-size: 1.8rem;
                    margin-bottom: 12px;
                }
                
                .fc-stats-container {
                    gap: 8px;
                    margin-bottom: 15px;
                }
                
                .fc-stat-card {
                    padding: 12px 15px;
                    min-width: 100px;
                    border-radius: 12px;
                }
                
                .fc-stat-icon {
                    font-size: 1.5rem;
                    margin-bottom: 6px;
                }
                
                .fc-stat-number {
                    font-size: 1.4rem;
                }
                
                .fc-stat-label {
                    font-size: 0.8rem;
                }
                
                .fc-last-updated {
                    font-size: 0.85rem;
                    padding: 8px 12px;
                    max-width: 100%;
                }
                
                .fc-controls {
                    gap: 8px;
                }
                
                .fc-random-btn, .fc-refresh-btn {
                    padding: 10px 15px;
                    font-size: 0.95rem;
                    min-width: 120px;
                    max-width: 180px;
                }
                
                .fc-search-input {
                    padding: 10px 15px;
                    font-size: 0.95rem;
                }
                
                .fc-random-article-card {
                    padding: 15px;
                    margin: 10px 0 20px 0;
                }
                
                .fc-random-article-content {
                    gap: 15px;
                }
                
                .fc-random-article-avatar {
                    width: 50px;
                    height: 50px;
                }
                
                .fc-random-article-title {
                    font-size: 1.1rem;
                }
                
                .fc-random-article-author {
                    font-size: 0.9rem;
                }
                
                .fc-random-article-excerpt {
                    font-size: 0.9rem;
                }
                
                .fc-random-article-btn {
                    padding: 8px 15px;
                    font-size: 0.9rem;
                    min-width: 110px;
                }
                
                .fc-article-count {
                    font-size: 0.95rem;
                    padding: 6px 12px;
                }
                
                .fc-articles-grid {
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 15px;
                }
                
                .fc-article-item {
                    padding: 15px;
                }
                
                .fc-author-avatar {
                    width: 45px;
                    height: 45px;
                    margin-right: 12px;
                }
                
                .fc-article-title {
                    font-size: 1.1rem;
                }
                
                .fc-article-meta {
                    font-size: 0.8rem;
                }
                
                .fc-article-excerpt {
                    font-size: 0.9rem;
                }
                
                .fc-read-more {
                    font-size: 0.85rem;
                    padding: 5px 10px;
                }
                
                .fc-footer a {
                    font-size: 1rem;
                    padding: 6px 12px;
                }
                
                .fc-modal-content {
                    padding: 15px;
                    width: 95%;
                }
                
                .fc-modal-title {
                    font-size: 1.2rem;
                }
                
                .fc-close-btn {
                    font-size: 1.6rem;
                }
            }
            
            @media (max-width: 480px) {
                .fc-articles-grid {
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 12px;
                }
                
                .fc-stats-container {
                    gap: 6px;
                }
                
                .fc-stat-card {
                    padding: 10px 12px;
                    min-width: 90px;
                }
                
                .fc-stat-icon {
                    font-size: 1.3rem;
                }
                
                .fc-stat-number {
                    font-size: 1.2rem;
                }
                
                .fc-stat-label {
                    font-size: 0.75rem;
                }
                
                .fc-title {
                    font-size: 1.6rem;
                }
                
                .fc-random-article-content {
                    flex-direction: column;
                    text-align: center;
                    gap: 12px;
                }
                
                .fc-random-article-actions {
                    justify-content: center;
                }
            }
            
            @media (max-width: 360px) {
                .fc-articles-grid {
                    grid-template-columns: 1fr;
                }
                
                .fc-stats-container {
                    justify-content: flex-start;
                    padding-left: 5px;
                    padding-right: 5px;
                }
                
                .fc-stat-card {
                    min-width: 85px;
                    padding: 8px 10px;
                }
                
                .fc-stat-number {
                    font-size: 1.1rem;
                }
                
                .fc-stat-label {
                    font-size: 0.7rem;
                }
            }
            
            @media (max-height: 500px) and (orientation: landscape) {
                .friend-circle-container {
                    padding: 15px;
                }
                
                .fc-title {
                    font-size: 1.6rem;
                    margin-bottom: 10px;
                }
                
                .fc-stats-container {
                    margin-bottom: 10px;
                }
                
                .fc-controls-section {
                    margin-bottom: 10px;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // 构建HTML结构
    function buildHTMLStructure(container) {
        // 设置body背景
        document.body.style.cssText = `
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            background-attachment: fixed;
            min-height: 100vh;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: flex-start;
        `;
        
        // 头部
        const header = document.createElement('div');
        header.className = 'fc-header';
        
        const title = document.createElement('h1');
        title.className = 'fc-title';
        title.textContent = '朋友圈文章';
        header.appendChild(title);
        
        // 统计容器
        const statsContainer = document.createElement('div');
        statsContainer.className = 'fc-stats-container';
        statsContainer.id = 'fcStatsContainer';
        statsContainer.innerHTML = `
            <div class="fc-stat-card">
                <span class="fc-stat-icon">👥</span>
                <div class="fc-stat-number" id="fcFriendsNum">0</div>
                <div class="fc-stat-label">好友数量</div>
            </div>
            <div class="fc-stat-card">
                <span class="fc-stat-icon">✨</span>
                <div class="fc-stat-number" id="fcActiveNum">0</div>
                <div class="fc-stat-label">活跃好友</div>
            </div>
            <div class="fc-stat-card">
                <span class="fc-stat-icon">📚</span>
                <div class="fc-stat-number" id="fcArticleNum">0</div>
                <div class="fc-stat-label">文章数量</div>
            </div>
        `;
        header.appendChild(statsContainer);
        
        container.appendChild(header);
        
        // 控制区域
        const controlsSection = document.createElement('div');
        controlsSection.className = 'fc-controls-section';
        
        const lastUpdated = document.createElement('div');
        lastUpdated.className = 'fc-last-updated';
        lastUpdated.id = 'fcLastUpdated';
        lastUpdated.textContent = '最后更新：加载中...';
        controlsSection.appendChild(lastUpdated);
        
        const controls = document.createElement('div');
        controls.className = 'fc-controls';
        controls.innerHTML = `
            <button class="fc-random-btn" id="fcRandomArticle">随机查看文章</button>
            <button class="fc-refresh-btn" id="fcRefreshData">刷新数据</button>
        `;
        controlsSection.appendChild(controls);
        
        const searchContainer = document.createElement('div');
        searchContainer.className = 'fc-search-container';
        searchContainer.innerHTML = `
            <input type="text" class="fc-search-input" id="fcSearchInput" placeholder="搜索文章标题或作者...">
        `;
        controlsSection.appendChild(searchContainer);
        
        container.appendChild(controlsSection);
        
        // 随机文章卡片
        const randomArticleCard = document.createElement('div');
        randomArticleCard.className = 'fc-random-article-card';
        randomArticleCard.id = 'fcRandomArticleCard';
        randomArticleCard.style.display = 'none';
        randomArticleCard.innerHTML = `
            <div class="fc-random-article-content" id="fcRandomArticleContent">
                <!-- 随机文章内容将通过JavaScript动态生成 -->
            </div>
        `;
        container.appendChild(randomArticleCard);
        
        // 加载指示器
        const loading = document.createElement('div');
        loading.className = 'fc-loading';
        loading.id = 'fcLoadingIndicator';
        loading.textContent = '正在加载文章...';
        container.appendChild(loading);
        
        // 文章区域
        const articlesSection = document.createElement('div');
        articlesSection.className = 'fc-articles-section';
        
        const articleCountDiv = document.createElement('div');
        articleCountDiv.style.textAlign = 'center';
        articleCountDiv.style.marginBottom = '15px';
        const articleCount = document.createElement('span');
        articleCount.className = 'fc-article-count';
        articleCount.id = 'fcArticleCount';
        articleCount.textContent = '正在加载文章...';
        articleCountDiv.appendChild(articleCount);
        articlesSection.appendChild(articleCountDiv);
        
        const articlesGrid = document.createElement('div');
        articlesGrid.className = 'fc-articles-grid';
        articlesGrid.id = 'fcArticlesList';
        articlesSection.appendChild(articlesGrid);
        
        container.appendChild(articlesSection);
        
        // 页脚
        const footer = document.createElement('div');
        footer.className = 'fc-footer';
        const footerLink = document.createElement('a');
        footerLink.href = 'https://www.20010501.xyz';
        footerLink.target = '_blank';
        footerLink.textContent = '宇外御风';
        footer.appendChild(footerLink);
        container.appendChild(footer);
        
        // 作者模态框
        const modal = document.createElement('div');
        modal.className = 'fc-modal';
        modal.id = 'fcAuthorModal';
        modal.innerHTML = `
            <div class="fc-modal-content">
                <div class="fc-modal-header">
                    <h2 class="fc-modal-title" id="fcModalAuthorName">作者的文章</h2>
                    <span class="fc-close-btn" id="fcCloseModal">&times;</span>
                </div>
                <ul class="fc-modal-articles" id="fcModalArticlesList">
                    <!-- 作者文章列表将通过JavaScript动态生成 -->
                </ul>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // 初始化数据
    async function initData() {
        const data = await fetchData();
        allArticlesData = data.article_data || [];
        filteredArticles = [...allArticlesData];
        
        displayStats(data);
        displayArticles();
        setupRandomArticle();
        setupRefreshButton();
        setupSearch();
        setupAuthorModals();
    }
    
    // 从URL获取数据的函数
    async function fetchData() {
        try {
            document.getElementById('fcLoadingIndicator').classList.add('active');
            
            const response = await fetch('https://pyq.20010501.xyz/all', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP错误! 状态: ${response.status}`);
            }
            
            const data = await response.json();
            
            // 处理数据，添加模拟摘要
            if (data.article_data && Array.isArray(data.article_data)) {
                data.article_data.forEach(article => {
                    if (!article.summary) {
                        // 根据标题生成模拟摘要
                        article.summary = generateExcerpt(article.title, 120);
                    }
                    // 确保有默认头像
                    if (!article.avatar) {
                        article.avatar = getDefaultAvatar(article.author);
                    }
                });
            }
            
            return data;
        } catch (error) {
            console.error('获取数据失败，尝试备用方案:', error);
            return await fetchDataBackup();
        } finally {
            document.getElementById('fcLoadingIndicator').classList.remove('active');
        }
    }
    
    // 备用数据获取方案
    async function fetchDataBackup() {
        try {
            const response = await fetch('https://pyq.20010501.xyz/all');
            const text = await response.text();
            
            // 尝试解析XML获取JSON数据
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, "text/xml");
            
            // 获取body标签的内容
            const bodyContent = xmlDoc.querySelector('body');
            
            if (!bodyContent) {
                throw new Error('XML中没有找到body标签');
            }
            
            const jsonString = bodyContent.textContent.trim();
            
            if (!jsonString) {
                throw new Error('JSON数据为空');
            }
            
            const data = JSON.parse(jsonString);
            
            // 处理数据
            if (data.article_data && Array.isArray(data.article_data)) {
                data.article_data.forEach(article => {
                    if (!article.summary) {
                        article.summary = generateExcerpt(article.title, 120);
                    }
                    if (!article.avatar) {
                        article.avatar = getDefaultAvatar(article.author);
                    }
                });
            }
            
            return data;
        } catch (error) {
            console.error('备用方案也失败，使用模拟数据:', error);
            return getMockData();
        }
    }
    
    // 获取默认头像
    function getDefaultAvatar(authorName) {
        // 根据作者名称生成默认头像颜色
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
            '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
        ];
        const colorIndex = authorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
        return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="${colors[colorIndex]}"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="white">${authorName.charAt(0).toUpperCase()}</text></svg>`;
    }
    
    // 生成模拟摘要
    function generateExcerpt(title, maxLength = 100) {
        const mockTexts = [
            "这篇文章分享了关于主题的深入见解和实践经验。",
            "通过详细的案例分析和实践经验分享，本文提供了有价值的见解和建议。",
            "探索了这一主题的多个方面，从理论基础到实际应用都有涉及。",
            "本文旨在帮助读者更好地理解和应用相关技术，提高工作效率。",
            "从不同角度探讨了这一主题，包括技术细节、最佳实践。",
            "作者分享了实用技巧和经验，帮助读者解决实际问题。",
            "这篇文章提供了全面的分析和实用的解决方案。",
            "通过实际案例展示如何应用这些技术和概念。"
        ];
        
        const randomText = mockTexts[Math.floor(Math.random() * mockTexts.length)];
        return `${title} - ${randomText}`.substring(0, maxLength) + '...';
    }
    
    // 获取模拟数据
    function getMockData() {
        const authors = [
            "杜老师说", "安知鱼`Blog", "宇外御风", "技术小站", 
            "编程之道", "前端开发", "后端架构", "人工智能探索"
        ];
        
        const mockArticles = [];
        const articleCount = 62; // 生成62篇模拟文章
        
        for (let i = 1; i <= articleCount; i++) {
            const author = authors[Math.floor(Math.random() * authors.length)];
            const date = new Date();
            date.setDate(date.getDate() - Math.floor(Math.random() * 365));
            
            mockArticles.push({
                "floor": i,
                "title": `文章标题 ${i}: 关于${['Docker', '前端', '后端', 'AI', '云计算', '大数据', '区块链', '物联网'][i % 8]}的实践分享`,
                "created": date.toISOString().split('T')[0],
                "updated": date.toISOString().split('T')[0],
                "link": `https://example.com/article/${i}`,
                "author": author,
                "avatar": getDefaultAvatar(author),
                "summary": generateExcerpt(`文章标题 ${i}`, 120)
            });
        }
        
        return {
            "statistical_data": {
                "friends_num": 50,
                "active_num": 34,
                "error_num": 16,
                "article_num": articleCount,
                "last_updated_time": new Date().toLocaleString('zh-CN')
            },
            "article_data": mockArticles
        };
    }
    
    // 显示统计数据
    function displayStats(data) {
        const stats = data.statistical_data;
        if (stats) {
            document.getElementById('fcFriendsNum').textContent = stats.friends_num || 0;
            document.getElementById('fcActiveNum').textContent = stats.active_num || 0;
            document.getElementById('fcArticleNum').textContent = stats.article_num || 0;
            document.getElementById('fcLastUpdated').textContent = `最后更新：${stats.last_updated_time || '未知'}`;
        }
    }
    
    // 显示文章列表
    function displayArticles() {
        const articlesList = document.getElementById('fcArticlesList');
        articlesList.innerHTML = '';
        
        // 更新文章数量显示
        document.getElementById('fcArticleCount').textContent = `共 ${filteredArticles.length} 篇文章`;
        
        if (filteredArticles.length === 0) {
            articlesList.innerHTML = '<div class="fc-no-results">没有找到相关文章</div>';
            return;
        }
        
        // 按更新日期排序（从新到旧）
        const sortedArticles = [...filteredArticles].sort((a, b) => 
            new Date(b.updated || b.created) - new Date(a.updated || a.created)
        );
        
        sortedArticles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.className = 'fc-article-item';
            articleElement.onclick = () => window.open(article.link, '_blank');
            
            const excerpt = article.summary || generateExcerpt(article.title, 120);
            const date = article.updated || article.created;
            
            articleElement.innerHTML = `
                <div class="fc-article-header">
                    <img src="${article.avatar}" alt="${article.author}" class="fc-author-avatar" 
                         onclick="event.stopPropagation(); window.friendCircleShowAuthorArticles('${article.author.replace(/'/g, "\\'")}')">
                    <div class="fc-article-info">
                        <div class="fc-article-title" onclick="event.stopPropagation(); window.friendCircleShowAuthorArticles('${article.author.replace(/'/g, "\\'")}')">
                            ${article.title}
                        </div>
                        <div class="fc-article-meta">
                            <span class="fc-author-name" onclick="event.stopPropagation(); window.friendCircleShowAuthorArticles('${article.author.replace(/'/g, "\\'")}')">
                                ${article.author}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="fc-article-excerpt">
                    ${excerpt}
                </div>
                <div class="fc-article-footer">
                    <span class="fc-article-date">${date}</span>
                    <span class="fc-read-more">阅读全文 →</span>
                </div>
            `;
            
            articlesList.appendChild(articleElement);
        });
    }
    
    // 设置随机文章功能
    function setupRandomArticle() {
        const randomBtn = document.getElementById('fcRandomArticle');
        const randomCard = document.getElementById('fcRandomArticleCard');
        
        // 初始化显示一个随机文章
        showRandomArticle();
        
        randomBtn.addEventListener('click', () => {
            showRandomArticle();
            // 滚动到随机文章卡片位置
            randomCard.scrollIntoView({ behavior: 'smooth' });
        });
        
        // 暴露函数到全局
        window.friendCircleShowRandomArticle = showRandomArticle;
    }
    
    // 显示随机文章
    function showRandomArticle() {
        const randomCard = document.getElementById('fcRandomArticleCard');
        const randomContent = document.getElementById('fcRandomArticleContent');
        
        if (filteredArticles.length === 0) {
            randomCard.style.display = 'none';
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * filteredArticles.length);
        const randomArticle = filteredArticles[randomIndex];
        
        const excerpt = randomArticle.summary || generateExcerpt(randomArticle.title, 150);
        const date = randomArticle.updated || randomArticle.created;
        
        randomContent.innerHTML = `
            <img src="${randomArticle.avatar}" alt="${randomArticle.author}" class="fc-random-article-avatar"
                 onclick="window.friendCircleShowAuthorArticles('${randomArticle.author.replace(/'/g, "\\'")}')">
            <div class="fc-random-article-info">
                <div class="fc-random-article-title" onclick="window.friendCircleShowAuthorArticles('${randomArticle.author.replace(/'/g, "\\'")}')">
                    ${randomArticle.title}
                </div>
                <div class="fc-random-article-author" onclick="window.friendCircleShowAuthorArticles('${randomArticle.author.replace(/'/g, "\\'")}')">
                    作者: ${randomArticle.author}
                </div>
                <div class="fc-random-article-excerpt">${excerpt}</div>
                <div class="fc-random-article-actions">
                    <button class="fc-random-article-btn" onclick="window.open('${randomArticle.link}', '_blank')">阅读这篇文章</button>
                    <button class="fc-random-article-btn fc-another-random-btn" onclick="window.friendCircleShowRandomArticle()">换一篇推荐</button>
                </div>
            </div>
        `;
        
        randomCard.style.display = 'block';
    }
    
    // 设置搜索功能
    function setupSearch() {
        const searchInput = document.getElementById('fcSearchInput');
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                filteredArticles = [...allArticlesData];
            } else {
                filteredArticles = allArticlesData.filter(article => 
                    article.title.toLowerCase().includes(searchTerm) ||
                    article.author.toLowerCase().includes(searchTerm) ||
                    (article.summary && article.summary.toLowerCase().includes(searchTerm))
                );
            }
            
            displayArticles();
        });
    }
    
    // 设置刷新按钮
    function setupRefreshButton() {
        const refreshBtn = document.getElementById('fcRefreshData');
        refreshBtn.addEventListener('click', async () => {
            refreshBtn.textContent = '刷新中...';
            refreshBtn.disabled = true;
            
            const data = await fetchData();
            allArticlesData = data.article_data || [];
            filteredArticles = [...allArticlesData];
            
            displayStats(data);
            displayArticles();
            showRandomArticle();
            
            refreshBtn.textContent = '刷新数据';
            refreshBtn.disabled = false;
        });
    }
    
    // 设置作者模态框
    function setupAuthorModals() {
        // 暴露函数到全局
        window.friendCircleShowAuthorArticles = function(authorName) {
            const modal = document.getElementById('fcAuthorModal');
            const modalAuthorName = document.getElementById('fcModalAuthorName');
            const modalArticlesList = document.getElementById('fcModalArticlesList');
            
            modalAuthorName.textContent = `${authorName}的文章`;
            modalArticlesList.innerHTML = '';
            
            // 筛选该作者的文章
            const authorArticles = allArticlesData.filter(article => 
                article.author === authorName
            );
            
            if (authorArticles.length === 0) {
                modalArticlesList.innerHTML = '<li style="color: #FFD700; text-align: center; padding: 20px;">暂无文章</li>';
            } else {
                // 按更新日期排序
                authorArticles.sort((a, b) => new Date(b.updated || b.created) - new Date(a.updated || a.created));
                
                authorArticles.forEach(article => {
                    const excerpt = article.summary || generateExcerpt(article.title, 80);
                    const date = article.updated || article.created;
                    
                    const articleItem = document.createElement('li');
                    articleItem.className = 'fc-modal-article-item';
                    articleItem.onclick = () => {
                        window.open(article.link, '_blank');
                        modal.style.display = 'none';
                    };
                    
                    articleItem.innerHTML = `
                        <div class="fc-modal-article-title">${article.title}</div>
                        <div class="fc-modal-article-date">${date}</div>
                        <div class="fc-modal-article-excerpt">${excerpt}</div>
                    `;
                    
                    modalArticlesList.appendChild(articleItem);
                });
            }
            
            modal.style.display = 'flex';
        };
        
        // 关闭模态框
        document.getElementById('fcCloseModal').addEventListener('click', () => {
            document.getElementById('fcAuthorModal').style.display = 'none';
        });
        
        // 点击模态框外部关闭
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('fcAuthorModal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFriendCircle);
    } else {
        initFriendCircle();
    }
    
    // 暴露初始化函数到全局
    window.initFriendCircle = initFriendCircle;
})();

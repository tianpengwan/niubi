/**
 * Hexo 朋友圈插件 - 修复版
 * 修复问题：
 * 1. 移除服务端渲染时对document的引用
 * 2. 添加标签注册功能
 * 3. 适配Hexo标签插件格式
 */

// 检查环境是否为浏览器环境
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

// 仅在浏览器环境中执行的代码
if (isBrowser) {
  // 这里是原来需要在浏览器中执行的代码
  // 但为了避免重复，我们将这部分逻辑移到标签插件中
  console.log('朋友圈插件已加载（浏览器环境）');
}

// Hexo标签插件定义
if (typeof hexo !== 'undefined') {
  // 注册pyq标签
  hexo.extend.tag.register('pyq', function(args) {
    // 这里是标签插件的逻辑，在构建时执行
    const config = hexo.config || {};
    const pyqConfig = config.pyq || {};
    
    // 从配置中获取URL，默认为原来的URL
    const pyqUrl = pyqConfig.url || 'https://pyq.20010501.xyz/all';
    
    // 返回要在页面中插入的HTML
    return `
<div id="friend-circle-container" style="min-height: 500px;">
  <div style="text-align: center; padding: 20px; color: #666;">
    正在加载朋友圈数据...
  </div>
</div>

<script>
(function() {
  'use strict';
  
  // 全局变量
  let allArticlesData = [];
  let filteredArticles = [];
  
  // 从配置中获取URL
  const getPyqUrl = function() {
    // 尝试从配置获取，否则使用默认值
    return window.pyqConfig && window.pyqConfig.url 
      ? window.pyqConfig.url 
      : '${pyqUrl}';
  };
  
  // 从URL获取数据的函数
  async function fetchData() {
    try {
      showLoading(true);
      
      const response = await fetch(getPyqUrl(), {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('HTTP错误! 状态: ' + response.status);
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
      console.error('获取数据失败，使用模拟数据:', error);
      return getMockData();
    } finally {
      showLoading(false);
    }
  }
  
  // 备用数据获取方案
  async function fetchDataBackup() {
    try {
      const response = await fetch(getPyqUrl());
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
    return 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="' + colors[colorIndex] + '"/><text x="50" y="60" font-size="40" text-anchor="middle" fill="white">' + authorName.charAt(0).toUpperCase() + '</text></svg>';
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
    return (title + ' - ' + randomText).substring(0, maxLength) + '...';
  }
  
  // 获取模拟数据
  function getMockData() {
    const authors = [
      "杜老师说", "安知鱼'Blog", "宇外御风", "技术小站", 
      "编程之道", "前端开发", "后端架构", "人工智能探索"
    ];
    
    const mockArticles = [];
    const articleCount = 62;
    
    for (let i = 1; i <= articleCount; i++) {
      const author = authors[Math.floor(Math.random() * authors.length)];
      const date = new Date();
      date.setDate(date.getDate() - Math.floor(Math.random() * 365));
      
      mockArticles.push({
        "floor": i,
        "title": "文章标题 " + i + ": 关于" + ['Docker', '前端', '后端', 'AI', '云计算', '大数据', '区块链', '物联网'][i % 8] + "的实践分享",
        "created": date.toISOString().split('T')[0],
        "updated": date.toISOString().split('T')[0],
        "link": "https://example.com/article/" + i,
        "author": author,
        "avatar": getDefaultAvatar(author),
        "summary": generateExcerpt("文章标题 " + i, 120)
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
  
  // 显示加载状态
  function showLoading(isLoading) {
    const container = document.getElementById('friend-circle-container');
    if (!container) return;
    
    if (isLoading) {
      container.innerHTML = '<div style="text-align: center; padding: 40px; color: #666;">正在加载朋友圈数据...</div>';
    }
  }
  
  // 初始化朋友圈
  async function initFriendCircle() {
    const container = document.getElementById('friend-circle-container');
    if (!container) {
      console.error('找不到朋友圈容器');
      return;
    }
    
    // 添加样式
    addStyles();
    
    // 构建HTML结构
    buildHTMLStructure(container);
    
    // 初始化数据
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
  
  // 添加样式
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = \`
      .friend-circle-container {
        width: 100%;
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px;
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
        backdrop-filter: blur(10px);
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
      
      .fc-refresh-btn {
        background: linear-gradient(135deg, #87CEEB, #1E90FF);
        box-shadow: 0 4px 12px rgba(135, 206, 235, 0.3);
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
        backdrop-filter: blur(10px);
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
      
      .fc-another-random-btn {
        background: linear-gradient(135deg, #87CEEB, #1E90FF);
        box-shadow: 0 3px 10px rgba(135, 206, 235, 0.3);
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
        backdrop-filter: blur(10px);
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
      
      .fc-article-title {
        color: #87CEEB;
        font-size: 1.2rem;
        font-weight: bold;
        margin-bottom: 8px;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
      
      /* 移动端响应式样式... */
      @media (max-width: 768px) {
        .fc-articles-grid {
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }
        
        .fc-stat-card {
          min-width: 100px;
        }
        
        .fc-random-article-content {
          flex-direction: column;
          text-align: center;
          gap: 15px;
        }
      }
      
      @media (max-width: 480px) {
        .fc-articles-grid {
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
        }
        
        .fc-stat-card {
          min-width: 90px;
          padding: 10px 12px;
        }
      }
      
      @media (max-width: 360px) {
        .fc-articles-grid {
          grid-template-columns: 1fr;
        }
        
        .fc-stat-card {
          min-width: 85px;
          padding: 8px 10px;
        }
      }
    \`;
    
    document.head.appendChild(style);
  }
  
  // 构建HTML结构
  function buildHTMLStructure(container) {
    container.innerHTML = \`
      <div class="friend-circle-container">
        <div class="fc-header">
          <h1 class="fc-title">朋友圈文章</h1>
          <div class="fc-stats-container">
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
          </div>
        </div>
        
        <div class="fc-controls-section">
          <div class="fc-last-updated" id="fcLastUpdated">最后更新：加载中...</div>
          <div class="fc-controls">
            <button class="fc-random-btn" id="fcRandomArticle">随机查看文章</button>
            <button class="fc-refresh-btn" id="fcRefreshData">刷新数据</button>
          </div>
          <div class="fc-search-container">
            <input type="text" class="fc-search-input" id="fcSearchInput" placeholder="搜索文章标题或作者...">
          </div>
        </div>
        
        <div class="fc-random-article-card" id="fcRandomArticleCard" style="display: none;">
          <div class="fc-random-article-content" id="fcRandomArticleContent"></div>
        </div>
        
        <div style="text-align: center; margin-bottom: 15px;">
          <span class="fc-article-count" id="fcArticleCount" style="color: #FFD700; font-size: 1rem; padding: 8px 15px; background: rgba(255, 255, 255, 0.1); border-radius: 8px; display: inline-block; border: 1px solid rgba(255, 255, 255, 0.2);">
            正在加载文章...
          </span>
        </div>
        
        <div class="fc-articles-grid" id="fcArticlesList"></div>
        
        <div class="fc-footer" style="text-align: center; margin-top: 35px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
          <a href="https://www.20010501.xyz" target="_blank" style="color: #FFD700; text-decoration: none; font-size: 1.1rem; font-weight: bold; transition: all 0.3s ease; padding: 8px 16px; border-radius: 40px; background: rgba(255, 255, 255, 0.1); display: inline-block;">宇外御风</a>
        </div>
      </div>
      
      <div class="fc-modal" id="fcAuthorModal">
        <div class="fc-modal-content">
          <div class="fc-modal-header">
            <h2 class="fc-modal-title" id="fcModalAuthorName">作者的文章</h2>
            <span class="fc-close-btn" id="fcCloseModal" style="color: #87CEEB; font-size: 1.8rem; cursor: pointer; transition: color 0.3s ease; line-height: 1;">&times;</span>
          </div>
          <ul class="fc-modal-articles" id="fcModalArticlesList" style="list-style: none;"></ul>
        </div>
      </div>
    \`;
  }
  
  // 显示统计数据
  function displayStats(data) {
    const stats = data.statistical_data;
    if (stats) {
      document.getElementById('fcFriendsNum').textContent = stats.friends_num || 0;
      document.getElementById('fcActiveNum').textContent = stats.active_num || 0;
      document.getElementById('fcArticleNum').textContent = stats.article_num || 0;
      document.getElementById('fcLastUpdated').textContent = '最后更新：' + (stats.last_updated_time || '未知');
    }
  }
  
  // 显示文章列表
  function displayArticles() {
    const articlesList = document.getElementById('fcArticlesList');
    articlesList.innerHTML = '';
    
    // 更新文章数量显示
    document.getElementById('fcArticleCount').textContent = '共 ' + filteredArticles.length + ' 篇文章';
    
    if (filteredArticles.length === 0) {
      articlesList.innerHTML = '<div style="color: #FFD700; text-align: center; padding: 40px; grid-column: 1 / -1; background: rgba(255, 255, 255, 0.1); border-radius: 12px;">没有找到相关文章</div>';
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
      
      articleElement.innerHTML = \`
        <div class="fc-article-header">
          <img src="\${article.avatar}" alt="\${article.author}" class="fc-author-avatar" 
               onclick="event.stopPropagation(); window.friendCircleShowAuthorArticles('\${article.author.replace(/'/g, "\\'")}')">
          <div class="fc-article-info">
            <div class="fc-article-title" onclick="event.stopPropagation(); window.friendCircleShowAuthorArticles('\${article.author.replace(/'/g, "\\'")}')">
              \${article.title}
            </div>
            <div class="fc-article-meta">
              <span class="fc-author-name" onclick="event.stopPropagation(); window.friendCircleShowAuthorArticles('\${article.author.replace(/'/g, "\\'")}')" style="cursor: pointer; transition: color 0.3s ease; display: inline-block; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #FFD700; font-size: 0.85rem;">
                \${article.author}
              </span>
            </div>
          </div>
        </div>
        <div class="fc-article-excerpt">
          \${excerpt}
        </div>
        <div class="fc-article-footer">
          <span class="fc-article-date">\${date}</span>
          <span class="fc-read-more">阅读全文 →</span>
        </div>
      \`;
      
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
    
    randomContent.innerHTML = \`
      <img src="\${randomArticle.avatar}" alt="\${randomArticle.author}" class="fc-random-article-avatar"
           onclick="window.friendCircleShowAuthorArticles('\${randomArticle.author.replace(/'/g, "\\'")}')">
      <div class="fc-random-article-info">
        <div class="fc-random-article-title" onclick="window.friendCircleShowAuthorArticles('\${randomArticle.author.replace(/'/g, "\\'")}')">
          \${randomArticle.title}
        </div>
        <div class="fc-random-article-author" onclick="window.friendCircleShowAuthorArticles('\${randomArticle.author.replace(/'/g, "\\'")}')">
          作者: \${randomArticle.author}
        </div>
        <div class="fc-random-article-excerpt">\${excerpt}</div>
        <div class="fc-random-article-actions">
          <button class="fc-random-article-btn" onclick="window.open('\${randomArticle.link}', '_blank')">阅读这篇文章</button>
          <button class="fc-random-article-btn fc-another-random-btn" onclick="window.friendCircleShowRandomArticle()">换一篇推荐</button>
        </div>
      </div>
    \`;
    
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
      
      modalAuthorName.textContent = authorName + '的文章';
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
          articleItem.style.cssText = 'padding: 15px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); cursor: pointer; transition: all 0.3s ease;';
          articleItem.onclick = () => {
            window.open(article.link, '_blank');
            modal.style.display = 'none';
          };
          
          articleItem.innerHTML = \`
            <div class="fc-modal-article-title">\${article.title}</div>
            <div class="fc-modal-article-date">\${date}</div>
            <div class="fc-modal-article-excerpt">\${excerpt}</div>
          \`;
          
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
})();
</script>

<style>
  #friend-circle-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    margin: 20px 0;
    padding: 20px;
    min-height: 500px;
  }
  
  body {
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
    background-attachment: fixed;
    min-height: 100vh;
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
</style>
    `;
  }, {async: true});
}

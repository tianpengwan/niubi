/**
 * Hexo朋友圈插件优化版
 * 增强错误处理，优化数据加载
 */

// 避免在Node.js环境中执行
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  console.log('朋友圈插件开始加载...');
  
  // 等待DOM加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFriendCircle);
  } else {
    // 如果DOM已经加载完成，直接初始化
    setTimeout(initFriendCircle, 100);
  }
}

// 初始化朋友圈
async function initFriendCircle() {
  console.log('开始初始化朋友圈...');
  
  // 查找或创建容器
  let container = document.getElementById('friend-circle-container');
  if (!container) {
    console.warn('未找到朋友圈容器，正在创建...');
    container = document.createElement('div');
    container.id = 'friend-circle-container';
    container.style.cssText = 'min-height: 500px; padding: 20px;';
    document.body.appendChild(container);
  }
  
  // 显示加载状态
  showLoading(container, true);
  
  try {
    // 添加CSS样式
    addStyles();
    
    // 构建HTML结构
    buildHTMLStructure(container);
    
    // 加载数据
    const data = await loadFriendCircleData();
    
    // 隐藏加载状态
    showLoading(container, false);
    
    // 初始化UI
    await initializeUI(data);
    
    console.log('朋友圈初始化完成！');
  } catch (error) {
    console.error('朋友圈初始化失败:', error);
    showLoading(container, false);
    showError(container, '朋友圈加载失败: ' + error.message);
  }
}

// 显示/隐藏加载状态
function showLoading(container, isLoading) {
  if (isLoading) {
    container.innerHTML = `
      <div style="
        text-align: center; 
        padding: 60px; 
        color: #666;
        font-size: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      ">
        <div style="
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        "></div>
        <div>正在加载朋友圈数据...</div>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
  } else {
    // 加载完成后，如果容器中仍然是加载状态，清空它
    if (container.innerHTML.includes('正在加载朋友圈数据')) {
      container.innerHTML = '';
    }
  }
}

// 显示错误信息
function showError(container, message) {
  container.innerHTML = `
    <div style="
      text-align: center; 
      padding: 40px; 
      color: #e74c3c;
      background: rgba(231, 76, 60, 0.1);
      border-radius: 10px;
      margin: 20px;
      border: 1px solid rgba(231, 76, 60, 0.2);
    ">
      <h3 style="color: #e74c3c; margin-bottom: 15px;">加载失败</h3>
      <p style="margin-bottom: 20px;">${message}</p>
      <button onclick="location.reload()" style="
        background: #3498db;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      ">重试</button>
    </div>
  `;
}

// 加载朋友圈数据
async function loadFriendCircleData() {
  console.log('开始加载朋友圈数据...');
  
  const dataSources = [
    fetchDataFromAPI,
    fetchDataFromAPIBackup,
    getMockData
  ];
  
  for (let i = 0; i < dataSources.length; i++) {
    try {
      console.log(`尝试数据源 ${i + 1}/${dataSources.length}...`);
      const data = await dataSources[i]();
      if (data && data.article_data) {
        console.log(`数据源 ${i + 1} 成功，获取到 ${data.article_data.length} 篇文章`);
        return data;
      }
    } catch (error) {
      console.warn(`数据源 ${i + 1} 失败:`, error.message);
    }
  }
  
  throw new Error('所有数据源都失败了');
}

// 从API获取数据
async function fetchDataFromAPI() {
  const url = 'https://pyq.20010501.xyz/all';
  console.log('从API获取数据:', url);
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    // 尝试解析文本为JSON
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      // 尝试解析XML
      return parseXMLData(text);
    }
  }
}

// 备用API获取方法
async function fetchDataFromAPIBackup() {
  const url = 'https://pyq.20010501.xyz/all';
  console.log('从备用API获取数据:', url);
  
  const response = await fetch(url);
  const text = await response.text();
  return parseXMLData(text);
}

// 解析XML数据
function parseXMLData(text) {
  console.log('尝试解析XML数据...');
  
  try {
    // 移除可能的XML声明
    const cleanText = text.replace(/<\?xml[^>]*\?>/, '').trim();
    
    // 尝试直接解析为JSON
    if (cleanText.startsWith('{') || cleanText.startsWith('[')) {
      return JSON.parse(cleanText);
    }
    
    // 尝试查找JSON数据
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('未找到JSON数据');
  } catch (error) {
    throw new Error('XML解析失败: ' + error.message);
  }
}

// 获取模拟数据
function getMockData() {
  console.log('使用模拟数据...');
  
  const authors = [
    "杜老师说", "安知鱼`Blog", "宇外御风", "技术小站", 
    "编程之道", "前端开发", "后端架构", "人工智能探索"
  ];
  
  const mockArticles = [];
  const articleCount = 24;
  
  for (let i = 1; i <= articleCount; i++) {
    const author = authors[Math.floor(Math.random() * authors.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    mockArticles.push({
      floor: i,
      title: `文章示例 ${i}: 关于${['前端', '后端', 'AI', '云计算', '大数据', '区块链'][i % 6]}的技术分享`,
      created: date.toISOString().split('T')[0],
      updated: date.toISOString().split('T')[0],
      link: `https://example.com/article/${i}`,
      author: author,
      avatar: getDefaultAvatar(author),
      summary: `这是第 ${i} 篇文章的示例摘要，展示了朋友圈功能的基本显示效果。作者分享了关于${['前端', '后端', 'AI', '云计算', '大数据', '区块链'][i % 6]}的实践经验和心得体会。`
    });
  }
  
  return {
    statistical_data: {
      friends_num: 42,
      active_num: 28,
      error_num: 14,
      article_num: articleCount,
      last_updated_time: new Date().toLocaleString('zh-CN')
    },
    article_data: mockArticles
  };
}

// 获取默认头像
function getDefaultAvatar(authorName) {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
  ];
  const colorIndex = authorName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const firstLetter = authorName.charAt(0).toUpperCase();
  
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="${colors[colorIndex]}"/>
    <text x="50" y="60" font-size="40" text-anchor="middle" fill="white" font-family="Arial, sans-serif">${firstLetter}</text>
  </svg>`;
}

// 添加CSS样式
function addStyles() {
  if (document.getElementById('friend-circle-styles')) {
    return; // 样式已添加
  }
  
  const style = document.createElement('style');
  style.id = 'friend-circle-styles';
  style.textContent = `
    .friend-circle-app {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Microsoft YaHei', sans-serif;
    }
    
    .fc-title {
      text-align: center;
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 30px;
      background: linear-gradient(45deg, #FFD700, #FFA500);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    
    .fc-stats-container {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }
    
    .fc-stat-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      min-width: 120px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }
    
    .fc-stat-card:hover {
      transform: translateY(-5px);
    }
    
    .fc-stat-number {
      font-size: 2rem;
      font-weight: bold;
      color: #1a2a6c;
      margin-bottom: 5px;
    }
    
    .fc-stat-label {
      font-size: 0.9rem;
      color: #666;
    }
    
    .fc-controls {
      display: flex;
      gap: 15px;
      justify-content: center;
      margin-bottom: 25px;
      flex-wrap: wrap;
    }
    
    .fc-btn {
      padding: 12px 24px;
      border-radius: 25px;
      border: none;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .fc-random-btn {
      background: linear-gradient(45deg, #FFD700, #FFA500);
      color: #1a2a6c;
    }
    
    .fc-refresh-btn {
      background: linear-gradient(45deg, #87CEEB, #1E90FF);
      color: white;
    }
    
    .fc-search-input {
      width: 100%;
      max-width: 400px;
      padding: 12px 20px;
      border: 2px solid #e0e0e0;
      border-radius: 25px;
      font-size: 1rem;
      margin: 0 auto 25px;
      display: block;
    }
    
    .fc-search-input:focus {
      outline: none;
      border-color: #87CEEB;
      box-shadow: 0 0 0 3px rgba(135, 206, 235, 0.2);
    }
    
    .fc-articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }
    
    .fc-article-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }
    
    .fc-article-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }
    
    .fc-article-header {
      padding: 20px;
      border-bottom: 1px solid #f0f0f0;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .fc-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #FFD700;
    }
    
    .fc-article-info {
      flex: 1;
    }
    
    .fc-article-title {
      font-size: 1.2rem;
      font-weight: 600;
      color: #1a2a6c;
      margin-bottom: 5px;
      line-height: 1.4;
    }
    
    .fc-author-name {
      color: #666;
      font-size: 0.9rem;
    }
    
    .fc-article-content {
      padding: 20px;
    }
    
    .fc-article-excerpt {
      color: #666;
      line-height: 1.6;
      margin-bottom: 15px;
    }
    
    .fc-article-footer {
      padding: 15px 20px;
      border-top: 1px solid #f0f0f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .fc-article-date {
      color: #999;
      font-size: 0.85rem;
    }
    
    .fc-read-more {
      color: #87CEEB;
      text-decoration: none;
      font-weight: 600;
      font-size: 0.9rem;
    }
    
    .fc-footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      margin-top: 20px;
    }
    
    .fc-footer-link {
      color: #FFD700;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.1rem;
    }
    
    .fc-footer-link:hover {
      text-decoration: underline;
    }
    
    /* 随机文章卡片 */
    .fc-random-card {
      background: linear-gradient(45deg, rgba(255, 215, 0, 0.1), rgba(135, 206, 235, 0.1));
      border-radius: 12px;
      padding: 25px;
      margin: 25px 0;
      border: 2px solid rgba(255, 215, 0, 0.3);
    }
    
    .fc-random-badge {
      display: inline-block;
      background: linear-gradient(45deg, #FFD700, #FFA500);
      color: #1a2a6c;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 15px;
    }
    
    .fc-random-content {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .fc-random-avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #FFD700;
    }
    
    .fc-random-title {
      font-size: 1.4rem;
      font-weight: 700;
      color: #1a2a6c;
      margin-bottom: 10px;
    }
    
    .fc-random-actions {
      display: flex;
      gap: 10px;
      margin-top: 20px;
    }
    
    .fc-random-btn-small {
      padding: 8px 16px;
      border-radius: 20px;
      border: none;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
    }
    
    /* 响应式设计 */
    @media (max-width: 768px) {
      .fc-articles-grid {
        grid-template-columns: 1fr;
      }
      
      .fc-stats-container {
        flex-direction: column;
        align-items: center;
      }
      
      .fc-stat-card {
        width: 100%;
        max-width: 200px;
      }
      
      .fc-random-content {
        flex-direction: column;
        text-align: center;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// 构建HTML结构
function buildHTMLStructure(container) {
  container.innerHTML = `
    <div class="friend-circle-app">
      <h1 class="fc-title">朋友圈文章</h1>
      
      <div class="fc-stats-container">
        <div class="fc-stat-card">
          <div class="fc-stat-number" id="fcFriendsNum">0</div>
          <div class="fc-stat-label">好友数量</div>
        </div>
        <div class="fc-stat-card">
          <div class="fc-stat-number" id="fcActiveNum">0</div>
          <div class="fc-stat-label">活跃好友</div>
        </div>
        <div class="fc-stat-card">
          <div class="fc-stat-number" id="fcArticleNum">0</div>
          <div class="fc-stat-label">文章数量</div>
        </div>
      </div>
      
      <div style="text-align: center; margin-bottom: 20px; color: #666;">
        最后更新: <span id="fcLastUpdated">加载中...</span>
      </div>
      
      <div class="fc-controls">
        <button class="fc-btn fc-random-btn" id="fcRandomBtn">随机查看文章</button>
        <button class="fc-btn fc-refresh-btn" id="fcRefreshBtn">刷新数据</button>
      </div>
      
      <input type="text" class="fc-search-input" id="fcSearchInput" placeholder="搜索文章标题或作者...">
      
      <div class="fc-random-card" id="fcRandomCard" style="display: none;">
        <div class="fc-random-badge">🎲 随机推荐</div>
        <div class="fc-random-content" id="fcRandomContent"></div>
      </div>
      
      <div style="text-align: center; margin: 20px 0; font-size: 1.1rem; color: #666;">
        共 <span id="fcArticleCount">0</span> 篇文章
      </div>
      
      <div class="fc-articles-grid" id="fcArticlesList">
        <!-- 文章列表将在这里动态生成 -->
      </div>
      
      <div class="fc-footer">
        <a href="https://www.20010501.xyz" target="_blank" class="fc-footer-link">宇外御风</a>
      </div>
    </div>
  `;
}

// 初始化UI
async function initializeUI(data) {
  console.log('初始化UI...');
  
  // 显示统计数据
  displayStats(data);
  
  // 显示文章列表
  displayArticles(data.article_data || []);
  
  // 设置事件监听
  setupEventListeners(data.article_data || []);
  
  // 显示随机文章
  setTimeout(() => {
    showRandomArticle(data.article_data || []);
  }, 100);
}

// 显示统计数据
function displayStats(data) {
  const stats = data.statistical_data;
  if (stats) {
    document.getElementById('fcFriendsNum').textContent = stats.friends_num || 0;
    document.getElementById('fcActiveNum').textContent = stats.active_num || 0;
    document.getElementById('fcArticleNum').textContent = stats.article_num || 0;
    document.getElementById('fcLastUpdated').textContent = stats.last_updated_time || '未知';
  }
}

// 显示文章列表
function displayArticles(articles) {
  const articlesList = document.getElementById('fcArticlesList');
  const articleCount = document.getElementById('fcArticleCount');
  
  if (!articles || articles.length === 0) {
    articlesList.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
        暂无文章
      </div>
    `;
    articleCount.textContent = '0';
    return;
  }
  
  articleCount.textContent = articles.length;
  articlesList.innerHTML = '';
  
  // 按更新日期排序（从新到旧）
  const sortedArticles = [...articles].sort((a, b) => {
    const dateA = new Date(a.updated || a.created || 0);
    const dateB = new Date(b.updated || b.created || 0);
    return dateB - dateA;
  });
  
  sortedArticles.forEach(article => {
    const articleElement = document.createElement('div');
    articleElement.className = 'fc-article-card';
    articleElement.onclick = () => window.open(article.link, '_blank');
    
    const date = article.updated || article.created || '未知日期';
    const excerpt = article.summary || `这篇文章由${article.author}分享，点击阅读全文查看详细内容。`;
    
    articleElement.innerHTML = `
      <div class="fc-article-header">
        <img src="${article.avatar || getDefaultAvatar(article.author)}" alt="${article.author}" class="fc-avatar">
        <div class="fc-article-info">
          <div class="fc-article-title">${article.title || '无标题'}</div>
          <div class="fc-author-name">${article.author || '未知作者'}</div>
        </div>
      </div>
      <div class="fc-article-content">
        <div class="fc-article-excerpt">${excerpt}</div>
      </div>
      <div class="fc-article-footer">
        <div class="fc-article-date">${date}</div>
        <div class="fc-read-more">阅读全文 →</div>
      </div>
    `;
    
    articlesList.appendChild(articleElement);
  });
}

// 显示随机文章
function showRandomArticle(articles) {
  const randomCard = document.getElementById('fcRandomCard');
  const randomContent = document.getElementById('fcRandomContent');
  
  if (!articles || articles.length === 0) {
    randomCard.style.display = 'none';
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * articles.length);
  const randomArticle = articles[randomIndex];
  
  randomContent.innerHTML = `
    <img src="${randomArticle.avatar || getDefaultAvatar(randomArticle.author)}" alt="${randomArticle.author}" class="fc-random-avatar">
    <div style="flex: 1;">
      <div class="fc-random-title">${randomArticle.title || '无标题'}</div>
      <div style="color: #666; margin-bottom: 10px;">作者: ${randomArticle.author || '未知作者'}</div>
      <div style="color: #666; line-height: 1.6;">${randomArticle.summary || '这篇文章分享了实用的技术经验和见解。'}</div>
      <div class="fc-random-actions">
        <button class="fc-random-btn-small" style="background: #FFD700; color: #1a2a6c;" onclick="window.open('${randomArticle.link}', '_blank')">阅读这篇文章</button>
        <button class="fc-random-btn-small" style="background: #87CEEB; color: white;" onclick="window.friendCircleShowRandomArticle()">换一篇推荐</button>
      </div>
    </div>
  `;
  
  randomCard.style.display = 'block';
}

// 设置事件监听
function setupEventListeners(articles) {
  // 随机文章按钮
  document.getElementById('fcRandomBtn').addEventListener('click', () => {
    showRandomArticle(articles);
    document.getElementById('fcRandomCard').scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  });
  
  // 刷新按钮
  document.getElementById('fcRefreshBtn').addEventListener('click', async () => {
    const refreshBtn = document.getElementById('fcRefreshBtn');
    const originalText = refreshBtn.textContent;
    
    refreshBtn.textContent = '刷新中...';
    refreshBtn.disabled = true;
    
    try {
      const newData = await loadFriendCircleData();
      displayStats(newData);
      displayArticles(newData.article_data || []);
      showRandomArticle(newData.article_data || []);
      console.log('数据刷新成功');
    } catch (error) {
      console.error('刷新失败:', error);
      alert('刷新失败: ' + error.message);
    } finally {
      refreshBtn.textContent = originalText;
      refreshBtn.disabled = false;
    }
  });
  
  // 搜索功能
  document.getElementById('fcSearchInput').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (!searchTerm) {
      displayArticles(articles);
      return;
    }
    
    const filtered = articles.filter(article => 
      (article.title && article.title.toLowerCase().includes(searchTerm)) ||
      (article.author && article.author.toLowerCase().includes(searchTerm)) ||
      (article.summary && article.summary.toLowerCase().includes(searchTerm))
    );
    
    displayArticles(filtered);
  });
  
  // 暴露全局函数
  window.friendCircleShowRandomArticle = () => {
    showRandomArticle(articles);
  };
}

// 确保在页面加载后执行
if (typeof window !== 'undefined') {
  window.initFriendCircle = initFriendCircle;
}

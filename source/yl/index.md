---
date: '2024-07-14'
updated: '2024-07-14'
comment: 'waline'
top_img: https://t.alcy.cc/pc/
---

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>友情链接 | 记录生活</title>
  <style>
    :root {
      --primary-color: #eb5757;
      --card-bg: rgba(255, 255, 255, 0.9);
    }

    /* 优化全局样式 */
    body {
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      min-height: 100vh;
    }

    /* 友链容器样式 */
    .friend-container {
      max-width: 1200px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    /* 我的友链信息卡片 */
    .my-info-card {
      background: var(--card-bg);
      border-radius: 15px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }

    .info-item {
      display: flex;
      align-items: center;
      margin: 1rem 0;
      font-size: 1.1rem;
    }

    .info-item i {
      margin-right: 1rem;
      color: var(--primary-color);
    }

    /* 友链列表样式 */
    .friend-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .friend-card {
      background: var(--card-bg);
      border-radius: 12px;
      padding: 1.5rem;
      transition: transform 0.3s ease;
      display: flex;
      align-items: center;
    }

    .friend-card:hover {
      transform: translateY(-5px);
    }

    .friend-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 1rem;
      object-fit: cover;
    }

    .friend-info {
      flex: 1;
    }

    .friend-name {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .friend-desc {
      font-size: 0.9em;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    /* 留言区样式 */
    .comment-section {
      background: var(--card-bg);
      border-radius: 15px;
      padding: 2rem;
      margin-top: 2rem;
    }

    @media (max-width: 768px) {
      .friend-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>

<body>
  <!-- 我的友链信息 -->
  <div class="friend-container">
    <div class="my-info-card">
      <h2 style="margin-bottom: 1.5rem; color: var(--primary-color);">📮 我的友链信息</h2>
      <div class="info-item">
        <i class="fas fa-seedling"></i>
        <span>站点名称：宇外御风的hexo博客</span>
      </div>
      <div class="info-item">
        <i class="fas fa-info-circle"></i>
        <span>站点简介：分享免费有趣的知识</span>
      </div>
      <div class="info-item">
        <i class="fas fa-link"></i>
        <span>站点地址：<a href="https://20010501.xyz" target="_blank">https://20010501.xyz</a></span>
      </div>
      <div class="info-item">
        <i class="fas fa-image"></i>
        <span>站点图片：<code>https://20010501.xyz/fluid.png</code></span>
      </div>
    </div>

    <!-- 友链展示 -->
    <h2 style="color: var(--primary-color); margin: 2rem 0;">🍀 我的可爱友友们</h2>
    <div id="qexo-friend-link" class="friend-grid"></div>

    <!-- 留言区 -->
    <div class="comment-section">
      <h3 style="margin-bottom: 1.5rem; color: var(--primary-color);">💌 留言申请友链</h3>
      <div id="waline-comment"></div>
    </div>
  </div>

  <script>
    // 加载Qexo友链
    loadQexoFriends({
      id: "qexo-friend-link",
      url: "https://hexoadmin.20010501.xyz",
      template: `
        <div class="friend-card">
          <img src="{avatar}" class="friend-avatar" alt="{name}">
          <div class="friend-info">
            <div class="friend-name">
              <a href="{link}" target="_blank">{name}</a>
            </div>
            <div class="friend-desc">{descr}</div>
          </div>
        </div>
      `
    });

    // 初始化Waline评论
    Waline.init({
      el: '#waline-comment',
      serverURL: 'https://your-waline-domain.com',
      comment: true,
      pageview: false,
      emoji: [
        'https://unpkg.com/@waline/emojis@1.1.0/weibo',
        'https://unpkg.com/@waline/emojis@1.1.0/bilibili'
      ],
      requiredMeta: ['nick', 'mail'],
      login: 'enable',
    });
  </script>
</body>

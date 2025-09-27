'use strict';

hexo.extend.tag.register('memorable_days', function(args) {
  const includeGallery = args.length > 0 ? args[0] !== 'noGallery' : true;
  
  return `
    <div class="memorable-days-container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>
        :root {
            --primary: #5B8CBF;
            --secondary: #4C7FA0;
            --family: #A06B9A;
            --couple: #FF6B8B;
            --holiday: #E99A5B;
            --accent: #FFD700;
            --light: #F7FBFF;
            --dark: #333333;
            --text: #FFA500; /* 修改为橘黄色 */
        }

        .memorable-days-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .memorable-days-container {
            color: var(--text);
            overflow-x: hidden;
            position: relative;
        }

        .memorable-days-container .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        .memorable-days-container header {
            text-align: center;
            padding: 40px 20px;
            animation: fadeIn 1.5s ease-out;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .memorable-days-container header h1 {
            font-size: 2.5rem;
            margin-bottom: 15px;
            color: var(--text);
        }

        .memorable-days-container header .subtitle {
            font-size: 1.2rem;
            margin-bottom: 20px;
            color: var(--text);
        }

        .memorable-days-container .heart {
            animation: heartbeat 1.5s infinite;
            font-size: 2.5rem;
            color: var(--couple);
        }

        .memorable-days-container .filter-container {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
            flex-wrap: wrap;
        }

        .memorable-days-container .filter-btn {
            padding: 8px 16px;
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            cursor: pointer;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: var(--text);
        }

        .memorable-days-container .filter-btn.active {
            background: rgba(255, 255, 255, 0.4);
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .memorable-days-container .timeline-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 40px;
        }

        .memorable-days-container .event-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: slideUp 0.8s ease-out;
            animation-fill-mode: both;
        }

        .memorable-days-container .event-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }

        .memorable-days-container .event-card.couple {
            border-top: 4px solid var(--couple);
        }

        .memorable-days-container .event-card.family {
            border-top: 4px solid var(--family);
        }

        .memorable-days-container .event-card.holiday {
            border-top: 4px solid var(--holiday);
        }

        .memorable-days-container .event-title {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            font-size: 1.4rem;
            color: var(--text);
        }

        .memorable-days-container .event-title.couple {
            color: var(--couple);
        }

        .memorable-days-container .event-title.family {
            color: var(--family);
        }

        .memorable-days-container .event-title.holiday {
            color: var(--holiday);
        }

        .memorable-days-container .event-title i {
            font-size: 1.5rem;
        }

        .memorable-days-container .event-date {
            font-size: 0.95rem;
            margin-bottom: 15px;
            color: var(--text);
            opacity: 0.8;
        }

        .memorable-days-container .countdown {
            font-size: 3.5rem;
            font-weight: bold;
            margin: 15px 0;
            text-align: center;
            color: var(--text);
        }

        .memorable-days-container .countdown-label {
            text-align: center;
            font-size: 1.1rem;
            margin-bottom: 15px;
            color: var(--text);
        }

        .memorable-days-container .description {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 20px;
            color: var(--text);
        }

        .memorable-days-container .category-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 15px;
            font-size: 0.85rem;
            font-weight: 500;
        }

        .memorable-days-container .couple .category-badge {
            background: rgba(255, 107, 139, 0.2);
            color: var(--couple);
        }

        .memorable-days-container .family .category-badge {
            background: rgba(160, 107, 154, 0.2);
            color: var(--family);
        }

        .memorable-days-container .holiday .category-badge {
            background: rgba(233, 154, 91, 0.2);
            color: var(--holiday);
        }

        .memorable-days-container .photo-gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }

        .memorable-days-container .photo-item {
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            height: 250px;
        }

        .memorable-days-container .photo-item:hover {
            transform: scale(1.03);
        }

        .memorable-days-container .photo-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            display: block;
        }

        .memorable-days-container .photo-caption {
            padding: 12px;
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            color: var(--text);
            font-weight: 500;
        }

        .memorable-days-container footer {
            text-align: center;
            padding: 30px 20px;
            margin-top: 40px;
            background: linear-gradient(45deg, #6a11cb, #2575fc, #ff8a00, #ff2079);
            background-size: 300% 300%;
            animation: gradientBG 15s ease infinite;
            border-radius: 10px;
        }

        .memorable-days-container footer p {
            font-size: 1.1rem;
            color: white;
            font-weight: 500;
        }

        .memorable-days-container footer a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            position: relative;
        }

        .memorable-days-container footer a::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -2px;
            left: 0;
            background: white;
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .memorable-days-container footer a:hover::after {
            transform: scaleX(1);
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from { 
                opacity: 0; 
                transform: translateY(30px);
            }
            to { 
                opacity: 1; 
                transform: translateY(0);
            }
        }

        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @media (max-width: 768px) {
            .memorable-days-container .timeline-container {
                grid-template-columns: 1fr;
            }

            .memorable-days-container .photo-gallery {
                grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            }

            .memorable-days-container .filter-container {
                gap: 8px;
            }

            .memorable-days-container .filter-btn {
                padding: 6px 12px;
                font-size: 0.9rem;
            }
        }
      </style>
      
      <div class="container">
        <header>
          <h1>珍重时光记忆</h1>
          <p class="subtitle">珍藏重要日子的倒计时 - 爱情、亲情与佳节</p>
          <div class="heart">
            <i class="fas fa-heart"></i>
          </div>
        </header>

        <div class="filter-container">
          <div class="filter-btn active" data-category="all">全部</div>
          <div class="filter-btn" data-category="couple">爱情纪念</div>
          <div class="filter-btn" data-category="family">家庭纪念</div>
          <div class="filter-btn" data-category="holiday">节日庆典</div>
        </div>

        <div class="timeline-container" id="eventsContainer">
          <!-- 事件卡片将由JavaScript动态生成 -->
        </div>

        ${includeGallery ? `
        <h2 style="text-align: center; margin: 50px 0 30px; color: var(--text);">珍贵瞬间</h2>
        <div class="photo-gallery">
          <div class="photo-item">
            <img src="https://cftcr2.20010501.xyz/PicHoro/P20250606-210549.webp" alt="全家福">
            <div class="photo-caption">全家欢聚时刻</div>
          </div>
          <div class="photo-item">
            <img src="https://cftcr2.20010501.xyz/PicHoro/P20250607-115052.webp" alt="节日庆典">
            <div class="photo-caption">节日欢乐</div>
          </div>
          <div class="photo-item">
            <img src="https://cftcr2.20010501.xyz/PicHoro/mmexport1747102178258.jpg" alt="浪漫时刻">
            <div class="photo-caption">浪漫回忆</div>
          </div>
          <div class="photo-item">
            <img src="https://cftcr2.20010501.xyz/PicHoro/mmexport1746262181543.jpg" alt="特别时刻">
            <div class="photo-caption">特别纪念</div>
          </div>
        </div>
        ` : ''}
      </div>

      <footer>
        <p>珍藏每一份回忆 © 2023-2025 <a href="https://space.bilibili.com/440611061/">宇外御风</a></p>
      </footer>

      <script>
        (function() {
          // 重要事件数据库
          const eventsData = [
            {
                id: 'meet',
                title: '相遇纪念日',
                date: '2025-04-07',
                category: 'couple',
                icon: 'fa-heart',
                description: '相识的美好起点',
                countDirection: 'past'
            },
            {
                id: 'love',
                title: '恋爱纪念日',
                date: '2025-04-17',
                category: 'couple',
                icon: 'fa-ring',
                description: '爱情的甜蜜旅程',
                countDirection: 'past'
            },
            {
                id: 'mother-birthday',
                title: '妳的生日',
                date: '2007-03-25',
                category: 'family',
                icon: 'fa-birthday-cake',
                description: '为小乖送上祝福的日子',
                countDirection: 'future'
            },
            {
                id: 'my-birthday',
                title: '我的生日',
                date: '2001-05-01',
                category: 'family',
                icon: 'fa-birthday-cake',
                description: '为我送上祝福的日子',
                countDirection: 'future'
            },
            {
                id: 'mom-birthday',
                title: '妈妈生日',
                date: '1983-08-03',
                category: 'family',
                icon: 'fa-user',
                description: '为妈妈送上祝福的日子',
                countDirection: 'future'
            },
            {
                id: 'dad-birthday',
                title: '爸爸生日',
                date: '1978-06-28',
                category: 'family',
                icon: 'fa-user',
                description: '为爸爸庆祝的特殊日子',
                countDirection: 'future'
            },
            {
                id: 'spring-festival',
                title: '春节',
                date: '2026-02-17',
                category: 'holiday',
                icon: 'fa-gift',
                description: '中国最重要的传统节日',
                countDirection: 'future'
            }
          ];

          // 日期格式化函数
          function formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return \`\${year}年\${month}月\${day}日\`;
          }

          // 计算倒计时天数
          function calculateCountdown(event) {
            const now = new Date();
            const targetDate = new Date(event.date);

            if (event.countDirection === 'future') {
              const currentYear = now.getFullYear();
              targetDate.setFullYear(currentYear);

              if (targetDate < now) {
                targetDate.setFullYear(currentYear + 1);
              }
            }

            const diff = event.countDirection === 'past' 
                ? now - new Date(event.date) 
                : targetDate - now;

            return Math.floor(Math.abs(diff) / (1000 * 60 * 60 * 24));
          }

          // 生成事件卡片
          function createEventCard(event) {
            const days = calculateCountdown(event);

            const card = document.createElement('div');
            card.className = \`event-card \${event.category}\`;
            card.innerHTML = \`
                <h2 class="event-title \${event.category}">
                    <i class="fas \${event.icon}"></i> \${event.title}
                </h2>
                <div class="event-date">\${formatDate(event.date)}</div>
                <div class="countdown">\${days}</div>
                <div class="countdown-label">
                    \${event.countDirection === 'past' ? '已过去' : '距离'} 
                    \${days}天
                </div>
                <p class="description">\${event.description}</p>
                <div class="category-badge">
                    \${event.category === 'couple' ? '爱情' : 
                      event.category === 'family' ? '家庭' : '节日'}
                </div>
            \`;

            return card;
          }

          // 渲染所有事件卡片
          function renderEvents(category = 'all') {
            const container = document.getElementById('eventsContainer');
            if (!container) return;
            
            container.innerHTML = '';

            const filterEvents = category === 'all' 
                ? eventsData 
                : eventsData.filter(event => event.category === category);

            filterEvents.forEach(event => {
              container.appendChild(createEventCard(event));
            });

            if (filterEvents.length === 0) {
              container.innerHTML = '<p style="text-align:center;grid-column:1/-1;padding:40px;">暂时没有此类事件</p>';
            }
          }

          // 初始化筛选按钮事件
          function initFilterButtons() {
            const buttons = document.querySelectorAll('.memorable-days-container .filter-btn');
            buttons.forEach(btn => {
              btn.addEventListener('click', () => {
                document.querySelector('.memorable-days-container .filter-btn.active').classList.remove('active');
                btn.classList.add('active');
                renderEvents(btn.dataset.category);
              });
            });
          }

          // 初始化页面
          document.addEventListener('DOMContentLoaded', () => {
            renderEvents();
            initFilterButtons();

            setInterval(() => {
              const activeBtn = document.querySelector('.memorable-days-container .filter-btn.active');
              if (activeBtn) {
                renderEvents(activeBtn.dataset.category);
              }
            }, 86400000);
          });
        })();
      </script>
    </div>
  `;
}, { async: true, ends: false });

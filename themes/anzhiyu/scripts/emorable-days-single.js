'use strict';
 
hexo.extend.tag.register('treasure_memory', function(args, content) {
return `
.treasure-memory-container { --primary: #5B8CBF; --secondary: #4C7FA0; --family: #A06B9A; --couple: #FF6B8B; --holiday: #E99A5B; --accent: #FFD700; --light: #F7FBFF; --dark: #333333; --text: #4A4A4A; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
.treasure-memory-container * {
margin: 0;
padding: 0;
box-sizing: border-box;
}
 
.treasure-memory-container body {
background: transparent;
color: var(--text);
min-height: 100vh;
overflow-x: hidden;
position: relative;
}
 
.treasure-memory-container .container {
max-width: 1200px;
margin: 0 auto;
padding: 20px;
}
 
.treasure-memory-container header {
text-align: center;
padding: 40px 20px;
animation: fadeIn 1.5s ease-out;
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border-radius: 16px;
margin-bottom: 30px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
 
.treasure-memory-container h1 {
font-size: clamp(2.5rem, 5vw, 4rem);
color: var(--primary);
margin-bottom: 15px;
}
 
.treasure-memory-container .subtitle {
font-size: clamp(1.2rem, 2.5vw, 1.8rem);
color: var(--secondary);
font-weight: 300;
max-width: 800px;
margin: 0 auto 30px;
}
 
.treasure-memory-container .filter-container {
display: flex;
justify-content: center;
gap: 15px;
margin: 20px 0;
flex-wrap: wrap;
}
 
.treasure-memory-container .filter-btn {
background: rgba(255, 255, 255, 0.15);
border: 2px solid rgba(255, 255, 255, 0.25);
color: var(--text);
padding: 8px 15px;
border-radius: 50px;
cursor: pointer;
transition: all 0.3s ease;
font-weight: 500;
backdrop-filter: blur(5px);
}
 
.treasure-memory-container .filter-btn.active,
.treasure-memory-container .filter-btn:hover {
background: rgba(255, 255, 255, 0.3);
border-color: var(--primary);
}
 
.treasure-memory-container .timeline-container {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 25px;
margin: 20px 0 40px;
}
 
.treasure-memory-container .event-card {
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border-radius: 16px;
padding: 25px;
transition: transform 0.3s ease, box-shadow 0.3s ease;
animation: slideUp 0.8s ease-out;
animation-fill-mode: backwards;
box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
border: 1px solid rgba(255, 255, 255, 0.2);
}
 
.treasure-memory-container .event-card.couple {
border-top: 4px solid var(--couple);
}
 
.treasure-memory-container .event-card.family {
border-top: 4px solid var(--family);
}
 
.treasure-memory-container .event-card.holiday {
border-top: 4px solid var(--holiday);
}
 
.treasure-memory-container .event-card:hover {
transform: translateY(-10px);
background: rgba(255, 255, 255, 0.2);
}
 
.treasure-memory-container .event-title {
font-size: 1.6rem;
color: var(--dark);
margin-bottom: 15px;
display: flex;
align-items: center;
gap: 10px;
}
 
.treasure-memory-container .event-title.couple i {
color: var(--couple);
}
 
.treasure-memory-container .event-title.family i {
color: var(--family);
}
 
.treasure-memory-container .event-title.holiday i {
color: var(--holiday);
}
 
.treasure-memory-container .event-date {
font-size: 1.1rem;
color: var(--secondary);
margin-bottom: 20px;
font-weight: 500;
}
 
.treasure-memory-container .countdown {
font-size: 2.2rem;
font-weight: 700;
text-align: center;
margin: 15px 0;
min-height: 50px;
}
 
.treasure-memory-container .couple .countdown {
color: var(--couple);
}
 
.treasure-memory-container .family .countdown {
color: var(--family);
}
 
.treasure-memory-container .holiday .countdown {
color: var(--holiday);
}
 
.treasure-memory-container .countdown-label {
text-align: center;
color: var(--dark);
font-size: 1rem;
margin-top: -5px;
}
 
.treasure-memory-container .description {
margin-top: 15px;
font-size: 1rem;
line-height: 1.5;
color: var(--text);
}
 
.treasure-memory-container .photo-gallery {
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: 15px;
margin: 50px 0;
}
 
.treasure-memory-container .photo-item {
border-radius: 12px;
overflow: hidden;
height: 250px;
position: relative;
box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
transition: transform 0.3s ease;
}
 
.treasure-memory-container .photo-item:hover {
transform: scale(1.03);
}
 
.treasure-memory-container .photo-item img {
width: 100%;
height: 100%;
object-fit: cover;
transition: transform 0.5s ease;
}
 
.treasure-memory-container .photo-item:hover img {
transform: scale(1.1);
}
 
.treasure-memory-container .photo-caption {
position: absolute;
bottom: 0;
left: 0;
right: 0;
background: rgba(0, 0, 0, 0.7);
color: white;
padding: 10px;
transform: translateY(100%);
transition: transform 0.3s ease;
text-align: center;
}
 
.treasure-memory-container .photo-item:hover .photo-caption {
transform: translateY(0);
}
 
.treasure-memory-container .heart {
color: var(--couple);
font-size: 2rem;
text-align: center;
margin: 30px 0;
animation: heartbeat 1.5s infinite;
}
 
.treasure-memory-container footer {
text-align: center;
padding: 30px 20px;
color: var(--text);
font-size: 0.9rem;
margin-top: 40px;
backdrop-filter: blur(5px);
background: rgba(255, 255, 255, 0.1);
border-radius: 16px;
}
 
.treasure-memory-container .category-badge {
display: inline-block;
padding: 3px 8px;
border-radius: 12px;
font-size: 0.8rem;
font-weight: 500;
margin-top: 10px;
}
 
.treasure-memory-container .couple .category-badge {
background-color: rgba(255, 107, 139, 0.1);
color: var(--couple);
}
 
.treasure-memory-container .family .category-badge {
background-color: rgba(160, 107, 154, 0.1);
color: var(--family);
}
 
.treasure-memory-container .holiday .category-badge {
background-color: rgba(233, 154, 91, 0.1);
color: var(--holiday);
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
 
@media (max-width: 768px) {
.treasure-memory-container .timeline-container {
grid-template-columns: 1fr;
}
 
.treasure-memory-container .photo-gallery {
grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}
 
.treasure-memory-container .filter-container {
gap: 8px;
}
 
.treasure-memory-container .filter-btn {
padding: 6px 12px;
font-size: 0.9rem;
}
}
 


珍重时光记忆
珍藏重要日子的倒计时 - 爱情、亲情与佳节


<
</

 

全部
爱情纪念
家庭纪念
节日庆典
 


 
珍贵瞬间


全家福
全家欢聚时刻


节日庆典
节日欢乐


浪漫时刻
浪漫回忆


特别时刻
特别纪念


 

珍藏每一份回忆 © 2023-2025 珍重时光记忆

 

(function() {
// 重要事件数据库 - 用户可以直接在此修改添加事件
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
icon: 'fa-user',
description: '为小乖送上祝福的日子',
countDirection: 'future'
},
{
id: 'my-birthday',
title: '我的生日',
date: '2001-05-01',
category: 'family',
icon: 'fa-user',
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
icon: 'fa-fire',
description: '中国最重要的传统节日',
countDirection: 'future'
}
];
 
// DOM元素
const eventsContainer = document.getElementById('treasure-eventsContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
 
// 日期格式化函数
function formatDate(dateString) {
const date = new Date(dateString);
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
return `${year}年${month}月${day}日`;
}
 
// 计算倒计时天数
function calculateCountdown(event) {
const now = new Date();
const targetDate = new Date(event.date);
 
// 对于每年重复的事件
if (event.countDirection === 'future') {
// 如果今年的该日期已过，计算明年的
const currentYear =
---
title: 朋友圈
date: 2022-01-29 15:23:17
comments: true
aside: false
---

<div class="author-content author-content-item single" style="background:url(https://t.alcy.cc/pc/) center /cover no-repeat!important">
    <div class="card-content">
      <div class="author-content-item-tips">朋友圈</div>
      <span class="author-content-item-title">看看朋友们写了什么</span>
      <div class="content-bottom">
        <div class="tips">今日听君歌一曲，暂凭杯酒长精神。</div>
      </div>
      <div class="banner-button-group">
        <a class="banner-button" style="padding: 8px 12px;color: var(--anzhiyu-pink);" onclick="pjax.loadUrl(&quot;/about&quot;)" data-pjax-state="">
          <i class="anzhiyufont anzhiyu-icon-arrow-circle-right" style="font-size:22px;margin-right:.25rem"></i>
          <span class="banner-button-text">关于本人</span>
        </a>
      </div>
    </div>
  </div>





<div id="friend-circle-container">与主机通讯中……</div>

<script>
    if (typeof UserConfig === 'undefined') {
        var UserConfig = {
            // 你的 hexo-circle-of-friends 后端 API 地址（需先部署后端）
            private_api_url: 'https://pyq.20010501.xyz/',
            // 每次点击“加载更多”时加载的文章数量，默认 24
            page_turning_number: 24,
            // 头像加载失败时的默认图片
            error_img: 'https://ypy.20010501.xyz/fluid.png',
        }
    }
</script>

<!-- 样式文件：以主题命名，目前仅支持 butterfly -->
<link rel="stylesheet" href="https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/Friend-Circle-Frontend/hexo-theme-butterfly/default.min.css">

<!-- 脚本文件：对应主题样式功能 -->
<script src="https://fastly.jsdelivr.net/gh/Rock-Candy-Tea/Friend-Circle-Frontend/hexo-theme-butterfly/default.min.js"></script>

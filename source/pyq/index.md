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



<div id="hexo-circle-of-friends-root"></div>
<script>
    let UserConfig = {
        // 填写你的api地址
        private_api_url: 'https://pyq.20010501.xyz/',
        // 点击加载更多时，一次最多加载几篇文章，默认10
        page_turning_number: 12,
        // 头像加载失败时，默认头像地址
        error_img: 'https://20010501.xyz/fluid.png',
        // 进入页面时第一次的排序规则
        sort_rule: 'created'
    }
</script>
<link rel="stylesheet" href="https://cftcr2.20010501.xyz/jscss/heoMainColor.css">
<script type="text/javascript" src="https://cftcr2.20010501.xyz/jscss/app.min.js"></script>
<script type="text/javascript" src="https://cftcr2.20010501.xyz/jscss/bundle.js"></script>


{% daily_news %}

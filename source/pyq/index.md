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





<div id="friend-circle-lite-root"></div>
<script>
  if (typeof UserConfig === "undefined") {
    var UserConfig = {
      // 填写你的fc Lite地址
      private_api_url: "https://friend-circle-lite-6h5.pages.dev/",
      // 点击加载更多时，一次最多加载几篇文章，默认20
      page_turning_number: 24,
      // 头像加载失败时，默认头像地址
      error_img: "https://pic.imgdb.cn/item/6695daa4d9c307b7e953ee3d.jpg",
    };
  }
</script>
<link
  rel="stylesheet"
  href="https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.css"
/>
<script src="https://fastly.jsdelivr.net/gh/willow-god/Friend-Circle-Lite/main/fclite.min.js"></script>

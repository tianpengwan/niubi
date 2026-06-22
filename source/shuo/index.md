---
title: 说说
date: 2020-07-22 22:06:17
comments: true
aside: false
---

<div class="author-content author-content-item single" style="background:url(https://t.alcy.cc/pc/) center /cover no-repeat!important">
    <div class="card-content">
      <div class="author-content-item-tips">说说</div>
      <span class="author-content-item-title">记录生活</span>
      <div class="content-bottom">
        <div class="tips">人生到处知何似，应似飞鸿踏雪泥</div>
      </div>
      <div class="banner-button-group">
        <a class="banner-button" style="padding: 8px 12px;color: var(--anzhiyu-pink);" onclick="pjax.loadUrl(&quot;/about&quot;)" data-pjax-state="">
          <i class="anzhiyufont anzhiyu-icon-arrow-circle-right" style="font-size:22px;margin-right:.25rem"></i>
          <span class="banner-button-text">关于本人</span>
        </a>
      </div>
    </div>
  </div>
<div id="qexoDaoDao"></div>

<script src="/js/qexo-dao.min.js"></script>

<style>
#qexoDaoDao {
  position: relative;
  z-index: 0;
  background: none !important;
  overflow: hidden; /* 裁剪模糊边缘，避免出现透明白边 */
}

/* 底层：背景图 + 模糊 + 0.8透明度 */
#qexoDaoDao::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://ghtpdl.20010501.xyz/tptp/fluid.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.8;
  /* 毛玻璃核心：模糊程度，数值越大越朦胧 */
  filter: blur(10px);
  /* 轻微放大背景，消除模糊带来的边缘透明 */
  transform: scale(1.05);
  z-index: -2;
  pointer-events: none;
}

/* 上层：玻璃反光层，模拟真实毛玻璃的亮感 */
#qexoDaoDao::after {
  content: "";
  position: absolute;
  inset: 0;
  /* 白色叠加浓度，数值越大玻璃反光感越强 */
  background: rgba(255, 255, 255, 0.15);
  z-index: -1;
  pointer-events: none;
}
</style>

<script>
  qexoDaodao?.init({ 
    el: "#qexoDaoDao",
    cnm: "https://ghtpdl.20010501.xyz/tptp/fluid.png",
    name: "宇外御风",
    limit: 10,
    useLoadingImg: false,
    baseURL: "https://hexoadmin.20010501.xyz/",
  });
</script>

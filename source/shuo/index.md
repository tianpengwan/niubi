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

<!-- 原有组件引入 -->
<script src="/js/qexo-dao.min.js"></script>

<!-- 新增：自定义背景透明度样式 -->
<style>
#qexoDaoDao {
  position: relative;
  z-index: 0;
  /* 禁用组件自带的默认背景，避免双重叠加 */
  background: none !important;
}

#qexoDaoDao::before {
  content: "";
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* 和你配置里的背景图地址保持一致 */
  background-image: url("https://ghtpdl.20010501.xyz/tptp/fluid.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 背景透明度设置为 0.8 */
  opacity: 0.8;
  z-index: -1;
  pointer-events: none;
}
</style>

<!-- 原有组件初始化 -->
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

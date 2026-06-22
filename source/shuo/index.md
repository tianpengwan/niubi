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
/* 根容器：建立层叠上下文，裁剪模糊边缘 */
#qexoDaoDao {
  position: relative !important;
  overflow: hidden !important;
  z-index: 0;
}

/* 强制清除组件内部所有自带背景，避免叠加 */
#qexoDaoDao,
#qexoDaoDao * {
  background: none !important;
  background-image: none !important;
}

/* 自定义背景层：0.8透明度 + 毛玻璃模糊 */
#qexoDaoDao::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  /* 与你配置的背景图地址一致 */
  background-image: url("https://ghtpdl.20010501.xyz/tptp/fluid.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* 背景透明度 0.8 */
  opacity: 0.8;
  /* 毛玻璃模糊强度，可调整 6-15px */
  filter: blur(10px);
  /* 放大消除模糊边缘的透明缝隙 */
  transform: scale(1.08);
  pointer-events: none;
}

/* 可选：加一层白色反光，增强玻璃质感 */
#qexoDaoDao::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: rgba(255, 255, 255, 0.12);
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
    // 你可以继续在这里配置 fromColor、labelColor 等原生参数
    // fromColor: "#你的颜色值",
    // labelColor: "#你的颜色值",
  });
</script>

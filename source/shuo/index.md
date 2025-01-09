---
title: none
date: 2020-07-22 22:06:17
top_img: https://t.alcy.cc/pc/
---
/*全局样式*/
h1 {
     display: none;
}
div#page {
     background: none !important;
     box-shadow: none;
     padding: 0;
     border: none;
}
<div class="author-content author-content-item single" style="background:url(https://t.alcy.cc/pc/) center /cover no-repeat!important">
    <div class="card-content">
        <div class="author-content-item-tips">说说</div>
        <span class="author-content-item-title">记录生活</span>
        <div class="content-bottom">
            <div class="tips">人生到处知何似，应似飞鸿踏雪泥</div>
        </div>
        <div class="banner-button-group">
            <a class="banner-button" style="padding: 8px 12px;color: var(--anzhiyu-white);" onclick="pjax.loadUrl(&quot;/about&quot;)" data-pjax-state="">
                <i class="anzhiyufont anzhiyu-icon-arrow-circle-right" style="font-size:22px;margin-right:.25rem"></i>
                <span class="banner-button-text">关于本人</span>
            </a>
        </div>
    </div>
</div>

<head>
  <!-- ... -->
  <script src="/js/qexo-dao.min.js"></script>
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="qexoDaoDao"></div>
  <script>
    qexoDaodao?.init({
      el: "#qexoDaoDao",
      cnm: "https://ghtpdl.20010501.xyz/tptp/fluid.png",
      name: "宇外御风",
      limit: 10,
      useLoadingImg: false,
      baseURL: "https://hexoadmin.20010501.xyz/",
    }).then(function (){
      console.log("qexoDaodao加载完成");
    })
  </script>
</body>

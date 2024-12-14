---
title: 说说
date: 2024-07-14 17:38:06
---
<head>
  <!-- ... -->
  <script src="//cdn.jsdelivr.net/gh/Uyoahz26/daodao@main/dist/qexo-dao.min.js"></script>
  <!-- ... -->
</head>
<body>
  <!-- ... -->
  <div id="qexoDaoDao"></div>
  <script>
    qexoDaodao?.init({
      el: "#qexoDaoDao",
      avatar: "https://20010501.xyz/img/fluid.png",
      name: "宇外御风",
      limit: 5,
      useLoadingImg: false,
      baseURL: "https://hexoadmin.20010501.xyz/",
    }).then(function (){
      console.log("qexoDaodao加载完成");
    })
  </script>
</body>

---
title: 说说
date: 2020-07-22 22:06:17
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
  avatar: "https://20010501.xyz/fluid.png",
  name: "UyoAhz",
  limit: 10,
  useLoadingImg: false,
  baseURL: "https://hexoadmin.20010501.xyz/",
  style: {
    avatar: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      border: '2px solid #ccc'
    }
  }
}).then(function (){
  console.log("qexoDaodao加载完成");
})
  </script>
</body>



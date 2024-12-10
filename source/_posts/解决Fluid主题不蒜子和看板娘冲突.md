---
abbrlink: ''
categories:
- - 技术教程
date: '2024-09-01T23:47:42.063149+08:00'
cover: https://ghtpdl.20010501.xyz/tptp/P40902-240843.jpg
tags:
- Fluid主题
- 不蒜子
- 看板娘
title: 解决Fluid主题不蒜子和看板娘冲突
updated: '2024-09-02T00:23:20.656+08:00'
---
## 解决看板娘与不蒜子冲突的小技巧 😊

前几天安装看板娘后，我发现网站底部和文章数据不蒜子显示不出来了。经过一番查询，发现它俩之间存在冲突。别急，下面分享一个简单的解决办法~o(〃'▽'〃)o哈哈！

## 第一步

修改 `/themes/fluid/layout/_partials/post/meta-top.ejs` 文件中的内容：

将以下内容：

![S40901-23101350_com.github.android(1).png](https://ghtpdl.20010501.xyz/tptp/S40901-23101350_com.github.android(1).png)

替换为：

```html
<span id="busuanzi_container_page_pv_" style="display: true">
```

## 第二步

接下来，修改 `/themes/fluid/layout/_partials/footer/statistics.ejs` 文件中的内容：

![S40901-23112212_com.github.android(1).png](https://ghtpdl.20010501.xyz/tptp/S40901-23112212_com.github.android(1).png)

替换为以下两个HTML标签：

```html

<span id="busuanzi_container_site_pv_" style="display: true;">

<span id="busuanzi_container_site_uv_" style="display: true;">

```

完成以上两步后，应该就能解决看板娘与不蒜子的冲突问题，使网站底部和文章数据正常显示了。希望这对你有所帮助！✨

~o(〃'▽'〃)o我已经修改过了，图片是方便看位置哈

相关链接：https://cloud.tencent.com/developer/article/2067285

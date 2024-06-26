---
title: 🏊Buttefly主题美化(四)
date: 2023-03-09 13:32:22
categories: 美化
tags: Buttefly
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161754241141716175423782.png
---
## 美化

### 评论样式

Waline - 一款从 Valine 衍生的带后端评论系统。可以将 Waline 等价成 With backend Valine。

具体配置可参考 [waline](https://waline.js.org/) 文档

获得serverURL然后修改 主题配置文件:

```shell
waline:
  serverURL: # Waline server address url
  bg: # waline background
  pageview: false
  option:
```

![image-20240520144028892](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/6e05834b232bd4d9d7fa358c79b2083d.png)

### 鼠标样式

#### 1.先去找鼠标样式

[致美化](https://zhutix.com/)里面有很多[鼠标样式](https://zhutix.com/tag/cursors/)

我电脑使用的 [刻晴](https://zhutix.com/ico/keqing-cuu/) 样式

小站使用的[ArcStarry](https://zhutix.com/ico/arcstarry-cursors/)样式

#### 2.使用inject加入样式

```yaml
# Inject
# Insert the code to head (before '</head>' tag) and the bottom (before '</body>' tag)
# 插入代码到头部 </head> 之前 和 底部 </body> 之前
inject:
  head:
    - <link rel="stylesheet" href="/css/font.css">
    - <link rel="stylesheet" href="/css/background.css">
    - <link rel="stylesheet" href="/css/mouse.css">
    # iconfont 图标引入
    - <meta name="referrer" content="no-referrer">
```

mouse.css，放在css文件夹中

```css
body {
    cursor: url(https://cdn.jsdelivr.net/gh/AsteroidQiao/config/ArcStarry/Blue/Arrow.cur), default; }
button,a{
    cursor: url(https://cdn.jsdelivr.net/gh/AsteroidQiao/config/ArcStarry/Blue/Hand.cur), pointer; }
textarea,input:focus{
    cursor:url(https://cdn.jsdelivr.net/gh/AsteroidQiao/config/ArcStarry/Blue/IBeam.cur), text; }
```

附录：

常见的光标类型 ：

| 值        | 描述                                                |
| --------- | --------------------------------------------------- |
| url       | 需使用的自定义光标的 URL。                          |
| default   | 默认光标（通常是一个箭头）                          |
| auto      | 默认。浏览器设置的光标。                            |
| crosshair | 光标呈现为十字线。                                  |
| pointer   | 光标呈现为指示链接的指针（一只手）                  |
| move      | 此光标指示某对象可被移动。                          |
| e-resize  | 此光标指示矩形框的边缘可被向右（东）移动。          |
| ne-resize | 此光标指示矩形框的边缘可被向上及向右移动（北/东）。 |
| nw-resize | 此光标指示矩形框的边缘可被向上及向左移动（北/西）。 |
| n-resize  | 此光标指示矩形框的边缘可被向上（北）移动。          |
| se-resize | 此光标指示矩形框的边缘可被向下及向右移动（南/东）。 |
| sw-resize | 此光标指示矩形框的边缘可被向下及向左移动（南/西）。 |
| s-resize  | 此光标指示矩形框的边缘可被向下移动（南）。          |
| w-resize  | 此光标指示矩形框的边缘可被向左移动（西）。          |
| text      | 此光标指示文本。                                    |
| wait      | 此光标指示程序正忙（通常是一只表或沙漏）。          |
| help      | 此光标指示可用的帮助（通常是一个问号或一个气球）。  |

查看 [菜鸟教程](https://www.runoob.com/try/try.php?filename=trycss_cursor) 演示

鼠标样式图：

[![0](https://img2023.cnblogs.com/blog/3225884/202306/3225884-20230620172207873-1453854364.png)](https://img2023.cnblogs.com/blog/3225884/202306/3225884-20230620172207873-1453854364.png)

图源于网络


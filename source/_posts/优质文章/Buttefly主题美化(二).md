---
title: 🚣‍♂️Buttefly主题美化(二)
date: 2023-03-03 08:32:08
categories: 美化
tags: Buttefly
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161754241141716175423782.png
---

## 页面配置

### 一、页面属性 Front-matter 的基本认识

`Front-matter` 是 `markdown` 文件最上方以 `---` 分隔的区域，用于指定个别档案的变数。

其中又分为两种 ：

1. Page Front-matter 用于页面配置(page)
2. Post Front-matter 用于文章页配置(post)

> tips: 如果标注可选的参数，可根据自己需要添加，不用全部都写在 markdown 里

#### 1、页面配置 Page Front-matter

新建页面：

```shell
hexo new page ""
```

页面属性：

| 写法                    | 解释                                                             |
|:----------------------|:---------------------------------------------------------------|
| title                 | 【必需】页面标题                                                       |
| date                  | 【必需】页面创建日期                                                     |
| type                  | 【必需】标签、分类、关于、音乐馆、友情链接、相册、相册详情、朋友圈、即刻页面需要配置                     |
| updated               | 【可选】页面更新日期                                                     |
| description           | 【可选】页面描述                                                       |
| keywords              | 【可选】页面关键字                                                      |
| comments              | 【可选】显示页面评论模块(默认 true)                                          |
| top_img               | 【可选】页面顶部图片                                                     |
| mathjax               | 【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false) |
| katex                 | 【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)     |
| aside                 | 【可选】显示侧边栏 (默认 true)                                            |
| aplayer               | 【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的音乐 配置                  |
| highlight_shrink      | 【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)         |
| top_single_background | 【可选】部分页面的顶部模块背景图片                                              |

```markdown
---
title:
date:
updated:
type:
comments:
description:
keywords:
top_img:
mathjax:
katex:
aside:
aplayer:
highlight_shrink:
type:
top_single_background:
---
```

#### 2、文章配置 Post Front-matter

新建文章：

```shell
hexo new post ""
```

页面属性：

| 写法                    | 解释                                                             |
|:----------------------|:---------------------------------------------------------------|
| title                 | 【必需】文章标题                                                       |
| date                  | 【必需】文章创建日期                                                     |
| updated               | 【可选】文章更新日期                                                     |
| tags                  | 【可选】文章标签                                                       |
| categories            | 【可选】文章分类                                                       |
| keywords              | 【可选】文章关键字                                                      |
| description           | 【可选】文章描述                                                       |
| top_img               | 【可选】文章顶部图片                                                     |
| cover                 | 【可选】文章缩略图(如果没有设置 top_img,文章页顶部将显示缩略图，可设为 false/图片地址/留空)        |
| comments              | 【可选】显示文章评论模块(默认 true)                                          |
| toc                   | 【可选】显示文章 TOC(默认为设置中 toc 的 enable 配置)                           |
| toc_number            | 【可选】显示 toc_number(默认为设置中 toc 的 number 配置)                      |
| toc_style_simple      | 【可选】显示 toc 简洁模式                                                |
| copyright             | 【可选】显示文章版权模块(默认为设置中 post_copyright 的 enable 配置)                |
| copyright_author      | 【可选】文章版权模块的`文章作者`                                              |
| copyright_author_href | 【可选】文章版权模块的`文章作者`链接                                            |
| copyright_url         | 【可选】文章版权模块的`文章链接`链接                                            |
| copyright_info        | 【可选】文章版权模块的版权声明文字                                              |
| mathjax               | 【可选】显示 mathjax(当设置 mathjax 的 per_page: false 时，才需要配置，默认 false) |
| katex                 | 【可选】显示 katex(当设置 katex 的 per_page: false 时，才需要配置，默认 false)     |
| aplayer               | 【可选】在需要的页面加载 aplayer 的 js 和 css,请参考文章下面的`音乐` 配置                |
| highlight_shrink      | 【可选】配置代码框是否展开(true/false)(默认为设置中 highlight_shrink 的配置)         |
| aside                 | 【可选】显示侧边栏 (默认 true)                                            |
| swiper_index          | 【可选】首页轮播图配置 index 索引，数字越小越靠前                                   |
| top_group_index       | 【可选】首页右侧卡片组配置, 数字越小越靠前                                         |
| ai                    | 【可选】文章ai摘要                                                     |
| main_color            | 【可选】文章主色，必须是16进制颜色且有6位，不可缩减，例如#ffffff 不可写成#fff                 |

```markdown
---
title:
date:
updated:
tags:
categories:
keywords:
description:
top_img:
comments:
cover:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
swiper_index: 1
top_group_index: 1
background: "#fff"
---
```

1. 首页轮播图配置: `swiper_index`, 数字越小越靠前
2. 首页卡片配置: `top_group_index`, 数字越小越靠前
3. page 中`top_single_background`, 可配置部分页面的顶部背景图片

> tips：只需要在你的文章顶部的`Front-matter`配置这`swiper_index`和`top_group_index`两个字段即可显示轮播图和推荐卡片

### 二、标签页配置

#### 1、生成标签页

在 Hexo 博客根目录 `[blog]`下打开终端，输入

```shell
hexo new page tags
```

你会找到 `source/tags/index.md` 这个文件

修改这个文件： 记得添加 `type: "tags"`

```markdown
---
title: 标签
date: 2023-08-06 12:01:51
type: "tags"
comments: false
top_img: false
---
```

#### 2、参数解释：

| 参数       | 解释                                                      |
|:---------|:--------------------------------------------------------|
| type     | 【必须】页面类型，必须为 tags                                       |
| comments | 【可选】是否显示评论                                              |
| top_img  | 【可选】是否显示顶部图                                             |
| orderby  | 【可选】排序方式 ：random/name/length                            |
| order    | 【可选】排序次序： 1, asc for ascending; -1, desc for descending |

### 三、404页面配置

访问出错的网站会跳到 404 页面，404配置：

```yaml
# A simple 404 page
error_404:
  enable: true
  subtitle: "页面没有找到"
  background:
```

本地预览，访问 [404](http://localhost:4000/404.html)
![image-20240520104811246](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/36a287dff5179f929cbe08c4eb1020e6.png)

### 四、友链页面

#### 1、创建友情链接页面

```shell
hexo new page link
```

你会找到 source/link/index.md 这个文件

修改这个文件：

记得添加 type: "link"

```markdown
title: 友情链接
date: 2023-08-01 22:17:49
```

#### 2、友情链接添加

本地生成
在Hexo博客目录中的 source/_data创建一个文件 link.yml

格式：

```yaml
- class_name: 友情链接
  class_desc: 那些人，那些事
  link_list:
    - name: Hexo
      link: https://hexo.io/zh-tw/
      avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
      descr: 快速、简单且强大的网志框架

- class_name: 网站
  class_desc: 值得推荐的网站
  link_list:
    - name: Youtube
      link: https://www.youtube.com/
      avatar: https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png
      descr: 视频网站
    - name: Weibo
      link: https://www.weibo.com/
      avatar: https://i.loli.net/2020/05/14/TLJBum386vcnI1P.png
      descr: 中国最大社交分享平台
    - name: Twitter
      link: https://twitter.com/
      avatar: https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png
      descr: 社交分享平台
```

#### 3、友情链接随机排序

主题支持友情链接随机排序，只需要在顶部 front-matter 添加 random: true


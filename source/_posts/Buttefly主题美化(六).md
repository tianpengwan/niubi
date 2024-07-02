---
title: 🏊‍♀️Buttefly主题美化(六)
date: 2023-03-16 18:52:49
categories: 美化
tags: Buttefly
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161754241141716175423782.png
---
## 首页即刻说说页面配置

#### 1、生成页面

在 Hexo 博客根目录 `[blog]`下打开终端，输入

```cmd
hexo new page essay
```

你会找到 `source/essay/index.md` 这个文件

修改这个文件： 记得添加 `type: "essay"`

```markdown
---
title: 关于
date: 2023-03-30 15:57:51
aside: false
top_img: false
background: "#f8f9fe"
comments: false
type: "about"
---
```

#### 2、新建说说配置文件

在source目录，新建`source/_data/essay.yml`，配置以下内容

```yaml
- title: 即刻短文
  subTitle: 成大事的日常生活。
  tips: 随时随地，分享生活
  buttonText: 关于我
  buttonLink: /about/
  limit: 30
  home_essay: true
  top_background: /img/top.png
  essay_list:
    - content: 武汉突然变天了，冷死了，一下子零度，还下着小雨，直接原地过冬！
      date: 2023/11/10
      image:
        - https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/1699196452934wall7.png
```

#### 3、在主题配置文件menu配置路径

```yaml
menu:
    闲言碎语: /essay/ || icon-lightbulb
```

#### tips: 内容配置

|  属性   |   功能   |                例子                |
| :-----: | :------: | :--------------------------------: |
| content | 说说内容 | content: 早啊，又是元气满满的一天  |
|  from   |  来自于  |            from：成大事            |
|  date   | 发布时间 |          date: 2023/11/10          |
|  image  |  说说图  |        image:        -  XX         |
|  video  |   视频   |             video：-XX             |
| aplayer | 音乐列表 | aplayer:        server: XX  id: XX |
|  link   |   链接   |              link：XX              |


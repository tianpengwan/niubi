---
title: 🏊‍♂️Buttefly主题美化(五)
date: 2023-03-10 15:32:38
categories: 美化
tags: Buttefly
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161754241141716175423782.png
---
## 分享页面配置

分享界面使用了插件 [hexo-douban](https://github.com/mythsman/hexo-douban)

![image-20240627172539874](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-06-27/4d835da9b7ed4d4cbc3e782fa08c0c6d.png)

### 使用方法

#### 1、下载插件

```cmd
npm install hexo-douban --save
```

#### 2、添加配置

在主题配置文件（_config.yml）中加入

```yaml
douban:
  id: you id(豆瓣个人主页获取)
  builtin: false
  movie:
    path: /movies/index.html
    title: '影视列表'
    quote: '能不生气就不要生气，能不骂人就不要骂人，能动手就直接动手。'
    option:
  book:
    path: /books/index.html
    title: '图书列表'
    quote: '多读书、多看报、少吃零食、多睡觉。'
    option:
  game:
    path: /games/index.html
    title: '游戏列表'
    quote: '最好的剑，永远是下一把'
    option:
  song:
    path: /songs/index.html
    title: '音乐列表'
    quote: '我见过天使，遇过魔鬼，亲爱的，你到底是谁'
    option:
  timeout: 10000
```

#### 3、生成界面

使用`hexo douban`命令行生成分享页面

```
hexo douban
```



详细使用方法可以参考插件的[文档](https://github.com/mythsman/hexo-douban)

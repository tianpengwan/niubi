---
title: 🚣Buttefly主题美化(一)
date: 2023-03-02 13:31:42
categories: 美化
tags: Buttefly
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161754241141716175423782.png
---

### 安装主题 (Github)

#### 1、安装

在你的 Hexo 根目录里

```shell
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

> 升级方法：在主题目录下，运行 `git pull`

#### 2、应用主题

修改 Hexo 根目录下的 _config.yml，把主题改为 butterfly

```yaml
theme: butterfly
```

#### 3、安装插件

如果你没有 pug 以及 stylus 的渲染器，请下载安装：

```shell
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

#### 4、升级建议

在 hexo 的根目录创建一个文件` _config.butterfly.yml`，并把主题目录的 _config.yml 内容复制到 _config.butterfly.yml 去。( 注意: 复制的是主题的 _config.yml ，而不是 hexo 的 _config.yml)

不要把主题目录的 _config.yml 删掉， 以后只需要在 _config.butterfly.yml 进行配置就行。
如果使用了 _config.butterfly.yml， 配置主题的 _config.yml 将不会有效果。

Hexo会自动合并主题中的 _config.yml 和 _config.butterfly.yml 里的配置，如果存在同名配置，会使用 _config.butterfly.yml 的配置，其优先度较高。

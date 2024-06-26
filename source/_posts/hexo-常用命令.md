---
title: 📳hexo 常用命令
date: 2020-09-22 11:39:57
categories: 开发
tags: hexo
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161893321161716189331777.png
---

### 前言:

为了方便查阅,这里将常用指令汇总.

### 简写指令:

``` bash
hexo n 等价于 hexo new  还等价于 hexo new post "我的第一篇文章"
hexo p 等价于 hexo publish
hexo g 等价于 hexo generate
hexo s等价于 hexo server
hexo d 等价于 hexo deploy
hexo deploy -g 等价于 hexo deploy --generate
hexo generate -d等价于hexo generate --deploy
```

### 创建一篇新文章或者新的页面。

您可以在命令中指定文章的布局（layout），默认为 post，可以通过修改 _config.yml 中的 default_layout 参数来指定默认布局。

``` bash
$ hexo new [layout] <title>
```

### 注:

``` bash
hexo clean 没有 简写, 
git --version 没有简写
```

### 指令说明:

``` bash
hexo server #Hexo 会监视文件变动并自动更新，除修改站点配置文件外,无须重启服务器,直接刷新网页即可生效。
hexo server -s #以静态模式启动
hexo server -p 5000 #更改访问端口 (默认端口为4000，'ctrl + c'关闭server)
hexo server -i IP地址 #自定义 IP
hexo clean #清除缓存 ,网页正常情况下可以忽略此条命令,执行该指令后,会删掉站点根目录下的public文件夹
hexo g #生成静态网页 (执行 hexo g后会在站点根目录下生成public文件夹, hexo会将"/blog/source/" 下面的.md后缀的文件编译为.html后缀的文件,存放在"/blog/public/"路径下)
hexo d #将本地数据部署到远端服务器(如github)
hexo init 文件夹名称 #初始化XX文件夹名称
```

``` bash
npm update hexo -g#升级
npm install hexo -g#安装
node-v #查看node.js版本号
npm -v #查看npm版本号
git --version #查看git版本号
hexo -v #查看hexo版本号
hexo publish [layout] <title> #通过 publish 命令将草稿移动到 source/_posts 文件夹,如:$ hexo publish [layout] <title>,草稿默认是不会显示在页面中的，可在执行时加上 --draft 参数，或是把 render_drafts 参数设为 true来预览草稿。
```

### 布局（Layout）

Hexo 有三种默认布局：post、page 和 draft。在创建这三种不同类型的文件时，它们将会被保存到不同的路径；而您自定义的其他布局和 post 相同，都将储存到 source/_posts 文件夹。

布局 路径

| 布局    | 路径             |
| :------ | :--------------- |
| `post`  | `source/_posts`  |
| `page`  | `source`         |
| `draft` | `source/_drafts` |

### 草稿

刚刚提到了 Hexo 的一种特殊布局：draft，这种布局在建立时会被保存到 source/_drafts 文件夹，您可通过 publish 命令将草稿移动到 source/_posts 文件夹，该命令的使用方式与 new 十分类似，您也可在命令中指定 layout 来指定布局。

`$ hexo publish [layout] <title>`
草稿默认不会显示在页面中，您可在执行时加上 --draft 参数，或是在 _config.yml 中把 render_drafts 参数设为 true 来预览草稿。

Front-matter 是文件最上方以 `---` 分隔的区域，用于指定个别文件的变量，举例来说：

```md
---
title: Hello World
date: 2013/7/13 20:46:25
---
```

以下是预先定义的参数，您可在模板中使用这些参数值并加以利用。

| 参数              | 描述                                                         | 默认值                                                       |
| :---------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| `layout`          | 布局                                                         | [`config.default_layout`](https://hexo.io/zh-cn/docs/configuration#文章) |
| `title`           | 标题                                                         | 文章的文件名                                                 |
| `date`            | 建立日期                                                     | 文件建立日期                                                 |
| `updated`         | 更新日期                                                     | 文件更新日期                                                 |
| `comments`        | 开启文章的评论功能                                           | `true`                                                       |
| `tags`            | 标签（不适用于分页）                                         |                                                              |
| `categories`      | 分类（不适用于分页）                                         |                                                              |
| `permalink`       | 覆盖文章的永久链接，永久链接应该以 `/` 或 `.html` 结尾       | `null`                                                       |
| `excerpt`         | 纯文本的页面摘要。使用 [该插件](https://hexo.io/zh-cn/docs/tag-plugins#文章摘要和截断) 来格式化文本 |                                                              |
| `disableNunjucks` | 启用时禁用 Nunjucks 标签 `{{ }}`/`{% %}` 和 [标签插件](https://hexo.io/zh-cn/docs/tag-plugins) 的渲染功能 | false                                                        |
| `lang`            | 设置语言以覆盖 [自动检测](https://hexo.io/zh-cn/docs/internationalization#路径) | 继承自 `_config.yml`                                         |
| `published`       | 文章是否发布                                                 | 对于 `_posts` 下的文章为 `true`，对于 `_draft` 下的文章为 `false` |

### 分类和标签

只有文章支持分类和标签，您可以在 Front-matter 中设置。在其他系统中，分类和标签听起来很接近，但是在 Hexo 中两者有着明显的差别：分类具有顺序性和层次性，也就是说 `Foo, Bar` 不等于 `Bar, Foo`；而标签没有顺序和层次。

```bash
categories:
- Diary
tags:
- PS3
- Games
```

### 引用块

在文章中插入引言，可包含作者、来源和标题。

**别号：** quote

```
{% blockquote [author[, source]] [link] [source_link_title] %}
content
{% endblockquote %}
```

### 示例

**没有提供参数，则只输出普通的 blockquote**

```
{% blockquote %}
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque hendrerit lacus ut purus iaculis feugiat. Sed nec tempor elit, quis aliquam neque. Curabitur sed diam eget dolor fermentum semper at eu lorem.
{% endblockquote %}
```

### Youtube

在文章中插入 Youtube 视频。

```
{% youtube video_id [type] [cookie] %}
```

### 示例

**视频**

```
{% youtube lJIrF4YjHfQ %}
```

**播放列表**

```
{% youtube PL9hW1uS6HUfscJ9DHkOSoOX45MjXduUxo 'playlist' %}
```

**隐私模式**

在这种模式下，禁用 YouTube cookie

```
{% youtube lJIrF4YjHfQ false %}
{% youtube PL9hW1uS6HUfscJ9DHkOSoOX45MjXduUxo 'playlist' false %}
```

### Vimeo

在文章中插入 Vimeo 视频。

```
{% vimeo video_id %}
```

### 引用文章

引用其他文章的链接。

```
{% post_path filename %}
{% post_link filename [title] [escape] %}
```

### 文章摘要和截断

在文章中使用 `<!-- more -->`，那么 `<!-- more -->` 之前的文字将会被视为摘要。首页中将只出现这部分文字，同时这部分文字也会出现在正文之中。

例如：

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
<!-- more -->
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

首页中将只会出现

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

正文中则会出现

```
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

注意，摘要可能会被 Front Matter 中的 `excerpt` 覆盖。

安装完成后，输入以下命令以启动服务器，您的网站会在 `http://localhost:4000` 下启动。在服务器启动期间，Hexo 会监视文件变动并自动更新，您无须重启服务器。

```
$ hexo server
```

如果您想要更改端口，或是在执行时遇到了 `EADDRINUSE` 错误，可以在执行时使用 `-p` 选项指定其他端口，如下：

```
$ hexo server -p 5000
```

### 静态模式

在静态模式下，服务器只处理 `public` 文件夹内的文件，而不会处理文件变动，在执行时，您应该先自行执行 `hexo generate`，此模式通常用于生产环境（production mode）下。

```
$ hexo server -s
```

### 自定义 IP

服务器默认运行在 `0.0.0.0`，您可以覆盖默认的 IP 设置，如下：

```
$ hexo server -i 192.168.1.1
```

指定这个参数后，您就只能通过该IP才能访问站点。例如，对于一台使用无线网络的笔记本电脑，除了指向本机的`127.0.0.1`外，通常还有一个`192.168.*.*`的局域网IP，如果像上面那样使用`-i`参数，就不能用`127.0.0.1`来访问站点了。对于有公网IP的主机，如果您指定一个局域网IP作为`-i`参数的值，那么就无法通过公网来访问站点。

### 生成静态文件
```
$ hexo generate
```

### 部署

您可执行下列的其中一个命令，让 Hexo 在生成完毕后自动部署网站，两个命令的作用是相同的。

```
$ hexo generate --deploy
$ hexo deploy --generate
```

> 简写
>
> 上面两个命令可以简写为
> $ hexo g -d
> $ hexo d -g








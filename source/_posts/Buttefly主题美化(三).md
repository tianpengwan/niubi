---
title: 🚣‍♀️Buttefly主题美化(三)
date: 2023-03-05 10:32:15
categories: 美化
tags: Buttefly
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161754241141716175423782.png
---

### 图库

图库页面只是普通的页面，你只需要 hexo n page xxxxx 创建页面就行

然后使用标签外挂 galleryGroup

#### 相册页写法

```markdown
<div class="gallery-group-main">
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
{% galleryGroup name description link img-url %}
</div>
```

- name：图库名字
- description：图库描述
- link：连接到对应相册的地址
- img-url：图库封面的地址

示例：

```markdown
---
title: 图片
date: 2019-10-31 09:32:24
---

<div class="gallery-group-main">
{% galleryGroup '壁纸' '收藏的一些壁纸' '/Gallery/wallpapers' https://gitee.com/AsteroidQiao/library-management-system/raw/master/wall/wall5.png %}
{% galleryGroup '成果' '阿狗的美图' '/Gallery/dogs' https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-11-01/2f2b84906b1d35b38e00e49f84f455a6.jpg %}
{% galleryGroup '表情包' '一些表情包' '/Gallery/emos' https://gitee.com/AsteroidQiao/library-management-system/raw/master/emo/dragon1.jpg %}
{% galleryGroup '动态壁纸' '旧报纸风格视频壁纸' '/Gallery/dynamic' https://gitee.com/AsteroidQiao/config/raw/master/wall/wall.png %}
</div>
```

<div class="gallery-group-main">
{% galleryGroup '壁纸' '收藏的一些壁纸' '/Gallery/wallpapers' https://gitee.com/AsteroidQiao/library-management-system/raw/master/wall/wall5.png %}
{% galleryGroup '成果' '阿狗的美图' '/Gallery/dogs' https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-11-01/2f2b84906b1d35b38e00e49f84f455a6.jpg %}
{% galleryGroup '表情包' '一些表情包' '/Gallery/emos' https://gitee.com/AsteroidQiao/library-management-system/raw/master/emo/dragon1.jpg %}
{% galleryGroup '动态壁纸' '旧报纸风格视频壁纸' '/Gallery/dynamic' https://gitee.com/AsteroidQiao/config/raw/master/wall/wall.png %}
</div>

#### 相册详情（link ）页面写法

```markdown
---
title: 
date: 2019-10-31 09:32:24
---

{% gallery true,,10 %}

![wall5](https://gitee.com/AsteroidQiao/library-management-system/raw/master/wall/wall5.png)
![wall6](https://gitee.com/AsteroidQiao/library-management-system/raw/master/wall/wall6.png)

{% endgallery %}
```

{% gallery true,,10 %}

![72e05ae2gy1hiyg03g7k6j21sc2dsu0x](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-11-01/2f2b84906b1d35b38e00e49f84f455a6.jpg)

![72e05ae2gy1hiyg04n9e1j21sc2dsnpd](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-11-01/0cdf75cb0d654e11774271fe0017ac3d.jpg)

{% endgallery %}

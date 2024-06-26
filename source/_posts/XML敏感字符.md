---
title: 🍍XML敏感字符
date: 2024-05-20 13:48:40
categories: 开发
tags: 敏感字符
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161842071141716184206438.png
---

一共有五个：

所有的特殊字符对应的编码：

| 特殊字符 | 代替符号     | 特殊原因         |
|------|----------|--------------|
| &    | `&amp;`  | 每一个代表符号的开头字符 |
| >    | `&gt;`   | 标记的结束字符      |
| <    | `&lt;`   | 标记的开始字符      |
| "    | `&quot;` | 设定属性值        |
| '    | `&apos;` | 设定属性值        |

（代替符号都以&开始，都包含分号，以分号结束！）

左边一列是不能在[XML]()中直接使用的特殊字符，中间一列是在XML中代替它们的字符串，右边一列是之所以特殊的原因。

### XML中包含非法字符的处理方法

如果一个xml文件的两个标签之前有"<"或"&"会导致xml解析异常，处理方式有两种:

#### 1、进行转义，转义字符对应关系如下:

< <                小于号

\> >                大于号

& & 和

' '                    单引号

" "                双引号

以上5个是在xml协议中预定义好的实体，实体必须以符号"&"开头，以符号";"结尾。 注意: 只有"<" 字符和"&"字符对于XML来说是严格禁止使用的。剩下的都是合法的，为了减少出错，使用实体是一个好习惯。

#### 2、使用CDATA标签(常用)

以`<![CDATA[` 标记开始，

以`]]>`结尾。
示例

```xml
<Functions>
    <Functype>SN-PLAT.JS</Functype>
    <Subtype>2</Subtype>
    <Funcimpl><![CDATA[
        #new snsoft.hd.trd.pricelib.HDPricelibFormulaListener({tgtUINames:["pricelib"]})
    ]]></Funcimpl>
    <Remark>界面客户端JS</Remark>
</Functions>
```

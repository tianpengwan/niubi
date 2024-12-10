---
abbrlink: ''
categories:
- - 技术教程
date: '2024-12-02T03:58:48.760543+08:00'
cover: https://ghtpdl.20010501.xyz/tptp/图片1.png
tags:
- TSP
title: TSPwin数据处理教程
updated: '2024-12-02T03:58:48.455+08:00'
---
转化原始数据：选择CP格式文件加载——选择输出格式TSP203——点击转化（文件自动转化到原文件夹）![](https://ghtpdl.20010501.xyz/tptp/图片1.png)



打开转换好的SVY格式文件

![](https://ghtpdl.20010501.xyz/tptp/图片2.png)



输入项目基本信息：编辑——信息——输入项目基本名称时间（本步骤可以在任何时候进行修改）

![](https://ghtpdl.20010501.xyz/tptp/图片3.png)

![](https://ghtpdl.20010501.xyz/tptp/图片4.png)



输入几何参数：编辑——几何参数——输入隧道宽高，掌子面及参考点里程（大里程到小里程加负号“-”）——输入检波器参数——输入各个炮点参数（所有参数遵循前正后负，左负右正，上正下负，用正负来区别上下左右）

![](https://ghtpdl.20010501.xyz/tptp/图片5.png)

![](https://ghtpdl.20010501.xyz/tptp/图片6.png)

![](https://ghtpdl.20010501.xyz/tptp/图片7.png)

![](https://ghtpdl.20010501.xyz/tptp/图片8.png)



检查炮点：编辑——炮点——可屏蔽空炮点或者效果不好的炮点

![](https://ghtpdl.20010501.xyz/tptp/图片9.png)

![](https://ghtpdl.20010501.xyz/tptp/图片10.png)



地震剖面显示设置——右键地震波——点击属性——依照需求进行显示效果修改（勾选应用到所有地震剖面可以将改显示设置同步到之后所有地震波型图中）

![](https://ghtpdl.20010501.xyz/tptp/图片11.png)

![](https://ghtpdl.20010501.xyz/tptp/图片12.png)

数据设置：邮件数据设置——点击属性——依据本次实验所需探测距离设置数据长度（数据长度=2*探测长度（m）*2.5/纵波波速（m/s））——归零选择默认或者数据前无有效信号部分——运行——结果有频谱图与地震波

![](https://ghtpdl.20010501.xyz/tptp/图片13.png)

![](https://ghtpdl.20010501.xyz/tptp/图片14.png)

![](https://ghtpdl.20010501.xyz/tptp/图片15.png)

![](https://ghtpdl.20010501.xyz/tptp/图片16.png)






带通滤波：打开属性——使用计算值（将主要频段范围框在梯形框内，低切高通值选择在三条线上升且相交的位置附近，低通高切值选择在三条线下降且相交的位置附近。尽量保留更多有效信号频率）——运行

![](https://ghtpdl.20010501.xyz/tptp/图片17.png)



初至拾取：打开属性——使用计算值——运行——在地震波页面进行手动初至拾取（依据当前围岩，通过上下拖动或者频闭离散点，调整到合适波速）

![](https://ghtpdl.20010501.xyz/tptp/图片18.png)

![](https://ghtpdl.20010501.xyz/tptp/图片19.png)



拾取处理：打开属性——变换参数使用默认值——校直选择强制校直到线性——运行

![](https://ghtpdl.20010501.xyz/tptp/图片20.png)

![](https://ghtpdl.20010501.xyz/tptp/图片21.png)





炮能量均衡：打开属性——默认值——运行

![](https://ghtpdl.20010501.xyz/tptp/图片22.png)



Q-估计：打开属性——计算值——运行

![](https://ghtpdl.20010501.xyz/tptp/图片23.png)

反射波提取：打开属性——拉冬变换使用计算值——Q-滤波使用默认值——运行

![](https://ghtpdl.20010501.xyz/tptp/图片24.png)



P-S波分离：打开属性——计算值（默认值）确定——运行

![](https://ghtpdl.20010501.xyz/tptp/图片25.png)



速度分析：打开属性——计算值（默认值）确定——运行

![](https://ghtpdl.20010501.xyz/tptp/图片26.png)



深度偏移：打开属性——计算值（默认值）确定——运行

![](https://ghtpdl.20010501.xyz/tptp/图片27.png)



反射层提取：打开属性——计算值（默认值）确定——运行（遇到掌子面前方有大面积空白图像，可以增加反射层数量，拾取更多反射层让未显示区域出现）

![](https://ghtpdl.20010501.xyz/tptp/图片28.png)



视图——反射层浏览——设置演示属性——筛选，选中所处理的检波器——2D/3D设置，填写检波器所对应波速与后面的计算值一致——

![](https://ghtpdl.20010501.xyz/tptp/图片29.png)

![](https://ghtpdl.20010501.xyz/tptp/图片30.png)

![](https://ghtpdl.20010501.xyz/tptp/图片31.png)

![](https://ghtpdl.20010501.xyz/tptp/图片32.png)




显示图像：视图——2D——显示——岩石参数设置——调整参数显示上下限以符合所提供的计算值范围

![](https://ghtpdl.20010501.xyz/tptp/图片33.png)

![](https://ghtpdl.20010501.xyz/tptp/图片34.png)



输出图片：文件——另存为BMP图片——保存

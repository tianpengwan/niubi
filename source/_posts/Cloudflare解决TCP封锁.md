---
abbrlink: ''
categories:
- - 技术教程
date: '2024-08-15T11:18:56.854058+08:00'
cover: https://ghtpdl.20010501.xyz/Qexo/24/8/http3quic_2a7780438d1827f6e75de0c0c68e1662.jpg
tags:
- HTTP/3
- QUIC
- Cloudflare
- 网站优化
title: 使用Cloudflare对HTTP/3及QUIC协议解决运营商网络封锁
updated: '2024-08-16T15:50:22.174+08:00'
---
起因是我发现流量使用via浏览器打不开我的网站而Chrome却能够打开，查阅资料之后发现是开启了Cloudflare HTTP/3及QUIC协议，来看看原理及如何打开吧!

关于Cloudflare对HTTP/3及QUIC协议的支持和应用，可以从以下几个方面来阐述：

### 一、HTTP/3概述

HTTP/3是超文本传输协议（HTTP）的第三个主要版本，旨在通过引入新的技术和机制来显著提高Web的速度、安全性和可靠性。作为HTTP/2之后的一个重要更新，HTTP/3将极大地影响Web浏览器和服务器之间的通信方式。

### 二、QUIC协议介绍

QUIC（Quick UDP Internet Connections）是一种基于UDP的多路复用传输协议，由Google开发。QUIC专为减少Web应用程序的延迟而设计，并内置了TLS（传输层安全协议）以提供安全的通信。与传统的TCP协议相比，QUIC在减少连接和传输延迟、避免“队头阻塞”以及提供更好的拥塞控制方面有着显著的优势。

* **低延迟**：通过减少握手时间和优化数据包处理流程，QUIC显著降低了数据传输的延迟。
* **连接迁移**：支持在网络变化（如Wi-Fi切换到蜂窝网络）时保持连接不中断，提升了移动互联网用户的体验。
* **安全性增强**：内置TLS 1.3加密机制，为数据传输提供了强大的安全保障。
* **多路复用与流量控制**：允许多个请求和响应在同一连接上并行处理，同时实施精细的流量控制机制，确保数据的顺畅传输。

### 三、Cloudflare与HTTP/3及QUIC

* **支持与推广**：Cloudflare作为一家领先的互联网安全公司，一直致力于推动Web技术的发展和普及。在HTTP/3和QUIC协议出现后，Cloudflare积极支持和推广这些新技术，以提供更快、更安全、更可靠的Web服务。
* **实现与部署**：Cloudflare在其边缘网络中实现了HTTP/3和QUIC协议，这意味着通过Cloudflare托管的网站和应用程序可以享受到这些新技术带来的性能提升和安全增强。此外，Cloudflare还提供了工具和服务，帮助网站所有者和开发者更容易地启用和配置HTTP/3和QUIC。
* **兼容性考虑**：尽管HTTP/3和QUIC具有诸多优点，但由于它们是相对较新的技术，因此可能会与某些旧版本的浏览器和客户端不兼容。Cloudflare在处理这个问题时，采取了灵活的策略，确保在不影响用户体验的前提下，尽可能多地支持各种设备和网络环境。
* **开启方法**

![点击主页网站按钮](https://fxdl.20010501.xyz/https://raw.githubusercontent.com/tianpengwan/hexoxxtc/master/Qexo/24/8/微信图片_20240815111824_9c68f4d0dc3f69b54246168e6d418276.png)

![选择自己的域名](https://fxdl.20010501.xyz/https://raw.githubusercontent.com/tianpengwan/hexoxxtc/master/Qexo/24/8/微信图片_20240815111830_9dc6c99040db09ed6326e3f4acb5b3fe.png)

![点击域名优化](https://fxdl.20010501.xyz/https://raw.githubusercontent.com/tianpengwan/hexoxxtc/master/Qexo/24/8/微信图片_20240815111833_6664aed6aa250e119af3266c807cbc02.png)

![开启http/3 quic协议](https://fxdl.20010501.xyz/https://raw.githubusercontent.com/tianpengwan/hexoxxtc/master/Qexo/24/8/微信图片_20240815111838_8ed9c91c8ebd662def723e180e7f8b26.png)

### 四、现阶段，HTTP/3 QUIC协议在浏览器中的支持情况已经相当广泛。以下是目前主流浏览器对HTTP/3 QUIC协议的支持概述：

* **Chrome**：Chrome浏览器是较早支持HTTP/3 QUIC协议的浏览器之一。随着Chrome的持续更新，它对HTTP/3的支持也日益完善。Chrome在底层网络架构中集成了QUIC协议，以实现更快速安全的网络通信。
* **Microsoft Edge**：作为基于Chromium内核的浏览器，Microsoft Edge同样支持HTTP/3 QUIC协议。这意味着使用Edge浏览器的用户也可以享受到HTTP/3带来的性能提升和安全保障。
* **Firefox**：Firefox浏览器也积极跟进HTTP/3 QUIC协议的支持。特别是在Firefox Nightly版本中，用户可以提前体验到HTTP/3的特性。随着Firefox的更新迭代，其对HTTP/3的支持也将更加稳定和全面。
* **Safari**：虽然Safari浏览器在支持新技术方面相对谨慎，但它也已经开始尝试在iOS和macOS系统上的Safari浏览器中支持HTTP/3 QUIC协议。用户可能需要通过手动设置或更新系统版本来启用这一功能。

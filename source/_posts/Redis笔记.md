---
title: 🍌Redis笔记
date: 2024-05-20 15:38:11
categories: 开发
tags: redis
password: snsoft123
abstract: 本篇文章已加密，需要输入密码查看
message: 本篇文章已加密，需要输入密码查看
wrong_pass_message: 这个密码看着不太对，再试试
wrong_hash_message: 这个文章不能被纠正，不过还是能看看解密后的内容
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161908811151716190880577.png
---
# Redis笔记

内容来自于B站UP主[GeekHour](https://space.bilibili.com/102438649)一小时Redis课程

## 1、🍊Redis简介

> Redis          Remote+dictionary+serve


是一个开源的基于`内存`的数据库存储系统，它可以用作数据库、缓存、消息队列等各种场景

它也是目前最热门的nosql数据库之一
![image-20230726081632750](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-11-13/b7a4da54868db7d1e56187211b2c18a7.png)

## 2、🥭Redis支持的数据类型

Redis支持5种数据类型

| 字符串 | 列表 | 集合 | 有序集合  | 哈希 |
| :----: | :--: | :--: | :-------: | :--: |
| String | List | Set  | Sortedset | Hash |

字符串 String	列表List	集合Set	有序集合Sortedset	哈希Hash

![image-20230726082336858](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-11-13/b7fa0c3157c63b33118496fd8bfd37bf.png)

## 3、🍒Redis使用方式



![image-20230726082506427](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-11-13/4e4ecd1d44a716c8a8b8fead5482e9ac.png)



### 基础操作

```shell
redis-server.exe				 #启动Redis(linux不需要.exe)
redis-cli.exe 					 #连接到Redis （Redis CLI Client）
telnet 127.0.0.1 6379 （telnet）
quit/exit 						 #退出
flushall						 #删除所有
```

### 字符串String

```shell
set key value 					#设置键key的值为value。
setex key seconds value			#将键key的值设置为value，并且超时时间为seconds秒。
expire key seconds				#设置key过期时间为seconds
ttl key							#查看key的过期时间 ttl（time to live）
psetex key milliseconds value 	#将键key的值设置为value，并且超时时间为milliseconds毫秒。
setnx key value					#只有在键key不存在的情况下，将key的值设置为value。

get key 						#返回键key的值设置为value。
getset key value				#将键key的值为value，并返回设置前的旧值。若没有旧值则返回nil。

append key value
#如果键key存在并且值是⼀个字符串，则把value追加到现有值的末尾。
#如果key不存在，则将key的值设置为value
#返回追加value之后的⻓度。
```

### 列表List

```shell
#添加元素
lpush letter e b c d a				#添加到左边
rpush letter f g h i j				#添加到右边
#删除元素
lpop key count						#从左边删除 count个元素，老版本不支持count
rpop key count						#从右边删除

llen								#获取列表长度
lrange key start stop				#列表排序 0 -1从头到尾
信息技术数据与计算      必修一
```

### 集合Set（元素不可重复）

```shell
#添加元素
sadd key member [member ...] #将⼀个或多个元素加⼊到集合key中。已存在于集合中的元素将被忽略。
smembers key 					#返回集合key中的所有成员。
sismember key member 			#判断MEMBER是否是集合key的成员，是返回1，不是或key不存在返回0。
spop key [count]				#移除并返回集合key中的⼀个或count个随机元素。
srandmember key [count]			#和SPOP类似，区别在于SRANDMEMBER只返回不移除。
srem key member [member ...]    #将⼀个或多个元素从集合key中移除。不存在的member元素将被忽略。
smove source destination member #将member元素从source集合移动到destination集合。（原⼦性操作）
scard key						#集合中元素的数量。
```

### 有序集合SortedSet

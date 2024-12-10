---
title: ⚓Tac工具
date: 2024-07-03 16:32:00
category: 开发
tags: snsoft
password: snsoft123
abstract: 本篇文章已加密，需要输入密码查看
message: 本篇文章已加密，需要输入密码查看
wrong_pass_message: 这个密码看着不太对，再试试
wrong_hash_message: 这个文章不能被纠正，不过还是能看看解密后的内容
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17199959999771719995999333.png
---
## Tac工具

### 语法说明:

个人理解，xml格式的python，没有{}包含，需要靠代码对其来区分代码块

##### 常用

| 英文         | 中文     |
| ------------ | -------- |
| if           | 如果     |
| elif         | 再如果   |
| else         | 其他     |
| for          | 遍历     |
| while        | 当       |
| continue     | 继续     |
| break        | 停止     |
| proc         | 方法     |
| return       | 返回     |
| end          | 结束     |
| new          | 创建     |
| in           | 在       |
| to           | 到       |
| &&           | 且       |
| &#124;&#124; | 或       |
| !            | 非       |
| =            | 赋值     |
| ==           | 等于     |
| !=           | 不等于   |
| >            | 大于     |
| >=           | 大于等于 |
| <            | 小于     |
| <=           | 小于等于 |
| true         | 真       |
| false        | 假       |
| println      | 打印     |

##### 初值

```
// ArrayList
list = [1,2,3,4]
println(list)
println(list[0])

// HashMap
map = {key1:1,key2:2}
println(map)

// Array
array = toArray(1,2,3,4)
println(array)
```

##### 变量

不需要声明，直接使用。

```
a = 1
b = 2
c = a + b

str = "Hello World"
println(str)
```

##### 运算符

**加减乘除**

```
a = 5
b = 2
println(a+b)
println(a-b)
println(a*b)
println(a/b)
```

**取余**

```
a = 5
b = 2
println(mod(a,b))
```

**三目运算符**

```
a = true
println(a?"a":"b")
```

**逻辑运算符**

```
a = true
b = false

println(a && b)
println(a || b)
println(!a)

a = 3
b = 5
println(a bitand b)
println(a bitor b)
println(a bitxor b)
```

**比较运算符**

```
a = 3
b = 5
println(a > b)
println(a < b)
println(a == b)
println(a != b)
println(a <= b)
println(a >= b)
```

##### 断句

行尾不需要分号，按行解析。

##### 数组

* 不支持数组初始化；

```
a = new int[]{1,2,3} // 错误

// 正确写法
a = new int[3]
a[0] = 1
a[1] = 2
a[2] = 3
// 或
a = toArray(1,2,3)

// 使用arrayLength()方法获取数组长度
a = toArray(1,2,3,4)
println(arrayLength(a))

// 使用a.length获取数组长度
a = toArray(1,2,3,4)
println(a.length)
```

##### 自增

不支持自增操作。

```
a = 1
a++ // 错误
a = a + 1 // 正确
```

##### 类引用

Tac中对类的使用必须使用全路径，即便是java.lang包下的类。

```
strArray = new java.lang.String[2] // 正确
strArray = new String[2] // 错误
```

##### 关键字

* new 创建对象
* end 结束各种代码块的标识
* if 条件
* then 条件处理
* else 条件分支
* elif 条件分支
* for 循环
* to 与for连用
* in 与for连用
* downto 与for连用
* loop 无条件循环
* while 循环
* break 结束循环
* continue 继续循环
* proc 方法声明
* return 返回
* 制凭证
* 借
* 贷
* 分录
* 转
* 正
* 负
* bitand 按位与
* bitor 按位或
* bitxor 按位异或
* get$ 取值关键字，一般用于打印格式，类似于$xx，不建议使用
* set$ 赋值关键字，一般用于打印格式，类似于$xx=xx，不建议使用
* try 异常开始
* catch 抓取异常
* finally 异常资源释放
* throw 抛出异常
* void JDK基本类型
* int JDK基本类型
* byte JDK基本类型
* char JDK基本类型
* short JDK基本类型
* long JDK基本类型
* boolean JDK基本类型
* float JDK基本类型
* double JDK基本类型
* var 声明变量
* _$text$_

#### 实例-instanceOf

```
if instanceOf("","java.lang.String")
	println("Hello world")
end if

if instanceOf("",java.lang.String.class)
	println("Hello world")
end if
```

#### 分支-if

```
a = 1
if a == 1
	println("Hello World")
elif a == 2
	println("Hello China")
else
	println("Hello Snsoft")
end if
```

```
// 表达式判断，此功能4.9开始支持(参考JavaScript)
if expr
	println("OK")
end if

// expr 为数值类型时 0=false,其他=true
// expr 为字符类型时 length()==0为false，其他为true
// expr 为空时false，其他为true
```

#### 循环-for

```
a = toArray(1,2,3,4)
for i in a
	println(i)
end for

for i=1 to 3
	println(i)
end for

for i=1 downto 3
	println(i)
end for
```

#### 循环-while

```
a = toArray(1,2,3,4)
i = 0
while i < arrayLength(a)
	println(a[i])
	i = i + 1
end while
// 或
a = toArray(1,2,3,4)
it = it(a)
while it.hasNext()
	println(it.idx+"="+it.next())
end while
```

#### 循环-loop

无条件，类似于while true，需要搭配break使用

```
i=0
loop
	println(i)
	if(i == 3)
		break
	end if
	i = i+1
end loop
```

#### 异常-try

```
// try...finally
try
	a = 1/0
finally
	println("free resource")
end try

// try...catch
try
	a = newArray(0)
	b = a[0]
catch ex
	println(ex)
end try

// try...catch...finally
try
	a = newArray(0)
	b = a[0]
catch ex
	println(ex)
finally
	println("free resource")
end try

// 抛出
a = 0
if a == 0
	throw new java.lang.RuntimeException("异常数据")
end if
```



### 常用方法

#### println

用于输出。

```
println(1)
println("Hello World")
date = new java.util.Date()
println(date)
printArray("1,2,3,4".split(","))
printFormat("%1$tF %1$tT",date)
```

#### bean

获取服务并调用

```
bean = getBean("SN-CORE.MakeCodeService")
param = new snsoft.dx.mc.service.MakeCodeService$MakeCodeParam("mui","muiid")
param.setCodeLike("_____")
println(bean.makeCode(param))
```

#### array

* 创建

```
// int数组
a = toArray(1,2,3,4)
println(java.util.Arrays.toString(a))

// String数组
a = toArray("1","2","3","4")
println(java.util.Arrays.toString(a))

// Object数组
a = toArray(1,"a",new java.util.Date())
println(java.util.Arrays.toString(a))

// Object数组
a = newArray(4)
println(java.util.Arrays.toString(a))

// Object二维数组
a = newArray(3,4)
println(arrayLength(a))
```

* 迭代

```
// 一维数组
a = toArray("1","2","3","4")
it = it(a)
while it.hasNext()
	println(it.idx+"="+it.next())
end while

// 二维数组
a = newArray(3,4)
it = it(a)
while it.hasNext()
	println(it.idx+"="+java.util.Arrays.toString(it.next()))
end while

// Collection
a = java.util.Arrays.asList(1,2,3,4)
it = it(a)
while it.hasNext()
	println(it.idx+"="+it.next())
end while

// Map
map = toMap("China",960,"America",900,"Russia",1024)
it = it(map)
while it.hasNext()
	en = it.next()
	println(it.idx+"="+en.getKey()+":"+en.getValue())
end while
```

* 排序
  针对二维数组或一维数组链表。

```
// 二维数组
a = newArray(3,4)
a[0] = toArray("China",960)
a[1] = toArray("America",900)
a[2] = toArray("Russia",1024)
sort(a,-2)
it = it(a)
while it.hasNext()
	println(it.idx+"="+java.util.Arrays.toString(it.next()))
end while

// 一维数组链表
list = newArrayList()
list.add(toArray("China",960))
list.add(toArray("America",900))
list.add(toArray("Russia",1024))
sort(list,1)
it = it(list)
while it.hasNext()
	println(it.idx+"="+java.util.Arrays.toString(it.next()))
end while
```

#### db

获取数据库连接对象。

```
// 根据数据源创建
dataSource = getDataSourceByTable("mui")
db = getDatabase(dataSource)
println(db.query1("select 'Hello DataSource' from mui"))

// 根据数据源ID创建
db = getDatabaseByDSID("CONFIG")
println(db.query1("select 'Hello DSID' from mui"))

// 根据表名创建
db = getDatabaseByTable("mui")
println(db.query1("select 'Hello Table' from mui"))

// 事务
db.beginTrans()
rollback = true
try
	...
	rollback = false
finally
	db.commitTrans(rollback)
end try
```

#### progress

进度条。

```
getProgress().addProgressMessage("Hello World") // 等同于 println("Hello World")

i = 0
n = 10
while i < n
	getProgress().setProgress(i+"/"+n,i+1,n)
	java.lang.Thread.sleep(100)
	i = i + 1
end while
```

#### iterator

数组、链表、Map都可以通过it()方法转换为迭代器进行迭代循环。

```
// 二维数组
a = newArray(3,4)
it = it(a)
while it.hasNext()
	println(it.idx+"="+java.util.Arrays.toString(it.next()))
end while

// Collection
a = java.util.Arrays.asList(1,2,3,4)
it = it(a)
while it.hasNext()
	println(it.idx+"="+it.next())
end while

// Map
map = toMap("China",960,"America",900,"Russia",1024)
it = it(map)
while it.hasNext()
	en = it.next()
	println(it.idx+"="+en.getKey()+":"+en.getValue())
end while
```

#### date

日期时间的常用方法及操作

```
println(toDate("2017-01-01"))
println(toDate("2017/01/01","yyyy/MM/dd"))
println(toDate(2017,1,1))
println(today0())
println(now())
println(getDateYear(now()))
println(getDateMonth(now()))
println(getDateDay(now()))
println(getDateHours(now()))
println(getDateMinutes(now()))
println(getDateSeconds(now()))
```

#### Map/List

```
// 创建Map
map = {key1:1,key2:2}

map = map("key1",1,"key2",2)

map = toMap("key1",1,"key2",2)


// 赋值
map = newHashMap()
map.put("key1",1)
map.put("key2",2)

map.key1=1
map.key2=2

// 访问Map中的key
println(map.get("key1"))
println(map.key1)

// 创建List
list = ["v1","v2"]

list = list("v1","v2")
// 赋值
list = newArrayList()
list.add("v1")
list.add("v2")

list[0]="v1"
list[1]="v2"
```

#### lambda表达式

1. newConsumer(procName)
   返回值：Consumer&lt;T&gt;

1. newBiConsumer(procName)
   返回值：BiConsumer&lt;T,U&gt;

1. newTriConsumer(procName)
   返回值：TriConsumer&lt;T,U,V&gt;

1. newFunction(procName)
   返回值：newFunction&lt;T,R&gt;

1. newBiFunction(procName)
   返回值：BiFunction&lt;T,U,R&gt;

1. newTriFunction(procName)
   返回值：TriFunction&lt;T,U,V,R&gt;

1. newSupplier(procName)
   返回值：Supplier&lt;T&gt;

1. newRunnable(procName)
   返回值：Runnable

1. newComparator(procName)
   返回值：Comparator&lt;T&gt;

示例：

````properties
#newConsumer
    proc queryUsers(db)
        a=db.query3("select username from users")
        for v in a
            println(v)
        end for
    end proc
    snsoft.dx.DBUtils.read("users",newConsumer("queryUsers"))

#newFunction
    proc queryUsers(db)
       return db.query3("select username from users")
    end proc
    a=snsoft.dx.DBUtils.read("users",newFunction("queryUsers"))
    for v in a
       println(v)
    end for

#newComparator
proc comparato01r(o1,o2)
	return o1.compareTo(o2)
end proc
vs=toArray("B","A","C")
java.util.Arrays.sort(vs,newComparator("comparato01r"))
println(vs)
````

### 开发规范

由于Tac的编译耗时很大，对于频繁使用的Tac配置脚本，应该缓存编译后的Tac对象

1. Tac代码块

   ```
   Tac cacheTac = ...;
   try(Tac newTac = cacheTac.cloneScriptExecutor(1))
   {
   	// ....
   }
   ```

1. Tac公式

   ```
   Tac cacheTac = ...;
   {
   	// 添加公式
   	cacheTac.addScriptFormula(name,script);
   }
   try(Tac newTac = cacheTac.cloneScriptExecutor(1))
   {
   	// 获取公式并执行
   	TacScriptExecutor.Formula formula = newTac.getScriptFormula(name);
   	newTac.executeFormula(formula);
   	// 或按照名称执行
   	newTac.executeFormula(name);
   }
   ```

### 常用Tac

#### 分布式检查包版本

```
// 分布式服务通过Tac广播的方式查看是否所有的jar包及版本一致
className = "snsoft.approval.entity.ApprSheetVO"
try
	jarClass = java.lang.Class.forName(className)
	str = jarClass.getProtectionDomain().getCodeSource().toString()
	s = str.lastIndexOf("/lib/")+5
	e = str.lastIndexOf(".jar")
	println(str.substring(s,e))
catch ex
	println("不存在")
end try
```

#### 打印数据库信息

```
start = java.lang.System.currentTimeMillis()
db = db("tbldef")
sysdate = db.query1("select %SQLSYSDATE "+db.getDialect().fromAll())
println(format("耗时：%s",java.lang.System.currentTimeMillis()-start))
println(format("数据库时间：%1$tF %1$tT",sysdate))
println(format("服务器时间：%1$tF %1$tT",now()))
```

### 注意事项

1. Tac对象继承了java.lang.AutoCloseable 接口，使用时需关闭！！！

   ```
   try(Tac newTac = XXXXX)
   {
   }
   ```

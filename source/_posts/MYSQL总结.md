---
title: 🍊MYSQL总结
date: 2024-05-20 15:31:46
categories: 开发
tags: mysql
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17161904801141716190479461.png
---


定义：

​	数据库(Database)是按照[数据结构]()来组织、[存储]()和管理数据的建立在计算机存储设备上的仓库。

​	用通俗的语言描述：数据库就是一个文件系统，通过标准的 `SQL` 语言操作文件系统中

​	的数据，数据库可以用来保存软件系统的数据。

## `mysql`常用数据类型

一个`java` 类对应数据库中一张数据表，一个`java `对象对应数据表中一条数据记录。

Java 中 String 在`mysql `的类型中对应--- char 和 `varchar`

a) Char 是定长，`varchar `是变长的。

b) 例如char(4) 保存 `zs`，因为 `zs `只有二个字符，所以会补充 2 个空格，成为4 个字符插入到数据库中，如果是`varchar(4)`**自动根据存放内容改变长度**。

Java 中的` byte,	   short,     int,    long,	    float,	   double,`

sql中的 ` TINYINT,   SMALLINT,   INT,    BIGINT,	FLOAT,		DOUBLE.`

Java 中的boolean ---`mysql `逻辑类型 bit 存放一位数值 0 或者 1 来表示。

Java 中的DATE ----`mysql `日期类型 date(只有日期) time(只有时间) `datetime`(日期和时间都有) `timestamp`(日期和时间都有)

注意：`datetime `和 `timestamp `表现形式上完全相同，区别就在于 `timestamp `在数据可以自动更新(当前时间)

Java 中的大数据类型:

1. ` inputStream` 二进制文件

2. Reader 文本文件---
3. `mysql `大数据类型

4. blob(存放大二进制数据，比如歌曲等其他的)

## 约束

**约束用来保证数据有效性和完整性**

- 主键约束：primary key : 记录某个字段可以唯一区分其他信息记录，这个字段就可以是主键(唯一 非空，例如：学生的学号)

- 唯一约束：unique：该字段的值不允许重复(例如：用户的邮箱) 一张表中可以有很多唯一约束，但是只有有一个主键

- 非空约束：not null 该字段的值不能为空。

注意：如果[主键]()约束类型为数值类型`int,bigint` ，可以添加[`auto_increment`]() 让主键自动增长。

`eg`:创建一张带约束的用户表

```sql
create table user2(
id int primary key auto_increment, #主键，id自动补全
name varchar(20) unique not null, #唯一性，不能重复
gender varchar(20) not null, birthday date not null,#非空
job varchar(20) not null, salary double not null#非空
);
```

## `SQL`语言

1. 定义：结构化查询语言(Structured Query Language)简称`SQL` ，是一种特殊目的的编程语言，是一种数据库查询和[程序设计语言]()()，用于存取数据 以及查询、更新和管理[关系数据库系统]()；同时也是[数据库脚本文件]()的扩展名。
2. 非过程性语言，一条`SQL` 语句一个执行结果。
3. 为了加强`SQL` 的语言能力，各厂商增强了过程性语言的特点。比如说ORACLE 的 PL/`SQL` 过程处理能力 `SQLServer` 的`T-SQL`

![image-20231019101046134](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-19/19b30862506883a8f7c3c42cbd329fe0.png)

### 1、`DDL`数据定义语言

数据定义语言 (Data Definition Language, DDL) ,它主要包括三个关键字：create ，alter , drop（数据库关键字不分大小写 ）,主要操作对象 有数据库、表、索引、视图等.



#### 数据库操作

```sql
#创建数据库
create database 数据库名称

<!-- 每次创建一个数据库，数据存放的目录中会生成一个文件夹，每个生成的文件夹中会存 在一个 `db.opt `的文件，里面存放的是默认字符集和校队规则。-->

<!--default-character-set=utf8 default-collation=utf8_general_ci-->

#查看所有数据库
show databases;                 <!--注意有个S-->

#### 删除数据库 
drop database 数据库名

####  修改数据库(修改数据库主要指的是修改数据库的编码集)
Alter database 数据库名称 character set 字符集 collate 比较规则; 

#### 使用数据库
use 数据库名称;

#查看当前正在使用的数据库 
select database();
```

#### 表操作

```SQL
#创建表之前，要先使用 use 数据库名称语句使用数据库。

#基本语法：
create table 表名 ( 
    Field1 datatype, 
    Field2 datatype,
    Field3 datatype,
)
#Field：指定列名 datatype：指定列类型

为了让别人能清楚我们定义的字段的含义，我们需要给我们创建的字段添加对应的注释来说明。

CREATE TABLE T_USER(
id int(3) ,
user_name varchar(30) COMMENT '用户名'
)COMMENT=’用户表‘

#### 数据表结构修改

1. 增加列语法： alter table 表名 add 列名 类型(长度) 约束;
2. 修改现有的列类型：主要是修改长度和约束。语法：alter table 表名 modify 列名 类型(长度) 约束;
3. 修改现有的列名： 语法 alter table 表名change 旧列名 新列名 类型(长度) 约束;
4. 删除现有列：语法 alter table 表名 drop 列名;
5. 修改表名 rename table 旧表名 to 新表名;
6. 修改表的字符集：atler table user character set utf8;

alter table game modify name varchar(200);
alter table game rename name to nickname;
alter table game add login int;
alter table game drop login;

#查看表结构
desc 表名;

#### 删除表
drop table game;
```

### 2、`DML`数据控制语言

数据操纵语言（Data Manipulation Language, DML）是SQL语言中，负责对数据库对象运行数据访问工作的指令集，以INSERT、DELETE、UPDATE三种指令为核心，分别代表插入、删除、更新。

```sql
#1、INSERT
插入单行记录
INSERT into 列名（列名，。。）values(,)
#插入多行记录
create table t_student_beifen as select * from t_student  #复制表结构和数据
create table t_student_beifen as select * from t_student where 1 <> 1 #复制表结构
#把其他表结构中的数据插入到表中：
insert into t_student(id,stuname) select id,stuname from t_student01 
# 插入语句后面可以跟多个插入的信息
insert into t_user (user_name,age)values('烤鱼1',22),('烤鱼2',22),('烤鱼3',22);

#2、UPDATE
update 表名 set 字段名=值，字段名=值 where 
update t_student set sex = '女' ;
update t_student set sex = '男' where stuname = '张三';
update t_student set birthday = now() 

#3、DELETE
delete from t_student where id = 1;
# 如果不带where 条件 那么表示删除该表中的所有的记录!!

# delete insert update 语句都会走事务处理，也就是我们需要显示的commit和rollback;

# truncate 直接清空表结构中的所有的数据，效率高，但是不能回滚。
TRUNCATE TABLE t_user_1 # where 1 = 1;
```

### 3、`DQL`数据查询语言

数据查询语言（Data Query Language, DQL）是SQL语言中，负责进行数据查询而不会对数据本身进行修改的语句，这是最基本的SQL语句。保留字SELECT是DQL（也是所有SQL）用得最多的动词，其他DQL常用的保留字有FROM，WHERE，GROUP BY，HAVING和ORDER BY。这些DQL保留字常与其他类型的SQL语句一起使用。

```sql
#单表查询

SELECT <字段列表>
FROM <表名>
[WHERE <查询条件>]
[ORDER BY <排序字段>]
[GROUP BY <分组字段>]

# 1.查询出所有的学生信息  所有的学生的所有字段的信息
select * from t_student ;
# 2.查询出所有的学生的姓名和性别
select stuname,sex from t_student;
# 3.对查询的表和列设置对应的别名
select stuname as '姓名' ,sex as "性别" from t_student;
 # 别名简写可以省略 as  和 单引号
 select stuname 姓名 ,sex 性别 from t_student;
# 4.查询出所有的学生信息，并且显示的形式是【张三】18【岁】
select stuname,age,concat('【',stuname,'】',age,'【岁】') from t_student;

#####单表查询带条件的

# 5.查询出学生表中张三的所有的信息
select * from t_student where stuname = '张三';
# 6.查询出学生表中年龄在18到22之间的学生的所有信息
select * from t_student where age >=18 and age <= 22;
select * from t_student where age BETWEEN 18 and 22 ;
# 7.查询出学生表中编号为1和3的学生信息
select * from t_student where id = 1 or id = 3;
select * from t_student where id in (1,3);
# 8.查询出学生表中地址信息为空的学生信息
# 不行 
# select * from t_student where address = null;
# null不等于任何值，包括它本身 不能用= 用 is 
select * from t_student where address is null;
# 不为空的情况
select * from t_student where address is not null;
# 9.查询出所有姓张的学生的所有信息 -- 模糊查询 like
select * from t_student where stuname like '张%' ;

#正则表达式
select * FROM t_student WHERE stuname REGEXP '^张';

# 10.查询出学生表中年龄大于20的男同学的所有信息
select * from t_student where age > 20 and sex = '男'
# 11 查询出学生表中年龄大于20或者住址在长沙的同学的所有信息
select * from t_student where age  > 20 or address like '%长沙%'
# 12 查询出所有的学生信息，根据id降序  desc 降序 asc 升序【默认就是升序，也就是 asc可以省略】
select * from t_student order by id desc;
select * from t_student order by id asc;
select * from t_student order by id ;
# 排序我们可以根据多个字段来排列，前面的字段优先排序
# 先根据age降序排列，如果age有相同的信息，那么再根据id升序排序
select * from t_student order by age desc ,id asc; 
select * from t_student order by age desc ,id desc; 
```

### 4、`DCL`数据控制语言

数据控制语句，用于控制不同数据段直接的许可和访问级别的语句。这些语句定义了数据库、表、字段、用户的访问权限和安全级别。主要的语句关键字包括grant、revoke 等。

DCL 语句主要是DBA 用来管理系统中的对象权限时所使用，一般很少使用。

```sql
mysql> grant select,insert on plf.* to 'plf'@'%' identified by '123456';
Query OK, 0 rows affected (0.00 sec)
mysql> flush privileges;
Query OK, 0 rows affected (0.00 sec)

mysql> revoke insert on plf.* from 'plf'@'%';
Query OK, 0 rows affected (0.00 sec)
```

### 5、聚合函数

聚合函数一般用于统计(常见count、sum、avg、max、min)

```SQL
# 1.统计学员的总数  count 统计某列中非空的数据的条数
select count(*) from t_student ;
select count(id) from t_student ;
select count(address) from t_student;
select count(birthday) from t_student;
## 在实际开发中我们使用 count(1) 来统计，效率会更高
select 1,id from t_student ;
select count(1) from t_student ;

# 2.统计班级中学生最大的年龄
select max(age) from t_student ;

# 3.统计班级中学习最小的年龄
select min(age) from t_student ;

# 4.统计班级中的学员的平均年龄
select avg(age) from t_student ;

# 5.统计班级中学员的年龄总和
select sum(age) from t_student ;
```

### 6**常用函数**

### 6.1 数学函数

```sql
# abs函数  取绝对值
select abs(-100) ;

# avg() 取平均值
select avg(age) from t_student;

# CEIL(x)/CEILING(x) 向上取整
select ceil(2.5) ;
select ceil(avg(money)) from users;
# floor 向下取整
select floor(2.5) ;
# ROUND(x) 返回离x最近的整数
select round(5.12) ;
select floor(avg(money)) from users;

# exp e的3次方
select exp(3);
# SQRT(x) x的平方根
select SQRT(9);

# GREATEST(expr1, expr2, expr3, …) 返回列表中的最大值
select GREATEST(1,4,5,3,9,2);
# LEAST(value1,value2,...) 返回列表中的最小值
select LEAST(1,4,5,3,9,2) ;
 
# LN 自然对数 e为底数
select ln(2);
# LOG(a,b) a为底，b的对数
select LOG(10,100);
# POW(x,y) 返回x的y次方
select POW(2,3) ;
# RAND() 返回0~1的随机值
select RAND() ;

# SIGN(x) 判断x的符号 大于0 等于0 小于0  1 0 -1
select sign(99),sign(0),sign(-199);

# TRUNCATE(x,y)截断x小数点y位后的值
select TRUNCATE(3.15926,3),TRUNCATE(3.15926,2);
3.159	3.15
```

### **6.2 字符串函数**

常用（`concat`,`substr`,`lower`,`upper`,`trim`,`position`,`reverse`,`strcmp`,`format`）

```sql
# 字符串函数
# ASCII  查看第一个字符的ASCII值
select ascii('ABC'),ascii('BC');
65	66
# length 返回字符串的长度 字符个数
select length('abcd1234'),CHAR_LENGTH('abcd1234');
8	8
# CONCAT(s1,s2…sn) 字符串拼接
select id,stuname ,age,concat('【',id,'】',stuname)  from t_student

# FIND_IN_SET(s1,s2) 返回在字符串s2中与s1匹配的字符串的位置
select FIND_IN_SET("c","a,b,c,d,e,f,g");
select FIND_IN_SET('c','a,b,c,d,e,f,g');

# FORMAT(x,n) 函数可以将数字 x 进行格式化 “#,###.##”, 将 x 保留到小数点后 n 位，最后一位四舍五入
select FORMAT(19999999999.5678,2);

# INSERT(s1,x,len,s2) 字符串 s2 替换 s1 的 x 位置开始长度为 len 的字符串
select INSERT("www.baidu.com",5,5,"sinax") ;

# LOCATE(s1,s) 从字符串 s 中获取 s1 的开始位置
select LOCATE("a","bcdaefg");

# LCASE(s)/LOWER(s) 转换为小写
# UCASE(s)/UPPER(s) 转换为大写
select lcase('ABCedfgDDDddd'),LOWER('ABCedfgDDDddd'),UCASE('ABCedfgDDDddd'),UPPER('ABCedfgDDDddd') ;

# TRIM(s)  去掉字符串 s 开始和结尾处的空格
# LTRIM(s) 去掉字符串 s 开始空格
# RTRIM(s)  去掉字符串 s 结尾处的空格
select TRIM(' abc def '),LTRIM(' abc def '),RTRIM(' abc def ');

# SUBSTR(s, start, length)  SUBSTRING 从字符串 s 的 start 位置截取长度为 length 的子字符串
select substr("abcdefg1234566",4,5) ;

# POSITION(s1 IN s) 从字符串 s 中获取 s1 的开始位置
select POSITION("123" in "abcdefg1235")

# REPEAT(s,n) 将字符串 s 重复 n 次
select REPEAT("hello-",5);

# REVERSE(s) 将字符串s的顺序反过来
select REVERSE("abcdefg") ;

# STRCMP(s1,s2) 比较字符串 s1 和 s2，如果 s1 与 s2 相等返回 0 ，如果 s1>s2 返回 1，如果 s1<s2 返回 -1

select STRCMP("abc","abc") ,STRCMP("a1","a2"),STRCMP("a2","a1") ;
```

### 6.3 日期函数

日期时间函数（now()、CURDATE()、CURTIME()）

```sql
select now();
# CURDATE()/CURRENT_DATE() 返回当前日期
select CURDATE(),CURRENT_DATE() ;

# CURRENT_TIME()/CURTIME() 返回当前时间
select CURTIME() , CURRENT_TIME() ;

# now() CURRENT_TIMESTAMP() 返回当前日期和时间
select now(),CURRENT_TIMESTAMP() ;

# ADDDATE(d,n) 计算起始日期 d 加上 n 天的日期
select ADDDATE("2022-01-26",6) ,ADDDATE(now(),10) ;

# ADDTIME(t,n) 时间 t 加上 n 秒的时间
select ADDTIME('2022-01-02 11:11:11',59),ADDTIME(now(),60*60)

# DATE() 从日期或日期时间表达式中提取日期值
select date('2022-01-02 11:11:11') ,date(now());

# DAY(d) 返回日期值 d 的日期部分
select day('2022-01-02 11:11:11'),day(now()) ;


# DATEDIFF(d1,d2) 计算日期 d1->d2 之间相隔的天数
select DATEDIFF("2021-12-23","2022-01-01") ,DATEDIFF("2022-01-01","2021-12-23");

# DATE_FORMAT(f) 按表达式 f的要求显示日期 d
select DATE_FORMAT(now(),"%Y-%m-%d %r")  ,DATE_FORMAT(now(),"%Y-%m-%d %H:%I:%S");

# DAYNAME(d) 返回日期 d 是星期几，如 Monday,Tuesday
select DAYNAME(now()),DAYNAME("2022-02-14")

# DAYOFMONTH(d) 计算日期 d 是本月的第几天
select DAYOFMONTH(now()),DAYOFMONTH("2022-02-14");

# DAYOFWEEK(d) 日期 d 今天是星期几，1 星期日，2 星期一，以此类推
select DAYOFWEEK(now()) ,DAYOFWEEK("2022-02-14");

# EXTRACT(type FROM d) 从日期 d 中获取指定的值，type 指定返回的值
select EXTRACT(DAY from now())
   ,EXTRACT(WEEK from now())
   ,EXTRACT(HOUR from now())
   ,EXTRACT(SECOND from now())
   ,EXTRACT(MINUTE from now())
   
 # UNIX_TIMESTAMP() 获取时间戳
 select UNIX_TIMESTAMP('2022-01-01')
 
 # FROM_UNIXTIME() 根据时间戳转换为日志
 select FROM_UNIXTIME(1640966400) ;
 
```

### **6.4 高级函数**

CASE函数，类似于Java中Switch语句

语法：

> CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 WHEN conditionN THEN resultN ELSE result END;

```text
# 高级函数
# case函数

select * from t_student ;
select 
   id,stuname,age
  ,case
     when age < 18 then '[0-18]'
   when  age BETWEEN 18 and 20 then '[18-20]'
   when  age BETWEEN 20 and 30 then '[20-30]'
   else '[30以上]'
  end
from t_student 
```

```text
from t_student 
```

![image-20240520152835873](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/0f002f1ca4d9fe5f208380a848d853fc.png)

IF函数

IF()函数在条件为TRUE时返回一个值，如果条件为FALSE则返回另一个值。

语法：IF(*condition*, *value_if_true*, *value_if_false*)

```text
# IF语句 
select 
   t.* ,if(age >=18,'成年人','青少年'),if(sex='男',1,0)
from t_student t
```

![image-20240520152854600](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/ee09bf5bf61b5cefb82abe53026d9127.png)

IFNULL函数

如果表达式为NULL，则IFNULL()函数返回指定的值。如果表达式为NOT NULL，则此函数返回表达式。

语法：IFNULL(*expression*, *alt_value*)

```text
# IFNULL 函数
select t.* ,ifnull(address,"中国") from t_student t
```

![image-20240520152914783](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/e5c07bf058195b2b326505a60c65fef8.png)

ISNULL函数

ISNULL()函数返回1或0，具体取决于表达式是否为NULL。如果expression为NULL，则此函数返回1.否则，返回0。

语法：ISNULL(*expression*)

```text
# ISNULL() 函数
select t.* ,ISNULL(address) from t_student t;
```

![image-20240520152929581](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/281993312e7197b8703f30631551ad0e.png)

NULLIF函数

NULLIF()函数比较两个表达式，如果它们相等则返回NULL。 否则，返回第一个表达式。

语法：NULLIF(*expr1*, *expr2*)

```text
# NULLIF函数 如果两个表达式相同就返回null，否则返回第一个表达式
select NULLIF('a','b'),NULLIF('a1','a1') ;
```

![image-20240520152948487](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/51809da3952074e19aa13452afdeac41.png)

CAST函数

CAST()函数将（任何类型的）值转换为指定的数据类型。

语法：CAST(value AS datatype)

```text
# CAST函数
select CAST('2022-02-13' as DATE) ;
select CAST('2022-02-13 12:12:24' as TIME) ;
select CAST(97 as CHAR) ;
select CAST(5-20 as SIGNED) ;
select CAST(12.666 as DECIMAL);
select CAST('66' as BINARY);
```

### 6.5 多表查询

#### **6.5.1 交叉连接**

交叉连接是不带WHERE 子句的多表查询，它返回被连接的两个表所有数据行的笛卡尔积

```text
SELECT *
FROM T_A , T_B
```

案例

```text
# 交叉连接
select t1.* ,t2.*
from t_student t1,t_class t2;
```

#### **6.5.2 内连接**

在交叉连接的基础上增加连接的条件，不需要连接无效的记录

```text
SELECT * 
FROM T_A INNER JOIN T_B ON T_A.SID = T_B.SID
# 等价于
SELECT * 
FROM T_A,T_B
WHERE T_A.SID = T_B.SID
```

案例

```text
# 内连接 ： 在交叉连接的基础上增加连接的条件，不需要连接无效的记录
select t1.*,t2.*
from t_student t1 INNER JOIN t_class t2 
 on t1.class_id = t2.class_id # on 关键字后面的是连接的条件
```

#### **6.5.3 外连接**

左连接

```text
select t1.*, t2.*  from t_student t1  left  outer   join t_class t2 on t1.classid=t2.id
```

右连接

```text
select t1.*, t2.*  from t_student t1  right   join  t_class t2 on t1.classid=t2.id
```

全连接

```text
select t1.*, t2.*  from t_student t1  full   join t_class t2 on t1.classid=t2.id
```

案例

```text
# 外连接： 找到学生表中的所有的学生信息及对应的班级信息
# 内连接只会保留满足连接条件的记录
# 左外连接: 在内连接的基础上保留了左侧表结构中不满足连接条件的记录
select  t1.*,t2.*
from t_student t1 LEFT JOIN t_class t2
 on t1.class_id = t2.class_id
# 右外连接：在内连接的基础上保留了右侧表结构中不满足连接条件的记录
select t1.*,t2.*
from  t_Class t1 RIGHT JOIN t_student t2
on t1.class_id = t2.class_id

select t1.*,t2.*
from t_class t1 LEFT JOIN t_student t2
on t1.class_id = t2.class_id

# 全连接
# 全连接的作用是 在内连接的基础上保留的左右两边不满足条件的记录，但是在MySQL中已经移除了全连接，但是在Oracle或者其他的数据库中是存在的。
select  t1.*,t2.*
from t_student t1 LEFT JOIN t_class t2
 on t1.class_id = t2.class_id;
 
# 对应的全连接操作

select  t1.*,t2.*
from t_student t1 FULL JOIN t_class t2
 on t1.class_id = t2.class_id;

select t1.*,t2.*
from t_class t1 LEFT JOIN t_student t2
on t1.class_id = t2.class_id;

select t1.*,t2.*
from t_class t1 FULL JOIN t_student t2
on t1.class_id = t2.class_id;
```

等价于 : union 与union all区别

```text
select t1.*, t2.*  from t_student t1  left  outer   join t_class t2 on t1.classid=t2.id
           union 
            select t1.*, t2.*  from t_student t1  right   join  t_class t2 on t1.classid=t2.id

select t1.*, t2.*  from t_student t1  left  outer   join t_class t2 on t1.classid=t2.id
           union all  
            select t1.*, t2.*  from t_student t1  right   join  t_class t2 on t1.classid=t2.id
```

union和union all都能实现结果集的合并

union合并结果集后会取出重复的记录

![image-20240520153015624](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/aab5b4c33795c239c0abfc5ce3c702b2.png)

union all 合并结果集后不会移除重复的记录

![image-20240520153032454](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-05-20/0b28c7ab70abfb25d79219dffd619cc2.png)

#### **6.5.4 子查询**

```text
# 子查询 嵌套查询
 # 查询出班级为 java1班 的所有的学员信息
 select  t1.*
 from t_student t1
 where class_id in (
        select t_class.class_id from t_class where t_class.class_name = 'java1班'  or t_class.class_name = 'java2班'
    ) 
 # 如果在子查询中只有一条记录那么我们可以用=来替代in
  select  t1.*
 from t_student t1
 where class_id  = (
        select t_class.class_id from t_class where t_class.class_name = 'java1班' or t_class.class_name = 'java2班'
    )


 select  t1.*
 from t_student t1
 where EXISTS  # exists 存在于的含义  外表中的记录存在于子表中 就满足条件 否则就过滤掉
 (
        select t_class.class_id from t_class where t_class.class_name = 'java1班'  and t1.class_id = t_class.class_id
    )
```

#### **6.6 综合案例**

```text
create table student (
id int(3) PRIMARY KEY ,
name varchar(20) not null,
sex varchar(4),
birth int(4),
department varchar(20),
address varchar(50));

drop table score;
create table score(
   id int(3)   PRIMARY KEY ,
   stu_id int(3)  not null,
   c_name varchar(20) ,
   grade int(3)
)

-- 向student表插入记录的INSERT语句如下：
insert into student values(901,'张老大','男',1985,'计算机系','北京市海淀区');
insert into student values(902,'张老二','男',1986,'中文系','北京市昌平区');
insert into student values(903,'张三','女',1990,'中文系','湖南省永州市');
insert into student values(904,'李四','男',1990,'英语系','辽宁省阜新市');
insert into student values(905,'王五','女',1991,'英语系','福建省厦门市');
insert into student values(906,'王六','男',1988,'计算机系','湖南省衡阳市');
-- 向score表插入记录的INSERT语句如下：
insert into score values(1,901,'计算机',98);
insert into score values(2,901,'英语',80);
insert into score values(3,902,'计算机',65);
insert into score values(4,902,'中文',88);
insert into score values(5,903,'中文',95);
insert into score values(6,904,'计算机',70);
insert into score values(7,904,'英语',92);
insert into score values(8,905,'英语',94);
insert into score values(9,906,'计算机',90);
insert into score values(10,906,'英语',85);

SELECT * from student;
select * from score;

1、查询student表的第2条到4条记录 
       
  select * from student LIMIT 1,3;
  
2、从student表查询所有学生的学号（id）、
           姓名（name）和院系（department）的信息
  select id '学号' ,name as '姓名' ,department 院系 from student t
       
3、从student表中查询计算机系和英语系的学生的信息
   
  select  *
  from student t
  where t.department = '计算机系' or t.department='英语系'
  
  select  *
  from student t
  where t.department in ('计算机系','英语系')
        
4、从student表中查询年龄25~30岁的学生信息
   select *,EXTRACT(year from now()) ,EXTRACT(year from now())-birth age 
  from student where (EXTRACT(year from now()) - birth) BETWEEN 30 and 40;  
         
5、从student表中查询每个院系有多少人 
select t.department,count(1)
from student t
group by t.department
     
6、从score表中查询每个科目的最高分
select s.c_name,max(grade)
from score s 
group by  s.c_name
     
 
7、查询李四的考试科目（c_name）和考试成绩（grade）
     注意： '=' 只有在确定结果是一个的情况下使用，不确定的使用用 'in'
  
  select c_name,grade
  from score
  where stu_id in (
  select id from student where name = '李四'
  )
  
  # 通过exists
  select c_name ,grade
  from score s
  where EXISTS (
  select id from student where name = '李四' and student.id = s.stu_id
  )
  
  # 通过左连接来实现
  select  t1.*
  from score t1 RIGHT join ( select * from student where name = '李四') t2
  on t1.stu_id = t2.id ;
  
  select  t1.*,t2.*
  from score t1 RIGHT join student t2
  on t1.stu_id = t2.id 
  where t2.name = '李四'
      
8、用内连接的方式查询所有学生的信息和考试信息

    select  t1.*,t2.*
  from student t1 INNER JOIN score t2
  on t1.id = t2.stu_id
      
9、计算每个学生的总成绩
 select stu_id,sum(grade)
 from score 
 group by stu_id 
 
 
 select stu_id,(select name from student where id = stu_id) 姓名,sum(grade)
 from score 
 group by stu_id 
 
 select t1.name,sum(t2.grade)
 from student t1 INNER JOIN score t2
 on t1.id = t2.stu_id
 group by t1.name
       
         
10、计算每个考试科目的平均成绩

select c_name,TRUNCATE(avg(grade),2) 平均分
from score 
group by c_name
       

11、查询计算机成绩低于95的学生信息

 select *
from student
where id in (
 select stu_id from score where c_name = '计算机' and grade < 95
) 

 select *
from student
where EXISTS (
 select stu_id from score where c_name = '计算机' and grade < 95 and student.id = stu_id
)  

       
12、查询同时参加计算机和英语考试的学生的信息
     select * from score; 
   
  # 首先查询出 参加计算机的学员
  select * from score where c_name = '计算机'
  
  select * from score where c_name = '英语'
  
  select * from student where id in (
  select stu_id from score where  stu_id in (
   select stu_id from score where c_name = '计算机' )
   and c_name = '英语' )

13、将计算机考试成绩按从高到低进行排序
select *
from score 
where c_name = '计算机'
order by grade desc
    
        
14、从student表和score表中查询出学生的学号，
     然后合并查询结果 UNION与union all
   
   select id 
   from student 
   union
   select stu_id
   from score
   
   select id 
   from student 
   union all
   select stu_id
   from score
   
            
15、查询姓张或者姓王的同学的姓名、院系和考试科目及成绩
   select name 姓名, department 院系, c_name 考试科目 ,grade 成绩
  from student t1 left join score t2 on t1.id = t2.stu_id
  where t1.name like '张%' or t1.name like '王%'
  
  
  select name 姓名, department 院系, c_name 考试科目 ,grade 成绩
  from (select * from student where  name like '张%' or name like '王%') t1 left join score t2 on t1.id = t2.stu_id

16、查询都是湖南的学生的姓名、年龄、院系和考试科目及成绩
    select name 姓名, (EXTRACT(year from now()) - birth) 年龄, department 院系, c_name 考试科目 ,grade 成绩
  from student t1 left join score t2
  on t1.id = t2.stu_id
  where address like '湖南%'
```

导入导出

```sql
#导出数据
mysqldump -uroot -p game > game.sql
#导入数据
mysql -uroot -p game < game.sql

```

### 正则表达式

> .					#任意一个字符
> ^					#开头
> $					#结尾
> [abc]				#其中任意一个
> [a-z]				#范围内任意一个
> a|b 				a或者b



![image-20231019160727143](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2023-10-19/2cd6c5f1a1d30ba096ad9e47372a9a61.png)



> ### **Tips**

null不等于任何值，包括它本身 不能用= 用 is

SELECT * FROM player WHERE email is null;

### 索引

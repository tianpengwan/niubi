---
title: ☘️MySQL练习题
date: 2024-07-05 09:19:48
categories: 开发
tags: mysql
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17201435048851720143504361.png
---

### 1、数据库

```sql
/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80037 (8.0.37)
 Source Host           : localhost:3306
 Source Schema         : school

 Target Server Type    : MySQL
 Target Server Version : 80037 (8.0.37)
 File Encoding         : 65001

 Date: 10/07/2024 17:18:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `cid` int NOT NULL AUTO_INCREMENT,
  `tid` int NULL DEFAULT NULL,
  `cname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`cid`) USING BTREE,
  INDEX `course_ibfk_1`(`tid` ASC) USING BTREE,
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`tid`) REFERENCES `teacher` (`tid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, 1, '语文');
INSERT INTO `course` VALUES (2, 2, '数学');
INSERT INTO `course` VALUES (3, 3, '英语');
INSERT INTO `course` VALUES (4, 2, '计算机');

-- ----------------------------
-- Table structure for score
-- ----------------------------
DROP TABLE IF EXISTS `score`;
CREATE TABLE `score`  (
  `sid` int NOT NULL,
  `cid` int NOT NULL,
  `score` int NULL DEFAULT NULL,
  PRIMARY KEY (`sid`, `cid`) USING BTREE,
  INDEX `cid`(`cid` ASC) USING BTREE,
  CONSTRAINT `score_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `student` (`sid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `score_ibfk_2` FOREIGN KEY (`cid`) REFERENCES `course` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of score
-- ----------------------------
INSERT INTO `score` VALUES (1, 1, 80);
INSERT INTO `score` VALUES (1, 2, 100);
INSERT INTO `score` VALUES (1, 3, 90);
INSERT INTO `score` VALUES (2, 1, 57);
INSERT INTO `score` VALUES (2, 2, 56);
INSERT INTO `score` VALUES (2, 3, 60);
INSERT INTO `score` VALUES (2, 4, 98);
INSERT INTO `score` VALUES (3, 1, 100);
INSERT INTO `score` VALUES (3, 2, 100);
INSERT INTO `score` VALUES (3, 3, 100);
INSERT INTO `score` VALUES (3, 4, 80);
INSERT INTO `score` VALUES (4, 1, 75);
INSERT INTO `score` VALUES (4, 2, 57);
INSERT INTO `score` VALUES (4, 3, 39);
INSERT INTO `score` VALUES (5, 1, 67);
INSERT INTO `score` VALUES (5, 2, 74);
INSERT INTO `score` VALUES (5, 3, 56);
INSERT INTO `score` VALUES (6, 1, NULL);
INSERT INTO `score` VALUES (6, 2, NULL);
INSERT INTO `score` VALUES (6, 3, NULL);
INSERT INTO `score` VALUES (7, 1, 56);
INSERT INTO `score` VALUES (8, 2, 88);
INSERT INTO `score` VALUES (8, 3, 68);
INSERT INTO `score` VALUES (9, 2, 73);
INSERT INTO `score` VALUES (9, 3, 72);

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `sid` int NOT NULL AUTO_INCREMENT,
  `sname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `brith` date NULL DEFAULT NULL,
  `sex` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT '男',
  PRIMARY KEY (`sid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1, '李华', '2000-06-11', '男');
INSERT INTO `student` VALUES (2, '狗坤', '2000-06-11', '女');
INSERT INTO `student` VALUES (3, '左玉', '1999-06-11', '女');
INSERT INTO `student` VALUES (4, '狗坤', '2001-06-11', '女');
INSERT INTO `student` VALUES (5, '小新', '2001-06-11', '男');
INSERT INTO `student` VALUES (6, '虾仁', '2002-06-11', '男');
INSERT INTO `student` VALUES (7, '阿迪', '2001-08-13', '男');
INSERT INTO `student` VALUES (8, '小米', '2001-07-10', '女');
INSERT INTO `student` VALUES (9, '雯雯', '2001-07-15', '女');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher`  (
  `tid` int NOT NULL AUTO_INCREMENT,
  `tname` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`tid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES (1, '李华安');
INSERT INTO `teacher` VALUES (2, '培根');
INSERT INTO `teacher` VALUES (3, '李应梅');

SET FOREIGN_KEY_CHECKS = 1;

```



### 2、SQL连接

#### 左连接

左连接全称为左外连接，是外连接的一种，以左表为主，左表查出来后，根据on条件查右表，右表不全补null

```sql
SELECT student.*,sc.* FROM student
LEFT JOIN (SELECT score.* FROM score WHERE score.score>60 AND cid=1) sc ON student.sid=sc.sid
```

#### 右连接

右连接全称为右外连接，是外连接的一种，以右表为主，右表查出来后，根据on条件查左表，左表补null

```sql
SELECT st.*,sc.* FROM (SELECT student.* FROM student WHERE student.sex=2) st
RIGHT JOIN score sc ON st.sid=sc.sid
```

#### 全连接

全外连接，返回两个表的所有数据

> 注意：MySQL 本身并不直接支持 FULL JOIN 操作。但可以通过 LEFT JOIN 和 RIGHT JOIN 的组合来模拟实现 FULL JOIN 的效果。

以下数据库管理系统支持 FULL JOIN 操作：
Microsoft SQL Server
Oracle
PostgreSQL
SQLite （从版本 3.33.0 开始支持）

#### 内连接

返回两个表中满足连接条件的所有行

```sql
SELECT student.*,sc.* FROM student
INNER JOIN (SELECT score.* FROM score WHERE score.score>60 AND cid=1) sc ON student.sid=sc.sid

SELECT st.*,sc.* FROM (SELECT student.* FROM student WHERE student.sex=2) st
INNER JOIN score sc ON st.sid=sc.sid
```

#### 总结：

- 左连接：左表为主，右表根据on查询

- 右连接：右表为主，左表根据on查询

- 全连接：返回两表的所有数据

- 内连接：左表、右表都受限制，都根据on查询

  注：（外连接都可以加入OUTER，例如`left join` 和` left outer join`等价）

  当只写 `JOIN` 时，默认表示的就是内连接，即 `INNER JOIN` 。

![image-20240705111249057](https://gitee.com/AsteroidQiao/library-management-system/raw/master/typora/2024-07-05/162a04d1ec0063b09e61b783a7f08192.png)

### 3、练习题及答案

```sql
#左连接（左连接全称为左外连接，是外连接的一种），以左表为主，左表查出来后，根据on条件查右表，右表不全补null
SELECT student.*,sc.* FROM student
LEFT JOIN (SELECT score.* FROM score WHERE score.score>60 AND cid=1) sc ON student.sid=sc.sid

#右连接（右连接全称为右外连接，是外连接的一种），以右表为主，右表查出来后，根据on条件查左表，左表补null
SELECT st.*,sc.* FROM (SELECT student.* FROM student WHERE student.sex=2) st
RIGHT JOIN score sc ON st.sid=sc.sid

#全连接（全外连接），返回两个表的所有数据
#MySQL 本身并不直接支持 FULL JOIN 操作。但可以通过 LEFT JOIN 和 RIGHT JOIN 的组合来模拟实现 FULL JOIN 的效果。

#内连接，返回两个表中满足连接条件的所有行
SELECT student.*,sc.* FROM student
INNER JOIN (SELECT score.* FROM score WHERE score.score>60 AND cid=1) sc ON student.sid=sc.sid

SELECT st.*,sc.* FROM (SELECT student.* FROM student WHERE student.sex=2) st
INNER JOIN score sc ON st.sid=sc.sid

#sql执行顺序：FROM 、 WHERE 、 GROUP BY 、 HAVING 、 ORDER BY

#1、查询"01"课程比"02"课程成绩高的学生的信息及课程分数
select student.*,sc1.score as '语文' ,sc2.score '数学'
from student
join score sc1 on sc1.sid=student.sid and sc1.cid=1
join score sc2 on sc2.sid=student.sid and sc2.cid=2
where sc1.score>sc2.score

#2、查询"01"课程比"02"课程成绩低的学生的信息及课程分数
SELECT student.*,sc1.score '语文',sc2.score '数学' FROM student
JOIN score sc1 on sc1.sid=student.sid AND sc1.cid=1
JOIN score sc2 on sc2.sid=student.sid AND sc2.cid=2
WHERE sc2.score>sc1.score 
 
#3、查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩
SELECT student.sid '学生编号',student.sname '学生姓名',AVG(score.score) '平均成绩' FROM student
JOIN score ON student.sid=score.sid 
GROUP BY student.sid HAVING AVG(score.score)>=60

#4、查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩
– (包括有成绩的和无成绩的)
SELECT student.sid '学生编号',student.sname '学生姓名',AVG(score.score) '平均成绩' FROM student
JOIN score ON student.sid=score.sid 
GROUP BY student.sid HAVING AVG(score.score)<60 OR AVG(score.score) is NULL

#5、查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩
SELECT student.sid,student.sname,count(score.cid),sum(score.score) FROM student 
JOIN score ON score.sid=student.sid
GROUP BY student.sid

#6、查询"李"姓老师的数量
SELECT COUNT(*) FROM teacher WHERE tname LIKE '李%'

#7、查询学过"培根"老师授课的同学的信息
SELECT student.*,COUNT(course.cid) '选课数量', teacher.tname FROM student
JOIN score on student.sid=score.sid
JOIN course on score.cid=course.cid
JOIN teacher on course.tid=teacher.tid
WHERE teacher.tname='培根' GROUP BY student.sid

#8、查询没学过"培根"老师授课的同学的信息
SELECT student.* FROM
student WHERE student.sid NOT IN(
SELECT score.sid FROM teacher
JOIN course on teacher.tid=course.tid
JOIN score ON course.cid=score.cid
WHERE teacher.tname='培根') 

#9、查询学过编号为"01"并且也学过编号为"02"的课程的同学的信息
SELECT student.* FROM student
JOIN score sc1 ON sc1.sid=student.sid
JOIN score sc2 ON sc2.sid=student.sid
WHERE sc1.cid=1 AND sc2.cid=2
#这个SQL写的真牛
SELECT st.*
FROM student st
JOIN score sc ON sc.sid=st.sid
GROUP BY st.sid
HAVING SUM(IF(sc.cid=1 OR sc.cid=2,1,0))>1

#10、查询学过编号为"01"但是没有学过编号为"02"的课程的同学的信息
SELECT student.* FROM student
JOIN score sc1 ON sc1.sid=student.sid AND sc1.cid = 1
LEFT JOIN score sc2 ON sc2.sid=student.sid AND sc2.cid = 2
WHERE sc2.sid IS NULL

SELECT st.*
FROM student st
JOIN score sc ON sc.sid=st.sid
GROUP BY st.sid
HAVING SUM(IF(sc.cid=1,1,0)) > 0 AND SUM(IF(sc.cid=2,1,0)) = 0

#11、查询没有学全所有课程的同学的信息
select st.* from student st
join score s
on st.sid = s.sid
group by st.sid
having count(cid)<(select count(cid) from course)

#12、查询至少有一门课与学号为"08"的同学所学相同的同学的信息
SELECT student.* FROM student 
JOIN score ON student.sid=score.sid
WHERE score.cid IN
(SELECT score.cid FROM student
JOIN score ON student.sid=score.sid
WHERE student.sid=8) AND student.sid!=8 GROUP BY student.sid

#13、查询和"08"号的同学学习的课程完全相同的其他同学的信息
select st.* from student st 
join score sc on sc.sid=st.sid
group by st.sid
having group_concat(sc.cid) = 
(
select group_concat(sc2.cid) from student st2
join score sc2 on sc2.sid=st2.sid
where st2.sid =8
)AND st.sid!=8
 
#14、查询没学过"培根"老师讲授的任一门课程的学生姓名
SELECT student.* FROM student WHERE sid NOT IN
(SELECT score.sid FROM score 
JOIN course ON score.cid=course.cid
JOIN teacher ON course.tid=teacher.tid AND teacher.tname='培根'
WHERE score.sid is NOT NULL)

#15、查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩
SELECT st.sid '学号', st.sname '姓名', ROUND(AVG(COALESCE(sc.score,0)),2)  '平均成绩'
FROM student st
JOIN score sc ON st.sid = sc.sid
WHERE sc.score < 60 or sc.score is NULL
GROUP BY st.sid
HAVING COUNT(sc.sid) >= 2;

#16、检索"01"课程分数小于60，按分数降序排列的学生信息
SELECT st.*,sc.score
FROM student st
JOIN score sc ON st.sid = sc.sid
WHERE sc.cid = 1 AND sc.score < 60
ORDER BY sc.score DESC;


#17、按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩

虽然一个学生的某一门课程成绩理论上只有一个，但在当前的查询结构和数据库模式下，如果去掉 MAX ，SQL 引擎无法确定在进行分组操作时应该从 CASE WHEN 表达式生成的多个可能值中选择哪一个作为该分组的代表值。
即使实际上一个学生对一门课程只有一个成绩，但在这种多表连接和条件判断的复杂查询中，SQL 引擎仍然需要明确的聚合函数来确定如何处理这些可能产生多个值的情况，以符合严格的分组规则。
所以，在 sql_mode=only_full_group_by 模式下，即使一个学生的语文成绩实际只有一个，也需要使用 MAX 这样的聚合函数来满足查询的语法要求。

SELECT st.sid, st.sname,
       MAX(CASE WHEN sc.cid = 1 THEN sc.score END) AS '语文成绩',
       MAX(CASE WHEN sc.cid = 2 THEN sc.score END) AS '数学成绩',
       MAX(CASE WHEN sc.cid = 3 THEN sc.score END) AS '英语成绩',
       MAX(CASE WHEN sc.cid = 4 THEN sc.score END) AS '计算机成绩',
       AVG(sc.score) AS average_score
FROM student st
JOIN score sc ON st.sid = sc.sid
GROUP BY st.sid
ORDER BY average_score DESC;

SELECT student.sid '学号',student.sname '姓名',sc1.score '语文',sc3.score '数学',sc3.score '英语', sc4.score '计算机', AVG(sc5.score) '平均成绩' FROM
student 
 left JOIN score sc1 ON student.sid=sc1.sid AND sc1.cid=1
 left JOIN score sc2 ON student.sid=sc2.sid AND sc2.cid=2
 left JOIN score sc3 ON student.sid=sc3.sid AND sc3.cid=3
 left JOIN score sc4 ON student.sid=sc4.sid AND sc4.cid=4
 left JOIN score sc5 ON student.sid=sc5.sid
GROUP BY student.sid ORDER BY AVG(sc5.score) DESC

#18.查询各科成绩最高分、最低分和平均分：以如下形式显示：课程ID，课程name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率 及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90
SELECT co.cid, co.cname,
       MAX(sc.score) AS '最高分',
       MIN(sc.score) AS '最低分',
       AVG(sc.score) AS '平均分',
       SUM(CASE WHEN sc.score >= 60 THEN 1 ELSE 0 END) / COUNT(*) AS '及格率',
       SUM(CASE WHEN sc.score >= 70 AND sc.score <= 80 THEN 1 ELSE 0 END) / COUNT(*) AS '中等率',
       SUM(CASE WHEN sc.score >= 80 AND sc.score <= 90 THEN 1 ELSE 0 END) / COUNT(*) AS '优良率',
       SUM(CASE WHEN sc.score >= 90 THEN 1 ELSE 0 END) / COUNT(*) AS '优秀率'
FROM course co
JOIN score sc ON co.cid = sc.cid
GROUP BY co.cid;


SELECT co.cid '课程ID',co.cname '课程名称',MAX(sc.score) '最高分',MIN(sc.score) '最低分',AVG(sc.score) '平均分',
(SELECT COUNT(sid) FROM score WHERE score>=60 AND cid=co.cid)/(SELECT COUNT(sid) FROM score WHERE cid=co.cid) '及格率',
(SELECT COUNT(sid) FROM score WHERE score>=70 AND score<80 AND cid=co.cid)/(SELECT COUNT(sid) FROM score WHERE cid=co.cid) '中等率', 
(SELECT COUNT(sid) FROM score WHERE score>=80 AND score<90 AND cid=co.cid)/(SELECT COUNT(sid) FROM score WHERE cid=co.cid) '优良率',
(SELECT COUNT(sid) FROM score WHERE score>=90 AND cid=co.cid)/(SELECT COUNT(sid) FROM score WHERE cid=co.cid) '优秀率' 
FROM course co 
LEFT JOIN score sc ON sc.cid=co.cid
LEFT JOIN score sc2 ON sc2.cid=co.cid
LEFT JOIN score sc3 ON sc3.cid=co.cid
group by co.cid

#19、按各科成绩进行排序，并显示排名
SELECT st.sname, co.cid, co.cname, sc.score,
       RANK() OVER (PARTITION BY co.cid ORDER BY sc.score DESC) AS '排名'
FROM student st
JOIN score sc ON st.sid = sc.sid
JOIN course co ON co.cid = sc.cid;

RANK() OVER 是一种窗口函数的用法。
RANK() 函数用于为结果集中的每一行分配一个排名，排名值可能不连续，如果存在相同的值，会产生相同的排名，并且会跳过后续的排名数字。
OVER 子句用于指定排名的分区和排序规则。
例如，在 RANK() OVER (PARTITION BY co.cid ORDER BY sc.score DESC) 中：
PARTITION BY co.cid 表示按照课程 cid 进行分组，即在每个课程内部进行独立排名。

#20、查询学生的总成绩并进行排名
SELECT st.sid, st.sname, SUM(sc.score) AS '总成绩',
       RANK() OVER (ORDER BY SUM(sc.score) DESC) AS '排名'
FROM student st
JOIN score sc ON st.sid = sc.sid
GROUP BY st.sid, st.sname;

#21、查询不同老师所教不同课程平均分从高到低显示

SELECT te.tname, co.cname, AVG(sc.score) AS '平均成绩'
FROM teacher te
JOIN course co ON te.tid = co.tid
JOIN score sc ON co.cid = sc.cid
GROUP BY te.tname, co.cname
ORDER BY AVG(sc.score) DESC;

#22、查询所有课程的成绩第2名到第3名的学生信息及该课程成绩
SELECT st.*, co.cname, sc.score
FROM student st
JOIN score sc ON st.sid = sc.sid
JOIN course co ON sc.cid = co.cid
WHERE (
    SELECT COUNT(*) 
    FROM score sc2 
    WHERE sc2.cid = sc.cid AND sc2.score > sc.score
) BETWEEN 1 AND 2;

#23、统计各科成绩各分数段人数：课程编号,课程名称,[100-85],[85-70],[70-60],[0-60]及所占百分比

SELECT co.cid AS '课程编号',
       co.cname AS '课程名称',
       SUM(CASE WHEN sc.score BETWEEN 85 AND 100 THEN 1 ELSE 0 END) AS '[100 - 85]人数',
       CONCAT(FORMAT(SUM(CASE WHEN sc.score BETWEEN 85 AND 100 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2), '%') AS '[100 - 85]百分比',
       SUM(CASE WHEN sc.score BETWEEN 70 AND 85 THEN 1 ELSE 0 END) AS '[85 - 70]人数',
       CONCAT(FORMAT(SUM(CASE WHEN sc.score BETWEEN 70 AND 85 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2), '%') AS '[85 - 70]百分比',
       SUM(CASE WHEN sc.score BETWEEN 60 AND 70 THEN 1 ELSE 0 END) AS '[70 - 60]人数',
       CONCAT(FORMAT(SUM(CASE WHEN sc.score BETWEEN 60 AND 70 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2), '%') AS '[70 - 60]百分比',
       SUM(CASE WHEN sc.score BETWEEN 0 AND 60 THEN 1 ELSE 0 END) AS '[0 - 60]人数',
       CONCAT(FORMAT(SUM(CASE WHEN sc.score BETWEEN 0 AND 60 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2), '%') AS '[0 - 60]百分比'
FROM course co
JOIN score sc ON co.cid = sc.cid
GROUP BY co.cid, co.cname;

#24、查询学生平均成绩及其名次
SELECT st.sid, st.sname, AVG(sc.score) AS '平均成绩',
       CONCAT(FORMAT((RANK() OVER (ORDER BY AVG(sc.score) DESC) - 1) / (COUNT(*) OVER () - 1) * 100, 2), '%') AS '排名百分比'
FROM student st
JOIN score sc ON st.sid = sc.sid
GROUP BY st.sid, st.sname;

# 25、查询各科成绩前三名的记录
SELECT *
FROM (
    SELECT st.*, co.cname '学科', sc.score '成绩',
           RANK() OVER(PARTITION BY co.cname ORDER BY sc.score DESC) AS rn
    FROM student st 
    JOIN score sc ON st.sid=sc.sid
    JOIN course co ON sc.cid=co.cid
) subquery
WHERE rn <= 3;


SELECT co.cid, co.cname, st.sid, st.sname, sc.score
FROM course co
JOIN score sc ON co.cid = sc.cid
JOIN student st ON st.sid = sc.sid
WHERE (
    SELECT COUNT(*)
    FROM score sc2
    WHERE sc2.cid = sc.cid AND (sc2.score >= sc.score)
) <= 3 AND score IS NOT NULL
ORDER BY co.cid, sc.score DESC;

#26、查询每门课程被选修的学生数

SELECT co.cid, co.cname, COUNT(st.sid) AS '选修学生数'
FROM course co
JOIN score sc ON co.cid = sc.cid
JOIN student st ON st.sid = sc.sid
GROUP BY co.cid;

 #27、查询出只有两门课程的全部学生的学号和姓名
SELECT st.sid, st.sname
FROM student st
JOIN score sc ON st.sid = sc.sid
GROUP BY st.sid, st.sname
HAVING COUNT(sc.cid) = 2;

#28、查询男生、女生人数
SELECT COUNT(*) FROM student st GROUP BY st.sex

SELECT 
    CASE WHEN st.sex = 1 THEN '男生' 
         WHEN st.sex = 2 THEN '女生' 
         ELSE '未知' END AS '性别分类',
    COUNT(*) AS '人数'
FROM 
    student st
GROUP BY 
    CASE WHEN st.sex = 1 THEN '男生' 
         WHEN st.sex = 2 THEN '女生' 
         ELSE '未知' END;

#29、查询名字中含有"雯"字的学生信息
SELECT st.* FROM student st WHERE st.sname RLIKE "雯"
SELECT st.* FROM student st WHERE st.sname LIKE "%雯%"

#30、查询同名学生名单，并统计同名人数
SELECT st.sname,st.sex, COUNT(*) FROM student st 
GROUP BY st.sname,st.sex HAVING COUNT(*)>1

#31、查询2001年出生的学生名单
SELECT st.* FROM student st WHERE YEAR(st.brith)=2001
 #32、查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列
 
SELECT co.cid '课程编号', co.cname '课程',AVG(sc.score) '平均成绩' FROM course co 
JOIN score sc on sc.cid=co.cid
GROUP BY co.cid ORDER BY AVG(sc.score) DESC,co.cid ASC

#33、查询平均成绩大于等于85的所有学生的学号、姓名和平均成绩
 
SELECT st.sid,st.sname,AVG(sc.score) FROM student st
JOIN score sc on sc.sid=st.sid
GROUP BY st.sid
HAVING AVG(sc.score)>=85

#34、查询课程名称为"数学"，且分数低于60的学生姓名和分数
SELECT st.sname,sc.score FROM student st
JOIN score sc ON st.sid=sc.sid AND sc.cid=2 
WHERE sc.score<60 OR sc.score IS NULL

#35、查询所有学生的课程及分数情况
SELECT st.*,co.cname,sc.score FROM student st
JOIN score sc ON st.sid=sc.sid
JOIN course co ON sc.cid=co.cid

SELECT st.sid, st.sname, 
       MAX(CASE WHEN co.cname = '语文' THEN sc.score END) AS '语文成绩',
       MAX(CASE WHEN co.cname = '数学' THEN sc.score END) AS '数学成绩',
       MAX(CASE WHEN co.cname = '英语' THEN sc.score END) AS '英语成绩',
       MAX(CASE WHEN co.cname = '计算机' THEN sc.score END) AS '计算机成绩'
FROM student st
JOIN score sc ON st.sid = sc.sid
JOIN course co ON sc.cid = co.cid
GROUP BY st.sid;

SELECT st.sid, st.sname, 
(SELECT sc1.score FROM score sc1 WHERE sc1.cid=1 AND sc1.sid=sc.sid) '语文',
(SELECT sc2.score FROM score sc2 WHERE sc2.cid=2 AND sc2.sid=sc.sid) '数学',
(SELECT sc3.score FROM score sc3 WHERE sc3.cid=3 AND sc3.sid=sc.sid) '英语',
(SELECT sc4.score FROM score sc4 WHERE sc4.cid=4 AND sc4.sid=sc.sid) '计算机'
FROM student st
JOIN score sc ON st.sid=sc.sid
GROUP BY st.sid

#36、查询任何一门课程成绩在70分以上的学生姓名、课程名称和分数

SELECT st.sname,co.cname,sc.score FROM student st
JOIN score sc ON st.sid = sc.sid AND sc.score>70
JOIN course co ON sc.cid = co.cid
#37、查询不及格的课程
SELECT st.sname,co.cname,sc.score FROM student st
JOIN score sc ON st.sid = sc.sid AND sc.score<60
JOIN course co ON sc.cid = co.cid
#38、查询课程编号为01且课程成绩在80分以上的学生的学号和姓名
SELECT st.sid,st.sname,co.cname,sc.score FROM student st
JOIN score sc ON st.sid = sc.sid AND sc.score>80 
JOIN course co ON sc.cid = co.cid AND co.cid=1

#39、求每门课程的学生人数
SELECT co.cname,COUNT(*) FROM course co
JOIN score sc ON co.cid=sc.cid 
GROUP BY co.cid

#40、查询选修"培根"老师所授课程的学生中，成绩最高的学生信息及其成绩
SELECT st.*,sc.score,temp.cname,temp.tname FROM student st
JOIN score sc ON st.sid = sc.sid 
JOIN(
			SELECT MAX(sc.score) AS score, sc.cid, co.cname, te.tname 
			FROM score sc
			JOIN course co ON sc.cid = co.cid
			JOIN teacher te ON co.tid = te.tid
			WHERE te.tname = '培根'
			GROUP BY sc.cid
) temp ON temp.cid=sc.cid AND sc.score=temp.score

SELECT st.*,sc.score, co.cname, te.tname
FROM student st
JOIN score sc ON st.sid = sc.sid
JOIN course co ON sc.cid = co.cid
JOIN teacher te ON co.tid = te.tid
WHERE te.tname = '培根'
AND sc.score = (
		SELECT MAX(sc2.score) FROM score sc2 
		JOIN course co2 ON sc2.cid = co2.cid 
		WHERE co2.cid = co.cid
		)
		
#41、查询不同课程成绩相同的学生的学生编号、课程编号、学生成绩
SELECT sc.sid, co.cid, sc.score
FROM score sc
JOIN score sc2 ON sc.score = sc2.score AND sc.cid!= sc2.cid
JOIN course co ON sc.cid = co.cid
GROUP BY sc.sid, co.cid, sc.score

#42、查询每门功成绩最好的前两名

SELECT co.cname, st.sname, sc.score
FROM student st
JOIN score sc ON st.sid = sc.sid AND sc.score IS NOT NULL
JOIN course co ON sc.cid = co.cid
WHERE (
    SELECT COUNT(*) 
    FROM score sc2 
    JOIN student st2 ON sc2.sid = st2.sid
    WHERE sc2.cid = sc.cid AND sc2.score >= sc.score AND sc2.score IS NOT NULL
) <= 2
ORDER BY co.cid, sc.score DESC;

#43、统计每门课程的学生选修人数（超过5人的课程才统计）。要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列

SELECT sc.cid, COUNT(sc.sid) AS student_count
FROM score sc
GROUP BY sc.cid
HAVING COUNT(sc.sid) >=5
ORDER BY student_count DESC, sc.cid ASC;

# 44、检索至少选修两门课程的学生信息及选课数量
SELECT st.*,COUNT(cid) FROM student st
JOIN score sc ON st.sid=sc.sid
GROUP BY st.sid 
HAVING COUNT(cid)>=2

#45、查询选修了全部课程的学生信息

SELECT st.* FROM student st
JOIN score sc ON st.sid=sc.sid
GROUP BY st.sid 
HAVING COUNT(cid)=(SELECT COUNT(*) FROM course)

#46、查询各学生的年龄
SELECT st.sid,st.sname,st.sex,TIMESTAMPDIFF(YEAR,brith,CURDATE()) FROM student st

#47、查询本周过生日的学生
SELECT * 
FROM student 
WHERE WEEK(brith, 1) = WEEK(CURDATE(), 1);

#48、查询下周过生日的学生
SELECT * 
FROM student 
WHERE WEEK(brith, 1) = WEEK(DATE_ADD(CURDATE(),INTERVAL 1 WEEK), 1);

#49、查询本月过生日的学生
SELECT * 
FROM student 
WHERE MONTH(brith) = MONTH(CURDATE());
#50、查询下月过生日的学生
SELECT * 
FROM student 
WHERE MONTH(brith) = MONTH(DATE_ADD(CURDATE(),INTERVAL 1 MONTH));

```


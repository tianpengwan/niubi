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

 Date: 05/07/2024 09:26:34
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
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES (1, 1, '语文');
INSERT INTO `course` VALUES (2, 2, '数学');
INSERT INTO `course` VALUES (3, 3, '英语');

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
INSERT INTO `score` VALUES (1, 2, 75);
INSERT INTO `score` VALUES (1, 3, 90);
INSERT INTO `score` VALUES (2, 1, 57);
INSERT INTO `score` VALUES (2, 2, 56);
INSERT INTO `score` VALUES (2, 3, 60);
INSERT INTO `score` VALUES (3, 1, 100);
INSERT INTO `score` VALUES (3, 2, 100);
INSERT INTO `score` VALUES (3, 3, 100);
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
INSERT INTO `student` VALUES (1, '李华', '2024-06-11', '男');
INSERT INTO `student` VALUES (2, '王懒猪', '2024-06-11', '女');
INSERT INTO `student` VALUES (3, '杨磊', '2024-06-11', '男');
INSERT INTO `student` VALUES (4, '侯文杰', '2024-06-11', '女');
INSERT INTO `student` VALUES (5, '赵宇', '2024-06-11', '男');
INSERT INTO `student` VALUES (6, '虾仁', '2024-06-11', '男');
INSERT INTO `student` VALUES (7, '阿迪', '2024-06-13', '男');
INSERT INTO `student` VALUES (8, '孔瑞辰', '2024-06-13', '女');
INSERT INTO `student` VALUES (9, '雯雯', '2024-06-13', '女');

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

### 2、练习题及答案

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

```


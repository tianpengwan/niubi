---
title: ☘️MySQL练习题
date: 2024-07-05 09:19:48
categories: 开发
tags: mysql
cover: https://gitee.com/AsteroidQiao/library-management-system/raw/master/book-avatar/17201435048851720143504361.png
---
## MySQL练习题

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

### 2、练习题及答案

```sql
#1、查询"01"课程比"02"课程成绩高的学生的信息及课程分数
select student.*,sc1.score as '语文' ,sc2.score '数学'
from student
left join score sc1 on sc1.sid=student.sid and sc1.cid=1
left join score sc2 on sc2.sid=student.sid and sc2.cid=2
where sc1.score>sc2.score

#2、查询"01"课程比"02"课程成绩低的学生的信息及课程分数
SELECT student.*,sc1.score '语文',sc2.score '数学' FROM student
LEFT JOIN score sc1 on sc1.sid=student.sid AND sc1.cid=1
LEFT JOIN score sc2 on sc2.sid=student.sid AND sc2.cid=2
WHERE sc2.score>sc1.score 
 
#3、查询平均成绩大于等于60分的同学的学生编号和学生姓名和平均成绩
SELECT student.sid '学生编号',student.sname '学生姓名',avgtable.avgscore '平均成绩' FROM student
RIGHT JOIN (SELECT AVG(score) avgscore,sid FROM score GROUP BY sid HAVING avgscore>=60) avgtable
ON student.sid=avgtable.sid

SELECT student.sid '学生编号',student.sname '学生姓名',AVG(score.score) '平均成绩' FROM student
LEFT JOIN score ON student.sid=score.sid 
GROUP BY student.sid HAVING AVG(score.score)>=60

#4、查询平均成绩小于60分的同学的学生编号和学生姓名和平均成绩
– (包括有成绩的和无成绩的)
SELECT student.sid '学生编号',student.sname '学生姓名',avgtable.avgscore '平均成绩' FROM student 
RIGHT JOIN (SELECT sid,AVG(score) avgscore FROM score GROUP BY sid HAVING avgscore<60 OR avgscore is NULL) avgtable
ON student.sid=avgtable.sid

SELECT student.sid '学生编号',student.sname '学生姓名',AVG(score.score) '平均成绩' FROM student
LEFT JOIN score ON student.sid=score.sid 
GROUP BY student.sid HAVING AVG(score.score)<60 OR AVG(score.score) is NULL

#5、查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩
SELECT student.sid,student.sname,count(score.cid),sum(score.score) FROM student LEFT JOIN score ON score.sid=student.sid
GROUP BY student.sid

#6、查询"李"姓老师的数量
SELECT COUNT(*) FROM teacher WHERE tname LIKE '李%'

#7、查询学过"培根"老师授课的同学的信息
SELECT student.*,teacher.tname FROM student
LEFT JOIN score on student.sid=score.sid
LEFT JOIN course on score.cid=course.cid
LEFT JOIN teacher on course.tid=teacher.tid
WHERE teacher.tname='培根'

#8、查询没学过"培根"老师授课的同学的信息
SELECT student.* FROM
student WHERE student.sid NOT IN(
SELECT score.sid FROM teacher
LEFT JOIN course on teacher.tid=course.tid
LEFT JOIN score ON course.cid=score.cid
WHERE teacher.tname='培根') 

#9、查询学过编号为"01"并且也学过编号为"02"的课程的同学的信息
SELECT student.* FROM student
WHERE student.sid in
(SELECT sc1.sid FROM score sc1 LEFT JOIN score sc2 ON sc1.sid=sc2.sid
WHERE sc1.cid='01' AND sc2.cid='02')

SELECT st.*
FROM student st
INNER JOIN score sc ON sc.sid=st.sid
GROUP BY st.sid
HAVING SUM(IF(sc.cid="01" OR sc.cid="02",1,0))>1

#10、查询学过编号为"01"但是没有学过编号为"02"的课程的同学的信息
SELECT student.* FROM student 
WHERE sid IN
(SELECT sc1.sid FROM score sc1
RIGHT JOIN
(SELECT sid FROM score WHERE sid NOT IN(SELECT sid FROM score WHERE score.cid='02')) sc2 
ON sc1.sid=sc2.sid
WHERE sc1.cid='01')

#11、查询没有学全所有课程的同学的信息
SELECT student.* FROM student WHERE sid NOT IN
(SELECT student.sid FROM student 
LEFT JOIN score sc1 ON student.sid=sc1.sid 
LEFT JOIN score sc2 ON student.sid=sc2.sid 
LEFT JOIN score sc3 ON student.sid=sc3.sid 
WHERE sc1.cid='01' AND sc2.cid='02' AND sc3.cid='03')

select st.* from student st
left join score s
on st.sid = s.sid
group by st.sid
having count(cid)<(select count(cid) from course)

#12、查询至少有一门课与学号为"08"的同学所学相同的同学的信息
SELECT student.* FROM student 
LEFT JOIN score ON student.sid=score.sid
WHERE score.cid IN
(SELECT score.cid FROM student
LEFT JOIN score ON student.sid=score.sid
WHERE student.sid='08') AND student.sid!='08'

#13、查询和"08"号的同学学习的课程完全相同的其他同学的信息
select st.* from student st 
left join score sc on sc.sid=st.sid
group by st.sid
having group_concat(sc.cid) = 
(
select group_concat(sc2.cid) from student st2
left join score sc2 on sc2.sid=st2.sid
where st2.sid ='08'
)
 
#14、查询没学过"张三"老师讲授的任一门课程的学生姓名

SELECT student.* FROM student WHERE sid NOT IN
(SELECT score.sid FROM score 
left JOIN course ON score.cid=course.cid
right JOIN teacher ON course.tid=teacher.tid AND teacher.tname='培根'
WHERE score.sid is NOT NULL)

#15、查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩
SELECT student.sid '学号',student.sname '姓名',ROUND(AVG(score),2)'平均成绩' 
FROM student LEFT JOIN score ON student.sid=score.sid 
WHERE score.sid IN(
SELECT score.sid FROM score WHERE score.score<60 or score.score IS NULL
GROUP BY score.sid HAVING COUNT(score.sid)>=2
)
GROUP BY student.sid

select st.sid,st.sname,avg(sc.score) from student st
left join score sc on sc.sid=st.sid
where sc.sid in (
select sc.sid from score sc 
where sc.score<60 or sc.score is NULL
group by sc.sid having COUNT(sc.sid)>=2
)
group by st.sid



#16、检索"01"课程分数小于60，按分数降序排列的学生信息
SELECT student.* ,sc.score FROM student
RIGHT JOIN (SELECT score.sid,score.score FROM score WHERE score.cid='01' AND score.score<60) sc ON sc.sid=student.sid  
ORDER BY sc.score DESC

select st.*,sc.score from student st 
inner join score sc on sc.sid=st.sid and sc.cid="01" and sc.score<60
order by sc.score desc

#17、按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩

SELECT student.sid '学号',student.sname '姓名',sc1.score '语文',sc3.score '数学',sc3.score '英语',AVG(sc4.score) '平均成绩' FROM
student 
LEFT JOIN score sc1 ON student.sid=sc1.sid AND sc1.cid='01' 
LEFT JOIN score sc2 ON student.sid=sc2.sid AND sc2.cid='02'
LEFT JOIN score sc3 ON student.sid=sc3.sid AND sc3.cid='03' 
LEFT JOIN score sc4 ON student.sid=sc4.sid
GROUP BY student.sid ORDER BY AVG(sc4.score) DESC

select st.sid,st.sname,avg(sc4.score) "平均分",sc.score "语文",sc2.score "数学",sc3.score "英语" from student st
left join score sc on sc.sid=st.sid and sc.cid="01"
left join score sc2 on sc2.sid=st.sid and sc2.cid="02"
left join score sc3 on sc3.sid=st.sid and sc3.cid="03"
left join score sc4 on sc4.sid=st.sid
group by st.sid 
order by SUM(sc4.score) desc

#18.查询各科成绩最高分、最低分和平均分：以如下形式显示：课程ID，课程name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率 及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90

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

select c.cid,c.cname,max(sc.score) "最高分",MIN(sc2.score) "最低分",avg(sc3.score) "平均分"
,((select count(sid) from score where score>=60 and cid=c.cid )/(select count(sid) from score where cid=c.cid)) "及格率"
,((select count(sid) from score where score>=70 and score<80 and cid=c.cid )/(select count(sid) from score where cid=c.cid)) "中等率"
,((select count(sid) from score where score>=80 and score<90 and cid=c.cid )/(select count(sid) from score where cid=c.cid)) "优良率"
,((select count(sid) from score where score>=90 and cid=c.cid )/(select count(sid) from score where cid=c.cid)) "优秀率"
from course c
left join score sc on sc.cid=c.cid 
left join score sc2 on sc2.cid=c.cid 
left join score sc3 on sc3.cid=c.cid 
group by c.cid

# 19、按各科成绩进行排序，并显示排名

```


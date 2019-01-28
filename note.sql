/*
Navicat MySQL Data Transfer

Source Server         : root
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : note

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2019-01-28 14:56:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for left_list
-- ----------------------------
DROP TABLE IF EXISTS `left_list`;
CREATE TABLE `left_list` (
  `lid` int(5) unsigned NOT NULL AUTO_INCREMENT,
  `lname` varchar(255) NOT NULL,
  `licon` varchar(255) NOT NULL,
  `href` varchar(255) NOT NULL,
  PRIMARY KEY (`lid`)
) ENGINE=InnoDB AUTO_INCREMENT=10006 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of left_list
-- ----------------------------
INSERT INTO `left_list` VALUES ('10001', '类别管理', 'list', 'sort');
INSERT INTO `left_list` VALUES ('10002', '数据管理', 'database', 'database');
INSERT INTO `left_list` VALUES ('10003', '进度管理', 'tachometer-alt', 'schedule');
INSERT INTO `left_list` VALUES ('10004', '灵感管理', 'bomb', 'inspiration');
INSERT INTO `left_list` VALUES ('10005', '用户管理', 'users-cog', 'users');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `uname` varchar(255) NOT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `pwd` varchar(255) NOT NULL,
  `utype` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '普通为0，管理员为1',
  `ustatus` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '0为正常，1为删除',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'me', '18838918437', '18888', '1', '0');
INSERT INTO `users` VALUES ('2', 'zhangsan', '18888888888', '00000', '0', '0');
INSERT INTO `users` VALUES ('3', 'lisi', '15100000000', '00000', '0', '0');
INSERT INTO `users` VALUES ('4', 'wangwu', '13200000000', '00000', '0', '0');
INSERT INTO `users` VALUES ('5', 'zhaoliu', '15100000000', '00000', '0', '0');
SET FOREIGN_KEY_CHECKS=1;

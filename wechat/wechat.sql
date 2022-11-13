/*
 Navicat MySQL Data Transfer

 Source Server         : ilmango
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : wechat

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 27/10/2022 16:21:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for wx_material
-- ----------------------------
DROP TABLE IF EXISTS `wx_material`;
CREATE TABLE `wx_material`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `media_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '媒体id',
  `ctime` bigint UNSIGNED NOT NULL DEFAULT 0,
  `isforver` tinyint UNSIGNED NOT NULL DEFAULT 0 COMMENT '0临时  1永久',
  `type` enum('image','voice','video','thumb') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'image',
  `filepath` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '素材上本服务器位置',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of wx_material
-- ----------------------------
INSERT INTO `wx_material` VALUES (12, 'M42hdfQQNGElL_C0lnmjnoSihdfS-ZL25ZwVqqcg1IsU_ZRTaAR9lagKo4Amt1Tw', 1654929417200, 0, 'image', '1654929416644.jpg');
INSERT INTO `wx_material` VALUES (13, 'M42hdfQQNGElL_C0lnmjnjF8JJ3RWlx2_oS9Rk-6SFa6kMJC71uYxjCExKc9lYoK', 1654929532554, 0, 'image', '1654929532075.jpg');

-- ----------------------------
-- Table structure for wx_users
-- ----------------------------
DROP TABLE IF EXISTS `wx_users`;
CREATE TABLE `wx_users`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '数据表的唯一id号，mysql会自动管理',
  `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '用户对应此公众平台唯一ID',
  `active` enum('1','0') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1' COMMENT '0：取消关注，1：关注',
  `ctime` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '初次关注的时间',
  `mtime` datetime NOT NULL DEFAULT '1970-01-01 00:00:00' COMMENT '再次关注的时间',
  `leavel1` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '1级',
  `leavel2` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '2级',
  `leavel3` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '3级',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of wx_users
-- ----------------------------
INSERT INTO `wx_users` VALUES (37, 'orwc95q0ZpCqMU2B93c9-fuvqzUsa', '1', '2022-10-24 03:15:25', '2022-10-24 04:34:10', '', '', '');
INSERT INTO `wx_users` VALUES (46, 'orwc95q0ZpCqMU2B93c9-fuvqzUs', '1', '2022-10-24 04:59:07', '2022-10-24 04:59:07', 'orwc95q0ZpCqMU2B93c9-fuvqzUsa', '', '');

-- ----------------------------
-- Table structure for wx_vote
-- ----------------------------
DROP TABLE IF EXISTS `wx_vote`;
CREATE TABLE `wx_vote`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `userid` int UNSIGNED NOT NULL DEFAULT 0,
  `openid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of wx_vote
-- ----------------------------
INSERT INTO `wx_vote` VALUES (2, 1, 'orwc95q0ZpCqMU2B93c9-fuvqzUs');
INSERT INTO `wx_vote` VALUES (3, 3, 'orwc95oJVQEeL6woptIYtjn5oLyw');
INSERT INTO `wx_vote` VALUES (4, 2, 'orwc95lqLYKUNeOFl0VKOLT6LwzI');
INSERT INTO `wx_vote` VALUES (5, 1, 'orwc95hFp3ybqNJGfSwsJKjL4ukA');
INSERT INTO `wx_vote` VALUES (6, 1, 'undefined');

SET FOREIGN_KEY_CHECKS = 1;

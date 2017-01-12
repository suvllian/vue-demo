-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2016 年 12 月 20 日 21:25
-- 服务器版本: 5.5.20
-- PHP 版本: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `suvllian`
--

-- --------------------------------------------------------

--
-- 表的结构 `travelcity`
--

CREATE TABLE IF NOT EXISTS `travelcity` (
  `cId` int(11) NOT NULL AUTO_INCREMENT,
  `cName` varchar(32) NOT NULL,
  PRIMARY KEY (`cId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- 转存表中的数据 `travelcity`
--

INSERT INTO `travelcity` (`cId`, `cName`) VALUES
(1, '成都'),
(2, '青岛'),
(3, '北京'),
(4, '天津'),
(5, '重庆'),
(6, '西安'),
(7, '延安'),
(8, '武汉');

-- --------------------------------------------------------

--
-- 表的结构 `travelimage`
--

CREATE TABLE IF NOT EXISTS `travelimage` (
  `iId` int(11) NOT NULL AUTO_INCREMENT,
  `iTopic` varchar(32) DEFAULT NULL,
  `iImage` varchar(32) DEFAULT NULL,
  `iContent` text NOT NULL,
  `iLike` int(11) NOT NULL DEFAULT '0',
  `iShow` tinyint(4) NOT NULL DEFAULT '1',
  `iDate` int(11) NOT NULL,
  `iCity` int(11) NOT NULL,
  PRIMARY KEY (`iId`),
  KEY `iCity` (`iCity`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 转存表中的数据 `travelimage`
--

INSERT INTO `travelimage` (`iId`, `iTopic`, `iImage`, `iContent`, `iLike`, `iShow`, `iDate`, `iCity`) VALUES
(5, '二王庙', 'chengdu1', '二王庙是在都江堰里，“二王”指的是李冰和他的儿子。', 3, 1, 0, 1),
(6, '锦里', 'chengdu2', '锦里就在武侯祠的旁边，也是一条小吃街，我并没有发现什么特别好吃的特色小吃，所以并没有留下什么特别深的印象。', 3, 1, 0, 1),
(7, '都江堰，鱼嘴', 'chengdu3', '四面被山环绕着，江水蜿蜒曲折，宛如人间仙境。', 3, 1, 0, 1),
(8, '栈桥', 'qingdao2', '在栈桥上拍出的观象山。', 1, 1, 0, 2),
(9, '天安门', 'beijing1', '初次来到帝都，长安街的路真是宽！', 1, 1, 0, 3),
(11, '观象山', 'qingdao1', '红瓦绿树，碧海蓝天。青岛的海景真美！', 1, 1, 0, 2),
(12, '圆明园的夕阳', 'beijing2', '夕阳很美。', 1, 0, 0, 3),
(13, '宝塔山', 'yanan1', '宝塔山上有宝塔。', 0, 1, 1482265417, 7);

--
-- 限制导出的表
--

--
-- 限制表 `travelimage`
--
ALTER TABLE `travelimage` FOREIGN KEY (`iCity`) REFERENCES `travelcity` (`cId`);


CREATE TABLE IF NOT EXISTS bookClass` (
  `cId` int(11) NOT NULL AUTO_INCREMENT,
  `cClass` varchar(32) NOT NULL,
  PRIMARY KEY (`cId`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;



CREATE TABLE IF NOT EXISTS `bookInfor` (
  `bId` int(11) NOT NULL AUTO_INCREMENT,
  `bName` varchar(32) DEFAULT NULL,
  `bImage` varchar(32) DEFAULT NULL,
  `bContent` text NOT NULL,
  `bLike` int(11) NOT NULL DEFAULT '0',
  `bShow` tinyint(4) NOT NULL DEFAULT '1',
  `bDate` int(11) NOT NULL,
  `bClass` int(11) NOT NULL,
  PRIMARY KEY (`bId`),
  KEY `bClass` (`bClass`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=14 ;

--
-- 限制表 `bookInfor`
--
ALTER TABLE `bookInfor` FOREIGN KEY (`bClass`) REFERENCES `bookClass` (`Id`);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

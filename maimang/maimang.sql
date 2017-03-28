CREATE TABLE IF NOT EXISTS content (
 cId INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
 intro TEXT NOT NULL,
 src VARCHAR(256) NOT NULL,
 class INT(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS class (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `Class` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS email(
`id` INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
 email VARCHAR(128) NOT NULL) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS joinperson (
 jId INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
 name VARCHAR(128) NOT NULL,
 company VARCHAR(128) NOT NULL,
 teacher VARCHAR(128) NOT NULL,
 connect VARCHAR(128) NOT NULL,
 class INT(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS teachers (
 id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
 name VARCHAR(128) NOT NULL,
 intro TEXT NOT NULL,
 src VARCHAR(128) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS person (
 id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(128) NOT NULL,
 intro TEXT NOT NULL,
 src VARCHAR(128) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS admin(
 id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(128) NOT NULL,
 pass VARCHAR(128) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

ALTER TABLE personpic
  ADD CONSTRAINT FOREIGN KEY (personid) REFERENCES person (`id`);

ALTER TABLE content
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (class) REFERENCES class (`id`);

INSERT INTO admin(name, pass) VALUES('maimusic','mai147mang')


INSERT INTO content(intro,src,class) VALUES('无畏成长，展露锋芒','/static/album-1.jpg',1);
INSERT INTO content(intro,src,class) VALUES('无畏成长，展锋芒','/static/hot-img-4.jpg',1);
INSERT INTO content(intro,src,class) VALUES('无畏成长，露锋芒','/static/hot-img-5.jpg',1);

INSERT INTO content(intro,src,class) VALUES('无畏成长，展露锋芒','/static/hot-img-1.jpg',2);
INSERT INTO content(intro,src,class) VALUES('无畏成长，展锋芒','/static/hot-img-2.jpg',2);
INSERT INTO content(intro,src,class) VALUES('无畏成长，露锋芒','/static/hot-img-3.jpg',2);
INSERT INTO content(intro,src,class) VALUES('无畏成长，展锋芒','/static/hot-img-4.jpg',2);
INSERT INTO content(intro,src,class) VALUES('无畏成长，露锋芒','/static/hot-img-5.jpg',2);


INSERT INTO teachers(name, intro, src) VALUES ('导师：张超洋', '全创音乐人','/static/teacher-1.jpg' );
INSERT INTO teachers(name, intro, src) VALUES ('特邀导师：王建房', '陕西著名音乐人','/static/teacher-2.jpg' );
INSERT INTO teachers(name, intro, src) VALUES ('特邀导师：乌拉多恩', '《中国好歌曲》第三期学员','/static/teacher-3.jpg' );
INSERT INTO teachers(name, intro, src) VALUES ('特邀导师：兰雪', '梦想的声音学员','/static/teacher-4.jpg' );
INSERT INTO teachers(name, intro, src) VALUES ('导师：张超洋', '全创音乐人','/static/teacher-1.jpg' );
INSERT INTO teachers(name, intro, src) VALUES ('特邀导师：王建房', '陕西著名音乐人','/static/teacher-2.jpg' );
INSERT INTO teachers(name, intro, src) VALUES ('特邀导师：乌拉多恩', '《中国好歌曲》第三期学员','/static/teacher-3.jpg' );
INSERT INTO teachers(name, intro, src) VALUES ('特邀导师：兰雪', '梦想的声音学员','/static/teacher-4.jpg' );
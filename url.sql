DROP TABLE IF EXISTS `urls`;
CREATE TABLE IF NOT EXISTS `urls` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `long_url` VARCHAR(50) NOT NULL DEFAULT '',
  `short_url` CHAR(6) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
);
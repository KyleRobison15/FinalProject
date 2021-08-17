-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cultivaiddb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `cultivaiddb` ;

-- -----------------------------------------------------
-- Schema cultivaiddb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cultivaiddb` DEFAULT CHARACTER SET utf8 ;
USE `cultivaiddb` ;

-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(100) NULL,
  `address2` VARCHAR(100) NULL,
  `city` VARCHAR(75) NULL,
  `state_abbreviation` VARCHAR(4) NULL,
  `postal_code` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `email` VARCHAR(100) NULL,
  `phone` VARCHAR(25) NULL,
  `enabled` TINYINT NULL,
  `role` VARCHAR(25) NULL,
  `image_url` VARCHAR(2000) NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `address_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_user_address_idx` (`address_id` ASC),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  CONSTRAINT `fk_user_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `produce`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `produce` ;

CREATE TABLE IF NOT EXISTS `produce` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(75) NULL,
  `avg_item_weight` DOUBLE NULL,
  `image_url` VARCHAR(2000) NULL,
  `category_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produce_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_produce_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garden_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `garden_item` ;

CREATE TABLE IF NOT EXISTS `garden_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` TEXT NULL,
  `grow_method` TEXT NULL,
  `date_expected` VARCHAR(45) NULL,
  `amount` SMALLINT NULL,
  `variety` VARCHAR(45) NULL,
  `pesticides` TINYINT NULL,
  `fertilizers` TINYINT NULL,
  `user_id` INT NOT NULL,
  `produce_id` INT NOT NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_garden_item_user1_idx` (`user_id` ASC),
  INDEX `fk_garden_item_produce1_idx` (`produce_id` ASC),
  CONSTRAINT `fk_garden_item_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_garden_item_produce1`
    FOREIGN KEY (`produce_id`)
    REFERENCES `produce` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exchange`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exchange` ;

CREATE TABLE IF NOT EXISTS `exchange` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exchange_date` DATE NULL,
  `rating` TINYINT NULL,
  `buyer_comment` TEXT NULL,
  `complete` TINYINT NULL,
  `accepted` TINYINT NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `buyer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_exchange_event_user1_idx` (`buyer_id` ASC),
  CONSTRAINT `fk_exchange_event_user1`
    FOREIGN KEY (`buyer_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exchange_item`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exchange_item` ;

CREATE TABLE IF NOT EXISTS `exchange_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` SMALLINT NULL,
  `exchange_id` INT NOT NULL,
  `garden_item_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_exchange_exchange_event1_idx` (`exchange_id` ASC),
  INDEX `fk_exchange_garden_item1_idx` (`garden_item_id` ASC),
  CONSTRAINT `fk_exchange_exchange_event1`
    FOREIGN KEY (`exchange_id`)
    REFERENCES `exchange` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exchange_garden_item1`
    FOREIGN KEY (`garden_item_id`)
    REFERENCES `garden_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `desired_produce`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `desired_produce` ;

CREATE TABLE IF NOT EXISTS `desired_produce` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `active` TINYINT NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` INT NOT NULL,
  `produce_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_desired_item_user1_idx` (`user_id` ASC),
  INDEX `fk_desired_item_produce1_idx` (`produce_id` ASC),
  CONSTRAINT `fk_desired_item_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_desired_item_produce1`
    FOREIGN KEY (`produce_id`)
    REFERENCES `produce` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `message` ;

CREATE TABLE IF NOT EXISTS `message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` TEXT NULL,
  `create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `viewed` TINYINT NULL,
  `sender_id` INT NOT NULL,
  `reciever_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_message_user1_idx` (`sender_id` ASC),
  INDEX `fk_message_user2_idx` (`reciever_id` ASC),
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user2`
    FOREIGN KEY (`reciever_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `exchange_image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `exchange_image` ;

CREATE TABLE IF NOT EXISTS `exchange_image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image_url` LONGBLOB NULL,
  `user_id` INT NOT NULL,
  `exchange_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_user1_idx` (`user_id` ASC),
  INDEX `fk_image_exchange1_idx` (`exchange_id` ASC),
  CONSTRAINT `fk_image_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_image_exchange1`
    FOREIGN KEY (`exchange_id`)
    REFERENCES `exchange` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `garden_item_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `garden_item_comment` ;

CREATE TABLE IF NOT EXISTS `garden_item_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `content` TEXT NULL,
  `sender_id` INT NOT NULL,
  `garden_item_id` INT NOT NULL,
  `in_reply_to_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_garden_item_comment_user1_idx` (`sender_id` ASC),
  INDEX `fk_garden_item_comment_garden_item1_idx` (`garden_item_id` ASC),
  INDEX `fk_garden_item_comment_garden_item_comment1_idx` (`in_reply_to_id` ASC),
  CONSTRAINT `fk_garden_item_comment_user1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_garden_item_comment_garden_item1`
    FOREIGN KEY (`garden_item_id`)
    REFERENCES `garden_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_garden_item_comment_garden_item_comment1`
    FOREIGN KEY (`in_reply_to_id`)
    REFERENCES `garden_item_comment` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS cultivaid@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'cultivaid'@'localhost' IDENTIFIED BY 'cultivaid';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'cultivaid'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `address` (`id`, `address`, `address2`, `city`, `state_abbreviation`, `postal_code`) VALUES (1, '1234 admin drive', NULL, 'Colorado Springs', 'CO', '80903');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `phone`, `enabled`, `role`, `image_url`, `create_date`, `address_id`) VALUES (1, 'admin1', NULL, NULL, NULL, NULL, NULL, 1, 'admin', NULL, NULL, 1);

COMMIT;


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
  `active` TINYINT NULL,
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
  `role` VARCHAR(25) NULL,
  `image_url` VARCHAR(2000) NULL,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NULL,
  `address_id` INT NULL,
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
  `active` TINYINT NULL,
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
  `active` TINYINT NULL,
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
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NULL,
  `user_id` INT NOT NULL,
  `produce_id` INT NOT NULL,
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
  `active` TINYINT NULL,
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
  `active` TINYINT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_exchange_exchange_event1_idx` (`exchange_id` ASC),
  INDEX `fk_exchange_item_garden_item1_idx` (`garden_item_id` ASC),
  CONSTRAINT `fk_exchange_exchange_event1`
    FOREIGN KEY (`exchange_id`)
    REFERENCES `exchange` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exchange_item_garden_item1`
    FOREIGN KEY (`garden_item_id`)
    REFERENCES `garden_item` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `wishlist_produce`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `wishlist_produce` ;

CREATE TABLE IF NOT EXISTS `wishlist_produce` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NULL,
  `user_id` INT NOT NULL,
  `produce_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_desired_item_user1_idx` (`user_id` ASC),
  INDEX `fk_wishlist_produce_produce1_idx` (`produce_id` ASC),
  CONSTRAINT `fk_desired_item_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_wishlist_produce_produce1`
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
  `active` TINYINT NULL,
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
  `image_url` LONGTEXT NULL,
  `active` TINYINT NULL,
  `exchange_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_exchange1_idx` (`exchange_id` ASC),
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
  `active` TINYINT NULL,
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
INSERT INTO `address` (`id`, `address`, `address2`, `city`, `state_abbreviation`, `postal_code`, `active`) VALUES (1, '1234 Admin Drive', 'Apt 204', 'Colorado Springs', 'CO', '80903', 1);
INSERT INTO `address` (`id`, `address`, `address2`, `city`, `state_abbreviation`, `postal_code`, `active`) VALUES (2, '1234 Admin Drive', 'Apt 204', 'Colorado Springs', 'CO', '80903', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `phone`, `role`, `image_url`, `create_date`, `active`, `address_id`) VALUES (1, 'admin1', NULL, 'Bob', 'Smith', 'bobsmith@example.com', '1234567890', 'admin', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg', '2021-08-17', 1, 1);
INSERT INTO `user` (`id`, `username`, `password`, `first_name`, `last_name`, `email`, `phone`, `role`, `image_url`, `create_date`, `active`, `address_id`) VALUES (2, 'admin2', NULL, 'Jane', 'Smith', 'janesmith@example.com', '1234567891', 'admin', 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg', '2021-08-17', 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `category` (`id`, `name`, `active`) VALUES (1, 'Vegetable', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `produce`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `produce` (`id`, `name`, `avg_item_weight`, `image_url`, `active`, `category_id`) VALUES (1, 'Carrot', 2, 'https://burea-uinsurance.com/en/wp-content/uploads/2019/11/how-much-does-a-medium-sized-carrot-weigh.jpg', 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `garden_item`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `garden_item` (`id`, `description`, `grow_method`, `date_expected`, `amount`, `variety`, `pesticides`, `fertilizers`, `create_date`, `active`, `user_id`, `produce_id`) VALUES (1, 'Some delicious carrots.', 'Fast', '2021-08-17', 15, 'baby', 0, 0, '2021-08-17', 1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `exchange`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `exchange` (`id`, `exchange_date`, `rating`, `buyer_comment`, `complete`, `accepted`, `create_date`, `active`, `buyer_id`) VALUES (1, '2021-08-17', 5, 'Fricken\' amazing carrots!', 1, 1, '2021-08-17', 1, 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `exchange_item`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `exchange_item` (`id`, `quantity`, `exchange_id`, `garden_item_id`, `active`) VALUES (1, 10, 1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `wishlist_produce`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `wishlist_produce` (`id`, `create_date`, `active`, `user_id`, `produce_id`) VALUES (1, '2021-08-17', 1, 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `message`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `message` (`id`, `content`, `create_time`, `viewed`, `active`, `sender_id`, `reciever_id`) VALUES (1, 'Hello CultivAid!', '2021-08-17', 1, 1, 2, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `exchange_image`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `exchange_image` (`id`, `image_url`, `active`, `exchange_id`) VALUES (1, 'https://burea-uinsurance.com/en/wp-content/uploads/2019/11/how-much-does-a-medium-sized-carrot-weigh.jpg', 1, 1);
INSERT INTO `exchange_image` (`id`, `image_url`, `active`, `exchange_id`) VALUES (2, 'https://burea-uinsurance.com/en/wp-content/uploads/2019/11/how-much-does-a-medium-sized-carrot-weigh.jpg', 1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `garden_item_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `cultivaiddb`;
INSERT INTO `garden_item_comment` (`id`, `create_date`, `content`, `active`, `sender_id`, `garden_item_id`, `in_reply_to_id`) VALUES (1, '2021-08-17', 'Wow these carrots look great.', 1, 2, 1, NULL);
INSERT INTO `garden_item_comment` (`id`, `create_date`, `content`, `active`, `sender_id`, `garden_item_id`, `in_reply_to_id`) VALUES (2, '2021-08-17', 'This is a reply', 1, 1, 1, 1);
INSERT INTO `garden_item_comment` (`id`, `create_date`, `content`, `active`, `sender_id`, `garden_item_id`, `in_reply_to_id`) VALUES (3, '2021-08-17', 'a reply to the reply', 1, 2, 1, 1);

COMMIT;


-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mega_red
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mega_red
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mega_red` DEFAULT CHARACTER SET utf8mb4 ;
USE `mega_red` ;

-- -----------------------------------------------------
-- Table `mega_red`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`genres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `genre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `mega_red`.`platforms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`platforms` (
  `id` INT(11) NOT NULL,
  `platform` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `mega_red`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(100) NOT NULL UNIQUE,
  `descripcion` TEXT NULL DEFAULT NULL,
  `precio` INT(10) UNSIGNED NOT NULL,
  `stock` INT(10) UNSIGNED NULL DEFAULT NULL,
  `img` VARCHAR(150) NOT NULL,
  `genre_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `productsGenres`
    FOREIGN KEY (`genre_id`)
    REFERENCES `mega_red`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `mega_red`.`platform_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`platform_product` (
  `id` INT(11) NOT NULL,
  `platform_id` INT(11) NOT NULL,
  `product_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `platformProduct`
    FOREIGN KEY (`platform_id`)
    REFERENCES `mega_red`.`platforms` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `productPlatform`
    FOREIGN KEY (`product_id`)
    REFERENCES `mega_red`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `mega_red`.`usertype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`usertype` (
  `id` INT(11) NOT NULL,
  `userType` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `mega_red`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`users` (
  `id` INT(11) NOT NULL,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(150) NOT NULL,
  `avatar` VARCHAR(150) NULL DEFAULT NULL,
  `type_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `userUsertype`
    FOREIGN KEY (`type_id`)
    REFERENCES `mega_red`.`usertype` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

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
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `mega_red`.`platform`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`platform` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `mega_red`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`products` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `descripcion` VARCHAR(500) NOT NULL,
  `precio` INT(11) NOT NULL,
  `stock` INT(11) NOT NULL,
  `img` VARCHAR(500) NOT NULL,
  `genreId` INT(11) NOT NULL UNIQUE,
  `platformId` INT(11) NOT NULL UNIQUE,
  PRIMARY KEY (`id`),
  CONSTRAINT `genre`
    FOREIGN KEY (`genreId`)
    REFERENCES `mega_red`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `platform`
    FOREIGN KEY (`platformId`)
    REFERENCES `mega_red`.`platform` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `mega_red`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`sequelizemeta` (
  `name` VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (`name`),
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `mega_red`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mega_red`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT 0,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `avatar` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`),
 ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

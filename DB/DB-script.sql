-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema masyanya-vpc-db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema masyanya-vpc-db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `masyanya-vpc-db` DEFAULT CHARACTER SET utf8 ;
USE `masyanya-vpc-db` ;

-- -----------------------------------------------------
-- Table `masyanya-vpc-db`.`bus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masyanya-vpc-db`.`bus` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `capacity` INT NOT NULL,
  `run` INT NOT NULL,
  `producer` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `masyanya-vpc-db`.`route`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masyanya-vpc-db`.`route` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `start_address` VARCHAR(45) NOT NULL,
  `end_address` VARCHAR(45) NOT NULL,
  `one_stop_fee_dollars` INT NOT NULL,
  `route_fee_dollars` INT NOT NULL,
  `route_distance_in_km` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `masyanya-vpc-db`.`bus_has_route`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masyanya-vpc-db`.`bus_has_route` (
  `Bus_id` INT NOT NULL,
  `Route_id` INT NOT NULL,
  PRIMARY KEY (`Bus_id`, `Route_id`),
  INDEX `fk_Bus_has_Route_Route1_idx` (`Route_id` ASC) VISIBLE,
  INDEX `fk_Bus_has_Route_Bus1_idx` (`Bus_id` ASC) VISIBLE,
  CONSTRAINT `fk_Bus_has_Route_Bus1`
    FOREIGN KEY (`Bus_id`)
    REFERENCES `masyanya-vpc-db`.`bus` (`id`),
  CONSTRAINT `fk_Bus_has_Route_Route1`
    FOREIGN KEY (`Route_id`)
    REFERENCES `masyanya-vpc-db`.`route` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `masyanya-vpc-db`.`stop`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `masyanya-vpc-db`.`stop` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `Route_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Route_id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_Stop_Route_idx` (`Route_id` ASC) VISIBLE,
  CONSTRAINT `fk_Stop_Route`
    FOREIGN KEY (`Route_id`)
    REFERENCES `masyanya-vpc-db`.`route` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

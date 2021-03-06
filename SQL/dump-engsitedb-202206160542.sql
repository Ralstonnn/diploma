-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: engsitedb
-- ------------------------------------------------------
-- Server version	5.5.5-10.8.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE USER IF NOT EXISTS engsite IDENTIFIED BY '0000';

-- Dumping database structure for engsitedb
CREATE DATABASE IF NOT EXISTS `engsitedb` /*!40100 DEFAULT CHARACTER SET utf8mb3 */;
USE `engsitedb`;

GRANT ALL PRIVILEGES ON engsitedb.* TO engsite;

--
-- Table structure for table `dictionary`
--

DROP TABLE IF EXISTS `dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dictionary` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `word` varchar(128) NOT NULL,
  `definition` varchar(1024) NOT NULL,
  `repeat_date` datetime NOT NULL DEFAULT curdate(),
  `to_learn` tinyint(1) NOT NULL DEFAULT 1,
  `to_spellcheck` tinyint(1) NOT NULL DEFAULT 1,
  `to_choose_word` tinyint(1) NOT NULL DEFAULT 1,
  `repeat_counter` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `words_FK` (`user_id`),
  CONSTRAINT `words_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dictionary`
--

LOCK TABLES `dictionary` WRITE;
/*!40000 ALTER TABLE `dictionary` DISABLE KEYS */;
INSERT INTO `dictionary` VALUES (3,1,'test','a way of discovering, by questions or practical activities, what someone knows, or what someone or something can do or is like','2022-05-30 05:00:00',0,0,0,1),(4,23,'sadfasdf','asdfasdfasdf','2022-05-29 00:00:00',1,1,1,1),(5,23,'zxvzxcvzxv','zxcvzxcvzxcv','2022-05-29 00:00:00',1,1,1,1),(6,23,'fghfhfghf','hfghfghfgh','2022-05-29 00:00:00',1,1,1,1),(7,23,'ertertertert','ertertert','2022-05-29 00:00:00',1,1,1,1),(8,23,'tyutuytyu','tyututyu','2022-05-29 00:00:00',1,1,1,1),(9,23,'erwrwerwe','rwerwerwerwer','2022-05-29 00:00:00',1,1,1,1),(10,1,'asdfasdf','asdfjfngj','2022-05-29 00:00:00',1,1,1,1),(12,1,'dfghdfgh','dfghdfgh','2022-05-29 00:00:00',1,1,1,1),(13,1,'something ','tutyu','2022-05-29 00:00:00',1,1,1,1),(14,1,'jkljljkljkl','jkljkljl','2022-05-29 00:00:00',1,1,1,1),(15,1,'hhjgjghj','ghjgjghj','2022-05-29 00:00:00',1,1,1,1),(16,1,'bvnmvbmnvbn','bvnmvbmvbm','2022-05-29 00:00:00',1,1,1,1),(17,1,'tyutyutyu','tyututyu','2022-05-29 00:00:00',1,1,1,1),(18,1,'uiouiouio','uiouiouio','2022-05-29 00:00:00',1,1,1,1),(19,1,'sdfgsdgsd','gsdgsdgsdgsd','2022-05-29 00:00:00',1,1,1,1),(21,2,'persuade','to make someone do or believe something by giving them a good reason to do it or by talking to that person and making them believe it','2022-06-16 05:00:00',1,0,1,1),(22,2,'civil','not military or religious, or relating to the ordinary people of a country','2022-06-15 00:00:00',0,0,0,1),(26,2,'write','to make marks that represent letters, words, or numbers on a surface, such as paper or a computer screen, using a pen, pencil, or keyboard, or to use this method to record thoughts, facts, or messages','2022-06-16 05:00:00',1,1,1,1),(29,2,'serendipitous','Happening or found by chance','2022-06-15 00:00:00',1,0,0,1),(39,2,'challenge','something that needs great mental or physical effort in order to be done successfully and therefore tests a person\'s ability','2022-06-16 00:00:00',1,1,0,1),(40,2,'present','something that you are given, without asking for it, on a special occasion, especially to show friendship, or to say thank you','2022-06-15 00:00:00',0,1,0,1),(41,2,'firm','not soft but not completely hard','2022-06-16 00:00:00',1,1,1,1),(42,2,'resilience','the ability to be happy, successful, etc. again after something difficult or bad has happened','2022-06-15 00:00:00',0,0,0,1),(43,2,'write','to make marks that represent letters, words, or numbers on a surface, such as paper or a computer screen, using a pen, pencil, or keyboard, or to use this method to record thoughts, facts, or messages','2022-06-16 00:00:00',1,1,1,1),(44,2,'access','the method or possibility of getting near to a place or person','2022-06-15 00:00:00',0,0,1,1),(45,2,'op-ed','used to describe a piece of writing that expresses a personal opinion and is usually printed in a newspaper opposite the page on which the editorial is printed','2022-06-15 00:00:00',0,0,1,1),(46,2,'implement','to start using a plan or system','2022-06-16 00:00:00',1,0,0,1),(47,2,'especially','very much; more than usual or more than other people or things','2022-06-15 00:00:00',0,0,0,1),(48,2,'make out','to deal with a situation, usually in a successful way','2022-06-15 00:00:00',0,0,0,1),(49,2,'abandon','to leave somebody, especially somebody you are responsible for, with no intention of returning','2022-06-15 00:00:00',0,1,0,1),(50,2,'ability','ability to do something the fact that somebody/something is able to do something','2022-06-16 00:00:00',1,0,0,1),(51,2,'above','at or to a higher place or position than something/somebody','2022-06-15 00:00:00',0,0,1,1),(52,2,'access','the opportunity or right to use something or to see somebody/something','2022-06-16 00:00:00',1,0,0,1),(53,2,'act','to do something for a particular purpose or in order to deal with a situation','2022-06-16 00:00:00',1,1,1,1),(54,2,'addition','a thing that is added to something else','2022-06-15 00:00:00',0,0,0,1),(55,2,'advance','done or given before something is going to happen','2022-06-15 00:00:00',0,0,0,1),(56,2,'advertising','the activity and industry of advertising things to people on television, in newspapers, on the internet, etc.','2022-06-16 00:00:00',1,0,1,1),(57,2,'eloquent','able to use language and express your opinions well, especially when you are speaking in public','2022-06-15 00:00:00',0,0,0,1),(58,2,'regret','to feel sorry about something you have done or about something that you have not been able to do','2022-06-16 00:00:00',1,1,0,1),(59,2,'regular','following a pattern, especially with the same time or space in between each thing and the next','2022-06-15 00:00:00',0,0,1,1),(60,2,'reject','reject something to refuse to accept or consider something','2022-06-15 00:00:00',0,0,0,1),(61,2,'relate ','show or make a connection between two or more things','2022-06-16 00:00:00',1,1,0,1),(62,2,'relationship','the way in which two people, groups or countries behave towards each other or deal with each other','2022-06-16 00:00:00',1,1,0,1),(63,2,'tongue','the soft part in the mouth that moves around, used for tasting, swallowing, speaking, etc.','2022-06-16 00:00:00',1,0,1,1);
/*!40000 ALTER TABLE `dictionary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `placeholder_dictionary`
--

DROP TABLE IF EXISTS `placeholder_dictionary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `placeholder_dictionary` (
  `id` int(16) NOT NULL AUTO_INCREMENT,
  `word` varchar(100) DEFAULT NULL,
  `definition` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `placeholder_dictionary_un_word` (`word`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `placeholder_dictionary`
--

LOCK TABLES `placeholder_dictionary` WRITE;
/*!40000 ALTER TABLE `placeholder_dictionary` DISABLE KEYS */;
INSERT INTO `placeholder_dictionary` VALUES (1,'approach','to come near or nearer to something or someone in space, time, quality, or amount'),(2,'bear','to accept, tolerate, or endure something, especially something unpleasant'),(3,'vulnerable','able to be easily physically or mentally hurt, influenced, or attacked'),(4,'claim','to say that something is true or is a fact, although you cannot prove it and other people might not believe it'),(5,'perspective','a particular way of considering something'),(6,'environment','the air, water, and land in or on which people, animals, and plants live'),(7,'influence','the power to have an effect on people or things, or a person or thing that is able to do this'),(8,'implement','to start using a plan or system'),(9,'commit','to do something illegal or something that is considered wrong'),(10,'persuade','to make someone do or believe something by giving them a good reason to do it or by talking to that person and making them believe it'),(11,'aspiration','a strong desire to have or do something'),(12,'abandon','to leave somebody, especially somebody you are responsible for, with no intention of returning'),(13,'ability','the fact that somebody/something is able to do something'),(14,'able','to have the skill, intelligence, opportunity, etc. needed to do something'),(15,'above','at or to a higher place; greater in number, level or age'),(16,'abroad','in or to a foreign country'),(17,'absolute','total and complete; used, especially in spoken English, to give emphasis to what you are saying'),(18,'academic','connected with education, especially studying in schools and universities'),(19,'accept','to take willingly something that is offered; to say ???????yes???????? to an offer, invitation, etc.'),(20,'access','the opportunity or right to use something or to see somebody/something');
/*!40000 ALTER TABLE `placeholder_dictionary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `login` varchar(25) NOT NULL,
  `password` varchar(256) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `surname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email` (`email`),
  UNIQUE KEY `user_login` (`login`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'1@gamil.com','1','1',NULL,NULL),(2,'tset@test.com','test','test','John','Doe'),(23,'test2@test.com','test2','test',NULL,NULL),(24,'jm@jm.com','jm','jm',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'engsitedb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-16  5:42:35

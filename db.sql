/*
SQLyog Ultimate v11.11 (64 bit)
MySQL - 5.5.5-10.4.17-MariaDB : Database - laravel_react_api
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`laravel_react_api` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `laravel_react_api`;

/*Table structure for table `cities` */

DROP TABLE IF EXISTS `cities`;

CREATE TABLE `cities` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `cities` */

insert  into `cities`(`id`,`city`,`created_at`,`updated_at`) values (1,'Hyderabad',NULL,NULL),(2,'Jamshoro',NULL,NULL),(3,'Karachi',NULL,NULL),(4,'Islamabad',NULL,NULL);

/*Table structure for table `earnings` */

DROP TABLE IF EXISTS `earnings`;

CREATE TABLE `earnings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `earning_type` enum('profile','survey','referral') COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `amount` decimal(8,2) NOT NULL,
  `is_partial` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `earnings_user_id_foreign` (`user_id`),
  CONSTRAINT `earnings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `earnings` */

/*Table structure for table `failed_jobs` */

DROP TABLE IF EXISTS `failed_jobs`;

CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `failed_jobs` */

/*Table structure for table `langs` */

DROP TABLE IF EXISTS `langs`;

CREATE TABLE `langs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `langs` */

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values (1,'2014_10_12_100000_create_password_reset_tokens_table',1),(2,'2019_08_19_000000_create_failed_jobs_table',1),(3,'2019_12_14_000001_create_personal_access_tokens_table',1),(4,'2024_02_26_071808_create_user_otps_table',1),(5,'2024_02_26_071821_create_langs_table',1),(6,'2024_02_26_071834_create_roles_table',1),(7,'2024_02_26_071938_create_users_table',1),(8,'2024_02_26_072928_create_user_has_roles_table',1),(9,'2024_02_26_073104_create_surveys_table',1),(10,'2024_02_26_073134_create_questions_table',1),(11,'2024_02_26_073147_create_options_table',1),(12,'2024_02_26_074552_create_question_translations_table',1),(13,'2024_02_26_074601_create_option_translations_table',1),(14,'2024_02_26_074620_create_survey_attempts_table',1),(15,'2024_02_26_074638_create_referrals_table',1),(16,'2024_02_26_075031_create_earnings_table',1),(17,'2024_02_26_075042_create_wallets_table',1),(18,'2024_02_26_075130_create_withdrawal_requests_table',1),(19,'2024_02_26_075404_create_withdrawal_histories_table',1),(20,'2024_02_26_075446_create_terms_and_conditions_table',1),(21,'2024_02_26_125532_create_survey_question_links_table',1),(22,'2024_03_04_103929_create_permissions_table',2),(23,'2024_03_04_104005_create_role_has_permissions_table',3),(24,'2024_03_04_105308_create_role_has_permissions_table',4),(25,'2024_03_07_044503_create_cities_table',5);

/*Table structure for table `option_translations` */

DROP TABLE IF EXISTS `option_translations`;

CREATE TABLE `option_translations` (
  `option_id` bigint(20) unsigned NOT NULL,
  `language` bigint(20) unsigned NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `option_translations_option_id_foreign` (`option_id`),
  KEY `option_translations_language_foreign` (`language`),
  CONSTRAINT `option_translations_language_foreign` FOREIGN KEY (`language`) REFERENCES `langs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `option_translations_option_id_foreign` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `option_translations` */

/*Table structure for table `options` */

DROP TABLE IF EXISTS `options`;

CREATE TABLE `options` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `questions_id` bigint(20) unsigned NOT NULL,
  `option_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `options_questions_id_foreign` (`questions_id`),
  CONSTRAINT `options_questions_id_foreign` FOREIGN KEY (`questions_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `options` */

insert  into `options`(`id`,`questions_id`,`option_text`,`created_at`,`updated_at`) values (4,23,'False','2024-02-27 11:26:50','2024-02-27 11:26:50'),(5,24,'Rohtasgarh','2024-02-27 11:38:50','2024-02-27 11:38:50'),(6,24,'Sasaram','2024-02-27 11:38:50','2024-02-27 11:38:50'),(7,24,'Chausa','2024-02-27 11:38:50','2024-02-27 11:38:50'),(8,24,'Delhi','2024-02-27 11:38:50','2024-02-27 11:38:50'),(9,25,'Write here your name','2024-02-27 11:40:41','2024-02-27 11:40:41'),(10,26,'write here','2024-02-27 11:50:06','2024-02-27 11:50:06'),(11,27,'write here','2024-02-27 11:51:40','2024-02-27 11:51:40'),(12,28,'write here command','2024-02-27 11:53:18','2024-02-27 11:53:18'),(13,29,'True','2024-02-27 11:55:24','2024-02-27 11:55:24'),(14,30,'True','2024-02-27 12:00:24','2024-02-27 12:00:24'),(15,31,'write here','2024-02-28 06:06:26','2024-02-28 06:06:26'),(16,34,'25 years','2024-02-28 10:43:40','2024-02-28 10:43:40'),(17,34,'35 years','2024-02-28 10:43:40','2024-02-28 10:43:40'),(18,34,'40 years','2024-02-28 10:43:40','2024-02-28 10:43:40'),(19,35,'8th class','2024-02-29 04:26:50','2024-02-29 04:26:50'),(20,35,'7th class','2024-02-29 04:26:50','2024-02-29 04:26:50'),(21,35,'6th class','2024-02-29 04:26:50','2024-02-29 04:26:50'),(22,35,'5th class','2024-02-29 04:26:50','2024-02-29 04:26:50'),(23,36,'Write here','2024-02-29 04:30:04','2024-02-29 04:30:04'),(24,37,'True','2024-03-04 04:16:31','2024-03-04 04:16:31'),(25,38,'q','2024-03-04 06:48:49','2024-03-04 06:48:49'),(26,38,'a','2024-03-04 06:48:49','2024-03-04 06:48:49'),(27,39,'True','2024-03-04 06:49:12','2024-03-04 06:49:12'),(28,40,'write here','2024-03-04 07:20:36','2024-03-04 07:20:36'),(29,41,'qqq','2024-03-05 05:24:26','2024-03-05 05:24:26');

/*Table structure for table `password_reset_tokens` */

DROP TABLE IF EXISTS `password_reset_tokens`;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_reset_tokens` */

/*Table structure for table `permissions` */

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `permissions` */

insert  into `permissions`(`id`,`name`,`created_at`,`updated_at`) values (1,'survey_view',NULL,NULL),(2,'survey_add',NULL,NULL),(3,'survey_edit',NULL,NULL),(4,'survey_delete',NULL,NULL),(5,'question_view',NULL,NULL),(6,'question_add',NULL,NULL),(7,'question_edit',NULL,NULL),(8,'question_delete',NULL,NULL),(9,'terms_view',NULL,NULL),(10,'terms_add',NULL,NULL),(11,'terms_edit',NULL,NULL),(12,'terms_delete',NULL,NULL),(13,'employee_view',NULL,NULL),(14,'employee_add',NULL,NULL),(15,'employee_edit',NULL,NULL),(16,'employee_delete',NULL,NULL),(17,'add_user','2024-03-12 05:08:53','2024-03-12 05:08:53'),(18,'view_user','2024-03-12 05:08:53','2024-03-12 05:08:53');

/*Table structure for table `personal_access_tokens` */

DROP TABLE IF EXISTS `personal_access_tokens`;

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `personal_access_tokens` */

/*Table structure for table `question_translations` */

DROP TABLE IF EXISTS `question_translations`;

CREATE TABLE `question_translations` (
  `questions_id` bigint(20) unsigned NOT NULL,
  `language` bigint(20) unsigned NOT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `question_translations_questions_id_foreign` (`questions_id`),
  KEY `question_translations_language_foreign` (`language`),
  CONSTRAINT `question_translations_language_foreign` FOREIGN KEY (`language`) REFERENCES `langs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `question_translations_questions_id_foreign` FOREIGN KEY (`questions_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `question_translations` */

/*Table structure for table `questions` */

DROP TABLE IF EXISTS `questions`;

CREATE TABLE `questions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_type` enum('MCQs','Text Field','True/False') COLLATE utf8mb4_unicode_ci NOT NULL,
  `question_for` enum('profile','survey') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `questions` */

insert  into `questions`(`id`,`question`,`question_type`,`question_for`,`created_at`,`updated_at`) values (23,'The goat is the national animal of Scotland?','True/False','survey','2024-02-27 11:26:50','2024-02-27 11:26:50'),(24,'Where is the tomb of Sher Shah Suri located?','MCQs','survey','2024-02-27 11:38:50','2024-02-27 11:38:50'),(25,'What is Your Name?','Text Field','profile','2024-02-27 11:40:41','2024-02-27 11:40:41'),(26,'How Install Laravel?','Text Field','survey','2024-02-27 11:50:06','2024-02-27 11:50:06'),(27,'Create Migration','Text Field','survey','2024-02-27 11:51:40','2024-02-27 11:51:40'),(28,'Create Controller','Text Field','survey','2024-02-27 11:53:18','2024-02-27 11:53:18'),(29,'The DesktopDateTimePicker component which works best for mouse devices and large screens','True/False','survey','2024-02-27 11:55:24','2024-02-27 11:55:24'),(30,'The MobileDateTimePicker component which works best for touch devices and small screens.','True/False','survey','2024-02-27 12:00:24','2024-02-27 12:00:24'),(31,'How to Add New or Modify Old Values in Database?','Text Field','survey','2024-02-28 06:06:26','2024-02-28 06:06:26'),(34,'How old are you?','MCQs','profile','2024-02-28 10:43:40','2024-02-28 10:43:40'),(35,'In which class do you study?','MCQs','profile','2024-02-29 04:26:50','2024-02-29 04:26:50'),(36,'What is your nationality?','Text Field','profile','2024-02-29 04:30:04','2024-02-29 04:30:04'),(37,'hello','True/False','profile','2024-03-04 04:16:31','2024-03-04 04:16:31'),(38,'qqqq','MCQs','profile','2024-03-04 06:48:49','2024-03-04 06:48:49'),(39,'yyyy','True/False','profile','2024-03-04 06:49:12','2024-03-04 06:49:12'),(40,'today question testing','Text Field','profile','2024-03-04 07:20:36','2024-03-04 07:20:36'),(41,'sssss','Text Field','profile','2024-03-05 05:24:26','2024-03-05 05:24:26');

/*Table structure for table `referrals` */

DROP TABLE IF EXISTS `referrals`;

CREATE TABLE `referrals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `referrer` bigint(20) unsigned NOT NULL,
  `referred` bigint(20) unsigned NOT NULL,
  `referral_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `referrals_referrer_foreign` (`referrer`),
  KEY `referrals_referred_foreign` (`referred`),
  CONSTRAINT `referrals_referred_foreign` FOREIGN KEY (`referred`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `referrals_referrer_foreign` FOREIGN KEY (`referrer`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `referrals` */

/*Table structure for table `role_has_permissions` */

DROP TABLE IF EXISTS `role_has_permissions`;

CREATE TABLE `role_has_permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_has_permissions_permission_id_foreign` (`permission_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `role_has_permissions` */

insert  into `role_has_permissions`(`id`,`permission_id`,`role_id`,`created_at`,`updated_at`) values (1,1,11,'2024-03-05 10:11:46','2024-03-05 10:11:46'),(2,3,11,'2024-03-05 10:11:46','2024-03-05 10:11:46'),(4,1,12,NULL,NULL),(33,3,19,'2024-03-07 11:07:33','2024-03-07 11:07:33'),(34,5,19,'2024-03-07 11:07:33','2024-03-07 11:07:33'),(35,8,19,'2024-03-07 11:07:33','2024-03-07 11:07:33'),(36,11,19,'2024-03-07 11:07:33','2024-03-07 11:07:33'),(37,13,19,'2024-03-07 11:07:33','2024-03-07 11:07:33'),(38,16,19,'2024-03-07 11:07:33','2024-03-07 11:07:33'),(39,18,19,NULL,NULL);

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `roles` */

insert  into `roles`(`id`,`name`,`created_at`,`updated_at`) values (11,'Editor','2024-03-05 10:11:46','2024-03-05 10:11:46'),(12,'Viewer','2024-03-05 10:40:26','2024-03-05 10:40:26'),(19,'Administration','2024-03-07 11:07:33','2024-03-07 11:07:33'),(20,'User','2024-03-07 11:07:33','2024-03-07 11:07:33'),(23,'Userrr','2024-03-12 05:08:53','2024-03-12 05:08:53'),(24,'dummyy','2024-03-12 05:08:53','2024-03-12 05:08:53');

/*Table structure for table `survey_attempts` */

DROP TABLE IF EXISTS `survey_attempts`;

CREATE TABLE `survey_attempts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `attempt_by` bigint(20) unsigned NOT NULL,
  `survey_id` bigint(20) unsigned NOT NULL,
  `questions_id` bigint(20) unsigned NOT NULL,
  `option_id` bigint(20) unsigned NOT NULL,
  `option_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_attempts_attempt_by_foreign` (`attempt_by`),
  KEY `survey_attempts_survey_id_foreign` (`survey_id`),
  KEY `survey_attempts_questions_id_foreign` (`questions_id`),
  KEY `survey_attempts_option_id_foreign` (`option_id`),
  CONSTRAINT `survey_attempts_attempt_by_foreign` FOREIGN KEY (`attempt_by`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_attempts_option_id_foreign` FOREIGN KEY (`option_id`) REFERENCES `options` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_attempts_questions_id_foreign` FOREIGN KEY (`questions_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_attempts_survey_id_foreign` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `survey_attempts` */

/*Table structure for table `survey_question_links` */

DROP TABLE IF EXISTS `survey_question_links`;

CREATE TABLE `survey_question_links` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `questions_id` bigint(20) unsigned NOT NULL,
  `survey_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_question_links_questions_id_foreign` (`questions_id`),
  KEY `survey_question_links_survey_id_foreign` (`survey_id`),
  CONSTRAINT `survey_question_links_questions_id_foreign` FOREIGN KEY (`questions_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `survey_question_links_survey_id_foreign` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `survey_question_links` */

insert  into `survey_question_links`(`id`,`questions_id`,`survey_id`,`created_at`,`updated_at`) values (1,23,4,'2024-02-29 11:33:59','2024-02-29 11:33:59'),(2,24,4,'2024-02-29 11:33:59','2024-02-29 11:33:59'),(3,26,4,'2024-02-29 11:33:59','2024-02-29 11:33:59'),(4,25,5,'2024-02-29 11:41:51','2024-02-29 11:41:51'),(5,34,5,'2024-02-29 11:41:51','2024-02-29 11:41:51'),(6,35,5,'2024-02-29 11:41:51','2024-02-29 11:41:51'),(7,35,6,'2024-02-29 11:50:11','2024-02-29 11:50:11'),(8,34,6,'2024-02-29 11:50:11','2024-02-29 11:50:11'),(9,26,7,'2024-02-29 11:51:25','2024-02-29 11:51:25'),(10,24,7,'2024-02-29 11:51:25','2024-02-29 11:51:25'),(11,23,7,'2024-02-29 11:51:25','2024-02-29 11:51:25'),(12,27,7,'2024-02-29 11:51:25','2024-02-29 11:51:25'),(13,28,7,'2024-02-29 11:51:25','2024-02-29 11:51:25'),(14,25,8,'2024-03-04 06:36:55','2024-03-04 06:36:55'),(15,37,8,'2024-03-04 06:36:55','2024-03-04 06:36:55'),(16,36,8,'2024-03-04 06:36:55','2024-03-04 06:36:55'),(17,35,8,'2024-03-04 06:36:55','2024-03-04 06:36:55'),(18,34,8,'2024-03-04 06:36:55','2024-03-04 06:36:55'),(19,24,9,'2024-03-04 06:38:53','2024-03-04 06:38:53'),(20,26,9,'2024-03-04 06:38:53','2024-03-04 06:38:53'),(21,31,9,'2024-03-04 06:38:53','2024-03-04 06:38:53'),(22,29,9,'2024-03-04 06:38:53','2024-03-04 06:38:53'),(23,28,9,'2024-03-04 06:38:53','2024-03-04 06:38:53'),(24,27,9,'2024-03-04 06:38:53','2024-03-04 06:38:53'),(25,30,9,'2024-03-04 06:38:53','2024-03-04 06:38:53'),(26,25,10,'2024-03-04 06:39:40','2024-03-04 06:39:40'),(27,34,10,'2024-03-04 06:39:40','2024-03-04 06:39:40'),(28,35,10,'2024-03-04 06:39:40','2024-03-04 06:39:40'),(29,36,10,'2024-03-04 06:39:40','2024-03-04 06:39:40');

/*Table structure for table `surveys` */

DROP TABLE IF EXISTS `surveys`;

CREATE TABLE `surveys` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `added_by` bigint(20) unsigned NOT NULL,
  `survey_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `survey_type` enum('profile','survey') COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_within_timer` int(11) NOT NULL,
  `price_without_timer` int(11) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `expire_at` datetime DEFAULT NULL,
  `is_active` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `surveys_added_by_foreign` (`added_by`),
  CONSTRAINT `surveys_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `surveys` */

insert  into `surveys`(`id`,`added_by`,`survey_name`,`survey_type`,`price_within_timer`,`price_without_timer`,`start_time`,`expire_at`,`is_active`,`published_at`,`created_at`,`updated_at`) values (4,1,'ttt','survey',43433,1212,'2024-02-24 12:00:00','2024-02-29 12:00:00','active','2024-02-29 14:00:00','2024-02-29 11:33:59','2024-02-29 11:33:59'),(5,1,'rewer','profile',22222,1111,NULL,NULL,'active',NULL,'2024-02-29 11:41:51','2024-02-29 11:41:51'),(6,1,'qqq','profile',22,1,NULL,NULL,'active',NULL,'2024-02-29 11:50:11','2024-02-29 11:50:11'),(7,1,'www','survey',222,11,'2024-02-29 01:00:00','2024-02-29 16:00:00','active','2024-02-29 12:05:00','2024-02-29 11:51:25','2024-02-29 11:51:25'),(8,1,'profile survey test','profile',200,100,NULL,NULL,'deactive',NULL,'2024-03-04 06:36:55','2024-03-04 06:36:55'),(9,1,'survey test','survey',500,249,'2024-03-05 00:00:00','2024-03-06 00:00:00','active','2024-03-05 00:00:00','2024-03-04 06:38:53','2024-03-04 06:38:53'),(10,1,'profile questions','profile',100,10,NULL,NULL,'active',NULL,'2024-03-04 06:39:40','2024-03-04 06:39:40');

/*Table structure for table `terms_and_conditions` */

DROP TABLE IF EXISTS `terms_and_conditions`;

CREATE TABLE `terms_and_conditions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `terms_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` enum('active','deactive') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `terms_and_conditions` */

insert  into `terms_and_conditions`(`id`,`terms_text`,`is_active`,`created_at`,`updated_at`) values (2,'What is Lorem Ipsum?\n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#039;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.','active','2024-03-04 04:45:43','2024-03-04 04:45:43'),(32,'test today testing','deactive','2024-03-05 05:25:41','2024-03-05 05:25:41');

/*Table structure for table `user_otps` */

DROP TABLE IF EXISTS `user_otps`;

CREATE TABLE `user_otps` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp_expire_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('verified','unverified') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user_otps` */

/*Table structure for table `user_roles` */

DROP TABLE IF EXISTS `user_roles`;

CREATE TABLE `user_roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_roles_role_id_foreign` (`role_id`),
  KEY `user_roles_user_id_foreign` (`user_id`),
  CONSTRAINT `user_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user_roles` */

insert  into `user_roles`(`id`,`user_id`,`role_id`,`created_at`,`updated_at`) values (1,6,12,'2024-03-07 06:58:32','2024-03-07 06:58:32'),(2,9,12,'2024-03-07 07:02:35','2024-03-07 07:02:35'),(3,1,19,'2024-03-07 11:08:13','2024-03-07 11:08:13'),(4,11,20,'2024-03-07 11:33:32','2024-03-07 11:33:32'),(5,12,20,'2024-03-07 11:37:12','2024-03-07 11:37:12'),(6,13,20,NULL,NULL),(7,14,11,'2024-03-11 06:48:59','2024-03-11 06:48:59'),(8,15,20,'2024-03-11 06:51:11','2024-03-11 06:51:11');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `status` enum('approved','disapproved','pending') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` bigint(20) unsigned DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `referral_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referral_count` int(11) DEFAULT NULL,
  `provider` enum('google','facebook','by_admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_phone_number_foreign` (`phone_number`),
  KEY `users_language_foreign` (`language`),
  CONSTRAINT `users_language_foreign` FOREIGN KEY (`language`) REFERENCES `langs` (`id`),
  CONSTRAINT `users_phone_number_foreign` FOREIGN KEY (`phone_number`) REFERENCES `user_otps` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`status`,`name`,`user_name`,`phone_number`,`email`,`city`,`password`,`referral_link`,`referral_count`,`provider`,`language`,`created_at`,`updated_at`) values (1,'approved','Ali',NULL,NULL,'test@gmail.com',NULL,'$2y$12$rFc59T.dYWjVgy0vQ0QPR.iVmluKZRZkL0dbDtlo602kJHq7BkySC',NULL,NULL,'google',NULL,'2024-02-26 12:58:29','2024-02-26 12:58:29'),(6,'disapproved','ww','ww',NULL,'a@gmail.com','qq','$2y$12$rFc59T.dYWjVgy0vQ0QPR.iVmluKZRZkL0dbDtlo602kJHq7BkySC','Ok173',0,'by_admin',NULL,'2024-03-07 06:55:13','2024-03-11 08:56:01'),(7,'pending','ww','wwww',NULL,'w@gmail.com','sss','$2y$12$Yv8DmqRn3A6368fZi4.WYu.DPsgdMRBMZ5OBNd1BnNULr8mdeXe4S','2fjbt',0,'by_admin',NULL,'2024-03-07 06:56:58','2024-03-07 06:56:58'),(8,'pending','qaa','qqq',NULL,'q@gmail.com','1','$2y$12$rFc59T.dYWjVgy0vQ0QPR.iVmluKZRZkL0dbDtlo602kJHq7BkySC','yPRwd',0,'by_admin',NULL,'2024-03-07 06:58:32','2024-03-07 06:58:32'),(9,'pending','rrr','rrrr',NULL,'r@gmail.com','qqq','$2y$12$n7AbU65iBUwl.7yppAhJTuWKnchA.nwEAvydps3gOf1kKuweKM88O','3dZyy',0,'by_admin',NULL,'2024-03-07 07:02:35','2024-03-07 07:02:35'),(10,'pending','testuser','tetye',NULL,'s@gmail.com','fdfg','$2y$12$ktI0WsGj.j/NT4s6R.2bZOo.cY27bvrrKAchTWsU.hIz5WqwM5Kiu','Mlhfw',0,'by_admin',NULL,'2024-03-07 11:08:13','2024-03-07 11:08:13'),(11,'pending','tt','ttt',NULL,'kainat@gmail.com','qwer','$2y$12$ATwpjDvXQvWx/u6kZQ66k.208GuZMtBJEOF2f/igQ3jRU2k0M7bfe','FG0Fz',0,'by_admin',NULL,'2024-03-07 11:33:32','2024-03-11 11:39:31'),(12,'pending','qqqqq','qqqqqqqqqq',NULL,'q@gmail.com','ghghj','$2y$12$KSewIP7ZjgzKwU3BIBVRye.Xza5TQo9qrUonxzLJBZFjSHsXvESfm','F7qE5',0,'by_admin',NULL,'2024-03-07 11:37:12','2024-03-11 11:43:11'),(13,'approved','ww',NULL,NULL,'t@gmail.com',NULL,'$2y$12$BRBeKkN7h2pIMdhr2DqcbemSNC33urXKIKL3MFFYYKmdEAbXbpkcS',NULL,NULL,'google',NULL,'2024-03-11 06:04:09','2024-03-11 11:35:51'),(14,'approved','testingtodayay','testingtodayay',NULL,'testingtodayay@gmail.com','sdsfsfd','$2y$12$WARjUBKQQVDnGooo3sSRzeNro8iLPLILW7rXfkYKNHZvUAYbpRvyK','benWu',0,'by_admin',NULL,'2024-03-11 06:48:59','2024-03-11 08:55:55'),(15,'pending','qqq','qqqqqqq',NULL,'qqq@gmail.com','ssssss','$2y$12$E6Va.O7NNv2KLwbWBtS3g.zAciNFmRFDLjdJbzFDwP.I7ASbTJ6xi','zH9Or',0,'by_admin',NULL,'2024-03-11 06:51:11','2024-03-11 11:41:27');

/*Table structure for table `wallets` */

DROP TABLE IF EXISTS `wallets`;

CREATE TABLE `wallets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `balance` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wallets_user_id_foreign` (`user_id`),
  CONSTRAINT `wallets_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `wallets` */

/*Table structure for table `withdrawal_histories` */

DROP TABLE IF EXISTS `withdrawal_histories`;

CREATE TABLE `withdrawal_histories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `withdrawal_request_id` bigint(20) unsigned NOT NULL,
  `editor_id` bigint(20) unsigned NOT NULL,
  `status` enum('pending','approved','rejected','completed','failed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `withdrawal_histories_withdrawal_request_id_foreign` (`withdrawal_request_id`),
  KEY `withdrawal_histories_editor_id_foreign` (`editor_id`),
  CONSTRAINT `withdrawal_histories_editor_id_foreign` FOREIGN KEY (`editor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `withdrawal_histories_withdrawal_request_id_foreign` FOREIGN KEY (`withdrawal_request_id`) REFERENCES `withdrawal_requests` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `withdrawal_histories` */

/*Table structure for table `withdrawal_requests` */

DROP TABLE IF EXISTS `withdrawal_requests`;

CREATE TABLE `withdrawal_requests` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `request_by` bigint(20) unsigned NOT NULL,
  `amount` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `mobile_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `withdrawal_requests_request_by_foreign` (`request_by`),
  CONSTRAINT `withdrawal_requests_request_by_foreign` FOREIGN KEY (`request_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `withdrawal_requests` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`id`,`migration`,`batch`) values (1,'2014_10_12_100000_create_password_reset_tokens_table',1),(2,'2019_08_19_000000_create_failed_jobs_table',1),(3,'2019_12_14_000001_create_personal_access_tokens_table',1),(4,'2024_02_26_071808_create_user_otps_table',1),(5,'2024_02_26_071821_create_langs_table',1),(6,'2024_02_26_071834_create_roles_table',1),(7,'2024_02_26_071938_create_users_table',1),(8,'2024_02_26_072928_create_user_has_roles_table',1),(9,'2024_02_26_073104_create_surveys_table',1),(10,'2024_02_26_073134_create_questions_table',1),(11,'2024_02_26_073147_create_options_table',1),(12,'2024_02_26_074552_create_question_translations_table',1),(13,'2024_02_26_074601_create_option_translations_table',1),(14,'2024_02_26_074620_create_survey_attempts_table',1),(15,'2024_02_26_074638_create_referrals_table',1),(16,'2024_02_26_075031_create_earnings_table',1),(17,'2024_02_26_075042_create_wallets_table',1),(18,'2024_02_26_075130_create_withdrawal_requests_table',1),(19,'2024_02_26_075404_create_withdrawal_histories_table',1),(20,'2024_02_26_075446_create_terms_and_conditions_table',1),(21,'2024_02_26_125532_create_survey_question_links_table',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `options` */

insert  into `options`(`id`,`questions_id`,`option_text`,`created_at`,`updated_at`) values (4,23,'False','2024-02-27 11:26:50','2024-02-27 11:26:50'),(5,24,'Rohtasgarh','2024-02-27 11:38:50','2024-02-27 11:38:50'),(6,24,'Sasaram','2024-02-27 11:38:50','2024-02-27 11:38:50'),(7,24,'Chausa','2024-02-27 11:38:50','2024-02-27 11:38:50'),(8,24,'Delhi','2024-02-27 11:38:50','2024-02-27 11:38:50'),(9,25,'Write here your name','2024-02-27 11:40:41','2024-02-27 11:40:41'),(10,26,'write here','2024-02-27 11:50:06','2024-02-27 11:50:06'),(11,27,'write here','2024-02-27 11:51:40','2024-02-27 11:51:40'),(12,28,'write here command','2024-02-27 11:53:18','2024-02-27 11:53:18'),(13,29,'True','2024-02-27 11:55:24','2024-02-27 11:55:24'),(14,30,'True','2024-02-27 12:00:24','2024-02-27 12:00:24');

/*Table structure for table `password_reset_tokens` */

DROP TABLE IF EXISTS `password_reset_tokens`;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `password_reset_tokens` */

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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `questions` */

insert  into `questions`(`id`,`question`,`question_type`,`created_at`,`updated_at`) values (23,'The goat is the national animal of Scotland?','True/False','2024-02-27 11:26:50','2024-02-27 11:26:50'),(24,'Where is the tomb of Sher Shah Suri located?','MCQs','2024-02-27 11:38:50','2024-02-27 11:38:50'),(25,'What is Your Name?','Text Field','2024-02-27 11:40:41','2024-02-27 11:40:41'),(26,'How Install Laravel?','Text Field','2024-02-27 11:50:06','2024-02-27 11:50:06'),(27,'Create Migration','Text Field','2024-02-27 11:51:40','2024-02-27 11:51:40'),(28,'Create Controller','Text Field','2024-02-27 11:53:18','2024-02-27 11:53:18'),(29,'The DesktopDateTimePicker component which works best for mouse devices and large screens','True/False','2024-02-27 11:55:24','2024-02-27 11:55:24'),(30,'The MobileDateTimePicker component which works best for touch devices and small screens.','True/False','2024-02-27 12:00:24','2024-02-27 12:00:24');

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

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `role` enum('admin','local') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `roles` */

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `survey_question_links` */

/*Table structure for table `surveys` */

DROP TABLE IF EXISTS `surveys`;

CREATE TABLE `surveys` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `added_by` bigint(20) unsigned NOT NULL,
  `survey_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `survey_type` enum('profile','survey') COLLATE utf8mb4_unicode_ci NOT NULL,
  `price_within_timer` int(11) NOT NULL,
  `price_without_timer` int(11) NOT NULL,
  `timer_duration` timestamp NULL DEFAULT NULL,
  `expire_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `surveys_added_by_foreign` (`added_by`),
  CONSTRAINT `surveys_added_by_foreign` FOREIGN KEY (`added_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `surveys` */

/*Table structure for table `terms_and_conditions` */

DROP TABLE IF EXISTS `terms_and_conditions`;

CREATE TABLE `terms_and_conditions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `terms_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `terms_and_conditions` */

/*Table structure for table `user_has_roles` */

DROP TABLE IF EXISTS `user_has_roles`;

CREATE TABLE `user_has_roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_has_roles_user_id_foreign` (`user_id`),
  KEY `user_has_roles_role_id_foreign` (`role_id`),
  CONSTRAINT `user_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_has_roles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user_has_roles` */

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

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` bigint(20) unsigned DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `referral_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referral_count` int(11) DEFAULT NULL,
  `provider` enum('google','facebook') COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_phone_number_foreign` (`phone_number`),
  KEY `users_language_foreign` (`language`),
  CONSTRAINT `users_language_foreign` FOREIGN KEY (`language`) REFERENCES `langs` (`id`),
  CONSTRAINT `users_phone_number_foreign` FOREIGN KEY (`phone_number`) REFERENCES `user_otps` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`user_name`,`phone_number`,`email`,`city`,`password`,`referral_link`,`referral_count`,`provider`,`language`,`created_at`,`updated_at`) values (1,'test',NULL,NULL,'test@gmail.com',NULL,'$2y$12$rFc59T.dYWjVgy0vQ0QPR.iVmluKZRZkL0dbDtlo602kJHq7BkySC',NULL,NULL,'google',NULL,'2024-02-26 12:58:29','2024-02-26 12:58:29'),(2,'today',NULL,NULL,'today@gmail.com',NULL,'$2y$12$A1.KJwKStGDfAQtwVTyGa.c8/yTlPSADuouazSlJnG31pv3M6rc3C',NULL,NULL,'google',NULL,'2024-02-27 06:10:27','2024-02-27 06:10:27');

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

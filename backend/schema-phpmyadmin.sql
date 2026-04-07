-- =============================================================================
-- Symphora MySQL schema – ready for phpMyAdmin import
-- Phase 2 will use MongoDB instead for scalability; this schema is for the current phase.
-- =============================================================================
-- How to import in phpMyAdmin:
-- 1. Select your database (or create one, e.g. "symphora").
-- 2. Go to the "Import" tab.
-- 3. Choose this file and click "Go".
-- =============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET time_zone = '+00:00';

-- -----------------------------------------------------------------------------
-- Optional: create database (uncomment if you want to create it from this file)
-- -----------------------------------------------------------------------------
-- CREATE DATABASE IF NOT EXISTS symphora CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE symphora;

-- -----------------------------------------------------------------------------
-- Table: symphora_prompts
-- Marketplace (paid/free) and showroom (showcase) prompts.
-- prompt_data = JSON: segments (encrypted content) and variables.
-- -----------------------------------------------------------------------------
DROP TABLE IF EXISTS symphora_prompt_likes;
DROP TABLE IF EXISTS symphora_generations;
DROP TABLE IF EXISTS symphora_prompts;

CREATE TABLE symphora_prompts (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  creator VARCHAR(255) NOT NULL COMMENT 'Wallet address or user identifier',
  type ENUM('showcase', 'free', 'paid') NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  ai_settings JSON COMMENT 'aspectRatio, includeText',
  pricing JSON COMMENT 'pricePerGeneration for paid',
  prompt_data JSON NOT NULL COMMENT 'segments (encrypted, iv, authTag) and variables',
  showcase_images JSON COMMENT 'Array of { url, thumbnail, isPrimary, usedVariables }',
  stats JSON COMMENT 'totalGenerations, bookmarks, likes, reviews',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  published_at DATETIME(3) NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_type_created (type, created_at),
  KEY idx_type_category_created (type, category, created_at),
  KEY idx_creator_created (creator(191), created_at),
  KEY idx_is_featured_type (is_featured, type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: symphora_prompt_likes
-- One like per user per prompt.
-- -----------------------------------------------------------------------------
CREATE TABLE symphora_prompt_likes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  prompt_id INT UNSIGNED NOT NULL,
  user_id VARCHAR(255) NOT NULL COMMENT 'Wallet address or user identifier',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY uk_prompt_user (prompt_id, user_id(191)),
  KEY idx_prompt (prompt_id),
  CONSTRAINT fk_likes_prompt FOREIGN KEY (prompt_id) REFERENCES symphora_prompts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: symphora_generations
-- User generations: final prompt (encrypted), variable values, image url, status.
-- -----------------------------------------------------------------------------
CREATE TABLE symphora_generations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  prompt_id INT UNSIGNED NOT NULL,
  variable_values JSON,
  reference_images JSON COMMENT 'Array of { url, uploadedAt }',
  final_prompt JSON COMMENT 'Encrypted: encrypted, iv, authTag, expiresAt',
  generated_image JSON COMMENT 'url, thumbnail, width, height, format',
  used_settings JSON COMMENT 'aspectRatio, includeText',
  transaction_data JSON,
  status ENUM('pending', 'processing', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  error_data JSON COMMENT 'message, occurredAt',
  is_private TINYINT(1) NOT NULL DEFAULT 0,
  likes INT UNSIGNED NOT NULL DEFAULT 0,
  bookmarks INT UNSIGNED NOT NULL DEFAULT 0,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  completed_at DATETIME(3) NULL,
  PRIMARY KEY (id),
  KEY idx_user_created (user_id(191), created_at),
  KEY idx_prompt_created (prompt_id, created_at),
  KEY idx_status_created (status, created_at),
  CONSTRAINT fk_generations_prompt FOREIGN KEY (prompt_id) REFERENCES symphora_prompts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: symphora_users
-- Optional user profiles (e.g. wallet addresses, profile, stats).
-- -----------------------------------------------------------------------------
CREATE TABLE symphora_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  wallet_addresses JSON COMMENT 'Array of { chainId, chain, address, isPrimary, addedAt }',
  profile JSON COMMENT 'username, displayName, bio, avatar, banner, socialLinks',
  stats JSON,
  seller_profile JSON,
  specialty VARCHAR(20) NOT NULL DEFAULT 'normal' COMMENT 'normal (+7%%), family (+1%%), admin (0%%)',
  created_at DATETIME(3) NULL,
  updated_at DATETIME(3) NULL,
  last_active DATETIME(3) NULL,
  PRIMARY KEY (id),
  KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: symphora_profile
-- Wallet-scoped profile: avatar, banner, bio (max 280 chars).
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS symphora_profile (
  wallet VARCHAR(255) NOT NULL PRIMARY KEY,
  avatar_url TEXT,
  banner_url TEXT,
  bio VARCHAR(280),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Table: symphora_follows
-- Follower (userKey) follows following (wallet).
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS symphora_follows (
  follower VARCHAR(255) NOT NULL,
  following VARCHAR(255) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (follower(191), following(191)),
  KEY idx_follower (follower(191)),
  KEY idx_following (following(191))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

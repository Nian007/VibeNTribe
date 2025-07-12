-- VibeNTribe Database Schema
-- This file contains the complete database structure for the travel matchmaking platform

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS vibeNtribe;
USE vibeNtribe;

-- Users table - stores user information from LinkedIn OAuth
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  linkedin_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  profile_picture TEXT,
  phone_number VARCHAR(20),
  is_onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_linkedin_id (linkedin_id),
  INDEX idx_email (email),
  INDEX idx_onboarded (is_onboarded)
);

-- Travel dates table - stores user's available travel dates
CREATE TABLE IF NOT EXISTS travel_dates (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_date_range (start_date, end_date),
  
  -- Ensure start_date is before or equal to end_date
  CONSTRAINT chk_date_order CHECK (start_date <= end_date)
);

-- Group preferences table - stores user's group travel preferences
CREATE TABLE IF NOT EXISTS group_preferences (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  preference_type ENUM('mixed', 'couples', 'girls-only') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_preference_type (preference_type),
  
  -- Ensure unique preference per user
  UNIQUE KEY unique_user_preference (user_id, preference_type)
);

-- Matches table - stores potential matches between users (optional for future use)
CREATE TABLE IF NOT EXISTS matches (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user1_id VARCHAR(36) NOT NULL,
  user2_id VARCHAR(36) NOT NULL,
  match_score DECIMAL(3,2) DEFAULT 0.00,
  status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user1 (user1_id),
  INDEX idx_user2 (user2_id),
  INDEX idx_status (status),
  
  -- Ensure users can't match with themselves and avoid duplicate matches
  CONSTRAINT chk_different_users CHECK (user1_id != user2_id),
  UNIQUE KEY unique_match (LEAST(user1_id, user2_id), GREATEST(user1_id, user2_id))
);

-- Notifications table - stores notification history (optional for future use)
CREATE TABLE IF NOT EXISTS notifications (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36) NOT NULL,
  type ENUM('whatsapp', 'email', 'push') NOT NULL,
  message TEXT NOT NULL,
  status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
  sent_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
);
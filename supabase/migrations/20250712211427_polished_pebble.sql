-- VibeNTribe Database Schema
-- MySQL/MariaDB compatible schema for travel matchmaking platform

-- Create database (run this separately if needed)
-- CREATE DATABASE IF NOT EXISTS vibentribe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE vibentribe;

-- Users table - stores LinkedIn authenticated users
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    linkedin_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    profile_picture TEXT,
    headline TEXT,
    location VARCHAR(255),
    is_onboarded BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_linkedin_id (linkedin_id),
    INDEX idx_email (email),
    INDEX idx_onboarded (is_onboarded),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Travel dates table - stores user's available travel dates
CREATE TABLE IF NOT EXISTS travel_dates (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    destination VARCHAR(255),
    is_flexible BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_date_range (start_date, end_date),
    INDEX idx_destination (destination),
    INDEX idx_flexible (is_flexible),
    
    -- Ensure start_date is before or equal to end_date
    CONSTRAINT chk_date_range CHECK (start_date <= end_date)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Group preferences table - stores user's travel group preferences
CREATE TABLE IF NOT EXISTS group_preferences (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    preference_type ENUM('mixed', 'couples', 'girls_only') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_preference_type (preference_type),
    INDEX idx_active (is_active),
    
    -- Ensure unique preference per user
    UNIQUE KEY unique_user_preference (user_id, preference_type)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Matches table - stores user matches and compatibility scores
CREATE TABLE IF NOT EXISTS matches (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    matched_user_id VARCHAR(36) NOT NULL,
    compatibility_score DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    status ENUM('pending', 'accepted', 'declined') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (matched_user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_matched_user_id (matched_user_id),
    INDEX idx_status (status),
    INDEX idx_compatibility_score (compatibility_score),
    INDEX idx_created_at (created_at),
    
    -- Ensure users can't match with themselves
    CONSTRAINT chk_no_self_match CHECK (user_id != matched_user_id),
    -- Ensure unique match pairs (prevent duplicates)
    UNIQUE KEY unique_match_pair (user_id, matched_user_id),
    -- Ensure compatibility score is between 0 and 100
    CONSTRAINT chk_compatibility_score CHECK (compatibility_score >= 0 AND compatibility_score <= 100)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Notifications table - stores user notifications
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    type ENUM('match_found', 'match_accepted', 'new_message') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Match common dates table - stores overlapping dates for matches
CREATE TABLE IF NOT EXISTS match_common_dates (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    match_id VARCHAR(36) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    destination VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE,
    INDEX idx_match_id (match_id),
    INDEX idx_date_range (start_date, end_date),
    
    -- Ensure start_date is before or equal to end_date
    CONSTRAINT chk_common_date_range CHECK (start_date <= end_date)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- User interests table (optional) - for future enhancements
CREATE TABLE IF NOT EXISTS user_interests (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    interest VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_interest (interest),
    
    -- Ensure unique interest per user
    UNIQUE KEY unique_user_interest (user_id, interest)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- WhatsApp logs table - for tracking sent messages
CREATE TABLE IF NOT EXISTS whatsapp_logs (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    phone_number VARCHAR(20),
    message_type VARCHAR(50) NOT NULL,
    message_content TEXT NOT NULL,
    status ENUM('sent', 'delivered', 'failed') DEFAULT 'sent',
    whatsapp_message_id VARCHAR(255),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_status (status),
    INDEX idx_message_type (message_type),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create views for common queries

-- View for user profiles with travel info
CREATE OR REPLACE VIEW user_profiles AS
SELECT 
    u.id,
    u.linkedin_id,
    u.email,
    u.first_name,
    u.last_name,
    u.profile_picture,
    u.headline,
    u.location,
    u.is_onboarded,
    u.created_at,
    u.updated_at,
    COUNT(DISTINCT td.id) as travel_dates_count,
    COUNT(DISTINCT gp.id) as preferences_count
FROM users u
LEFT JOIN travel_dates td ON u.id = td.user_id
LEFT JOIN group_preferences gp ON u.id = gp.user_id AND gp.is_active = TRUE
GROUP BY u.id;

-- View for active matches with user details
CREATE OR REPLACE VIEW active_matches AS
SELECT 
    m.id as match_id,
    m.user_id,
    m.matched_user_id,
    m.compatibility_score,
    m.status,
    m.created_at as match_created_at,
    u1.first_name as user_first_name,
    u1.last_name as user_last_name,
    u2.first_name as matched_user_first_name,
    u2.last_name as matched_user_last_name,
    u2.profile_picture as matched_user_profile_picture,
    u2.headline as matched_user_headline
FROM matches m
JOIN users u1 ON m.user_id = u1.id
JOIN users u2 ON m.matched_user_id = u2.id
WHERE m.status = 'pending' OR m.status = 'accepted';

-- Indexes for performance optimization
CREATE INDEX idx_travel_dates_user_date ON travel_dates(user_id, start_date, end_date);
CREATE INDEX idx_matches_user_status ON matches(user_id, status);
CREATE INDEX idx_notifications_user_unread ON notifications(user_id, is_read);

-- Insert some sample data for testing (optional)
-- This would typically be done through the application, not in schema

-- Sample users (for development only)
-- INSERT INTO users (linkedin_id, email, first_name, last_name, is_onboarded) VALUES
-- ('linkedin_123', 'john@example.com', 'John', 'Doe', TRUE),
-- ('linkedin_456', 'jane@example.com', 'Jane', 'Smith', TRUE);

-- Sample travel dates
-- INSERT INTO travel_dates (user_id, start_date, end_date, destination, is_flexible) VALUES
-- ((SELECT id FROM users WHERE email = 'john@example.com'), '2024-03-15', '2024-03-22', 'Bali', FALSE),
-- ((SELECT id FROM users WHERE email = 'jane@example.com'), '2024-03-18', '2024-03-25', 'Thailand', TRUE);

-- Sample group preferences
-- INSERT INTO group_preferences (user_id, preference_type) VALUES
-- ((SELECT id FROM users WHERE email = 'john@example.com'), 'mixed'),
-- ((SELECT id FROM users WHERE email = 'jane@example.com'), 'mixed');
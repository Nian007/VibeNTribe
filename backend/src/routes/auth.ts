import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { createPool } from '../config/database';
import { config } from '../config';
import { LinkedInService } from '../services/linkedinService';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { User } from '../types';

const router = Router();
const pool = createPool();

// LinkedIn OAuth callback
router.post('/linkedin', async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Get user data from LinkedIn
    const linkedinData = await LinkedInService.getUserData(code);

    // Check if user exists
    const [existingUsers] = await pool.execute(
      'SELECT * FROM users WHERE linkedin_id = ? OR email = ?',
      [linkedinData.linkedinId, linkedinData.email]
    ) as [User[], any];

    let user: User;

    if (existingUsers.length > 0) {
      // Update existing user
      user = existingUsers[0];
      await pool.execute(
        'UPDATE users SET first_name = ?, last_name = ?, profile_picture = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [linkedinData.firstName, linkedinData.lastName, linkedinData.profilePicture, user.id]
      );
    } else {
      // Create new user
      const [result] = await pool.execute(
        'INSERT INTO users (linkedin_id, email, first_name, last_name, profile_picture) VALUES (?, ?, ?, ?, ?)',
        [linkedinData.linkedinId, linkedinData.email, linkedinData.firstName, linkedinData.lastName, linkedinData.profilePicture]
      ) as [any, any];

      // Get the created user
      const [newUsers] = await pool.execute(
        'SELECT * FROM users WHERE id = ?',
        [result.insertId]
      ) as [User[], any];
      
      user = newUsers[0];
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.json({
      user: {
        id: user.id,
        linkedinId: user.linkedin_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        profilePicture: user.profile_picture,
        phoneNumber: user.phone_number,
        isOnboarded: user.is_onboarded,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      token,
    });
  } catch (error) {
    console.error('LinkedIn auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

// Get current user
router.get('/me', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [req.userId]
    ) as [User[], any];

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    res.json({
      id: user.id,
      linkedinId: user.linkedin_id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      profilePicture: user.profile_picture,
      phoneNumber: user.phone_number,
      isOnboarded: user.is_onboarded,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user data' });
  }
});

export default router;
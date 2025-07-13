const express = require('express');
const router = express.Router();
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const db = require('../models');

// LinkedIn OAuth credentials
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

// LinkedIn auth endpoint
router.get('/linkedin', (req, res) => {
  const state = uuidv4();
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?
    response_type=code
    &client_id=${LINKEDIN_CLIENT_ID}
    &redirect_uri=${CALLBACK_URL}
    &state=${state}
    &scope=r_liteprofile%20r_emailaddress`;
  
  res.redirect(authUrl);
});

// LinkedIn callback endpoint
router.get('/callback', async (req, res) => {
  try {
    const { code } = req.query;
    
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: CALLBACK_URL,
        client_id: LINKEDIN_CLIENT_ID,
        client_secret: LINKEDIN_CLIENT_SECRET
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    const accessToken = tokenResponse.data.access_token;
    
    // Get user profile
    const profileResponse = await axios.get(
      'https://api.linkedin.com/v2/me',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    const emailResponse = await axios.get(
      'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    const linkedinId = profileResponse.data.id;
    const email = emailResponse.data.elements[0]['handle~'].emailAddress;
    const name = `${profileResponse.data.firstName.localized.defaultLocale} ${profileResponse.data.lastName.localized.defaultLocale}`;

    // Check if user exists
    const [user] = await db.query(
      'SELECT * FROM users WHERE linkedin_id = ?',
      [linkedinId]
    );

    if (!user) {
      // Create new user
      await db.query(
        'INSERT INTO users (linkedin_id, email, name) VALUES (?, ?, ?)',
        [linkedinId, email, name]
      );
    }

    // Set session or JWT
    req.session.linkedinId = linkedinId;
    
    res.redirect('/onboarding');
  } catch (error) {
    console.error('LinkedIn auth error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
});

module.exports = router;

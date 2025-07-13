const express = require('express');
const router = express.Router();
const pool = require('../models');

// Register onboarding data
router.post('/register', async (req, res) => {
  const { linkedinId, dates, preferences } = req.body;
  
  try {
    // Insert travel dates
    await pool.query(
      'INSERT INTO travel_dates (user_id, start_date, end_date) VALUES (?, ?, ?)',
      [linkedinId, dates.start, dates.end]
    );
    
    // Insert group preferences
    for (const preference of preferences) {
      await pool.query(
        'INSERT INTO group_preferences (user_id, preference_type) VALUES (?, ?)',
        [linkedinId, preference]
      );
    }
    
    // Find matches
    const matches = await findMatches(linkedinId);
    
    // Send WhatsApp notification
    if (matches.length > 0) {
      await sendWhatsAppNotification(linkedinId, matches);
    }
    
    res.json({ matches });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Find matching users
async function findMatches(userId) {
  const [results] = await pool.query(
    `SELECT u.id, u.name, u.email, 
     MAX(CASE WHEN td.start_date <= ? AND td.end_date >= ? THEN 1 ELSE 0 END) as has_common_date,
     COUNT(gp.preference_type) as common_preferences
     FROM users u
     JOIN travel_dates td ON u.id = td.user_id
     JOIN group_preferences gp ON u.id = gp.user_id
     WHERE u.id != ? 
     AND gp.preference_type IN (
       SELECT preference_type FROM group_preferences WHERE user_id = ?
     )
     AND td.start_date <= ? AND td.end_date >= ?
     GROUP BY u.id
     HAVING has_common_date = 1 AND common_preferences > 0
     LIMIT 5`,
    [userId, userId, userId, userId]
  );
  
  return results;
}

// WhatsApp notification
async function sendWhatsAppNotification(userId, matches) {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
  const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  
  const message = `You have ${matches.length} potential travel matches! 
  ${matches.map(m => `${m.name} is available from ${m.common_date}`).join(', ')}`;
  
  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${userId}`
    });
  } catch (error) {
    console.error('WhatsApp error:', error);
  }
}

module.exports = router;

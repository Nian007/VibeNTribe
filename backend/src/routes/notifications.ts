import { Router } from 'express';
import { createPool } from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { WhatsAppService } from '../services/whatsappService';
import { User } from '../types';
import { formatDateRange } from '../utils/dateUtils';

const router = Router();
const pool = createPool();

// Send WhatsApp notification
router.post('/whatsapp', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { matches } = req.body;
    const userId = req.userId!;

    // Get user data
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    ) as [User[], any];

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];

    if (!user.phone_number) {
      return res.status(400).json({ error: 'Phone number not provided' });
    }

    if (!matches || matches.length === 0) {
      return res.status(400).json({ error: 'No matches to notify about' });
    }

    // Format common dates for the message
    const allCommonDates = matches.flatMap((match: any) => 
      match.commonDates.map((date: any) => 
        formatDateRange(new Date(date.startDate), new Date(date.endDate))
      )
    );

    // Remove duplicates and limit to first few dates
    const uniqueDates = [...new Set(allCommonDates)];

    // Generate and send WhatsApp message
    const message = WhatsAppService.generateMatchMessage(
      user.first_name,
      matches.length,
      uniqueDates
    );

    await WhatsAppService.sendMessage(user.phone_number, message);

    // Log notification (optional - for future tracking)
    await pool.execute(
      'INSERT INTO notifications (user_id, type, message, status, sent_at) VALUES (?, ?, ?, ?, ?)',
      [userId, 'whatsapp', message, 'sent', new Date()]
    );

    res.json({ message: 'WhatsApp notification sent successfully' });
  } catch (error) {
    console.error('WhatsApp notification error:', error);
    res.status(500).json({ error: 'Failed to send WhatsApp notification' });
  }
});

export default router;
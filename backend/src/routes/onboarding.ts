import { Router } from 'express';
import { createPool } from '../config/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { validateOnboarding } from '../middleware/validation';
import { OnboardingRequest } from '../types';

const router = Router();
const pool = createPool();

// Save onboarding data
router.post('/', authenticateToken, validateOnboarding, async (req: AuthRequest, res) => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    const { travelDates, groupPreferences }: OnboardingRequest = req.body;
    const userId = req.userId!;

    // Clear existing data
    await connection.execute('DELETE FROM travel_dates WHERE user_id = ?', [userId]);
    await connection.execute('DELETE FROM group_preferences WHERE user_id = ?', [userId]);

    // Insert travel dates
    for (const dateRange of travelDates) {
      await connection.execute(
        'INSERT INTO travel_dates (user_id, start_date, end_date) VALUES (?, ?, ?)',
        [userId, dateRange.startDate, dateRange.endDate]
      );
    }

    // Insert group preferences
    for (const preference of groupPreferences) {
      await connection.execute(
        'INSERT INTO group_preferences (user_id, preference_type) VALUES (?, ?)',
        [userId, preference]
      );
    }

    // Mark user as onboarded
    await connection.execute(
      'UPDATE users SET is_onboarded = true, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [userId]
    );

    await connection.commit();
    res.json({ message: 'Onboarding completed successfully' });
  } catch (error) {
    await connection.rollback();
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'Failed to save onboarding data' });
  } finally {
    connection.release();
  }
});

export default router;
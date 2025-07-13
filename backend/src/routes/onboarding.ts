import { Router } from 'express';
// import { findMatches } from '../services/matcher';
// import { sendMatchNotification } from '../services/whatsapp';

const router = Router();

// This endpoint is called by the frontend after the user completes the onboarding form.
// The frontend now handles writing data directly to Supabase for simplicity in the MVP.
// This backend endpoint can be used in the future to orchestrate more complex post-onboarding logic.
router.post('/', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    console.log(`Onboarding completed for user: ${userId}. Triggering backend processes.`);
    
    // --- Future Logic ---
    // 1. Find matches for the user
    // const matches = await findMatches(userId);
    
    // 2. If matches are found, send a notification
    // if (matches && matches.length > 0) {
    //   await sendMatchNotification(userId, matches);
    // }

    res.status(200).json({ message: 'Onboarding processed successfully. Match search initiated.' });
  } catch (error) {
    console.error('Error processing onboarding:', error);
    res.status(500).json({ error: 'Failed to process onboarding.' });
  }
});

export default router;

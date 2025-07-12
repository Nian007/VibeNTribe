import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { MatchingService } from '../services/matchingService';

const router = Router();

// Get matches for current user
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const matches = await MatchingService.findMatches(req.userId!);
    res.json(matches);
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({ error: 'Failed to get matches' });
  }
});

export default router;
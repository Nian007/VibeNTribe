import { Request, Response, NextFunction } from 'express';

export const validateOnboarding = (req: Request, res: Response, next: NextFunction) => {
  const { travelDates, groupPreferences } = req.body;

  // Validate travel dates
  if (!Array.isArray(travelDates) || travelDates.length === 0) {
    return res.status(400).json({ error: 'At least one travel date range is required' });
  }

  for (const dateRange of travelDates) {
    if (!dateRange.startDate || !dateRange.endDate) {
      return res.status(400).json({ error: 'Both start and end dates are required' });
    }

    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    if (startDate > endDate) {
      return res.status(400).json({ error: 'Start date must be before or equal to end date' });
    }

    if (startDate < new Date()) {
      return res.status(400).json({ error: 'Travel dates cannot be in the past' });
    }
  }

  // Validate group preferences
  if (!Array.isArray(groupPreferences) || groupPreferences.length === 0) {
    return res.status(400).json({ error: 'At least one group preference is required' });
  }

  const validPreferences = ['mixed', 'couples', 'girls-only'];
  for (const preference of groupPreferences) {
    if (!validPreferences.includes(preference)) {
      return res.status(400).json({ 
        error: `Invalid group preference. Must be one of: ${validPreferences.join(', ')}` 
      });
    }
  }

  next();
};

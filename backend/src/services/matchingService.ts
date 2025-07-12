import { createPool } from '../config/database';
import { User, TravelDate, GroupPreference } from '../types';

const pool = createPool();

export class MatchingService {
  public static async findMatches(userId: string) {
    try {
      // Get user's travel dates and preferences
      const [userDates] = await pool.execute(
        'SELECT * FROM travel_dates WHERE user_id = ?',
        [userId]
      ) as [TravelDate[], any];

      const [userPreferences] = await pool.execute(
        'SELECT * FROM group_preferences WHERE user_id = ?',
        [userId]
      ) as [GroupPreference[], any];

      if (userDates.length === 0 || userPreferences.length === 0) {
        return [];
      }

      // Find users with overlapping dates and matching preferences
      const matches = [];
      
      for (const userDate of userDates) {
        for (const userPref of userPreferences) {
          // Find other users with overlapping dates and same preferences
          const [potentialMatches] = await pool.execute(`
            SELECT DISTINCT 
              u.id, u.linkedin_id, u.email, u.first_name, u.last_name, u.profile_picture,
              td.start_date, td.end_date,
              gp.preference_type
            FROM users u
            JOIN travel_dates td ON u.id = td.user_id
            JOIN group_preferences gp ON u.id = gp.user_id
            WHERE u.id != ? 
              AND u.is_onboarded = true
              AND gp.preference_type = ?
              AND (
                (td.start_date <= ? AND td.end_date >= ?) OR
                (td.start_date <= ? AND td.end_date >= ?) OR
                (td.start_date >= ? AND td.end_date <= ?)
              )
          `, [
            userId,
            userPref.preference_type,
            userDate.start_date, userDate.start_date,
            userDate.end_date, userDate.end_date,
            userDate.start_date, userDate.end_date
          ]) as [any[], any];

          // Group matches by user
          const userMatches = new Map();
          
          for (const match of potentialMatches) {
            if (!userMatches.has(match.id)) {
              userMatches.set(match.id, {
                user: {
                  id: match.id,
                  linkedinId: match.linkedin_id,
                  email: match.email,
                  firstName: match.first_name,
                  lastName: match.last_name,
                  profilePicture: match.profile_picture,
                  isOnboarded: true,
                },
                commonDates: [],
                sharedPreferences: [],
              });
            }

            const userMatch = userMatches.get(match.id);
            
            // Add common date if not already added
            const dateKey = `${match.start_date}-${match.end_date}`;
            if (!userMatch.commonDates.some((d: any) => `${d.startDate}-${d.endDate}` === dateKey)) {
              userMatch.commonDates.push({
                startDate: new Date(match.start_date),
                endDate: new Date(match.end_date),
              });
            }

            // Add shared preference if not already added
            if (!userMatch.sharedPreferences.includes(match.preference_type)) {
              userMatch.sharedPreferences.push(match.preference_type);
            }
          }

          matches.push(...Array.from(userMatches.values()));
        }
      }

      // Remove duplicates and return unique matches
      const uniqueMatches = new Map();
      for (const match of matches) {
        if (!uniqueMatches.has(match.user.id)) {
          uniqueMatches.set(match.user.id, match);
        } else {
          // Merge dates and preferences
          const existing = uniqueMatches.get(match.user.id);
          existing.commonDates = [...existing.commonDates, ...match.commonDates];
          existing.sharedPreferences = [...new Set([...existing.sharedPreferences, ...match.sharedPreferences])];
        }
      }

      return Array.from(uniqueMatches.values());
    } catch (error) {
      console.error('Matching service error:', error);
      throw new Error('Failed to find matches');
    }
  }
}
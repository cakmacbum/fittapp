import { achievements } from '../constants/achievements';

export function checkAchievements(userStats: any, newlyEarnedIds: string[] = []) {
  // Simple evaluator: returns list of achievements that conditions evaluate to true,
  // excluding those the user already has.
  const newAchievements = achievements.filter(achievement => {
      if (newlyEarnedIds.includes(achievement.id)) return false;

      // Unsafe eval alternative: we mock simple logic for safety
      const { condition } = achievement;
      let isEarned = false;

      try {
        if (condition.includes('total_workouts') && userStats.total_workouts) {
          const val = parseInt(condition.split('>=')[1]);
          if (userStats.total_workouts >= val) isEarned = true;
        } else if (condition.includes('longest_streak') && userStats.longest_streak) {
          const val = parseInt(condition.split('>=')[1]);
          if (userStats.longest_streak >= val) isEarned = true;
        } else if (condition.includes('total_prs') && userStats.total_prs) {
          const val = parseInt(condition.split('>=')[1]);
          if (userStats.total_prs >= val) isEarned = true;
        }
        // Normally we'd build a safer, dynamic evaluator logic here
      } catch (e) {
         console.warn('Condition parsing failed for', achievement.id);
      }

      return isEarned;
  });

  return newAchievements;
}

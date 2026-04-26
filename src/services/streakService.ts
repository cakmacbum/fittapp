export const streakService = {
  updateStreak: async (uid: string, sessionDate: string) => {
    // Stub: update logic in db
    console.log('Streak updated for', uid, 'at', sessionDate);
  },

  getStreakStatus: async (uid: string) => {
    // Stub: fetch from db
    const hour = new Date().getHours();
    return {
      currentStreak: 5,
      longestStreak: 12,
      lastWorkoutDate: new Date(Date.now() - 86400000).toISOString(),
      isAtRisk: hour >= 20 // At risk after 8 PM if not worked out today
    };
  },

  useFreeze: async (uid: string) => {
    console.log('Streak freeze used for', uid);
    return true; // Success
  }
};

export function generateWeeklyReport(uid: string) {
  // Stub: Calculate stats for the user
  const today = new Date();
  
  return {
    thisWeekVolume: 12500,
    lastWeekVolume: 10000,
    volumeDiffPercent: 25,
    bestDay: 'Çarşamba',
    streak: 4,
    bestImprovementExercise: 'Squat',
    improvementAmount: '10kg', // e.g. from 90kg to 100kg
    isSunday: today.getDay() === 0 // 0 is Sunday
  };
}

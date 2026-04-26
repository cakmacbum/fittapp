export function calculateSessionXP(session: { setsCount: number; volume: number; isPR: boolean; streak: number }) {
  let total = 0;
  const breakdown = [];
  
  const setsXP = session.setsCount * 10;
  total += setsXP;
  breakdown.push({ name: 'Tamamlanan Setler', xp: setsXP });
  
  const volumeXP = Math.floor(session.volume / 1000) * 50;
  if (volumeXP > 0) {
     total += volumeXP;
     breakdown.push({ name: 'Hacim Bonusu', xp: volumeXP });
  }
  
  if (session.isPR) {
     total += 100;
     breakdown.push({ name: 'Yeni PR 🎉', xp: 100 });
  }
  
  if (session.streak > 0) {
     const streakXP = session.streak * 5;
     total += streakXP;
     breakdown.push({ name: 'Seri Bonusu', xp: streakXP });
  }
  
  return { totalXP: total, breakdown };
}

export function getLevelFromXP(totalXP: number) {
  let limit = 200;
  let currentLevel = 1;
  let prevLimit = 0;
  
  while (totalXP >= limit) {
      currentLevel++;
      prevLimit = limit;
      limit = Math.floor(limit * 1.3);
  }
  
  const xpInCurrentLevel = totalXP - prevLimit;
  const xpNeededForNext = limit - prevLimit;
  const progressPercent = Math.min(100, Math.max(0, (xpInCurrentLevel / xpNeededForNext) * 100));

  return { level: currentLevel, currentXP: totalXP, nextLevelXP: limit, progressPercent };
}

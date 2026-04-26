export interface SessionHistory {
  date: string;
  weight: number;
  reps: number;
}

export function analyzeExercise(exerciseHistory: SessionHistory[]) {
  if (!exerciseHistory || exerciseHistory.length < 3) {
    return { type: "continue", amount: 0, recommendation: "Mevcut ağırlıkta devam et, veri toplanıyor" };
  }

  const last = exerciseHistory[exerciseHistory.length - 1];
  const prev1 = exerciseHistory[exerciseHistory.length - 2];
  const prev2 = exerciseHistory[exerciseHistory.length - 3];

  // rule 1
  if (last.weight === prev1.weight && prev1.weight === prev2.weight && 
      last.reps >= 10 && prev1.reps >= 10 && prev2.reps >= 10) { 
    return { type: "increase", amount: 2.5, recommendation: "Ağırlığı 2.5 kg artırmayı dene" };
  }

  // rule 2
  if (last.reps < prev1.reps && prev1.reps < prev2.reps) {
    return { type: "deload", amount: 0, recommendation: "Bu haftaki ağırlığı %10 düşür, sonra tekrar yükselt" };
  }

  // rule 3
  if (last.reps > 12) {
    return { type: "increase_reps", amount: 0, recommendation: "Tekrarı 2 artır veya ağırlığı yükselt" };
  }

  return { type: "continue", amount: 0, recommendation: "Mevcut ağırlıkta devam et, programa sadık kal" };
}

export function analyzeWeeklyVolume(sessions: {week: string, volume: number}[]) {
  if (!sessions || sessions.length < 4) return { type: "continue", recommendation: "Daha fazla veri gerekiyor." };

  const [w1, w2, w3, w4] = sessions.slice(-4);
  
  if (w4.volume < w3.volume && w3.volume < w2.volume) {
    return { type: "low_volume", recommendation: "Haftalık antrenman sayını artır, hacim düşüyor." };
  }
  
  if (w4.volume > w3.volume && w3.volume > w2.volume) {
    return { type: "good_progress", recommendation: "Harika gidiyor, bu tempoyu koru!" };
  }

  return { type: "continue", recommendation: "İstikrarlı gidiyorsun, devam." };
}

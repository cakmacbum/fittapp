import { aiService } from './aiService';

export const generateAIReport = async (uid: string) => {
  try {
    const mockWeekData = {
      totalVolume: 12500,
      workoutsCompleted: 4,
      prCount: 1,
      missedWorkouts: 0,
      mostImproved: 'Squat',
      weakestPerformance: 'Göğüs (Düşük hacim)'
    };

    const systemPrompt = `Sen bir fitness koçusun. Aşağıdaki haftalık antrenman verisini analiz et.
2 kısa paragraf yaz: güçlü yanlar, geliştirilecek alanlar. Türkçe, samimi ton.
Veri: ${JSON.stringify(mockWeekData)}`;

    // Using chat endpoint with a simple user prompt to trigger the system prompt payload
    const reportText = await aiService.callNemotron([{ role: 'user', content: 'Haftalık raporumu hazırla.' }], systemPrompt);
    
    // In a real app we would save this to Firestore
    console.log('[Weekly AI Report generated for', uid, ']:', reportText);

    return reportText;
  } catch (error) {
    console.error('Error generating AI report:', error);
    throw error;
  }
};

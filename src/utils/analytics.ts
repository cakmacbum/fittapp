// Web shim for Firebase Analytics
// import { getAnalytics, logEvent } from 'firebase/analytics'; 
// import { app } from './firebaseConfig';

// const analytics = getAnalytics(app);

export const analyticsService = {
  logEvent: (eventName: string, params?: Record<string, any>) => {
    try {
      // logEvent(analytics, eventName, params);
      console.log(`[Analytics] ${eventName}`, params || {});
    } catch (e) {
      console.error('Analytics log error', e);
    }
  },

  // Event Helpers
  workoutStarted: (programId: string, day: string) => {
    analyticsService.logEvent('workout_started', { programId, day });
  },
  
  workoutCompleted: (duration: number, volume: number, prCount: number) => {
    analyticsService.logEvent('workout_completed', { duration, volume, prCount });
  },

  programSelected: (programName: string) => {
    analyticsService.logEvent('program_selected', { programName });
  },

  aiFeatureUsed: (feature: 'program_gen' | 'coach_chat' | 'body_analysis' | 'weekly_report') => {
    analyticsService.logEvent('ai_feature_used', { feature });
  },

  proPurchaseCompleted: (packageId: 'monthly' | 'annual', price: number) => {
    analyticsService.logEvent('pro_purchase', { packageId, value: price, currency: 'TRY' });
  }

  /*
   * Hangi ekranlarda hangi event'ler tetiklenmeli?
   * 
   * - WorkoutStartScreen -> "Antrenmana Başla" butonu -> workoutStarted
   * - WorkoutActiveScreen -> "Antrenmanı Bitir" butonu -> workoutCompleted
   * - AIProgramGeneratorScreen -> "Program Oluştur" butonu -> aiFeatureUsed('program_gen')
   * - AICoachScreen -> Mesaj gönderiminde -> aiFeatureUsed('coach_chat')
   * - BodyAnalysisScreen -> "Analizi Başlat" butonu -> aiFeatureUsed('body_analysis')
   * - Dashboard / Rapor Kartı Görüntüleme -> aiFeatureUsed('weekly_report')
   * - ProPaywallScreen -> Başarılı ödeme sonrası -> proPurchaseCompleted
   * 
   * Crash-Free Users Takibi:
   * Firebase Crashlytics veya Sentry Dashboard üzerinden "Crash-Free Sessions" metriği otomatik izlenir.
   */
};

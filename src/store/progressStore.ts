import { create } from 'zustand';
import { collection, query, where, getDocs, addDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebaseConfig';

interface ProgressState {
  exerciseHistory: any[];
  bodyMetrics: any[];
  weeklyStats: any[];
  fetchExerciseHistory: (uid: string, exerciseId: string) => Promise<void>;
  fetchWeeklyStats: (uid: string) => Promise<void>;
  addBodyMetric: (uid: string, data: any) => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set) => ({
  exerciseHistory: [],
  bodyMetrics: [],
  weeklyStats: [],
  
  fetchExerciseHistory: async (uid, exerciseId) => {
    try {
      // Stub: in a real scenario we'd query workoutSessions matching uid and extract exercise data
      // For now, let's mock some data since we don't have deeply nested array querying out of the box in Firestore easily without custom structures.
      const mockHistory = [
        { date: '2023-09-01', maxWeight: 60, volume: 1800 },
        { date: '2023-09-08', maxWeight: 65, volume: 2000 },
        { date: '2023-09-15', maxWeight: 65, volume: 2200 },
        { date: '2023-09-22', maxWeight: 70, volume: 2100 },
      ];
      set({ exerciseHistory: mockHistory });
    } catch (error) {
      console.error('Error fetching exercise history:', error);
    }
  },
  
  fetchWeeklyStats: async (uid) => {
    try {
      // Stub: group totalVolume by week from workoutSessions
      const mockWeekly = [
        { week: 'Hafta 1', volume: 8500 },
        { week: 'Hafta 2', volume: 9200 },
        { week: 'Hafta 3', volume: 8800 },
        { week: 'Hafta 4', volume: 10500 },
      ];
      set({ weeklyStats: mockWeekly });
    } catch (error) {
      console.error('Error fetching weekly stats:', error);
    }
  },
  
  addBodyMetric: async (uid, data) => {
    try {
      await addDoc(collection(db, 'bodyMetrics'), {
        uid,
        ...data,
        date: new Date().toISOString()
      });
      // Mock update local state
      set((state) => ({
        bodyMetrics: [...state.bodyMetrics, { uid, ...data, date: new Date().toISOString() }]
      }));
    } catch (error) {
      console.error('Error adding body metric:', error);
    }
  }
}));

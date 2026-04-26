import { collection, addDoc, updateDoc, doc, getDocs, query, where, orderBy, limit as firestoreLimit } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Assume this will be created later

export const workoutService = {
  startSession: async (uid: string, programId: string, dayName: string) => {
    try {
      const sessionRef = await addDoc(collection(db, 'workoutSessions'), {
        uid,
        programId,
        dayName,
        date: new Date().toISOString(),
        durationSeconds: 0,
        totalVolume: 0,
        notes: '',
        exercises: [],
      });
      return sessionRef.id;
    } catch (error) {
      console.error('Error starting session:', error);
      throw error;
    }
  },

  updateSession: async (sessionId: string, data: any) => {
    try {
      const sessionRef = doc(db, 'workoutSessions', sessionId);
      await updateDoc(sessionRef, data);
    } catch (error) {
      console.error('Error updating session:', error);
      throw error;
    }
  },

  completeSession: async (sessionId: string, exercises: any[], durationSeconds: number) => {
    let totalVolume = 0;
    exercises.forEach((ex) => {
      ex.sets.forEach((set: any) => {
        if (set.completed) {
          totalVolume += (set.weight * set.reps);
        }
      });
    });

    try {
      const sessionRef = doc(db, 'workoutSessions', sessionId);
      await updateDoc(sessionRef, {
        exercises,
        durationSeconds,
        totalVolume,
        status: 'completed',
      });
      return totalVolume;
    } catch (error) {
      console.error('Error completing session:', error);
      throw error;
    }
  },

  getRecentSessions: async (uid: string, limitCount: number = 5) => {
    try {
      const q = query(
        collection(db, 'workoutSessions'),
        where('uid', '==', uid),
        orderBy('date', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error getting recent sessions:', error);
      throw error;
    }
  }
};

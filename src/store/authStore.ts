import { create } from 'zustand';
import { purchaseService } from '../services/purchaseService';

interface AuthState {
  uid: string | null;
  isPro: boolean;
  checkProStatus: () => Promise<void>;
  setProStatus: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  uid: 'mock-user-123',
  isPro: false,
  checkProStatus: async () => {
    const isPro = await purchaseService.checkProStatus();
    set({ isPro });
  },
  setProStatus: (status: boolean) => set({ isPro: status })
}));

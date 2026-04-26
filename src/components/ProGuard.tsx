import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Lock, Crown } from 'lucide-react';
import ProPaywallScreen from '../screens/ProPaywallScreen';

interface ProGuardProps {
  children: React.ReactNode;
}

export default function ProGuard({ children }: ProGuardProps) {
  const { isPro } = useAuthStore();
  const [showPaywall, setShowPaywall] = useState(false);

  if (isPro) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full h-full min-h-[300px]">
      {/* Blurred Content */}
      <div className="h-full w-full pointer-events-none opacity-40 blur-[4px] grayscale transition-all duration-500">
        {children}
      </div>
      
      {/* Overlay Modal */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-50/60 font-sans">
        <div className="bg-white p-6 md:p-8 flex flex-col items-center text-center rounded-3xl border border-indigo-100 shadow-2xl shadow-indigo-200/50 max-w-sm w-full">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-4">
            <Lock size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">Bu Özellik Pro'ya Özel</h2>
          <p className="text-slate-500 font-medium text-sm mb-6 max-w-xs">
            Yapay zeka analizlerini, kişiselleştirilmiş programları ve detaylı grafikleri açmak için Pro'ya geçin.
          </p>
          <button 
            onClick={() => setShowPaywall(true)}
            className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <Crown size={18} className="text-amber-400" /> Pro'ya Geç
          </button>
        </div>
      </div>

      {showPaywall && (
        <ProPaywallScreen onClose={() => setShowPaywall(false)} />
      )}
    </div>
  );
}

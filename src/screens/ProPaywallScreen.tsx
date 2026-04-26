import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { purchaseService } from '../services/purchaseService';
import { useAuthStore } from '../store/authStore';

export default function ProPaywallScreen({ onClose }: { onClose?: () => void }) {
  const [offerings, setOfferings] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  const [isLoading, setIsLoading] = useState(false);
  const { setProStatus } = useAuthStore();

  useEffect(() => {
    purchaseService.getOfferings().then((offers) => {
      setOfferings(offers.current);
    });
  }, []);

  const handlePurchase = async () => {
    setIsLoading(true);
    const success = await purchaseService.purchasePackage(selectedPlan);
    setIsLoading(false);
    if (success) {
      setProStatus(true);
      if (onClose) onClose();
      alert('Tebrikler! FitApp Pro özelliklerine sahipsiniz.');
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    await purchaseService.restorePurchases();
    setIsLoading(false);
    alert('Geçmiş satın alma bulunamadı.');
  };

  const features = [
    'AI Vücut Analizi (Fotoğrafla Kas Grubu Tespiti)',
    'AI Koç ile 7/24 Sohbet',
    'Kişiye Özel Dinamik Program Üretimi',
    'Haftalık AI Gelişim Raporu',
    'Streak Freeze Hakkı (Aylık 3 Kez)',
    'Gelişmiş Performans ve Hacim Analitiği'
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-900 text-white selection:bg-purple-500/30">
      {onClose && (
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full text-white/70 hover:bg-white/20 transition z-10">
          <X size={20} />
        </button>
      )}

      {/* Hero Section */}
      <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/50">
          <span className="text-3xl font-black italic tracking-widest text-white shadow-sm">FA</span>
        </div>
        
        <h1 className="text-4xl font-black mb-2 text-center">FitApp <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">PRO</span></h1>
        <p className="text-slate-400 text-center font-medium mb-10 max-w-xs">Sınırlarını aş, potansiyelini yapay zeka ile keşfet.</p>

        {/* Feature List */}
        <div className="w-full max-w-sm space-y-4 mb-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle2 size={20} className="text-purple-400 shrink-0 mt-0.5" />
              <p className="font-medium text-slate-200 leading-snug">{feature}</p>
            </div>
          ))}
        </div>

        {/* Pricing Cards */}
        {offerings && (
          <div className="w-full max-w-sm flex gap-4 mb-8">
            <button 
              onClick={() => setSelectedPlan('monthly')}
              className={`flex-1 p-4 rounded-2xl border-2 text-left relative transition-all ${
                selectedPlan === 'monthly' ? 'bg-indigo-900/40 border-indigo-500' : 'bg-slate-800 border-slate-700 opacity-70'
              }`}
            >
              <h3 className="font-bold text-slate-300">Aylık</h3>
              <p className="font-black text-xl text-white mt-1">{offerings.monthly.priceString.split('/')[0]}</p>
              <p className="text-xs text-slate-400 mt-1">/ay</p>
            </button>
            <button 
              onClick={() => setSelectedPlan('annual')}
              className={`flex-1 p-4 rounded-2xl border-2 text-left relative transition-all ${
                selectedPlan === 'annual' ? 'bg-indigo-900/40 border-indigo-500' : 'bg-slate-800 border-slate-700 opacity-70'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-[10px] font-black px-3 py-1 rounded-full whitespace-nowrap shadow-lg">
                %40 İNDİRİM
              </div>
              <h3 className="font-bold text-slate-300">Yıllık</h3>
              <p className="font-black text-xl text-white mt-1">{offerings.annual.priceString.split('/')[0]}</p>
              <p className="text-xs text-indigo-300 mt-1">Sadece ₺58.25/ay</p>
            </button>
          </div>
        )}

        <div className="w-full max-w-sm flex flex-col gap-3">
          <button 
            disabled={isLoading}
            onClick={handlePurchase}
            className="w-full py-4 rounded-xl font-black text-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-indigo-600/30 hover:opacity-90 transition disabled:opacity-50"
          >
            {isLoading ? 'İşleniyor...' : '7 Gün Ücretsiz Dene'}
          </button>
          <p className="text-center text-xs text-slate-500">İstediğiniz zaman iptal edebilirsiniz.</p>
        </div>

        <button onClick={handleRestore} className="text-slate-400 text-sm font-bold mt-8 underline underline-offset-4 hover:text-slate-300">
          Satın almaları geri yükle
        </button>
      </div>
    </div>
  );
}

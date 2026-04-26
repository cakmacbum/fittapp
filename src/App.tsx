/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Activity } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import OfflineBanner from './components/OfflineBanner';

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans flex items-center justify-center p-4">
        <OfflineBanner />
        <div className="w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-lg flex flex-col h-[800px] max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-8 flex flex-col items-center justify-center border-b border-slate-100 bg-white">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-100">
            <Activity size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">FitApp</h1>
          <p className="text-slate-500 mt-2 text-center text-sm font-medium">
            React Native + Expo Mühendisi Hazır
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Sistem Durumu
            </h2>
            <ul className="space-y-4 text-sm text-slate-700 font-medium">
              <li className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span>Zustand</span>
                <span className="text-green-600 text-xs font-bold px-3 py-1 bg-green-100 rounded-lg">Kurulu</span>
              </li>
              <li className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span>Klasör Yapısı</span>
                <span className="text-slate-500 text-xs font-bold px-3 py-1 bg-slate-200 rounded-lg">Bekleniyor</span>
              </li>
              <li className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span>Faz 10</span>
                <span className="text-blue-600 text-xs font-bold px-3 py-1 bg-white rounded-lg border border-blue-200 animate-pulse">Yayına Hazır 🚀</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 p-5 bg-amber-50 border border-amber-200/60 rounded-[2rem]">
            <div className="flex items-center gap-2 mb-2 justify-center">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Açıklama</span>
            </div>
            <p className="text-xs text-amber-700/80 font-medium leading-relaxed text-center">
              Sağ taraftaki önizleme penceresi canlıdır. Tüm kodları hem kopyalayabileceğin formatta sana sunacağım, hem de buradaki web prototipini senkronize güncelleyeceğim!
            </p>
          </div>
        </div>
      </div>
      </div>
    </ErrorBoundary>
  );
}

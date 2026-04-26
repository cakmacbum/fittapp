import React from 'react';
import { Trophy, Clock, Dumbbell, Activity, Share2, Home } from 'lucide-react';

export default function WorkoutCompleteScreen() {
  return (
    <div className="p-6 h-full flex flex-col items-center bg-slate-900 text-white justify-center">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
        <Trophy size={40} className="text-white" />
      </div>
      
      <h1 className="text-3xl font-black italic tracking-tight mb-2">HARİKA İŞ!</h1>
      <p className="text-slate-400 font-medium mb-10">Antrenmanı başarıyla tamamladın.</p>

      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
          <Clock size={20} className="text-blue-400 mb-2" />
          <p className="text-sm text-slate-400 font-bold mb-1">Süre</p>
          <p className="text-2xl font-black">45:20</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
          <Dumbbell size={20} className="text-amber-400 mb-2" />
          <p className="text-sm text-slate-400 font-bold mb-1">Hacim</p>
          <p className="text-2xl font-black">3,450 <span className="text-sm text-slate-500">kg</span></p>
        </div>
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
          <Activity size={20} className="text-green-400 mb-2" />
          <p className="text-sm text-slate-400 font-bold mb-1">Setler</p>
          <p className="text-2xl font-black">16</p>
        </div>
        <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
          <Trophy size={20} className="text-purple-400 mb-2" />
          <p className="text-sm text-slate-400 font-bold mb-1">Kazanılan XP</p>
          <p className="text-2xl font-black">+240</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 rounded-2xl w-full mb-10 shadow-lg shadow-orange-500/20 flex items-center justify-between">
        <div>
          <h3 className="font-black text-lg mb-1">YENİ PR! 🚀</h3>
          <p className="font-medium text-orange-100 text-sm">Bench Press: 80kg</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Trophy size={24} className="text-white" />
        </div>
      </div>

      <div className="w-full space-y-3 mt-auto">
        <button onClick={() => alert('Paylaşılıyor...')} className="w-full py-4 rounded-xl font-bold bg-slate-800 text-white flex items-center justify-center gap-2 hover:bg-slate-700 transition">
          <Share2 size={20} />
          Başarını Paylaş
        </button>
        <button className="w-full py-4 rounded-xl font-bold bg-blue-600 text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition">
          <Home size={20} />
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

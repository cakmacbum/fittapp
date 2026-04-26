import React, { useState } from 'react';
import { Settings, LogOut, Medal, Activity, Dumbbell, Calendar, Crown, SwitchCamera, Bell } from 'lucide-react';
import LevelBadge from '../../components/LevelBadge';
import { getLevelFromXP } from '../../utils/xpSystem';
import { achievements } from '../../constants/achievements';

export default function ProfileScreen() {
  const [userXP] = useState(1450); // MOCK
  const { level, currentXP, nextLevelXP, progressPercent } = getLevelFromXP(userXP);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Profile Section */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[40px] shadow-sm flex flex-col items-center relative overflow-hidden">
        {/* Pro Banner */}
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 flex items-center justify-between">
          <span className="text-white text-xs font-bold flex items-center gap-1">
            <Crown size={14} className="text-amber-300" /> Pro Sürümü Keşfet
          </span>
          <span className="text-white bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold">PRO'YA GEÇ</span>
        </div>

        <div className="relative mt-4 mb-4">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
            YS
          </div>
          <div className="absolute -bottom-2 -right-2">
            <LevelBadge level={level} progressPercent={progressPercent} size={48} />
          </div>
        </div>
        
        <h1 className="text-2xl font-black text-slate-800">Yusuf Sağlamcı</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Eylül 2023'ten beri üye</p>

        <div className="w-full mt-6">
          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
            <span>{currentXP} XP</span>
            <span>{nextLevelXP} XP (LVL {level + 1})</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-1000" 
              style={{ width: `${progressPercent}%` }} 
            />
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        {/* Stats Grid */}
        <h3 className="text-lg font-black text-slate-800 mb-3">Genel Durum</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
             <Dumbbell size={20} className="text-blue-500 mb-2" />
             <p className="text-xs text-slate-500 font-bold mb-1">Toplam Antrenman</p>
             <p className="text-2xl font-black text-slate-800">42</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
             <Activity size={20} className="text-amber-500 mb-2" />
             <p className="text-xs text-slate-500 font-bold mb-1">Toplam Hacim</p>
             <p className="text-2xl font-black text-slate-800">124 <span className="text-sm">ton</span></p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
             <Calendar size={20} className="text-orange-500 mb-2" />
             <p className="text-xs text-slate-500 font-bold mb-1">En Uzun Streak</p>
             <p className="text-2xl font-black text-slate-800">14 <span className="text-sm">gün</span></p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200">
             <Medal size={20} className="text-purple-500 mb-2" />
             <p className="text-xs text-slate-500 font-bold mb-1">Toplam PR</p>
             <p className="text-2xl font-black text-slate-800">15</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex justify-between items-end mb-3">
          <h3 className="text-lg font-black text-slate-800">Kazanılan Rozetler</h3>
          <span className="text-sm font-bold text-blue-600">Şuna bak: 5 / 30</span>
        </div>
        <div className="grid grid-cols-5 gap-2 mb-8">
          {achievements.slice(0, 10).map((badge, idx) => (
            <div 
              key={badge.id} 
              className={`aspect-square rounded-xl flex items-center justify-center shadow-sm ${idx < 5 ? 'bg-gradient-to-br from-amber-200 to-amber-400' : 'bg-slate-200 opacity-50'}`}
              title={badge.name}
            >
               <Medal size={24} className={idx < 5 ? 'text-amber-700' : 'text-slate-400'} />
            </div>
          ))}
        </div>

        {/* Settings */}
        <h3 className="text-lg font-black text-slate-800 mb-3">Ayarlar</h3>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
          <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600"><Bell size={16} /></div>
              <span className="font-bold text-slate-700 text-sm">Bildirim & Hatırlatıcılar</span>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600"><SwitchCamera size={16} /></div>
              <span className="font-bold text-slate-700 text-sm">Açık/Koyu Tema</span>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition text-red-600">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center"><LogOut size={16} /></div>
              <span className="font-bold text-sm">Çıkış Yap</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

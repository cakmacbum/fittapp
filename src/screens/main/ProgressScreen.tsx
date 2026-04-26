import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Trophy, TrendingUp, Plus, Activity } from 'lucide-react';
import { useProgressStore } from '../../store/progressStore';
import WorkoutCalendar from '../../components/WorkoutCalendar'; // Using the newly created calendar

export default function ProgressScreen() {
  const [activeTab, setActiveTab] = useState<'charts' | 'prs' | 'body'>('charts');
  const { exerciseHistory, weeklyStats, fetchExerciseHistory, fetchWeeklyStats } = useProgressStore();

  useEffect(() => {
    fetchExerciseHistory('mockUid', 'mockExerciseId');
    fetchWeeklyStats('mockUid');
  }, [fetchExerciseHistory, fetchWeeklyStats]);

  const bodyData = [
    { date: '1 Eyl', weight: 80.5 },
    { date: '8 Eyl', weight: 80.0 },
    { date: '15 Eyl', weight: 79.2 },
    { date: '22 Eyl', weight: 78.8 },
  ];

  return (
    <div className="bg-slate-50 min-h-screen p-6 pb-24">
      <h1 className="text-2xl font-black text-slate-800 mb-6">Gelişim</h1>

      {/* Tabs */}
      <div className="flex bg-slate-200 p-1 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('charts')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'charts' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
        >
          Grafikler
        </button>
        <button 
          onClick={() => setActiveTab('prs')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'prs' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
        >
          PR'lar
        </button>
        <button 
          onClick={() => setActiveTab('body')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'body' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
        >
          Vücut
        </button>
      </div>

      {/* CHARTS TAB */}
      {activeTab === 'charts' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Seçili Egzersiz Gelişimi</h3>
              <select className="bg-slate-100 text-xs font-bold p-2 text-slate-600 rounded-lg outline-none">
                <option>Bench Press</option>
                <option>Squat</option>
                <option>Deadlift</option>
              </select>
            </div>
            
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={exerciseHistory} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{fontSize: 10}} tickFormatter={(val) => val.split('-')[2] + ' Eyl'} stroke="#cbd5e1" />
                  <YAxis tick={{fontSize: 10}} stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="maxWeight" stroke="#2563eb" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Haftalık Hacim (kg)</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="week" tick={{fontSize: 10}} stroke="#cbd5e1" />
                  <YAxis tick={{fontSize: 10}} stroke="#cbd5e1" />
                  <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="volume" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="pt-2">
            <h3 className="font-black text-lg text-slate-800 mb-4">Aktivite Takvimi</h3>
            {/* Some mock dates for the calendar */}
            <WorkoutCalendar activeDates={[new Date(), new Date(Date.now() - 86400000 * 2), new Date(Date.now() - 86400000 * 4)]} />
          </div>
        </div>
      )}

      {/* PRs TAB */}
      {activeTab === 'prs' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-5 rounded-2xl text-white shadow-lg shadow-purple-200 mb-6 flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium mb-1">Bu Ay Kırılan</p>
              <h2 className="text-3xl font-black tracking-tight">4 Yeni PR</h2>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy size={24} className="text-white" />
            </div>
          </div>

          {[
            { name: 'Bench Press', weight: '80kg', date: '21 Eylül 2023', increase: '+5kg' },
            { name: 'Squat', weight: '120kg', date: '18 Eylül 2023', increase: '+10kg' },
            { name: 'Deadlift', weight: '140kg', date: '12 Eylül 2023', increase: '+5kg' },
          ].map((pr, idx) => (
             <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
               <div>
                  <h4 className="font-bold text-slate-800">{pr.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">{pr.date}</p>
               </div>
               <div className="text-right">
                  <p className="font-black text-lg text-slate-800">{pr.weight}</p>
                  <p className="text-xs font-bold text-green-500 flex items-center gap-1 justify-end">
                    <TrendingUp size={12} /> {pr.increase}
                  </p>
               </div>
             </div>
          ))}
        </div>
      )}

      {/* BODY TAB */}
      {activeTab === 'body' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800">Kilo Takibi (kg)</h3>
              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-bold">
                Hedefe -3.8 kg
              </div>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bodyData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{fontSize: 10}} stroke="#cbd5e1" />
                  <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} tick={{fontSize: 10}} stroke="#cbd5e1" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={3} dot={{ strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <button className="w-full font-bold bg-blue-50 text-blue-600 border border-blue-200 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-100 transition">
            <Plus size={18} />
            Yeni Ölçüm Ekle
          </button>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import ProGuard from '../../components/ProGuard';
import { Sparkles, Loader2, Calendar } from 'lucide-react';

export default function AIProgramGeneratorScreen() {
  const [goals, setGoals] = useState('Haftada 4 gün, sırtımı geliştirmek istiyorum');
  const [equipment, setEquipment] = useState('Tam donanımlı spor salonu');
  const [priority, setPriority] = useState('Sırt ve Omuz');
  
  const [loading, setLoading] = useState(false);
  const [program, setProgram] = useState<any>(null);
  const [error, setError] = useState('');

  const generate = async () => {
    setLoading(true);
    setError('');
    setProgram(null);
    try {
      const mockContext = { name: 'Yusuf', level: 'Orta Seviye' };
      const generated = await aiService.generateProgram(mockContext, goals, equipment, priority);
      setProgram(generated);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProGuard>
      <div className="p-6 bg-slate-50 min-h-screen pb-24">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">AI Program Üretici</h1>
            <p className="text-sm text-slate-500 font-medium">Kişiselleştirilmiş antrenman planı</p>
          </div>
        </div>

        {!program ? (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Ne İstiyorsun?</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:border-purple-400"
                rows={3}
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
              />
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Ekipman</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:border-purple-400"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
              >
                <option value="Tam donanımlı spor salonu">Tam donanımlı spor salonu</option>
                <option value="Sadece dambıl ve bar">Sadece Dambıl ve Bar</option>
                <option value="Sadece vücut ağırlığı (evde)">Vücut Ağırlığı (Evde)</option>
              </select>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Öncelikli Kas Grubu</label>
              <input 
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-700 outline-none focus:border-purple-400"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

            <button 
              onClick={generate}
              disabled={loading}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition disabled:opacity-50"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {loading ? 'Yapay Zeka Üretiyor...' : 'Program Oluştur'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-sm">
              <h2 className="text-xl font-black text-slate-800">{program.name}</h2>
              <p className="text-slate-500 text-sm mt-1">{program.daysPerWeek} Gün / Hafta</p>
            </div>

            {program.schedule.map((day: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center justify-between">
                  <span className="font-bold text-slate-700">{day.day}</span>
                  <Calendar size={16} className="text-slate-400" />
                </div>
                <div className="p-4 space-y-3">
                  {day.exercises.map((ex: any, eIdx: number) => (
                    <div key={eIdx} className="flex justify-between items-center border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                      <span className="font-semibold text-slate-800 text-sm">{ex.name}</span>
                      <div className="text-right">
                        <p className="text-xs font-bold text-blue-600">{ex.sets}x{ex.reps}</p>
                        <p className="text-[10px] text-slate-400">Dinlenme: {ex.rest}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button 
              onClick={() => setProgram(null)}
              className="w-full bg-slate-100 text-slate-600 font-bold py-4 rounded-xl hover:bg-slate-200 transition mt-4"
            >
              Yeni Program İste
            </button>
          </div>
        )}
      </div>
    </ProGuard>
  );
}

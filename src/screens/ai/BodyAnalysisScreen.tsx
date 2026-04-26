import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import ProGuard from '../../components/ProGuard';
import { Activity, Loader2, Target } from 'lucide-react';

export default function BodyAnalysisScreen() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const [sliders, setSliders] = useState({
    Gogus: 3,
    Sirt: 3,
    Omuz: 3,
    Biceps: 3,
    Triceps: 3,
    Karin: 3,
    OnBacak: 3,
    ArkaBacak: 3,
    Kalca: 3,
  });

  const analyze = async () => {
    setLoading(true);
    setError('');
    try {
      const mockWorkoutDist = { Gogus: "20%", Sirt: "10%", Bacak: "5%", Kol: "65%" }; // Mock data
      const analysis = await aiService.analyzeBody(sliders, mockWorkoutDist);
      setResult(analysis);
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
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-800">Vücut Analizi</h1>
            <p className="text-sm text-slate-500 font-medium">Güç ve zayıflık tespiti</p>
          </div>
        </div>

        {!result ? (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm text-slate-600 mb-6">
                Lütfen her kas grubu için kendi gücünüzü veya gelişiminizi 1 (Çok Zayıf) ile 5 (Çok Güçlü) arasında değerlendirin.
              </p>

              <div className="space-y-4 mb-6">
                {Object.keys(sliders).map((muscle) => (
                  <div key={muscle}>
                    <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{muscle}</span>
                      <span className="text-emerald-600">{sliders[muscle as keyof typeof sliders]} / 5</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" max="5" 
                      value={sliders[muscle as keyof typeof sliders]} 
                      onChange={(e) => setSliders({ ...sliders, [muscle]: parseInt(e.target.value) })}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                ))}
              </div>

              {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg mb-4">{error}</p>}

              <button 
                onClick={analyze}
                disabled={loading}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition disabled:opacity-50"
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Activity size={20} />}
                {loading ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
              <h3 className="font-bold text-emerald-800 mb-2">Genel Değerlendirme</h3>
              <p className="text-sm text-emerald-700 leading-relaxed">{result.overallNote}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Target size={18} className="text-red-500" /> Zayıf Noktalar & Dengesizlikler
              </h3>
              <ul className="space-y-2">
                {[...(result.weakPoints || []), ...(result.imbalances || [])].map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Activity size={18} className="text-blue-500" /> Önümüzdeki 8 Hafta Öncelikleri
              </h3>
              <ul className="space-y-2">
                {(result.priority8weeks || []).map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-xs font-bold shrink-0">{idx + 1}</span> 
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition mt-4 flex justify-center items-center gap-2">
               Bu Analize Göre Program Oluştur
            </button>
          </div>
        )}
      </div>
    </ProGuard>
  );
}

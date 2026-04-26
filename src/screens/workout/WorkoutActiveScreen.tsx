import React, { useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';

export default function WorkoutActiveScreen() {
  const [sets, setSets] = useState([
    { id: 1, weight: '', reps: '', completed: false }
  ]);

  const addSet = () => {
    setSets([...sets, { id: Date.now(), weight: '', reps: '', completed: false }]);
  };

  const toggleComplete = (id: number) => {
    setSets(sets.map(set => set.id === id ? { ...set, completed: !set.completed } : set));
  };

  return (
    <div className="p-6 pb-24 h-full bg-slate-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold font-sans">00:00:00</h1>
        <div className="text-sm font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
          Hacim: 0 kg
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 mb-4 shadow-sm">
        <h2 className="font-bold text-lg text-slate-900 mb-1">Bench Press</h2>
        <p className="text-xs text-slate-500 mb-4">Göğüs</p>
        
        <div className="flex text-xs font-bold text-slate-400 mb-2 px-2 uppercase tracking-wider">
          <div className="w-10">Set</div>
          <div className="flex-1 text-center">kg</div>
          <div className="flex-1 text-center">Tekrar</div>
          <div className="w-10 text-center"><Check size={14} className="mx-auto" /></div>
        </div>

        <div className="space-y-2">
          {sets.map((set, index) => (
            <div key={set.id} className={`flex items-center gap-2 p-2 rounded-xl border ${set.completed ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'}`}>
              <div className="w-8 text-center text-sm font-bold text-slate-400">{index + 1}</div>
              <input type="number" placeholder="20" className="flex-1 w-full bg-white border border-slate-200 rounded-lg p-2 text-center font-bold text-slate-800 disabled:bg-transparent" disabled={set.completed} />
              <input type="number" placeholder="10" className="flex-1 w-full bg-white border border-slate-200 rounded-lg p-2 text-center font-bold text-slate-800 disabled:bg-transparent" disabled={set.completed} />
              <button onClick={() => toggleComplete(set.id)} className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${set.completed ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                <Check size={18} />
              </button>
            </div>
          ))}
        </div>

        <button onClick={addSet} className="w-full mt-4 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-bold flex items-center justify-center gap-2 hover:bg-slate-50">
          <Plus size={18} /> Set Ekle
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-200">
        <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200">
          Antrenmanı Bitir
        </button>
      </div>
    </div>
  );
}

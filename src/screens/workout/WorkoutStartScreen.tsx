import React from 'react';
import { Play } from 'lucide-react';

export default function WorkoutStartScreen() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Antrenmanı Başlat</h1>
      <p className="text-gray-500 mb-8">Bugünün programı, egzersizleri ve sayaç burada yer alacak.</p>
      
      <div className="space-y-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <h3 className="font-bold">Bench Press</h3>
          <p className="text-sm text-gray-500">Göğüs - 4 Set x 10 Tekrar</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <h3 className="font-bold">Incline Dumbbell Press</h3>
          <p className="text-sm text-gray-500">Göğüs - 3 Set x 12 Tekrar</p>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition">
        <Play size={24} />
        Antrenmana Başla
      </button>
    </div>
  );
}

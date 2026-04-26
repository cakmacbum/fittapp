import React from 'react';
import { TrendingUp, TrendingDown, Info, ArrowRight } from 'lucide-react';

export interface RecommendationCardProps {
  exerciseName: string;
  type: string;
  recommendation: string;
  onApply: () => void;
  onDismiss: () => void;
}

export default function RecommendationCard({ exerciseName, type, recommendation, onApply, onDismiss }: RecommendationCardProps) {
  let colorClass = 'bg-blue-50 border-blue-200 text-blue-800';
  let Icon = Info;
  
  if (type === 'increase' || type === 'increase_reps' || type === 'good_progress') {
    colorClass = 'bg-green-50 border-green-200 text-green-800';
    Icon = TrendingUp;
  } else if (type === 'deload' || type === 'low_volume') {
    colorClass = 'bg-amber-50 border-amber-200 text-amber-800';
    Icon = TrendingDown;
  }

  return (
    <div className={`p-4 rounded-xl border ${colorClass} mb-4 relative overflow-hidden`}>
      <div className="flex gap-3 mb-3 relative z-10">
        <div className={`mt-1`}>
          <Icon size={20} />
        </div>
        <div>
          <h4 className="font-bold text-sm mb-1">{exerciseName}</h4>
          <p className="text-xs opacity-90 leading-relaxed">{recommendation}</p>
        </div>
      </div>
      
      <div className="flex gap-2 relative z-10">
        <button onClick={onDismiss} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/50 hover:bg-white/80 transition-colors">
          Tamam
        </button>
        <button onClick={onApply} className="flex-1 px-3 py-1.5 text-xs font-bold rounded-lg bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-1">
          Uygula <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

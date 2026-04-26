import React from 'react';
import { Trophy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AchievementModalProps {
  isVisible: boolean;
  achievement: { name: string; description: string; xpReward: number } | null;
  onClose: () => void;
}

export default function AchievementModal({ isVisible, achievement, onClose }: AchievementModalProps) {
  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl p-6 w-full max-w-sm relative"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full text-slate-500 hover:text-slate-800"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-orange-500/30">
                <Trophy size={48} className="text-white" />
              </div>
              
              <h2 className="text-xs font-black tracking-widest text-orange-500 uppercase mb-2">YENİ ROZET KAZANDIN!</h2>
              <h3 className="text-2xl font-black text-slate-900 mb-2">{achievement.name}</h3>
              <p className="text-slate-500 font-medium mb-6">{achievement.description}</p>
              
              <div className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl w-full flex items-center justify-center gap-2">
                 <span className="text-slate-500 font-bold">Ödül:</span>
                 <span className="text-xl font-black text-blue-600">+{achievement.xpReward} XP</span>
              </div>
            </div>
            
            <button onClick={onClose} className="w-full mt-6 bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition">
              Harika!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

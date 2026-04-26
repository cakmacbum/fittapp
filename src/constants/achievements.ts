export const achievements = [
  // Başlangıç (1-5)
  { id: 'first_workout', name: 'Zafere İlk Adım', description: 'İlk antrenmanını tamamla.', icon: 'star', xpReward: 50, condition: 'total_workouts >= 1' },
  { id: 'first_pr', name: 'Sınırları Zorlayan', description: 'İlk PR\'ını kır.', icon: 'trophy', xpReward: 100, condition: 'total_prs >= 1' },
  { id: 'streak_3', name: 'Ritmi Yakala', description: '3 gün üst üste antrenman yap.', icon: 'flame', xpReward: 150, condition: 'longest_streak >= 3' },
  { id: 'first_plan', name: 'Planlı Ciddi', description: 'Kendine bir antrenman programı seç.', icon: 'clipboard', xpReward: 50, condition: 'has_active_program' },
  { id: 'first_share', name: 'Sosyalleş', description: 'Antrenmanını arkadaşlarınla paylaş.', icon: 'share', xpReward: 50, condition: 'shares_count >= 1' },

  // Devamlılık (6-15)
  { id: 'streak_7', name: 'Haftalık Savaşçı', description: '7 gün üst üste antrenman yap.', icon: 'flame', xpReward: 300, condition: 'longest_streak >= 7' },
  { id: 'streak_14', name: 'Alev Alev', description: '14 gün üst üste antrenman yap.', icon: 'flame', xpReward: 500, condition: 'longest_streak >= 14' },
  { id: 'streak_30', name: 'Durudurulamaz', description: '30 gün üst üste antrenman yap.', icon: 'flame', xpReward: 1000, condition: 'longest_streak >= 30' },
  { id: 'streak_100', name: 'Makine', description: '100 gün üst üste antrenman yap.', icon: 'flame_high', xpReward: 5000, condition: 'longest_streak >= 100' },
  { id: 'workout_10', name: 'ısınma Turu Bitti', description: '10 antrenman tamamla.', icon: 'dumbbell', xpReward: 200, condition: 'total_workouts >= 10' },
  { id: 'workout_50', name: 'Düzenli Ziyaretçi', description: '50 antrenman tamamla.', icon: 'dumbbell', xpReward: 1000, condition: 'total_workouts >= 50' },
  { id: 'workout_100', name: 'Salonun Yerlisi', description: '100 antrenman tamamla.', icon: 'dumbbell_gold', xpReward: 2500, condition: 'total_workouts >= 100' },
  { id: 'workout_365', name: 'Bir Yaşam Tarzı', description: '365 antrenman tamamla.', icon: 'crown', xpReward: 10000, condition: 'total_workouts >= 365' },
  { id: 'early_bird', name: 'Erken Kalkan', description: 'Sabah 06:00\'dan önce antrenman tamamla.', icon: 'sun', xpReward: 150, condition: 'early_workouts >= 1' },
  { id: 'night_owl', name: 'Gece Kuşu', description: 'Gece 23:00\'ten sonra antrenman tamamla.', icon: 'moon', xpReward: 150, condition: 'night_workouts >= 1' },

  // Güç (16-21)
  { id: 'bench_1', name: 'Bench Çaylak', description: '60 kg Bench Press yap.', icon: 'chest', xpReward: 200, condition: 'max_bench >= 60' },
  { id: 'bench_2', name: 'Göğüs Ustası', description: '100 kg Bench Press yap.', icon: 'chest', xpReward: 800, condition: 'max_bench >= 100' },
  { id: 'squat_1', name: 'Bacakları İhmal Etme', description: '100 kg Squat yap.', icon: 'legs', xpReward: 300, condition: 'max_squat >= 100' },
  { id: 'squat_2', name: 'Demir Bacak', description: '140 kg Squat yap.', icon: 'legs', xpReward: 1000, condition: 'max_squat >= 140' },
  { id: 'deadlift_1', name: 'Yeri Saran', description: '140 kg Deadlift yap.', icon: 'back', xpReward: 500, condition: 'max_deadlift >= 140' },
  { id: 'deadlift_2', name: 'Sırtkıran', description: '180 kg Deadlift yap.', icon: 'back_gold', xpReward: 1200, condition: 'max_deadlift >= 180' },

  // Hacim (22-26)
  { id: 'vol_sess_1', name: 'Isınma Hacmi', description: 'Bir antrenmanda 1,000 kg hacim çıkar.', icon: 'weight', xpReward: 100, condition: 'max_session_vol >= 1000' },
  { id: 'vol_sess_2', name: 'Gerçek Mesai', description: 'Bir antrenmanda 5,000 kg hacim çıkar.', icon: 'weight', xpReward: 300, condition: 'max_session_vol >= 5000' },
  { id: 'vol_week_1', name: 'Haftalık Yük', description: 'Bir haftada 10,000 kg hacim çıkar.', icon: 'calendar', xpReward: 500, condition: 'max_week_vol >= 10000' },
  { id: 'vol_month_1', name: 'Aylık Dev', description: 'Bir ayda 50,000 kg hacim çıkar.', icon: 'calendar', xpReward: 1500, condition: 'max_month_vol >= 50000' },
  { id: 'vol_lifetime_1', name: 'Tonlarca Demir', description: 'Hayat boyu 1 Milyon kg hacim yap!', icon: 'world', xpReward: 5000, condition: 'total_volume >= 1000000' },

  // Diğer (27-30)
  { id: 'weekend_warrior', name: 'Hafta Sonu Savaşçısı', description: 'Cumartesi veya Pazar antrenman yap.', icon: 'swords', xpReward: 100, condition: 'weekend_workouts >= 1' },
  { id: 'deload_1', name: 'Stratejik Geri Çekilme', description: 'İlk defa deload haftası yap.', icon: 'shield', xpReward: 100, condition: 'total_deloads >= 1' },
  { id: 'shares_5', name: 'İlham Kaynağı', description: '5 antrenman paylaş.', icon: 'share', xpReward: 200, condition: 'shares_count >= 5' },
  { id: 'profile_pic', name: 'Gülümse', description: 'Profil resmi ekle.', icon: 'camera', xpReward: 50, condition: 'has_profile_pic' }
];

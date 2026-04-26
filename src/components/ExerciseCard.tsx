/**
 * Performans Optimizasyon Notları
 * 
 * 1. FlatList (RN) / Virtualized List (Web) Optimizasyonu:
 *    Neden Önemli: Çok fazla egzersiz geçmişini listelerken belleği şişirmemesi için.
 *    - keyExtractor: benzersiz kimlikler ile gereksiz re-render önlenir.
 *    - getItemLayout: liste öğelerinin boyutları sabitse, listeye bunu önceden söylemek render hızını dramatik artırır.
 *    - removeClippedSubviews: ekranın dışındaki bileşenleri bellekten siler.
 * 
 * 2. React.memo
 *    WorkoutSetRow, ExerciseCard gibi defalarca render edilen child bileşenleri sarmalamak
 *    gereksiz diff hesaplamalarını engeller, CPU kullanımını azaltır.
 * 
 * 3. useCallback ve useMemo
 *    Bileşen içindeki fonksiyonları (örneğin onSetComplete) useCallback ile sarmalamak, 
 *    child bileşenlere aynı referansı göndererek gereksiz render'ı önler.
 * 
 * 4. Firestore Compound Index
 *    Hem uid'ye göre filtreleyip hem date'e göre siralama yapıyorsak (örn. getRecentSessions),
 *    Firebase konsolundan compound index (bileşik dizin) oluşturmak sorgu hızını 10-100x artırır.
 * 
 * 5. Görsel Optimizasyonu
 *    (RN: expo-image, Web: native loading="lazy" veya IntersectionObserver)
 *    Egzersiz animasyonlarını gerektikçe ve önbellekleyerek (cache) yüklemek bant genişliği ve bellek tasarrufu sağlar.
 */

import React, { memo } from 'react';

interface ExerciseCardProps {
  name: string;
  muscle: string;
  onPress: () => void;
}

// Örnek React.memo kullanımı
export const ExerciseCard = memo(({ name, muscle, onPress }: ExerciseCardProps) => {
  return (
    <div onClick={onPress} className="bg-white p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50">
      <h3 className="font-bold text-slate-800">{name}</h3>
      <p className="text-xs text-slate-500">{muscle}</p>
    </div>
  );
},(prevProps, nextProps) => {
  return prevProps.name === nextProps.name; // Yalnızca name değişirse re-render
});

ExerciseCard.displayName = 'ExerciseCard';

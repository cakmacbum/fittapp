import { collection, addDoc } from 'firebase/firestore';
import { db } from '../services/firebaseConfig'; // To be created

const exercises = [
  // Göğüs
  { name: 'Bench Press', muscleGroup: 'Göğüs', secondaryMuscles: ['Triceps', 'Ön Omuz'], instructions: ['Sehpaya uzanın', 'Barı omuz genişliğinde tutun', 'Barı göğsünüze indirin', 'Güçlü bir şekilde yukarı itin'] },
  { name: 'Incline Dumbbell Press', muscleGroup: 'Göğüs', secondaryMuscles: ['Triceps', 'Ön Omuz'], instructions: ['Eğimli sehpaya oturun', 'Dumbbellları göğüs hizasında tutun', 'Yukarı doğru itin', 'Kontrollü indirin'] },
  { name: 'Dumbbell Fly', muscleGroup: 'Göğüs', secondaryMuscles: [], instructions: ['Sehpaya uzanın', 'Dumbbellları yukarıda birleşik tutun', 'Kollarınızı yana açın', 'Göğüs kaslarınızı sıkarak kapatın'] },
  { name: 'Push-up', muscleGroup: 'Göğüs', secondaryMuscles: ['Triceps', 'Omuz', 'Karın'], instructions: ['Şınav pozisyonu alın', 'Vücudunuzu düz tutun', 'Göğsünüz yere değene kadar inin', 'Kendinizi yukarı itin'] },
  
  // Sırt
  { name: 'Pull-up', muscleGroup: 'Sırt', secondaryMuscles: ['Biceps', 'Arka Omuz'], instructions: ['Bara tutunun', 'Vücudunuzu yukarı çekin', 'Çeneniz barı geçsin', 'Kontrollü inin'] },
  { name: 'Barbell Row', muscleGroup: 'Sırt', secondaryMuscles: ['Biceps', 'Arka Omuz'], instructions: ['Öne eğilin', 'Barı diz hizasında tutun', 'Karnınıza doğru çekin', 'Sırtınızı sıkın'] },
  { name: 'Lat Pulldown', muscleGroup: 'Sırt', secondaryMuscles: ['Biceps'], instructions: ['Makineye oturun', 'Barı geniş tutun', 'Göğsünüze doğru çekin', 'Kollarınızı yavaşça uzatın'] },
  { name: 'Seated Cable Row', muscleGroup: 'Sırt', secondaryMuscles: ['Biceps'], instructions: ['Makineye oturun', 'V-barı tutun', 'Karnınıza doğru çekin', 'Kürek kemiklerinizi sıkıştırın'] },

  // Omuz
  { name: 'Overhead Press', muscleGroup: 'Omuz', secondaryMuscles: ['Triceps'], instructions: ['Ayakta durun', 'Barı köprücük kemiğinde tutun', 'Başınızın üstüne itin', 'Kontrollü indirin'] },
  { name: 'Lateral Raise', muscleGroup: 'Omuz', secondaryMuscles: [], instructions: ['Dumbbellları yanınızda tutun', 'Kollarınızı yana açın', 'Omuz hizasına kadar kaldırın', 'Yavaşça indirin'] },
  { name: 'Front Raise', muscleGroup: 'Omuz', secondaryMuscles: [], instructions: ['Dumbbellları önde tutun', 'Kollarınızı öne doğru kaldırın', 'Omuz hizasında durun', 'Kontrollü indirin'] },
  { name: 'Face Pull', muscleGroup: 'Omuz', secondaryMuscles: ['Sırt'], instructions: ['Halatı yüz hizasında tutun', 'Yüzünüze doğru çekin', 'Dirsekleri dışarı açın', 'Arka omzu sıkın'] },

  // Biceps
  { name: 'Barbell Curl', muscleGroup: 'Biceps', secondaryMuscles: [], instructions: ['Barı alttan tutun', 'Dirsekleri sabitleyin', 'Barı omuzlara doğru kaldırın', 'Kontrollü indirin'] },
  { name: 'Hammer Curl', muscleGroup: 'Biceps', secondaryMuscles: ['Ön Kol'], instructions: ['Dumbbellları nötral tutun', 'Dirsekleri sabitleyin', 'Omuzlara doğru kaldırın', 'Yavaşça indirin'] },
  { name: 'Preacher Curl', muscleGroup: 'Biceps', secondaryMuscles: [], instructions: ['Sehpaya kollarınızı dayayın', 'Barı tutun', 'Kaldırın ve bicepsleri sıkın', 'Kontrollü esnetin'] },
  { name: 'Concentration Curl', muscleGroup: 'Biceps', secondaryMuscles: [], instructions: ['Oturun', 'Dirseği iç bacağa dayayın', 'Dumbbellı kaldırın', 'Tepe noktada sıkın'] },

  // Triceps
  { name: 'Triceps Pushdown', muscleGroup: 'Triceps', secondaryMuscles: [], instructions: ['Halatı tutun', 'Dirsekleri sabitleyin', 'Aşağı doğru itin', 'Tricepsleri sıkın'] },
  { name: 'Overhead Triceps Extension', muscleGroup: 'Triceps', secondaryMuscles: [], instructions: ['Dumbbellı baş üstünde tutun', 'Dirsekleri bükerek indirin', 'Yukarı doğru itin', 'Dirsekleri sabitleyin'] },
  { name: 'Skull Crusher', muscleGroup: 'Triceps', secondaryMuscles: [], instructions: ['Sehpaya uzanın', 'Barı alnınıza doğru indirin', 'Yukarı doğru itin', 'Tricepsleri sıkın'] },
  { name: 'Dips', muscleGroup: 'Triceps', secondaryMuscles: ['Göğüs', 'Omuz'], instructions: ['Paralel barlara tutunun', 'Vücudunuzu dik tutun', 'Dirsekler 90 derece olana kadar inin', 'Kendinizi yukarı itin'] },

  // Ön Bacak (Quad)
  { name: 'Squat', muscleGroup: 'Ön Bacak', secondaryMuscles: ['Kalça', 'Arka Bacak', 'Karın'], instructions: ['Barı omuzlara alın', 'Sırtı dik tutun', 'Çömelin (dizler 90 derece)', 'Yukarı doğru güçlü itin'] },
  { name: 'Leg Press', muscleGroup: 'Ön Bacak', secondaryMuscles: ['Kalça'], instructions: ['Makineye oturun', 'Ayakları platforma yerleştirin', 'Ağırlığı itin', 'Kontrollü indirin'] },
  { name: 'Lunges', muscleGroup: 'Ön Bacak', secondaryMuscles: ['Kalça'], instructions: ['Bir adım öne atın', 'Arka diz yere yaklaşsın', 'Ön bacakla yukarı itin', 'Bacak değiştirin'] },
  { name: 'Leg Extension', muscleGroup: 'Ön Bacak', secondaryMuscles: [], instructions: ['Makineye oturun', 'Bacaklarınızı uzatın', 'Tepe noktada sıkın', 'Kontrollü indirin'] },

  // Arka Bacak (Hamstring)
  { name: 'Romanian Deadlift', muscleGroup: 'Arka Bacak', secondaryMuscles: ['Kalça', 'Sırt'], instructions: ['Barı tutun', 'Dizleri hafif kırın', 'Kalçayı geriye iterek eğilin', 'Kalçayı sıkarak kalkın'] },
  { name: 'Leg Curl', muscleGroup: 'Arka Bacak', secondaryMuscles: ['Kalf'], instructions: ['Makineye yüzüstü yatın', 'Topukları kalçaya çekin', 'Arka bacağı sıkın', 'Kontrollü uzatın'] },
  { name: 'Glute-Ham Raise', muscleGroup: 'Arka Bacak', secondaryMuscles: ['Kalça'], instructions: ['Makineye yerleşin', 'Gövdeyi indirin', 'Topuklarla çekerek kalkın', 'Duruşu koruyun'] },
  { name: 'Good Morning', muscleGroup: 'Arka Bacak', secondaryMuscles: ['Sırt'], instructions: ['Barı omuzlara alın', 'Sırtı dik tutarak öne eğilin', 'Kalçayı geriye itin', 'Kalçayı sıkarak kalkın'] },

  // Kalça
  { name: 'Hip Thrust', muscleGroup: 'Kalça', secondaryMuscles: ['Arka Bacak'], instructions: ['Sırtınızı sehpaya dayayın', 'Barı kalçaya koyun', 'Kalçayı yukarı itin', 'Tepe noktada iyice sıkın'] },
  { name: 'Glute Kickback', muscleGroup: 'Kalça', secondaryMuscles: [], instructions: ['Kabloya ayak bileğini bağlayın', 'Bacağı geriye doğru itin', 'Kalçayı sıkın', 'Kontrollü getirin'] },

  // Karın
  { name: 'Crunch', muscleGroup: 'Karın', secondaryMuscles: [], instructions: ['Yere uzanın', 'Dizleri bükün', 'Göğsü dizlere doğru kaldırın', 'Karın kaslarını sıkın'] },
  { name: 'Plank', muscleGroup: 'Karın', secondaryMuscles: ['Omuz', 'Sırt'], instructions: ['Dirsekler üzerinde durun', 'Vücudu düz bir çizgi yapın', 'Karın kaslarını sıkı tutun', 'Süreyi koruyun'] },
  { name: 'Leg Raise', muscleGroup: 'Karın', secondaryMuscles: [], instructions: ['Bara asılın veya yere yatın', 'Bacakları düz kaldırın', 'Karın kaslarını sıkın', 'Kontrollü indirin'] }
];

export const seedExercises = async () => {
  try {
    for (const exercise of exercises) {
      await addDoc(collection(db, 'exercises'), exercise);
    }
    console.log('Seeded exercises completely.');
  } catch (error) {
    console.error('Error seeding exercises:', error);
  }
};

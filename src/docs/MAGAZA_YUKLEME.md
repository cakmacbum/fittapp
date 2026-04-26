# FAZ 10: Mağaza Yükleme ve Yayın Süreci 🚀

## 10.3 App İkonları ve Splash Screen

**app.json Konfigürasyonu:**
\`\`\`json
{
  "expo": {
    "name": "FitApp",
    "slug": "fitapp",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#1E293B" 
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#1E293B"
      }
    }
  }
}
\`\`\`

- **İkon Boyutları:** Master ikon `1024x1024` piksel olmalıdır (.png formatı, köşeleri yuvarlak olmadan, tam dolu kare). Expo bunu otomatik olarak tüm boyutlara boyutlandırır (iOS ve Android için).
- **Splash Screen Rengi/Animasyonu:** `app.json` içindeki `backgroundColor` ana arka plan rengidir. iOS için launch screen otomatik üretilir.
- **Android Adaptive Icon:** Android 8 ve sonrasında ikonlar daire, kare veya squircle olabilir. Bu uyum için iki katman requires: bir arkaplan (koyu mavi) ve bir ön plan (`1024x1024` ama şekil çerçevenin ortasında, şeffaf arkaplanlı logo).

---

## 10.4 EAS Build ve Mağaza Yükleme

EAS (Expo Application Services), uygulamanızı bulutta build almanızı sağlar. Cihazınızda Android Studio veya Xcode olmadan build alabilirsiniz.

### EAS CLI Kurulumu ve Config
\`\`\`bash
npm install -g eas-cli
eas login
eas build:configure
\`\`\`
Bu adımlar projenizde bir `eas.json` dosyası oluşturur.

### Android APK vs AAB
- **APK:** Doğrudan indirip cihazınıza test amaçlı kurabileceğiniz dosyadır. Mağazalar artık bunu KABUL ETMEZ.
- **AAB (Android App Bundle):** Google Play Store'un zorunlu tuttuğu asıl build dosyasıdır. Sadece AAB ile mağazaya uygulama çıkabilirsiniz. Cihaza göre optimize APK'lar bu bundle'dan Google tarafından üretilir.

### iOS Build: Apple Developer
iOS için build alırken (simülatör hariç) mutlaka aktif, ücretli bir (yıllık $99) **Apple Developer** hesabına ihtiyacınız vardır. EAS, sizden giriş bilgilerinizi isteyecektir; sertifikaları ve provision profillerini otomatik oluşturur.

### Build Komutları
\`\`\`bash
# Google Play Store için production build
eas build --platform android --profile production

# App Store için production build
eas build --platform ios --profile production

# Test için Simulator buildi (iOS)
eas build --platform ios --profile development --simulator
\`\`\`

---

## Mağazalarda Yeni Uygulama Oluşturma

### Google Play Console (Adım Adım)
1. **Developer Hesabı:** Google Play Console hesabına (25$ tek seferlik ücret) giriş yap.
2. **"Tüm Uygulamalar" (All Apps):** "Uygulama oluştur" (Create app) butonuna tıkla.
3. **Uygulama Ayrıntıları:** Uygulama adını ("FitApp"), dilini (Turkish) ve kategorisini (Uygulama -> Sağlık ve Fitness) seç. Ücretli/Ücretsiz seç.
4. **Mağaza Girişi (Store Listing):** Uzun açıklama, kısa açıklama, 1024x500 özellik grafiği (Feature graphic), 512x512 yüksek çözünürlüklü ikon ve app içi ekran görüntülerini ekle.
5. **Politikalar ve İçerik:** Veri güvenliği formunu doldur (Firestore kullandığın için data toplama ilkelerini seç). İçerik Derecelendirmesi (Content Rating) anketini çöz.
6. **Sürüm Yönetimi:** "Üretim" (Production) veya "Açık Test" (Open Testing) hattına gir. "Yeni sürüm oluştur" de ve EAS'ten inen `.aab` dosyasını buraya yükle.
7. İncelemeye Gönder.

### App Store Connect (Adım Adım)
1. Apple Developer hesabınızla (yıllık $99) App Store Connect ekranına girin.
2. **"My Apps"** (Uygulamalarım) kısmından "+" ikonuna basıp "New App" deyin.
3. Uygulamanın adını, primer dilini ve Bundle ID'sini (app.json içindeki \`ios.bundleIdentifier\`) seçin.
4. App Information ve Pricing bölümlerini ayarlayın.
5. Ekran görüntülerini yükleyin (6.5 inch ve 5.5 inch zorunludur).
6. **EAS Submit** ile build dosyanızı (.ipa) TestFlight / App Store bölgesine atın (`eas submit -p ios`).
7. Build sisteme yansıdıktan sonra sürümü seçip "İncelemeye Gönder" (Submit for Review) butonuna basın.

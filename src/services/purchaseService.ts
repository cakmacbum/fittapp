/*
 * REVENUECAT KURULUM ADIMLARI (Web/Mobile)
 * 1. RevenueCat hesabınızı oluşturun (https://www.revenuecat.com)
 * 2. Yeni bir proje (FitApp) oluşturun.
 * 3. App Store, Google Play veya Stripe (Web için) entegrasyonlarını yapın (Credentials ekleyin).
 * 4. "Entitlements" bölümünden yeni bir entitlement (örn: "pro_access") oluşturun.
 * 5. "Products" bölümünden mağazadaki ürün ID'lerini girin.
 * 6. "Offerings" bölümünde bu ürünleri gruplayarak aylık/yıllık paketleri belirleyin.
 * 7. Uygulamada apiKey kullanarak initialize edin.
 */

// Not: We are mocking the react-native-purchases or @revenuecat/purchases-js
// since we are in a web preview environment without actual mobile payment configuration.

export const purchaseService = {
  initialize: async (apiKey: string) => {
    console.log('[PurchaseService] Initialized with API Key:', apiKey);
    // Purchases.configure({ apiKey });
  },

  getOfferings: async () => {
    // MOCK: return Purchases.getOfferings();
    return {
      current: {
        monthly: { title: 'FitApp Pro Aylık', priceString: '₺99.00/ay', id: 'monthly' },
        annual: { title: 'FitApp Pro Yıllık', priceString: '₺699.00/yıl', id: 'annual' },
      }
    };
  },

  purchasePackage: async (pkgId: string) => {
    // MOCK: const { customerInfo } = await Purchases.purchasePackage(package);
    console.log('[PurchaseService] Satın alma işlemi başlatıldı:', pkgId);
    
    // Simüle edilmiş bekleme süresi
    return new Promise((resolve) => setTimeout(() => resolve(true), 1500));
  },

  restorePurchases: async () => {
    // MOCK: const customerInfo = await Purchases.restorePurchases();
    console.log('[PurchaseService] Satın almalar geri yükleniyor...');
    return new Promise((resolve) => setTimeout(() => resolve(false), 1500));
  },

  checkProStatus: async () => {
    // MOCK: const customerInfo = await Purchases.getCustomerInfo();
    // return typeof customerInfo.entitlements.active['pro_access'] !== "undefined";
    return false; // Default olarak false dönüyoruz
  }
};

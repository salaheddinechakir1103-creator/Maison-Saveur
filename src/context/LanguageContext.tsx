import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface Translations {
  [key: string]: {
    fr: string;
    ar: string;
  };
}

export const DICTIONARY: Translations = {
  // Navigation
  navHome: { fr: 'Accueil', ar: 'الرئيسية' },
  navMenu: { fr: 'La Carte', ar: 'قائمة الطعام' },
  navStory: { fr: 'Notre Histoire', ar: 'قصتنا' },
  navGallery: { fr: 'Galerie', ar: 'المعرض' },
  navReservation: { fr: 'Réservation', ar: 'الحجز' },
  navContact: { fr: 'Contact', ar: 'اتصل بنا' },
  bookTable: { fr: 'Réserver une Table', ar: 'احجز طاولة' },
  adminLink: { fr: 'Espace Direction', ar: 'لوحة الإدارة' },

  // Hero Section
  heroPreTitle: { fr: 'Haute Gastronomie & Café d\'Auteur', ar: 'فن الطهي الرفيع ومقهى النخبة' },
  heroTitleLine1: { fr: "L'Art du Goût", ar: 'فن الذوق' },
  heroTitleLine2: { fr: 'Sublimé à la Table', ar: 'وسحر الضيافة' },
  heroSubtitle: { 
    fr: 'Une odyssée culinaire où l\'excellence de la haute cuisine française rencontre la richesse intemporelle des terroirs marocains.', 
    ar: 'رحلة طهي استثنائية تجمع بين دقة المطبخ الفرنسي الفاخر وعراقة التراث المغربي الأصيل.' 
  },
  discoverMenu: { fr: 'Explorer la Carte', ar: 'استكشف القائمة' },
  heroInteractionTip: { fr: 'Faites glisser pour faire pivoter le plat 3D · Inspectez les détails', ar: 'اسحب لتدوير الطبق ثلاثي الأبعاد · عاين التفاصيل' },

  // 3D Controls
  viewPreset: { fr: 'Vue Caméra', ar: 'زاوية الرؤية' },
  viewPerspective: { fr: 'Perspective', ar: 'منظور' },
  viewTop: { fr: 'Zénithale', ar: 'رأسية' },
  viewMacro: { fr: 'Détail Macro', ar: 'تكبير دقيق' },
  liftCloche: { fr: 'Soulever la Cloche', ar: 'رفع الغطاء الذهبي' },
  lowerCloche: { fr: 'Couvrir le Plat', ar: 'تغطية الطبق' },
  lightingPreset: { fr: 'Ambiance Lumineuse', ar: 'الإضاءة' },
  lightingStudio: { fr: 'Studio Or', ar: 'استوديو ذهبي' },
  lightingCandle: { fr: 'Candélabres', ar: 'شمعدان' },
  lightingMidnight: { fr: 'Nuit Étoilée', ar: 'ليلة ساهرة' },
  autoRotate: { fr: 'Rotation Douce', ar: 'دوران هادئ' },
  hide3DControls: { fr: 'Masquer les commandes', ar: 'إخفاء عناصر التحكم' },
  show3DControls: { fr: 'Commandes 3D', ar: 'عناصر التحكم 3D' },
  fallbackNotice: { fr: 'Visualisation haute précision', ar: 'عرض عالي الدقة' },

  // Sections
  signaturesTitle: { fr: 'Créations d\'Exception', ar: 'إبداعات استثنائية' },
  signaturesSubtitle: { fr: 'L\'alchimie des saisons et la noblesse des produits de nos domaines partenaires.', ar: 'تناغم الفصول ونقاء منتجات مزارعنا الشريكة.' },
  chefStoryTitle: { fr: 'La Philosophie du Chef', ar: 'فلسفة كبير الطهاة' },
  chefStoryBody1: { 
    fr: 'Chaque assiette est pensée comme une partition sensible. Nous refusons les compromis, accordant une attention presque chirurgicale à l\'origine du produit, du safran de Taliouine aux truffes noires de l\'Atlas.', 
    ar: 'كل طبق هو قصيدة حسية متناغمة. نلتزم بأعلى معايير الجودة دون مساومة، منتقين أدق المكونات من زعفران تاليوين النقي إلى كمأة الأطلس.' 
  },
  atmosphereTitle: { fr: 'L\'Atmosphère Maison Saveur', ar: 'أجواء ميزون سافور' },
  atmosphereSubtitle: { fr: 'Un écrin d\'obsidienne et d\'or pour vos réceptions d\'exception et vos dîners d\'affaires discrets.', ar: 'صرح من حجر الأوبسيديان والذهب الموشى لاستقبال مناسباتكم الراقية وعشاء العمل الهادئ.' },
  
  // Menu Page
  menuHeader: { fr: 'Notre Carte Gastronomique', ar: 'قائمتنا الفاخرة' },
  allCategories: { fr: 'Toute la Carte', ar: 'جميع الأطباق' },
  catEntrees: { fr: 'Entrées d\'Exception', ar: 'مقبلات فاخرة' },
  catPlats: { fr: 'Plats Signatures', ar: 'أطباق رئيسية' },
  catPatisserie: { fr: 'Pâtisserie Haute Couture', ar: 'حلويات راقية' },
  catBoissons: { fr: 'Boissons & Thés Rares', ar: 'مشروبات وشاي نادر' },
  catDegustation: { fr: 'Menu Dégustation', ar: 'قائمة التذوق' },
  searchPlaceholder: { fr: 'Rechercher un ingrédient, plat ou saveur...', ar: 'ابحث عن طبق، مكون أو نكهة...' },
  viewDetails: { fr: 'Voir les détails', ar: 'تفاصيل الطبق' },
  addToCart: { fr: 'Commander', ar: 'إضافة للطلب' },
  addedToCart: { fr: 'Ajouté !', ar: 'تمت الإضافة !' },
  printQrMenu: { fr: 'QR Code de Table', ar: 'رمز QR للطاولة' },
  chefSpecial: { fr: 'Signature du Chef', ar: 'طبق الشيف المميز' },

  // Cart & Order
  cartTitle: { fr: 'Votre Sélection Gourmande', ar: 'اختياراتك المميزة' },
  emptyCart: { fr: 'Votre sélection est actuellement vide.', ar: 'سلة الطلبات فارغة حالياً.' },
  total: { fr: 'Total Estimé', ar: 'المجموع التقديري' },
  orderViaWhatsApp: { fr: 'Commander sur WhatsApp', ar: 'إرسال الطلب عبر واتساب' },
  clearCart: { fr: 'Vider', ar: 'إفراغ' },
  cartNotePlaceholder: { fr: 'Instructions spéciales, heure souhaitée, préférences...', ar: 'ملاحظات خاصة، وقت التحضير، تفضيلات...' },
  currency: { fr: 'MAD', ar: 'درهم' },

  // Reservation Page
  resTitle: { fr: 'Réserver Votre Table', ar: 'حجز طاولتك' },
  resSubtitle: { fr: 'Pour toute demande de table supérieure à 8 convives, notre concierge privé reste à votre écoute.', ar: 'للحجوزات الأكثر من 8 أشخاص، يتشرف فريق الاستقبال بخدمتكم هاتفياً.' },
  fullName: { fr: 'Nom & Prénom', ar: 'الاسم الكامل' },
  phone: { fr: 'Numéro de Téléphone', ar: 'رقم الهاتف' },
  email: { fr: 'Adresse E-mail', ar: 'البريد الإلكتروني' },
  date: { fr: 'Date du Service', ar: 'تاريخ الحجز' },
  time: { fr: 'Heure', ar: 'الوقت' },
  guestsCount: { fr: 'Nombre de Convives', ar: 'عدد الضيوف' },
  areaPreference: { fr: 'Espace Souhaité', ar: 'المكان المفضل' },
  areaSalon: { fr: 'Salon Impérial (Intérieur feutré)', ar: 'الصالون الإمبراطوري (أجواء دافئة)' },
  areaTerrasse: { fr: 'Terrasse Jardin (Sous les lanternes)', ar: 'شرفة الحديقة (تحت الفوانيس)' },
  areaChef: { fr: 'Table du Chef (Immersion privée)', ar: 'طاولة الشيف (تجربة خاصة)' },
  specialNotes: { fr: 'Régimes, allergies ou occasion particulière', ar: 'ملاحظات خاصة، مناسبة أو حساسية طعام' },
  confirmBooking: { fr: 'Confirmer la Réservation', ar: 'تأكيد الحجز' },
  bookingSuccessTitle: { fr: 'Réservation Confirmée avec Honneur', ar: 'تم تأكيد حجزك بنجاح' },
  bookingRef: { fr: 'Référence du Dossier', ar: 'رقم مرجع الحجز' },

  // Footer & Brand
  tagline: { fr: 'Haute Gastronomie & Salon de Thé de Prestige', ar: 'المطعم الراقي ومجلس الشاي الفاخر' },
  hours: { fr: 'Horaires du Service', ar: 'ساعات العمل' },
  lunch: { fr: 'Déjeuner : 12h00 – 15h30', ar: 'الغداء: 12:00 – 15:30' },
  dinner: { fr: 'Dîner : 19h30 – 23h45', ar: 'العشاء: 19:30 – 23:45' },
  dressCode: { fr: 'Code Vestimentaire', ar: 'قواعد اللباس' },
  dressCodeDesc: { fr: 'Tenue élégante et soignée exigée. Service voiturier à disposition.', ar: 'يُشترط ارتداء ملابس أنيقة. خدمة ركن السيارات متوفرة.' },
  addresses: { fr: 'Nos Adresses', ar: 'عناويننا' },
  marrakechAddress: { fr: 'Avenue Mohammed VI, L\'Hivernage, Marrakech', ar: 'شارع محمد السادس، الحي الشتوي، مراكش' },
  casablancaAddress: { fr: 'Boulevard d\'Anfa, Triangle d\'Or, Casablanca', ar: 'شارع أنفا، المثلث الذهبي، الدار البيضاء' },
  demoNotice: { fr: 'Site de démonstration gastronomique haute fidélité. Données et réservations simulées.', ar: 'موقع تجريبي عالي الجودة لفن الطهي. الحجوزات والبيانات مخصصة للعرض.' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('maison_saveur_lang');
    return (saved === 'ar' || saved === 'fr') ? saved : 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('maison_saveur_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    const item = DICTIONARY[key];
    if (!item) return key;
    return item[language] || item.fr;
  };

  const isRtl = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

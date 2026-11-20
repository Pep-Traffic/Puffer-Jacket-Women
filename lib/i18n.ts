// Languages the site is published in. English keeps its current addresses;
// the others live under /ur, /ar and /hi. Urdu and Arabic read right to left.
export const locales = ["en", "ur", "ar", "hi"] as const;
export type Locale = (typeof locales)[number];

export const translatedLocales = ["ur", "ar", "hi"] as const;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirOf(lang: Locale): "ltr" | "rtl" {
  return lang === "ur" || lang === "ar" ? "rtl" : "ltr";
}

// Path for the same page in another language. English has no prefix.
export function localePath(lang: Locale, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// Interface text: header, footer, navigation and common labels.
export type Strings = {
  noteFit: string;
  noteShipping: string;
  noteReturns: string;
  noteQuestions: string;
  home: string;
  shopAll: string;
  search: string;
  saved: string;
  bag: string;
  menu: string;
  closeMenu: string;
  searchPlaceholder: string;
  searchIdle: string;
  noMatch: string;
  savedEmpty: string;
  joinHeading: string;
  joinBody: string;
  emailPlaceholder: string;
  subscribe: string;
  subscribed: string;
  colShop: string;
  colCare: string;
  colInfo: string;
  linkAll: string;
  linkContact: string;
  linkQuestions: string;
  linkSize: string;
  linkBag: string;
  linkGuide: string;
  linkCheckout: string;
  featCheckoutTitle: string;
  featCheckoutBody: string;
  featReturnsTitle: string;
  featReturnsBody: string;
  featShipTitle: string;
  featShipBody: string;
  featFitTitle: string;
  featFitBody: string;
  contactPhone: string;
  contactHours: string;
  contactAddress: string;
  copyright: string;
  paymentsLabel: string;
  socialsLabel: string;
  language: string;
  currency: string;
  priceToConfirm: string;
  skipLink: string;
  currencyNote: string;
  languageNote: string;
  pageMeta: Partial<Record<"home" | "shop" | "guide" | "sizeGuide" | "faq" | "cart" | "checkout", { title: string; description: string }>>;
  categories: Record<"long-sleeve" | "sleeveless" | "short-sleeve" | "caps-hats" | "accessories", string>;
};

const en: Strings = {
  noteFit: "Fit guidance on every page",
  noteShipping: "Shipping confirmed at checkout",
  noteReturns: "Returns policy shown before you pay",
  noteQuestions: "Questions? Read the FAQ",
  home: "Home",
  shopAll: "Shop all",
  search: "Search",
  saved: "Saved pieces",
  bag: "Bag",
  menu: "Menu",
  closeMenu: "Close menu",
  searchPlaceholder: "Search styles, colours or categories",
  searchIdle: "Type a style, a colour or a category to start.",
  noMatch: "No styles match “{q}”. Try a colour or a category.",
  savedEmpty: "No saved pieces yet. Use the heart on a product page to keep one here.",
  joinHeading: "Join the Circle",
  joinBody: "Product updates and seasonal news as the collection launches.",
  emailPlaceholder: "Enter your email address",
  subscribe: "Subscribe",
  subscribed: "Your email app opens to finish the sign-up. The newsletter goes live at launch.",
  colShop: "Shop",
  colCare: "Customer care",
  colInfo: "Information",
  linkAll: "All products",
  linkContact: "Contact us",
  linkQuestions: "Questions",
  linkSize: "Size guide",
  linkBag: "Your bag",
  linkGuide: "Buying guide",
  linkCheckout: "Checkout",
  featCheckoutTitle: "Secure checkout",
  featCheckoutBody: "Payment provider confirmed before launch",
  featReturnsTitle: "Easy returns",
  featReturnsBody: "Returns policy shown before you pay",
  featShipTitle: "Shipping",
  featShipBody: "Delivery confirmed at checkout",
  featFitTitle: "Fit and sizing help",
  featFitBody: "Size guide and questions on every page",
  contactPhone: "Phone added before launch",
  contactHours: "Opening hours added before launch",
  contactAddress: "Address added before launch",
  copyright: "© {year} {name}. All rights reserved.",
  paymentsLabel: "Payments to be confirmed",
  socialsLabel: "Social profiles",
  language: "Language",
  currency: "Currency",
  priceToConfirm: "Price to confirm",
  skipLink: "Skip to content",
  currencyNote: "Prices are shown in US dollars until local rates are added.",
  languageNote: "translations are added before launch.",
  pageMeta: {},
  categories: {
    "long-sleeve": "Long sleeve",
    sleeveless: "Sleeveless",
    "short-sleeve": "Short sleeve",
    "caps-hats": "Caps and hats",
    accessories: "Accessories",
  },
};

const ur: Strings = {
  noteFit: "ہر صفحے پر فِٹ کی رہنمائی",
  noteShipping: "شپنگ چیک آؤٹ پر تصدیق شدہ",
  noteReturns: "ادائیگی سے پہلے واپسی کی پالیسی دکھائی جاتی ہے",
  noteQuestions: "سوالات؟ عمومی سوالات پڑھیں",
  home: "ہوم",
  shopAll: "تمام دیکھیں",
  search: "تلاش",
  saved: "محفوظ کردہ",
  bag: "بیگ",
  menu: "مینو",
  closeMenu: "مینو بند کریں",
  searchPlaceholder: "طرز، رنگ یا زمرہ تلاش کریں",
  searchIdle: "شروع کرنے کے لیے کوئی طرز، رنگ یا زمرہ لکھیں۔",
  noMatch: "“{q}” سے کوئی طرز نہیں ملی۔ کوئی رنگ یا زمرہ آزمائیں۔",
  savedEmpty: "ابھی کوئی محفوظ چیز نہیں۔ کسی مصنوعات کے صفحے پر دل کا نشان استعمال کریں۔",
  joinHeading: "حلقے میں شامل ہوں",
  joinBody: "مجموعے کے آغاز پر مصنوعات کی تازہ معلومات اور موسمی خبریں۔",
  emailPlaceholder: "اپنا ای میل پتہ لکھیں",
  subscribe: "سبسکرائب کریں",
  subscribed: "آپ کی ای میل ایپ سائن اپ مکمل کرنے کے لیے کھلے گی۔ نیوز لیٹر لانچ پر شروع ہوگا۔",
  colShop: "خریداری",
  colCare: "کسٹمر کیئر",
  colInfo: "معلومات",
  linkAll: "تمام مصنوعات",
  linkContact: "ہم سے رابطہ کریں",
  linkQuestions: "سوالات",
  linkSize: "سائز گائیڈ",
  linkBag: "آپ کا بیگ",
  linkGuide: "خریداری گائیڈ",
  linkCheckout: "چیک آؤٹ",
  featCheckoutTitle: "محفوظ چیک آؤٹ",
  featCheckoutBody: "ادائیگی فراہم کنندہ لانچ سے پہلے طے ہوگا",
  featReturnsTitle: "آسان واپسی",
  featReturnsBody: "ادائیگی سے پہلے واپسی کی پالیسی دکھائی جاتی ہے",
  featShipTitle: "شپنگ",
  featShipBody: "چیک آؤٹ پر ترسیل کی تصدیق",
  featFitTitle: "فِٹ اور سائز میں مدد",
  featFitBody: "ہر صفحے پر سائز گائیڈ اور سوالات",
  contactPhone: "فون لانچ سے پہلے شامل ہوگا",
  contactHours: "اوقات کار لانچ سے پہلے شامل ہوں گے",
  contactAddress: "پتہ لانچ سے پہلے شامل ہوگا",
  copyright: "© {year} {name}. جملہ حقوق محفوظ ہیں۔",
  paymentsLabel: "ادائیگی کے طریقے طے ہونا باقی ہیں",
  socialsLabel: "سوشل پروفائلز",
  language: "زبان",
  currency: "کرنسی",
  priceToConfirm: "قیمت کی تصدیق باقی",
  skipLink: "مرکزی مواد پر جائیں",
  currencyNote: "مقامی شرحیں شامل ہونے تک قیمتیں امریکی ڈالر میں دکھائی جاتی ہیں۔",
  languageNote: "ترجمے لانچ سے پہلے شامل کیے جائیں گے۔",
  pageMeta: {
    home: { title: "خواتین کے لیے پفر جیکٹس", description: "خواتین کے لیے گرم پفر جیکٹس، سلیولیس پفر ویسٹس، شارٹ سلیو لیئرز، ٹوپیاں اور اسکارف۔ ہر صفحے پر فٹ اور فل کی وضاحت۔" },
    shop: { title: "خواتین کے لیے تمام پفر جیکٹس", description: "خواتین کے لیے تمام پفر جیکٹس ایک جگہ: لانگ سلیو، سلیولیس، شارٹ سلیو، ٹوپیاں اور ہیٹس۔" },
    guide: { title: "پفر جیکٹ خریدنے کی گائیڈ", description: "گرمی، فِل اور فٹ کے بارے میں سادہ رہنمائی تاکہ آپ درست پفر جیکٹ منتخب کر سکیں۔" },
    sizeGuide: { title: "سائز گائیڈ", description: "خواتین کی پفر جیکٹس کے لیے سائز کیسے چنیں: بسٹ، کمر اور آستین کی لمبائی۔" },
    faq: { title: "سوالات", description: "خواتین کی پفر جیکٹس، شپنگ، واپسی اور سائز کے بارے میں عام سوالات کے جواب۔" },
    cart: { title: "بیگ", description: "آپ کے منتخب کردہ ٹکڑے۔" },
    checkout: { title: "چیک آؤٹ", description: "اپنا آرڈر مکمل کریں۔" },
  },
  categories: {
    "long-sleeve": "فُل آستین",
    sleeveless: "بغیر آستین",
    "short-sleeve": "چھوٹی آستین",
    "caps-hats": "ٹوپیاں اور کیپس",
    accessories: "لوازمات",
  },
};

const ar: Strings = {
  noteFit: "إرشادات المقاس في كل صفحة",
  noteShipping: "الشحن يُؤكَّد عند الدفع",
  noteReturns: "سياسة الإرجاع تظهر قبل الدفع",
  noteQuestions: "أسئلة؟ اقرأ الأسئلة الشائعة",
  home: "الرئيسية",
  shopAll: "عرض الكل",
  search: "بحث",
  saved: "المحفوظات",
  bag: "الحقيبة",
  menu: "القائمة",
  closeMenu: "إغلاق القائمة",
  searchPlaceholder: "ابحث عن قطعة أو لون أو فئة",
  searchIdle: "اكتب قطعة أو لونًا أو فئة للبدء.",
  noMatch: "لا توجد قطع تطابق “{q}”. جرّب لونًا أو فئة.",
  savedEmpty: "لا توجد قطع محفوظة بعد. استخدم أيقونة القلب في صفحة المنتج لحفظ قطعة هنا.",
  joinHeading: "انضم إلى الدائرة",
  joinBody: "تحديثات المنتجات والأخبار الموسمية مع إطلاق المجموعة.",
  emailPlaceholder: "أدخل عنوان بريدك الإلكتروني",
  subscribe: "اشترك",
  subscribed: "سيفتح تطبيق البريد لإكمال الاشتراك. تبدأ النشرة البريدية عند الإطلاق.",
  colShop: "المتجر",
  colCare: "خدمة العملاء",
  colInfo: "معلومات",
  linkAll: "كل المنتجات",
  linkContact: "تواصل معنا",
  linkQuestions: "الأسئلة",
  linkSize: "دليل المقاسات",
  linkBag: "حقيبتك",
  linkGuide: "دليل الشراء",
  linkCheckout: "الدفع",
  featCheckoutTitle: "دفع آمن",
  featCheckoutBody: "يُحدَّد مزوّد الدفع قبل الإطلاق",
  featReturnsTitle: "إرجاع سهل",
  featReturnsBody: "تظهر سياسة الإرجاع قبل الدفع",
  featShipTitle: "الشحن",
  featShipBody: "يُؤكَّد التوصيل عند الدفع",
  featFitTitle: "مساعدة في المقاس",
  featFitBody: "دليل المقاسات والأسئلة في كل صفحة",
  contactPhone: "يُضاف الهاتف قبل الإطلاق",
  contactHours: "تُضاف ساعات العمل قبل الإطلاق",
  contactAddress: "يُضاف العنوان قبل الإطلاق",
  copyright: "© {year} {name}. جميع الحقوق محفوظة.",
  paymentsLabel: "طرق الدفع تُؤكَّد لاحقًا",
  socialsLabel: "حسابات التواصل الاجتماعي",
  language: "اللغة",
  currency: "العملة",
  priceToConfirm: "السعر يُؤكَّد لاحقًا",
  skipLink: "تخطي إلى المحتوى",
  currencyNote: "تُعرض الأسعار بالدولار الأمريكي حتى تُضاف أسعار الصرف المحلية.",
  languageNote: "ستُضاف الترجمات قبل الإطلاق.",
  pageMeta: {
    home: { title: "معاطف بوفر للنساء", description: "معاطف بوفر دافئة للنساء، وسترات بوفر بلا أكمام، وطبقات بأكمام قصيرة، وقبعات وأوشحة. شرح للمقاس والحشو على كل صفحة." },
    shop: { title: "جميع معاطف البوفر للنساء", description: "جميع معاطف البوفر للنساء في مكان واحد: أكمام طويلة، بلا أكمام، أكمام قصيرة، قبعات وطواقٍ." },
    guide: { title: "دليل شراء معاطف البوفر", description: "إرشادات بسيطة عن الدفء والحشو والمقاس لتختارين المعطف المناسب." },
    sizeGuide: { title: "دليل المقاسات", description: "كيف تختارين المقاس لمعاطف البوفر للنساء: الصدر والخصر وطول الكم." },
    faq: { title: "الأسئلة الشائعة", description: "أجوبة عن معاطف البوفر للنساء والشحن والإرجاع والمقاسات." },
    cart: { title: "حقيبة التسوق", description: "القطع التي اخترتِها." },
    checkout: { title: "الدفع", description: "أكملي طلبك." },
  },
  categories: {
    "long-sleeve": "كم طويل",
    sleeveless: "بدون أكمام",
    "short-sleeve": "كم قصير",
    "caps-hats": "قبعات وكاسكيتات",
    accessories: "إكسسوارات",
  },
};

const hi: Strings = {
  noteFit: "हर पेज पर फिट गाइड",
  noteShipping: "चेकआउट पर शिपिंग की पुष्टि",
  noteReturns: "भुगतान से पहले वापसी नीति दिखाई जाती है",
  noteQuestions: "सवाल? FAQ पढ़ें",
  home: "होम",
  shopAll: "सभी देखें",
  search: "खोजें",
  saved: "सहेजे गए",
  bag: "बैग",
  menu: "मेनू",
  closeMenu: "मेनू बंद करें",
  searchPlaceholder: "स्टाइल, रंग या श्रेणी खोजें",
  searchIdle: "शुरू करने के लिए स्टाइल, रंग या श्रेणी लिखें।",
  noMatch: "“{q}” से कोई स्टाइल नहीं मिला। कोई रंग या श्रेणी आज़माएँ।",
  savedEmpty: "अभी कोई सहेजा गया आइटम नहीं है। किसी प्रोडक्ट पेज पर दिल का चिन्ह दबाएँ।",
  joinHeading: "सर्कल से जुड़ें",
  joinBody: "कलेक्शन लॉन्च होने पर प्रोडक्ट अपडेट और मौसमी खबरें।",
  emailPlaceholder: "अपना ईमेल पता लिखें",
  subscribe: "सब्सक्राइब करें",
  subscribed: "साइन-अप पूरा करने के लिए आपका ईमेल ऐप खुलेगा। न्यूज़लेटर लॉन्च पर शुरू होगा।",
  colShop: "खरीदारी",
  colCare: "ग्राहक सेवा",
  colInfo: "जानकारी",
  linkAll: "सभी प्रोडक्ट",
  linkContact: "संपर्क करें",
  linkQuestions: "सवाल",
  linkSize: "साइज़ गाइड",
  linkBag: "आपका बैग",
  linkGuide: "खरीद गाइड",
  linkCheckout: "चेकआउट",
  featCheckoutTitle: "सुरक्षित चेकआउट",
  featCheckoutBody: "भुगतान प्रदाता लॉन्च से पहले तय होगा",
  featReturnsTitle: "आसान वापसी",
  featReturnsBody: "भुगतान से पहले वापसी नीति दिखाई जाएगी",
  featShipTitle: "शिपिंग",
  featShipBody: "चेकआउट पर डिलीवरी की पुष्टि",
  featFitTitle: "फिट और साइज़ में मदद",
  featFitBody: "हर पेज पर साइज़ गाइड और सवाल",
  contactPhone: "फ़ोन लॉन्च से पहले जोड़ा जाएगा",
  contactHours: "समय लॉन्च से पहले जोड़ा जाएगा",
  contactAddress: "पता लॉन्च से पहले जोड़ा जाएगा",
  copyright: "© {year} {name}. सर्वाधिकार सुरक्षित।",
  paymentsLabel: "भुगतान तरीके लॉन्च से पहले तय होंगे",
  socialsLabel: "सोशल प्रोफ़ाइल",
  language: "भाषा",
  currency: "मुद्रा",
  priceToConfirm: "कीमत की पुष्टि बाकी",
  skipLink: "मुख्य सामग्री पर जाएँ",
  currencyNote: "स्थानीय दरें जुड़ने तक कीमतें अमेरिकी डॉलर में दिखाई जाती हैं।",
  languageNote: "अनुवाद लॉन्च से पहले जोड़े जाएँगे।",
  pageMeta: {
    home: { title: "महिलाओं के लिए पफ़र जैकेट", description: "महिलाओं के लिए गर्म पफ़र जैकेट, स्लीवलेस पफ़र वेस्ट, शॉर्ट स्लीव लेयर, टोपी और स्कार्फ़। हर पेज पर फिट और फिलिंग की जानकारी।" },
    shop: { title: "महिलाओं के लिए सभी पफ़र जैकेट", description: "महिलाओं के लिए सभी पफ़र जैकेट एक ही जगह: लॉन्ग स्लीव, स्लीवलेस, शॉर्ट स्लीव, टोपी और हैट।" },
    guide: { title: "पफ़र जैकेट खरीदने की गाइड", description: "गर्माहट, फिलिंग और फिट के बारे में सरल जानकारी ताकि आप सही जैकेट चुन सकें।" },
    sizeGuide: { title: "साइज़ गाइड", description: "महिलाओं की पफ़र जैकेट का साइज़ कैसे चुनें: छाती, कमर और आस्तीन की लंबाई।" },
    faq: { title: "अक्सर पूछे जाने वाले सवाल", description: "महिलाओं की पफ़र जैकेट, शिपिंग, वापसी और साइज़ के बारे में आम सवालों के जवाब।" },
    cart: { title: "बैग", description: "आपके चुने हुए सामान।" },
    checkout: { title: "चेकआउट", description: "अपना ऑर्डर पूरा करें।" },
  },
  categories: {
    "long-sleeve": "फुल आस्तीन",
    sleeveless: "बिना आस्तीन",
    "short-sleeve": "छोटी आस्तीन",
    "caps-hats": "कैप और टोपी",
    accessories: "एक्सेसरीज़",
  },
};

export const strings: Record<Locale, Strings> = { en, ur, ar, hi };

export function t(lang: Locale): Strings {
  return strings[lang];
}

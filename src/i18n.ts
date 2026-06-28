export type Language = "so" | "en" | "ar";

export interface TranslationDict {
  // Navigation & General
  brandName: string;
  brandSub: string;
  home: string;
  about: string;
  programs: string;
  teachers: string;
  pricing: string;
  certificates: string;
  blog: string;
  contact: string;
  studentLogin: string;
  teacherLogin: string;
  adminLogin: string;
  joinNow: string;
  freeTrial: string;
  portals: string;
  events: string;
  careers: string;
  donate: string;
  privacy: string;
  terms: string;

  // Hero Section
  heroTitle: string;
  heroHighlight: string;
  heroSub: string;
  watchDemo: string;
  statsStudents: string;
  statsTeachers: string;
  statsHours: string;
  statsRating: string;

  // Features
  benefitsTitle: string;
  benefitsSubtitle: string;
  benefit1Title: string;
  benefit1Desc: string;
  benefit2Title: string;
  benefit2Desc: string;
  benefit3Title: string;
  benefit3Desc: string;

  // Programs / Courses Explorer
  programsTitle: string;
  programsSubtitle: string;
  allPrograms: string;
  quranMemorization: string;
  quranReading: string;
  tajweed: string;
  arabicLanguage: string;
  islamicStudies: string;
  childrenPrograms: string;
  adultsPrograms: string;
  oneToOneClasses: string;
  groupClasses: string;
  courseLevel: string;
  courseRating: string;
  courseBook: string;
  compareCourses: string;

  // Pricing Table
  pricingTitle: string;
  pricingSubtitle: string;
  month: string;
  popular: string;
  featuresIncluded: string;

  // FAQ
  faqTitle: string;
  faqSubtitle: string;

  // Footer & Contact
  footerDesc: string;
  newsletterTitle: string;
  newsletterDesc: string;
  placeholderEmail: string;
  subscribeBtn: string;
  subscribeSuccess: string;
  contactUs: string;
  phoneLabel: string;
  emailLabel: string;
}

export const translations: Record<Language, TranslationDict> = {
  so: {
    brandName: "Baro Quran",
    brandSub: "Academy",
    home: "Hore",
    about: "Nagu Saabsan",
    programs: "Koorsooyinka",
    teachers: "Macalimiinta",
    pricing: "Qiimaha",
    certificates: "Shahaadooyinka",
    blog: "Maqaallada",
    contact: "Xiriirka",
    studentLogin: "Galitaanka Ardayga",
    teacherLogin: "Galitaanka Macalinka",
    adminLogin: "Maamulka",
    joinNow: "Diiwaangeli",
    freeTrial: "Cashar Bilaash ah",
    portals: "Albaabbada",
    events: "Dhacdooyinka",
    careers: "Fursado Shaqo",
    donate: "Ku Deeq",
    privacy: "Xeerka Ilaalinta Xogta",
    terms: "Shuruudaha Adeegga",

    heroTitle: "Baro Qur'aanka iyo Luqadda Carabiga adigoo jooga",
    heroHighlight: "Gurigaaga",
    heroSub: "Waa madal caalami ah oo bixisa waxbarasho tayo sare leh oo ku qotonta diinta Islaamka, looguna talagalay bulshada Soomaaliyeed ee adduunka daafihiisa ku nool.",
    watchDemo: "Daawo Cashar Tusaale ah",
    statsStudents: "Arday Firfircoon",
    statsTeachers: "Macalimiin Khubaro ah",
    statsHours: "Saacadood oo Waxbarasho",
    statsRating: "Qiimeynta Ardayda",

    benefitsTitle: "Maxaad u dooranaysaa Akadeemiyadeena?",
    benefitsSubtitle: "Waxaan bixinaa adeegyo waxbarasho oo casri ah oo ku habboon baahida qoyskaaga.",
    benefit1Title: "Macalimiin Khubaro ah",
    benefit1Desc: "Macalimiin rag iyo dumarba leh oo ka qalin-jabiyey jaamacadaha ugu caansan caalamka Islaamka, kuna hadla Af-Soomaali.",
    benefit2Title: "Waqtiyo Dabacsan",
    benefit2Desc: "Dooro waqtiga adiga iyo carruurtaada idiin habboon 24-ta saac ee toddobaadka.",
    benefit3Title: "Darsi Shakhsi ah (1-on-1)",
    benefit3Desc: "Arday kasta wuxuu helayaa dareen buuxa oo ka yimaada macalinka si uu si dhakhso ah u barto.",

    programsTitle: "Barnaamijyada Waxbarasho ee Dynamic",
    programsSubtitle: "U dooro qoyskaaga koorsooyinka ugu habboon ee la diyaariyey.",
    allPrograms: "Dhammaan Koorsooyinka",
    quranMemorization: "Xifdinta Qur'aanka",
    quranReading: "Akhriska Qur'aanka",
    tajweed: "Barashada Tajwiidka",
    arabicLanguage: "Luqadda Carabiga",
    islamicStudies: "Darsiga Diinta",
    childrenPrograms: "Barnaamijka Carruurta",
    adultsPrograms: "Barnaamijka Ardayda Waaweyn",
    oneToOneClasses: "Koorsooyinka Gaarka ah (1-on-1)",
    groupClasses: "Koorsooyinka Kooxda ah",
    courseLevel: "Heerka",
    courseRating: "Qiimeynta",
    courseBook: "Ku Kubiil Cashar Bilaash ah",
    compareCourses: "Isbarbardhig Koorsooyinka",

    pricingTitle: "Qiimo Kooban oo qof kasta awoodo",
    pricingSubtitle: "Dooro xirmooyinka ku habboon miisaaniyadda qoyskaaga, iyadoo aan wax tanaasul ah laga sameyn tayada.",
    month: "bishiiba",
    popular: "Ugu Caansan",
    featuresIncluded: "Waxyaabaha ku jira xirmada:",

    faqTitle: "Su'aalaha Inta Badan La Weydiiyo",
    faqSubtitle: "Halkan ka hel jawaabaha su'aalaha ugu muhiimsan ee kusaabsan adeegayaga.",

    footerDesc: "Isku xirka hiddaha Islaamka iyo farsamada casriga ah ee bulshada Soomaaliyeed ee adduunka daafihiisa ku nool.",
    newsletterTitle: "Wargeyska Akadeemiyada",
    newsletterDesc: "Ku qor email-kaaga si aad u hesho talooyin iyo macluumaad diini ah.",
    placeholderEmail: "Geli email-kaaga halkan...",
    subscribeBtn: "Diiwaangeli",
    subscribeSuccess: "Email-kaaga waa la diiwaan-geliyey!",
    contactUs: "Nagala Soo Xiriir",
    phoneLabel: "Taleefanka",
    emailLabel: "E-mailka"
  },
  en: {
    brandName: "Baro Quran",
    brandSub: "Academy",
    home: "Home",
    about: "About Us",
    programs: "Programs",
    teachers: "Teachers",
    pricing: "Pricing",
    certificates: "Certificates",
    blog: "Blog",
    contact: "Contact",
    studentLogin: "Student Portal",
    teacherLogin: "Teacher Portal",
    adminLogin: "Admin Login",
    joinNow: "Join Now",
    freeTrial: "Book Free Trial",
    portals: "Portals",
    events: "Events",
    careers: "Careers",
    donate: "Donate",
    privacy: "Privacy Policy",
    terms: "Terms of Service",

    heroTitle: "Learn Quran & Arabic Language From",
    heroHighlight: "Your Home",
    heroSub: "An elite global platform offering high-quality Islamic education, customized specifically for the Somali community worldwide.",
    watchDemo: "Watch Demo Class",
    statsStudents: "Active Students",
    statsTeachers: "Expert Teachers",
    statsHours: "Hours of Learning",
    statsRating: "Student Rating",

    benefitsTitle: "Why Choose Our Academy?",
    benefitsSubtitle: "We provide modern, structured Islamic and Arabic educational experiences tailored to your family's needs.",
    benefit1Title: "Expert Tutors",
    benefit1Desc: "Male and female teachers graduated from renowned Islamic universities, fluent in Somali and English.",
    benefit2Title: "Flexible Scheduling",
    benefit2Desc: "Choose hours that seamlessly fit into your busy schedule, available 24/7 across all timezones.",
    benefit3Title: "Personalized (1-on-1)",
    benefit3Desc: "Every student gets personalized attention to learn efficiently and build strong confidence.",

    programsTitle: "Our Educational Programs",
    programsSubtitle: "Select the most suitable structured course designed by Islamic scholars.",
    allPrograms: "All Programs",
    quranMemorization: "Quran Memorization",
    quranReading: "Quran Reading",
    tajweed: "Tajweed Rules",
    arabicLanguage: "Arabic Language",
    islamicStudies: "Islamic Studies",
    childrenPrograms: "Children Programs",
    adultsPrograms: "Adults Programs",
    oneToOneClasses: "Private Classes (1-on-1)",
    groupClasses: "Group Classes",
    courseLevel: "Level",
    courseRating: "Rating",
    courseBook: "Book Free Class",
    compareCourses: "Compare Programs",

    pricingTitle: "Affordable & Clear Tuition Plans",
    pricingSubtitle: "Select the plan that fits your family's budget, with absolute premium teaching quality.",
    month: "month",
    popular: "Most Popular",
    featuresIncluded: "Included in the plan:",

    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Find answers to the most common queries about our courses and enrollment.",

    footerDesc: "Bridging authentic Islamic heritage and modern technology for the global Somali diaspora.",
    newsletterTitle: "Academy Newsletter",
    newsletterDesc: "Subscribe to get tips, notifications, and newly launched courses.",
    placeholderEmail: "Enter your email here...",
    subscribeBtn: "Subscribe",
    subscribeSuccess: "Your email has been registered!",
    contactUs: "Contact Us",
    phoneLabel: "Phone",
    emailLabel: "Email"
  },
  ar: {
    brandName: "أكاديمية بارو",
    brandSub: "للقرآن",
    home: "الرئيسية",
    about: "من نحن",
    programs: "البرامج",
    teachers: "المعلمون",
    pricing: "الأسعار",
    certificates: "الشهادات",
    blog: "المدونة",
    contact: "اتصل بنا",
    studentLogin: "بوابة الطالب",
    teacherLogin: "بوابة المعلم",
    adminLogin: "الإدارة",
    joinNow: "سجل الآن",
    freeTrial: "احجز حصة مجانية",
    portals: "البوابات",
    events: "الفعاليات",
    careers: "الوظائف",
    donate: "تبرع",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",

    heroTitle: "تعلم القرآن الكريم واللغة العربية من",
    heroHighlight: "منزلك",
    heroSub: "منصة عالمية متميزة تقدم تعليماً إسلامياً عالي الجودة ومصمماً خصيصاً للجالية الصومالية حول العالم.",
    watchDemo: "شاهد حصة تجريبية",
    statsStudents: "طالب نشط",
    statsTeachers: "معلم خبير",
    statsHours: "ساعة تعليمية",
    statsRating: "تقييم الطلاب",

    benefitsTitle: "لماذا تختار أكاديميتنا؟",
    benefitsSubtitle: "نحن نقدم برامج تعليمية حديثة ومنهجية تناسب احتياجات عائلتك بالكامل.",
    benefit1Title: "معلمون خبراء",
    benefit1Desc: "معلمون ومعلمات متميزون من خريجي كبرى الجامعات الإسلامية يتحدثون الصومالية والعربية.",
    benefit2Title: "أوقات مرنة",
    benefit2Desc: "اختر الأوقات التي تناسب جدولك وجدول أطفالك على مدار الساعة طوال أيام الأسبوع.",
    benefit3Title: "دروس فردية (1-on-1)",
    benefit3Desc: "يحصل كل طالب على اهتمام كامل ومباشر من المعلم لضمان الفهم السريع والتقدم الملموس.",

    programsTitle: "برامجنا التعليمية المتميزة",
    programsSubtitle: "اختر من بين المناهج التعليمية المنهجية المعتمدة من كبار العلماء.",
    allPrograms: "جميع البرامج",
    quranMemorization: "تحفيظ القرآن الكرم",
    quranReading: "تلاوة القرآن الكريم",
    tajweed: "أحكام التجويد",
    arabicLanguage: "تعليم اللغة العربية",
    islamicStudies: "الدراسات الإسلامية",
    childrenPrograms: "برامج الأطفال",
    adultsPrograms: "برامج الكبار",
    oneToOneClasses: "دروس خاصة (1-on-1)",
    groupClasses: "دروس جماعية",
    courseLevel: "المستوى",
    courseRating: "التقييم",
    courseBook: "احجز درسك المجاني",
    compareCourses: "قارن بين البرامج",

    pricingTitle: "خطط تسعير ميسرة ومناسبة",
    pricingSubtitle: "اختر الخطة المناسبة لميزانية عائلتك مع ضمان أعلى مستويات الجودة التعليمية والمهنية.",
    month: "شهرياً",
    popular: "الأكثر طلباً",
    featuresIncluded: "تتضمن الخطة الميزات التالية:",

    faqTitle: "الأسئلة الشائعة والملحة",
    faqSubtitle: "اعثر على إجابات وافية ومفصلة لجميع استفساراتك حول البرامج والتسجيل.",

    footerDesc: "نجمع بين التراث الإسلامي الأصيل والتقنية الرقمية الحديثة لخدمة الصوماليين في جميع أنحاء العالم.",
    newsletterTitle: "النشرة الإخبارية",
    newsletterDesc: "اشترك معنا لتصلك أهم النصائح والمقالات التعليمية ومواعيد الحلقات.",
    placeholderEmail: "أدخل بريدك الإلكتروني هنا...",
    subscribeBtn: "اشترك الآن",
    subscribeSuccess: "تم تسجيل بريدك الإلكتروني بنجاح!",
    contactUs: "تواصل معنا",
    phoneLabel: "الهاتف",
    emailLabel: "البريد الإلكتروني"
  }
};

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ProgramExplorer from "./components/ProgramExplorer";
import Pricing from "./components/Pricing";
import Teachers from "./components/Teachers";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import VideoModal from "./components/VideoModal";
import StudentPortal from "./components/StudentPortal";
import TeacherPortal from "./components/TeacherPortal";
import AdminPortal from "./components/AdminPortal";
import CertificateVerify from "./components/CertificateVerify";
import HijriPrayerWidget from "./components/HijriPrayerWidget";
import LiveChat from "./components/LiveChat";
import BlogEventsCareers from "./components/BlogEventsCareers";
import GmailPortal from "./components/GmailPortal";
import { Language } from "./i18n";
import { Registration } from "./types";
import { Phone, Mail, MapPin, Send, CheckCircle, MessageSquare } from "lucide-react";
import { sendGmailMessage } from "./lib/gmailService";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { db } from "./lib/firebase";

export default function App() {
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("tajweed");
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem("bqa_registrations");
    return saved ? JSON.parse(saved) : [];
  });

  // Premium Route State
  const [currentRoute, setCurrentRoute] = useState<string>("home");

  // Advanced Interactive Multi-Language State
  const [lang, setLang] = useState<Language>("so");

  // Custom User Preferences Theme State (Simulated)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // Dynamic Page SEO Title and Description Updater based on Selected Route and Language
  useEffect(() => {
    let title = "";
    let desc = "";
    
    if (lang === "so") {
      if (currentRoute === "home") {
        title = "Baro Qur'aan Online | Dugsi Qur'aan, Tajwiid & Culuumta Shareecada";
        desc = "Baro Qur'aanka Kariimka ah Online si xirfad leh! Waxaan bixinaa barashada higaada, barashada tajwiidka, xifdinta Qur'aanka (Dugsi Qur'aan), luqadda Carabiga, iyo barashada kutubta culuumta shareecada islamka. Macalimiin Soomaaliyeed oo khubaro ah.";
      } else if (currentRoute === "programs") {
        title = "Koorsooyinka & Programyada | Baro Quran Academy";
        desc = "Baadh barnaamijyada aan bixino: Barashada Higaada, barashada tajwiidka, hifdiga Qur'aanka, barashada kutubta culuumta shareecada Islaamka iyo Carabiga. Dooro koorsada kugu habboon!";
      } else if (currentRoute === "pricing") {
        title = "Qorshaha Qiimaha & Lacagta | Baro Quran Academy";
        desc = "Qiimo jaban oo ku habboon qoys kasta. Ka xisaabi qiimo dhimista qoyska adigoo dooranaya tirada ardayda iyo maalmaha aad rabi lahayd inaad dhigato.";
      } else if (currentRoute === "teachers") {
        title = "Macalimiinta Sharafta leh | Baro Quran Academy";
        desc = "La kulan macalimiinteena khubarada ah ee u tababaran waxbarashada online-ka ah ee Qur'aanka iyo Culuumta Shareecada. Casharro gaar ah oo 1-on-1 ah.";
      } else if (currentRoute === "about") {
        title = "Ku saabsan Akadeemiyada | Baro Quran Academy";
        desc = "Wax ka baro hadafkayaga, aragtidayada, iyo sababta aan u nahay dugsiga online-ka ah ee ugu kalsoonida badan ee barashada Qur'aanka iyo Luqadda Carabiga.";
      } else if (currentRoute === "blog") {
        title = "Qoraallada & Maqaallada | Baro Quran Academy";
        desc = "Akhriso maqaallada ku saabsan barashada Qur'aanka, talooyinka xifdiga, muhiimada tajwiidka, iyo munaasabadaha diiniga ah.";
      } else {
        title = "Baro Qur'aan Online - Academy-ga Qur'aanka Kariimka";
        desc = "Baro Qur'aanka Kariimka ah Online si xirfad leh oo sahlan.";
      }
    } else if (lang === "ar") {
      if (currentRoute === "home") {
        title = "تعلم القرآن الكريم عبر الإنترنت | أكاديمية بارو للقرآن والعلوم الشرعية";
        desc = "تعلم القرآن الكريم عبر الإنترنت مع معلمين مجازين ذوي خبرة. نوفر دروس التجويد، حفظ القرآن، اللغة العربية، وعلوم الشريعة الإسلامية. حصص فردية تفاعلية.";
      } else if (currentRoute === "programs") {
        title = "البرامج والمسارات التعليمية | أكاديمية بارو للقرآن";
        desc = "استكشف برامجنا: القاعدة النورانية، التجويد، حفظ القرآن الكريم، علوم الشريعة الإسلامية، واللغة العربية.";
      } else if (currentRoute === "pricing") {
        title = "خطط الأسعار والاشتراكات | أكاديمية بارو للقرآن";
        desc = "خطط أسعار مرنة واقتصادية تناسب الجميع مع خصومات مميزة للمجموعات والعائلات.";
      } else if (currentRoute === "teachers") {
        title = "طاقم المعلمين والمعلمات | أكاديمية بارو للقرآن";
        desc = "نخبة من المعلمين المتميزين ذوي الخبرة الطويلة في تدريس القرآن والعلوم الإسلامية لغير الناطقين بها.";
      } else {
        title = "أكاديمية بارو لعلوم القرآن والشريعة";
        desc = "تعلم القرآن والعلوم الشرعية بطرق تفاعلية وعبر الإنترنت.";
      }
    } else { // en
      if (currentRoute === "home") {
        title = "Learn Quran Online | Baro Quran Academy - Tajweed & Islamic Studies";
        desc = "Learn the Holy Quran online professionally! We offer Arabic alphabet basics, Tajweed rules, Quran memorization, Arabic language, and Islamic Sharia books. Expert Somali teachers with personalized 1-on-1 sessions.";
      } else if (currentRoute === "programs") {
        title = "Our Programs & Courses | Baro Quran Academy";
        desc = "Explore our courses: Quran Memorization, Tajweed Rules, Arabic Language Basics, and Islamic Sharia Sciences. Find the perfect course for you or your kids!";
      } else if (currentRoute === "pricing") {
        title = "Affordable Study Plans & Pricing | Baro Quran Academy";
        desc = "Transparent pricing starting from $20/month. Estimate your customized group or family discount using our live pricing calculator!";
      } else if (currentRoute === "teachers") {
        title = "Meet Our Certified Teachers | Baro Quran Academy";
        desc = "Learn from qualified, experienced, and vetted instructors specializing in online Quranic teaching & Arabic instruction.";
      } else {
        title = "Baro Quran Academy | Learn Quran & Sharia Online";
        desc = "Premium online academy for Quran, Tajweed, Arabic language, and Islamic studies with flexible schedules.";
      }
    }

    document.title = title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = desc;
      document.head.appendChild(meta);
    }
  }, [currentRoute, lang]);

  // Dynamic CMS Settings State (No hardcoded text, edited in Admin Portal)
  const [cmsSettings, setCmsSettings] = useState({
    phone: "+251 999 451 777",
    email: "baroquranacademy1@gmail.com",
    address: "Hargeisa, Somaliland",
    tajweedPrice: "$25/Month"
  });

  const handleJoinClick = () => {
    setSelectedCourseId("tajweed");
    setIsRegOpen(true);
  };

  const handleJoinCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsRegOpen(true);
  };

  const handleWatchVideoClick = () => {
    setIsVideoOpen(true);
  };

  const handleRegistrationSubmit = (newReg: Registration) => {
    setRegistrations((prev) => {
      const updated = [...prev, newReg];
      localStorage.setItem("bqa_registrations", JSON.stringify(updated));
      return updated;
    });
    console.log("New registration saved:", newReg);
  };

  const handleUpdateCmsSettings = (newSettings: any) => {
    setCmsSettings((prev) => ({
      ...prev,
      ...newSettings
    }));
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName.trim() && contactEmail.trim() && contactMsg.trim()) {
      const currentName = contactName;
      const currentEmail = contactEmail;
      const currentMsg = contactMsg;

      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMsg("");

      // 1. Centralize form submissions in Firestore Database
      try {
        const submissionsCol = collection(db, "contact_submissions");
        await addDoc(submissionsCol, {
          name: currentName,
          email: currentEmail,
          message: currentMsg,
          createdAt: new Date().toISOString(),
          status: "new"
        });
        console.log("Centralized contact submission saved in Firestore.");
      } catch (dbErr) {
        console.error("Failed to save contact submission to Firestore database:", dbErr);
      }

      // 2. Fetch the dynamic Gmail token from Firestore to ensure any visitor can trigger the automatic emails
      let token = localStorage.getItem("gmail_access_token");
      let adminEmail = localStorage.getItem("gmail_user_email") || "baroquranacademy1@gmail.com";

      try {
        const configDoc = await getDoc(doc(db, "config", "gmail_auth"));
        if (configDoc.exists()) {
          const configData = configDoc.data();
          if (configData.accessToken) {
            token = configData.accessToken;
          }
          if (configData.adminEmail) {
            adminEmail = configData.adminEmail;
          }
        }
      } catch (configErr) {
        console.warn("Failed to retrieve dynamic token from Firestore, falling back to local session:", configErr);
      }

      if (token) {
        try {
          // 1. Send auto-reply confirmation to the user who sent the message
          const userSubject = `Fariintaada waa la helay - Baro Quran Academy ✉️`;
          const userBody = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; color: #1e293b;">
              <div style="background-color: #065f46; padding: 24px; text-align: center; color: #ffffff;">
                <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Baro Quran Academy</h2>
                <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Hoyga Barashada Diinteena Suuban</p>
              </div>
              <div style="padding: 32px 24px; text-align: left;">
                <h3 style="margin-top: 0; color: #0f172a; font-size: 18px;">Ku soo dhowow Akadeemiyada, ${currentName}!</h3>
                <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                  Assalamu Alaikum Warahmatullahi Wabarakatuh,<br/><br/>
                  Kusoo dhowow akadeemiyada, <strong>${currentName}</strong>, waad ku guulaysatay fariin u diristaada baro quran academy. Wax ka yar 6 saac teamkeena ayaa kula soo xidhiidhi doona WhatsApp si aan kaaga jawaabno faahfaahinta aad na weydiisay. Mahadsanid, kusoo dhawoow mar kale baro quran academy, hoyga barashada diinteena suuban.
                </p>
                <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #10b981; border-radius: 4px; font-size: 13px;">
                  <strong style="color: #065f46;">Fariintaadii:</strong><br/>
                  <p style="margin: 5px 0 0 0; color: #475569; font-style: italic;">"${currentMsg}"</p>
                </div>
              </div>
              <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                &copy; 2026 Baro Quran Academy. All rights reserved.
              </div>
            </div>
          `;
          await sendGmailMessage(token, currentEmail, userSubject, userBody);

          // 2. Send notification to admin/academy
          const adminSubject = `Fariin Cusub oo ka timid: ${currentName} ✉️`;
          const adminBody = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; color: #1e293b;">
              <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
                <h2 style="margin: 0; font-size: 20px; font-weight: bold;">Fariin Cusub oo ka timid Mareegta ✉️</h2>
              </div>
              <div style="padding: 24px; text-align: left;">
                <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Magaca:</strong></td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: bold;">${currentName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;"><strong>Email-ka:</strong></td>
                    <td style="padding: 8px 0; color: #1e293b; font-weight: bold; color: #0284c7;">${currentEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Fariinta:</strong></td>
                    <td style="padding: 8px 0; color: #1e293b; font-style: italic; background-color: #f8fafc; padding: 10px; border-radius: 6px;">${currentMsg}</td>
                  </tr>
                </table>
              </div>
            </div>
          `;
          await sendGmailMessage(token, adminEmail, adminSubject, adminBody);
        } catch (err) {
          console.error("Failed to send contact emails:", err);
        }
      }

      setTimeout(() => {
        setContactSuccess(false);
      }, 8000);
    }
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-emerald-800/10 selection:text-emerald-900 ${
        darkMode ? "bg-stone-950 text-stone-200" : "bg-stone-50 text-stone-800"
      }`}
    >
      {/* Dynamic Header */}
      <Header
        currentRoute={currentRoute}
        setRoute={setCurrentRoute}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onJoinClick={handleJoinClick}
      />

      {/* Main Content Router */}
      <div className="pt-20">
        {currentRoute === "home" && (
          <div className="animate-fade-in space-y-2">
            {/* Professional Hero Section */}
            <Hero
              onJoinClick={handleJoinClick}
              onWatchVideoClick={handleWatchVideoClick}
              lang={lang}
            />

            {/* Features (Core Benefits) */}
            <Features onJoinClick={handleJoinClick} />

            {/* Programs / Course Explorer with advanced filters & comparison tools */}
            <ProgramExplorer onJoinCourse={handleJoinCourse} lang={lang} />

            {/* Teachers Profile Area */}
            <Teachers onBookTrial={handleJoinCourse} onJoinClick={handleJoinClick} />

            {/* Pricing Section */}
            <Pricing onJoinClick={handleJoinClick} lang={lang} />

            {/* Testimonials Slider */}
            <Testimonials />
          </div>
        )}

        {currentRoute === "about" && (
          <BlogEventsCareers viewType="about" onBookClick={handleJoinClick} />
        )}

        {currentRoute === "programs" && (
          <ProgramExplorer onJoinCourse={handleJoinCourse} lang={lang} />
        )}

        {currentRoute === "pricing" && (
          <Pricing onJoinClick={handleJoinClick} lang={lang} />
        )}

        {currentRoute === "teachers" && (
          <Teachers onBookTrial={handleJoinCourse} />
        )}

        {currentRoute === "blog" && (
          <BlogEventsCareers viewType="blog" onBookClick={handleJoinClick} />
        )}

        {currentRoute === "gmail" && (
          <div className="py-12 bg-stone-50 text-stone-800 animate-fade-in">
            <GmailPortal lang={lang} />
          </div>
        )}

        {/* --- DYNAMIC CONTACT US ROUTE --- */}
        {currentRoute === "contact" && (
          <div className="py-24 bg-stone-50 text-stone-800 animate-fade-in" id="contact">
            <div className="max-w-4xl mx-auto px-4">
              <div className="text-center space-y-4 mb-16">
                <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-800/10 px-3.5 py-1.5 rounded-full inline-block">
                  {lang === "ar" ? "اتصل بنا" : lang === "en" ? "GET IN TOUCH" : "XIRIIRKA"} • 📞
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900">
                  {lang === "ar" ? "تواصل مع أكاديمية بارو" : lang === "en" ? "Contact Baro Quran Academy" : "Nagala Soo Xiriir Akadeemiyada"}
                </h2>
                <p className="font-sans text-stone-500 max-w-2xl mx-auto text-xs leading-relaxed">
                  {lang === "ar" ? "نحن هنا لمساعدتك في بدء رحلتك التعليمية المباركة. لا تتردد في الاتصال بنا." : lang === "en" ? "We are here to help you begin your blessed educational journey. Do not hesitate to contact us." : "Waxaan halkaan u joognaa inaan kugu caawino barashada Qur'aanka kariimka ah. Fadlan nagala soo xiriir wixii su'aalo ah."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Contact information card */}
                <div className="md:col-span-5 bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 shadow-sm space-y-6">
                  <h3 className="font-display font-bold text-sm text-stone-900 border-b border-stone-100 pb-3 uppercase tracking-wider text-emerald-800">
                    {lang === "ar" ? "معلومات الاتصال" : lang === "en" ? "Contact Info" : "Macluumaadka Xiriirka"}
                  </h3>

                  <div className="space-y-4">
                    <a
                      href="tel:+251999451777"
                      className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-stone-50 transition group text-left"
                    >
                      <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Taleefanka</h4>
                        <p className="text-xs font-bold text-stone-800 mt-0.5">{cmsSettings.phone}</p>
                        <p className="text-[9px] text-stone-400">Available 24/7</p>
                      </div>
                    </a>

                    <a
                      href="mailto:baroquranacademy1@gmail.com"
                      className="flex items-start gap-3.5 p-3 rounded-2xl hover:bg-stone-50 transition group text-left"
                    >
                      <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">E-mailka</h4>
                        <p className="text-xs font-bold text-stone-800 mt-0.5 break-all">{cmsSettings.email}</p>
                        <p className="text-[9px] text-stone-400">Response within 2 hours</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-3.5 p-3 rounded-2xl text-left">
                      <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-700 shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Xafiiska Guud</h4>
                        <p className="text-xs font-bold text-stone-800 mt-0.5">{cmsSettings.address}</p>
                        <p className="text-[9px] text-stone-400">Somaliland / Online Worldwide</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-150 text-[11px] text-amber-850 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <span>⚡ WhatsApp Quick Chat</span>
                    </p>
                    <p className="text-stone-600 font-normal leading-relaxed">
                      Wada-hadal toos ah oo degdeg ah, guji badanka live chat-ka ama naga soo wac taleefanka.
                    </p>
                  </div>
                </div>

                {/* Message Submission Form */}
                <div className="md:col-span-7 bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 shadow-sm">
                  <h3 className="font-display font-bold text-sm text-stone-900 mb-6 uppercase tracking-wider text-emerald-800 border-b border-stone-100 pb-3 text-left">
                    {lang === "ar" ? "أرسل لنا رسالة" : lang === "en" ? "Send us a Message" : "Fariin Toos ah Noo Soo Dir"}
                  </h3>

                  <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1.5">
                        {lang === "ar" ? "الاسم الكامل" : lang === "en" ? "Full Name" : "Magacaaga oo Buuxa"}
                      </label>
                      <input
                        id="contact-form-name"
                        type="text"
                        required
                        placeholder="e.g. Maxamed Cali"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1.5">
                        {lang === "ar" ? "البريد الإلكتروني" : lang === "en" ? "Email Address" : "Email-kaaga"}
                      </label>
                      <input
                        id="contact-form-email"
                        type="email"
                        required
                        placeholder="e.g. mohamed@example.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-600 block mb-1.5">
                        {lang === "ar" ? "الرسالة" : lang === "en" ? "Your Message" : "Fariintaada"}
                      </label>
                      <textarea
                        id="contact-form-message"
                        required
                        rows={4}
                        placeholder={lang === "ar" ? "كيف يمكننا مساعدتك؟" : lang === "en" ? "How can we help you?" : "Fadlan halkan ku qor su'aashaada ama faahfaahinta..."}
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                      />
                    </div>

                    <button
                      id="contact-submit-btn"
                      type="submit"
                      className="w-full rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white py-4 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-950/20"
                    >
                      <Send className="w-4 h-4" />
                      <span>{lang === "ar" ? "إرسال الرسالة" : lang === "en" ? "Send Message" : "Soo Dir Fariinta"}</span>
                    </button>
                  </form>

                  {contactSuccess && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center text-xs text-emerald-800 font-bold mt-4 space-y-2">
                      <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-5 h-5 text-emerald-700" />
                      </div>
                      <h4 className="font-display font-bold text-sm text-stone-900">Masha Allah!</h4>
                      <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                        Fariintaada si guul leh ayaa loo diray. Maamulka akadeemiyada waxay kula soo xiriiri doonaan email-kaaga dhowaan, Insha Allah!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer (Wired setRoute callback) */}
      <Footer setRoute={setCurrentRoute} />

      {/* Registration Modal Form */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        onSubmit={handleRegistrationSubmit}
        selectedCourseId={selectedCourseId}
      />

      {/* Video Modal Form */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        onJoinClick={handleJoinClick}
      />

      {/* Floating Interactive Live Chat and direct WhatsApp Trigger */}
      <LiveChat />
    </div>
  );
}

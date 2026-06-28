import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Globe, Sun, Moon, ChevronRight } from "lucide-react";
import { Language, translations } from "../i18n";

interface HeaderProps {
  currentRoute: string;
  setRoute: (route: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onJoinClick: () => void;
}

export default function Header({
  currentRoute,
  setRoute,
  lang,
  setLang,
  darkMode,
  setDarkMode,
  onJoinClick
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = translations[lang];

  // The 8 pages of the app
  const mainLinks = [
    { label: lang === "ar" ? "الرئيسية 🏠" : lang === "en" ? "Home 🏠" : "Hore 🏠", id: "home" },
    { label: lang === "ar" ? "البرامج 📖" : lang === "en" ? "Courses 📖" : "Koorsooyinka 📖", id: "programs" },
    { label: lang === "ar" ? "المعلمون 👨‍🏫" : lang === "en" ? "Teachers 👨‍🏫" : "Macalimiinta 👨‍🏫", id: "teachers" },
    { label: lang === "ar" ? "الأسعار 💰" : lang === "en" ? "Pricing 💰" : "Qiimaha 💰", id: "pricing" },
    { label: lang === "ar" ? "حصة تجريبية ⭐" : lang === "en" ? "Free Trial ⭐" : "Cashar Bilaash ⭐", id: "free-trial" },
    { label: lang === "ar" ? "المدونة 📝" : lang === "en" ? "Blog 📝" : "Maqaallada 📝", id: "blog" },
    { label: lang === "ar" ? "من نحن ℹ️" : lang === "en" ? "About Us ℹ️" : "Nagu Saabsan ℹ️", id: "about" },
    { label: lang === "ar" ? "اتصل بنا 📞" : lang === "en" ? "Contact 📞" : "Xiriirka 📞", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-stone-900/95 backdrop-blur-md shadow-lg shadow-black/20 py-3 border-b border-stone-850"
            : "bg-stone-950/40 backdrop-blur-sm border-b border-white/5 py-4"
        } text-white`}
        id="main-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Elegant Modern Islamic Logo */}
            <button
              id="header-logo-home-trigger"
              onClick={() => setRoute("home")}
              className="flex items-center gap-2.5 group text-left cursor-pointer border-none bg-transparent"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-2.5 text-white shadow-lg shadow-emerald-950/30 group-hover:scale-105 transition duration-300 border border-emerald-500/20 flex items-center justify-center">
                <div className="absolute inset-0 bg-stone-900/10 rounded-2xl" />
                <svg
                  className="w-5 h-5 text-amber-400 fill-none relative z-10 stroke-[2.2]"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-1.5-.3-3-.9-4.3l-2.4-1.2A3 3 0 0 0 15 6h-6a3 3 0 0 0-3.7.5L2.9 7.7A9 9 0 0 0 3 12a9 9 0 0 0 9 9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.5c0-.8-.7-1.5-1.5-1.5h-5c-.8 0-1.5.7-1.5 1.5M12 10v6M9 16h6" />
                </svg>
              </div>
              <div>
                <span className="font-display font-black text-base md:text-lg text-white tracking-tight block">
                  Baro Quran
                </span>
                <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase block -mt-1 font-mono">
                  ACADEMY
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-5">
              {mainLinks.map((link) => {
                const isActive = currentRoute === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => {
                      if (link.id === "free-trial") {
                        onJoinClick();
                      } else {
                        setRoute(link.id);
                      }
                    }}
                    className={`font-sans text-xs font-semibold hover:text-emerald-400 transition duration-150 relative py-2 cursor-pointer tracking-wide ${
                      isActive ? "text-emerald-400" : "text-stone-300"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Utility buttons (Lang switcher, dark/light toggle, Contact, Join CTA) */}
            <div className="hidden xl:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  id="lang-switcher-dropdown-trigger"
                  onClick={() => setShowLangMenu(!showLangMenu)}
                  className="rounded-lg border border-stone-850 hover:bg-stone-850 px-3 py-1.5 text-xs font-semibold text-stone-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="uppercase">{lang}</span>
                </button>

                <AnimatePresence>
                  {showLangMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-32 bg-stone-900 border border-stone-800 rounded-xl p-1.5 shadow-2xl"
                    >
                      {[
                        { id: "so", label: "Somali" },
                        { id: "en", label: "English" },
                        { id: "ar", label: "العربية" },
                      ].map((l) => (
                        <button
                          key={l.id}
                          id={`lang-opt-${l.id}`}
                          onClick={() => {
                            setLang(l.id as any);
                            setShowLangMenu(false);
                          }}
                          className={`w-full hover:bg-stone-800 rounded-lg py-1.5 px-3 text-xs font-semibold text-left block transition cursor-pointer ${
                            lang === l.id ? "text-amber-400" : "text-stone-300"
                          }`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Light/Dark Mode Switcher */}
              <button
                id="theme-toggle-btn"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-lg p-2 border border-stone-850 hover:bg-stone-850 transition text-stone-300 hover:text-white cursor-pointer"
                title="Toggle visual theme"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-300" />}
              </button>

              {/* Hotline */}
              <a
                href="tel:+251999451777"
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-300 hover:text-emerald-400 transition"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+251 999 451 777</span>
              </a>

              {/* Join Now button */}
              <button
                id="header-cta-free-trial"
                onClick={onJoinClick}
                className="rounded-full bg-emerald-700 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition shadow-lg shadow-emerald-950/40"
              >
                {t.freeTrial}
              </button>
            </div>

            {/* Mobile menu triggers */}
            <div className="flex xl:hidden items-center gap-2.5">
              {/* Language Quick-select */}
              <select
                id="mobile-lang-native-select"
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="bg-stone-900 text-[10px] font-bold border border-stone-800 rounded px-2 py-1 uppercase"
              >
                <option value="so">SO</option>
                <option value="en">EN</option>
                <option value="ar">AR</option>
              </select>

              <button
                id="mobile-theme-native-toggle"
                onClick={() => setDarkMode(!darkMode)}
                className="p-1 rounded bg-stone-900 border border-stone-800"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-300" />}
              </button>

              <button
                id="mobile-menu-drawer-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg p-1.5 border border-stone-800 text-stone-300 hover:bg-stone-800 hover:text-white"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 xl:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-stone-900 p-6 shadow-2xl flex flex-col overflow-y-auto justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-850">
                  <span className="font-display font-bold text-sm text-amber-400 uppercase tracking-widest">Baro Quran Academy</span>
                  <button
                    id="mobile-drawer-close-btn"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1 text-stone-400 hover:bg-stone-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {mainLinks.map((link) => (
                    <button
                      key={link.id}
                      id={`mobile-drawer-link-${link.id}`}
                      onClick={() => {
                        setIsOpen(false);
                        if (link.id === "free-trial") {
                          onJoinClick();
                        } else {
                          setRoute(link.id);
                        }
                      }}
                      className="flex items-center justify-between py-2 px-3 rounded-xl font-sans text-xs font-semibold text-stone-200 hover:bg-stone-800 hover:text-white transition text-left"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-500" />
                    </button>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 pt-6 border-t border-stone-850 mt-6">
                <a
                  href="tel:+251999451777"
                  className="flex items-center gap-2 justify-center py-2.5 rounded-xl border border-stone-850 text-xs font-semibold text-stone-300 hover:bg-stone-850 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>+251 999 451 777</span>
                </a>
                <button
                  id="mobile-drawer-join-now-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onJoinClick();
                  }}
                  className="w-full rounded-xl bg-emerald-700 py-3 font-bold text-white hover:bg-emerald-600 transition text-xs shadow-md"
                >
                  {t.freeTrial}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

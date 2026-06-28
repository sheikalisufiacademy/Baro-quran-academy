import React, { useState } from "react";
import { Phone, Mail, Send, Check, Facebook, Youtube, ShieldAlert, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FooterProps {
  setRoute: (route: string) => void;
}

export default function Footer({ setRoute }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Modals state
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-850" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-stone-800">
          {/* Column 1: Info */}
          <div className="md:col-span-4 space-y-5">
            <button
              onClick={() => setRoute("home")}
              className="flex items-center gap-2.5 group text-left cursor-pointer border-none bg-transparent"
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 p-2.5 text-white shadow-lg border border-emerald-500/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-amber-400 fill-none stroke-[2.2]"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 0 0 9-9c0-1.5-.3-3-.9-4.3l-2.4-1.2A3 3 0 0 0 15 6h-6a3 3 0 0 0-3.7.5L2.9 7.7A9 9 0 0 0 3 12a9 9 0 0 0 9 9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11.5c0-.8-.7-1.5-1.5-1.5h-5c-.8 0-1.5.7-1.5 1.5M12 10v6M9 16h6" />
                </svg>
              </div>
              <div>
                <span className="font-display font-black text-base text-white tracking-tight block">
                  Baro Quran
                </span>
                <span className="text-[10px] text-amber-400 font-bold tracking-widest uppercase block -mt-1 font-mono">
                  ACADEMY
                </span>
              </div>
            </button>

            <p className="font-sans text-xs text-stone-400 leading-relaxed max-w-sm">
              Ku baro Qur'aanka kariimka ah, barashada Tajwiidka, Luqadda Carabiga iyo Culuumta Shareecada si casri ah oo ku habboon baahida qoyskaaga adigoo jooga gurigaaga.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <a
                href="tel:+251999451777"
                className="flex items-center gap-2.5 text-stone-400 hover:text-emerald-400 transition"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+251 999 451 777</span>
              </a>

              <a
                href="mailto:baroquranacademy1@gmail.com"
                className="flex items-center gap-2.5 text-stone-400 hover:text-emerald-400 transition"
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>baroquranacademy1@gmail.com</span>
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-800/80 p-2 text-stone-400 hover:bg-emerald-800 hover:text-white transition"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-800/80 p-2 text-stone-400 hover:bg-emerald-800 hover:text-white transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-100 tracking-wide uppercase text-amber-400">
              Koorsooyinka
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setRoute("programs")} className="hover:text-emerald-400 transition text-left cursor-pointer">
                  📖 Barashada Tajwiidka
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("programs")} className="hover:text-emerald-400 transition text-left cursor-pointer">
                  📖 Luqadda Carabiga
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("programs")} className="hover:text-emerald-400 transition text-left cursor-pointer">
                  📖 Culuumta Fiqiga
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("programs")} className="hover:text-emerald-400 transition text-left cursor-pointer">
                  📖 Barnaamijka Carruurta
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Academy (Fully Functional Links) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-100 tracking-wide uppercase text-amber-400">
              Machadka
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setRoute("about")} className="hover:text-emerald-400 transition text-left cursor-pointer">
                  ℹ️ Nagu Saabsan (About Us)
                </button>
              </li>
              <li>
                <button onClick={() => setShowPrivacy(true)} className="hover:text-emerald-400 transition text-left cursor-pointer">
                  🛡️ Policy Privacy (Xogta)
                </button>
              </li>
              <li>
                <button onClick={() => setShowTerms(true)} className="hover:text-emerald-400 transition text-left cursor-pointer">
                  📜 Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setRoute("contact")} className="hover:text-emerald-400 transition text-left cursor-pointer text-emerald-400 font-bold">
                  📞 Nagala Soo Xiriir
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-100 tracking-wide uppercase text-amber-400">
              Wargeyska
            </h4>
            <p className="font-sans text-xs text-stone-400 leading-relaxed">
              Ku qor email-kaaga si aad u hesho talooyin diini ah, casharo iyo barnaamijyo cusub.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                id="footer-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Geli email-kaaga..."
                required
                className="w-full rounded-xl bg-stone-800 border border-stone-700/60 p-3.5 pr-12 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-600"
              />

              <button
                id="footer-email-submit-btn"
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-700 p-2 text-white hover:bg-emerald-600 transition cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <AnimatePresence>
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs text-emerald-400 font-semibold"
                >
                  <Check className="w-4 h-4" />
                  <span>Masha Allah! Email-kaaga waa la diiwaan-geliyey.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-[11px] text-stone-500 space-y-4 md:space-y-0">
          <p>© 2026 Baro Quran Academy. Dhammaan xuquuqda waa ilaalin.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-400">
              <span>Machad caalami ah oo lagu kalsoon yahay</span>
              <span className="text-amber-500">★</span>
            </span>
          </div>
        </div>
      </div>

      {/* --- PRIVACY POLICY MODAL --- */}
      <AnimatePresence>
        {showPrivacy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrivacy(false)}
              className="fixed inset-0 bg-stone-950/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative z-10 border border-stone-200 text-stone-800 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-display font-black text-base text-stone-900 uppercase">Privacy Policy • Xeerka Ilaalinta Xogta</h3>
                </div>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 text-xs text-stone-600 leading-relaxed font-sans">
                <div>
                  <h4 className="font-bold text-stone-950 text-sm mb-1">1. Xogta aan ururino (Data we collect)</h4>
                  <p>
                    Waxaan ururinaa macluumaadka aad na siiso marka aad iska diiwaangelinayso akadeemiyada sida magacaaga, email-kaaga, taleefankaaga, iyo heerkaaga aqooneed ee Qur'aanka. Tani waxay noo sahleysaa inaan kuu doorno macalinka kuugu habboon.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-950 text-sm mb-1">2. Sida aan u isticmaalno xogtaada (How we use your data)</h4>
                  <p>
                    Macluumaadkaaga gaarka ah waxaa loo isticmaalaa oo kaliya ujeeddooyinka waxbarasho ee Baro Quran Academy. Waligood xogtaada lama iibin doono, lamana wadaagi doono cid saddexaad oo dibadda ah iyada oo aan oggolaansho laga helin.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-950 text-sm mb-1">3. Amniga Casharada iyo Duubista (Session Security & Recording)</h4>
                  <p>
                    Dhammaan casharada 1-on-1 waa kuwo qarsoodi ah oo ammaan ah. Waxaan isticmaalnaa habab sir ah (encryption) si loo ilaaliyo xogta wada-hadalka iyo muuqaallada u dhaxeeya macalinka iyo ardayga.
                  </p>
                </div>
                <div className="bg-emerald-50 text-emerald-850 p-4 rounded-2xl font-medium">
                  Haddii aad qabto wax su'aalo ah oo ku saabsan xeerka ilaalinta xogta gaarka ah, fadlan nagala soo xiriir email: <strong>baroquranacademy1@gmail.com</strong>.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- TERMS OF SERVICE MODAL --- */}
      <AnimatePresence>
        {showTerms && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTerms(false)}
              className="fixed inset-0 bg-stone-950/85 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative z-10 border border-stone-200 text-stone-800 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-stone-100 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-display font-black text-base text-stone-900 uppercase">Terms of Service • Shuruudaha Adeegga</h3>
                </div>
                <button
                  onClick={() => setShowTerms(false)}
                  className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-900 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 text-xs text-stone-600 leading-relaxed font-sans">
                <div>
                  <h4 className="font-bold text-stone-950 text-sm mb-1">1. Diiwaangelinta iyo Ka qeybgalka (Enrollment & Attendance)</h4>
                  <p>
                    Arday kasta oo iska diiwaangeliya Baro Quran Academy waa inuu ixtiraamaa waqtiyada loo qorsheeyay casharada. Hadii aad u baahato inaad baajiso ama beddesho waqtiga darsiga, waa inaad ogeysiisaa macalinka ugu yaraan 12 saacadood ka hor.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-950 text-sm mb-1">2. Habdhaqanka iyo Anshaxa (Code of Conduct)</h4>
                  <p>
                    Waxaan dhiirigelineynaa jawi waxbarasho oo ku dhisan asluub, xushmad, iyo qaddarin u dhaxeysa ardayga iyo macalinka. Wax habdhaqan ah oo ka baxsan anshaxa Islaamka lagama aqbali doono madashan.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-stone-950 text-sm mb-1">3. Bixinta Khidmadaha (Payment Policy)</h4>
                  <p>
                    Khidmadaha bishii waxaa la bixiyaa bilowga bisha kasta. Ma jiraan wax khidmad ah oo dib loo celinayo (refunds) marka casharadu si guul leh u bilowdaan.
                  </p>
                </div>
                <div className="bg-amber-50 text-amber-850 p-4 rounded-2xl font-medium">
                  Markaad iska diiwaangeliso madashayada, waxaad si buuxda u aqbashay shuruudahan kor ku xusan.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}

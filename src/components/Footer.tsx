import React, { useState } from "react";
import { Phone, Mail, Send, Check, Facebook, Youtube, BookOpen, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000); // Reset success state after 5s
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 border-t border-stone-800" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-stone-800">
          {/* Column 1: Info (4 cols) */}
          <div className="md:col-span-4 space-y-5">
            <a href="#home" className="flex items-center gap-2 group inline-block">
              <div className="rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 p-2.5 text-white shadow-md shadow-emerald-950/40 group-hover:scale-105 transition duration-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white tracking-tight block">
                  Baro Quran
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase block -mt-1">
                  Academy
                </span>
              </div>
            </a>

            <p className="font-sans text-xs text-stone-400 leading-relaxed max-w-sm">
              Bridging tradition and digital excellence in Islamic education for the Somali community worldwide.
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
            <div className="flex items-center gap-3 pt-3">
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

          {/* Column 2: Courses links (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-100 tracking-wide">
              Koorsooyinka
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "Tajweed", href: "#courses" },
                { label: "Arabic Language", href: "#courses" },
                { label: "Fiqh", href: "#courses" },
                { label: "Hadith", href: "#courses" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-emerald-400 transition duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Academy links (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-100 tracking-wide">
              Academy
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: "About Us", href: "#about" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Contact", href: "tel:+251999451777" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-emerald-400 transition duration-150">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact/Newsletter (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-display font-bold text-sm text-stone-100 tracking-wide">
              Nagala soo xiriir
            </h4>
            <p className="font-sans text-xs text-stone-400 leading-relaxed">
              Ku qor email-kaaga si aad u hesho wararkii ugu dambeeyay.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input
                id="newsletter-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Geli email-kaaga..."
                required
                className="w-full rounded-xl bg-stone-800 border border-stone-700/60 p-3.5 pr-12 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-600"
              />

              <button
                id="newsletter-submit-btn"
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-700 p-2 text-white hover:bg-emerald-600 transition"
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
                  <span>Email-kaaga waa la diiwaan-geliyey!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-[11px] text-stone-500 space-y-4 md:space-y-0">
          <p>© 2024 Baro Quran Academy. Bridging tradition and digital excellence.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300 transition">Somali Community Program</a>
            <span className="text-stone-700">|</span>
            <span className="flex items-center gap-1">
              <span>Made with care</span>
              <span className="text-amber-500 font-bold">♥</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import { motion } from "motion/react";
import { PlayCircle, ArrowRight, Sparkles, Star, ShieldCheck, Heart } from "lucide-react";

interface HeroProps {
  onJoinClick: () => void;
  onWatchVideoClick: () => void;
}

export default function Hero({ onJoinClick, onWatchVideoClick }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-stone-50 via-amber-50/10 to-stone-50 islamic-pattern"
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-emerald-100/30 blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-amber-100/20 blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column (7 cols on large screens) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/80 text-emerald-800 text-xs font-semibold tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Machad Caalami ah oo ku habboon Baahidaada</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-tight"
            >
              Waxbarasho <span className="text-emerald-800 relative inline-block">
                Tayo Leh
                <span className="absolute bottom-1 left-0 w-full h-2 bg-amber-500/20 rounded -z-10" />
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif text-xl sm:text-2xl text-stone-800 italic font-medium"
            >
              Baro Qur'aanka iyo Culuumta Shareecada si Casri ah.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-stone-600 max-w-xl leading-relaxed text-base"
            >
              Baro Quran Academy waa Machad Caalami ah oo kuu diyaariyey barayaal khibrad leh iyo manhaj tayo sare leh oo ku habboon baahidaada.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="hero-join-btn"
                onClick={onJoinClick}
                className="inline-flex items-center gap-2 rounded-full bg-emerald-800 px-8 py-4 text-base font-bold text-white hover:bg-emerald-700 transition duration-150 shadow-lg shadow-emerald-900/20 hover:shadow-xl hover:-translate-y-0.5 transform cursor-pointer"
              >
                <span>Ku biir Hadda</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="hero-watch-btn"
                onClick={onWatchVideoClick}
                className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/60 px-8 py-4 text-base font-bold text-stone-800 hover:bg-white hover:text-emerald-800 transition duration-150 shadow-sm hover:shadow-md cursor-pointer"
              >
                <PlayCircle className="w-5 h-5 text-emerald-800" />
                <span>Daawo Muqaalka</span>
              </button>
            </motion.div>

            {/* Micro proof stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-6 border-t border-stone-100"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-stone-200 overflow-hidden flex items-center justify-center text-[10px] font-bold text-stone-600"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-xs">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                    <span className="font-bold text-stone-800 ml-1">4.9/5</span>
                  </div>
                  <span className="text-stone-500">Arday aad u qanacsan</span>
                </div>
              </div>

              <div className="h-6 w-px bg-stone-200 hidden sm:block" />

              <div className="flex items-center gap-2 text-stone-600 text-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span>100% Macalimiin shahaado haysta</span>
              </div>
            </motion.div>
          </div>

          {/* Right Image/Visual Column (5 cols on large screens) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full max-w-sm"
            >
              {/* Decorative back plate */}
              <div className="absolute inset-0 rounded-3xl bg-emerald-800/5 rotate-3 -z-10" />

              {/* Main premium vector-like frame */}
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-stone-100/50 relative overflow-hidden">
                {/* Visual card content representing virtual study */}
                <div className="space-y-4">
                  {/* Top bar */}
                  <div className="flex justify-between items-center text-stone-400 text-[10px] font-mono">
                    <span>QURAN STUDY PLATFORM</span>
                    <span className="text-emerald-700 font-bold">● ONLINE</span>
                  </div>

                  {/* Elegant decorative Islamic arch silhouette or abstract container */}
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-6 flex flex-col justify-between text-white relative overflow-hidden group">
                    {/* Pattern overlays */}
                    <div className="absolute inset-0 bg-stone-900/10 mix-blend-overlay islamic-pattern" />

                    <div className="flex justify-between items-start z-10">
                      <div className="bg-white/10 px-2.5 py-1 rounded text-[10px] font-semibold tracking-wide backdrop-blur-sm">
                        Live Class
                      </div>
                      <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                    </div>

                    <div className="space-y-1.5 z-10 text-right">
                      <p className="font-serif text-3xl leading-relaxed font-bold tracking-wide text-amber-100">
                        وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
                      </p>
                      <p className="text-[9px] text-stone-300 italic">
                        "And recite the Qur'an with measured recitation."
                      </p>
                    </div>
                  </div>

                  {/* Study widget */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 font-semibold text-xs">
                        Taj
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-xs text-stone-800">
                          Barashada Tajwiidka
                        </h4>
                        <p className="text-[10px] text-stone-400">Heerka Bilaabaha (Class 1)</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      $25/M
                    </span>
                  </div>

                  {/* Review snippet */}
                  <div className="flex items-center gap-3 text-stone-500 text-[11px] bg-stone-50/50 p-3 rounded-2xl border border-stone-100/50">
                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-[9px] font-bold text-white">
                      A
                    </div>
                    <span className="italic">"Macalimiintu waa kuwo aad u Samir badan..."</span>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-amber-500 text-stone-900 font-bold text-xs px-4 py-2.5 rounded-2xl shadow-lg flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 fill-stone-900 text-stone-900" />
                <span>Casri ah!</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

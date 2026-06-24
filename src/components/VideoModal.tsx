import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Play, Pause, Monitor, Mic, Volume2, Users, Check, Sparkles } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinClick: () => void;
}

export default function VideoModal({ isOpen, onClose, onJoinClick }: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeRule, setActiveRule] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Simulated audio progress timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const tajweedRules = [
    {
      id: "qalqalah",
      name: "Qalqalah (Echo)",
      ayyah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      explanation: "Haddii mid ka mid ah xarfaha Qalqalah (ق, ط, ب, ج, د) uu reebanyahay, waxaa la ruxaa codka xilliga lagu dhawaaqayo.",
      highlightWord: "الرَّحِيمِ"
    },
    {
      id: "ghunnah",
      name: "Ghunnah (Nasalization)",
      ayyah: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      explanation: "U soo saarista codka sanka dhexdiisa muddo dhan 2 xarakat markaad ku dhawaaqayso Nuun-ka ama Miim-ka leh Shaddada.",
      highlightWord: "الْخَنَّاسِ"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 text-white shadow-2xl flex flex-col md:flex-row"
            id="video-modal-content"
          >
            {/* Classroom Screen (Left Side / 65% width) */}
            <div className="flex-1 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-800">
              {/* Classroom header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-stone-300">DEMO FASALKA ACADEMY-GA (LIVE)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-400 bg-stone-800 px-2.5 py-1 rounded-full">
                  <Users className="w-3.5 h-3.5 text-emerald-500" />
                  <span>1-on-1 Cashar gaar ah</span>
                </div>
              </div>

              {/* Whiteboard Area */}
              <div className="flex-1 bg-stone-950 rounded-xl border border-stone-800 p-6 flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden">
                <div className="absolute top-3 left-3 bg-stone-900 px-2.5 py-1 rounded text-[10px] font-mono text-emerald-500 flex items-center gap-1">
                  <Monitor className="w-3.5 h-3.5" />
                  Whiteboard
                </div>

                {/* Arabic Script display */}
                <div className="text-center space-y-4">
                  <motion.p 
                    animate={{ scale: isPlaying ? [1, 1.02, 1] : 1 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-4xl md:text-5xl font-serif text-amber-100 leading-relaxed text-right dir-rtl tracking-wide"
                  >
                    بِسْمِ اللَّهِ <span className="text-emerald-500 underline decoration-amber-500/30 decoration-wavy">الرَّحْمَٰنِ</span> الرَّحِيمِ
                  </motion.p>
                  <p className="text-stone-400 text-xs italic">
                    "In the name of Allah, the Most Gracious, the Most Merciful"
                  </p>
                </div>

                {/* Animated soundwave bars when simulated audio is playing */}
                <div className="absolute bottom-4 right-4 flex items-end gap-1 h-6">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: isPlaying 
                          ? [8, Math.random() * 24 + 8, 8]
                          : 4
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + i * 0.1,
                        ease: "easeInOut"
                      }}
                      className="w-1 bg-emerald-500 rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Video control bar */}
              <div className="mt-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  {/* Play/Pause Button */}
                  <button
                    id="play-pause-demo-btn"
                    onClick={handlePlayToggle}
                    className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 px-4 py-2 rounded-xl text-xs font-semibold transition"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-white" /> Pause Recitation
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" /> Dhageyso Akhrinta
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-3 text-stone-400">
                    <Mic className="w-4 h-4 text-emerald-500" />
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

                {/* Custom Audio Progress Bar */}
                <div className="w-full bg-stone-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-150" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Explanations & Sidebar (Right Side / 35% width) */}
            <div className="w-full md:w-[320px] p-6 bg-stone-900/60 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-display font-bold text-stone-200">Sidee Wax Barashadu Tahay?</h4>
                  <button
                    id="close-video-modal"
                    onClick={onClose}
                    className="md:hidden rounded-full p-1 text-stone-400 hover:bg-stone-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-xs text-stone-400 leading-relaxed mb-4">
                  Waxaan isticmaalnaa hababka ugu casrisan ee internetka si aad u barato Qur'aanka iyo diinta adigoo jooga gurigaaga.
                </p>

                {/* Features Checklist */}
                <div className="space-y-3 mb-6">
                  {[
                    "1-on-1 Live Class (Adiga iyo Macalinka kaliya)",
                    "Wada hadal toos ah iyo sixitaan degdeg ah",
                    "Aalado maqal iyo muuqaal aad u tayo sareeya",
                    "La soco horumarkaaga iyo dhibcahaaga"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <div className="mt-0.5 rounded-full bg-emerald-500/10 p-0.5 text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-stone-300">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Tajweed Explorer inside Demo */}
                <div className="border-t border-stone-800 pt-4 space-y-2">
                  <span className="text-[10px] font-bold text-amber-500 tracking-wider uppercase block">
                    Interactive Lesson Sample
                  </span>
                  <div className="space-y-2">
                    {tajweedRules.map((rule) => (
                      <button
                        key={rule.id}
                        type="button"
                        onClick={() => setActiveRule(activeRule === rule.id ? null : rule.id)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition ${
                          activeRule === rule.id
                            ? "bg-stone-800 border-amber-500/40 text-white"
                            : "bg-stone-950/40 border-stone-800 text-stone-400 hover:bg-stone-800/40"
                        }`}
                      >
                        <div className="flex justify-between items-center font-medium">
                          <span>{rule.name}</span>
                          <span className="text-amber-500 font-serif">{rule.highlightWord}</span>
                        </div>
                        {activeRule === rule.id && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-[11px] text-stone-400 leading-relaxed"
                          >
                            {rule.explanation}
                          </motion.p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-6 space-y-3">
                <button
                  id="demo-join-now-btn"
                  onClick={() => {
                    onClose();
                    onJoinClick();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-700 to-emerald-800 py-3 rounded-xl font-medium text-xs text-white hover:opacity-95 transition shadow-lg shadow-emerald-950/20"
                >
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  Ku biir Class-ka Hadda
                </button>
                <button
                  id="close-demo-panel-btn"
                  onClick={onClose}
                  className="w-full text-center text-xs text-stone-400 hover:text-white transition font-medium"
                >
                  Xir Daawashada
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

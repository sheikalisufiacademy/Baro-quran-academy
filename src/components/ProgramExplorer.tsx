import React, { useState } from "react";
import { Search, SlidersHorizontal, ArrowRight, ShieldCheck, Clock, BookOpen, Star, Plus, Check, X, Calendar, UserCheck, Sparkles, Award } from "lucide-react";
import { Course } from "../types";
import { COURSES } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../i18n";

interface ProgramExplorerProps {
  onJoinCourse: (courseId: string) => void;
  lang: Language;
}

const ENHANCED_PROGRAMS = COURSES;

const COMPARISON_SPECS = [
  { key: "target", label: "Ardayda (Target Audience)", values: { higaada: "Carruurta & Dadka waaweyn", "quran-memorization": "Dhammaan Da'da", "arabic-6m": "Dadka waaweyn & Dhalinyarada", fiqh: "Dhammaan Da'da", hadith: "Dhammaan Da'da", "caqiidada-barashada": "Dhammaan Da'da", tafseer: "Dhammaan Da'da", caqiidada: "Dhammaan Da'da", somali: "Dhammaan Da'da" } },
  { key: "method", label: "Habka (Methodology)", values: { higaada: "1-on-1 / Group", "quran-memorization": "1-on-1 Private", "arabic-6m": "1-on-1 / Group", fiqh: "Group Classes", hadith: "Group / Private", "caqiidada-barashada": "Group Classes", tafseer: "Interactive Lectures", caqiidada: "Group Classes", somali: "1-on-1 / Group" } },
  { key: "curriculum", label: "Manhajka (Syllabus)", values: { higaada: "Qaacida Nuuraaniyah", "quran-memorization": "Al-Azhar Standard", "arabic-6m": "Madinah Books", fiqh: "Shafi'i Jurisprudence", hadith: "Arbaciinka Al-Nawawi", "caqiidada-barashada": "Tawxiidka & Iimaanka", tafseer: "Tafsiirka Quraanka", caqiidada: "Kutubta Caqiidada", somali: "Naxwaha & Higaada Somaliga" } },
  { key: "certificate", label: "Shahaado (Certificate)", values: { higaada: "Haa (Yes)", "quran-memorization": "Haa (Ijaza Option)", "arabic-6m": "Haa (Yes)", fiqh: "Haa (Yes)", hadith: "Haa (Yes)", "caqiidada-barashada": "Haa (Yes)", tafseer: "Haa (Yes)", caqiidada: "Haa (Yes)", somali: "Haa (Yes)" } },
];

export default function ProgramExplorer({ onJoinCourse, lang }: ProgramExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "quran" | "islamic" | "language">("all");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(["higaada", "quran-memorization"]);
  const [showComparison, setShowComparison] = useState(false);
  const [activeDetailCourse, setActiveDetailCourse] = useState<Course | null>(null);

  const filteredPrograms = ENHANCED_PROGRAMS.filter((p) => {
    // Search query match
    const titleMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!titleMatch) return false;

    // Category filter
    if (activeCategory === "all") return true;
    if (activeCategory === "quran") return p.id.includes("quran") || p.id === "higaada";
    if (activeCategory === "islamic") return p.id === "fiqh" || p.id === "hadith" || p.id.includes("caqiidada") || p.id === "tafseer";
    if (activeCategory === "language") return p.id.includes("arabic") || p.id === "somali";

    return true;
  });

  const toggleCompare = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent opening details modal when clicking compare
    if (selectedForCompare.includes(courseId)) {
      setSelectedForCompare(selectedForCompare.filter((id) => id !== courseId));
    } else {
      if (selectedForCompare.length >= 3) {
        alert("Waxaad comparesiayn kartaa ilaa 3 koorso mar qura.");
        return;
      }
      setSelectedForCompare([...selectedForCompare, courseId]);
    }
  };

  const handleCardClick = (course: Course) => {
    setActiveDetailCourse(course);
  };

  return (
    <section className="py-24 bg-stone-50 text-stone-800" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 tracking-widest uppercase bg-emerald-800/10 dark:bg-emerald-400/10 px-3.5 py-1.5 rounded-full inline-block">
            MUNAHAJKA • CURRICULUM
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Koorsooyinka Akadeemiyada
          </h2>
          <p className="font-sans text-stone-500 max-w-2xl mx-auto text-xs leading-relaxed">
            Nala baro Qur'anka kariimka iyo culuumta shareecada Islaamka adoo gurigaaga jooga qaab online oo casri ah. Guji koorso kasta si aad u aragto faahfaahinta iyo qiimaha!
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-4 mb-10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="program-search-input"
              type="text"
              placeholder="Raadi koorsada aad rabto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-700/30 focus:border-emerald-600"
            />
          </div>

          {/* Quick Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "Dhamaan Koorsooyinka" },
              { id: "quran", label: "Qur'aanka & Higaada" },
              { id: "islamic", label: "Culuumta Shareecada" },
              { id: "language", label: "Luqadaha (Languages)" },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`filter-tab-${tab.id}`}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  activeCategory === tab.id
                    ? "bg-emerald-800 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Compare Program Button indicator */}
          <button
            id="compare-programs-modal-trigger"
            onClick={() => setShowComparison(!showComparison)}
            className={`rounded-xl px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              showComparison
                ? "bg-amber-500 text-stone-950"
                : "bg-stone-900 text-white hover:bg-stone-800"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Isbarbardhig ({selectedForCompare.length})</span>
          </button>
        </div>

        {/* Comparison Board if open */}
        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-stone-900 text-white rounded-3xl p-6 border border-amber-500/20 mb-12 overflow-hidden shadow-xl"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <div>
                  <h3 className="font-display font-bold text-base text-amber-400">
                    Isbarbardhiga Koorsooyinka
                  </h3>
                  <p className="text-xs text-stone-400">
                    Isbarbardhig heerarka, manhajka, iyo shuruudaha koorsooyinka kala duwan.
                  </p>
                </div>
                <button
                  id="close-compare-board-btn"
                  onClick={() => setShowComparison(false)}
                  className="text-xs font-bold text-stone-400 hover:text-white transition"
                >
                  Xir [x]
                </button>
              </div>

              {selectedForCompare.length === 0 ? (
                <div className="text-center py-8 text-xs text-stone-400">
                  Fadlan dooro ugu yaraan 1 ama 2 koorso adigoo gujinaya "Compare" si aad halkan uga aragto.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="py-3 font-semibold text-white w-1/4 font-display">Koorsooyinka & Tilmaamaha</th>
                        {selectedForCompare.map((id) => {
                          const courseObj = ENHANCED_PROGRAMS.find((p) => p.id === id);
                          return (
                            <th key={id} className="py-3 font-bold text-amber-300 text-center capitalize">
                              {courseObj?.title.split(" (")[0]}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {COMPARISON_SPECS.map((spec) => (
                        <tr key={spec.key}>
                          <td className="py-3.5 font-semibold text-stone-400">{spec.label}</td>
                          {selectedForCompare.map((id) => (
                            <td key={id} className="py-3.5 text-center font-medium">
                              {spec.values[id as keyof typeof spec.values] || "N/A"}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr className="border-t border-white/10">
                        <td className="py-4"></td>
                        {selectedForCompare.map((id) => (
                          <td key={id} className="py-4 text-center">
                            <button
                              id={`comparison-cta-btn-${id}`}
                              onClick={() => onJoinCourse(id)}
                              className="rounded-lg bg-emerald-700 hover:bg-emerald-600 px-4 py-2 text-[10px] font-bold text-white transition inline-flex items-center gap-1 shadow-md shadow-emerald-950/40 cursor-pointer"
                            >
                              <span>{lang === "ar" ? "سجل الآن" : lang === "en" ? "Register Now" : "Isdiwaan Gali"}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Cards Grid */}
        {filteredPrograms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200/50 p-12 text-center text-stone-500 text-xs">
            Wax koorsooyin ah oo u dhigma raadintaada lama helin. Fadlan dib u tijaabi.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPrograms.map((p, idx) => {
              const isSelectedForCompare = selectedForCompare.includes(p.id);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => handleCardClick(p)}
                  className="bg-white rounded-3xl border border-stone-200/60 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-emerald-800/30 group relative transition duration-300 cursor-pointer"
                >
                  {/* Course Image Cover */}
                  <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
                    
                    {/* Interaction Indicator badge */}
                    <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1 text-[9px] font-bold text-stone-850 shadow-sm uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-emerald-700 animate-pulse" />
                      Guji faahfaahinta
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="rounded-xl bg-emerald-50 text-emerald-800 p-2.5 border border-emerald-100 -mt-11 relative z-10 shadow-lg shadow-emerald-950/10">
                        <BookOpen className="w-4 h-4" />
                      </div>

                      {/* Compare toggle in card */}
                      <button
                        id={`card-compare-chk-${p.id}`}
                        onClick={(e) => toggleCompare(p.id, e)}
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition flex items-center gap-1 relative z-10 -mt-10 ${
                          isSelectedForCompare
                            ? "bg-amber-500 text-stone-950"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {isSelectedForCompare ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>Isbarbardhig</span>
                      </button>
                    </div>

                    <h3 className="font-display font-extrabold text-base text-stone-900 tracking-tight leading-tight group-hover:text-emerald-800 transition">
                      {p.title}
                    </h3>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mt-0.5">
                      {p.subTitle}
                    </p>

                    <p className="font-sans text-stone-500 text-xs leading-relaxed mt-3 mb-4 line-clamp-2">
                      {p.description}
                    </p>

                    {/* Syllabus Highlights */}
                    <div className="space-y-3 pt-2 border-t border-stone-100">
                      <div className="space-y-1">
                        {p.levelDetails.slice(0, 1).map((lvl, lIdx) => (
                          <div key={lIdx} className="bg-stone-50/50 rounded-xl p-2.5 border border-stone-100">
                            <span className="text-[9px] font-bold text-stone-700 block mb-1">
                              {lvl.level}
                            </span>
                            <ul className="space-y-1">
                              {lvl.topics.slice(0, 2).map((tpc, tIdx) => (
                                <li key={tIdx} className="text-[10px] text-stone-500 flex items-start gap-1.5">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{tpc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Enroll Button / Trigger details */}
                  <div className="p-6 pt-0 mt-auto">
                    <button
                      id={`enroll-program-btn-${p.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onJoinCourse(p.id);
                      }}
                      className="w-full rounded-xl bg-stone-900 hover:bg-emerald-800 text-white py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>{lang === "ar" ? "سجل الآن" : lang === "en" ? "Register Now" : "Isdiwaan Gali"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* --- RICH COURSE INTERACTIVE DETAIL MODAL --- */}
      <AnimatePresence>
        {activeDetailCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-stone-200/80 shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDetailCourse(null)}
                className="absolute top-4 right-4 z-20 bg-stone-950/60 hover:bg-stone-950 text-white rounded-full p-2 transition shadow-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Course Hero Cover Image */}
              <div className="relative aspect-[16/9] bg-stone-100 shrink-0">
                <img
                  src={activeDetailCourse.image}
                  alt={activeDetailCourse.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                
                {/* Header Information over Image */}
                <div className="absolute bottom-5 left-6 right-6 text-white text-left">
                  <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full inline-block mb-2">
                    Faahfaahinta Koorsada
                  </span>
                  <h3 className="font-display font-black text-xl sm:text-2xl leading-tight">
                    {activeDetailCourse.title}
                  </h3>
                  <p className="text-[11px] text-stone-200 font-semibold uppercase tracking-wider mt-1">
                    {activeDetailCourse.subTitle}
                  </p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6 text-left flex-1">
                {/* Description */}
                <div>
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1.5">
                    Ku Saabsan Koorsada
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {activeDetailCourse.description}
                  </p>
                </div>

                {/* Rating and Interactive Pricing Info (ONLY SHOWN UPON INTERACTION) */}
                <div className="grid grid-cols-2 gap-4 border-y border-stone-100 py-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">
                      Qiimaynta Ardayda
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-stone-850">
                        {activeDetailCourse.rating} ({activeDetailCourse.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-widest block">
                      Qiimaha Koorsada (Price)
                    </span>
                    <div className="text-sm font-black text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-1 inline-block">
                      {activeDetailCourse.price} <span className="text-[10px] font-normal text-emerald-600">/ Bishiiba</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Level/Topics */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                    Manhajka & Casharrada (Syllabus)
                  </h4>
                  <div className="space-y-3">
                    {activeDetailCourse.levelDetails.map((lvl, lIdx) => (
                      <div key={lIdx} className="bg-stone-50 border border-stone-200/50 rounded-2xl p-4">
                        <span className="text-[11px] font-black text-stone-800 block border-b border-stone-200/60 pb-1.5 mb-2">
                          📌 {lvl.level}
                        </span>
                        <ul className="space-y-2">
                          {lvl.topics.map((tpc, tIdx) => (
                            <li key={tIdx} className="text-xs text-stone-600 flex items-start gap-2">
                              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                              <span>{tpc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits / Fast Facts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-stone-600 bg-amber-50/50 border border-amber-100 rounded-xl p-2.5">
                    <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Waqtiyo ku habboon jadwalkaaga</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-600 bg-emerald-50/50 border border-emerald-100 rounded-xl p-2.5">
                    <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Macallimiin si heer sare ah u tababaran</span>
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="p-6 bg-stone-50 border-t border-stone-100 shrink-0 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveDetailCourse(null)}
                  className="rounded-xl border border-stone-200 px-5 py-3 text-xs font-semibold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  Xir
                </button>
                <button
                  id={`modal-enroll-btn-${activeDetailCourse.id}`}
                  onClick={() => {
                    onJoinCourse(activeDetailCourse.id);
                    setActiveDetailCourse(null);
                  }}
                  className="rounded-xl bg-emerald-800 hover:bg-emerald-700 px-6 py-3 text-xs font-bold text-white transition flex items-center gap-1.5 shadow-lg shadow-emerald-950/20 cursor-pointer"
                >
                  <span>{lang === "ar" ? "سجل الآن" : lang === "en" ? "Register Now" : "Isdiwaan Gali"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

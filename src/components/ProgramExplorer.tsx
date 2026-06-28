import React, { useState } from "react";
import { Search, SlidersHorizontal, ArrowRight, ShieldCheck, Clock, BookOpen, Layers, Star, Plus, Check } from "lucide-react";
import { Course } from "../types";
import { COURSES } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../i18n";

interface ProgramExplorerProps {
  onJoinCourse: (courseId: string) => void;
  lang: Language;
}

// Full comprehensive programs including all sub-topics and specifications
const ENHANCED_PROGRAMS = [
  ...COURSES,
  {
    id: "quran-memorization",
    title: "Quran Memorization",
    subTitle: "Hifdiga Qur'aanka",
    description: "Xifdi Qur'aanka Kariimka ah adigoo raacaya manhaj habaysan oo ku dhisan dib-u-eegis joogto ah.",
    rating: 5.0,
    reviewCount: 215,
    price: "$35/Month",
    icon: "Award",
    levelDetails: [
      {
        level: "Juz Amma & Tabarak",
        topics: ["Memorization of Juz 30 & 29", "Core rules of recitation", "Short Surah meanings"]
      },
      {
        level: "Dhexe (10 Juz)",
        topics: ["Memorization of Juz 1 to 10", "Strong Revision structure (Murajaca)", "Daily tracker diary"]
      },
      {
        level: "Sare (Complete Quran)",
        topics: ["Complete Quran Hifdh with Sanad", "Qira'aat options", "Advanced Tajweed application"]
      }
    ],
    audience: "Both",
    format: "One-to-One"
  },
  {
    id: "quran-reading",
    title: "Quran Reading",
    subTitle: "Akhrinta Qur'aanka (Qaacidada)",
    description: "Baro aasaaska akhriska Qur'aanka adigoo isticmaalaya buugga Qaacidah Nuuraaniyah.",
    rating: 4.9,
    reviewCount: 164,
    price: "$20/Month",
    icon: "BookOpen",
    levelDetails: [
      {
        level: "Qaacidah level",
        topics: ["Letter pronunciation", "Connecting letters", "Basic vowel indicators"]
      },
      {
        level: "Fluency level",
        topics: ["Reading direct from Mus-haf", "Pace and rhythm matching", "Waqf indicators"]
      }
    ],
    audience: "Kids",
    format: "Group"
  },
  {
    id: "islamic-studies",
    title: "Islamic Studies",
    subTitle: "Darsiga Tarbiyada & Caqiidada",
    description: "Baro taariikhda Islaamka, Caqiidada, Akhlaaqda iyo axkaamta diineed ee maalin kasta lagama maarmaanka ah.",
    rating: 4.8,
    reviewCount: 110,
    price: "$18/Month",
    icon: "Heart",
    levelDetails: [
      {
        level: "Foundation",
        topics: ["Pillars of Islam & Iman", "Hadith for Kids/Youth", "Stories of the Prophets"]
      },
      {
        level: "Advanced Islamic Values",
        topics: ["Seerah (Prophetic Biography)", "Tafseer of selected Surahs", "Adab & Akhlaaq studies"]
      }
    ],
    audience: "Adults",
    format: "Both"
  }
];

const COMPARISON_SPECS = [
  { key: "target", label: "Audience (Da'da)", values: { tajweed: "All Ages", arabic: "All Ages", fiqh: "Adults/Youth", "quran-memorization": "All Ages", "quran-reading": "Kids (Ages 4-15)", "islamic-studies": "All Ages" } },
  { key: "method", label: "Structure (Qaabka)", values: { tajweed: "1-on-1 / Group", arabic: "1-on-1", fiqh: "Group Classes", "quran-memorization": "1-on-1 Private", "quran-reading": "1-on-1 / Group", "islamic-studies": "Group Classes" } },
  { key: "curriculum", label: "Manhajka (Syllabus)", values: { tajweed: "Tajweed Al-Musawwar", arabic: "Madinah Books & Al-Ajurrumiyyah", fiqh: "Shafi'i Jurisprudence", "quran-memorization": "Structured Al-Azhar standard", "quran-reading": "Qaacidah Nuuraaniyah / Baghdadi", "islamic-studies": "Tarbiyah & Prophetic Seerah" } },
  { key: "certificate", label: "Shahaado (Certificate)", values: { tajweed: "Yes (Ijaza option)", arabic: "Yes (Fluency)", fiqh: "Yes (Advanced)", "quran-memorization": "Yes (Sanad / Ijaza)", "quran-reading": "Yes (Completion)", "islamic-studies": "Yes (Islamic Literacy)" } },
  { key: "support", label: "Review Support", values: { tajweed: "24/7 Portal Reports", arabic: "Vocabulary sheets", fiqh: "Q&A Session access", "quran-memorization": "Audio recorded revision", "quran-reading": "Interactive digital homework", "islamic-studies": "Downloadable slides" } },
];

export default function ProgramExplorer({ onJoinCourse, lang }: ProgramExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "kids" | "adults" | "one-on-one" | "group">("all");
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>(["tajweed", "quran-memorization"]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredPrograms = ENHANCED_PROGRAMS.filter((p) => {
    // Search query match
    const titleMatch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.subTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       p.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!titleMatch) return false;

    // Category filter
    const anyP = p as any;
    if (activeCategory === "all") return true;
    if (activeCategory === "kids") return anyP.audience === "Kids" || p.id === "quran-reading" || p.id === "tajweed";
    if (activeCategory === "adults") return anyP.audience === "Adults" || p.id === "fiqh" || p.id === "quran-memorization";
    if (activeCategory === "one-on-one") return anyP.format === "One-to-One" || p.id === "quran-memorization" || p.id === "arabic";
    if (activeCategory === "group") return anyP.format === "Group" || p.id === "fiqh" || p.id === "quran-reading";

    return true;
  });

  const toggleCompare = (courseId: string) => {
    if (selectedForCompare.includes(courseId)) {
      setSelectedForCompare(selectedForCompare.filter((id) => id !== courseId));
    } else {
      if (selectedForCompare.length >= 3) {
        // limit to 3 max
        alert("You can compare up to 3 programs at once.");
        return;
      }
      setSelectedForCompare([...selectedForCompare, courseId]);
    }
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
            Explore Our Premium Programs
          </h2>
          <p className="font-sans text-stone-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Choose the path that best supports your intellectual and spiritual growth. Search and compare options tailored to children, youth, and adults.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white rounded-2xl border border-stone-200/60 p-4 mb-10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="program-search-input"
              type="text"
              placeholder="Search programs, topics, levels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200/80 rounded-xl py-2.5 pl-10 pr-4 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-700/30 focus:border-emerald-600"
            />
          </div>

          {/* Quick Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "All Classes" },
              { id: "kids", label: "Children (Carruurta)" },
              { id: "adults", label: "Adults (Waaweyn)" },
              { id: "one-on-one", label: "Private (1-on-1)" },
              { id: "group", label: "Group Classes" },
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
            <span>Compare Programs ({selectedForCompare.length})</span>
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
                    Interactive Course Comparison
                  </h3>
                  <p className="text-xs text-stone-400">
                    Compare features, structure, and curriculums to determine the ideal match.
                  </p>
                </div>
                <button
                  id="close-compare-board-btn"
                  onClick={() => setShowComparison(false)}
                  className="text-xs font-bold text-stone-400 hover:text-white transition"
                >
                  Close [x]
                </button>
              </div>

              {selectedForCompare.length === 0 ? (
                <div className="text-center py-8 text-xs text-stone-400">
                  Select at least 1 or 2 courses below by checking the "Compare" box on their card to see details here.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-stone-300">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="py-3 font-semibold text-white w-1/4">Metrics & Specifications</th>
                        {selectedForCompare.map((id) => {
                          const courseObj = ENHANCED_PROGRAMS.find((p) => p.id === id);
                          return (
                            <th key={id} className="py-3 font-bold text-amber-300 text-center capitalize">
                              {courseObj?.title}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-3.5 font-semibold text-stone-400">Monthly Tuition</td>
                        {selectedForCompare.map((id) => {
                          const courseObj = ENHANCED_PROGRAMS.find((p) => p.id === id);
                          return (
                            <td key={id} className="py-3.5 text-center font-mono font-bold text-white text-sm">
                              {courseObj?.price}
                            </td>
                          );
                        })}
                      </tr>
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
                              className="rounded-lg bg-emerald-700 hover:bg-emerald-600 px-4 py-2 text-[10px] font-bold text-white transition inline-flex items-center gap-1 shadow-md shadow-emerald-950/40"
                            >
                              <span>Enroll Now</span>
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
            No programs match your search or filter settings. Please adjust them.
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
                  className="bg-white rounded-2xl border border-stone-200/60 overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-emerald-800/20 group relative transition duration-300"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="rounded-xl bg-emerald-50 text-emerald-800 p-2.5 border border-emerald-100">
                        <BookOpen className="w-5 h-5" />
                      </div>

                      {/* Compare toggle in card */}
                      <button
                        id={`card-compare-chk-${p.id}`}
                        onClick={() => toggleCompare(p.id)}
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-bold transition flex items-center gap-1 ${
                          isSelectedForCompare
                            ? "bg-amber-500 text-stone-950"
                            : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                        }`}
                      >
                        {isSelectedForCompare ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        <span>Compare</span>
                      </button>
                    </div>

                    <h3 className="font-display font-extrabold text-lg text-stone-900 tracking-tight leading-tight group-hover:text-emerald-800 transition">
                      {p.title}
                    </h3>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mt-0.5">
                      {p.subTitle}
                    </p>

                    <p className="font-sans text-stone-500 text-xs leading-relaxed mt-3 mb-4">
                      {p.description}
                    </p>

                    {/* Course rating & pricing row */}
                    <div className="flex justify-between items-center border-y border-stone-100 py-3 mb-4">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-stone-800">{p.rating}</span>
                        <span className="text-[10px] text-stone-400">({p.reviewCount} Reviews)</span>
                      </div>
                      <div className="font-mono text-sm font-extrabold text-stone-900 bg-stone-50 border border-stone-100 rounded-lg px-2 py-0.5">
                        {p.price}
                      </div>
                    </div>

                    {/* Curriculum levels */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                        Syllabus Highlights
                      </h4>
                      <div className="space-y-2.5">
                        {p.levelDetails.slice(0, 2).map((lvl, lIdx) => (
                          <div key={lIdx} className="bg-stone-50/50 border border-stone-100 rounded-xl p-2.5">
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

                  {/* Enroll Button */}
                  <div className="p-6 pt-0 mt-auto">
                    <button
                      id={`enroll-program-btn-${p.id}`}
                      onClick={() => onJoinCourse(p.id)}
                      className="w-full rounded-xl bg-stone-900 hover:bg-emerald-800 text-white py-3 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Book Free Trial</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

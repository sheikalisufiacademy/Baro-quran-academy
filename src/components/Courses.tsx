import React, { useState } from "react";
import { COURSES } from "../data";
import { Course } from "../types";
import { Star, ArrowRight, BookOpen, Languages, Scale, ChevronDown, ChevronUp, Check, Award } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CoursesProps {
  onJoinCourse: (courseId: string) => void;
}

export default function Courses({ onJoinCourse }: CoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});

  const getCourseIcon = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-emerald-800" />;
      case "Languages":
        return <Languages className="w-5 h-5 text-amber-600" />;
      case "Scale":
        return <Scale className="w-5 h-5 text-teal-700" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-800" />;
    }
  };

  const getIconBg = (iconName: string) => {
    switch (iconName) {
      case "BookOpen":
        return "bg-emerald-50";
      case "Languages":
        return "bg-amber-50";
      case "Scale":
        return "bg-teal-50";
      default:
        return "bg-emerald-50";
    }
  };

  const toggleLevel = (index: number) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="py-20 bg-stone-50 border-y border-stone-100" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block">
              KOORSOOYINKA
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Koorsooyinka ugu caansan ee aan bixino
            </h2>
            <p className="font-sans text-stone-500 max-w-xl text-sm leading-relaxed">
              Koorsooyinkeena waxaa loogu talagalay inay kugu hantidhaan aqoon durugsan, iyadoo la adeegsanayo habab akhris oo casri ah.
            </p>
          </div>

          <button
            id="see-all-courses-btn"
            onClick={() => onJoinCourse("tajweed")}
            className="inline-flex items-center gap-1.5 font-semibold text-sm text-emerald-800 hover:text-emerald-700 transition group cursor-pointer"
          >
            <span>Arag Dhammaan</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </button>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {COURSES.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden border border-stone-200/60 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
            >
              {/* Card Banner Background */}
              <div className="h-2.5 bg-gradient-to-r from-emerald-800 to-emerald-700" />

              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getIconBg(course.icon)}`}>
                      {getCourseIcon(course.icon)}
                    </div>
                    <div>
                      <h4 className="font-display text-xs font-bold text-emerald-800 uppercase tracking-wide">
                        {course.subTitle}
                      </h4>
                      <h3 className="font-sans text-xl font-extrabold text-stone-900 leading-tight">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-stone-600 text-sm leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Rating / Review Info */}
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="font-bold text-stone-800 ml-1">{course.rating}</span>
                    </div>
                    <span>({course.reviewCount} Reviews)</span>
                  </div>
                </div>

                <div className="border-t border-stone-100 pt-5 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                      Qiimaha bishii
                    </span>
                    <span className="text-xl font-extrabold text-stone-900">
                      {course.price}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      id={`course-syllabus-btn-${course.id}`}
                      onClick={() => setSelectedCourse(course)}
                      className="rounded-lg border border-stone-200 px-3.5 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 transition cursor-pointer"
                    >
                      Arag Manhajka
                    </button>
                    <button
                      id={`course-join-btn-${course.id}`}
                      onClick={() => onJoinCourse(course.id)}
                      className="rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition cursor-pointer"
                    >
                      Ku biir
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Syllabus Drawer overlay */}
        <AnimatePresence>
          {selectedCourse && (
            <div className="fixed inset-0 z-50 flex items-center justify-end">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCourse(null)}
                className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"
              />

              {/* Drawer Container */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 26, stiffness: 220 }}
                className="relative z-10 w-full max-w-lg h-full bg-white shadow-2xl p-6 overflow-y-auto flex flex-col justify-between"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between pb-5 border-b border-stone-100 mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${getIconBg(selectedCourse.icon)}`}>
                        {getCourseIcon(selectedCourse.icon)}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                          {selectedCourse.subTitle}
                        </span>
                        <h3 className="font-display font-extrabold text-lg text-stone-900">
                          {selectedCourse.title} Curriculum
                        </h3>
                      </div>
                    </div>
                    <button
                      id="close-syllabus-drawer"
                      onClick={() => setSelectedCourse(null)}
                      className="rounded-full p-1.5 hover:bg-stone-50 text-stone-400 hover:text-stone-700 transition"
                    >
                      <span className="text-sm font-semibold">Xir</span>
                    </button>
                  </div>

                  {/* Intro */}
                  <p className="text-sm text-stone-600 mb-6 leading-relaxed">
                    Koorsooyinkeena waxaa loo qaybiyay heerar kala duwan si ardaygu u helo faham buuxa. Halkaan ka eeg maaddooyinka la barayo:
                  </p>

                  {/* Levels Accordion */}
                  <div className="space-y-4">
                    {selectedCourse.levelDetails.map((lvl, idx) => (
                      <div
                        key={idx}
                        className="border border-stone-100 rounded-xl overflow-hidden shadow-sm"
                      >
                        <button
                          id={`syllabus-lvl-btn-${idx}`}
                          onClick={() => toggleLevel(idx)}
                          className="w-full flex items-center justify-between p-4 bg-stone-50/50 hover:bg-stone-50 text-left transition"
                        >
                          <div className="flex items-center gap-2.5">
                            <Award className="w-4 h-4 text-emerald-700" />
                            <span className="font-sans font-bold text-sm text-stone-800">
                              {lvl.level}
                            </span>
                          </div>
                          {expandedLevels[idx] ? (
                            <ChevronUp className="w-4 h-4 text-stone-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-stone-500" />
                          )}
                        </button>

                        <AnimatePresence>
                          {(expandedLevels[idx] ?? true) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-white"
                            >
                              <div className="p-4 border-t border-stone-100 space-y-2.5">
                                {lvl.topics.map((topic, tIdx) => (
                                  <div key={tIdx} className="flex gap-2 items-start text-xs text-stone-600">
                                    <div className="mt-0.5 rounded-full bg-emerald-50 p-0.5 text-emerald-800">
                                      <Check className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{topic}</span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Drawer CTA */}
                <div className="pt-6 border-t border-stone-100 mt-8 space-y-3">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-stone-400">Total Tuition fee:</span>
                    <span className="font-extrabold text-stone-900 text-lg">
                      {selectedCourse.price}
                    </span>
                  </div>
                  <button
                    id="syllabus-join-cta-btn"
                    onClick={() => {
                      const courseId = selectedCourse.id;
                      setSelectedCourse(null);
                      onJoinCourse(courseId);
                    }}
                    className="w-full rounded-xl bg-emerald-800 py-3.5 text-center font-bold text-xs text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-900/10"
                  >
                    Ku biir Koorsadan Hadda
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

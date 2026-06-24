import React from "react";
import { TEACHERS } from "../data";
import { Star, Award, GraduationCap, Calendar, Clock, Heart } from "lucide-react";
import { motion } from "motion/react";

interface TeachersProps {
  onBookTrial: (courseId: string) => void;
}

export default function Teachers({ onBookTrial }: TeachersProps) {
  const getCourseIdBySpecialty = (specialty: string) => {
    if (specialty.includes("Tajweed")) return "tajweed";
    if (specialty.includes("Arabic")) return "arabic";
    if (specialty.includes("Fiqh")) return "fiqh";
    return "tajweed";
  };

  return (
    <section className="py-24 bg-white" id="teachers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block">
            MUKHLISIINTA
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Macalimiin Khubaro ah oo kuu Diyaarsan
          </h2>
          <p className="font-sans text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
            Waxaan kuu soo xulnay macalimiin leh aqoon durugsan, khibrad dheer iyo dulqaad si aad u hesho waxbarasho tayo sare leh.
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEACHERS.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-stone-50/60 rounded-2xl border border-stone-200/50 overflow-hidden flex flex-col justify-between hover:shadow-md hover:bg-white transition duration-300 group"
            >
              <div>
                {/* Photo with overlay banner */}
                <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle glass effect gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-950/0 to-stone-950/0" />

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-stone-800 flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{teacher.rating} ({teacher.reviews} reviews)</span>
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute bottom-4 left-4 bg-emerald-800/90 text-white text-[10px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded">
                    {teacher.experience} Khibrad
                  </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-sans font-bold text-lg text-stone-900 leading-tight">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-emerald-800 font-semibold mt-1">
                      {teacher.role}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                    <div className="flex gap-2.5 items-start">
                      <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{teacher.education}</span>
                    </div>
                    <div className="flex gap-2.5 items-start">
                      <Award className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Ku takhasusay: <strong className="text-stone-800">{teacher.specialty}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  id={`book-trial-teacher-${teacher.id}`}
                  onClick={() => onBookTrial(getCourseIdBySpecialty(teacher.specialty))}
                  className="w-full rounded-xl bg-white border border-stone-200 py-3 text-xs font-bold text-stone-700 hover:bg-emerald-800 hover:text-white hover:border-emerald-800 transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Qabso Cashar Bilaash ah</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

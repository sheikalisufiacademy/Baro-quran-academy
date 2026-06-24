import React from "react";
import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="testimonials">
      {/* Decorative ornaments */}
      <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-amber-50/50 blur-2xl -z-10" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-emerald-50/40 blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block">
            MAXAY YIRAAHDEEN
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Ardayda ku qanacsan adeegayada
          </h2>
          <p className="font-sans text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
            Eeg waxa ay ardayda adduunka dacaladiisa ku nool ee nala bartay ka yiraahdeen waxtarka iyo tayada waxbarasho ee Baro Quran Academy.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-stone-50/50 rounded-2xl p-8 border border-stone-100 flex flex-col justify-between relative group hover:bg-white hover:shadow-md transition duration-300"
            >
              {/* Quotation icon */}
              <div className="absolute top-6 right-6 text-stone-200 group-hover:text-amber-500/15 transition duration-300">
                <Quote className="w-8 h-8 rotate-180 fill-current" />
              </div>

              {/* Card content */}
              <div className="space-y-4">
                {/* Visual rating stars */}
                <div className="flex items-center text-amber-500 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-sans text-sm text-stone-700 leading-relaxed italic relative z-10">
                  "{test.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 mt-8 border-t border-stone-100 pt-5">
                {/* Custom Avatar with Letter */}
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-white font-bold font-display text-sm flex items-center justify-center shadow-inner">
                  {test.avatarLetter}
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-stone-800">
                    {test.author}
                  </h4>
                  <p className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                    {test.course}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

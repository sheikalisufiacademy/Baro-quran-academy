import React from "react";
import { motion } from "motion/react";
import { GraduationCap, BookOpen, Clock } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <GraduationCap className="w-6 h-6 text-emerald-800" />,
      title: "Macalimiin Khubaro ah",
      desc: "Waxaan kuugu diyaarinay macalimiin aqoon durugsan u leh culuumta diiniga ah iyo luqadda Carabiga.",
      color: "bg-emerald-50 text-emerald-800 ring-emerald-100",
    },
    {
      icon: <BookOpen className="w-6 h-6 text-amber-600" />,
      title: "Manhaj Habaysan",
      desc: "Manhajkeenu waa mid casri ah oo u habaysan si ardayga uu si fudud ugu fahmo casharrada la barayo.",
      color: "bg-amber-50 text-amber-800 ring-amber-100",
    },
    {
      icon: <Clock className="w-6 h-6 text-teal-700" />,
      title: "Waqtiyada Dabacsan",
      desc: "Waxaad baran kartaa casharrada waqtiga aad firaaqada u leedahay adigoo gurigaaga jooga.",
      color: "bg-teal-50 text-teal-800 ring-teal-100",
    },
  ];

  return (
    <section className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Section Divider/Tag */}
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-50 px-3.5 py-1.5 rounded-full inline-block">
            MUUQAALADA AASAASIGA AH
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Maxaad ku Dooranaysaa Baro Quran?
          </h2>
          <p className="font-sans text-stone-500 max-w-xl mx-auto text-sm leading-relaxed">
            Waxaan nahay machad loogu talagalay in lagu fududeeyo barashada Qur'aanka Kariimka iyo luqadda Carabiga, annagoo adeegsanayna tiknoolajiyada ugu dambeysa.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-stone-50 rounded-2xl p-8 border border-stone-100 shadow-sm hover:shadow-md transition duration-300 relative group overflow-hidden"
            >
              {/* Corner decoration ornament */}
              <div className="absolute top-0 right-0 -translate-x-[-20%] -translate-y-[-20%] w-24 h-24 rounded-full bg-emerald-700/[0.02] -z-10 group-hover:scale-110 transition duration-300" />

              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ring-4 ring-offset-0 ${feat.color}`}>
                {feat.icon}
              </div>

              {/* Text */}
              <h3 className="font-display text-xl font-bold text-stone-900 mb-3 group-hover:text-emerald-800 transition">
                {feat.title}
              </h3>
              <p className="font-sans text-sm text-stone-600 leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

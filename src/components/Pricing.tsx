import React, { useState } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight, Sparkles, Users, HelpCircle, GraduationCap, Percent } from "lucide-react";
import { Language } from "../i18n";

interface PricingProps {
  onJoinClick: () => void;
  lang: Language;
}

export default function Pricing({ onJoinClick, lang }: PricingProps) {
  const [familyStudents, setFamilyStudents] = useState<number>(3);
  const [familyDays, setFamilyDays] = useState<number>(2);

  // Dynamic Pricing Logic matching RegistrationModal exactly
  const getCalculatedPrice = (days: number, count: number): number => {
    if (count === 1) {
      if (days === 2) return 20;
      if (days === 3) return 25;
      if (days === 4) return 30;
      if (days === 5) return 45;
    } else if (count === 2) {
      if (days === 2) return 35;
      if (days === 3) return 45;
      if (days === 4) return 55;
      if (days === 5) return 80;
    } else if (count === 3) {
      if (days === 2) return 50; // exact user request: 3 students, 2 days = $50
      if (days === 3) return 60;
      if (days === 4) return 75;
      if (days === 5) return 115;
    } else if (count === 4) {
      if (days === 2) return 65;
      if (days === 3) return 80;
      if (days === 4) return 100;
      if (days === 5) return 150;
    } else { // 5 or more
      const baseSingle = days === 2 ? 20 : days === 3 ? 25 : days === 4 ? 30 : 45;
      const rawTotal = baseSingle * count;
      return Math.round(rawTotal * 0.75); // 25% discount
    }
    return 0;
  };

  const getStandardPrice = (days: number, count: number): number => {
    const baseSingle = days === 2 ? 20 : days === 3 ? 25 : days === 4 ? 30 : 45;
    return baseSingle * count;
  };

  const standardPlans = [
    {
      days: 2,
      price: 20,
      label: lang === "ar" ? "يومين في الأسبوع" : lang === "en" ? "2 Days a week" : "2 Maalmood asbuucii",
      desc: lang === "ar" ? "مناسب للمبتدئين ذوي الجداول المزدحمة" : lang === "en" ? "Ideal for busy schedules & beginners" : "U fiican ardayda mashquulka ah",
      features: [
        lang === "ar" ? "حصص فردية (1-on-1) تفاعلية" : lang === "en" ? "1-on-1 interactive sessions" : "Casharro 1-on-1 ah oo gaar ah",
        lang === "ar" ? "معلمون ذوو خبرة وكفاءة عالية" : lang === "en" ? "Certified experienced teachers" : "Macalimiin khubaro ah oo la hubiyay",
        lang === "ar" ? "تقرير شهري عن تقدم الطالب" : lang === "en" ? "Monthly student progress reports" : "Warbixin bil kasta ee horumarka",
        lang === "ar" ? "أوقات مرنة تناسب جدولك" : lang === "en" ? "Flexible hours to fit your schedule" : "Wakhti adiga kugu haboon",
      ]
    },
    {
      days: 3,
      price: 25,
      label: lang === "ar" ? "3 أيام في الأسبوع" : lang === "en" ? "3 Days a week" : "3 Maalmood asbuucii",
      desc: lang === "ar" ? "الخيار الأمثل للتعلم المتوازن والمنتظم" : lang === "en" ? "Perfect for balanced regular learning" : "U fiican barashada joogtada ah",
      features: [
        lang === "ar" ? "حصص فردية (1-on-1) تفاعلية" : lang === "en" ? "1-on-1 interactive sessions" : "Casharro 1-on-1 ah oo gaar ah",
        lang === "ar" ? "معلمون ذوو خبرة وكفاءة عالية" : lang === "en" ? "Certified experienced teachers" : "Macalimiin khubaro ah oo la hubiyay",
        lang === "ar" ? "تقرير شهري عن تقدم الطالب" : lang === "en" ? "Monthly student progress reports" : "Warbixin bil kasta ee horumarka",
        lang === "ar" ? "أوقات مرنة تناسب جدولك" : lang === "en" ? "Flexible hours to fit your schedule" : "Wakhti adiga kugu haboon",
        lang === "ar" ? "مراجعة وحفظ وتصحيح التلاوة" : lang === "en" ? "Review, memorization & recitation correction" : "Hifdi, Sixid iyo ku celcelis",
      ]
    },
    {
      days: 4,
      price: 30,
      label: lang === "ar" ? "4 أيام في الأسبوع" : lang === "en" ? "4 Days a week" : "4 Maalmood asbuucii",
      desc: lang === "ar" ? "لتقدم أسرع وتحصيل علمي مكثف" : lang === "en" ? "For faster progress & focused study" : "Horumar degdeg ah oo la taaban karo",
      features: [
        lang === "ar" ? "حصص فردية (1-on-1) تفاعلية" : lang === "en" ? "1-on-1 interactive sessions" : "Casharro 1-on-1 ah oo gaar ah",
        lang === "ar" ? "معلمون ذوو خبرة وكفاءة عالية" : lang === "en" ? "Certified experienced teachers" : "Macalimiin khubaro ah oo la hubiyay",
        lang === "ar" ? "تقرير شهري عن تقدم الطالب" : lang === "en" ? "Monthly student progress reports" : "Warbixin bil kasta ee horumarka",
        lang === "ar" ? "أوقات مرنة تناسب جدولك" : lang === "en" ? "Flexible hours to fit your schedule" : "Wakhti adiga kugu haboon",
        lang === "ar" ? "تركيز إضافي على التجويد والترتيل" : lang === "en" ? "Extra focus on Tajweed rules" : "Ahmiyad gaar ah oo la siiyo Tajweedka",
      ]
    },
    {
      days: 5,
      price: 45,
      label: lang === "ar" ? "5 أيام في الأسبوع" : lang === "en" ? "5 Days a week" : "5 Maalmood asbuucii",
      desc: lang === "ar" ? "الخيار الأكثر شعبية للحفظ السريع والكامل" : lang === "en" ? "Most popular for rapid memorization" : "Ku haboon hifdiga degdega ah",
      popular: true,
      features: [
        lang === "ar" ? "حصص فردية (1-on-1) تفاعلية" : lang === "en" ? "1-on-1 interactive sessions" : "Casharro 1-on-1 ah oo gaar ah",
        lang === "ar" ? "معلمون ذوو خبرة وكفاءة عالية" : lang === "en" ? "Certified experienced teachers" : "Macalimiin khubaro ah oo la hubiyay",
        lang === "ar" ? "تقرير شهري عن تقدم الطالب" : lang === "en" ? "Monthly student progress reports" : "Warbixin bil kasta ee horumarka",
        lang === "ar" ? "أوقات مرنة تناسب جدولك" : lang === "en" ? "Flexible hours to fit your schedule" : "Wakhti adiga kugu haboon",
        lang === "ar" ? "خطة مخصصة ومكثفة لحفظ القرآن كاملًا" : lang === "en" ? "Premium customized fast-track memorization program" : "Xawaare sare iyo manhaj gaar ah",
        lang === "ar" ? "أولوية الدعم الفني والأكاديمي" : lang === "en" ? "Priority technical & academic support" : "Daryeel iyo taageero 24/7 ah",
      ]
    }
  ];

  const calculatedPrice = getCalculatedPrice(familyDays, familyStudents);
  const standardPrice = getStandardPrice(familyDays, familyStudents);
  const discountAmount = standardPrice - calculatedPrice;

  return (
    <section className="py-24 bg-stone-50 text-stone-800" id="pricing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-800/10 px-3.5 py-1.5 rounded-full inline-block">
            {lang === "ar" ? "خطط الأسعار" : lang === "en" ? "PRICING PLANS" : "QORSHAHA QIIMAHA"} • 💰
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === "ar" ? "أسعار مناسبة لجميع الأسر" : lang === "en" ? "Affordable & Transparent Pricing" : "Qiimo Aad U Jaban Oo Qof Kasta Ku Haboon"}
          </h2>
          <p className="font-sans text-stone-500 max-w-2xl mx-auto text-xs leading-relaxed">
            {lang === "ar" ? "اختر الخطة المناسبة لك أو لأسرتك. نقدم خصومات رائعة جداً للعائلات التي تسجل أكثر من طالب." : lang === "en" ? "Choose the best study plan for you or your family. We offer generous discounts for families with multiple students!" : "Dooro qorshaha bishii ee ku haboon adiga ama qoyskaaga. Waxaan bixinaa qiimo dhimis aad u balaadhan oo loogu talagalay qoysaska dhowrka arday iska dhiibaya."}
          </p>
        </div>

        {/* Standard Single Student Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch mb-20">
          {standardPlans.map((plan) => (
            <motion.div
              key={plan.days}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-3xl border p-6 flex flex-col justify-between transition duration-300 ${
                plan.popular
                  ? "border-emerald-700 shadow-xl shadow-emerald-950/5 ring-2 ring-emerald-700/5 scale-[1.02] md:scale-105 z-10"
                  : "border-stone-200/80 shadow-sm hover:shadow-md hover:border-emerald-800/20"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 font-black text-[9px] px-3.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {lang === "ar" ? "الأكثر شعبية" : lang === "en" ? "Most Popular" : "Ugu Caansan"}
                </div>
              )}

              <div>
                <h3 className="font-display font-black text-stone-900 text-base">{plan.label}</h3>
                <p className="text-[10px] text-stone-400 mt-1 mb-4 leading-relaxed h-8">{plan.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-6 border-b border-stone-100 pb-5">
                  <span className="text-3xl font-black text-emerald-800">${plan.price}</span>
                  <span className="text-xs text-stone-500 font-semibold">/ bishii (month)</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="text-xs text-stone-600 flex items-start gap-2 text-left">
                      <div className="rounded-full bg-emerald-50 text-emerald-800 p-0.5 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={onJoinClick}
                className={`w-full rounded-2xl py-3.5 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                  plan.popular
                    ? "bg-emerald-800 text-white hover:bg-emerald-700 hover:shadow-md"
                    : "bg-stone-900 text-white hover:bg-stone-800"
                }`}
              >
                <span>{lang === "ar" ? "سجل الآن" : lang === "en" ? "Register Now" : "Isqor Hadda"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Interactive Family Discount Calculator Section */}
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 rounded-[40px] text-white p-8 md:p-12 border border-stone-800 shadow-2xl relative overflow-hidden mb-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Text */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 uppercase tracking-widest">
                <Percent className="w-3 h-3" />
                Qiimo Dhimis Qoys (Family Discount)
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Haday Hal Qoys Dhowr Arday Yihiin Qiimo Dhimis Ayaa Loo Samaynayaa!
              </h3>
              <p className="font-sans text-stone-300 text-xs leading-relaxed">
                Waxaan dhiirigelinaynaa in dhammaan xubnaha qoyska ay wada bartaan Qur'aanka Kariimka ah. Waxaan u dejinay nidaam qiimo dhimis ah oo toos ah haddii 2, 3 ama ka badan oo arday ah ay isku qoys yihiin. 
                <br/><br/>
                <strong className="text-amber-400">Tusaale:</strong> 3 arday oo hal qoys ah haddii ay dhigtaan 2 maalmood asbuucii, qiimuhu waa <strong className="text-emerald-400 font-extrabold text-sm">$50 kaliya</strong> bishii (halkii uu ka ahaan lahaa $60)!
              </p>
              
              <div className="space-y-3 pt-4 border-t border-stone-800">
                <div className="flex items-center gap-3 text-xs text-stone-300">
                  <div className="rounded-xl bg-stone-800 p-2 text-emerald-400 border border-stone-750">
                    <Users className="w-4 h-4" />
                  </div>
                  <span>Qoys kasta wuxuu leeyahay Group WhatsApp ah oo gaar ah</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-300">
                  <div className="rounded-xl bg-stone-800 p-2 text-emerald-400 border border-stone-750">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span>Maamulid gaar ah iyo macalimiin dhowr ah oo loo qoondeeyo</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Calculator Card */}
            <div className="lg:col-span-7 bg-stone-850/90 rounded-3xl p-6 sm:p-8 border border-stone-750 backdrop-blur-sm shadow-xl flex flex-col justify-between">
              <div>
                <h4 className="font-display font-extrabold text-sm text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Xisaabi Qiimo Dhimistaada Qoyska
                </h4>

                {/* 1. Select Students */}
                <div className="space-y-3 mb-6 text-left">
                  <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                    1. Immisa Arday ayaad tihiin? (Number of Students)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setFamilyStudents(num)}
                        className={`rounded-xl py-3 text-xs font-black transition cursor-pointer ${
                          familyStudents === num
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/40"
                            : "bg-stone-800 text-stone-300 hover:bg-stone-750 border border-stone-700"
                        }`}
                      >
                        {num === 5 ? "5+" : num} {num === 1 ? "Arday" : "Arday"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Select Study Days */}
                <div className="space-y-3 mb-8 text-left">
                  <label className="text-xs font-bold text-stone-300 uppercase tracking-wider block">
                    2. Immisa Maalmood Asbuucii? (Study Days / Week)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[2, 3, 4, 5].map((days) => (
                      <button
                        key={days}
                        onClick={() => setFamilyDays(days)}
                        className={`rounded-xl py-3 text-xs font-black transition cursor-pointer ${
                          familyDays === days
                            ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/40"
                            : "bg-stone-800 text-stone-300 hover:bg-stone-750 border border-stone-700"
                        }`}
                      >
                        {days} Maalmood
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Calculator Results Output Card */}
              <div className="bg-stone-900 rounded-2xl p-5 border border-stone-750 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                    Qiimaha la xisaabiyay (Calculated Total)
                  </span>
                  <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                    <span className="text-4xl font-black text-emerald-400">
                      ${calculatedPrice}
                    </span>
                    <span className="text-xs text-stone-400">/ bishii</span>
                  </div>
                  {discountAmount > 0 ? (
                    <span className="text-[10px] font-bold text-stone-400 block">
                      Qiimihii caadiga ahaa: <span className="line-through">${standardPrice}</span>
                    </span>
                  ) : (
                    <span className="text-[10px] text-stone-400 block">Standard Rate</span>
                  )}
                </div>

                <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
                  {discountAmount > 0 && (
                    <div className="bg-emerald-950/60 border border-emerald-500/20 text-emerald-400 font-extrabold text-[10px] px-3 py-1.5 rounded-xl uppercase tracking-wider shadow-inner flex items-center gap-1 mb-1">
                      <span>🎉 Waad badbaadisay: ${discountAmount}</span>
                    </div>
                  )}
                  <button
                    onClick={onJoinClick}
                    className="rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-6 py-3 text-xs transition duration-150 flex items-center gap-1.5 shadow-md shadow-amber-950/30 cursor-pointer"
                  >
                    <span>Ku Biir & Isqor Hadda</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Family Matrix Table for fully transparent pricing */}
        <div className="bg-white rounded-[32px] border border-stone-200/60 p-6 sm:p-8 shadow-sm text-left">
          <div className="border-b border-stone-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-display font-extrabold text-base text-stone-900">
                Jadwalka Qiimaha Qoysaska ee Dhameystiran
              </h3>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Faahfaahinta qiimaha bishii iyadoo ku xiran tirada ardayda qoyska iyo maalmaha
              </p>
            </div>
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full border border-emerald-100 self-start sm:self-center uppercase">
              Somali & English Combined
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase tracking-wider text-left bg-stone-50">
                  <th className="py-3.5 px-4 rounded-l-xl">Tirada Ardayda (Students)</th>
                  <th className="py-3.5 px-4 text-center">2 Maalmood (2 Days/Wk)</th>
                  <th className="py-3.5 px-4 text-center">3 Maalmood (3 Days/Wk)</th>
                  <th className="py-3.5 px-4 text-center">4 Maalmood (4 Days/Wk)</th>
                  <th className="py-3.5 px-4 text-center rounded-r-xl">5 Maalmood (5 Days/Wk)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-semibold text-stone-800">
                {[
                  { count: 1, label: "1 Arday (Single Student)", rates: [20, 25, 30, 45] },
                  { count: 2, label: "2 Arday (Two Siblings)", rates: [35, 45, 55, 80], discount: true },
                  { count: 3, label: "3 Arday (Three Siblings)", rates: [50, 60, 75, 115], discount: true, highlight: true },
                  { count: 4, label: "4 Arday (Four Siblings)", rates: [65, 80, 100, 150], discount: true },
                ].map((row, i) => (
                  <tr
                    key={row.count}
                    className={`hover:bg-stone-50/50 transition ${
                      row.highlight ? "bg-amber-50/30" : ""
                    }`}
                  >
                    <td className="py-4 px-4 font-bold text-stone-900">
                      <div className="flex items-center gap-1.5">
                        <span>{row.label}</span>
                        {row.discount && (
                          <span className="bg-emerald-50 text-emerald-800 text-[8px] font-black px-1.5 py-0.5 rounded border border-emerald-100">
                            Discount
                          </span>
                        )}
                      </div>
                    </td>
                    {row.rates.map((rate, rIdx) => {
                      const daysMap = [2, 3, 4, 5];
                      const std = getStandardPrice(daysMap[rIdx], row.count);
                      const sav = std - rate;
                      return (
                        <td key={rIdx} className="py-4 px-4 text-center">
                          <span className="text-sm font-black text-stone-900">${rate}</span>
                          <span className="text-[9px] text-stone-400 block font-normal">/ month</span>
                          {sav > 0 && (
                            <span className="text-[8px] text-emerald-700 bg-emerald-50 rounded px-1 font-bold mt-0.5 inline-block">
                              Badbaadi ${sav}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-stone-50 p-5 rounded-2xl border border-stone-200/50">
            <div className="flex items-start gap-2.5 text-xs text-stone-500">
              <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Haddii ardayda qoyskiinnu ay ka badan yihiin 4 arday, fadlan nala soo xiriir si aan idiinku xisaabino qiimo dhimis gaar ah oo ka weyn <strong>25%</strong>.
              </p>
            </div>
            <button
              onClick={onJoinClick}
              className="rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold px-7 py-3 text-xs transition duration-150 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/10 cursor-pointer self-start sm:self-center shrink-0"
            >
              <span>Isdiwaan Gali Qoyskaaga</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

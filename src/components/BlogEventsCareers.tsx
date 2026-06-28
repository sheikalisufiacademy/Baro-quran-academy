import React, { useState } from "react";
import { Calendar, MapPin, Briefcase, Heart, ArrowRight, Check, Send, ShieldAlert, Award, Star, Clock } from "lucide-react";

interface SubPageProps {
  viewType: "blog" | "events" | "careers" | "donate" | "about";
  onBookClick: () => void;
}

export default function BlogEventsCareers({ viewType, onBookClick }: SubPageProps) {
  // Blog detailed read state
  const [readingBlogId, setReadingBlogId] = useState<string | null>(null);

  // Career application state
  const [careerSubmitted, setCareerSubmitted] = useState(false);

  // Donation state
  const [selectedAmount, setSelectedAmount] = useState("50");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donationSuccess, setDonationSuccess] = useState(false);

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
  };

  const BLOGS = [
    {
      id: "b1",
      title: "Ahmiyadda Barashada Tajwiidka ee Qur'aanka Kariimka ah",
      category: "Tajweed Education",
      readTime: "5 Min Read",
      date: "June 24, 2026",
      summary: "Tajwiidku maaha oo kaliya qurxin codka ah, ee waa habka saxda ah ee xarfaha loogu dhawaaqo si looga fogaado khaladaadka waaweyn.",
      content: "Tajwiidku waa cilmi aad u muhiim ah oo baraya ardayga sida saxda ah ee loo akhriyo Qur'aanka kariimka ah, iyadoo la ilaalinayo halkay xarfuhu ka soo baxaan (Makharij) iyo sifooyinkooda kala duwan. Marka qofku u akhriyo Qur'aanka si waafaqsan qawaacidda Tajwiidka, wuxuu ilaalinayaa macnaha saxda ah ee aayadaha, wuxuuna ka fogaanayaa khaladaadka dhalisay beddelidda kelmadaha ama macnaha. Akadeemiyada Baro Quran waxay kuu diyaarisay macalimiin aqoon iyo khibrad sare u leh darsigan si aad si fudud gurigaaga ugu baratid."
    },
    {
      id: "b2",
      title: "Sidee Qoysaska Qurbaha ku nool ay u ilaalin karaan Afka Hooyo iyo Diinta?",
      category: "Parenting Tips",
      readTime: "8 Min Read",
      date: "June 18, 2026",
      summary: "Qoysaska ku nool Yurub iyo Ameerika waxay wajahayaan caqabado badan oo ku saabsan baridda carruurta afka iyo diinta. Halkan ka baro talooyin.",
      content: "U guurista qurbaha waxay keenaysaa in carruurtu ay si dhakhso ah u bartaan luqadaha maxalliga ah iyagoo luminaya luqaddoodii hooyo iyo darsigii diineed ee muhiimka ahaa. Khubaradayada waxbarashada Islaamka waxay ku talinayaan: 1) Sameynta waqti gaar ah oo guriga dhexdiisa ah oo kaliya Af-Soomaaliga looga hadlo. 2) Diiwaangelinta carruurta ee fasallada tooska ah ee 1-on-1 ee dhisaya xifdiga Qur'aanka iyo luqadda Carabiga. 3) Kula dhiirigelinta carruurta hadiyado marka ay dhamaystiraan qaybaha Qur'aanka ah."
    }
  ];

  const EVENTS = [
    {
      title: "Grand Qur'an Competition - Ramadan 1448",
      date: "Oct 12, 2026",
      time: "17:00 UTC",
      location: "Live Webinar Platform",
      desc: "Annual virtual Quran recitation competition for kids and adults across 15 countries. Prizes up to $5,000.",
      tag: "Webinar"
    },
    {
      title: "How to understand the Quran directly without Translation",
      date: "July 04, 2026",
      time: "18:00 UTC",
      location: "Interactive Zoom Seminar",
      desc: "Free masterclass by Dr. Yusuf Al-Azhari explaining classical Arabic structure for absolute beginners.",
      tag: "Masterclass"
    }
  ];

  const JOBS = [
    { title: "Certified Female Tajweed Teacher (1-on-1)", type: "Part-time / Remote", salary: "$12 - $18 / hr", requirements: "Ijaza in Quran recitation, fluency in Somali & English, stable high-speed internet." },
    { title: "Male Quran Memorization Tutor", type: "Full-time / Remote", salary: "$15 - $22 / hr", requirements: "Complete Hifdh of Quran with Sanad, teaching experience of minimum 3 years." }
  ];

  // DONATE VIEW
  if (viewType === "donate") {
    return (
      <div className="py-24 bg-stone-50 text-stone-800" id="donate">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-800/10 px-3.5 py-1.5 rounded-full inline-block">
              SADAQAH JARIYAH • DEEQ WAXBARASHO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900">
              Support Islamic Education
            </h2>
            <p className="font-sans text-stone-500 max-w-2xl mx-auto text-xs leading-relaxed">
              Help us sponsor Quran and Arabic learning for orphaned children and underprivileged families back home in East Africa. Earn ongoing reward (Sadaqah Jariyah).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Donation selection panel */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 shadow-sm space-y-6">
              <h3 className="font-display font-bold text-sm text-stone-900">Choose Sponsorship Amount</h3>

              {/* Amount buttons */}
              <div className="grid grid-cols-4 gap-2">
                {["15", "30", "50", "100"].map((amt) => (
                  <button
                    key={amt}
                    id={`donate-amt-${amt}`}
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`rounded-xl py-3.5 text-xs font-bold font-mono transition cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? "bg-emerald-800 text-white shadow-md shadow-emerald-950/20"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div>
                <label className="text-[10px] font-bold text-stone-500 uppercase block mb-1.5">Or enter custom amount ($)</label>
                <input
                  id="custom-donation-amount"
                  type="number"
                  placeholder="e.g. 250"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount("");
                  }}
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none"
                />
              </div>

              {/* Impact Description based on amount */}
              <div className="bg-emerald-50 border border-emerald-100/50 rounded-2xl p-4 text-xs text-emerald-800 flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <p className="font-medium">
                  {customAmount ? (
                    `Your generous contribution of $${customAmount} will support multiple Quranic students and fund educational resources directly.`
                  ) : selectedAmount === "15" ? (
                    "Sponsors one child's Quran & Arabic monthly books and interactive learning slate materials."
                  ) : selectedAmount === "30" ? (
                    "Sponsors a full month of intensive 1-on-1 Quran tutoring lessons for an orphaned student."
                  ) : selectedAmount === "50" ? (
                    "Sponsors two orphaned students for a full month of Tajweed curriculum lessons."
                  ) : (
                    "Founds a dedicated virtual study circle with full streaming projector access in local East African community center."
                  )}
                </p>
              </div>
            </div>

            {/* Donor info form */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 shadow-sm">
              <form onSubmit={handleDonationSubmit} className="space-y-4">
                <h3 className="font-display font-bold text-sm text-stone-900 mb-2">Donor Information</h3>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1.5">Full Name (Optional)</label>
                  <input
                    id="donor-name"
                    type="text"
                    placeholder="e.g. Sadaqah Jariyah"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1.5">Email Address</label>
                  <input
                    id="donor-email"
                    type="email"
                    required
                    placeholder="e.g. donor@example.com"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                {/* Simulated Card Detail */}
                <div className="border border-stone-100 rounded-xl p-4 bg-stone-50/50 space-y-3">
                  <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">SECURE DEBIT/CREDIT CARD</span>
                  <input
                    id="donation-cc"
                    type="text"
                    required
                    placeholder="Card Number: •••• •••• •••• 4242"
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs text-stone-800 focus:outline-none"
                  />
                </div>

                <button
                  id="submit-donation-btn"
                  type="submit"
                  className="w-full rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white py-4 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-950/20"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Sponsor with Secure Payment</span>
                </button>
              </form>

              {donationSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-center text-xs text-emerald-800 font-bold mt-4 space-y-2">
                  <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-stone-900">Jazakumullahu Khayran!</h4>
                  <p className="text-[11px] text-stone-600 leading-relaxed font-normal">
                    Thank you for your generous sponsorship. A secure receipts receipt has been forwarded to your email address: <strong>{donorEmail || "donor@example.com"}</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CAREERS VIEW
  if (viewType === "careers") {
    return (
      <div className="py-24 bg-stone-50 text-stone-800" id="careers">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-800/10 px-3.5 py-1.5 rounded-full inline-block">
              SHAQO • CAREER OPPORTUNITIES
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900">
              Join Our Global Scholar Team
            </h2>
            <p className="font-sans text-stone-500 max-w-xl mx-auto text-xs leading-relaxed">
              We are constantly seeking passionate, certified Quran huffadh, Islamic studies, and classical Arabic scholars to deliver elite virtual instruction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-stone-900">Active Vacancies</h3>
              {JOBS.map((job, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-display font-extrabold text-sm text-stone-900">{job.title}</h4>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[9px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">{job.requirements}</p>
                  <div className="text-xs font-bold text-emerald-700 font-mono">{job.salary}</div>
                </div>
              ))}
            </div>

            {/* Application form */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 shadow-sm">
              <h3 className="font-display font-bold text-sm text-stone-900 mb-4">Apply for a position</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCareerSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1.5">Full Name</label>
                  <input
                    id="career-name"
                    type="text"
                    required
                    placeholder="Sheikh Yusuf Al-Cali"
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1.5">Email Address</label>
                  <input
                    id="career-email"
                    type="email"
                    required
                    placeholder="yusuf@example.com"
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1.5">Quran Memorization status</label>
                  <select id="career-hifdh-status" className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none">
                    <option value="complete">Complete Quran (30 Juz) with Ijaza</option>
                    <option value="partial">Partial Quran (15+ Juz)</option>
                    <option value="none">No formal Hifdh (Arabic/Fiqh scholar only)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-600 block mb-1.5">Short Bio & Qualifications</label>
                  <textarea
                    id="career-bio"
                    required
                    rows={3}
                    placeholder="Graduated from Al-Azhar, 5 years teaching kids..."
                    className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <button
                  id="submit-career-btn"
                  type="submit"
                  className="w-full rounded-xl bg-stone-900 hover:bg-emerald-850 text-white py-3.5 text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </form>

              {careerSubmitted && (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center text-xs text-emerald-800 font-bold mt-4">
                  Masha Allah! Your career application has been received. Our senior committee will schedule a recitation verification call with you soon via Zoom.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // EVENTS VIEW
  if (viewType === "events") {
    return (
      <div className="py-24 bg-stone-50 text-stone-800" id="events">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-800/10 px-3.5 py-1.5 rounded-full inline-block">
              DHACDOOYINKA • WEBINARS & SEMINARS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900">
              Upcoming Academy Events
            </h2>
            <p className="font-sans text-stone-500 max-w-xl mx-auto text-xs leading-relaxed">
              Register for our exclusive live webinars, Islamic masterclasses, and global Quran recitation competitions.
            </p>
          </div>

          <div className="space-y-6">
            {EVENTS.map((evt, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-amber-500/10 text-amber-800 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {evt.tag}
                    </span>
                    <span className="text-xs text-stone-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{evt.date} • {evt.time}</span>
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-base text-stone-900">{evt.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed max-w-xl">{evt.desc}</p>
                </div>

                <button
                  id={`register-event-btn-${idx}`}
                  onClick={() => {
                    alert(`Simulated registration for ${evt.title} successful! We sent a calendar reminder.`);
                  }}
                  className="rounded-xl bg-stone-900 hover:bg-emerald-800 text-white px-5 py-3 text-xs font-bold transition whitespace-nowrap cursor-pointer shrink-0"
                >
                  Reserve Seat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ABOUT US VIEW
  if (viewType === "about") {
    return (
      <div className="py-24 bg-stone-50 text-stone-800" id="about">
        <div className="max-w-4xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-4">
            <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-800/10 px-3.5 py-1.5 rounded-full inline-block">
              HADAFLOOBKA • OUR STORY
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900">
              Baro Quran Academy Story
            </h2>
            <p className="font-sans text-stone-500 max-w-2xl mx-auto text-xs leading-relaxed">
              We represent the golden intersection of ancient Islamic lineage and sophisticated cloud technologies, committed to rendering the Quran accessible to families globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="font-display font-bold text-lg text-stone-900">Our Sacred Mission</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Founded by certified scholars, Baro Quran Academy emerged out of a crucial need: allowing the Somali diaspora in the UK, USA, Europe, and Canada to raise children with highly authenticated Islamic values and pristine Quranic articulation (Tajweed) from their own homes.
              </p>
              <p className="text-xs text-stone-600 leading-relaxed">
                Unlike unorganized local tutors, we represent structured learning. We provide progress records, attendance diagnostics, and formal graduation certificates checked under the authority of prestigious Islamic institutions.
              </p>
            </div>

            <div className="bg-stone-900 text-white rounded-3xl p-6 border border-emerald-500/10 space-y-4">
              <h4 className="font-display font-bold text-sm text-amber-400">Our Code of Honors</h4>
              <ul className="space-y-3 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Only certified scholars with traditional Sanad/Ijazas are accepted to teach.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Completely personalized 1-on-1 focus.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Transparent tracking and verified certification registry.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // DEFAULT: BLOG VIEW
  return (
    <div className="py-24 bg-stone-50 text-stone-800" id="blog">
      <div className="max-w-4xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <span className="text-[10px] font-bold text-emerald-800 tracking-widest uppercase bg-emerald-800/10 px-3.5 py-1.5 rounded-full inline-block">
            MAQAALLO • ACADEMY KNOWLEDGE HUB
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-stone-900">
            Latest Islamic & Quran Articles
          </h2>
          <p className="font-sans text-stone-500 max-w-xl mx-auto text-xs leading-relaxed">
            Read insightful articles written by our certified sheikhs and academic educators.
          </p>
        </div>

        {readingBlogId ? (
          <div className="bg-white rounded-3xl border border-stone-200/60 p-6 sm:p-10 shadow-sm space-y-6">
            <button
              id="back-to-blogs-btn"
              onClick={() => setReadingBlogId(null)}
              className="text-xs font-bold text-stone-500 hover:text-stone-900 transition flex items-center gap-1 cursor-pointer"
            >
              ← Back to all articles
            </button>
            {(() => {
              const article = BLOGS.find((b) => b.id === readingBlogId);
              return (
                <article className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {article?.category}
                    </span>
                    <span>{article?.date}</span>
                    <span>•</span>
                    <span>{article?.readTime}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-stone-900 leading-tight">
                    {article?.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed whitespace-pre-wrap pt-2">
                    {article?.content}
                  </p>
                </article>
              );
            })()}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOGS.map((blog) => (
              <div key={blog.id} className="bg-white rounded-3xl border border-stone-200/60 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-stone-400 font-semibold">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-full uppercase">
                      {blog.category}
                    </span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-stone-900 line-clamp-2 leading-tight">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-stone-500 leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-4 mt-auto">
                  <button
                    id={`read-blog-btn-${blog.id}`}
                    onClick={() => setReadingBlogId(blog.id)}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-700 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

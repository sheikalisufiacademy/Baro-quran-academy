import React, { useState } from "react";
import { BookOpen, Calendar, CheckCircle2, Award, Clock, FileText, Send, User, LogOut, ArrowRight, Video, Sparkles, Check, Play } from "lucide-react";
import { Registration } from "../types";

interface StudentPortalProps {
  onJoinClick: () => void;
  onLogout: () => void;
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Waa ku dhowaad imisa Nooc oo Maddad (jiidid) ah kuwaas oo ku jira qawaacidda Tajwiidka?",
    options: ["2 Nooc", "3 Nooc", "5 Nooc", "9 Nooc"],
    correctIndex: 1
  },
  {
    id: 2,
    question: "Xarafka Alif-ka marka uu leeyahay Sukuun oo uu ka horeeyo xaraf fatha leh, maxay noqonaysaa xukunkiisu?",
    options: ["Idgham", "Ikhfa", "Madd Tabici", "Iqlab"],
    correctIndex: 2
  },
  {
    id: 3,
    question: "Waa kuwee xarfaha loogu yeero 'Makharij Al-Xuroof' ee dhuunta ka soo baxa?",
    options: ["Alif, Ba, Ta", "Xamza, Haa, Cayn, Xaa, Ghayn, Khaa", "Qaaf, Kaaf, Jiim", "Ya, Waaw, Miim"],
    correctIndex: 1
  }
];

export default function StudentPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Default logged-in state to make dashboard instantly viewable
  const [username, setUsername] = useState("Cabdullaahi Cali");
  const [email, setEmail] = useState("cabdullaahi@example.com");
  const [selectedTab, setSelectedTab] = useState<"dashboard" | "attendance" | "homework" | "quiz" | "billing" | "live">("dashboard");

  // Homework file upload simulation
  const [hwFile, setHwFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [isHwSubmitted, setIsHwSubmitted] = useState(false);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // Live session mock timer
  const [liveJoined, setLiveJoined] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleHomeworkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setHwFile(file);
      setUploadProgress(0);

      // Simulate step progress upload
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsHwSubmitted(true);
            return 100;
          }
          return prev + 25;
        });
      }, 300);
    }
  };

  const handleQuizSubmit = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[600px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-stone-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-stone-200/80 shadow-lg">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-100">
              <BookOpen className="w-6 h-6" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-display font-extrabold text-stone-900">
              Gali Portal-ka Ardayda
            </h2>
            <p className="mt-2 text-center text-xs text-stone-500">
              Geli macluumaadkaaga si aad u gasho darsigaaga iyo imtixaankaaga
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1.5">Email-kaaga</label>
                <input
                  id="student-email"
                  type="email"
                  required
                  defaultValue="student@baroquran.com"
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-700/30 focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1.5">Password-kaaga</label>
                <input
                  id="student-password"
                  type="password"
                  required
                  defaultValue="••••••••"
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-700/30 focus:border-emerald-600"
                />
              </div>
            </div>

            <button
              id="student-login-submit"
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-xs font-bold rounded-xl text-white bg-emerald-800 hover:bg-emerald-700 focus:outline-none transition cursor-pointer shadow-md shadow-emerald-950/20"
            >
              Soo gal Portal-ka
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col border-r border-stone-800 shrink-0">
        <div className="p-6 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-display font-bold">
              C
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white leading-tight">
                {username}
              </h4>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                Arday (Active Student)
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard (Kormeer)", icon: BookOpen },
            { id: "live", label: "Live Class (Cashar Toos ah)", icon: Video },
            { id: "attendance", label: "Attendance (Xaadiris)", icon: CheckCircle2 },
            { id: "homework", label: "Homework (Cashar Guri)", icon: FileText },
            { id: "quiz", label: "Interactive Quiz", icon: Award },
            { id: "billing", label: "Invoices & Payments", icon: Clock },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedTab === item.id;
            return (
              <button
                key={item.id}
                id={`student-sidebar-tab-${item.id}`}
                onClick={() => setSelectedTab(item.id as any)}
                className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold transition cursor-pointer ${
                  isSelected ? "bg-emerald-800 text-white shadow-md shadow-emerald-950/40" : "hover:bg-stone-800 text-stone-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <button
            id="student-logout-btn"
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-xs font-bold text-rose-400 hover:bg-stone-800 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Ka Bax (Logout)</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        {/* Dynamic header title */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-widest block">
              Albaabka Ardayga • PORTAL
            </span>
            <h1 className="font-display text-2xl font-extrabold text-stone-900 mt-1 capitalize">
              {selectedTab === "dashboard" && "Daaqadda Guud ee Ardayga"}
              {selectedTab === "live" && "Casharka Tooska ah (Live Zoom Class)"}
              {selectedTab === "attendance" && "Xogta Xaadirista Casharrada"}
              {selectedTab === "homework" && "Geynta iyo Hubinta Homework-ga"}
              {selectedTab === "quiz" && "Damiirka Tajwiidka: Interactive Quiz"}
              {selectedTab === "billing" && "Taariikhda Lacag-bixinta & Qaansheegta"}
            </h1>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-800 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Dhibcahaaga Guud: <strong>920 XP</strong></span>
          </div>
        </div>

        {/* Tab contents */}
        {selectedTab === "dashboard" && (
          <div className="space-y-6">
            {/* Quick overview banner */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white rounded-3xl p-6 border border-emerald-500/10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 space-y-2">
                <h3 className="font-display font-bold text-lg text-white">
                  Ku soo dhowow, Cabdullaahi Cali!
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed max-w-xl">
                  Casharkaada xiga ee 1-on-1 ee <strong className="text-amber-400">Tajwiidka iyo Akhriska Qur'aanka</strong> wuxuu bilaaban doonaa maanta saacaddu marka ay tahay <span className="bg-white/10 px-2 py-0.5 rounded font-mono font-bold">18:00 UTC</span>. Macalinku wuxuu kuu diyaariyey darsi cusub!
                </p>
                <div className="pt-2">
                  <button
                    id="join-class-banner-btn"
                    onClick={() => setSelectedTab("live")}
                    className="bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl px-4 py-2.5 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Hadda ku biir Casharka (Join Class)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick statistics widgets */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Xaadirista (Attendance)</span>
                <span className="text-2xl font-bold text-stone-900 mt-1 block">94%</span>
                <div className="w-full bg-stone-100 rounded-full h-1.5 mt-3">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "94%" }}></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Darsi dhamaaday (Lessons Completed)</span>
                <span className="text-2xl font-bold text-stone-900 mt-1 block">34 / 45</span>
                <div className="w-full bg-stone-100 rounded-full h-1.5 mt-3">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Cashar Guri (Pending Homework)</span>
                <span className="text-2xl font-bold text-stone-900 mt-1 block">1</span>
                <span className="text-[10px] text-rose-500 font-bold mt-2 block">Dhamaystir kahor berri</span>
              </div>

              <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Dhibcaha Imtixaanka (Quiz Avg)</span>
                <span className="text-2xl font-bold text-stone-900 mt-1 block">92 / 100</span>
                <span className="text-[10px] text-emerald-600 font-bold mt-2 block">Premium Standard</span>
              </div>
            </div>

            {/* Main grid detailing syllabus progress & recent updates */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-4">
                <h4 className="font-display font-bold text-sm text-stone-900">
                  Heerka Darsiga & Manhajkaaga (Your Curriculum Progress)
                </h4>
                <div className="space-y-4">
                  {[
                    { title: "Makharij Al-Xuroof (Halkay Xarfuhu ka soo baxaan)", progress: 100, status: "Dhamaystiran" },
                    { title: "Xeerarka Nuun al-Saakinah iyo Tanwiin", progress: 100, status: "Dhamaystiran" },
                    { title: "Xeerarka Miim al-Saakinah iyo Qalqalah", progress: 65, status: "Hadda la baranayo" },
                    { title: "Xeerarka Maddada (Noocyada jiidista)", progress: 0, status: "Ma Bilaaban" },
                  ].map((lesson, i) => (
                    <div key={i} className="border border-stone-100 rounded-xl p-4 flex justify-between items-center bg-stone-50/50">
                      <div className="space-y-1">
                        <span className="font-bold text-xs text-stone-800 block">{lesson.title}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block ${
                          lesson.progress === 100 ? "bg-emerald-50 text-emerald-800 border border-emerald-100" :
                          lesson.progress > 0 ? "bg-amber-50 text-amber-800 border border-amber-100" : "bg-stone-100 text-stone-500"
                        }`}>
                          {lesson.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs font-bold text-stone-900">{lesson.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar notifications / updates */}
              <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-4">
                <h4 className="font-display font-bold text-sm text-stone-900">
                  Farriimihii Macalinka (Teacher Messages)
                </h4>
                <div className="space-y-3">
                  {[
                    { sender: "Sheekh Cabdiraxmaan", msg: "Masha Allah Cabdullaahi, akhrintaadii ugu dambaysay ee Nuun-ka reeban aad ayay u wanaagsanayd. Casharka guri halkan ku soo geli.", date: "Shalay" },
                    { sender: "Maamulka Akadeemiyada", msg: "Guul! Waxaad si guul leh u dhamaysatay bishii kowaad ee darsigaaga, shahaadada bisha waad heli kartaa.", date: "3 maalin kahor" }
                  ].map((notif, i) => (
                    <div key={i} className="bg-stone-50 border border-stone-100 rounded-xl p-3.5 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase">{notif.sender}</span>
                        <span className="text-[9px] text-stone-400">{notif.date}</span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{notif.msg}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Session Simulator */}
        {selectedTab === "live" && (
          <div className="bg-white rounded-3xl border border-stone-200/60 overflow-hidden shadow-sm">
            {!liveJoined ? (
              <div className="p-10 text-center space-y-6">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-100 flex items-center justify-center mx-auto animate-pulse">
                  <Video className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-stone-900">
                    Live Virtual Quran Classroom
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto leading-relaxed mt-1">
                    Connect directly with Sheikh Cabdiraxmaan Al-Xafid in our secure, high-definition interactive classroom.
                  </p>
                </div>
                <div>
                  <button
                    id="launch-live-class-btn"
                    onClick={() => setLiveJoined(true)}
                    className="bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl px-6 py-3.5 text-xs font-bold transition flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-md"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Launch HD Interactive Session</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-stone-950 p-4 text-white flex flex-col h-[500px]">
                {/* Virtual video screen */}
                <div className="flex-1 bg-stone-900 rounded-2xl overflow-hidden relative border border-white/5 flex items-center justify-center">
                  {/* Sheikh's avatar with active wave animation */}
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
                        alt="Sheikh Cabdiraxmaan"
                        className="w-24 h-24 rounded-full border-2 border-emerald-500 object-cover relative z-10"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">Sheekh Cabdiraxmaan Al-Xafid</h4>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 mt-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Recitation Check
                      </span>
                    </div>
                  </div>

                  {/* Watermark/Status Indicator */}
                  <div className="absolute top-4 left-4 bg-red-600 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider animate-pulse">
                    REC LIVE
                  </div>

                  {/* Student View (Bottom Right PIP) */}
                  <div className="absolute bottom-4 right-4 h-24 w-32 bg-stone-850 rounded-xl border border-white/10 overflow-hidden shadow-lg flex items-center justify-center">
                    <span className="text-[10px] text-stone-400 font-mono">You (Camera On)</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="p-4 border-t border-white/5 flex justify-between items-center">
                  <div className="flex items-center gap-4 text-xs">
                    <span className="font-semibold text-stone-400">Time Connected: <strong className="text-white">04:12</strong></span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      id="disconnect-live-session-btn"
                      onClick={() => setLiveJoined(false)}
                      className="bg-rose-700 hover:bg-rose-600 text-white rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer"
                    >
                      Leave Session
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Homework Upload Interface */}
        {selectedTab === "homework" && (
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
            <div className="border border-stone-100 rounded-xl p-5 bg-stone-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h4 className="font-display font-bold text-sm text-stone-900">
                  Darsi 24 Homework: Recitation check (Surah Al-Mulk: 1-5)
                </h4>
                <p className="text-xs text-stone-500">
                  Duub codkaaga oo ku akhri 5-ta aayadood ee u horeeya Surah Al-Mulk si waafaqsan xeerka Maddada.
                </p>
              </div>
              <div className="text-xs font-bold text-rose-500 bg-rose-50 border border-rose-100 rounded-xl px-3 py-1 shrink-0">
                Loo Baahan yahay Berri
              </div>
            </div>

            {/* Simulated Drag & Drop File Selector */}
            <div className="border-2 border-dashed border-stone-200 rounded-2xl p-10 text-center space-y-4 hover:border-emerald-600 hover:bg-emerald-50/10 transition duration-150 relative">
              <input
                id="homework-file-uploader"
                type="file"
                accept="audio/*,video/*,.pdf"
                onChange={handleHomeworkUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="h-12 w-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
                <Send className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-700">
                  Duubista codka ama PDF ku dhufo halkan si aad u geliso
                </p>
                <p className="text-[10px] text-stone-400 mt-1">
                  Supports MP3, WAV, M4A or PDF (Max 15MB)
                </p>
              </div>
            </div>

            {/* Upload progress indicator */}
            {uploadProgress >= 0 && (
              <div className="space-y-2 bg-stone-50 p-4 rounded-xl border border-stone-100">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-stone-700">
                    {hwFile?.name || "homework_audio.mp3"}
                  </span>
                  <span className="font-mono font-bold text-emerald-800">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              </div>
            )}

            {isHwSubmitted && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Masha Allah! Homework-gaaga waa la gudbiyey si guul leh. Macalinkaaga ayaa dib u eegi doona dhawaan.</span>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {selectedTab === "quiz" && (
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
            {!quizSubmitted ? (
              <div className="space-y-6">
                {QUIZ_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="border border-stone-100 rounded-xl p-5 bg-stone-50/50 space-y-3">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase">Question {idx + 1} of 3</span>
                    <h4 className="font-sans font-bold text-sm text-stone-900 leading-relaxed">{q.question}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = quizAnswers[q.id] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            id={`quiz-question-${q.id}-opt-${oIdx}`}
                            onClick={() => setQuizAnswers({ ...quizAnswers, [q.id]: oIdx })}
                            className={`rounded-xl p-3 text-xs font-semibold text-left border transition cursor-pointer ${
                              isSelected
                                ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                                : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-4 text-right">
                  <button
                    id="submit-student-quiz-btn"
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length}
                    className={`rounded-xl px-6 py-3 text-xs font-bold transition flex items-center gap-2 inline-flex cursor-pointer ${
                      Object.keys(quizAnswers).length < QUIZ_QUESTIONS.length
                        ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                        : "bg-emerald-800 text-white hover:bg-emerald-700 shadow-md shadow-emerald-950/20"
                    }`}
                  >
                    <span>Gudbi Imtixaanka (Submit Quiz)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center space-y-6">
                <div className="h-16 w-16 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <Award className="w-8 h-8 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-stone-900">
                    Imtixaankaaga waa la qiimeeyey!
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Waxaad keentay dhibco heer sare ah. Masha Allah!
                  </p>
                </div>

                <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-6 max-w-sm mx-auto space-y-2">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">GUUD AAHAN SCIRE</span>
                  <span className="font-mono text-4xl font-extrabold text-stone-900">
                    {quizScore} / {QUIZ_QUESTIONS.length}
                  </span>
                  <p className="text-xs font-semibold text-emerald-700">
                    {quizScore === 3 ? "Excellent! perfect 100% score." : "Very good attempt! Review lessons for a perfect grade."}
                  </p>
                </div>

                <div>
                  <button
                    id="retake-student-quiz-btn"
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                      setQuizScore(0);
                    }}
                    className="rounded-xl border border-stone-200 bg-white hover:bg-stone-50 px-5 py-2.5 text-xs font-bold text-stone-700 transition cursor-pointer"
                  >
                    Mar kale Isku day (Retake Quiz)
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Billing and Invoices Tab */}
        {selectedTab === "billing" && (
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
            <h4 className="font-display font-bold text-sm text-stone-900">
              Qaansheegyadaadii Ugu Dambeeyey (Recent Invoices)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead>
                  <tr className="border-b border-stone-100 text-stone-400">
                    <th className="pb-3 font-semibold">Qaansheeg ID</th>
                    <th className="pb-3 font-semibold">Taariikhda</th>
                    <th className="pb-3 font-semibold">Course</th>
                    <th className="pb-3 font-semibold">Lacagta (Amount)</th>
                    <th className="pb-3 font-semibold">Xaaladda (Status)</th>
                    <th className="pb-3 font-semibold text-right">Ficil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {[
                    { id: "INV-2026-004", date: "June 15, 2026", course: "Tajweed Premium (1-on-1)", amount: "$25.00", status: "Paid" },
                    { id: "INV-2026-003", date: "May 15, 2026", course: "Tajweed Premium (1-on-1)", amount: "$25.00", status: "Paid" },
                    { id: "INV-2026-002", date: "April 15, 2026", course: "Tajweed Premium (1-on-1)", amount: "$25.00", status: "Paid" }
                  ].map((inv) => (
                    <tr key={inv.id}>
                      <td className="py-4 font-mono font-bold text-stone-800">{inv.id}</td>
                      <td className="py-4">{inv.date}</td>
                      <td className="py-4 font-medium">{inv.course}</td>
                      <td className="py-4 font-bold text-stone-900">{inv.amount}</td>
                      <td className="py-4">
                        <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>{inv.status}</span>
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          id={`download-invoice-btn-${inv.id}`}
                          onClick={() => alert(`Simulated receipt download: ${inv.id}`)}
                          className="text-xs font-bold text-emerald-800 hover:text-emerald-700 transition"
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance Tracker */}
        {selectedTab === "attendance" && (
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 text-center">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Xaadiray (Present)</span>
                <span className="text-3xl font-mono font-bold text-emerald-950 block mt-1">16</span>
              </div>
              <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 text-center">
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider block">Maqnaa (Absent)</span>
                <span className="text-3xl font-mono font-bold text-rose-950 block mt-1">1</span>
              </div>
              <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-5 text-center">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Daba-gal (Rate)</span>
                <span className="text-3xl font-mono font-bold text-stone-900 block mt-1">94.1%</span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-stone-900">Recent Class Logs</h4>
              <div className="space-y-2">
                {[
                  { date: "June 24, 2026", time: "18:00 - 18:45 UTC", status: "Present", topic: "Sukuun and Shaddah Pronunciation" },
                  { date: "June 21, 2026", time: "18:00 - 18:45 UTC", status: "Present", topic: "Intro to Madd Tabici rules" },
                  { date: "June 17, 2026", time: "18:00 - 18:45 UTC", status: "Absent", topic: "Mid-month revision" },
                  { date: "June 14, 2026", time: "18:00 - 18:45 UTC", status: "Present", topic: "Connecting letters & joint phrases" }
                ].map((log, i) => (
                  <div key={i} className="border border-stone-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-stone-50/50">
                    <div className="space-y-1">
                      <span className="font-bold text-xs text-stone-800 block">{log.topic}</span>
                      <span className="text-[10px] text-stone-400 block">{log.date} • {log.time}</span>
                    </div>
                    <div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === "Present" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-rose-50 text-rose-800 border border-rose-100"
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

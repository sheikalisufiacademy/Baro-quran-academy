import React, { useState } from "react";
import { Users, FileText, CheckCircle2, Clock, Calendar, Plus, Upload, Check, Video, BarChart2, Star } from "lucide-react";

export default function TeacherPortal() {
  const [selectedTab, setSelectedTab] = useState<"dashboard" | "attendance" | "homework" | "lessons" | "schedule">("dashboard");
  const [students, setStudents] = useState([
    { id: "std-1", name: "Cabdullaahi Cali", lastLesson: "June 24", attendance: "94%", pendingReview: true },
    { id: "std-2", name: "Xamda Maxamed", lastLesson: "June 23", attendance: "100%", pendingReview: false },
    { id: "std-3", name: "Cumar Farax", lastLesson: "June 22", attendance: "88%", pendingReview: true },
  ]);

  // Homework review simulation
  const [reviewsDone, setReviewsDone] = useState<string[]>([]);

  // Lesson uploading simulator
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonFileUploaded, setLessonFileUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // New slot calendar generator
  const [slots, setSlots] = useState([
    { day: "Monday", time: "18:00 - 18:45 UTC", status: "Booked" },
    { day: "Monday", time: "19:00 - 19:45 UTC", status: "Available" },
    { day: "Wednesday", time: "18:00 - 18:45 UTC", status: "Booked" },
    { day: "Thursday", time: "20:00 - 20:45 UTC", status: "Available" },
  ]);

  const handleLessonUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonTitle.trim()) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setLessonFileUploaded(true);
      setLessonTitle("");
    }, 1200);
  };

  const handleReviewSubmission = (id: string) => {
    setReviewsDone([...reviewsDone, id]);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-stone-300 flex flex-col border-r border-stone-800 shrink-0">
        <div className="p-6 border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-display font-extrabold">
              S
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white leading-tight">
                Sheekh Cabdiraxmaan
              </h4>
              <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">
                Ustaad (Senior Scholar)
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: "dashboard", label: "Dashboard (Kormeer)", icon: Users },
            { id: "lessons", label: "Upload Lessons (Durus)", icon: Upload },
            { id: "homework", label: "Review Homework", icon: FileText },
            { id: "attendance", label: "Log Attendance", icon: CheckCircle2 },
            { id: "schedule", label: "Weekly Schedule", icon: Calendar },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = selectedTab === item.id;
            return (
              <button
                key={item.id}
                id={`teacher-sidebar-tab-${item.id}`}
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
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest block">
              Albaabka Macalimiinta • TEACHER PORTAL
            </span>
            <h1 className="font-display text-2xl font-extrabold text-stone-900 mt-1 capitalize">
              {selectedTab === "dashboard" && "Shaxda Kormeerka Macalinka"}
              {selectedTab === "lessons" && "Dajinta iyo Soo raridda Casharrada"}
              {selectedTab === "homework" && "Hubinta Casharrada Guriga (Homeworks)"}
              {selectedTab === "attendance" && "Xaadirinta Ardayda Maanta"}
              {selectedTab === "schedule" && "Maareynta Jadwalka Casharrada"}
            </h1>
          </div>

          <div className="bg-emerald-800 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm">
            <BarChart2 className="w-4 h-4" />
            <span>Saacadood oo la dhigay: <strong>120 saac</strong></span>
          </div>
        </div>

        {/* Dashboard contents */}
        {selectedTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Ardaydaada Firfircoon</span>
                <span className="text-2xl font-bold text-stone-900 mt-1 block">18 Arday</span>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Pending Homework Reviews</span>
                <span className="text-2xl font-bold text-stone-900 mt-1 block">
                  {3 - reviewsDone.length} Arday
                </span>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Casharo Toos ah maanta</span>
                <span className="text-2xl font-bold text-stone-900 mt-1 block">4 Classes</span>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200/60 p-5 shadow-sm">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Average Rating</span>
                <span className="text-2xl font-bold text-stone-900 mt-1 flex items-center gap-1.5">
                  <span>4.9</span>
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </span>
              </div>
            </div>

            {/* Students list */}
            <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-stone-900">
                Ardaydaada Kooxda & 1-on-1 (My Active Students)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-stone-600">
                  <thead>
                    <tr className="border-b border-stone-100 text-stone-400">
                      <th className="pb-3 font-semibold">Magaca Ardayga</th>
                      <th className="pb-3 font-semibold">Casharkii Ugu Dambeeyey</th>
                      <th className="pb-3 font-semibold">Boqolleyda Xaadirista</th>
                      <th className="pb-3 font-semibold text-center">Xaaladda Homework</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="py-4 font-semibold text-stone-800">{student.name}</td>
                        <td className="py-4">{student.lastLesson}</td>
                        <td className="py-4 font-mono font-bold text-emerald-800">{student.attendance}</td>
                        <td className="py-4 text-center">
                          {student.pendingReview && !reviewsDone.includes(student.id) ? (
                            <span className="bg-amber-50 border border-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block">
                              Sugaya Hubin
                            </span>
                          ) : (
                            <span className="bg-emerald-50 border border-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-[10px] font-bold inline-block">
                              Dhamaystiran
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Lesson Uploading Form */}
        {selectedTab === "lessons" && (
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
            <form onSubmit={handleLessonUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1.5">Cinwaanka Casharka (Lesson Title)</label>
                <input
                  id="lesson-title-input"
                  type="text"
                  required
                  placeholder="t.g. Xeerarka Qalqalah iyo sifooyinkooda"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-700/30 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1.5">Nooca darsiga (Format)</label>
                <select id="lesson-type-select" className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3.5 text-xs text-stone-800 focus:outline-none">
                  <option value="audio">Audio Recitation (Curi Cod)</option>
                  <option value="video">Video Presentation</option>
                  <option value="pdf">Syllabus PDF / Workbook</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-600 block mb-1.5">U geli fayl darsiga (Upload Media)</label>
                <div className="border-2 border-dashed border-stone-200 rounded-2xl p-8 text-center space-y-2 hover:border-emerald-600 cursor-pointer">
                  <Upload className="w-6 h-6 text-emerald-700 mx-auto" />
                  <p className="text-xs font-bold text-stone-700">Dooro fayl ama jiid halkan</p>
                  <span className="text-[10px] text-stone-400">PDF, MP3 or MP4 (Max 50MB)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="lesson-upload-submit-btn"
                  type="submit"
                  disabled={isUploading}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl px-6 py-3.5 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-950/20"
                >
                  {isUploading ? "Soo raraya darsiga..." : "Soo ror darsiga (Upload Lesson)"}
                </button>
              </div>
            </form>

            {lessonFileUploaded && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Masha Allah! Casharkaadii si guul leh ayaa loo soo roray, haddana ardaydu portal-kooda ayay ka arki karaan!</span>
              </div>
            )}
          </div>
        )}

        {/* Homework Review Board */}
        {selectedTab === "homework" && (
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-sm text-stone-900">
              Gudbinnadii Ardayda ee sugaya Qiimaynta (Pending Student Recitations)
            </h3>
            <div className="space-y-4">
              {students
                .filter((s) => s.pendingReview && !reviewsDone.includes(s.id))
                .map((student) => (
                  <div key={student.id} className="border border-stone-100 rounded-2xl p-4 bg-stone-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <span className="font-bold text-xs text-stone-800 block">{student.name}</span>
                      <span className="text-[10px] text-stone-500 block">Surah Al-Mulk: 1-5 (Duubis Cod)</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        id={`review-play-btn-${student.id}`}
                        onClick={() => alert(`Playing recitation audio of ${student.name}...`)}
                        className="rounded-xl border border-stone-200 bg-white hover:bg-stone-50 p-2.5 text-xs font-semibold text-stone-700 flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Video className="w-4 h-4 text-emerald-800 shrink-0" />
                        <span>Dhageyso Codka</span>
                      </button>

                      <button
                        id={`review-approve-btn-${student.id}`}
                        onClick={() => handleReviewSubmission(student.id)}
                        className="rounded-xl bg-emerald-800 hover:bg-emerald-700 p-2.5 text-xs font-bold text-white flex items-center gap-1 transition cursor-pointer shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Ansixi & Sii Grade A</span>
                      </button>
                    </div>
                  </div>
                ))}

              {students.filter((s) => s.pendingReview && !reviewsDone.includes(s.id)).length === 0 && (
                <div className="text-center py-8 text-xs text-stone-500">
                  Perfect! Dhamaan casharadii guriga waa la qiimeeyey si guul leh.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Log Attendance */}
        {selectedTab === "attendance" && (
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
            <h3 className="font-display font-bold text-sm text-stone-900">
              Xaadiriska Casharka Maanta (Attendance Logging)
            </h3>
            <div className="space-y-4">
              {students.map((student) => (
                <div key={student.id} className="border border-stone-100 rounded-xl p-4 flex justify-between items-center bg-stone-50/50">
                  <span className="font-bold text-xs text-stone-800">{student.name}</span>
                  <div className="flex items-center gap-2">
                    <button
                      id={`att-present-btn-${student.id}`}
                      onClick={() => alert(`${student.name} marked Present`)}
                      className="rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 px-3 py-1.5 text-[10px] font-bold transition"
                    >
                      Present (Xaadir)
                    </button>
                    <button
                      id={`att-absent-btn-${student.id}`}
                      onClick={() => alert(`${student.name} marked Absent`)}
                      className="rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 px-3 py-1.5 text-[10px] font-bold transition"
                    >
                      Absent (Maqan)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Schedule Timetable */}
        {selectedTab === "schedule" && (
          <div className="bg-white rounded-2xl border border-stone-200/60 p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-stone-100 pb-4">
              <h3 className="font-display font-bold text-sm text-stone-900">
                Weekly Class Timetable Slots
              </h3>
              <button
                id="add-time-slot-btn"
                onClick={() => {
                  const day = prompt("Enter day:", "Monday");
                  const time = prompt("Enter time slot:", "14:00 - 14:45 UTC");
                  if (day && time) {
                    setSlots([...slots, { day, time, status: "Available" }]);
                  }
                }}
                className="rounded-lg bg-stone-900 text-white px-3 py-1.5 text-xs font-bold transition hover:bg-stone-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Available Slot</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {slots.map((slot, i) => (
                <div key={i} className="border border-stone-100 rounded-xl p-4 bg-stone-50/50 flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="font-bold text-xs text-stone-800 block">{slot.day}</span>
                    <span className="font-mono text-[11px] text-stone-500 block">{slot.time}</span>
                  </div>
                  <div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      slot.status === "Booked" ? "bg-emerald-50 text-emerald-800 border border-emerald-100" : "bg-amber-50 text-amber-800 border border-amber-100"
                    }`}>
                      {slot.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, User, Mail, Phone, BookOpen, Clock, Sparkles } from "lucide-react";
import { COURSES } from "../data";
import { Registration } from "../types";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reg: Registration) => void;
  selectedCourseId?: string;
}

export default function RegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  selectedCourseId = "tajweed",
}: RegistrationModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState(selectedCourseId);
  const [level, setLevel] = useState("Bilaabo (Beginner)");
  const [preferredTime, setPreferredTime] = useState("Subax (Morning)");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState("");

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Fadlan qor magacaaga oo buuxa.";
    if (!phone.trim()) {
      errs.phone = "Fadlan geli lambarkaaga taleefanka/WhatsApp.";
    } else if (phone.trim().length < 6) {
      errs.phone = "Fadlan geli lambar taleefan oo sax ah.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    const newReg: Registration = {
      name,
      email,
      phone,
      course,
      level,
      preferredTime,
      notes,
    };

    // Generate random student ID
    const studentId = "BQA-" + Math.floor(100000 + Math.random() * 900000);
    setGeneratedId(studentId);

    onSubmit(newReg);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setCourse(selectedCourseId);
    setLevel("Bilaabo (Beginner)");
    setPreferredTime("Subax (Morning)");
    setNotes("");
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // WhatsApp contact helper
  const getWhatsAppLink = () => {
    const selectedCourseTitle = COURSES.find((c) => c.id === course)?.title || course;
    const text = `Assalamu Alaykum Baro Quran Academy. Waxaan iska diiwaan-geliyey mareegtiinna. 
ID-gayga waa: ${generatedId}
Magacayga: ${name}
Koorsada: ${selectedCourseTitle}
Heerka: ${level}
Waqtiga aan doorbidayo: ${preferredTime}`;
    return `https://wa.me/251999451777?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-stone-100"
            id="registration-modal-content"
          >
            {/* Top gold bar banner */}
            <div className="h-2 bg-gradient-to-r from-emerald-700 via-amber-500 to-emerald-800" />

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h3 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                {isSuccess ? "Diiwaan-gelintu Waa Guul" : "Ku Biir Academy-ga"}
              </h3>
              <button
                id="close-modal-btn"
                onClick={handleClose}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-700 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs text-stone-500 pb-2">
                    <span className={step === 1 ? "font-bold text-emerald-800" : ""}>
                      1. Macluumaadkaaga
                    </span>
                    <div className="h-1 flex-1 mx-4 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-700 transition-all duration-300"
                        style={{ width: step === 1 ? "50%" : "100%" }}
                      />
                    </div>
                    <span className={step === 2 ? "font-bold text-emerald-800" : ""}>
                      2. Doorashada Koorsada
                    </span>
                  </div>

                  {step === 1 ? (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1 flex items-center gap-1.5">
                          <User className="w-4 h-4 text-stone-400" />
                          Magacaaga oo Buuxa <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="student-name-input"
                          type="text"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors({ ...errors, name: "" });
                          }}
                          placeholder="Tusaale: Axmed Maxamed Cumar"
                          className={`w-full rounded-lg border p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 ${
                            errors.name
                              ? "border-red-300 focus:ring-red-500/20"
                              : "border-stone-200 focus:ring-emerald-700/20 focus:border-emerald-700"
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                        )}
                      </div>

                      {/* Phone / WhatsApp */}
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1 flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-stone-400" />
                          Taleefankaaga / WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="student-phone-input"
                          type="tel"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          placeholder="Tusaale: +25261xxxxxxx ama +251999451777"
                          className={`w-full rounded-lg border p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 ${
                            errors.phone
                              ? "border-red-300 focus:ring-red-500/20"
                              : "border-stone-200 focus:ring-emerald-700/20 focus:border-emerald-700"
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1 flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-stone-400" />
                          Email (Haddii uu jiro)
                        </label>
                        <input
                          id="student-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Tusaale: axmed@gmail.com"
                          className="w-full rounded-lg border border-stone-200 p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      {/* Course */}
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-stone-400" />
                          Dooro Koorsada <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="student-course-select"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className="w-full rounded-lg border border-stone-200 p-3 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                        >
                          {COURSES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title} ({c.subTitle})
                            </option>
                          ))}
                          <option value="hadith">Hadith (Barashada Xadiiska)</option>
                          <option value="quran_memo">Quran (Hifdiga Qur'aanka)</option>
                        </select>
                      </div>

                      {/* Level */}
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Heerkaaga Aqooneed ee Koorsadan
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["Bilaabo (Beginner)", "Dhexe (Intermediate)", "Sare (Advanced)"].map(
                            (lvl) => (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setLevel(lvl)}
                                className={`rounded-lg border p-2.5 text-xs font-medium text-center transition ${
                                  level === lvl
                                    ? "border-emerald-700 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-700/10"
                                    : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                                }`}
                              >
                                {lvl.split(" ")[0]}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Preferred Time */}
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1 flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-stone-400" />
                          Waqtiga Aad Dooran Lahayd
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {["Subax (Morning)", "Gelab (Afternoon)", "Habeen (Evening)"].map(
                            (time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setPreferredTime(time)}
                                className={`rounded-lg border p-2.5 text-xs font-medium text-center transition ${
                                  preferredTime === time
                                    ? "border-emerald-700 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-700/10"
                                    : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                                }`}
                              >
                                {time.split(" ")[0]}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-1">
                          Faahfaahin dheeri ah (Notes)
                        </label>
                        <textarea
                          id="student-notes-textarea"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Halkaan ku qor wixii fariin ama su'aalo ah oo aad qabto..."
                          rows={2}
                          className="w-full rounded-lg border border-stone-200 p-3 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-stone-100">
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 rounded-xl border border-stone-200 bg-white py-3 font-medium text-stone-700 hover:bg-stone-50 transition text-sm"
                      >
                        Ku laabo
                      </button>
                    )}
                    {step === 1 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex-1 rounded-xl bg-emerald-800 py-3 font-medium text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-900/10 text-sm"
                      >
                        Sii Soco
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex-1 rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 py-3 font-medium text-white hover:opacity-95 transition shadow-md shadow-emerald-900/10 text-sm"
                      >
                        Diiwaan-geli Hadda
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4 space-y-6"
                >
                  <div className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-3 text-emerald-800 ring-4 ring-emerald-500/10">
                    <CheckCircle className="w-12 h-12" />
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-stone-900 font-display">
                      Hambalyo, {name.split(" ")[0]}!
                    </h4>
                    <p className="text-stone-500 text-sm mt-1">
                      Diiwaan-gelintaada si guul leh ayaa loo aqbalay. Macalinkaaga ayaa kula soo
                      xiriiri doona WhatsApp dhawaan.
                    </p>
                  </div>

                  {/* Registration Card */}
                  <div className="bg-stone-50 rounded-2xl border border-stone-100 p-5 text-left relative overflow-hidden">
                    {/* Watermark logo */}
                    <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-[0.03]">
                      <BookOpen className="w-32 h-32 text-emerald-800" />
                    </div>

                    <div className="flex justify-between items-center mb-4 border-b border-stone-200/60 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase block">
                          BARO QURAN ACADEMY
                        </span>
                        <span className="text-xs font-mono text-stone-400">Card-ka Ardayga</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                        {generatedId}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-sm">
                      <div className="flex justify-between">
                        <span className="text-stone-400">Magaca:</span>
                        <span className="font-medium text-stone-800">{name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Koorsada:</span>
                        <span className="font-medium text-emerald-800 capitalize">
                          {COURSES.find((c) => c.id === course)?.title || course}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Heerka:</span>
                        <span className="font-medium text-stone-800">{level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-stone-400">Waqtiga:</span>
                        <span className="font-medium text-stone-800">{preferredTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp contact CTA */}
                  <div className="space-y-3">
                    <a
                      id="whatsapp-confirm-link"
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white hover:opacity-95 transition shadow-lg shadow-[#25D366]/10"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 2c-5.511 0-9.99 4.479-9.99 9.99 0 2.08.636 4.016 1.733 5.62l-1.134 4.148 4.254-1.116c1.554.954 3.372 1.512 5.32 1.512 5.511 0 9.99-4.479 9.99-9.99s-4.479-9.99-9.99-9.99zm5.348 14.152c-.226.636-1.116 1.171-1.84 1.258-.619.075-1.423.111-3.69-.836-2.906-1.212-4.739-4.168-4.885-4.364-.146-.195-1.185-1.579-1.185-3.009 0-1.43.748-2.133.1013-2.428-.266-.295-.583-.37-.778-.37-.195 0-.39.012-.562.024-.515.035-.86.291-1.116.54-.367.366-.991 1.096-.991 2.67s1.144 3.1 1.299 3.313c.155.213 2.25 3.435 5.451 4.819.762.329 1.356.525 1.82.673.766.243 1.464.209 2.015.127.615-.092 1.84-.753 2.101-1.442.261-.69.261-1.282.183-1.402-.078-.12-.284-.195-.592-.35-.308-.155-1.82-.898-2.101-1.001-.281-.102-.486-.155-.69.155-.205.308-.795.998-.975 1.205-.18.207-.36.231-.669.075-.309-.155-1.303-.481-2.482-1.534-.918-.82-1.538-1.832-1.718-2.141-.18-.309-.019-.476.136-.63.139-.138.309-.36.463-.54.154-.18.205-.309.308-.515.103-.206.051-.386-.026-.54-.077-.155-.69-1.666-.945-2.282-.249-.6-.547-.519-.748-.529-.193-.01-.414-.012-.636-.012s-.583.084-.888.423c-.305.339-1.168 1.144-1.168 2.788z" />
                      </svg>
                      Nagala soo Xiriir WhatsApp-ka
                    </a>
                    <button
                      id="close-success-btn"
                      onClick={handleClose}
                      className="w-full text-stone-500 hover:text-stone-800 font-medium py-2.5 transition text-xs"
                    >
                      Xir Daaqadda
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

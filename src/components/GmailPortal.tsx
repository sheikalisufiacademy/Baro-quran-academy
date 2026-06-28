import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Inbox,
  RefreshCw,
  LogOut,
  Check,
  AlertCircle,
  Plus,
  ChevronRight,
  BookOpen,
  Trash2,
  MailOpen,
  FileText,
  ArrowRight,
  Loader2,
  Sparkles,
  MessageSquare,
  Clock
} from "lucide-react";
import { initAuth, googleSignIn, logout } from "../lib/firebaseAuth";
import { fetchGmailMessages, sendGmailMessage, deleteGmailMessage, GmailMessage } from "../lib/gmailService";
import { motion, AnimatePresence } from "motion/react";
import { User } from "firebase/auth";
import { doc, setDoc, collection, getDocs, query, orderBy, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface GmailPortalProps {
  lang: "so" | "en" | "ar";
}

const TEMPLATES = [
  {
    title: "Codsi Cashar Bilaash ah (Trial Request)",
    subject: "Codsiga Cashar Bilaash ah - Baro Quran Academy",
    body: `Assalamu Alaikum,<br/><br/>Waxaan rabaa inaan iska diiwaan galiyo cashar bilaash ah (Free Trial) ee koorsada <strong>Barashada Quranka (Bilow ilaa Xifdi)</strong>.<br/><br/>Fadlan ila soo xiriira si aan u ballansano waqtiga.<br/><br/>Mahadsanid,<br/>[Magacaaga]`,
    recipient: "baroquranacademy1@gmail.com"
  },
  {
    title: "Weydiimo ku saabsan Qiimaha (Pricing Query)",
    subject: "Weydiimo ku saabsan Qiimaha Casharada",
    body: `Assalamu Alaikum,<br/><br/>Waxaan rabaa inaan wax ka weydiiyo qiimaha koorsada <strong>Barashada Higaada (Qaacida Nourania)</strong> iyo habka lacag bixinta.<br/><br/>Mahadsanid,<br/>[Magacaaga]`,
    recipient: "baroquranacademy1@gmail.com"
  },
  {
    title: "Gudbin Fariin Guud (General Message)",
    subject: "Fariin ku saabsan Akadeemiyada Baro Quran",
    body: `Assalamu Alaikum Maamulka Baro Quran Academy,<br/><br/>Fadlan waxaan rabaa inaan idinla wadaago fariintaan xiriirka ah:<br/><br/>[Ku qor fariintaada halkan...]<br/><br/>Mahadsanid,<br/>[Magacaaga]`,
    recipient: "baroquranacademy1@gmail.com"
  }
];

export default function GmailPortal({ lang }: GmailPortalProps) {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [messages, setMessages] = useState<GmailMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<GmailMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compose State
  const [isComposing, setIsComposing] = useState(false);
  const [toEmail, setToEmail] = useState("baroquranacademy1@gmail.com");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Local state for registered students
  const [activeView, setActiveView] = useState<"inbox" | "registrations" | "submissions">("inbox");
  const [localRegistrations, setLocalRegistrations] = useState<any[]>([]);
  const [regSearchTerm, setRegSearchTerm] = useState("");
  const [selectedReg, setSelectedReg] = useState<any | null>(null);

  // Local state for web contact submissions
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [subSearchTerm, setSubSearchTerm] = useState("");

  // local search
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFirestoreRegistrations = async () => {
    try {
      const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const list: any[] = [];
      querySnapshot.forEach((docSnapshot) => {
        list.push({ docId: docSnapshot.id, ...docSnapshot.data() });
      });
      setLocalRegistrations(list);
    } catch (err) {
      console.error("Failed to load registrations from Firestore:", err);
      // Fallback to local storage if offline/failed
      const saved = localStorage.getItem("bqa_registrations");
      if (saved) {
        try {
          setLocalRegistrations(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to parse registrations fallback:", e);
        }
      }
    }
  };

  const fetchFirestoreSubmissions = async () => {
    try {
      const q = query(collection(db, "contact_submissions"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const list: any[] = [];
      querySnapshot.forEach((docSnapshot) => {
        list.push({ docId: docSnapshot.id, ...docSnapshot.data() });
      });
      setSubmissions(list);
    } catch (err) {
      console.error("Failed to load submissions from Firestore:", err);
    }
  };

  useEffect(() => {
    if (activeView === "registrations") {
      fetchFirestoreRegistrations();
    } else if (activeView === "submissions") {
      fetchFirestoreSubmissions();
    } else if (activeView === "inbox" && token) {
      loadEmails(token);
    }
  }, [activeView]);

  const saveGmailAuthToFirestore = async (userEmail: string, accessToken: string) => {
    try {
      await setDoc(doc(db, "config", "gmail_auth"), {
        accessToken,
        adminEmail: userEmail,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.error("Failed to save Gmail token to Firestore config:", e);
    }
  };

  useEffect(() => {
    // Initialize authentication
    const unsubscribe = initAuth(
      (currentUser, cachedToken) => {
        setUser(currentUser);
        setToken(cachedToken);
        setNeedsAuth(false);
        loadEmails(cachedToken);
        if (currentUser.email && cachedToken) {
          saveGmailAuthToFirestore(currentUser.email, cachedToken);
        }
      },
      () => {
        setNeedsAuth(true);
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        loadEmails(result.accessToken);
        if (result.user.email) {
          await saveGmailAuthToFirestore(result.user.email, result.accessToken);
        }
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError("Ma suuroobin in lagu xirmo Gmail-ka. Fadlan isku day markale.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setNeedsAuth(true);
      setUser(null);
      setToken(null);
      setMessages([]);
      setSelectedMessage(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const loadEmails = async (accessToken: string) => {
    if (!accessToken) return;
    setLoading(true);
    setError(null);
    try {
      const msgs = await fetchGmailMessages(accessToken, 15);
      setMessages(msgs);
      if (msgs.length > 0 && !selectedMessage) {
        setSelectedMessage(msgs[0]);
      }
    } catch (err: any) {
      console.error("Failed to load emails:", err);
      setError("Waan awoodi weynay inaan soo jiidno fariimahaaga Gmail-ka. Waxaa laga yaabaa in token-ku uu dhacay.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    // MANDATORY confirmation dialog before sending an email
    const confirmed = window.confirm(
      `Ma hubtaa inaad rabto inaad fariintaan u dirto: ${toEmail}?\nSubject: ${subject}`
    );
    if (!confirmed) return;

    setSending(true);
    setError(null);
    try {
      await sendGmailMessage(token, toEmail, subject, emailBody);
      setSendSuccess(true);
      setSubject("");
      setEmailBody("");
      setIsComposing(false);
      setTimeout(() => {
        setSendSuccess(false);
      }, 5000);
      // Reload inbox to see the sent draft or update
      loadEmails(token);
    } catch (err: any) {
      console.error("Send failed:", err);
      setError("Waan u dhowaan weynay inaan dirno email-ka. Fadlan isku day markale.");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteEmail = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!token) return;

    // MANDATORY confirmation dialog before deleting an email
    const confirmed = window.confirm("Ma hubtaa inaad rabto inaad u wareejiso email-kan qashinka (Trash)?");
    if (!confirmed) return;

    setError(null);
    try {
      await deleteGmailMessage(token, id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Waan awoodi weynay inaan fariinta tirtirno.");
    }
  };

  const handleDeleteReg = async (id: string, name: string, docId?: string) => {
    const confirmed = window.confirm(`Ma hubtaa inaad rabto inaad tirtirto diiwaan-gelinta ardayga: ${name}?`);
    if (!confirmed) return;
    
    // Remove locally
    const updated = localRegistrations.filter((r) => r.id !== id && r.docId !== docId);
    setLocalRegistrations(updated);
    
    // Save locally
    localStorage.setItem("bqa_registrations", JSON.stringify(updated));
    if (selectedReg?.id === id || (docId && selectedReg?.docId === docId)) {
      setSelectedReg(null);
    }

    // Remove from Firestore if docId exists
    if (docId) {
      try {
        await deleteDoc(doc(db, "registrations", docId));
        console.log("Deleted registration from Firestore successfully.");
      } catch (err) {
        console.error("Failed to delete from Firestore:", err);
      }
    }
  };

  const handleDeleteSub = async (docId: string) => {
    const confirmed = window.confirm("Ma hubtaa inaad rabto inaad tirtirto fariintan?");
    if (!confirmed) return;
    
    // Remove locally
    const updated = submissions.filter((s) => s.docId !== docId);
    setSubmissions(updated);
    if (selectedSub?.docId === docId) {
      setSelectedSub(null);
    }

    // Remove from Firestore
    try {
      await deleteDoc(doc(db, "contact_submissions", docId));
      console.log("Deleted contact submission successfully.");
    } catch (err) {
      console.error("Failed to delete contact submission from Firestore:", err);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const term = subSearchTerm.toLowerCase();
    return (
      (sub.name || "").toLowerCase().includes(term) ||
      (sub.email || "").toLowerCase().includes(term) ||
      (sub.message || "").toLowerCase().includes(term)
    );
  });

  const filteredRegs = localRegistrations.filter((reg) => {
    const term = regSearchTerm.toLowerCase();
    return (
      (reg.name || "").toLowerCase().includes(term) ||
      (reg.phone || "").toLowerCase().includes(term) ||
      (reg.email || "").toLowerCase().includes(term) ||
      (reg.country || "").toLowerCase().includes(term) ||
      (reg.city || "").toLowerCase().includes(term) ||
      (reg.course || "").toLowerCase().includes(term)
    );
  });

  const applyTemplate = (tpl: typeof TEMPLATES[0]) => {
    setToEmail(tpl.recipient);
    setSubject(tpl.subject);
    // Replace placeholder with user's name if logged in
    const personalizedBody = tpl.body.replace("[Magacaaga]", user?.displayName || "Arday");
    setEmailBody(personalizedBody);
  };

  const filteredMessages = messages.filter((msg) => {
    const term = searchTerm.toLowerCase();
    return (
      msg.subject.toLowerCase().includes(term) ||
      msg.from.toLowerCase().includes(term) ||
      msg.snippet.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="gmail-integration-portal">
      {/* Header section of portal */}
      <div className="text-center space-y-4 mb-10">
        <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 tracking-widest uppercase bg-emerald-800/10 dark:bg-emerald-400/10 px-3.5 py-1.5 rounded-full inline-block">
          GMAIL INTEGRATION • ✉️
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
          Xiriirka Gmail-ka ee Akadeemiyada
        </h2>
        <p className="font-sans text-stone-500 max-w-2xl mx-auto text-xs leading-relaxed">
          Ku xiro Gmail-kaaga si aad si toos ah ula soo xiriirto macalimiinta, u gudbiso su'aalahaaga oo aad u aragto fariimahaaga adigoo ku dhex jira mareegta rasmiga ah ee Baro Quran Academy.
        </p>
      </div>

      {/* Auth Gate Screen */}
      {needsAuth ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl border border-stone-200/60 p-8 text-center shadow-lg space-y-6">
          <div className="mx-auto h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 text-emerald-800">
            <Mail className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-lg text-stone-900">Ku Xiro Google Account</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-sans">
              Waxaan u baahanahay fasax si aan u tusno fariimahaaga Gmail-ka ee la xiriira akadeemiyada iyo inaan kuu sahlidno inaad email u dirto maamulka ama macalimiinta.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-3 text-left text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Official Google Sign-In Button */}
          <button
            id="gmail-gsi-signin-btn"
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-3 bg-white border border-stone-300 hover:border-stone-400 text-stone-700 font-semibold py-3 px-4 rounded-xl shadow-sm hover:shadow transition cursor-pointer text-xs font-sans disabled:opacity-50"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-emerald-800" />
                <span>Waxaa lagugu xirayaa Google...</span>
              </>
            ) : (
              <>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>Ku Soo gal Google Workspace</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Full Dashboard Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: User Info & Compose & Templates */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-12 h-12 rounded-full border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center font-bold">
                    {user?.displayName?.charAt(0) || "U"}
                  </div>
                )}
                <div className="text-left">
                  <h4 className="font-display font-bold text-sm text-stone-900 flex items-center gap-1">
                    <span>{user?.displayName}</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Ku Xiran</span>
                  </h4>
                  <p className="text-[11px] text-stone-500 font-mono break-all">{user?.email}</p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  id="gmail-refresh-btn"
                  onClick={() => token && loadEmails(token)}
                  disabled={loading}
                  className="flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-700 disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span>Cusboonaysii</span>
                </button>

                <button
                  id="gmail-signout-btn"
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Ka Bax Connection-ka</span>
                </button>
              </div>
            </div>

            {/* Admin Tabs */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-4 shadow-sm flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block text-left px-2 py-1">
                Qaybaha Maamulka
              </span>
              <button
                id="tab-view-inbox"
                type="button"
                onClick={() => setActiveView("inbox")}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  activeView === "inbox" 
                    ? "bg-emerald-800 text-white shadow-md shadow-emerald-950/20" 
                    : "hover:bg-stone-50 text-stone-600 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Inbox className="w-4 h-4 shrink-0" />
                  <span>Fariimaha Inbox-ka</span>
                </div>
                {messages.length > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeView === "inbox" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                  }`}>
                    {messages.length}
                  </span>
                )}
              </button>

              <button
                id="tab-view-registrations"
                type="button"
                onClick={() => setActiveView("registrations")}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  activeView === "registrations" 
                    ? "bg-emerald-800 text-white shadow-md shadow-emerald-950/20" 
                    : "hover:bg-stone-50 text-stone-600 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Ardayda Is-diiwaangelisay</span>
                </div>
                {localRegistrations.length > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeView === "registrations" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                  }`}>
                    {localRegistrations.length}
                  </span>
                )}
              </button>

              <button
                id="tab-view-submissions"
                type="button"
                onClick={() => setActiveView("submissions")}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                  activeView === "submissions" 
                    ? "bg-emerald-800 text-white shadow-md shadow-emerald-950/20" 
                    : "hover:bg-stone-50 text-stone-600 hover:text-stone-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Fariimaha Mareegta (Contact Form)</span>
                </div>
                {submissions.length > 0 && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    activeView === "submissions" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"
                  }`}>
                    {submissions.length}
                  </span>
                )}
              </button>
            </div>

            {/* Compose triggers & Quick Templates */}
            <div className="bg-white rounded-3xl border border-stone-200/60 p-6 shadow-sm space-y-4">
              <h4 className="font-display font-bold text-sm text-stone-900 border-b border-stone-100 pb-2.5 text-left flex items-center gap-1.5">
                <Send className="w-4 h-4 text-emerald-700" />
                <span>Fariin u Dir Akadeemiyada</span>
              </h4>

              <button
                id="gmail-compose-new-trigger"
                onClick={() => {
                  setIsComposing(true);
                  setToEmail("baroquranacademy1@gmail.com");
                  setSubject("");
                  setEmailBody("");
                }}
                className="w-full rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white py-3 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Qor Email Cusub</span>
              </button>

              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block text-left">
                  Musaacad Fariin oo Degdeg ah (Templates)
                </span>

                <div className="space-y-1.5 text-left">
                  {TEMPLATES.map((tpl, i) => (
                    <button
                      key={i}
                      id={`gmail-tpl-btn-${i}`}
                      onClick={() => {
                        setIsComposing(true);
                        applyTemplate(tpl);
                      }}
                      className="w-full text-left rounded-xl p-2.5 border border-stone-100 hover:border-emerald-600/30 hover:bg-emerald-50/20 text-xs transition block group"
                    >
                      <div className="font-semibold text-stone-800 group-hover:text-emerald-800 flex items-center justify-between">
                        <span>{tpl.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                      <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">To: {tpl.recipient}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Inbox & Active mail reader */}
          <div className="lg:col-span-8 space-y-6">

            {/* Compose Area if Active */}
            <AnimatePresence>
              {isComposing && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl border-2 border-emerald-800/20 p-6 shadow-md text-left space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-stone-100 pb-3">
                    <h3 className="font-display font-bold text-sm text-stone-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-800" />
                      <span>Email Cusub (Compose Message)</span>
                    </h3>
                    <button
                      id="gmail-compose-close"
                      onClick={() => setIsComposing(false)}
                      className="text-stone-400 hover:text-stone-700 text-xs font-bold"
                    >
                      Cancel [x]
                    </button>
                  </div>

                  <form onSubmit={handleSendEmail} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">To (Ku Socota)</label>
                        <input
                          type="email"
                          required
                          value={toEmail}
                          onChange={(e) => setToEmail(e.target.value)}
                          className="w-full rounded-xl bg-stone-50 border border-stone-200 p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Subject (Ciwaanka)</label>
                        <input
                          type="text"
                          required
                          placeholder="Fadlan ku qor ciwaanka..."
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full rounded-xl bg-stone-50 border border-stone-200 p-2.5 text-xs text-stone-800 focus:outline-none focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-1">Message Body (Fariinta)</label>
                      <textarea
                        required
                        rows={6}
                        placeholder="Halkan ku qor faahfaahinta fariintaada..."
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs text-stone-800 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsComposing(false)}
                        className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-bold text-stone-600 hover:bg-stone-50 transition cursor-pointer"
                      >
                        Buris
                      </button>
                      <button
                        id="gmail-send-submit-btn"
                        type="submit"
                        disabled={sending}
                        className="rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-2.5 text-xs font-bold transition flex items-center gap-1.5 shadow disabled:opacity-50 cursor-pointer"
                      >
                        {sending ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>La dirayaa...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Dir Fariinta (Send)</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification messages */}
            {sendSuccess && (
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Masha Allah! Email-kaaga si guul leh ayaa loo diray. Waxaad ka heli doontaa jawaab dhowaan.</span>
              </div>
            )}

            {/* Conditional Rendering of Inbox Panel or Registrations Panel */}
            {activeView === "inbox" && (
              /* Inbox Panel */
              <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px] text-left">
                
                {/* Inbox list side */}
                <div className="w-full md:w-2/5 border-r border-stone-100 flex flex-col h-full">
                  <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Inbox className="w-4 h-4 text-stone-600" />
                      <span className="font-display font-bold text-xs text-stone-900">Inbox ({filteredMessages.length})</span>
                    </div>
                    
                    {/* Small loading indicator */}
                    {loading && <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-800" />}
                  </div>

                  {/* Local search in emails */}
                  <div className="p-2 border-b border-stone-100 shrink-0">
                    <input
                      type="text"
                      placeholder="Raadi fariimaha..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-[10px] focus:outline-none"
                    />
                  </div>

                  {/* List scroll area */}
                  <div className="overflow-y-auto flex-1 divide-y divide-stone-100">
                    {loading && messages.length === 0 ? (
                      <div className="p-8 text-center text-xs text-stone-400 space-y-2">
                        <Loader2 className="w-5 h-5 animate-spin mx-auto text-emerald-800" />
                        <p>Waxaa la soo jiidayaa fariimaha Gmail-ka...</p>
                      </div>
                    ) : filteredMessages.length === 0 ? (
                      <div className="p-8 text-center text-xs text-stone-400">
                        Ma jiraan wax fariimo ah oo la helay.
                      </div>
                    ) : (
                      filteredMessages.map((msg) => {
                        const isSelected = selectedMessage?.id === msg.id;
                        return (
                          <div
                            key={msg.id}
                            id={`gmail-msg-item-${msg.id}`}
                            onClick={() => setSelectedMessage(msg)}
                            className={`p-3.5 text-left cursor-pointer transition flex flex-col justify-between hover:bg-stone-50/50 ${
                              isSelected ? "bg-emerald-50/30 border-l-4 border-emerald-800" : ""
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[10px] font-bold text-stone-800 truncate max-w-[130px]">
                                {msg.from.split(" <")[0]}
                              </span>
                              <span className="text-[8px] text-stone-400 shrink-0 font-mono">
                                {msg.date.split(",")[0]}
                              </span>
                            </div>
                            <h5 className="font-bold text-[11px] text-stone-900 truncate mt-1">
                              {msg.subject}
                            </h5>
                            <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                              {msg.snippet}
                            </p>

                            {/* Quick delete trash button */}
                            <div className="flex justify-end mt-2">
                              <button
                                id={`gmail-delete-btn-${msg.id}`}
                                onClick={(e) => handleDeleteEmail(msg.id, e)}
                                className="text-stone-300 hover:text-red-600 transition p-1 rounded hover:bg-stone-100"
                                title="Tirtir fariintaan"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Reader panel side */}
                <div className="w-full md:w-3/5 flex flex-col h-full bg-white">
                  {selectedMessage ? (
                    <div className="flex flex-col h-full">
                      {/* Header bar of email */}
                      <div className="p-5 border-b border-stone-100 bg-stone-50/30 shrink-0">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="font-display font-extrabold text-sm text-stone-900 leading-tight">
                              {selectedMessage.subject}
                            </h4>
                            <div className="text-[10px] text-stone-500 mt-1.5 space-y-0.5">
                              <p><span className="font-bold text-stone-700">Ka:</span> {selectedMessage.from}</p>
                              <p><span className="font-bold text-stone-700">Ku:</span> {selectedMessage.to}</p>
                              <p><span className="font-bold text-stone-700">Waqtiga:</span> {selectedMessage.date}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Email body render */}
                      <div className="p-6 overflow-y-auto flex-1 text-xs text-stone-750 font-sans leading-relaxed text-left">
                        {selectedMessage.body.includes("<") ? (
                          /* If body has HTML tag, safely render innerHTML or plain fallback */
                          <div
                            className="space-y-4 font-sans text-stone-700 prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: selectedMessage.body }}
                          />
                        ) : (
                          <div className="whitespace-pre-wrap font-sans text-stone-700">
                            {selectedMessage.body}
                          </div>
                        )}
                      </div>

                      {/* Quick Reply footer */}
                      <div className="p-4 bg-stone-50 border-t border-stone-100 shrink-0 flex items-center justify-between gap-4">
                        <span className="text-[10px] text-stone-400 font-semibold">
                          Fariintaan waxaa laga helay Gmail-kaaga.
                        </span>

                        <button
                          id="gmail-quick-reply-btn"
                          onClick={() => {
                            setIsComposing(true);
                            setToEmail(selectedMessage.from.includes("<") ? selectedMessage.from.split("<")[1].split(">")[0] : selectedMessage.from);
                            setSubject(`Re: ${selectedMessage.subject}`);
                            setEmailBody(`\n\n\n--- Hore loogu soo diray ---\nFrom: ${selectedMessage.from}\nSubject: ${selectedMessage.subject}\n\n${selectedMessage.snippet}`);
                          }}
                          className="rounded-xl bg-stone-900 hover:bg-emerald-800 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>Ka Jawaab (Reply)</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-3">
                      <MailOpen className="w-12 h-12 text-stone-200" />
                      <h4 className="font-display font-bold text-sm text-stone-500">Dooro Fariin</h4>
                      <p className="text-xs max-w-xs leading-relaxed">
                        Guji mid ka mid ah fariimaha bidixda ku yaala si aad u akhriso faahfaahinteeda dhammaystiran halkan.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {activeView === "registrations" && (
              /* Registrations Panel */
              <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px] text-left">
                
                {/* Left side: registrations list */}
                <div className="w-full md:w-2/5 border-r border-stone-100 flex flex-col h-full">
                  <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-emerald-850" />
                      <span className="font-display font-bold text-xs text-stone-900">Diiwaan-gelinta ({filteredRegs.length})</span>
                    </div>
                  </div>

                  {/* Registration search */}
                  <div className="p-2 border-b border-stone-100 shrink-0">
                    <input
                      type="text"
                      placeholder="Raadi ardayda..."
                      value={regSearchTerm}
                      onChange={(e) => setRegSearchTerm(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-[10px] focus:outline-none"
                    />
                  </div>

                  {/* List area */}
                  <div className="overflow-y-auto flex-1 divide-y divide-stone-100">
                    {filteredRegs.length === 0 ? (
                      <div className="p-8 text-center text-xs text-stone-400 space-y-1">
                        <p className="font-bold">Ma jiraan arday is-diiwaangelisay.</p>
                        <p className="text-[10px] leading-normal text-stone-400">Ardayda marka ay is-diiwaangeliyaan halkan ayay kusoo dhacayaan.</p>
                      </div>
                    ) : (
                      filteredRegs.map((reg) => {
                        const isSelected = selectedReg?.id === reg.id;
                        return (
                          <div
                            key={reg.id}
                            onClick={() => setSelectedReg(reg)}
                            className={`p-3.5 text-left cursor-pointer transition flex flex-col justify-between hover:bg-stone-50/50 ${
                              isSelected ? "bg-emerald-50/30 border-l-4 border-emerald-800" : ""
                            }`}
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className="text-[11px] font-bold text-stone-850 truncate max-w-[140px]">
                                {reg.name}
                              </span>
                              <span className="text-[9px] text-emerald-800 font-mono bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                                {reg.id}
                              </span>
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-[10px] text-stone-500 font-medium truncate max-w-[130px]">
                                {reg.course}
                              </span>
                              <span className="text-[9px] text-stone-400">
                                {reg.country}
                              </span>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right side: student details */}
                <div className="w-full md:w-3/5 flex flex-col h-full bg-white">
                  {selectedReg ? (
                    <div className="flex flex-col h-full">
                      {/* Header bar of student */}
                      <div className="p-5 border-b border-stone-100 bg-stone-50/30 shrink-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[9px] font-bold text-emerald-800 tracking-widest uppercase block mb-1">
                              BARO QURAN ACADEMY • ARDAY
                            </span>
                            <h4 className="font-display font-extrabold text-base text-stone-900 leading-tight">
                              {selectedReg.name}
                            </h4>
                          </div>
                          <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-lg">
                            {selectedReg.id}
                          </span>
                        </div>
                      </div>

                      {/* Student full info list */}
                      <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs text-stone-700 leading-relaxed text-left">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Email-ka:</span>
                            <span className="text-stone-800 font-semibold font-mono break-all">{selectedReg.email}</span>
                          </div>

                          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">WhatsApp Phone:</span>
                            <span className="text-emerald-850 font-bold font-sans">{selectedReg.phone}</span>
                          </div>

                          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Wadanka & Magaalada:</span>
                            <span className="text-stone-800 font-semibold">{selectedReg.country} ({selectedReg.city})</span>
                          </div>

                          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Koorsada La Doortay:</span>
                            <span className="text-stone-800 font-semibold">{selectedReg.course}</span>
                          </div>

                          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Qorshaha Lacagta:</span>
                            <span className="text-emerald-800 font-bold">{selectedReg.paymentPlan}</span>
                          </div>

                          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Habka Diwaan-gelinta:</span>
                            <span className="text-stone-800 font-medium">
                              {selectedReg.studentType === "single" ? "Keli (Single Student)" : "Wada-jir / Qoys (Family/Group)"}
                            </span>
                          </div>
                        </div>

                        {selectedReg.extraStudents && selectedReg.extraStudents.filter((n: string) => n.trim() !== "").length > 0 && (
                          <div className="bg-emerald-50/50 border border-emerald-100 p-4 rounded-xl space-y-1.5">
                            <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">Ardayda Kale ee la socota (Group Students):</span>
                            <p className="text-stone-850 font-semibold">
                              {selectedReg.extraStudents.filter((n: string) => n.trim() !== "").join(", ")}
                            </p>
                          </div>
                        )}

                        {selectedReg.notes && (
                          <div className="bg-stone-50 border border-stone-200/60 p-4 rounded-xl space-y-1.5">
                            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Notes / Fariin:</span>
                            <p className="text-stone-700 italic">"{selectedReg.notes}"</p>
                          </div>
                        )}
                      </div>

                      {/* Bottom action bar */}
                      <div className="p-4 bg-stone-50 border-t border-stone-100 shrink-0 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => handleDeleteReg(selectedReg.id, selectedReg.name, selectedReg.docId)}
                          className="rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-100 px-4 py-2 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Tirtir Diiwaan-gelinta</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsComposing(true);
                              setToEmail(selectedReg.email);
                              setSubject(`Ku soo dhowow Baro Quran Academy - Diwaan-gelintaada`);
                              setEmailBody(`Assalamu Alaikum Warahmatullahi Wabarakatuh ${selectedReg.name},\n\nKu soo dhowow Akadeemiyada rasmiga ah ee Baro Quran Academy.\n\nWaxaan helnay diwaan-gelintaada ku aadan koorsada: ${selectedReg.course} (${selectedReg.paymentPlan}).\n\nWaxaan kugula soo xiriiri doonaa WhatsApp (${selectedReg.phone}) dhowaan.\n\nMahadsanid,\nMaamulka Baro Quran Academy`);
                            }}
                            className="rounded-xl bg-stone-900 hover:bg-stone-850 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Email u dir</span>
                          </button>

                          <a
                            href={`https://wa.me/${selectedReg.phone.replace(/[^0-9+]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M12.031 2c-5.511 0-9.99 4.479-9.99 9.99 0 2.08.636 4.016 1.733 5.62l-1.134 4.148 4.254-1.116c1.554.954 3.372 1.512 5.32 1.512 5.511 0 9.99-4.479 9.99-9.99s-4.479-9.99-9.99-9.99zm5.348 14.152c-.226.636-1.116 1.171-1.84 1.258-.619.075-1.423.111-3.69-.836-2.906-1.212-4.739-4.168-4.885-4.364-.146-.195-1.185-1.579-1.185-3.009 0-1.43.748-2.133.1013-2.428-.266-.295-.583-.37-.778-.37-.195 0-.39.012-.562.024-.515.035-.86.291-1.116.54-.367.366-.991 1.096-.991 2.67s1.144 3.1 1.299 3.313c.155.213 2.25 3.435 5.451 4.819.762.329 1.356.525 1.82.673.766.243 1.464.209 2.015.127.615-.092 1.84-.753 2.101-1.442.261-.69.261-1.282.183-1.402-.078-.12-.284-.195-.592-.35-.308-.155-1.82-.898-2.101-1.001-.281-.102-.486-.155-.69.155-.205.308-.795.998-.975 1.205-.18.207-.36.231-.669.075-.309-.155-1.303-.481-2.482-1.534-.918-.82-1.538-1.832-1.718-2.141-.18-.309-.019-.476.136-.63.139-.138.309-.36.463-.54.154-.18.205-.309.308-.515.103-.206.051-.386-.026-.54-.077-.155-.69-1.666-.945-2.282-.249-.6-.547-.519-.748-.529-.193-.01-.414-.012-.636-.012s-.583.084-.888.423c-.305.339-1.168 1.144-1.168 2.788z" />
                            </svg>
                            <span>WhatsApp Chat</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-3">
                      <FileText className="w-12 h-12 text-stone-200" />
                      <h4 className="font-display font-bold text-sm text-stone-500">Dooro Arday</h4>
                      <p className="text-xs max-w-xs leading-relaxed">
                        Guji mid ka mid ah ardayda bidixda ku yaala si aad u akhriso faahfaahinteeda dhammaystiran halkan.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {activeView === "submissions" && (
              /* Submissions Panel */
              <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px] text-left">
                {/* Left side: contact list */}
                <div className="w-full md:w-2/5 border-r border-stone-100 flex flex-col h-full">
                  <div className="p-4 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-emerald-800" />
                      <span className="font-display font-bold text-xs text-stone-900">Fariimaha Mareegta ({filteredSubmissions.length})</span>
                    </div>
                  </div>

                  {/* Search in contact submissions */}
                  <div className="p-2 border-b border-stone-100 shrink-0">
                    <input
                      type="text"
                      placeholder="Raadi fariimaha..."
                      value={subSearchTerm}
                      onChange={(e) => setSubSearchTerm(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-[10px] focus:outline-none"
                    />
                  </div>

                  {/* List scroll area */}
                  <div className="overflow-y-auto flex-1 divide-y divide-stone-100">
                    {filteredSubmissions.length === 0 ? (
                      <div className="p-8 text-center text-xs text-stone-400">
                        Ma jiraan fariimo la helay.
                      </div>
                    ) : (
                      filteredSubmissions.map((sub) => {
                        const isSelected = selectedSub?.docId === sub.docId;
                        return (
                          <button
                            key={sub.docId}
                            onClick={() => setSelectedSub(sub)}
                            className={`w-full p-4 text-left transition flex flex-col gap-1 cursor-pointer ${
                              isSelected ? "bg-emerald-50/75 border-l-4 border-emerald-800" : "hover:bg-stone-50"
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="font-semibold text-xs text-stone-900">{sub.name}</span>
                              <span className="text-[9px] text-stone-400 font-mono">
                                {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : ""}
                              </span>
                            </div>
                            <span className="text-[10px] text-stone-500 truncate">{sub.email}</span>
                            <p className="text-[11px] text-stone-600 line-clamp-2 mt-0.5">{sub.message}</p>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right side: Detailed Contact View */}
                <div className="w-full md:w-3/5 flex flex-col h-full bg-stone-50/20">
                  {selectedSub ? (
                    <div className="flex-1 flex flex-col h-full overflow-hidden">
                      {/* Sub Header */}
                      <div className="p-6 border-b border-stone-100 bg-white shrink-0 flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-bold text-sm text-stone-900">{selectedSub.name}</h3>
                          <p className="text-xs text-stone-500 font-mono mt-0.5">{selectedSub.email}</p>
                        </div>
                        {selectedSub.createdAt && (
                          <div className="text-right flex items-center gap-1.5 text-stone-400 text-[10px] font-mono">
                            <Clock className="w-3.5 h-3.5 text-stone-300" />
                            <span>{new Date(selectedSub.createdAt).toLocaleString()}</span>
                          </div>
                        )}
                      </div>

                      {/* Content scroll area */}
                      <div className="p-6 overflow-y-auto flex-1 space-y-6">
                        <div className="bg-white p-5 rounded-2xl border border-stone-200/60 shadow-sm space-y-3">
                          <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Fariinta uu reebay (Message):</span>
                          <div className="whitespace-pre-wrap font-sans text-stone-800 text-xs leading-relaxed">
                            {selectedSub.message}
                          </div>
                        </div>
                      </div>

                      {/* Bottom action bar */}
                      <div className="p-4 bg-stone-50 border-t border-stone-100 shrink-0 flex flex-wrap items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => handleDeleteSub(selectedSub.docId)}
                          className="rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-100 px-4 py-2 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Tirtir Fariintan</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setIsComposing(true);
                              setToEmail(selectedSub.email);
                              setSubject(`Ku saabsan Fariintaada - Baro Quran Academy`);
                              setEmailBody(`Assalamu Alaikum ${selectedSub.name},\n\nWaxaan helnay fariintaadii aad noogu soo dirtay Mareegta.\n\n[Ku qor jawaabtaada halkan...]\n\nMahadsanid,\nMaamulka Baro Quran Academy`);
                            }}
                            className="rounded-xl bg-stone-900 hover:bg-stone-850 text-white px-4 py-2 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Mail className="w-4 h-4" />
                            <span>Email uga Jawaab</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-3">
                      <MessageSquare className="w-12 h-12 text-stone-200" />
                      <h4 className="font-display font-bold text-sm text-stone-500">Dooro Fariin</h4>
                      <p className="text-xs max-w-xs leading-relaxed">
                        Guji mid ka mid ah fariimaha bidixda ku yaala si aad u akhriso faahfaahinteeda dhammaystiran halkan.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}

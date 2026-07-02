import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  CheckCircle,
  User,
  Mail,
  Phone,
  BookOpen,
  Clock,
  Sparkles,
  MapPin,
  Globe,
  DollarSign,
  Plus,
  Trash2,
  Users,
  MessageSquare,
  Loader2,
  MailWarning
} from "lucide-react";
import { COURSES } from "../data";
import { Registration } from "../types";
import { sendGmailMessage } from "../lib/gmailService";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reg: Registration) => void;
  selectedCourseId?: string;
}

const COUNTRIES = [
  "Somalia",
  "Somaliland",
  "United Kingdom",
  "United States",
  "Canada",
  "Sweden",
  "Norway",
  "Finland",
  "Germany",
  "Kenya",
  "Ethiopia",
  "Djibouti",
  "Saudi Arabia",
  "UAE",
  "Qatar",
  "Egypt",
  "Turkey",
  "Wadan Kale (Specify...)"
];

export default function RegistrationModal({
  isOpen,
  onClose,
  onSubmit,
  selectedCourseId = "higaada",
}: RegistrationModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [customCountry, setCustomCountry] = useState("");
  const [city, setCity] = useState("Online");
  const [course, setCourse] = useState(selectedCourseId);
  const [level, setLevel] = useState("Bilaabo (Beginner)");
  const [studyDays, setStudyDays] = useState<number>(3); // Default to 3 days/week
  const [preferredTime, setPreferredTime] = useState("Habeen (Evening: 6:00 PM - 10:00 PM)");
  const [paymentPlan, setPaymentPlan] = useState(""); 
  const [notes, setNotes] = useState("");
  
  // Single vs Multiple Students
  const [studentType, setStudentType] = useState<"single" | "multiple">("single");
  const [studentCount, setStudentCount] = useState("1");
  // Extra students list (dynamic inputs)
  const [extraStudents, setExtraStudents] = useState<string[]>([]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  
  // Gmail dispatch indicators
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ success: boolean; message: string } | null>(null);

  // Dynamic Pricing Helpers
  const studentTotalCount = studentType === "single" ? 1 : extraStudents.length + 1;

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

  // Sync Payment Plan selection state string
  useEffect(() => {
    const currentPrice = getCalculatedPrice(studyDays, studentTotalCount);
    const standardPrice = getStandardPrice(studyDays, studentTotalCount);
    const saving = standardPrice - currentPrice;
    
    let planString = `$${currentPrice}/Month (${studyDays} Days/Week)`;
    if (studentTotalCount > 1) {
      planString += ` [${studentTotalCount} Students - Family Discount Applied]`;
      if (saving > 0) {
        planString += ` (Saves $${saving})`;
      }
    }
    setPaymentPlan(planString);
  }, [studyDays, studentType, extraStudents.length]);

  // Keep course sync'd
  useEffect(() => {
    if (selectedCourseId) {
      setCourse(selectedCourseId);
    }
  }, [selectedCourseId]);

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Fadlan qor magacaaga oo buuxa.";
    if (!country.trim()) {
      errs.country = "Fadlan dooro wadanka aad joogto.";
    } else if (country === "Wadan Kale (Specify...)" && !customCountry.trim()) {
      errs.country = "Fadlan qor magaca wadankaaga.";
    }
    if (!email.trim()) {
      errs.email = "Fadlan qor Gmail-kaaga si lagugu soo diro fariin diiwaan-gelin.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Fadlan qor email sax ah.";
    }
    if (!phone.trim()) {
      errs.phone = "Fadlan qor lambarkaaga WhatsApp.";
    } else if (phone.trim().length < 6) {
      errs.phone = "Fadlan geli lambar WhatsApp oo sax ah.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStudentCountChange = (count: string) => {
    setStudentCount(count);
    if (count === "1") {
      setStudentType("single");
      setExtraStudents([]);
    } else {
      setStudentType("multiple");
      let numExtra = 1;
      if (count === "2") numExtra = 1;
      else if (count === "3") numExtra = 2;
      else if (count === "4") numExtra = 3;
      else if (count === "5+") numExtra = 4;
      
      const newExtra = Array(numExtra).fill("");
      setExtraStudents(newExtra);
    }
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleAddStudentField = () => {
    setExtraStudents([...extraStudents, ""]);
  };

  const handleRemoveStudentField = (index: number) => {
    const list = [...extraStudents];
    list.splice(index, 1);
    setExtraStudents(list);
  };

  const handleExtraStudentChange = (index: number, val: string) => {
    const list = [...extraStudents];
    list[index] = val;
    setExtraStudents(list);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep1()) {
      return;
    }

    // Filter out blank student names if multiple selected
    const validExtraNames = studentType === "multiple" 
      ? extraStudents.filter(n => n.trim() !== "")
      : [];

    const studentId = "BQA-" + Math.floor(100000 + Math.random() * 900000);
    setGeneratedId(studentId);

    const finalCountry = country === "Wadan Kale (Specify...)" ? customCountry : country;

    const newReg: Registration = {
      name,
      email,
      phone,
      course,
      level,
      preferredTime: preferredTime,
      notes,
      country: finalCountry,
      city: "Online",
      whatsapp: phone,
      paymentPlan,
      studentType,
      additionalStudents: validExtraNames,
      generatedId: studentId
    };

    // Save registration locally
    onSubmit(newReg);
    setIsSuccess(true);
    setEmailStatus(null);

    // Save registration to Firestore so the admin can see it in real-time from anywhere!
    try {
      const registrationsCol = collection(db, "registrations");
      await addDoc(registrationsCol, {
        ...newReg,
        createdAt: new Date().toISOString()
      });
      console.log("Registration saved to Firestore successfully.");
    } catch (fsErr) {
      console.error("Failed to save to Firestore, trying local fallback:", fsErr);
    }

    // Automating Gmail Dispatch utilizing the admin's connected workspace token from Firestore
    let activeToken = localStorage.getItem("gmail_access_token");
    let activeAdminEmail = localStorage.getItem("gmail_user_email") || "baroquranacademy1@gmail.com";

    try {
      const configDoc = await getDoc(doc(db, "config", "gmail_auth"));
      if (configDoc.exists()) {
        const configData = configDoc.data();
        if (configData.accessToken) {
          activeToken = configData.accessToken;
        }
        if (configData.adminEmail) {
          activeAdminEmail = configData.adminEmail;
        }
      }
    } catch (configErr) {
      console.warn("Failed to retrieve admin token from Firestore config, using fallback:", configErr);
    }
    
    if (activeToken) {
      setSendingEmail(true);
      try {
        const selectedCourseTitle = COURSES.find((c) => c.id === course)?.title || course;
        
        // 1. Send beautifully formatted Somali confirmation email to the student
        const studentSubject = `Hambalyo! Is-diiwaan gelintaada Baro Quran Academy waa guul ✅`;
        const studentBody = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; color: #1e293b;">
            <div style="background-color: #065f46; padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Baro Quran Academy</h2>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Hoyga Barashada Diinteena Suuban</p>
            </div>
            <div style="padding: 32px 24px; text-align: left;">
              <h3 style="margin-top: 0; color: #0f172a; font-size: 18px;">Ku soo dhowow Akadeemiyada, ${name}!</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                Assalamu Alaikum Warahmatullahi Wabarakatuh,<br/><br/>
                Kusoo dhowow akadeemiyada, <strong>${name}</strong>, waad ku guulaysatay isdiwaan galintaada baro quran academy. Wax ka yar 6 saac teamkeena ayaa kula soo xidhiidhi doona WhatsApp-kaaga <strong>${phone}</strong> si loo dhammaystiro jadwalkaaga. Mahadsanid, kusoo dhawoow mar kale baro quran academy, hoyga barashada diinteena suuban.
              </p>
              
              <div style="margin: 24px 0; padding: 18px; background-color: #f8fafc; border-left: 4px solid #10b981; border-radius: 8px;">
                <h4 style="margin: 0 0 10px 0; font-size: 14px; color: #065f46; font-weight: bold;">Faahfaahinta Diiwaan-gelintaada:</h4>
                <table style="width: 100%; font-size: 13px; border-collapse: collapse; line-height: 1.8;">
                  <tr>
                    <td style="color: #64748b; width: 140px;"><strong>Ardayga ID:</strong></td>
                    <td style="color: #1e293b; font-family: monospace; font-weight: bold;">${studentId}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b;"><strong>Koorsada:</strong></td>
                    <td style="color: #1e293b; font-weight: 500;">${selectedCourseTitle}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b;"><strong>Heerka:</strong></td>
                    <td style="color: #1e293b;">${level}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b;"><strong>Wadanka/Magaalada:</strong></td>
                    <td style="color: #1e293b;">${finalCountry}, ${city}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b;"><strong>Qorshaha Dooran:</strong></td>
                    <td style="color: #1e293b; font-weight: bold; color: #065f46;">${paymentPlan}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b;"><strong>Nooca Diiwaan-gelinta:</strong></td>
                    <td style="color: #1e293b;">${studentType === "multiple" ? "Ka badan 1 arday" : "Hal arday"}</td>
                  </tr>
                  ${validExtraNames.length > 0 ? `
                  <tr>
                    <td style="color: #64748b; vertical-align: top;"><strong>Ardayda kale:</strong></td>
                    <td style="color: #1e293b;">${validExtraNames.join(", ")}</td>
                  </tr>
                  ` : ""}
                </table>
              </div>
              
              <p style="font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; padding-top: 15px;">
                Haddii aad qabto wax su'aalo ah oo degdeg ah, fadlan nagala soo xiriir WhatsApp-ka rasmiga ah ee Akadeemiyada.
              </p>
            </div>
            <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
              &copy; 2026 Baro Quran Academy. All rights reserved.
            </div>
          </div>
        `;

        await sendGmailMessage(activeToken, email, studentSubject, studentBody);

        // 2. Send detailed notification email to the administrator (owner)
        const adminSubject = `Diiwaan-gelin Cusub: ${name} (${finalCountry}) 📝`;
        const adminBody = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff; color: #1e293b;">
            <div style="background-color: #0f172a; padding: 24px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px; font-weight: bold;">Xogta Qofka Is Diiwaan Galiyay 📝</h2>
              <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.8;">Baro Quran Academy Platform</p>
            </div>
            <div style="padding: 24px; text-align: left;">
              <p style="font-size: 14px; color: #334155; margin-top: 0;">
                Assalamu Alaikum Warahmatullahi Wabarakatuh,<br/><br/>
                Waxaa jirtid diiwaan-gelin cusub oo laga soo buuxiyey mareegta. Halkaan ka eeg faahfaahinta dhammaystiran ee ardayga:
              </p>
              
              <table style="width: 100%; font-size: 13px; border-collapse: collapse; margin: 20px 0; border: 1px solid #f1f5f9; line-height: 1.8;">
                <tr style="background-color: #f8fafc;">
                  <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left; width: 160px; font-weight: bold; color: #475569;">Garoonka (Field)</th>
                  <th style="padding: 10px; border: 1px solid #e2e8f0; text-align: left; font-weight: bold; color: #475569;">Xogta (Value)</th>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Ardayga ID:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e293b; font-family: monospace; font-weight: bold;">${studentId}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Magaca Buuxa:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e293b; font-weight: bold;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Wadanka:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e293b;">${finalCountry}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Magaalada:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e293b;">${city}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Email-ka (Gmail):</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #4285F4; font-weight: 500;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">WhatsApp Number:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #16a34a; font-weight: bold;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Koorsada Doortay:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #065f46; font-weight: bold;">${selectedCourseTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Heerka Aqooneed:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e293b;">${level}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Qorshaha Lacagta:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #b45309; font-weight: bold;">${paymentPlan}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Nooca Ardayda:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e293b;">${studentType === "multiple" ? "Arday badan" : "Hal arday oo kaliya"}</td>
                </tr>
                ${validExtraNames.length > 0 ? `
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569; vertical-align: top;">Magacyada kale:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #1e293b; font-size: 12.5px;">
                    <ol style="margin: 0; padding-left: 15px;">
                      ${validExtraNames.map((n, i) => `<li>Magaca ${i+2}aad: <strong>${n}</strong></li>`).join("")}
                    </ol>
                  </td>
                </tr>
                ` : ""}
                <tr>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; color: #475569; vertical-align: top;">Fariin / notes:</td>
                  <td style="padding: 10px; border: 1px solid #e2e8f0; color: #475569; font-style: italic;">${notes || "Wax fariin ah lagama reebin."}</td>
                </tr>
              </table>

              <p style="font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 15px;">
                Fariintaan waxaa si toos ah u dirtay mareegta adoo isticmaalaya xiriirka Gmail API.
              </p>
            </div>
          </div>
        `;

        await sendGmailMessage(activeToken, activeAdminEmail, adminSubject, adminBody);
        
        // Sidoo kale haddii email-ka ku jira config uu ka duwan yahay baroquranacademy1@gmail.com, u dir baroquranacademy1@gmail.com
        if (activeAdminEmail !== "baroquranacademy1@gmail.com") {
          try {
            await sendGmailMessage(activeToken, "baroquranacademy1@gmail.com", adminSubject, adminBody);
          } catch (copyErr) {
            console.error("Failed to copy baroquranacademy1@gmail.com:", copyErr);
          }
        }

        setEmailStatus({
          success: true,
          message: "Masha Allah! Email-adii xaqiijinta si automatic ah ayaa loo kala diray (Ardayga iyo Maamulaha baroquranacademy1@gmail.com)."
        });
      } catch (err: any) {
        console.error("Auto Gmail dispatch failed:", err);
        setEmailStatus({
          success: false,
          message: "Diiwaan-gelintu waa guul, laakiin waxaa dhacay cilad dhinaca xiriirka Gmail-ka ah. Fadlan ku gudbi WhatsApp."
        });
      } finally {
        setSendingEmail(false);
      }
    } else {
      // No active session token
      setEmailStatus({
        success: false,
        message: "Ogeysiis Maamulka: Email automatic ah ma bixin madaama Gmail-ka aan weli la isku xirin. Fadlan tag qaybta 'Gmail Portal' ee sare si aad u xirto Google Account-ka rasmiga ah ee baroquranacademy1@gmail.com si emailadu u baxaan."
      });
    }
  };

  const resetForm = () => {
    setStep(1);
    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setCustomCountry("");
    setCity("Online");
    setCourse(selectedCourseId);
    setLevel("Bilaabo (Beginner)");
    setStudyDays(3);
    setPreferredTime("Habeen (Evening: 6:00 PM - 10:00 PM)");
    setStudentType("single");
    setStudentCount("1");
    setExtraStudents([]);
    setNotes("");
    setErrors({});
    setIsSuccess(false);
    setEmailStatus(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const getWhatsAppLink = () => {
    const selectedCourseTitle = COURSES.find((c) => c.id === course)?.title || course;
    const extraNames = studentType === "multiple" 
      ? extraStudents.filter(n => n.trim() !== "")
      : [];
    
    const finalCountry = country === "Wadan Kale (Specify...)" ? customCountry : country;
    
    let text = `Assalamu Alaykum Baro Quran Academy. Waxaan iska diiwaan-geliyey mareegta dhowaan.
*ID-gayga:* ${generatedId}
*Magacayga:* ${name}
*Koorsada:* ${selectedCourseTitle}
*Heerka:* ${level}
*Wadanka/Magaalada:* ${finalCountry}
*Qorshaha Lacagta:* ${paymentPlan}
*Wakhtiga Doorbiday:* ${preferredTime}
*Tirada Ardayda:* ${studentType === "multiple" ? `Ka badan (Wadajir u diiwaan galay: ${extraNames.length + 1} arday)` : "Hal arday"}`;

    if (extraNames.length > 0) {
      text += `\n*Magacyada kale:* ${extraNames.join(", ")}`;
    }
    if (notes.trim()) {
      text += `\n*Fariin dheeraad ah:* ${notes}`;
    }

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
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-stone-100 flex flex-col max-h-[90vh]"
            id="registration-modal-content"
          >
            {/* Top green/gold/teal accent line */}
            <div className="h-2 bg-gradient-to-r from-emerald-800 via-amber-500 to-emerald-900 shrink-0" />

            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-stone-100 shrink-0">
              <div className="text-left">
                <h3 className="font-display text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
                  {isSuccess ? "Diiwaan-gelintaadu Waa Guul!" : "Xogta Diiwaan-gelinta Ardayga"}
                </h3>
                <p className="text-[11px] text-stone-500 font-sans mt-0.5">
                  {isSuccess ? "Card-ka diiwaan-gelinta rasmiga ah" : "Buuxi foomka si toos ahna lagugu soo xiriiro"}
                </p>
              </div>
              <button
                id="close-modal-btn"
                onClick={handleClose}
                className="rounded-full p-2 text-stone-400 hover:bg-stone-50 hover:text-stone-700 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Scroll Area */}
            <div className="p-6 overflow-y-auto flex-1">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  {/* Section 1: Macluumaadka Shaqsiga (Personal Details) */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest border-b border-stone-100 pb-2">
                      1. Macluumaadka Shaqsiga (Personal Info)
                    </h4>

                    {/* Name */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-emerald-800" />
                        Magacaaga oo Buuxa (Full Name) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="student-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="Tusaale: Axmed Maxamed Cilmi"
                        className={`w-full rounded-xl border p-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 ${
                          errors.name
                            ? "border-red-300 focus:ring-red-500/20"
                            : "border-stone-200 focus:ring-emerald-700/20 focus:border-emerald-700"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                      )}
                    </div>

                    {/* Single vs Multiple Students option */}
                    <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100/60 space-y-3">
                      <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-800" />
                        Yaa Is-diiwaangelinaya? (Who is registering?) <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setStudentType("single");
                            setStudentCount("1");
                            setExtraStudents([]);
                          }}
                          className={`rounded-xl border p-3 text-xs font-bold text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                            studentType === "single"
                              ? "border-emerald-700 bg-white text-emerald-800 ring-2 ring-emerald-700/10"
                              : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          <span className="text-xs">Kaligay (1 Qof)</span>
                          <span className="text-[9.5px] text-stone-400 font-normal">Single Student</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setStudentType("multiple");
                            if (studentCount === "1") {
                              setStudentCount("2");
                              setExtraStudents([""]);
                            }
                          }}
                          className={`rounded-xl border p-3 text-xs font-bold text-center transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                            studentType === "multiple"
                              ? "border-emerald-700 bg-white text-emerald-800 ring-2 ring-emerald-700/10"
                              : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                          }`}
                        >
                          <span>Dad Ka Badan (2+)</span>
                          <span className="text-[9.5px] text-stone-400 font-normal">Family Discount 25%</span>
                        </button>
                      </div>

                      {/* Dynamic Sibling Inputs if Multi-Student chosen */}
                      {studentType === "multiple" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="pt-2 space-y-3"
                        >
                          <div>
                            <label className="block text-[11px] font-semibold text-stone-600 mb-1.5">
                              Tirada guud ee ardayda qoyska (Total Students):
                            </label>
                            <select
                              id="student-count-select-step1"
                              value={studentCount}
                              onChange={(e) => handleStudentCountChange(e.target.value)}
                              className="w-full rounded-xl border border-stone-200 p-2.5 bg-white text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
                            >
                              <option value="2">2 Arday (2 Students)</option>
                              <option value="3">3 Arday (3 Students)</option>
                              <option value="4">4 Arday (4 Students)</option>
                              <option value="5+">5+ Arday (5+ Students)</option>
                            </select>
                          </div>

                          <div className="bg-white border border-stone-200/60 rounded-xl p-3 space-y-2">
                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                              Qor magacyada ardayda kale ee ku wehelisa:
                            </span>
                            <div className="space-y-2">
                              {extraStudents.map((studentName, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <span className="text-[10.5px] font-bold text-stone-500 shrink-0">
                                    Ardayga {idx + 2}aad:
                                  </span>
                                  <input
                                    type="text"
                                    value={studentName}
                                    onChange={(e) => handleExtraStudentChange(idx, e.target.value)}
                                    placeholder={`Magaca buuxa ee ardayga ${idx + 2}aad`}
                                    className="flex-1 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs text-stone-900 focus:outline-none focus:bg-white focus:border-emerald-700"
                                  />
                                  {extraStudents.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveStudentField(idx)}
                                      className="p-1 text-red-500 hover:bg-red-50 rounded transition cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                            <button
                              type="button"
                              onClick={handleAddStudentField}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 hover:text-emerald-700 pt-1 cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Ku dar arday kale [+]</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Country Selector (wadanka doorasho u gali outomatic) */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-emerald-800" />
                        Wadanka aad Joogto (Country) <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="student-country-select"
                        required
                        value={country}
                        onChange={(e) => {
                          setCountry(e.target.value);
                          if (errors.country) setErrors({ ...errors, country: "" });
                        }}
                        className={`w-full rounded-xl border p-3 bg-white text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 ${
                          errors.country
                            ? "border-red-300 focus:ring-red-500/20"
                            : "border-stone-200 focus:ring-emerald-700/20 focus:border-emerald-700"
                        }`}
                      >
                        <option value="">-- Dooro Wadanka (Choose Country) --</option>
                        {COUNTRIES.map((cty) => (
                          <option key={cty} value={cty}>
                            {cty}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="mt-1 text-xs text-red-500">{errors.country}</p>
                      )}

                      {country === "Wadan Kale (Specify...)" && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2"
                        >
                          <input
                            id="student-custom-country-input"
                            type="text"
                            required
                            value={customCountry}
                            onChange={(e) => setCustomCountry(e.target.value)}
                            placeholder="Qor magaca wadanka kale ee aad joogto"
                            className="w-full rounded-xl border border-stone-200 p-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                          />
                        </motion.div>
                      )}
                    </div>

                    {/* WhatsApp & Email (WhatsApp doorasho & Email) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-4 h-4 text-[#128C7E]" />
                          WhatsApp Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="student-phone-input"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (errors.phone) setErrors({ ...errors, phone: "" });
                          }}
                          placeholder="Tusaale: +25261xxxxxxx ama +447xxxxxxx"
                          className={`w-full rounded-xl border p-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 ${
                            errors.phone
                              ? "border-red-300 focus:ring-red-500/20"
                              : "border-stone-200 focus:ring-emerald-700/20 focus:border-emerald-700"
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-emerald-800" />
                          Email (Gmail Address) <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="student-email-input"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: "" });
                          }}
                          placeholder="Tusaale: ahmed11@gmail.com"
                          className={`w-full rounded-xl border p-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 ${
                            errors.email
                              ? "border-red-300 focus:ring-red-500/20"
                              : "border-stone-200 focus:ring-emerald-700/20 focus:border-emerald-700"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Casharka & Wakhtiga (Course, Plan & Timing) */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-widest border-b border-stone-100 pb-2">
                      2. Doorashada Casharada & Saacadaha (Academy Choices)
                    </h4>

                    {/* Course selection (course dooro outomatic) */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-800" />
                        Dooro Koorsada (Select Course) <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="student-course-select"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 p-3 bg-white text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      >
                        {COURSES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title} ({c.subTitle})
                          </option>
                        ))}
                      </select>
                      {selectedCourseId && course === selectedCourseId && (
                        <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50/70 border border-emerald-100 rounded-lg px-2.5 py-1.5 mt-2 flex items-center gap-1.5 font-sans">
                          <span className="text-[11px]">✨</span>
                          <span>Koorsadii aad soo gujisay ayaa si toos ah u diyaarsan (Automatically Pre-selected)</span>
                        </div>
                      )}
                    </div>

                    {/* Study Plan Selection (Plan dooro, showing prices & discount for 2 or more students) */}
                    <div className="space-y-3">
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-emerald-800" />
                        Qorshaha Maalmaha (Choose Days Plan) <span className="text-red-500">*</span>
                      </label>

                      {/* Dynamic Family Discount Notice Banner */}
                      {studentTotalCount > 1 && (
                        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-left flex items-start gap-2.5">
                          <span className="text-lg">🎉</span>
                          <div>
                            <span className="text-xs font-extrabold text-emerald-950 block">Qiimo Dhimis Qoys (25% Family Discount Applied!)</span>
                            <span className="text-[10.5px] text-emerald-800 leading-relaxed font-sans block mt-0.5">
                              Maadaama aad diiwaan-gelisay <strong>{studentTotalCount} arday</strong>, waxaa si automatic ah kuugu dhaqan galay <strong>25% Qiimo Dhimis ah</strong>. Qiimaha hoose waa la dhimay mar hore!
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Dropdown with prices */}
                      <div>
                        <select
                          id="student-days-select"
                          value={studyDays}
                          onChange={(e) => setStudyDays(Number(e.target.value))}
                          className="w-full rounded-xl border border-stone-200 p-3 bg-white text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                        >
                          <option value={2}>2 Cisho (Maalmood) asbuucii — ${getCalculatedPrice(2, studentTotalCount)} / Bishii</option>
                          <option value={3}>3 Cisho (Maalmood) asbuucii — ${getCalculatedPrice(3, studentTotalCount)} / Bishii (Ugu habboon)</option>
                          <option value={4}>4 Cisho (Maalmood) asbuucii — ${getCalculatedPrice(4, studentTotalCount)} / Bishii</option>
                          <option value={5}>5 Cisho (Maalmood) asbuucii — ${getCalculatedPrice(5, studentTotalCount)} / Bishii (Dhammaystiran)</option>
                        </select>
                      </div>

                      {/* Styled pricing card list */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { days: 2, label: "2 Cisho Asbuucii" },
                          { days: 3, label: "3 Cisho Asbuucii" },
                          { days: 4, label: "4 Cisho Asbuucii" },
                          { days: 5, label: "5 Cisho Asbuucii" }
                        ].map((p) => {
                          const computedPrice = getCalculatedPrice(p.days, studentTotalCount);
                          const standardVal = getStandardPrice(p.days, studentTotalCount);
                          const isSaving = standardVal - computedPrice;
                          
                          return (
                            <button
                              key={p.days}
                              type="button"
                              onClick={() => setStudyDays(p.days)}
                              className={`rounded-2xl border p-3.5 text-left transition duration-150 cursor-pointer flex flex-col justify-between ${
                                studyDays === p.days
                                  ? "border-emerald-700 bg-emerald-50/40 ring-2 ring-emerald-700/10"
                                  : "border-stone-200 bg-white hover:bg-stone-50"
                              }`}
                            >
                              <div>
                                <span className="text-[11px] font-bold text-stone-900 block">{p.label}</span>
                                <span className="text-[9px] text-stone-400 block mb-2">{p.days} days per week</span>
                              </div>
                              <div>
                                <div className="flex items-baseline gap-0.5">
                                  <span className="text-lg font-black text-emerald-800">${computedPrice}</span>
                                  <span className="text-[9px] text-stone-400">/mo</span>
                                  {isSaving > 0 && (
                                    <span className="text-[9px] text-stone-400 line-through ml-1">${standardVal}</span>
                                  )}
                                </div>
                                {isSaving > 0 && (
                                  <span className="text-[8.5px] font-bold text-emerald-700 block mt-0.5">Badbaadi -${isSaving}</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timing Selector (Time-ka dooro doorsho u gali outomatic) */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-800" />
                        Wakhtiga aad Doorbidayso (Preferred Time) <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="student-time-select"
                        required
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 p-3 bg-white text-xs font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      >
                        <option value="Habeen (Evening: 6:00 PM - 10:00 PM)">Habeen (Evening: 6:00 PM - 10:00 PM) - Ugu habboon</option>
                        <option value="Galab (Afternoon: 2:00 PM - 5:00 PM)">Galab (Afternoon: 2:00 PM - 5:00 PM)</option>
                        <option value="Subax (Morning: 8:00 AM - 11:30 AM)">Subax (Morning: 8:00 AM - 11:30 AM)</option>
                        <option value="Gelinka Dambe (Late Night: 10:00 PM - 12:00 AM)">Gelinka Dambe (Late Night: 10:00 PM - 12:00 AM)</option>
                        <option value="Wakhti kasta (Flexible / Anytime)">Wakhti kasta (Flexible / Anytime)</option>
                      </select>
                    </div>

                    {/* Live Pricing Summary Panel */}
                    <div className="bg-emerald-950 text-white rounded-2xl p-4 border border-emerald-800/80 shadow-md">
                      <div className="flex items-center justify-between border-b border-emerald-800/50 pb-2 mb-2.5">
                        <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          FAAHFAAHINTA QIIMAHA (Live Summary)
                        </span>
                        <span className="bg-emerald-800 text-[10px] text-emerald-100 font-extrabold px-2.5 py-0.5 rounded-full">
                          {studentTotalCount === 1 ? "1 Arday" : `${studentTotalCount} Arday`}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs space-y-0.5 text-stone-300">
                        <span>Qiimaha Caadiga (Standard Price):</span>
                        <span className={studentTotalCount > 1 ? "line-through text-stone-400" : "font-bold text-white"}>
                          ${getStandardPrice(studyDays, studentTotalCount)} / bishii
                        </span>
                      </div>
                      {studentTotalCount > 1 && (
                        <div className="flex items-center justify-between text-xs text-emerald-300 mt-1">
                          <span>Qoys Qiimo Dhimis (25% Saved):</span>
                          <span className="font-extrabold bg-emerald-900 px-2 py-0.5 rounded text-[10px] text-amber-300">
                            -${getStandardPrice(studyDays, studentTotalCount) - getCalculatedPrice(studyDays, studentTotalCount)}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t border-emerald-800/50 pt-2.5 mt-2.5">
                        <span className="text-xs font-bold text-white">Wadar ahaan bishii (Total Monthly Net):</span>
                        <div className="text-right">
                          <span className="text-lg sm:text-xl font-black text-amber-400">
                            ${getCalculatedPrice(studyDays, studentTotalCount)}
                          </span>
                          <span className="text-[9px] text-emerald-200 block font-normal">/ bishii</span>
                        </div>
                      </div>
                    </div>

                    {/* Optional Notes */}
                    <div>
                      <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-emerald-800" />
                        Fariin noo reeb (Message or Notes - Optional)
                      </label>
                      <textarea
                        id="student-notes-textarea"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Tusaale: Haddii aad rabto saacado gaar ah ama faahfaahin dheeraad ah oo aad qabto..."
                        rows={2}
                        className="w-full rounded-xl border border-stone-200 p-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      />
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex gap-3 pt-4 border-t border-stone-100 shrink-0">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-gradient-to-r from-emerald-800 to-emerald-700 py-3.5 text-xs font-bold text-white hover:opacity-95 transition shadow-md shadow-emerald-900/10 cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Diiwaan-geli Hadda 🚀</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Screen with friendly Somali registration success & automatic email confirmation details */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-6 max-w-md mx-auto"
                >
                  {/* Elegant green check icon */}
                  <div className="inline-flex items-center justify-center rounded-full bg-emerald-50 p-4 text-emerald-800 ring-4 ring-emerald-500/10">
                    <CheckCircle className="w-12 h-12" />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-stone-900 font-display">
                      Diiwaan-gelintaadu Waa Guul! 🎉
                    </h4>
                    
                    {/* Main requested greeting & confirmation message */}
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-2xl p-5 text-left space-y-3.5 shadow-sm">
                      <p className="text-emerald-950 text-xs sm:text-xs leading-relaxed font-semibold">
                        👋 Ku soo dhowow Akadeemiyada, {name}!
                      </p>
                      
                      <p className="text-emerald-950 text-xs sm:text-xs leading-relaxed font-sans">
                        Hambalyo, waxaad ku guulaysatay is-diiwaan gelintaada <strong>Baro Quran Academy</strong>, hoyga barashada Qur'aanka Kariimka ah iyo Culuumta Shareecada!
                      </p>

                      <div className="bg-white/90 rounded-xl p-3 border border-emerald-200/50 space-y-1.5 text-[11px] text-emerald-900 font-sans">
                        <span className="font-bold block text-emerald-800">📧 Nidaamka Email-ka Automatic (Gmail System):</span>
                        <span>Fariinta xaqiijinta waxaa si toos ah loogu dirayaa cinwaankaaga: <strong className="text-stone-900">{email}</strong> iyo Maamulka (<strong className="text-stone-900">baroquranacademy1@gmail.com</strong>).</span>
                        
                        {sendingEmail && (
                          <div className="flex items-center gap-2 mt-2 text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                            <svg className="animate-spin h-3 w-3 text-emerald-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>E-mailka xaqiijinta ayaa hadda la dirayaa... (Sending confirmation email...)</span>
                          </div>
                        )}

                        {emailStatus && (
                          <div className={`p-2 rounded-lg border mt-2 text-[10.5px] ${
                            emailStatus.success 
                              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-900 font-medium" 
                              : "bg-amber-500/10 border-amber-500/20 text-amber-900"
                          }`}>
                            <strong className="block text-stone-900">Xaaladda E-mailka:</strong>
                            <span>{emailStatus.message}</span>
                            
                            {!emailStatus.success && (
                              <div className="mt-1.5 pt-1.5 border-t border-amber-200/30 text-[9.5px] text-stone-500 leading-normal">
                                💡 Maamulaha: Fadlan iska hubi inaad 'Gmail Portal' ku xirtay Google Account-ka rasmiga ah ee <strong className="font-semibold text-stone-800">baroquranacademy1@gmail.com</strong> si emailada automatic-ga ah ay u baxaan.
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <p className="text-emerald-950 text-xs sm:text-xs leading-relaxed font-sans">
                        Kooxdayada saaxiibtinimada leh ayaa kugula soo xidhiidhi doona WhatsApp-kaaga <strong>{phone}</strong> wax ka yar <strong>6 saacadood</strong> si loo dhammaystiro jadwalkaaga barasho. Aad ayaan ugu faraxsanahay madaama aad nala bilaabayso safarkaaga diineed!
                      </p>
                    </div>

                    {/* Show a summary card of their registered details */}
                    <div className="bg-stone-50 rounded-2xl p-4 border border-stone-100 text-left text-[11px] space-y-1.5 font-sans text-stone-700">
                      <span className="font-bold text-stone-400 uppercase tracking-widest text-[9px] block mb-1">
                        Faahfaahinta Diiwaan-gelinta (Registration Summary):
                      </span>
                      <div><span className="text-stone-500">ID-ga Ardayga:</span> <strong className="text-stone-950 font-mono">{generatedId}</strong></div>
                      <div><span className="text-stone-500">Koorsada:</span> <strong className="text-stone-950">{COURSES.find(c => c.id === course)?.title || course}</strong></div>
                      <div><span className="text-stone-500">Qorshaha & Qiimaha:</span> <strong className="text-emerald-800">{paymentPlan}</strong></div>
                    </div>
                  </div>

                  {/* WhatsApp contact CTA & Close */}
                  <div className="space-y-3 pt-2">
                    <a
                      id="whatsapp-confirm-link"
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-4 text-xs font-bold text-white hover:opacity-95 transition shadow-lg shadow-[#25D366]/10 cursor-pointer"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 2c-5.511 0-9.99 4.479-9.99 9.99 0 2.08.636 4.016 1.733 5.62l-1.134 4.148 4.254-1.116c1.554.954 3.372 1.512 5.32 1.512 5.511 0 9.99-4.479 9.99-9.99s-4.479-9.99-9.99-9.99zm5.348 14.152c-.226.636-1.116 1.171-1.84 1.258-.619.075-1.423.111-3.69-.836-2.906-1.212-4.739-4.168-4.885-4.364-.146-.195-1.185-1.579-1.185-3.009 0-1.43.748-2.133.1013-2.428-.266-.295-.583-.37-.778-.37-.195 0-.39.012-.562.024-.515.035-.86.291-1.116.54-.367.366-.991 1.096-.991 2.67s1.144 3.1 1.299 3.313c.155.213 2.25 3.435 5.451 4.819.762.329 1.356.525 1.82.673.766.243 1.464.209 2.015.127.615-.092 1.84-.753 2.101-1.442.261-.69.261-1.282.183-1.402-.078-.12-.284-.195-.592-.35-.308-.155-1.82-.898-2.101-1.001-.281-.102-.486-.155-.69.155-.205.308-.795.998-.975 1.205-.18.207-.36.231-.669.075-.309-.155-1.303-.481-2.482-1.534-.918-.82-1.538-1.832-1.718-2.141-.18-.309-.019-.476.136-.63.139-.138.309-.36.463-.54.154-.18.205-.309.308-.515.103-.206.051-.386-.026-.54-.077-.155-.69-1.666-.945-2.282-.249-.6-.547-.519-.748-.529-.193-.01-.414-.012-.636-.012s-.583.084-.888.423c-.305.339-1.168 1.144-1.168 2.788z" />
                      </svg>
                      <span>WhatsApp ku xiriir (Guji Halkan)</span>
                    </a>
                    <button
                      id="close-success-btn"
                      onClick={handleClose}
                      className="w-full text-stone-500 hover:text-stone-800 font-bold py-2.5 transition text-xs cursor-pointer"
                    >
                      Xir Daaqadda (Close)
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

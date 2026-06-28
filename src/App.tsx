import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ProgramExplorer from "./components/ProgramExplorer";
import Teachers from "./components/Teachers";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import VideoModal from "./components/VideoModal";
import StudentPortal from "./components/StudentPortal";
import TeacherPortal from "./components/TeacherPortal";
import AdminPortal from "./components/AdminPortal";
import CertificateVerify from "./components/CertificateVerify";
import HijriPrayerWidget from "./components/HijriPrayerWidget";
import LiveChat from "./components/LiveChat";
import BlogEventsCareers from "./components/BlogEventsCareers";
import { Language } from "./i18n";
import { Registration } from "./types";

export default function App() {
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("tajweed");
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  // Premium Route State
  const [currentRoute, setCurrentRoute] = useState<string>("home");

  // Advanced Interactive Multi-Language State
  const [lang, setLang] = useState<Language>("so");

  // Custom User Preferences Theme State (Simulated)
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Dynamic CMS Settings State (No hardcoded text, edited in Admin Portal)
  const [cmsSettings, setCmsSettings] = useState({
    phone: "+251 999 451 777",
    email: "baroquranacademy1@gmail.com",
    address: "Hargeisa, Somaliland",
    tajweedPrice: "$25/Month"
  });

  const handleJoinClick = () => {
    setSelectedCourseId("tajweed");
    setIsRegOpen(true);
  };

  const handleJoinCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setIsRegOpen(true);
  };

  const handleWatchVideoClick = () => {
    setIsVideoOpen(true);
  };

  const handleRegistrationSubmit = (newReg: Registration) => {
    setRegistrations((prev) => [...prev, newReg]);
    console.log("New registration saved:", newReg);
  };

  const handleUpdateCmsSettings = (newSettings: any) => {
    setCmsSettings((prev) => ({
      ...prev,
      ...newSettings
    }));
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={`min-h-screen transition-colors duration-300 font-sans antialiased selection:bg-emerald-800/10 selection:text-emerald-900 ${
        darkMode ? "bg-stone-950 text-stone-200" : "bg-stone-50 text-stone-800"
      }`}
    >
      {/* Dynamic Header */}
      <Header
        currentRoute={currentRoute}
        setRoute={setCurrentRoute}
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onJoinClick={handleJoinClick}
      />

      {/* Main Content Router */}
      <div className="pt-20">
        {currentRoute === "home" && (
          <div className="animate-fade-in space-y-2">
            {/* Professional Hero Section */}
            <Hero
              onJoinClick={handleJoinClick}
              onWatchVideoClick={handleWatchVideoClick}
            />

            {/* Hijri Calendar & Prayer Widget */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="max-w-3xl mx-auto">
                <HijriPrayerWidget />
              </div>
            </div>

            {/* Features (Core Benefits) */}
            <Features />

            {/* Programs / Course Explorer with advanced filters & comparison tools */}
            <ProgramExplorer onJoinCourse={handleJoinCourse} lang={lang} />

            {/* Teachers Profile Area */}
            <Teachers onBookTrial={handleJoinCourse} />

            {/* Testimonials Slider */}
            <Testimonials />
          </div>
        )}

        {currentRoute === "about" && (
          <BlogEventsCareers viewType="about" onBookClick={handleJoinClick} />
        )}

        {currentRoute === "programs" && (
          <ProgramExplorer onJoinCourse={handleJoinCourse} lang={lang} />
        )}

        {currentRoute === "pricing" && (
          <ProgramExplorer onJoinCourse={handleJoinCourse} lang={lang} />
        )}

        {currentRoute === "teachers" && (
          <Teachers onBookTrial={handleJoinCourse} />
        )}

        {currentRoute === "certificates" && (
          <CertificateVerify />
        )}

        {currentRoute === "blog" && (
          <BlogEventsCareers viewType="blog" onBookClick={handleJoinClick} />
        )}

        {currentRoute === "events" && (
          <BlogEventsCareers viewType="events" onBookClick={handleJoinClick} />
        )}

        {currentRoute === "careers" && (
          <BlogEventsCareers viewType="careers" onBookClick={handleJoinClick} />
        )}

        {currentRoute === "donate" && (
          <BlogEventsCareers viewType="donate" onBookClick={handleJoinClick} />
        )}

        {/* Portals */}
        {currentRoute === "student-portal" && (
          <div className="animate-fade-in">
            <StudentPortal />
          </div>
        )}

        {currentRoute === "teacher-portal" && (
          <div className="animate-fade-in">
            <TeacherPortal />
          </div>
        )}

        {currentRoute === "admin-portal" && (
          <div className="animate-fade-in">
            <AdminPortal
              onUpdateSettings={handleUpdateCmsSettings}
              currentSettings={cmsSettings}
            />
          </div>
        )}
      </div>

      {/* Footer (Adapted dynamically to CMS state parameters) */}
      {currentRoute !== "student-portal" &&
        currentRoute !== "teacher-portal" &&
        currentRoute !== "admin-portal" && (
          <Footer />
        )}

      {/* Registration Modal Form */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        onSubmit={handleRegistrationSubmit}
        selectedCourseId={selectedCourseId}
      />

      {/* Video Modal Form */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        onJoinClick={handleJoinClick}
      />

      {/* Floating Interactive Live Chat and direct WhatsApp Trigger */}
      <LiveChat />
    </div>
  );
}

import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Courses from "./components/Courses";
import Teachers from "./components/Teachers";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import VideoModal from "./components/VideoModal";
import { Registration } from "./types";
import { MessageSquare, Phone } from "lucide-react";

export default function App() {
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("tajweed");
  const [registrations, setRegistrations] = useState<Registration[]>([]);

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

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans antialiased selection:bg-emerald-800/10 selection:text-emerald-900">
      {/* Navigation */}
      <Header onJoinClick={handleJoinClick} />

      {/* Hero section */}
      <Hero
        onJoinClick={handleJoinClick}
        onWatchVideoClick={handleWatchVideoClick}
      />

      {/* Core Benefits */}
      <Features />

      {/* Courses Explorer */}
      <Courses onJoinCourse={handleJoinCourse} />

      {/* Teachers Section */}
      <Teachers onBookTrial={handleJoinCourse} />

      {/* Testimonials */}
      <Testimonials />

      {/* Footer */}
      <Footer />

      {/* Join Now Modal Form */}
      <RegistrationModal
        isOpen={isRegOpen}
        onClose={() => setIsRegOpen(false)}
        onSubmit={handleRegistrationSubmit}
        selectedCourseId={selectedCourseId}
      />

      {/* Class Demo Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        onJoinClick={handleJoinClick}
      />

      {/* Quick floating WhatsApp button (vital in Somali community education websites) */}
      <a
        id="floating-whatsapp-contact"
        href="https://wa.me/251999451777?text=Assalamu%20Alaykum%20Baro%20Quran%20Academy"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/20 transition-all duration-300 hover:scale-110 active:scale-95 group hover:shadow-2xl"
        title="Nagala soo xiriir WhatsApp"
      >
        <span className="absolute right-full mr-3 rounded-xl bg-stone-900/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition duration-300 group-hover:opacity-100 whitespace-nowrap backdrop-blur-sm pointer-events-none shadow-md">
          WhatsApp Nagala Xiriir
        </span>
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 2c-5.511 0-9.99 4.479-9.99 9.99 0 2.08.636 4.016 1.733 5.62l-1.134 4.148 4.254-1.116c1.554.954 3.372 1.512 5.32 1.512 5.511 0 9.99-4.479 9.99-9.99s-4.479-9.99-9.99-9.99zm5.348 14.152c-.226.636-1.116 1.171-1.84 1.258-.619.075-1.423.111-3.69-.836-2.906-1.212-4.739-4.168-4.885-4.364-.146-.195-1.185-1.579-1.185-3.009 0-1.43.748-2.133.1013-2.428-.266-.295-.583-.37-.778-.37-.195 0-.39.012-.562.024-.515.035-.86.291-1.116.54-.367.366-.991 1.096-.991 2.67s1.144 3.1 1.299 3.313c.155.213 2.25 3.435 5.451 4.819.762.329 1.356.525 1.82.673.766.243 1.464.209 2.015.127.615-.092 1.84-.753 2.101-1.442.261-.69.261-1.282.183-1.402-.078-.12-.284-.195-.592-.35-.308-.155-1.82-.898-2.101-1.001-.281-.102-.486-.155-.69.155-.205.308-.795.998-.975 1.205-.18.207-.36.231-.669.075-.309-.155-1.303-.481-2.482-1.534-.918-.82-1.538-1.832-1.718-2.141-.18-.309-.019-.476.136-.63.139-.138.309-.36.463-.54.154-.18.205-.309.308-.515.103-.206.051-.386-.026-.54-.077-.155-.69-1.666-.945-2.282-.249-.6-.547-.519-.748-.529-.193-.01-.414-.012-.636-.012s-.583.084-.888.423c-.305.339-1.168 1.144-1.168 2.788z" />
        </svg>
      </a>
    </div>
  );
}

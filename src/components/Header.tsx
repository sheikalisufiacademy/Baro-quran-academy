import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, BookOpen, ChevronRight, Phone } from "lucide-react";

interface HeaderProps {
  onJoinClick: () => void;
}

export default function Header({ onJoinClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Koorsooyinka", href: "#courses" },
    { label: "Macalimiinta", href: "#teachers" },
    { label: "Nagu Saabsan", href: "#about" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md shadow-stone-900/5 py-3 border-b border-stone-100"
            : "bg-transparent py-5"
        }`}
        id="main-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-2.5 text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition duration-300">
                <BookOpen className="w-5.5 h-5.5" />
              </div>
              <div>
                <span className="font-display font-bold text-lg md:text-xl text-stone-900 tracking-tight block">
                  Baro Quran
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold tracking-wider uppercase block -mt-1">
                  Academy
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm font-medium text-stone-600 hover:text-emerald-800 transition duration-150 relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="tel:+251999451777" 
                className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-emerald-800 transition"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>+251 999 451 777</span>
              </a>
              <button
                id="header-join-now-btn"
                onClick={onJoinClick}
                className="rounded-full bg-emerald-800 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 transition duration-150 shadow-md shadow-emerald-900/10 hover:shadow-lg hover:shadow-emerald-900/20 hover:-translate-y-0.5 transform"
              >
                Join Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden rounded-lg p-2 text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white p-6 shadow-2xl flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <span className="font-display font-bold text-lg text-emerald-800">Baro Quran Academy</span>
                  <button
                    id="close-drawer-btn"
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1 text-stone-400 hover:bg-stone-50 hover:text-stone-700 transition"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-2 px-3 rounded-lg font-sans text-sm font-semibold text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </a>
                  ))}
                </nav>
              </div>

              <div className="space-y-4 pt-6 border-t border-stone-100">
                <a 
                  href="tel:+251999451777" 
                  className="flex items-center gap-2 justify-center py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-600 hover:bg-stone-50 transition"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>+251 999 451 777</span>
                </a>
                <button
                  id="drawer-join-now-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onJoinClick();
                  }}
                  className="w-full rounded-xl bg-emerald-800 py-3 font-bold text-white hover:bg-emerald-700 transition text-sm shadow-md"
                >
                  Join Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

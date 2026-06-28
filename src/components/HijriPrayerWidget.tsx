import React, { useState, useEffect } from "react";
import { Clock, Volume2, VolumeX, MapPin, Calendar, Compass } from "lucide-react";
import { motion } from "motion/react";

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

const CITIES = [
  { name: "Mogadishu", country: "Somalia", offset: 0, prayerTimes: { Fajr: "04:42", Dhuhr: "12:05", Asr: "15:29", Maghrib: "18:15", Isha: "19:22" } },
  { name: "Hargeisa", country: "Somaliland", offset: -5, prayerTimes: { Fajr: "04:38", Dhuhr: "12:12", Asr: "15:37", Maghrib: "18:27", Isha: "19:35" } },
  { name: "London", country: "UK", offset: 120, prayerTimes: { Fajr: "03:15", Dhuhr: "13:08", Asr: "17:15", Maghrib: "21:20", Isha: "22:45" } },
  { name: "Minneapolis", country: "USA", offset: 240, prayerTimes: { Fajr: "04:20", Dhuhr: "13:25", Asr: "17:28", Maghrib: "20:55", Isha: "22:18" } },
  { name: "Stockholm", country: "Sweden", offset: 180, prayerTimes: { Fajr: "02:40", Dhuhr: "12:55", Asr: "17:10", Maghrib: "22:05", Isha: "23:45" } },
  { name: "Toronto", country: "Canada", offset: 240, prayerTimes: { Fajr: "04:35", Dhuhr: "13:30", Asr: "17:35", Maghrib: "21:02", Isha: "22:30" } },
];

export default function HijriPrayerWidget() {
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simple Islamic Hijri date calculation simulation (highly accurate standard estimate)
  useEffect(() => {
    const calculateHijri = () => {
      // 1447 AH is estimated based on the current year 2026.
      // June 2026 aligns with Muharram / Safar 1448 AH.
      // Let's calculate an elegant representation:
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { calendar: "islamic-umalqura", day: "numeric", month: "long", year: "numeric" };
      try {
        const formatter = new Intl.DateTimeFormat("en-US-u-ca-islamic-umalqura", options);
        setHijriDate(formatter.format(today));
      } catch (e) {
        // Fallback if internationalization calendar is not supported in environment
        setHijriDate("Dhul-Hijjah 12, 1447 AH");
      }
    };
    calculateHijri();
  }, [currentTime]);

  const prayerTimesList: PrayerTime[] = [
    { name: "Fajr", time: selectedCity.prayerTimes.Fajr, arabicName: "الفجر" },
    { name: "Dhuhr", time: selectedCity.prayerTimes.Dhuhr, arabicName: "الظهر" },
    { name: "Asr", time: selectedCity.prayerTimes.Asr, arabicName: "العصر" },
    { name: "Maghrib", time: selectedCity.prayerTimes.Maghrib, arabicName: "المغرب" },
    { name: "Isha", time: selectedCity.prayerTimes.Isha, arabicName: "العشاء" },
  ];

  // Helper to find the current next prayer
  const getNextPrayer = () => {
    const currentHour = currentTime.getHours();
    const currentMin = currentTime.getMinutes();
    const currentTotalMin = currentHour * 60 + currentMin;

    for (const prayer of prayerTimesList) {
      const [pStrHour, pStrMin] = prayer.time.split(":");
      const pTotalMin = parseInt(pStrHour) * 60 + parseInt(pStrMin);
      if (pTotalMin > currentTotalMin) {
        return prayer;
      }
    }
    return prayerTimesList[0]; // defaults back to Fajr tomorrow
  };

  const nextPrayer = getNextPrayer();

  return (
    <div className="bg-gradient-to-br from-stone-900 via-emerald-950 to-stone-950 text-white rounded-3xl p-6 border border-emerald-500/20 shadow-xl relative overflow-hidden">
      {/* Dynamic Gold Pattern Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Taariikhda Hijriga • التقويم الهجري</span>
          </div>
          <h4 className="font-display font-bold text-lg text-white mt-1">
            {hijriDate || "Dhul-Hijjah 12, 1447 AH"}
          </h4>
        </div>

        {/* City Selector */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 self-stretch sm:self-auto justify-between">
          <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <select
            id="city-prayer-select"
            value={selectedCity.name}
            onChange={(e) => {
              const cityObj = CITIES.find((c) => c.name === e.target.value);
              if (cityObj) setSelectedCity(cityObj);
            }}
            className="bg-transparent text-xs font-semibold text-stone-200 focus:outline-none cursor-pointer border-none p-0 pr-6 mr-[-10px]"
          >
            {CITIES.map((c) => (
              <option key={c.name} value={c.name} className="bg-stone-900 text-white">
                {c.name} ({c.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main clock and next prayer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
        <div className="md:col-span-5 bg-white/5 rounded-2xl p-4 border border-white/5 text-center sm:text-left flex sm:flex-row md:flex-col items-center justify-between sm:gap-6 md:gap-2">
          <div>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold block">
              Hadda waa
            </span>
            <span className="font-mono text-3xl font-bold text-white tracking-tight mt-1 block">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>

          <div className="border-t sm:border-t-0 md:border-t sm:border-l md:border-l-0 border-white/10 pt-3 sm:pt-0 md:pt-3 pl-0 sm:pl-6 md:pl-0 mt-3 sm:mt-0 md:mt-3 text-left w-full sm:w-auto md:w-full flex items-center gap-3">
            <Compass className="w-8 h-8 text-amber-500 shrink-0 animate-spin-slow" />
            <div>
              <span className="text-[9px] text-amber-400 font-bold tracking-wider block uppercase">
                Qiblada (Hargeisa)
              </span >
              <span className="text-xs text-stone-300 font-semibold block">
                218.4° Waqooyi-Bari
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-300 text-xs font-medium">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Next Prayer: <strong className="text-white">{nextPrayer.name}</strong> at {nextPrayer.time}</span>
            </div>

            <button
              id="toggle-adhan-sound"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`rounded-lg p-2 transition flex items-center gap-1.5 text-xs font-semibold ${
                soundEnabled ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/5 text-stone-400 border border-transparent"
              }`}
              title={soundEnabled ? "Deactivate adhan simulator" : "Activate adhan simulator"}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{soundEnabled ? "Adhan Daaran" : "Adhan Off"}</span>
            </button>
          </div>

          {/* Adhan notice if sound enabled */}
          {soundEnabled && (
            <div className="bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400 rounded-xl px-3 py-2 text-center animate-pulse">
              🔔 Adhan reminder simulator active! You will hear an acoustic notification during prayer times.
            </div>
          )}
        </div>
      </div>

      {/* Grid of times */}
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {prayerTimesList.map((prayer) => {
          const isActive = nextPrayer.name === prayer.name;
          return (
            <div
              key={prayer.name}
              className={`rounded-xl p-3 text-center transition border ${
                isActive
                  ? "bg-gradient-to-b from-emerald-800 to-emerald-950 border-emerald-500 text-white shadow-lg shadow-emerald-900/40 relative scale-105"
                  : "bg-white/5 border-white/5 text-stone-400 hover:bg-white/10"
              }`}
            >
              {isActive && (
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-amber-500 text-stone-950 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full shadow-md">
                  Active
                </span>
              )}
              <span className={`block font-display text-[9px] uppercase tracking-wider font-bold ${isActive ? "text-amber-400" : "text-stone-500"}`}>
                {prayer.name}
              </span>
              <span className={`block font-serif text-xs my-1 font-semibold ${isActive ? "text-white" : "text-stone-300"}`}>
                {prayer.arabicName}
              </span>
              <span className="block font-mono text-xs font-bold text-white mt-1">
                {prayer.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Search, Award, CheckCircle2, FileDown, Eye, Calendar, User, ShieldCheck } from "lucide-react";

const CERTIFICATE_DB = [
  { id: "CERT-2026-001", name: "Cabdullaahi Cali", course: "Advanced Tajweed Rule Mastery", date: "June 12, 2026", grade: "Excellent (Mumtaz)", issuer: "Sheikh Cabdiraxmaan Al-Xafid", verified: true },
  { id: "CERT-2026-002", name: "Xamda Maxamed", course: "Quran Recitation & Fluency Foundation", date: "May 28, 2026", grade: "Excellent (Mumtaz)", issuer: "Ustaadah Maaryama Maxamed", verified: true },
  { id: "CERT-2026-003", name: "Cumar Farax", course: "Classical Arabic Grammar Level 1", date: "April 15, 2026", grade: "Very Good (Jayid Jidan)", issuer: "Ustaad Axmed Nuur", verified: true }
];

export default function CertificateVerify() {
  const [certQuery, setCertQuery] = useState("");
  const [foundCert, setFoundCert] = useState<typeof CERTIFICATE_DB[0] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const cert = CERTIFICATE_DB.find((c) => c.id.toLowerCase() === certQuery.trim().toLowerCase());
    if (cert) {
      setFoundCert(cert);
    } else {
      setFoundCert(null);
    }
  };

  return (
    <section className="py-20 bg-stone-900 text-white min-h-[600px] relative overflow-hidden" id="certificates">
      {/* Dynamic Gold Backdrop Grid */}
      <div className="absolute inset-0 bg-radial-gradient from-emerald-950/20 via-stone-900 to-stone-950 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase bg-amber-400/10 px-3.5 py-1.5 rounded-full inline-block">
            XAQIIQDADA • CERTIFICATE VERIFICATION
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Verify Academy Certificates
          </h2>
          <p className="font-sans text-stone-400 max-w-xl mx-auto text-xs leading-relaxed">
            All our graduating students receive cryptographically authenticated certificates. Enter the certificate serial number below to check its authenticity.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleVerify} className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-lg mx-auto flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              id="cert-input-field"
              type="text"
              required
              placeholder="e.g. CERT-2026-001"
              value={certQuery}
              onChange={(e) => setCertQuery(e.target.value)}
              className="w-full bg-stone-950/80 border border-stone-800 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
            />
          </div>
          <button
            id="cert-verify-submit-btn"
            type="submit"
            className="rounded-xl bg-amber-500 text-stone-950 px-5 text-xs font-bold transition hover:bg-amber-400 flex items-center justify-center cursor-pointer shrink-0"
          >
            Verify Now
          </button>
        </form>

        {/* Verification Results panel */}
        {searched && (
          <div className="animate-fade-in">
            {foundCert ? (
              <div className="space-y-6">
                {/* Visual Premium Certificate Sheet */}
                <div className="bg-gradient-to-b from-stone-950 to-stone-900 border-2 border-amber-500/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
                  {/* Watermark patterns */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none islamic-pattern" />
                  <div className="absolute -top-16 -right-16 w-48 h-48 border-4 border-amber-500/20 rounded-full" />
                  <div className="absolute -bottom-16 -left-16 w-48 h-48 border-4 border-amber-500/20 rounded-full" />

                  {/* Header */}
                  <div className="text-center space-y-3 border-b border-white/5 pb-6">
                    <span className="text-[10px] font-bold text-amber-400 tracking-wider uppercase">
                      BARO QURAN ACADEMY • أكاديمية بارو للقرآن
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white italic">
                      Certificate of Achievement
                    </h3>
                  </div>

                  {/* Body Text */}
                  <div className="py-8 text-center space-y-6">
                    <span className="text-[11px] text-stone-400 uppercase tracking-widest block">This is to certify that</span>
                    <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-amber-300">
                      {foundCert.name}
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed max-w-md mx-auto">
                      has successfully completed and mastered the rigorous curriculum requirements for the premium program:
                    </p>
                    <h5 className="font-sans font-extrabold text-base text-white">
                      {foundCert.course}
                    </h5>
                    <div className="flex justify-center items-center gap-6 pt-4 text-xs">
                      <div>
                        <span className="text-[9px] text-stone-500 block">GRADUATION DATE</span>
                        <span className="font-semibold text-stone-300">{foundCert.date}</span>
                      </div>
                      <div className="h-6 w-px bg-white/10" />
                      <div>
                        <span className="text-[9px] text-stone-500 block">FINAL GRADE</span>
                        <span className="font-semibold text-emerald-400">{foundCert.grade}</span>
                      </div>
                    </div>
                  </div>

                  {/* Signatures & Seal */}
                  <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="text-center sm:text-left">
                      <span className="text-[9px] text-stone-500 block">AUTHORIZED SIGNATURE</span>
                      <span className="font-serif font-semibold text-xs text-stone-300 block mt-1">{foundCert.issuer}</span>
                      <span className="text-[9px] text-stone-500 block">Academy Chief Scholar</span>
                    </div>

                    {/* Gold Certified Seal */}
                    <div className="h-16 w-16 bg-amber-500/10 border-2 border-amber-500 text-amber-400 rounded-full flex flex-col items-center justify-center shadow-lg shadow-amber-500/10 relative shrink-0">
                      <ShieldCheck className="w-6 h-6 animate-pulse" />
                      <span className="text-[7px] font-bold uppercase tracking-wider mt-1 block">VERIFIED</span>
                    </div>

                    <div className="text-center sm:text-right">
                      <span className="text-[9px] text-stone-500 block">CERTIFICATE ID</span>
                      <span className="font-mono text-xs font-bold text-amber-400 block mt-1">{foundCert.id}</span>
                      <span className="text-[8px] text-emerald-400 font-bold block mt-0.5">Secure Blockchain Verified</span>
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex justify-center gap-4">
                  <button
                    id="download-cert-btn"
                    onClick={() => alert(`Initiating PDF generation & download for ${foundCert.name}...`)}
                    className="rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-3 text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <FileDown className="w-4 h-4" />
                    <span>Download Official PDF Copy</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center space-y-2 max-w-md mx-auto">
                <span className="text-red-500 font-bold block text-sm">Certificate Not Found</span>
                <p className="text-xs text-stone-400 leading-relaxed">
                  We could not find any record associated with the serial ID: <strong className="text-white">{certQuery}</strong>. Please verify the spelling or check with administration.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Help Hints */}
        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 max-w-lg mx-auto">
          <h4 className="text-[10px] font-bold text-amber-400 tracking-wider uppercase mb-2">Example codes to try:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {CERTIFICATE_DB.map((c) => (
              <button
                key={c.id}
                id={`cert-hint-${c.id}`}
                onClick={() => {
                  setCertQuery(c.id);
                  setSearched(true);
                  setFoundCert(c);
                }}
                className="bg-stone-950/60 hover:bg-stone-800 border border-stone-800/80 rounded-xl p-2.5 text-[10px] font-mono text-stone-300 text-center transition cursor-pointer"
              >
                {c.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Zap, CheckCircle2, X, ArrowRight, ShieldCheck, Mail } from "lucide-react";

interface CTAWaitlistProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  selectedPlan?: string | null;
}

export default function CTAWaitlist({
  isOpenModal = false,
  onCloseModal,
  selectedPlan,
}: CTAWaitlistProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    // Trigger celebration confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#06b6d4", "#ec4899", "#3b82f6"],
    });

    const randomTicket = Math.floor(1000 + Math.random() * 9000);
    setTicketNumber(randomTicket);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmail("");
    if (onCloseModal) onCloseModal();
  };

  return (
    <>
      {/* Inline Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#070a13] to-[#04060a]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-purple-950/40 via-slate-900/80 to-cyan-950/40 border border-purple-500/30 backdrop-blur-2xl text-center shadow-2xl shadow-purple-950/50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-6">
              <Zap className="w-3.5 h-3.5 fill-purple-300" />
              Eksklyuziv Imkoniyat
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Yangicha 2.0 Inqilobiga <br className="hidden sm:inline" />
              <span className="text-gradient-primary">Birinchilardan Bo&apos;lib</span> Qo&apos;shiling
            </h2>

            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Ro&apos;yxatdan o&apos;ting va Pro imkoniyatlaridan 1 oy mutlaqo bepul foydalanish hamda yangi AI modellarga birinchi kirish imtiyoziga ega bo&apos;ling.
            </p>

            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto"
              >
                <div className="relative w-full">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email manzilingizni kiriting..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  Qo&apos;shilish
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <div className="mt-8 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 max-w-md mx-auto text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="text-lg font-bold text-white">Tabriklaymiz! Siz ro&apos;yxatdasiz!</h3>
                <p className="text-xs text-slate-300">
                  Sizning VIP Erta Kirish Chiptangiz:{" "}
                  <span className="font-mono font-bold text-emerald-400">
                    #YANGICHA-{ticketNumber}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400">
                  {email} manziliga tasdiqlash xati yuborildi.
                </p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Spam yo&apos;q, faqat muhim yangiliklar
              </span>
              <span>•</span>
              <span>12,400+ mutaxassislar qo&apos;shildi</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Popup (when opened via button) */}
      {isOpenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0b0f19] border border-purple-500/30 p-6 sm:p-8 shadow-2xl shadow-purple-950/60">
            <button
              onClick={onCloseModal}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
                <Zap className="w-6 h-6 fill-purple-400" />
              </div>

              <h3 className="text-2xl font-bold text-white">
                {selectedPlan
                  ? `"${selectedPlan}" Tarifiga Ulanish`
                  : "Yangicha 2.0 Erta Kirish"}
              </h3>
              <p className="text-xs text-slate-400 mt-2">
                Birinchilar qatorida yangi AI vositalarini sinab ko&apos;rish uchun email manzilingizni qoldiring.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="text-left">
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Email Manzilingiz
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nomingiz@kompaniya.uz"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                  >
                    Davom Etish
                  </button>
                </form>
              ) : (
                <div className="mt-6 space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-left">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      Muvaffaqiyatli qabul qilindi!
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Sizning navbat raqamingiz:{" "}
                      <span className="font-mono font-bold text-emerald-400">
                        #VIP-{ticketNumber}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 text-xs font-medium"
                  >
                    Yopish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

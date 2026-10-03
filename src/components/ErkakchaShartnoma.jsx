import React, { useState, useRef } from 'react';
import { FileText, Shield, Stamp, Download, Send, Check, Sparkles, RefreshCw, AlertCircle, ShoppingBag } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

const CONTRACT_PRESETS = [
  {
    topic: "Vazn tashlash (Ozish) bo'yicha qat'iy parik",
    penalty: "Barcha do'stlarga choyxonada 1 qozon to'y palov (qazi va bedana tuxum bilan)",
    term: "30 kun ichida"
  },
  {
    topic: "2026-yil oxirigacha uylanish kafolati",
    penalty: "Sochni 0 ga (kalga) oldirib, 1 oy mahallada bosh kiyimsiz yurish",
    term: "2026-yil 31-dekabrgacha"
  },
  {
    topic: "Olingan qarzni so'nggi tiyinigacha qaytarish",
    penalty: "1 hafta davomida qarz beruvchining mashinasini har kuni yuvib berish",
    term: "Belgilangan sanagacha"
  },
  {
    topic: "PUBG / TikTok o'ynashni 30 kunga to'xtatish",
    penalty: "Do'stiga 1 oy davomida har ertalab kofe olib berish",
    term: "1 oy muddatga"
  }
];

export default function ErkakchaShartnoma({ onOpenPayment }) {
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [topic, setTopic] = useState(CONTRACT_PRESETS[0].topic);
  const [penalty, setPenalty] = useState(CONTRACT_PRESETS[0].penalty);
  const [witness, setWitness] = useState('Choyxona oqsoqoli');
  const [deadline, setDeadline] = useState('2026-yil 31-dekabr');
  
  const [isSigned, setIsSigned] = useState(false);
  const [hasStamp, setHasStamp] = useState(false);
  const [contractId, setContractId] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const contractRef = useRef(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!sideA || !sideB) return;

    sounds.playStamp();
    setContractId(`UZ-ERKAK-${Math.floor(100000 + Math.random() * 900000)}`);
    setIsSigned(true);
    setHasStamp(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleApplyPreset = (preset) => {
    setTopic(preset.topic);
    setPenalty(preset.penalty);
    sounds.playStamp();
  };

  const downloadContract = async () => {
    if (!contractRef.current) return;
    setIsDownloading(true);
    sounds.playCamera();

    try {
      const dataUrl = await toPng(contractRef.current, {
        cacheBust: true,
        quality: 0.98,
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = `erkakcha-shartnoma-${contractId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert("Rasmni saqlashda xatolik yuz berdi. Iltimos skrinshot qiling!");
    } finally {
      setIsDownloading(false);
    }
  };

  const shareToTelegram = () => {
    const text = encodeURIComponent(
      `📜 DIQQAT: ${sideA} va ${sideB} o'rtasida yangicha.com orqali RASMIY ERKAKCHA SHARTNOMA tuzildi!\n\n` +
      `📌 Mavzu: ${topic}\n` +
      `⚠️ Yutqazganning jazosi: ${penalty}\n` +
      `⚖️ Guvoh: ${witness}\n\n` +
      `Buzishga haqqi yo'q, shartnomani ko'rish: https://yangicha.com`
    );
    window.open(`https://t.me/share/url?url=https://yangicha.com&text=${text}`, '_blank');
  };

  return (
    <div className="py-8 max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
          <Shield className="w-4 h-4 text-amber-400" />
          <span>O'zbekona Rasmiy Kelishuv</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Rasmiy <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500">Erkakcha Shartnoma</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Do'stlar orasidagi gap, garov (parik) va va'dalarni muhrli, seriya raqamli rasmiy hujjatga aylantiring. Erkak kishi so'zida turadi!
        </p>
      </div>

      {!isSigned ? (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          {/* Quick Presets */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-slate-300 mb-2">Mashhur shartnoma mavzulari:</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CONTRACT_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-white group-hover:text-amber-300">{p.topic}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate">Jarima: {p.penalty}</div>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">1-Tomon (Sizning Ismingiz / Laqabingiz)</label>
                <input
                  type="text"
                  required
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                  placeholder="masalan: Sardor (Toshkent)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">2-Tomon (Do'stingizning Ismi / Raqibi)</label>
                <input
                  type="text"
                  required
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                  placeholder="masalan: Bekzod (Samarqand)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kelishuv / Garov Sharti</label>
              <textarea
                required
                rows={2}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Nima bo'yicha bahslashdingiz yoki qanday va'da berildi?"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Yutqazgan tomonning qat'iy majburiyati (Jazosi)</label>
              <input
                type="text"
                required
                value={penalty}
                onChange={(e) => setPenalty(e.target.value)}
                placeholder="masalan: 1 qozon palov yoki 500,000 so'm"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Neytral Guvoh (Oqsoqol)</label>
                <input
                  type="text"
                  value={witness}
                  onChange={(e) => setWitness(e.target.value)}
                  placeholder="masalan: Choyxona oqsoqoli yoki Otabek"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Tugash muddati (Sanasi)</label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  placeholder="masalan: 2026-yil 1-dekabr"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 font-black text-base shadow-xl shadow-amber-500/20 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Stamp className="w-5 h-5" />
              <span>RASMIY ERKAKCHA SHARTNOMANI TUZISH</span>
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Printable Official Contract Card */}
          <div
            ref={contractRef}
            className="w-full max-w-2xl mx-auto bg-amber-50/95 text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-amber-600 relative overflow-hidden font-serif"
            style={{
              backgroundImage: 'radial-gradient(#d97706 0.75px, transparent 0.75px)',
              backgroundSize: '16px 16px',
              backgroundColor: '#fffdf5'
            }}
          >
            {/* Stamp watermark effect */}
            {hasStamp && (
              <div className="absolute right-12 bottom-20 border-4 border-rose-600/80 rounded-full w-36 h-36 flex flex-col items-center justify-center text-center rotate-[-18deg] pointer-events-none p-2 animate-in zoom-in-75 duration-300">
                <div className="text-[10px] font-black uppercase tracking-widest text-rose-600 border-b border-rose-600 pb-0.5">
                  YANGICHA.COM
                </div>
                <div className="text-xs font-black text-rose-700 py-0.5">
                  TASDIQLANDI
                </div>
                <div className="text-[9px] font-bold text-rose-600">
                  ERKAKCHA SO'Z
                </div>
              </div>
            )}

            {/* Document Header */}
            <div className="text-center border-b-2 border-amber-800/40 pb-6 mb-6">
              <div className="flex items-center justify-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-widest mb-1">
                <span>O'ZBEKISTON RESPUBLIKASI CHOYXONA KODEKSI</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                RASMIY ERKAKCHA KELISHUV
              </h2>
              <div className="text-[11px] font-mono text-amber-800 mt-1">
                Maxsus Reestr Raqami: <span className="font-bold">{contractId}</span>
              </div>
            </div>

            {/* Body */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-800">
              <p>
                Ushbu rasmiy hujjat <strong>{sideA}</strong> (bundan keyin "1-Tomon") hamda <strong>{sideB}</strong> (bundan keyin "2-Tomon") o'rtasida erkakcha vijdon va do'stona ishonch asosida tuzildi.
              </p>

              <div className="p-4 rounded-xl bg-amber-100/70 border border-amber-300">
                <div className="font-bold text-amber-950 text-xs uppercase mb-1">1-Modda: Kelishuv va Garov Mazmuni</div>
                <p className="font-semibold text-slate-900">
                  "{topic}"
                </p>
                <div className="text-[11px] text-slate-600 mt-1">
                  Amal qilish muddati: <strong>{deadline}</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-100/70 border border-rose-300">
                <div className="font-bold text-rose-950 text-xs uppercase mb-1">2-Modda: Yutqazgan Tomonning Qat'iy Jazosi</div>
                <p className="font-bold text-rose-900">
                  "{penalty}"
                </p>
                <div className="text-[10px] text-rose-700 mt-1">
                  *Izoh: Ushbu majburiyatdan qochishga yoki "hazillashdim" deyishga qat'iyan yo'l qo'yilmaydi.
                </div>
              </div>

              <p className="text-[11px] text-slate-600 italic">
                Ushbu shartnoma buzilgan taqdirda, aybdor tomon choyxonada barcha do'stlar oldida obro'sizlanadi va 1 oy davomida gap qaytarmaslik jazosiga tortiladi.
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-3 gap-2 pt-8 mt-6 border-t-2 border-amber-800/30 text-center">
              <div>
                <div className="text-[10px] text-slate-500 font-sans">1-Tomon Imzosi:</div>
                <div className="font-serif italic font-bold text-base sm:text-lg text-slate-900 mt-1 border-b border-slate-400 pb-1">
                  {sideA}
                </div>
                <div className="text-[9px] text-emerald-700 font-sans mt-0.5">✓ Tasdiqlandi</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 font-sans">Guvoh (Oqsoqol):</div>
                <div className="font-serif italic text-sm text-slate-800 mt-2 border-b border-slate-400 pb-1">
                  {witness}
                </div>
                <div className="text-[9px] text-amber-800 font-sans mt-0.5">⚖️ Qonuniy</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-500 font-sans">2-Tomon Imzosi:</div>
                <div className="font-serif italic font-bold text-base sm:text-lg text-slate-900 mt-1 border-b border-slate-400 pb-1">
                  {sideB}
                </div>
                <div className="text-[9px] text-emerald-700 font-sans mt-0.5">✓ Tasdiqlandi</div>
              </div>
            </div>

            {/* Footer watermark */}
            <div className="mt-8 pt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Rasmiy Reestr: yangicha.com/shartnoma</span>
              <span>Sanasi: {new Date().toLocaleDateString('uz-UZ')}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3">
            <button
              onClick={downloadContract}
              disabled={isDownloading}
              className="py-3 px-4 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Saqlanmoqda..." : "PNG Hujjatni Yuklab Olish"}</span>
            </button>

            <button
              onClick={shareToTelegram}
              className="py-3 px-4 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-sky-500/30 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegramga Yuborish</span>
            </button>
          </div>

          {/* Monetization: Ramkali Sertifikat Yetkazish */}
          <div className="max-w-2xl mx-auto glass-panel rounded-2xl p-4 border border-amber-500/40 bg-amber-500/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  Chiroyli Oltin Ramkada A4 Yetkazib Berish 🖼️
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Do'stingizga kuryer orqali haqiqiy ramkada sovg'a sifatida topshiring!
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenPayment({ title: "Oltin Ramkali Erkakcha Shartnoma", price: 29000, desc: `${contractId} raqamli shartnoma yetkazib berish` })}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs shrink-0 hover:opacity-90 transition-all shadow-md shadow-amber-500/20"
            >
              29,000 so'm
            </button>
          </div>

          {/* Reset */}
          <div className="text-center">
            <button
              onClick={() => setIsSigned(false)}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Yangi shartnoma tuzish</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

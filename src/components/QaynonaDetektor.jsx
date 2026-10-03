import React, { useState } from 'react';
import { HeartHandshake, Sparkles, Send, RefreshCw, AlertOctagon, Heart, ShieldAlert, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

const QUIZ_QUESTIONS = [
  {
    question: "1. Ertalab yangi non va qaymoqqa kim yuguradi?",
    options: [
      { text: "Albatta erkak kishi (tezda mashinada borib keladi)", score: 20, motherRisk: 5 },
      { text: "Kimning uyqusi birinchi qochsa", score: 15, motherRisk: 15 },
      { text: "Qaynona xonim kimga buyursalar, o'sha!", score: 25, motherRisk: 25 },
    ]
  },
  {
    question: "2. Oylik tushganda bank kartasi kimning cho'ntagida turadi?",
    options: [
      { text: "Erkak kishida — axir oilaning boshlig'i", score: 15, motherRisk: 20 },
      { text: "Ayolda — byudjetni u yaxshiroq boshqaradi", score: 25, motherRisk: 10 },
      { text: "Qaynona xonimning maxfiy sandig'ida", score: 20, motherRisk: 30 },
    ]
  },
  {
    question: "3. Yakshanba kuni dam olish qanday rejalashtiriladi?",
    options: [
      { text: "Butun oila tog'ga yoki choyxonaga chiqadi", score: 20, motherRisk: 10 },
      { text: "Kun bo'yi gilam yuvish va uyni tozalash", score: 25, motherRisk: 25 },
      { text: "Hech kim uyg'onmaydi, hamma uxlab dam oladi", score: 10, motherRisk: 20 },
    ]
  },
  {
    question: "4. Qaynona to'satdan mehmonga kelsa birinchi reaksiya:",
    options: [
      { text: "Katta tabassum bilan darhol dasturxon yoziladi", score: 25, motherRisk: 5 },
      { text: "Tartibsiz narsalar shosha-pisha shkafga tiqiladi", score: 15, motherRisk: 20 },
      { text: "Erkak kishi sekin 'ishim bor edi' deb ko'chaga qochadi", score: 10, motherRisk: 30 },
    ]
  },
  {
    question: "5. Kechki payt televizor pulti kimning qo'lida bo'ladi?",
    options: [
      { text: "Erkak kishida (futbol yoki jangari kino)", score: 15, motherRisk: 15 },
      { text: "Serial va pazandachilik ko'rsatuvlari g'olib chiqadi", score: 25, motherRisk: 10 },
      { text: "Kelin va kuyov jimgina telefonida o'tiradi", score: 20, motherRisk: 20 },
    ]
  }
];

export default function QaynonaDetektor({ onOpenPayment }) {
  const [maleName, setMaleName] = useState('');
  const [femaleName, setFemaleName] = useState('');
  const [step, setStep] = useState('input'); // 'input', 'quiz', 'result'
  const [currentQ, setCurrentQ] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [motherRisk, setMotherRisk] = useState(0);
  const [result, setResult] = useState(null);

  const startQuiz = (e) => {
    e.preventDefault();
    if (!maleName.trim() || !femaleName.trim()) return;
    sounds.playStamp();
    setStep('quiz');
    setCurrentQ(0);
    setTotalScore(0);
    setMotherRisk(0);
  };

  const handleAnswer = (option) => {
    sounds.playShock();
    const newScore = totalScore + option.score;
    const newRisk = motherRisk + option.motherRisk;

    setTotalScore(newScore);
    setMotherRisk(newRisk);

    if (currentQ + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQ(currentQ + 1);
    } else {
      calculateResult(newScore, newRisk);
    }
  };

  const calculateResult = (score, risk) => {
    const matchPercent = Math.min(98, Math.max(55, Math.floor(score * 0.85 + Math.random() * 10)));
    const riskPercent = Math.min(96, Math.max(45, Math.floor(risk * 0.9 + Math.random() * 12)));

    let advice = "";
    if (riskPercent > 75) {
      advice = "Xavf o'ta yuqori! Har safar qaynonani ko'rganda 'Oyi, bugun har doimgidanam yosharibsiz' deb turilsa, tinchlik saqlanib qoladi.";
    } else {
      advice = "Moslik a'lo darajada. Eng asosiysi maosh kartasini berkitmaslik va vaqtida xarid qilish.";
    }

    setResult({
      matchPercent,
      riskPercent,
      advice,
      leader: matchPercent > 75 ? `${femaleName} (Diplomatik rahbar)` : `${maleName} (Kafillikda)`
    });

    setStep('result');
    sounds.playCash();

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  const shareToTelegram = () => {
    if (!result) return;
    const text = encodeURIComponent(
      `💘 ${maleName} va ${femaleName} o'rtasidagi munosabat yangicha.com da tekshirildi!\n\n` +
      `❤️ Moslik darajasi: ${result.matchPercent}%\n` +
      `🚨 Qaynona bilan urush xavfi: ${result.riskPercent}%\n` +
      `👑 Oiladagi rahbar: ${result.leader}\n\n` +
      `Siz ham tekshirib ko'ring: https://yangicha.com`
    );
    window.open(`https://t.me/share/url?url=https://yangicha.com&text=${text}`, '_blank');
  };

  return (
    <div className="py-8 max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold mb-3">
          <HeartHandshake className="w-4 h-4 text-pink-500" />
          <span>Juftliklar va Oila Psixologiyasi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Moslik & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300">Qaynona Detektori</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Siz va juftingiz qanchalik mos? Eng muhimi: bo'lajak yoki hozirgi qaynona bilan munosabatlaringiz omon qoladimi? 60 soniyali ekspress tahlil!
        </p>
      </div>

      {/* Step 1: Names Form */}
      {step === 'input' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <form onSubmit={startQuiz} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kuyov / Yigitning Ismi</label>
                <input
                  type="text"
                  required
                  value={maleName}
                  onChange={(e) => setMaleName(e.target.value)}
                  placeholder="masalan: Jasur"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kelin / Qizning Ismi</label>
                <input
                  type="text"
                  required
                  value={femaleName}
                  onChange={(e) => setFemaleName(e.target.value)}
                  placeholder="masalan: Shahlo"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-black text-base shadow-xl shadow-pink-600/30 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              <span>TESTNI BOSHLASH (5 TA SAVOL)</span>
            </button>
          </form>
        </div>
      )}

      {/* Step 2: Interactive Quiz */}
      {step === 'quiz' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/30 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-4">
            <span>Savol {currentQ + 1} / {QUIZ_QUESTIONS.length}</span>
            <span className="text-pink-400">{maleName} & {femaleName}</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full mb-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-full transition-all duration-300"
              style={{ width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
            {QUIZ_QUESTIONS[currentQ].question}
          </h3>

          <div className="space-y-3">
            {QUIZ_QUESTIONS[currentQ].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-pink-500/50 hover:bg-slate-800/80 text-left transition-all group flex items-center justify-between"
              >
                <span className="text-sm font-semibold text-slate-200 group-hover:text-white">
                  {option.text}
                </span>
                <span className="text-xs text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Tanlash →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Shocking Result */}
      {step === 'result' && result && (
        <div className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-pink-500/40 shadow-2xl text-center relative overflow-hidden">
            
            <div className="text-xs uppercase font-bold tracking-widest text-pink-400 mb-2">
              EKSPRESS DIAGNOSTIKA NATIJASI
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
              {maleName} & {femaleName}
            </h2>

            {/* Twin meters */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
              
              <div className="bg-slate-900/80 border border-pink-500/30 rounded-2xl p-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Moslik Koeffitsienti</div>
                <div className="text-3xl sm:text-4xl font-black text-pink-400 mt-1 font-mono">
                  {result.matchPercent}%
                </div>
                <div className="text-[10px] text-pink-300 mt-1">❤️ Romantik ittifoq</div>
              </div>

              <div className="bg-slate-900/80 border border-rose-500/30 rounded-2xl p-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Qaynona Xavfi</div>
                <div className="text-3xl sm:text-4xl font-black text-rose-500 mt-1 font-mono">
                  {result.riskPercent}%
                </div>
                <div className="text-[10px] text-rose-300 mt-1">🚨 Qizil Xavf Zonasi!</div>
              </div>

            </div>

            {/* Verdict details */}
            <div className="space-y-3 text-left max-w-md mx-auto mb-6">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5">
                <div className="text-xs font-bold text-amber-300 mb-0.5">👑 Oilaviy Hukmronlik:</div>
                <div className="text-xs text-slate-200">{result.leader}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3.5">
                <div className="text-xs font-bold text-emerald-300 mb-0.5">💡 Omon Qolish Ko'rsatmasi:</div>
                <div className="text-xs text-slate-200">{result.advice}</div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <button
                onClick={shareToTelegram}
                className="py-3 px-4 rounded-xl bg-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-pink-500 transition-colors shadow-lg shadow-pink-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Telegramda Ulashish</span>
              </button>

              <button
                onClick={() => setStep('input')}
                className="py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Qaytadan o'tish</span>
              </button>
            </div>

          </div>

          {/* Monetization: To'liq Munajjimlar Bashorati */}
          <div className="max-w-md mx-auto glass-panel rounded-2xl p-4 border border-pink-500/30 bg-pink-500/5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-pink-300 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>To'liq 10 Yillik Oila & Xiyonat Bashorati</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Qaynona bilan yashash yoki alohida chiqish sanasi hisoboti
              </div>
            </div>
            <button
              onClick={() => onOpenPayment({ title: "To'liq Oila & Qaynona Bashorati", price: 4900, desc: `${maleName} & ${femaleName} uchun maxsus hisobot` })}
              className="px-3.5 py-2 rounded-xl bg-pink-500 text-slate-950 font-black text-xs shrink-0 hover:bg-pink-400 transition-all shadow-md shadow-pink-500/20"
            >
              4,900 so'm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

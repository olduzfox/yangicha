import React, { useState, useRef } from 'react';
import { Flame, Send, Sparkles, Download, Share2, AlertTriangle, ShieldAlert, Award, RefreshCw, Lock, CheckCircle2 } from 'lucide-react';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

const ROAST_DATABASE = {
  biznesmen: [
    {
      title: "Dubay orzusidagi qarz daftar",
      roast: "Bio'sida 'CEO / Investor / Crypto' deb yozilgan, lekin kechki oshga kelganda 'Menda faqat plastik, terminal ishlamasa siz to'lab turing' deb qochadi.",
      secret: "Telegramida 42 ta 'Tez va halol 1000$ topish' kanallari mavjud, lekin o'zi amakisidan 50 ming so'm benzinga so'rab yuradi.",
      destiny: "2028-yilda nihoyat 'Menejment' bo'yicha kitobini o'qib tugatadi.",
      rating: "2.4 / 10",
      advice: "Story'ga birovning mashinasining rulini qo'yishni bas qiling."
    },
    {
      title: "Kofe bilan rasmga tushish chempioni",
      roast: "Har kuni bitta kapuchino olib, 4 soat noutbuk ochib o'tiradi. Ishlayapti deb o'ylasangiz, qidiruv tarixida 'Noutbukda qanday qilib band ko'rinish mumkin' turibdi.",
      secret: "Kostyum-shimni faqat to'ylarga va story olishga kiyadi, uyda esa tizzasi yirtiq sportivkada yuradi.",
      destiny: "Yaqin orada yangi 'startap' boshlaydi, startapning maqsadi yana qarz olish bo'ladi.",
      rating: "3.1 / 10",
      advice: "Ofitsiantga choypuldanam tashlab turing, u sizni taniydi."
    }
  ],
  romantik: [
    {
      title: "Tragik shoir & Kechasi faol",
      roast: "Soat tungi 02:30 da 'Yuragim yondi...' deb qora fonda audio qo'yadi. Aslida esa shunchaki oshqozoni achishib qornidan ovoz chiqayotgan bo'ladi.",
      secret: "Barcha qizlarga 'Sen boshqachasan' deb bir xil shablon xabar yuboradi.",
      destiny: "To'yida 'Sevgi bu yolg'on' deb o'zi valsga tushadi.",
      rating: "1.9 / 10",
      advice: "Story'ga ruscha qayg'uli qo'shiq qo'ygandan ko'ra uxlab dam oling."
    },
    {
      title: "Anonim sevgilar professori",
      roast: "Bio'sida 'Yuragim qulflandi 🔒' deb yozgan, lekin har bitta yangi akkauntga kirib 'Salom tanishsak bo'ladimi' deb yozaveradi.",
      secret: "O'zining sobiq sevgilisining yangi dugonasining profilini soxta akkaunt orqali kuzatadi.",
      destiny: "Bo'lajak qaynonasi buni birinchi ko'rishdayoq 'Bu boladan tayin chiqmaydi' deydi.",
      rating: "2.8 / 10",
      advice: "Bloklanganlar ro'yxatini tozalang, telefon qotib qolmasin."
    }
  ],
  talaba: [
    {
      title: "Sessiya qurboni & Magistr afsonasi",
      roast: "Darsga haftada bir marta boradi, lekin o'qituvchilar bilan go'yo rektorning jiyandek salomlashadi. 'Domla, men amaliyotdaman' — uning eng sevimli gapi.",
      secret: "Kopirayterlik qilaman deb kurs sotib olgan, lekin faqat referatlarni 'Ctrl+C, Ctrl+V' qilishni o'rgangan.",
      destiny: "Diplomini olgach, diplom himoyasidagi rasm bilan 10 yil maqtanadi.",
      rating: "4.2 / 10",
      advice: "Sessiyada 'O'tib ketsam namoz o'qiyman' degan va'dangizni eslang."
    }
  ],
  fitness: [
    {
      title: "Zal ko'zgusining asosiy mijozi",
      roast: "Zalda 1 soat mashg'ulot qiladi: 5 daqiqa gantel ko'taradi, 55 daqiqa ko'zguda muskullarini toraytirib selfi oladi.",
      secret: "Protein qimmatligi sababli, kechasi yashirincha qora non bilan tuxum qovurib yeydi.",
      destiny: "Bir kuni rasm olayotganda ustiga shtanga tushib ketishi xavfi 90%.",
      rating: "3.5 / 10",
      advice: "Zalga kelganingizni hamma bilib bo'ldi, endi ozroq mashq ham qiling."
    }
  ],
  default: [
    {
      title: "Sirli kuzatuvchi (Seen mutaxassisi)",
      roast: "Profilida birorta ham o'zining rasmi yo'q: qora kvadrat, Bo'ri yoki mafiya aktyorining surati. O'zini o'ta xavfli agent deb hisoblaydi.",
      secret: "Birovning story'sini ko'rsa javob bermaydi, lekin kim uning profiliga kirganini 15 marta tekshiradi.",
      destiny: "Pensiyaga chiqqanida ham 'Men haqimda gapirishyapti' deb shubhalanib yuradi.",
      rating: "3.0 / 10",
      advice: "Profil rasmingizga nihoyat o'zingizning haqiqiy yuzingizni qo'ying."
    }
  ]
};

export default function RoastXona({ onOpenPayment }) {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('instagram');
  const [persona, setPersona] = useState('biznesmen');
  const [isFriend, setIsFriend] = useState(false);
  const [friendName, setFriendName] = useState('');
  
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const cardRef = useRef(null);

  const scanStepsText = [
    "Profil ma'lumotlari tahlil qilinmoqda...",
    "Bio'dagi soxta maqtanishlar saralanmoqda...",
    "Oxirgi 3 yildagi Telegram arxivlari ochilmoqda...",
    "Qarzlar va qaltis sirlar fosh etilmoqda...",
    "Shafqatsiz Yangicha Tashxis tayyorlanmoqda!"
  ];

  const handleStartRoast = (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    sounds.playShock();
    setScanning(true);
    setScanStep(0);
    setResult(null);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < scanStepsText.length) {
        setScanStep(step);
      } else {
        clearInterval(interval);
        generateRoast();
      }
    }, 600);
  };

  const generateRoast = () => {
    setScanning(false);
    sounds.playShock();

    const pool = ROAST_DATABASE[persona] || ROAST_DATABASE.default;
    const selected = pool[Math.floor(Math.random() * pool.length)];

    const cleanUsername = username.startsWith('@') ? username : `@${username}`;

    setResult({
      username: cleanUsername,
      platform,
      persona,
      friendName: isFriend ? friendName : null,
      ...selected,
      date: new Date().toLocaleDateString('uz-UZ'),
      id: `ROAST-${Math.floor(1000 + Math.random() * 9000)}`
    });

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const downloadCardAsImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    sounds.playCamera();

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 0.95,
        pixelRatio: 2
      });
      const link = document.createElement('a');
      link.download = `yangicha-roast-${username.replace('@', '')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Rasmga olishda xatolik:", err);
      alert("Rasmni saqlashda xatolik yuz berdi. Iltimos skrinshot qilib oling!");
    } finally {
      setIsDownloading(false);
    }
  };

  const shareToTelegram = () => {
    if (!result) return;
    const text = encodeURIComponent(
      `🔥 Men ${result.username} profiliga yangicha.com orqali shafqatsiz tashxis qo'ydim!\n\n` +
      `📌 Tashxis: "${result.roast}"\n` +
      `⭐ Reyting: ${result.rating}\n\n` +
      `O'z profilingizni ham roast qilib ko'ring: https://yangicha.com`
    );
    window.open(`https://t.me/share/url?url=https://yangicha.com&text=${text}`, '_blank');
  };

  return (
    <div className="py-8 max-w-4xl mx-auto px-4">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold mb-3">
          <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
          <span>Shafqatsiz Profil Diagnostikasi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Instagram & Telegram <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-amber-400">RoastXona</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          O'zingizni yoki do'stingizni qattiq masxara qiling! Sun'iy intellekt profilni "titkilab", eng kulgili sirlarni va shafqatsiz haqiqatni fosh qiladi.
        </p>
      </div>

      {/* Input Form */}
      {!result && !scanning && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />

          <form onSubmit={handleStartRoast} className="space-y-6">
            
            {/* Target Type */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsFriend(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  !isFriend
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                O'zimni roast qilish 😎
              </button>
              <button
                type="button"
                onClick={() => setIsFriend(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isFriend
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Do'stimni roast qilish (Prikol) 🎯
              </button>
            </div>

            {/* Platform selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Qaysi tarmoq profili?</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'instagram', name: 'Instagram', icon: InstagramIcon, color: 'text-pink-400 border-pink-500/30' },
                  { id: 'telegram', name: 'Telegram', icon: Send, color: 'text-sky-400 border-sky-500/30' },
                  { id: 'tiktok', name: 'TikTok', icon: Flame, color: 'text-amber-400 border-amber-500/30' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlatform(item.id)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all ${
                      platform === item.id
                        ? `bg-slate-800 text-white border-purple-500 shadow-md ${item.color}`
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Username input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {isFriend ? "Do'stingizning username'i (yoki ismi)" : "Profilingiz username'i"}
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono font-bold text-sm">@</span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value.replace(/^@/, ''))}
                  placeholder="masalan: alisher_off yoki madina_blog"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl pl-10 pr-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-sm font-mono"
                />
              </div>
            </div>

            {/* Persona archetype */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                U o'zini hayotda kim deb ko'rsatishga urinadi?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'biznesmen', label: '💼 "Katta Biznesmen"', sub: 'Kreditda yuradigan' },
                  { id: 'romantik', label: '💔 "Siniq Romantik"', sub: 'Tungi 3 gacha dardi bor' },
                  { id: 'talaba', label: '📚 "Sessiya Qurboni"', sub: 'Referat qidiradigan' },
                  { id: 'fitness', label: '🏋️‍♂️ "Fitness Gigant"', sub: 'Ko\'zguda rasm oladigan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPersona(item.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      persona === item.id
                        ? 'bg-purple-600/20 border-purple-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{item.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600 text-white font-black text-base shadow-xl shadow-purple-600/30 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Flame className="w-5 h-5 fill-current" />
              <span>SHAFQATSIZ ROAST QILISH</span>
            </button>
          </form>
        </div>
      )}

      {/* Scanning State */}
      {scanning && (
        <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-purple-500/30 shadow-2xl">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-rose-600 to-purple-600 p-1 animate-spin">
            <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
              <Flame className="w-8 h-8 text-rose-500 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-white mb-2">
            AI Profilni Titkilamoqda...
          </h3>
          <p className="text-purple-400 font-mono text-sm h-6 transition-all animate-pulse">
            {scanStepsText[scanStep]}
          </p>

          <div className="w-full bg-slate-800 h-2.5 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-rose-500 to-purple-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${((scanStep + 1) / scanStepsText.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Result Card & Sharing Engine */}
      {result && (
        <div className="space-y-6">
          
          {/* Printable / Downloadable Story Card */}
          <div
            ref={cardRef}
            className="w-full max-w-md mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-purple-950/40 to-slate-950 border-2 border-purple-500/40 p-6 sm:p-7 shadow-2xl relative overflow-hidden text-left"
          >
            {/* Background elements for Story styling */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />
            
            {/* Story Card Header */}
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-purple-600 p-[2px]">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-xl text-rose-400">
                    🔥
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-white text-base">{result.username}</span>
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                  </div>
                  <div className="text-[11px] text-purple-300 font-medium">
                    Tashxis: {result.title}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">Reyting</div>
                <div className="text-rose-400 font-black text-sm font-mono">{result.rating}</div>
              </div>
            </div>

            {/* Main Diagnosis */}
            <div className="bg-slate-950/70 border border-rose-500/30 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wide mb-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Shafqatsiz Tashxis:</span>
              </div>
              <p className="text-slate-100 text-sm leading-relaxed font-medium">
                "{result.roast}"
              </p>
            </div>

            {/* Secret & Destiny details */}
            <div className="space-y-3 mb-5">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-purple-400 font-bold mb-0.5">🤫 Eng Maxfiy Siri:</div>
                <div className="text-xs text-slate-300">{result.secret}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-amber-400 font-bold mb-0.5">🔮 2027-Yildagi Taqdiri:</div>
                <div className="text-xs text-slate-300">{result.destiny}</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <div className="text-[11px] text-emerald-400 font-bold mb-0.5">💡 Qat'iy Tavsiya:</div>
                <div className="text-xs text-slate-300">{result.advice}</div>
              </div>
            </div>

            {/* Watermark & Domain */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-purple-300 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> yangicha.com/roast
              </span>
              <span>{result.id}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="max-w-md mx-auto grid grid-cols-2 gap-3">
            <button
              onClick={downloadCardAsImage}
              disabled={isDownloading}
              className="py-3 px-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20 hover:opacity-90 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isDownloading ? "Tayyorlanmoqda..." : "Story uchun Rasm Saqlash"}</span>
            </button>

            <button
              onClick={shareToTelegram}
              className="py-3 px-4 rounded-2xl bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-sky-500/30 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Telegramga Yuborish</span>
            </button>
          </div>

          {/* Monetization Trigger: VIP Maxfiy Hujjat */}
          <div className="max-w-md mx-auto glass-panel rounded-2xl p-4 border border-amber-500/30 bg-amber-500/5 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                <Lock className="w-3.5 h-3.5" />
                <span>Maxfiy VIP Tahlil (To'liq Dossier)</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Uning eng ko'p kiradigan 5 ta soxta akkaunti va munosabatlar bashorati
              </div>
            </div>
            <button
              onClick={() => onOpenPayment({ title: "Maxfiy VIP Profil Dossier", price: 4900, desc: `${result.username} uchun to'liq tahlil` })}
              className="px-3 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shrink-0 hover:bg-amber-400 transition-colors shadow-md shadow-amber-500/20"
            >
              4,900 so'm
            </button>
          </div>

          {/* Reset button */}
          <div className="text-center">
            <button
              onClick={() => {
                setResult(null);
                setUsername('');
              }}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-xs font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Boshqa profilni roast qilish</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

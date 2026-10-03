import React, { useState, useEffect } from 'react';
import { MessageSquareWarning, Copy, Check, Volume2, Play, Square, Sparkles, RefreshCw, Radio, ShieldCheck, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

const EXCUSE_DATABASE = {
  boss: {
    samimiy: [
      "Assalomu alaykum, aka! Yo'lda shunaqa probkaga tushib qoldimki, naviqator ham adashib ketdi. Yo'lda gaz zapravkadan mashinalar navbati chiqib yo'lni yopib qo'ygan ekan. Yarim soatda yetib boraman, uzr!",
      "Assalomu alaykum, aka. Ertalabdan suv quvuri yorilib ketib, pastdagi qo'shnini suv bosibdi. Santexnik kelguncha kutib o'tirishga majbur bo'ldim. Hozir chiqdim, bugungi barcha vazifalarni kechgacha qilib beraman!",
    ],
    rasmiy: [
      "Hurmatli rahbar! Transport infratuzilmasidagi kutilmagan favqulodda to'siqlar va yo'l-ta'mirlash ishlari sababli belgilangan ish grafigidan 45 daqiqa kechikish ehtimoli vujudga keldi. Ish jarayoniga yetkazilgan noqulaylik uchun uzr so'rayman.",
      "Salom! Ertalabki kommunal nosozlik tufayli masofaviy ishlashga to'g'ri kelmoqda. Barcha hisobotlar va yuklatilgan topshiriqlar belgilangan muddatda to'liq topshiriladi."
    ],
    dramatik: [
      "Assalomu alaykum... Kechasi bilan haroratim 39 ga chiqib chiqdi. Hozir zo'rg'a ko'zimni ochdim, lekin baribir ishga intilyapman... Agar yo'lda yiqilib qolmasam 1 soatda boraman!",
      "Aka, ishoning, bugun shunaqa kun bo'ldiki, dushmanimga ham ravo ko'rmayman. Ertalabdan telefonim zaryadkadan uzilib qolgan, kalitimni topolmay 40 daqiqa yig'lab qidirdim..."
    ]
  },
  qarz: {
    samimiy: [
      "Jigar, qarz masalasida telefon qilyapsan bilaman. Bugun tushishi kerak bo'lgan pulim ertaga 14:00 ga qoldi, mijoz bankda ekan. Ertaga tiyinigacha tashlab beraman, xafa bo'lma!",
      "Brat, xudo guvoh ertalabdan seni pulingni yopish uchun yugurib yuribman. Faqat bitta odam oyligimni naqd qilib bersa bo'ldi, bugun kechqurun o'zim tashlab o'taman."
    ],
    rasmiy: [
      "Assalomu alaykum. Moliyaviy operatsiyalar va banklararo tranzaksiyalar kechikayotganligi bois hisob-kitob qilish muddati ertangi kunga qoldirilishini ma'lum qilaman. Barcha majburiyatlar o'z kuchida.",
    ],
    dramatik: [
      "Og'a, uyalganimdan senga nima deb yozishni bilmayapman. O'zim ham 3 kundan beri non bilan choy ichib yuribman, kutilgan joydan pul kelmadi. Bir-ikki kun sabr qilib tur, rozi bo'l!"
    ]
  },
  choyxona: {
    samimiy: [
      "Oshga bormasam bo'lmaydi deb turgandim, qaynonam qishloqdan kelib qoldilar! Vokzalga borib kutib olishim shart ekan, bo'lmasa oilada janjal chiqadi. Menga bitta portsiyani muzlatgichga olib qo'yinglar!",
      "Do'stlar, to'g'ri tushuninglar, bolani shamollab qolgan ekan, aptekaga yugurib yuribman. Keyingi haftadagi oshning choypuli to'liq mendan bo'ladi!",
    ],
    rasmiy: [
      "Barcha qadrdonlarga salom. Bugungi norasmiy uchrashuvda kutilmagan oilaviy va xizmat masalalari yuzasidan ishtirok eta olmasligimni bildirishga majburman. Oshingiz shirin bo'lsin!"
    ],
    dramatik: [
      "Aka-ukalar, bormasam yuragim ezilib ketadi bilasizlar... Lekin ayolim shunaqa shart qo'ydiki, yo bugun uyni remontini boshlaymiz, yo oshga borasan deb. O'zimni qutqaringlar!"
    ]
  },
  toy: {
    samimiy: [
      "Tabriklayman, to'y muborak bo'lsin! Aynan bugun xizmat safari bilan viloyatga chiqib ketgan edim, afsuski ulgurmadim. Yoshlar baxtli bo'lsin, kelganda albatta ko'rishamiz!",
      "Katta to'y muborak! Bugun ertalabdan belim tutib qolib, qimirlay olmay yotibman. Duodamiz, to'yona sizlar kelganda o'z qo'lim bilan beraman!"
    ],
    rasmiy: [
      "Oilaviy tantana munosabati bilan samimiy muborakbod etaman. Tizimli xizmat vazifalari bilan bog'liq holda tadbirda shaxsan qatnasha olmayapman. Yangi xonadonga baraka tilayman!"
    ],
    dramatik: [
      "To'yga borish uchun kiyinib turgandim, qo'shnimning mashinasi bilan noxush holat bo'lib, militsiya kutib o'tirishga majbur bo'ldik. Ming bor uzr, baxtli bo'lishsin!"
    ]
  }
};

export default function BahonaGenerator({ onOpenPayment }) {
  const [recipient, setRecipient] = useState('boss');
  const [tone, setTone] = useState('samimiy');
  const [currentText, setCurrentText] = useState(EXCUSE_DATABASE.boss.samimiy[0]);
  const [copied, setCopied] = useState(false);
  const [activeSound, setActiveSound] = useState(null); // 'traffic', 'hospital', 'rain'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    generateExcuse();
  }, [recipient, tone]);

  const generateExcuse = () => {
    sounds.playShock();
    const list = EXCUSE_DATABASE[recipient]?.[tone] || EXCUSE_DATABASE.boss.samimiy;
    const random = list[Math.floor(Math.random() * list.length)];
    setCurrentText(random);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    sounds.playCash();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleAmbientSound = (type) => {
    if (activeSound === type) {
      sounds.stopAmbient();
      setActiveSound(null);
      setIsPlayingAudio(false);
    } else {
      sounds.startAmbient(type);
      setActiveSound(type);
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
          <MessageSquareWarning className="w-4 h-4 text-emerald-400" />
          <span>O'zbekona Alibi & Qutulish Markazi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Bahona Generator <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">3000</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Ishga kech qoldingizmi, qarzni qaytarishga vaqt kerakmi yoki to'yga borgingiz kelmayaptimi? Sun'iy intellektli eng ishontiruvchi bahonalar va audio shovqinlar!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Settings Panel */}
        <div className="lg:col-span-5 space-y-5">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800">
            
            {/* Recipient Selector */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-slate-300 mb-2">Kimga bahona tayyorlaymiz?</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'boss', label: '👔 Rahbariyat / Boss' },
                  { id: 'qarz', label: '💰 Qarz Beruvchi' },
                  { id: 'choyxona', label: '🍲 Choyxona / Osh' },
                  { id: 'toy', label: '👰 To\'y / Tadbir' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRecipient(item.id)}
                    className={`p-3 rounded-xl text-xs font-bold text-left transition-all ${
                      recipient === item.id
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Bahona ohangi (Uslubi):</label>
              <div className="space-y-2">
                {[
                  { id: 'samimiy', title: '🇺🇿 Samimiy O\'zbekona', desc: '"Xudo xohlasa ertaga bitadi"' },
                  { id: 'rasmiy', title: '💼 O\'ta Rasmiy va Diplomatik', desc: 'Fors-major va qonuniy sabablar' },
                  { id: 'dramatik', title: '🎭 Dramatik / Yig\'loqi', desc: 'Ko\'zdan yosh oqizadigan darajada' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTone(item.id)}
                    className={`w-full p-3 rounded-xl text-left border transition-all ${
                      tone === item.id
                        ? 'bg-emerald-500/15 border-emerald-500 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateExcuse}
              className="w-full mt-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Boshqa bahona chiqarish</span>
            </button>
          </div>

          {/* Ambient Sound Simulator Box */}
          <div className="glass-panel rounded-3xl p-5 border border-cyan-500/30 bg-cyan-500/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
                <Radio className="w-4 h-4 animate-pulse text-cyan-400" />
                <span>Telegram Ovozli Xabar Fon Shovqini</span>
              </div>
              {activeSound && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 animate-pulse font-mono font-bold">
                  Jonli Ovozda
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Do'stingizga yoki bossingizga ovozli xabar (Voice) jo'natayotganda, quyidagi shovqinni yoqing — 100% ishonadi:
            </p>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'traffic', label: '🚗 Toshkent Probkasi' },
                { id: 'hospital', label: '🏥 Shifoxona Monit.' },
                { id: 'rain', label: '🌧️ Kuchli Yomg\'ir' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => toggleAmbientSound(s.id)}
                  className={`p-2.5 rounded-xl text-[11px] font-bold text-center border transition-all ${
                    activeSound === s.id
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Excuse Display & Telegram Simulator */}
        <div className="lg:col-span-7 space-y-5">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                <span className="text-xs font-bold text-slate-300">Tayyor Bahona Xabari:</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                99% Ishontirish Kafolati
              </span>
            </div>

            {/* Generated Excuse Text */}
            <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 text-slate-100 text-sm sm:text-base leading-relaxed font-medium mb-6 relative">
              "{currentText}"
            </div>

            {/* Telegram Simulated Voice Message UI */}
            <div className="bg-[#17212b] rounded-2xl p-4 border border-[#232e3c] mb-6 flex items-center gap-3">
              <button
                onClick={() => toggleAmbientSound(activeSound || 'traffic')}
                className="w-11 h-11 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0 hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20"
              >
                {activeSound ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <div className="flex-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                  <span>Telegram Ovozli Bahona</span>
                  <span>{activeSound ? "0:14" : "0:00"}</span>
                </div>
                {/* Audio Waveform visualization */}
                <div className="flex items-center gap-1 h-6">
                  {[40, 60, 30, 80, 100, 50, 70, 90, 40, 60, 30, 85, 95, 60, 40, 75, 55, 35, 65, 80, 45, 90, 70, 30].map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        activeSound ? 'bg-emerald-400 animate-pulse' : 'bg-slate-700'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleCopy}
                className="py-3 px-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? "Nusxalandi! (Jo'nating)" : "Matnni Nusxalash"}</span>
              </button>

              <button
                onClick={() => {
                  const shareText = encodeURIComponent(currentText);
                  window.open(`https://t.me/share/url?url=https://yangicha.com&text=${shareText}`, '_blank');
                }}
                className="py-3 px-4 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-300 font-bold text-xs flex items-center justify-center gap-2 hover:bg-sky-500/30 transition-colors"
              >
                <span>Telegramda Yuborish</span>
              </button>
            </div>
          </div>

          {/* Monetization: AI Voice Generator */}
          <div className="glass-panel rounded-2xl p-4 border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mashhur Qahramonlar Ovozida Ovozli Bahona (AI Voice)</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Bahonani professional aktyor yoki AI ovozida Telegram audiosi qilib yuklab olish
              </div>
            </div>
            <button
              onClick={() => onOpenPayment({ title: "AI Ovozli Bahona Xizmati", price: 4900, desc: "Professional ovozli Telegram bahona fayli" })}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shrink-0 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20"
            >
              4,900 so'm
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

"use client";

import {
  Zap,
  Globe2,
  Lock,
  Cpu,
  Layers,
  Sparkles,
  Bot,
  Database,
  ShieldAlert,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: "Ultra-Tezkor 0.2s Javob",
      description: "Optimallashtirilgan edge infratuzilma orqali so'rovlar sekundning o'ndan birida qayta ishlanadi va uzatiladi.",
      gradient: "from-amber-500 to-orange-600",
    },
    {
      icon: Globe2,
      title: "O'zbek Tili Morfologiyasi",
      description: "O'zbek tilining boy sinonimik qatlami, lotin/kirill imlosi va mahalliy atamalarni to'liq hisobga oluvchi neyrotizim.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      icon: Lock,
      title: "Zero-Knowledge Maxfiylik",
      description: "Sizning kiritgan ma'lumotlaringiz modellarni qayta o'qitish uchun saqlanmaydi va uchinchi shaxslarga berilmaydi.",
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      icon: Cpu,
      title: "Dasturchilar Uchun SDK & API",
      description: "Telegram bot, CRM yoki veb-saytingizga bir necha satr kod bilan Yangicha AI imkoniyatlarini integratsiya qiling.",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      icon: Layers,
      title: "Ko'p Modelli Sintez",
      description: "Faqat bitta model emas — GPT-4o, Claude 3.5 va eng so'nggi ochiq kodli Llama 3 modellarining eng kuchli jihatlari sintezi.",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      icon: Sparkles,
      title: "Yangicha Yondashuv",
      description: "Oddiy shablonlar o'rniga dinamik, vaziyatga moslashuvchan va biznesingiz qiymatini oshiruvchi aqlli natijalar.",
      gradient: "from-violet-500 to-purple-600",
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#06080e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Nega Aynan Yangicha?
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Eng So&apos;nggi Standartlar Asosida Yaratilgan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Biz shunchaki yana bir servis emas, balki kundalik raqamli jarayonlaringizni tubdan yengillashtiruvchi ekotizim qurdik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl glow-card overflow-hidden hover:border-slate-700/80 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl group-hover:scale-150 transition-transform"></div>

                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-900/20 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

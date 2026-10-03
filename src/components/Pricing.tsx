"use client";

import { useState } from "react";
import { Check, Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

interface PricingProps {
  onSelectPlan: (planName: string) => void;
}

export default function Pricing({ onSelectPlan }: PricingProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Boshlang'ich",
      badge: "Bepul Sinov",
      description: "Sun'iy intellekt vositalarini o'rganish va sinab ko'rish uchun.",
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        "Kuniga 25 ta generatsiya",
        "Prompt Arxitektori (GPT-4o baza)",
        "Matn Re-Writer & Tahlil",
        "UI/UX Ranglar palitrasi",
        "Standart server tezligi",
        "Jamiyat forumi orqali yordam",
      ],
      buttonText: "Bepul Boshlash",
      popular: false,
    },
    {
      name: "Yangicha Pro",
      badge: "Eng Ommabop",
      description: "Frilanserlar, startapchilar va o'z ishini tezlashtirmoqchi bo'lganlar uchun.",
      priceMonthly: 120000,
      priceAnnual: 96000, // 20% discount
      features: [
        "Cheksiz yuqori sifatli generatsiyalar",
        "GPT-4o va Claude 3.5 Sonnet to'liq kirish",
        "Midjourney v6 tayyor vizual promptlar",
        "Startap va biznes arxitekturasi generatori",
        "AST Kod tahlilchisi va optimallash",
        "0.2s ultra-tezkor server quvvati",
        "Telegram orqali tezkor qo'llab-quvvatlash",
      ],
      buttonText: "Pro Versiyani Tanlash",
      popular: true,
    },
    {
      name: "Enterprise & Jamoa",
      badge: "Kompaniyalar Uchun",
      description: "Kompaniyalar, raqamli agentliklar va dasturiy ta'minot jamoalari uchun.",
      priceMonthly: 490000,
      priceAnnual: 390000,
      features: [
        "Jamoa uchun 5 ta foydalanuvchi hisobi",
        "REST API va Webhook to'liq kirish huquqi",
        "Oylik 200,000 API tokenlar to'plami",
        "Maxsus korporativ bilimlar bazasi integratsiyasi",
        "Shaxsiy SLA va 99.99% kafolatlangan uptime",
        "Yuridik shartnoma va to'lov hisob-fakturasi",
        "24/7 shaxsiy mutaxassis biriktiriladi",
      ],
      buttonText: "Jamoa Uchun Tanlash",
      popular: false,
    },
  ];

  const formatPrice = (price: number) => {
    if (price === 0) return "0";
    return price.toLocaleString("uz-UZ");
  };

  return (
    <section id="pricing" className="py-24 relative bg-[#06080e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            Shaffof va Qulay Tariflar
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Imkoniyatlaringizga Mos Rejani Tanlang
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Hech qanday yashirin to&apos;lovlarsiz. Istalgan vaqtda bekor qilishingiz yoki tarifni yangilashingiz mumkin.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${
                !isAnnual ? "text-white" : "text-slate-400"
              }`}
            >
              Oylik to&apos;lov
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-slate-800 transition-colors duration-200 ease-in-out focus:outline-none"
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? "translate-x-7" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-sm font-medium ${
                  isAnnual ? "text-white" : "text-slate-400"
                }`}
              >
                Yillik to&apos;lov
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
                -20% Tejang
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const currentPrice = isAnnual ? plan.priceAnnual : plan.priceMonthly;

            return (
              <div
                key={idx}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#16122b] to-[#0c0f1d] border-2 border-purple-500 shadow-2xl shadow-purple-600/20 lg:-translate-y-2"
                    : "glow-card"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    {!plan.popular && (
                      <span className="text-xs text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold text-white font-mono">
                      {formatPrice(currentPrice)}
                    </span>
                    <span className="text-slate-400 text-sm">
                      {currentPrice > 0 ? "so'm / oy" : "bepul"}
                    </span>
                  </div>

                  <div className="border-t border-slate-800/80 pt-6 space-y-3.5 mb-8">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Kiritilgan imkoniyatlar:
                    </span>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                        <Check
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            plan.popular ? "text-purple-400" : "text-emerald-400"
                          }`}
                        />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-95"
                      : "bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 active:scale-95"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

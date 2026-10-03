"use client";

import { Sparkles, ArrowRight, Play, Terminal, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onScrollToTools: () => void;
  onOpenWaitlist: () => void;
}

export default function Hero({ onScrollToTools, onOpenWaitlist }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/12 rounded-full blur-[110px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[350px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-inner text-xs sm:text-sm font-medium text-slate-300 mb-8 hover:border-purple-500/40 transition-colors cursor-pointer group">
          <span className="flex h-2 w-2 rounded-full bg-purple-400 group-hover:scale-125 transition-transform" />
          <span className="text-purple-300 font-semibold">Yangicha 2.0</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">Intellektual AI Studio & SaaS</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
          Raqamli dunyoga{" "}
          <span className="text-gradient-primary">
            yangicha nigoh
          </span>{" "}
          bilan qadam qo&apos;ying
        </h1>

        {/* Description */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          <strong className="text-white font-medium">Yangicha.com</strong> — mutaxassislar, startapchilar va yaratuvchilar uchun professional promptlar, matn transformatsiyasi, startap arxitekturasi hamda dasturlash yordamchilarini o&apos;zida jamlagan zamonaviy sun&apos;iy intellekt ekotizimi.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onScrollToTools}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-semibold text-base shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            AI Vositalarni Sinash
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onOpenWaitlist}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 text-slate-200 font-semibold text-base hover:text-white transition-all flex items-center justify-center gap-2 backdrop-blur-md active:scale-95"
          >
            <Zap className="w-4 h-4 text-purple-400" />
            Erta Kirishga Qo&apos;shilish
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Ro&apos;yxatdan o&apos;tish shart emas</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Tezkor 0.2s javob vaqti</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>100% Maxfiy & Xavfsiz</span>
          </div>
        </div>

        {/* Interactive Preview Banner / Floating Terminal Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-2xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl shadow-purple-950/40">
          <div className="rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border border-white/5 p-4 sm:p-6 text-left">
            {/* Window control dots */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="ml-3 text-xs text-slate-400 font-mono flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-slate-500" />
                  yangicha-ai-engine.sh — v2.0
                </span>
              </div>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-800/50">
                ACTIVE • 100% READY
              </div>
            </div>

            {/* Terminal simulation lines */}
            <div className="space-y-2.5 font-mono text-xs sm:text-sm">
              <div className="flex items-start gap-2 text-slate-400">
                <span className="text-purple-400 select-none">&gt;</span>
                <span className="text-slate-300">
                  yangicha init --model=&quot;gpt-4o&quot; --domain=&quot;yangicha.com&quot;
                </span>
              </div>
              <div className="flex items-start gap-2 text-emerald-400 pl-4">
                <span>✓</span>
                <span>Sun&apos;iy intellekt arxitekturasi muvaffaqiyatli ishga tushirildi.</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 pl-4">
                <span className="text-cyan-400">ℹ</span>
                <span className="text-slate-300">
                  &quot;Yangicha yondashuv: g&apos;oyalaringizni professional darajaga ko&apos;taruvchi vositalar tayyor.&quot;
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Supported AI Ecosystem Brands */}
        <div className="mt-16 pt-8 border-t border-slate-800/60 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-6">
            Yetakchi Sun&apos;iy Intellekt Texnologiyalari Bilan Quvvatlangan
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors">
              OpenAI ChatGPT
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-purple-400 transition-colors">
              Claude 3.5 Sonnet
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-pink-400 transition-colors">
              Midjourney v6
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-emerald-400 transition-colors">
              Google Gemini Pro
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white hover:text-indigo-400 transition-colors">
              Meta Llama 3
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

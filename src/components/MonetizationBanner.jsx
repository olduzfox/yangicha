import React from 'react';
import { TrendingUp, Users, Flame, Megaphone, Send } from 'lucide-react';

export default function MonetizationBanner({ config }) {
  const adminHandle = config?.telegramAdmin || '@yangicha_admin';

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 space-y-6">
      
      {/* Live Viral Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Bugungi Roastlar", count: "14,892", icon: Flame, color: "text-rose-400" },
          { label: "Erkakcha Shartnomalar", count: "3,140", icon: TrendingUp, color: "text-amber-400" },
          { label: "Qutqarilgan Bahonalar", count: "8,410", icon: Users, color: "text-emerald-400" },
          { label: "Telegramda Ulashilgan", count: "42,300+", icon: Send, color: "text-sky-400" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass-panel p-3.5 rounded-2xl border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mb-1">
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                <span>{stat.label}</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white font-mono">
                {stat.count}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sponsor / Advertisement Banner */}
      <div className="glass-panel rounded-3xl p-4 sm:p-5 border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-slate-900 to-pink-950/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
            <Megaphone className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <span>Sizning Reklamangiz yoki Brendingiz Shu Yerda Bo'lishi Mumkin!</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.2 rounded font-mono">
                HOT TRAFFIC
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Kuniga 50,000+ yoshlar va faol o'zbek auditoriyasi ko'radi. Homiylik va reklama uchun:
            </p>
          </div>
        </div>

        <a
          href={`https://t.me/${adminHandle.replace('@', '')}`}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-purple-300 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-2"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Reklama Berish ({adminHandle})</span>
        </a>
      </div>

    </div>
  );
}

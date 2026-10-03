import React from 'react';
import { Sparkles, Heart, ShieldAlert } from 'lucide-react';

export default function Footer({ setActiveTab, config }) {
  const adminHandle = config?.telegramAdmin || '@yangicha_admin';
  const channel = config?.telegramChannel || '@yangicha_uz';

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 mt-16 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-lg text-white font-mono">
                yangicha<span className="text-purple-400">.com</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                O'zbekona Format
              </span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              O'zbek segmentidagi eng viral va qiziqarli ko'ngilochar loyihalar makoni. Roastlar, erkakcha garov shartnomalari, sun'iy intellektli bahonalar va moslik testlari.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1 text-[11px] text-slate-500">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>Barcha kontent do'stona hazil va ko'ngilochar maqsadlarda yaratilgan.</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Bo'limlar</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setActiveTab('roast')} className="hover:text-purple-400 transition-colors">
                  🔥 RoastXona (Profil Diagnostikasi)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('shartnoma')} className="hover:text-amber-400 transition-colors">
                  📜 Rasmiy Erkakcha Shartnoma
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bahona')} className="hover:text-emerald-400 transition-colors">
                  🤫 Bahona Generator & Audio
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('moslik')} className="hover:text-pink-400 transition-colors">
                  💘 Qaynona & Moslik Detektori
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">Hamkorlik & Aloqa</h4>
            <ul className="space-y-2">
              <li>
                <a href={`https://t.me/${channel.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">
                  📢 Rasmiy Telegram Kanal ({channel})
                </a>
              </li>
              <li>
                <a href={`https://t.me/${adminHandle.replace('@', '')}`} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
                  💼 Reklama va Homiylik ({adminHandle})
                </a>
              </li>
              <li>
                <span className="text-slate-500 font-mono">Domen: yangicha.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 yangicha.com. Barcha huquqlar himoyalangan.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>O'zbekistonda mehr va hazil bilan yaratilgan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
}

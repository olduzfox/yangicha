import React, { useState } from 'react';
import { Flame, FileText, MessageSquareWarning, HeartHandshake, Volume2, VolumeX, Sparkles, Send, Settings, ShieldCheck } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Navbar({ activeTab, setActiveTab, onOpenAdmin, onOpenPayment }) {
  const [isMuted, setIsMuted] = useState(false);

  const handleMuteToggle = () => {
    const state = sounds.toggleMute();
    setIsMuted(state);
  };

  const navItems = [
    { id: 'roast', label: 'RoastXona', icon: Flame, badge: '🔥 XIT' },
    { id: 'shartnoma', label: 'Erkakcha Shartnoma', icon: FileText, badge: '📜 Rasmiy' },
    { id: 'bahona', label: 'Bahona Generator', icon: MessageSquareWarning, badge: '🤫 Audio' },
    { id: 'moslik', label: 'Qaynona Detektor', icon: HeartHandshake, badge: '💘 Test' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('roast')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-[2px] shadow-lg shadow-purple-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 to-pink-300">
                Y
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                  yangicha<span className="text-purple-400">.com</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Viral Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">O'zbekcha Prikol & Xizmatlar Portali</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sounds.playStamp();
                    setActiveTab(item.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-900/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-purple-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleMuteToggle}
              title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            <button
              onClick={() => onOpenPayment({ title: "Yangicha VIP Homiy Bo'lish", price: 9000, desc: "Saytdagi barcha premium funksiyalarni ochish" })}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-purple-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-bold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>VIP & Click</span>
            </button>

            <button
              onClick={onOpenAdmin}
              title="Monetizatsiya va Telegram sozlamalari"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-purple-400 transition-colors"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Mobile Nav Scroller */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800/60 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sounds.playStamp();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-900/60 text-slate-300 border border-slate-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

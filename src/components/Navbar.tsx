"use client";

import { useState } from "react";
import { Sparkles, Menu, X, ArrowRight, Zap, Shield, Cpu } from "lucide-react";

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export default function Navbar({ onOpenWaitlist }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#070a12] rounded-[11px] flex items-center justify-center">
                <span className="font-extrabold text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                  Y
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
                Yangicha<span className="text-purple-400">.com</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 -mt-1 font-medium">
                AI & SaaS Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#tools"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              AI Vositalar
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              Imkoniyatlar
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Tariflar
            </a>
            <a
              href="#api"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              API & SDK
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              v2.0 Online
            </div>

            <button
              onClick={onOpenWaitlist}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-xl group bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 hover:text-white text-white shadow-lg shadow-purple-500/25 active:scale-95 transition-all"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-150 bg-[#0c101d] rounded-[10px] group-hover:bg-opacity-0 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                Erta Kirish
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800/80 bg-[#070a13]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3">
            <a
              href="#tools"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60 font-medium"
            >
              AI Vositalar
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60 font-medium"
            >
              Imkoniyatlar
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60 font-medium"
            >
              Tariflar
            </a>
            <a
              href="#api"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60 font-medium"
            >
              API & SDK
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/60 font-medium"
            >
              Savol-Javoblar
            </a>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
            >
              <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              Erta Kirishga Yozilish
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

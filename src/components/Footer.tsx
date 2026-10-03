"use client";

export default function Footer() {
  return (
    <footer className="bg-[#040609] border-t border-slate-900 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#070a12] rounded-[11px] flex items-center justify-center">
                  <span className="font-extrabold text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Y
                  </span>
                </div>
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                Yangicha<span className="text-purple-400">.com</span>
              </span>
            </a>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Kelajakka yangicha nigoh bilan. Sun&apos;iy intellekt vositalari, startap arxitekturasi va dasturchilar uchun zamonaviy intellektual platforma.
            </p>

            {/* Social Links with inline SVGs */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Telegram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                </svg>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 flex items-center justify-center transition-colors border border-slate-800"
                aria-label="X / Twitter"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Mahsulot */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-sm">AI Vositalar</h4>
            <ul className="space-y-2">
              <li>
                <a href="#tools" className="hover:text-white transition-colors">
                  Prompt Arxitektori
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-white transition-colors">
                  Matn Re-Writer
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-white transition-colors">
                  Startap Generatori
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-white transition-colors">
                  UI Brend Palitrasi
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-white transition-colors">
                  Kod Tahlilchisi
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Ishlab chiquvchilar */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-sm">Dasturchilarga</h4>
            <ul className="space-y-2">
              <li>
                <a href="#api" className="hover:text-white transition-colors">
                  REST API Docs
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-white transition-colors">
                  Node.js & Python SDK
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-white transition-colors">
                  Webhooks & Events
                </a>
              </li>
              <li>
                <a href="#api" className="hover:text-white transition-colors">
                  Status Page (99.99%)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Kompaniya & Huquqiy */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-sm">Kompaniya</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Biz haqimizda
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Tariflar
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  Savol-Javoblar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Maxfiylik siyosati
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Foydalanish shartlari
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} Yangicha.com. Barcha huquqlar himoyalangan.
          </p>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>O&apos;zbekistonda mehr bilan yaratilgan</span>
            <span className="text-red-500">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

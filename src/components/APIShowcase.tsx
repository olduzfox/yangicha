"use client";

import { useState } from "react";
import { Terminal, Copy, Check, Code, Zap } from "lucide-react";

export default function APIShowcase() {
  const [activeLang, setActiveLang] = useState<"curl" | "js" | "python">("curl");
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    curl: `curl -X POST https://api.yangicha.com/v1/generate \\
  -H "Authorization: Bearer yangicha_live_sec_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{
    "engine": "yangicha-turbo-uz",
    "prompt": "SaaS biznesim uchun 3 ta kuchli sarlavha yarat",
    "temperature": 0.7,
    "stream": true
  }'`,
    js: `import { YangichaAI } from "@yangicha/sdk";

const client = new YangichaAI({
  apiKey: process.env.YANGICHA_API_KEY,
});

const response = await client.completions.create({
  engine: "yangicha-turbo-uz",
  prompt: "SaaS biznesim uchun 3 ta kuchli sarlavha yarat",
  temperature: 0.7,
});

console.log(response.choices[0].text);`,
    python: `from yangicha import YangichaAI
import os

client = YangichaAI(api_key=os.getenv("YANGICHA_API_KEY"))

response = client.completions.create(
    engine="yangicha-turbo-uz",
    prompt="SaaS biznesim uchun 3 ta kuchli sarlavha yarat",
    temperature=0.7
)

print(response.choices[0].text)`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="api" className="py-20 relative bg-[#070a13] border-t border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <Code className="w-3.5 h-3.5" />
              Dasturchilar Uchun
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Bir Necha Satr Kod Bilan Integratsiya Qiling
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              O&apos;z Telegram botingiz, CRM yoki startapingizga Yangicha AI imkoniyatlarini ulay olasiz. To&apos;liq hujjatlashtirilgan REST API va kutubxonalar mavjud.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>99.99% Uptime va Global Edge Caching</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>Real vaqtda Streaming javoblar (Server-Sent Events)</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <span>SDK: Node.js, Python, Go, PHP va Dart/Flutter</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#tools"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300"
              >
                API kalit olish va hujjatlarni o&apos;qish
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Right Code Box */}
          <div className="lg:col-span-7 rounded-2xl bg-[#090d16] border border-slate-800 shadow-2xl overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#0c101d] border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="ml-2 font-mono text-xs text-slate-400">api.yangicha.com</span>
              </div>

              {/* Language Switcher */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setActiveLang("curl")}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                    activeLang === "curl"
                      ? "bg-purple-600 text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  cURL
                </button>
                <button
                  onClick={() => setActiveLang("js")}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                    activeLang === "js"
                      ? "bg-purple-600 text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  JavaScript
                </button>
                <button
                  onClick={() => setActiveLang("python")}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                    activeLang === "python"
                      ? "bg-purple-600 text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  Python
                </button>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-xs sm:text-sm text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed relative bg-slate-950/70">
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-sans flex items-center gap-1.5 border border-slate-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Nusxalandi
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Kodni nusxa olish
                  </>
                )}
              </button>
              {codeSnippets[activeLang]}
            </div>

            {/* Simulated Live Response Footer */}
            <div className="px-5 py-3 bg-[#080b13] border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-emerald-400 font-semibold">200 OK</span>
                <span className="text-slate-500">|</span>
                <span>Latency: 184ms</span>
              </div>
              <span>Token usage: 142 tokens</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

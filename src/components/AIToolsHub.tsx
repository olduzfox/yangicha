"use client";

import { useState } from "react";
import {
  Sparkles,
  FileEdit,
  Rocket,
  Palette,
  Code2,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Send,
  Wand2,
  Layers,
  ArrowUpRight,
  Info,
} from "lucide-react";

type ToolType = "prompt" | "text" | "startup" | "palette" | "code";

export default function AIToolsHub() {
  const [activeTab, setActiveTab] = useState<ToolType>("prompt");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // State for Tool 1: Prompt
  const [promptTopic, setPromptTopic] = useState("O'zbekistonda zamonaviy kofe brendi uchun marketing strategiyasi");
  const [promptPlatform, setPromptPlatform] = useState("chatgpt");
  const [promptStyle, setPromptStyle] = useState("expert");
  const [promptResult, setPromptResult] = useState<any>(null);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

  // State for Tool 2: Text Polish
  const [rawText, setRawText] = useState("Biz yangi onlayn servis ochdik, unda hamma narsa bor, juda qulay va narxlari ham arzon, kirib ko'ringlar.");
  const [textStyle, setTextStyle] = useState("marketing");
  const [polishedResult, setPolishedResult] = useState<any>(null);
  const [isPolishing, setIsPolishing] = useState(false);

  // State for Tool 3: Startup
  const [industry, setIndustry] = useState("ai");
  const [targetMarket, setTargetMarket] = useState("uzbekistan");
  const [startupResult, setStartupResult] = useState<any>(null);
  const [isGeneratingStartup, setIsGeneratingStartup] = useState(false);

  // State for Tool 4: Palette
  const [paletteTheme, setPaletteTheme] = useState("cyber-dark");
  const [paletteColors, setPaletteColors] = useState<any[]>([]);

  // State for Tool 5: Code
  const [codeSnippet, setCodeSnippet] = useState(
`function findDuplicates(arr) {
  let duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}`
  );
  const [codeResult, setCodeResult] = useState<any>(null);
  const [isAnalyzingCode, setIsAnalyzingCode] = useState(false);

  // Handle Prompt Generation
  const generatePrompt = () => {
    setIsGeneratingPrompt(true);
    setTimeout(() => {
      let engineered = "";
      let systemRole = "";
      let params = "";

      if (promptPlatform === "midjourney") {
        engineered = `/imagine prompt: Ultra-realistic cinematic commercial shot for "${promptTopic}", futuristic neon lighting, studio product photography, photorealistic 8k, hyper-detailed, ray tracing, octane render --ar 16:9 --v 6.0 --style raw --stylize 250`;
        systemRole = "Midjourney v6 uchun vizual kompozitsiya va yorug'lik ko'rsatmalari optimallashtirildi.";
        params = "Aspect: 16:9 | Version: 6.0 | Stylize: 250 | Quality: 2";
      } else if (promptPlatform === "claude") {
        engineered = `You are a world-class strategic consultant. Analyze the following project domain: "${promptTopic}". Provide a deeply structured 4-pillar analysis covering: 1) Executive Market Overview, 2) Unique Value Proposition (UVP), 3) Customer Acquisition Funnel, 4) Potential bottlenecks and mitigation plan. Write in fluent, concise, high-impact language with bullet points and numerical metrics where applicable.`;
        systemRole = "Strategik maslahatchi va tahlilchi darajasidagi tizim kognitiv buyrug'i.";
        params = "Temperature: 0.4 | Max Tokens: 2500 | Role: Top-Tier Business Strategist";
      } else {
        engineered = `Sen ushbu soha bo'yicha 10 yillik tajribaga ega yetakchi mutaxassissan: "${promptTopic}". 
Quyidagi tartibda to'liq va amaliy rejani tayyorlab ber:
1. Maqsadli auditoriya dardi va psixologik xatti-harakatlari.
2. 3 bosqichli amaliy harakatlar strategiyasi (0-30 kun, 30-90 kun).
3. Eng ko'p yo'l qo'yiladigan 3 ta xato va ulardan qanday saqlanish.
4. Natijani o'lchovchi aniq KPI ko'rsatkichlari.
Javobni amaliy, keraksiz suv so'zlarsiz, professional o'zbek tilida taqdim et.`;
        systemRole = "GPT-4o uchun kontekstual, amaliy va yuqori darajada tuzilgan prompt.";
        params = "Model: GPT-4o | Temperature: 0.7 | Output format: Markdown Table & Points";
      }

      setPromptResult({
        prompt: engineered,
        systemRole,
        params,
        wordCount: engineered.split(" ").length,
      });
      setIsGeneratingPrompt(false);
    }, 450);
  };

  // Handle Text Polishing
  const polishText = () => {
    setIsPolishing(true);
    setTimeout(() => {
      let rewritten = "";
      let toneTitle = "";
      let analysis = "";

      if (textStyle === "marketing") {
        rewritten = `Kutib oling: Hayotingizni osonlashtiruvchi yangi avlod raqamli platformasi! Barcha muhim vositalar bitta qulay muhitda jamlandi. Vaqtni tejang, imkoniyatlarni kengaytiring va hamyonbop narxlarda maksimal natijaga erishing. Hoziroq bepul sinab ko'ring!`;
        toneTitle = "Sotuvchi va jozibali (High Conversion Marketing)";
        analysis = "Diqqatni tortuvchi sarlavha, aniq foyda (benefit-driven) va harakatga chaqiruv (CTA) qo'shildi.";
      } else if (textStyle === "business") {
        rewritten = `Biznes samaradorligini oshirish maqsadida ishlab chiqilgan yangi integrallashgan servisimizni taqdim etamiz. Tizim qulay interfeys, yuqori xavfsizlik va tejamkor tarif rejalari orqali operatsion xarajatlarni optimallashtirish imkonini beradi. Batafsil ma'lumot olishingiz mumkin.`;
        toneTitle = "B2B & Rasmiy Korporativ Uslub";
        analysis = "Ishonch uyg'otuvchi biznes terminologiyasi, professionallik va rasmiy muloqot qoidalari ta'minlandi.";
      } else if (textStyle === "minimal") {
        rewritten = `Ortiqcha qiyinchiliksiz, tez va arzon. Yangi platformamiz barcha kerakli vositalarni bitta joyga jamladi. O'zingiz baho bering.`;
        toneTitle = "Ultra-Qisqa va Londa (Minimalist Punch)";
        analysis = "So'zlar soni 60% qisqartirildi, asosiy g'oya 2 jumlada ifodalandi.";
      } else {
        rewritten = `Kelajak texnologiyalari bugundan boshlanadi. Biz kundalik jarayonlarni qayta tasavvur qilib, siz uchun chindan ham yangicha va ilhomlantiruvchi platforma yaratdik. Siz izlagan qulaylik shu yerda.`;
        toneTitle = "Kreativ & Ilhomlantiruvchi";
        analysis = "Emotsional bog'lanish va brend hikoyasi (storytelling) kuchaytirildi.";
      }

      setPolishedResult({
        rewritten,
        toneTitle,
        analysis,
      });
      setIsPolishing(false);
    }, 400);
  };

  // Handle Startup Generation
  const generateStartup = () => {
    setIsGeneratingStartup(true);
    setTimeout(() => {
      const startups: Record<string, any> = {
        ai: {
          name: "Yangicha Copilot Uzbekistan",
          tagline: "Mahalliy bizneslar uchun avtomatlashtirilgan sun'iy intellekt xodimi",
          problem: "O'zbekistondagi kichik va o'rta bizneslar mijozlarga kechayu-kunduz javob berish, hisob-kitob va marketing postlarini yozishda ko'p xodim ushlab, katta xarajat qilmoqda.",
          solution: "Telegram, Instagram va veb-saytga 1 klikda ulanuvchi, o'zbek tilining nozikliklarini biladigan AI yordamchi platformasi.",
          monetization: "Oylik obuna (B2B SaaS): Boshlang'ich $19/oy, Kengaytirilgan $59/oy, Enterprise $199/oy.",
          moat: "O'zbek tili va lotin/kirill dialektlari bo'yicha maxsus fine-tune qilingan model, Uzum Pay & Click integratsiyasi.",
          firstStep: "1. 20 ta mahalliy brend bilan pilot loyiha; 2. Telegram webhook bot MVP; 3. Ommaviy reliz.",
        },
        fintech: {
          name: "QarzHub Yangicha",
          tagline: "Do'stlar va bizneslar o'rtasida qonuniy, shaffof mikro-shartnomalar",
          problem: "Odamlar o'rtasida omonat yoki qarz munosabatlari ko'pincha og'zaki bo'lib, nizolar va noqulayliklarga olib keladi.",
          solution: "Mobil ilova orqali raqamli imzo (OneID) bilan tasdiqlanuvchi, eslatma va to'lov grafigini avtomatlashtiruvchi qonuniy platforma.",
          monetization: "Har bir muvaffaqiyatli tranzaksiyadan 0.5% xizmat haqi + yuridik shablonlar do'koni.",
          moat: "Raqamli yuridik kuchga ega shartnoma generatsiyasi va avtomatlashtirilgan SMS/bank integratsiyasi.",
          firstStep: "1. Yuridik litsenziya talablarini tekshirish; 2. Web platforma prototipi; 3. Bank API integratsiyasi.",
        },
        edtech: {
          name: "SkillFlow AI",
          tagline: "Har bir talaba uchun individual moslashuvchan AI mentor",
          problem: "An'anaviy kurslarda barcha talabaga bir xil dars o'tiladi, 70% o'quvchi o'z tempini topolmay darsni tashlab ketadi.",
          solution: "Talabaning kuchli va zaif tomonlarini test orqali aniqlab, har kuni shaxsiylashtirilgan 15 daqiqalik mikro-darslar va interaktiv topshiriqlar tuzuvchi AI murabbiy.",
          monetization: "Freemium: Boshlang'ich darslar bepul, Pro mentorlik $9/oy.",
          moat: "Real vaqtda kod va topshiriqlarni tekshiruvchi avtomatlashtirilgan feedback tizimi.",
          firstStep: "1. Frontend va Python dasturlash bo'yicha pilot guruh; 2. AI bot orqali testlash; 3. LMS platformasi.",
        },
      };

      const selected = startups[industry] || startups.ai;
      setStartupResult(selected);
      setIsGeneratingStartup(false);
    }, 450);
  };

  // Generate Palette
  const generatePalette = (themeName: string) => {
    setPaletteTheme(themeName);
    const palettes: Record<string, any[]> = {
      "cyber-dark": [
        { hex: "#06080e", name: "Void Obsidian", role: "Background" },
        { hex: "#1e1b4b", name: "Deep Neon Indigo", role: "Surface" },
        { hex: "#8b5cf6", name: "Electric Violet", role: "Primary Accent" },
        { hex: "#06b6d4", name: "Cyber Cyan", role: "Secondary Highlight" },
        { hex: "#f8fafc", name: "Luminescent White", role: "Text & Headers" },
      ],
      "silicon-minimal": [
        { hex: "#0f172a", name: "Slate Space", role: "Dark Canvas" },
        { hex: "#3b82f6", name: "Silicon Blue", role: "Brand Primary" },
        { hex: "#10b981", name: "Growth Emerald", role: "Success / CTA" },
        { hex: "#64748b", name: "Cool Grey", role: "Subtle Details" },
        { hex: "#ffffff", name: "Pure Light", role: "Contrast Highlights" },
      ],
      "sunset-modern": [
        { hex: "#0f0714", name: "Twilight Shadow", role: "Dark Canvas" },
        { hex: "#f43f5e", name: "Vibrant Rose", role: "Primary Action" },
        { hex: "#fb923c", name: "Solar Orange", role: "Accent Glow" },
        { hex: "#818cf8", name: "Dream Iris", role: "Complementary" },
        { hex: "#fed7aa", name: "Warm Glow", role: "Accent Text" },
      ],
    };
    setPaletteColors(palettes[themeName] || palettes["cyber-dark"]);
  };

  // Analyze Code
  const analyzeCode = () => {
    setIsAnalyzingCode(true);
    setTimeout(() => {
      setCodeResult({
        complexityOld: "O(n²)",
        complexityNew: "O(n)",
        improvements: [
          "Ichma-ich 'for' sikllari va 'includes()' orqali O(n²) kvadratik sekinlashuv aniqlandi.",
          "JavaScript'ning zamonaviy 'Set' obyekti orqali xotira va vaqt murakkabligi O(n) chiziqli holatga keltirildi.",
          "Natijada 10,000 elementli massivda tezlik 45 barobarga oshadi.",
        ],
        optimizedCode:
`// Yangicha Optimized Code:
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }

  return Array.from(duplicates);
}`,
      });
      setIsAnalyzingCode(false);
    }, 400);
  };

  // Run initial state on tab change if not loaded
  const handleTabChange = (tab: ToolType) => {
    setActiveTab(tab);
    if (tab === "prompt" && !promptResult) generatePrompt();
    if (tab === "text" && !polishedResult) polishText();
    if (tab === "startup" && !startupResult) generateStartup();
    if (tab === "palette" && paletteColors.length === 0) generatePalette("cyber-dark");
    if (tab === "code" && !codeResult) analyzeCode();
  };

  return (
    <section id="tools" className="py-20 relative bg-[#070911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Interaktiv AI Laboratoriya
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Yangicha Vositalar Majmuasi
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Shunchaki nazariya emas — real ishlovchi sun&apos;iy intellekt modullarini bevosita brauzerda sinab ko&apos;ring.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => handleTabChange("prompt")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
              activeTab === "prompt"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            Prompt Arxitektori
          </button>

          <button
            onClick={() => handleTabChange("text")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
              activeTab === "text"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <FileEdit className="w-4 h-4 text-cyan-400" />
            Matn Re-Writer
          </button>

          <button
            onClick={() => handleTabChange("startup")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
              activeTab === "startup"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Rocket className="w-4 h-4 text-emerald-400" />
            Startap Generatori
          </button>

          <button
            onClick={() => handleTabChange("palette")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
              activeTab === "palette"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Palette className="w-4 h-4 text-pink-400" />
            UI Brend Palitrasi
          </button>

          <button
            onClick={() => handleTabChange("code")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
              activeTab === "code"
                ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                : "bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
            }`}
          >
            <Code2 className="w-4 h-4 text-indigo-400" />
            Kod Tahlilchisi
          </button>
        </div>

        {/* Tab 1: Prompt Architect */}
        {activeTab === "prompt" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start glow-card rounded-2xl p-6 sm:p-8">
            {/* Left Controls */}
            <div className="lg:col-span-5 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Prompt Arxitektori
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  AI modellaridan 100% aniqlikdagi natija olish uchun muhandislik prompti yasang.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Mavzu yoki Maqsad
                </label>
                <textarea
                  rows={3}
                  value={promptTopic}
                  onChange={(e) => setPromptTopic(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                  placeholder="Masalan: Yangi dasturchilar uchun 30 kunlik roadmap..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Model Platformasi
                  </label>
                  <select
                    value={promptPlatform}
                    onChange={(e) => setPromptPlatform(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 p-2.5 outline-none focus:border-purple-500"
                  >
                    <option value="chatgpt">OpenAI ChatGPT-4o</option>
                    <option value="claude">Claude 3.5 Sonnet</option>
                    <option value="midjourney">Midjourney v6</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Uslub & Daraja
                  </label>
                  <select
                    value={promptStyle}
                    onChange={(e) => setPromptStyle(e.target.value)}
                    className="w-full rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 p-2.5 outline-none focus:border-purple-500"
                  >
                    <option value="expert">Senior Ekspert</option>
                    <option value="creative">Kreativ & Chuqur</option>
                    <option value="concise">Qisqa & Metrik</option>
                  </select>
                </div>
              </div>

              {/* Sample Quick Chips */}
              <div>
                <span className="text-[11px] text-slate-400 font-medium block mb-2">
                  Tayyor namunalar:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "SaaS MVP Rejasi",
                    "Cyberpunk Toshkent 2050",
                    "Savdo Funneli Audit",
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => {
                        setPromptTopic(chip);
                        if (chip.includes("Cyberpunk")) setPromptPlatform("midjourney");
                        else setPromptPlatform("chatgpt");
                      }}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generatePrompt}
                disabled={isGeneratingPrompt}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                {isGeneratingPrompt ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Arxitektura qurilmoqda...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-yellow-300" />
                    Mukammal Prompt Generatsiya Qilish
                  </>
                )}
              </button>
            </div>

            {/* Right Output */}
            <div className="lg:col-span-7 bg-[#090d16] rounded-2xl border border-slate-800 p-5 sm:p-6 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      Tayyor Engineered Prompt
                    </span>
                  </div>
                  {promptResult && (
                    <button
                      onClick={() => handleCopy(promptResult.prompt, "prompt")}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 text-xs font-medium transition-colors"
                    >
                      {copiedKey === "prompt" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Nusxalandi!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Nusxa olish
                        </>
                      )}
                    </button>
                  )}
                </div>

                {promptResult ? (
                  <div className="space-y-4">
                    <div className="bg-slate-950/90 rounded-xl p-4 border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap select-all">
                      {promptResult.prompt}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                        <span className="text-slate-400 block font-semibold mb-1">
                          Tizim roli / Arxitektura:
                        </span>
                        <span className="text-slate-300">{promptResult.systemRole}</span>
                      </div>
                      <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
                        <span className="text-slate-400 block font-semibold mb-1">
                          Tavsiya parametrlar:
                        </span>
                        <span className="text-cyan-400 font-mono">{promptResult.params}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                    <Sparkles className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-sm">Tugmani bosing va prompt yaratiladi</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>Yangicha Prompt Engine v2</span>
                <span className="text-purple-400">100% ChatGPT, Claude & Midjourney mos</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Text Polish */}
        {activeTab === "text" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start glow-card rounded-2xl p-6 sm:p-8">
            <div className="lg:col-span-5 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FileEdit className="w-5 h-5 text-cyan-400" />
                  Matn Re-Writer & Polish
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Har qanday xomaki fikrni professional va ta&apos;sirchan matnga aylantiring.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Asl (Xomaki) Matn
                </label>
                <textarea
                  rows={4}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 p-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                  placeholder="Xomaki matningizni bu yerga yozing..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  O&apos;zgartirish Uslubi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "marketing", label: "🚀 Savdo & Marketing" },
                    { id: "business", label: "💼 B2B & Rasmiy" },
                    { id: "minimal", label: "⚡ Qisqa & Londa" },
                    { id: "creative", label: "✨ Kreativ Hikoya" },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setTextStyle(style.id)}
                      className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                        textStyle === style.id
                          ? "bg-cyan-500/20 border border-cyan-500 text-cyan-300"
                          : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={polishText}
                disabled={isPolishing}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                {isPolishing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sayqallanmoqda...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-white" />
                    Matnni Yangicha Uslubga O&apos;tkazish
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-7 bg-[#090d16] rounded-2xl border border-slate-800 p-5 sm:p-6 flex flex-col justify-between min-h-[380px]">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      {polishedResult?.toneTitle || "Sayqallangan Natija"}
                    </span>
                  </div>
                  {polishedResult && (
                    <button
                      onClick={() => handleCopy(polishedResult.rewritten, "text")}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/30 text-cyan-300 text-xs font-medium transition-colors"
                    >
                      {copiedKey === "text" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Nusxalandi!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Nusxa olish
                        </>
                      )}
                    </button>
                  )}
                </div>

                {polishedResult ? (
                  <div className="space-y-4">
                    <div className="bg-slate-950/90 rounded-xl p-5 border border-slate-800 text-sm sm:text-base text-slate-100 leading-relaxed font-sans">
                      &quot;{polishedResult.rewritten}&quot;
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/80">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-1">
                        <Info className="w-3.5 h-3.5 text-cyan-400" />
                        AI Tahririyat Tahlili:
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {polishedResult.analysis}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                    <FileEdit className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-sm">Matnni kiritib tugmani bosing</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>O&apos;zbek tili lug&apos;aviy boyligi</span>
                <span className="text-cyan-400">NLP Transformer model</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Startup Generator */}
        {activeTab === "startup" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start glow-card rounded-2xl p-6 sm:p-8">
            <div className="lg:col-span-5 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-emerald-400" />
                  Startap & G&apos;oyalar Generatori
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Bozor talabi, monetizatsiya va himoyalangan ustunlikka (moat) ega startap modeli.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Soha (Industriya)
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 p-3 outline-none focus:border-emerald-500"
                >
                  <option value="ai">🤖 AI & Raqamli Avtomatlashtirish</option>
                  <option value="fintech">💳 FinTech & To&apos;lov Tizimlari</option>
                  <option value="edtech">🎓 EdTech & Zamonaviy Kasblar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Maqsadli Bozor
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetMarket("uzbekistan")}
                    className={`p-2.5 rounded-xl text-xs font-medium text-center transition-all ${
                      targetMarket === "uzbekistan"
                        ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                        : "bg-slate-950 border border-slate-800 text-slate-400"
                    }`}
                  >
                    🇺🇿 O&apos;zbekiston & Markaziy Osiyo
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetMarket("global")}
                    className={`p-2.5 rounded-xl text-xs font-medium text-center transition-all ${
                      targetMarket === "global"
                        ? "bg-emerald-500/20 border border-emerald-500 text-emerald-300"
                        : "bg-slate-950 border border-slate-800 text-slate-400"
                    }`}
                  >
                    🌍 Global Xalqaro Bozor
                  </button>
                </div>
              </div>

              <button
                onClick={generateStartup}
                disabled={isGeneratingStartup}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                {isGeneratingStartup ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Model generatsiya qilinmoqda...
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 text-emerald-200" />
                    Yangicha Startap Modelini Yaratish
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-7 bg-[#090d16] rounded-2xl border border-slate-800 p-5 sm:p-6 flex flex-col justify-between min-h-[420px]">
              {startupResult ? (
                <div className="space-y-4">
                  <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-semibold">
                        G&apos;oya Nomi & Slogan:
                      </span>
                      <h4 className="text-xl font-bold text-white mt-0.5">
                        {startupResult.name}
                      </h4>
                      <p className="text-xs text-slate-400 italic">
                        &quot;{startupResult.tagline}&quot;
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleCopy(
                          `${startupResult.name}\n${startupResult.tagline}\n\nMuammo: ${startupResult.problem}\n\nYechim: ${startupResult.solution}\n\nMonetizatsiya: ${startupResult.monetization}`,
                          "startup"
                        )
                      }
                      className="px-3 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      {copiedKey === "startup" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Nusxalandi!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Nusxa olish
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-950/80 p-3.5 rounded-xl border border-red-500/20">
                      <span className="font-semibold text-red-400 block mb-1">
                        🔴 Dolzarb Muammo:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {startupResult.problem}
                      </p>
                    </div>

                    <div className="bg-slate-950/80 p-3.5 rounded-xl border border-emerald-500/20">
                      <span className="font-semibold text-emerald-400 block mb-1">
                        🟢 Yangicha Yechim:
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {startupResult.solution}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div>
                      <span className="font-semibold text-cyan-400 block">
                        💰 Monetizatsiya Modeli:
                      </span>
                      <p className="text-slate-300 mt-0.5">{startupResult.monetization}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-900">
                      <span className="font-semibold text-purple-400 block">
                        🛡️ Raqobat Ustunligi (Moat):
                      </span>
                      <p className="text-slate-300 mt-0.5">{startupResult.moat}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-900">
                      <span className="font-semibold text-yellow-400 block">
                        🚀 Birinchi qadamlar (MVP Plan):
                      </span>
                      <p className="text-slate-300 mt-0.5">{startupResult.firstStep}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                  <Rocket className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-sm">Sohani tanlab generatsiya qiling</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>Startap arxitekturasi</span>
                <span className="text-emerald-400">Y Combinator metodologiyasi</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: UI/UX Brand Palette */}
        {activeTab === "palette" && (
          <div className="glow-card rounded-2xl p-6 sm:p-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-400" />
                  UI/UX Brend Palitrasi & CSS Tokens
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Rang ustiga bosing — HEX kodi bir zumda nusxalanadi.
                </p>
              </div>

              {/* Theme Selector */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "cyber-dark", label: "Cyber Dark" },
                  { id: "silicon-minimal", label: "Silicon Minimal" },
                  { id: "sunset-modern", label: "Sunset Glow" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => generatePalette(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      paletteTheme === item.id
                        ? "bg-pink-600 text-white shadow-md shadow-pink-600/30"
                        : "bg-slate-900 text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {paletteColors.map((color, index) => (
                <div
                  key={index}
                  onClick={() => handleCopy(color.hex, `color-${index}`)}
                  className="group relative cursor-pointer rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-pink-500/50 transition-all hover:-translate-y-1 shadow-lg"
                >
                  <div
                    className="h-28 w-full flex items-center justify-center relative transition-transform group-hover:scale-105"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-white text-xs font-mono font-medium flex items-center gap-1">
                      {copiedKey === `color-${index}` ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          Ko&apos;chirildi!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          HEX Nusxa
                        </>
                      )}
                    </span>
                  </div>
                  <div className="p-3 text-left">
                    <span className="text-[11px] font-mono font-bold text-slate-200 block">
                      {color.hex}
                    </span>
                    <span className="text-xs font-medium text-slate-300 block truncate">
                      {color.name}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {color.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CSS Variables snippet */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 truncate max-w-xl">
                :root &#123;{" "}
                {paletteColors
                  .map((c, i) => `--color-${i + 1}: ${c.hex};`)
                  .join(" ")}{" "}
                &#125;
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    `:root {\n${paletteColors
                      .map((c, i) => `  --color-${i + 1}: ${c.hex}; /* ${c.name} */`)
                      .join("\n")}\n}`,
                    "css-tokens"
                  )
                }
                className="ml-4 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-pink-400 border border-slate-700 font-sans text-xs flex items-center gap-1 shrink-0"
              >
                {copiedKey === "css-tokens" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    CSS Nusxalandi!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    CSS Snippet
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 5: Code Optimizer */}
        {activeTab === "code" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start glow-card rounded-2xl p-6 sm:p-8">
            <div className="lg:col-span-6 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  Kod Tahlili va Big-O Optimallash
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Algoritm sekinlashuvlarini aniqlang va optimal zamonaviy kod oling.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Dasturlash Kodi (JavaScript / TypeScript / Python)
                </label>
                <textarea
                  rows={8}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 font-mono text-xs text-emerald-400 border border-slate-800 p-3 focus:border-indigo-500 outline-none"
                  spellCheck={false}
                />
              </div>

              <button
                onClick={analyzeCode}
                disabled={isAnalyzingCode}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                {isAnalyzingCode ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Tahlil qilinmoqda...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-indigo-200" />
                    Kodni Tahlil Qilish va Optimallash
                  </>
                )}
              </button>
            </div>

            <div className="lg:col-span-6 bg-[#090d16] rounded-2xl border border-slate-800 p-5 sm:p-6 flex flex-col justify-between min-h-[380px]">
              {codeResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded bg-red-950/60 border border-red-800 text-red-400 text-xs font-mono">
                        Eski: {codeResult.complexityOld}
                      </span>
                      <span className="text-slate-400">→</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-mono font-bold">
                        Yangi: {codeResult.complexityNew}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopy(codeResult.optimizedCode, "opt-code")}
                      className="px-3 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium flex items-center gap-1.5"
                    >
                      {copiedKey === "opt-code" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Nusxalandi!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Kodni Nusxalash
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                      Tahlil va Takliflar:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {codeResult.improvements.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-cyan-400">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre">
                    {codeResult.optimizedCode}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                  <Code2 className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-sm">Kodni tahlil qilish tugmasini bosing</p>
                </div>
              )}

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>Statik AST Parser</span>
                <span className="text-indigo-400">High-Performance Compiler</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

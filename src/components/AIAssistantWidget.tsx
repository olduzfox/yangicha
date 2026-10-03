"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, User, Minimize2 } from "lucide-react";

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Assalomu alaykum! Men Yangicha AI yordamchisiman. Yangicha.com imkoniyatlari, sun'iy intellekt vositalari yoki o'z loyihangiz bo'yicha savollaringiz bo'lsa, bemalol so'rang!",
      time: "Hozir",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    "Yangicha.com qanday ishlaydi?",
    "Prompt Arxitektori nima beradi?",
    "Narxlar va tariflar qanday?",
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "";
      const lower = text.toLowerCase();

      if (lower.includes("qanday ishlaydi") || lower.includes("nima bu") || lower.includes("haqida")) {
        botResponse =
          "Yangicha.com — bu zamonaviy mutaxassislar va startaplar uchun mo'ljallangan sun'iy intellekt platformasi. Siz yuqoridagi 'AI Vositalar' bo'limida Prompt Arxitektori, Matn Re-Writer, Startap Generatori, UI Palitra va Kod Tahlilchisini bepul sinab ko'rishingiz mumkin!";
      } else if (lower.includes("prompt") || lower.includes("arxitektor")) {
        botResponse =
          "Prompt Arxitektori — oddiy so'rovlarni ChatGPT-4o, Claude 3.5 yoki Midjourney v6 uchun professional kognitiv va muhandislik darajasiga yetkazib beruvchi vositadir. Saytning yuqorisidagi bo'limda darhol sinab ko'rishingiz mumkin!";
      } else if (lower.includes("narx") || lower.includes("tarif") || lower.includes("pul")) {
        botResponse =
          "Bizda 3 ta qulay reja mavjud:\n1. Boshlang'ich — Bepul (kuniga 25 ta so'rov);\n2. Yangicha Pro — 96,000 so'm/oy (yillikda);\n3. Enterprise — 390,000 so'm/oy (jamoalar va to'liq API uchun).";
      } else if (lower.includes("startap") || lower.includes("g'oya")) {
        botResponse =
          "Bizning 'Startap Generatori' vositamiz O'zbekiston yoki global bozor uchun dolzarb muammo, yechim, monetizatsiya va MVP rejasini 1 soniyada tayyorlab beradi. Uni sinab ko'rishni tavsiya qilaman!";
      } else {
        botResponse =
          "Ajoyib savol! Yangicha.com orqali siz o'z g'oyalaringizni professional darajada amalga oshirishingiz mumkin. Yuqoridagi interaktiv vositalarimizdan foydalanib ko'ring yoki 'Erta Kirish' orqali Pro imtiyozlarni qo'lga kiriting!";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-medium text-sm shadow-xl shadow-purple-600/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090d16] animate-pulse"></span>
          </div>
          <span className="hidden sm:inline font-semibold">Yangicha AI Yordamchi</span>
          <span className="sm:hidden font-semibold">AI Bot</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] rounded-3xl bg-[#090d18] border border-purple-500/30 shadow-2xl shadow-purple-950/70 flex flex-col overflow-hidden animate-fadeIn backdrop-blur-xl">
          {/* Header */}
          <div className="px-5 py-4 bg-[#0d1222] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1px]">
                <div className="w-full h-full bg-[#080c18] rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Yangicha AI
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
                    Online
                  </span>
                </h4>
                <p className="text-[11px] text-slate-400">Intellektual maslahatchi</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-purple-600 text-white rounded-tr-none shadow-md shadow-purple-600/20"
                      : "bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[9px] text-slate-400 block mt-1 text-right">
                    {msg.time}
                  </span>
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs pl-9">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-400 animate-bounce"></span>
                <span
                  className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></span>
                <span
                  className="inline-block w-2 h-2 rounded-full bg-indigo-400 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></span>
                <span className="text-[11px] text-slate-400 ml-1">Javob yozilmoqda...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className="px-3 py-2 bg-[#070a14] border-t border-slate-900 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(q)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[10px] transition-colors shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-[#0d1222] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Savolingizni yozing..."
                className="flex-1 bg-slate-950 border border-slate-800 text-xs text-white rounded-xl px-3 py-2.5 outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

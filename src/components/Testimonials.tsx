"use client";

import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/toolsData";

export default function Testimonials() {
  return (
    <section className="py-20 relative bg-[#070911] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-pink-400" />
            Foydalanuvchilar E&apos;tirofi
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Yangicha Tajriba Haqida Nima Deyishadi?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            O&apos;zbekistonning yetakchi IT va biznes mutaxassislari Yangicha platformasi bilan o&apos;z ish unumdorligini oshirmoqda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="glow-card rounded-2xl p-7 flex flex-col justify-between relative group hover:border-purple-500/40"
            >
              <Quote className="w-10 h-10 text-purple-500/20 absolute top-6 right-6 pointer-events-none group-hover:text-purple-500/40 transition-colors" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  &quot;{item.content}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-600 p-[2px]">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs text-slate-400">
                    {item.role} • <span className="text-purple-400">{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

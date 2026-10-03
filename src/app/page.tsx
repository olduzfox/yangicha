"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIToolsHub from "@/components/AIToolsHub";
import Features from "@/components/Features";
import APIShowcase from "@/components/APIShowcase";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTAWaitlist from "@/components/CTAWaitlist";
import Footer from "@/components/Footer";
import AIAssistantWidget from "@/components/AIAssistantWidget";

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<string | null>(null);

  const scrollToTools = () => {
    const el = document.getElementById("tools");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenWaitlist = (planName?: string) => {
    setSelectedPlanForModal(planName || null);
    setIsWaitlistOpen(true);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#06080e] text-slate-100 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Navigation */}
      <Navbar onOpenWaitlist={() => handleOpenWaitlist()} />

      {/* Hero Section */}
      <Hero
        onScrollToTools={scrollToTools}
        onOpenWaitlist={() => handleOpenWaitlist()}
      />

      {/* AI Tools Studio (The Interactive Hub) */}
      <AIToolsHub />

      {/* Core Platform Features */}
      <Features />

      {/* Developer API & SDK Showcase */}
      <APIShowcase />

      {/* Pricing Section */}
      <Pricing onSelectPlan={(plan) => handleOpenWaitlist(plan)} />

      {/* Testimonials & Social Proof */}
      <Testimonials />

      {/* FAQs */}
      <FAQSection />

      {/* CTA / Waitlist Section & Modal */}
      <CTAWaitlist
        isOpenModal={isWaitlistOpen}
        onCloseModal={() => setIsWaitlistOpen(false)}
        selectedPlan={selectedPlanForModal}
      />

      {/* Footer */}
      <Footer />

      {/* Floating AI Interactive Assistant Widget */}
      <AIAssistantWidget />
    </main>
  );
}

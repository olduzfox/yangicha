import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yangicha.com — Yangi Avlod Sun'iy Intellekt va SaaS Platformasi",
  description: "Kelajakka yangicha nigoh: Yangicha.com — professional promptlar, matn transformatsiyasi, startap g'oyalari va dasturchilar uchun aqlli AI vositalari.",
  keywords: ["Yangicha", "Yangicha.com", "AI Hub", "Sun'iy intellekt", "O'zbekiston startap", "Prompt arxitektori", "SaaS"],
  authors: [{ name: "Yangicha Team" }],
  openGraph: {
    title: "Yangicha.com — Yangi Avlod Sun'iy Intellekt Platformasi",
    description: "Raqamli dunyoga yangicha yondashuv. All-in-one AI vositalari majmuasi.",
    url: "https://yangicha.com",
    siteName: "Yangicha.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#06080e] text-slate-100 antialiased selection:bg-purple-500/30 selection:text-purple-200">
        {children}
      </body>
    </html>
  );
}

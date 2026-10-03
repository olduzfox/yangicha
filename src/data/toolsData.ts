export interface ToolOption {
  id: string;
  name: string;
  description: string;
  category: "text" | "business" | "code" | "design" | "prompt";
  icon: string;
  badge?: string;
}

export const AI_TOOLS: ToolOption[] = [
  {
    id: "prompt-architect",
    name: "Prompt Arxitektori",
    description: "ChatGPT, Midjourney va Claude uchun mukammal professional buyruqlar (prompts) shakllantirish.",
    category: "prompt",
    icon: "Sparkles",
    badge: "Ommabop",
  },
  {
    id: "text-polish",
    name: "Matn Re-Writer",
    description: "Oddiy matnni biznes, savdo, ilmiy yoki zamonaviy ritorikaga moslashtirib beruvchi vosita.",
    category: "text",
    icon: "FileEdit",
    badge: "Yangicha",
  },
  {
    id: "startup-generator",
    name: "Startap & G'oya Generatori",
    description: "Sohangizga mos bozor talabidagi startap modeli, monetizatsiya va USP takliflarini ishlab chiqish.",
    category: "business",
    icon: "Rocket",
    badge: "AI Pro",
  },
  {
    id: "color-palette",
    name: "UI/UX Brend Palitrasi",
    description: "Zamonaviy raqamli mahsulotlar uchun garmonik ranglar palitrasi va CSS kodlarini yaratish.",
    category: "design",
    icon: "Palette",
  },
  {
    id: "code-explainer",
    name: "Kod Tahlili va Optimallash",
    description: "Har qanday dasturlash kodini tahlil qilib, xatolarni ko'rsatish va optimallashtirilgan kod tavsiya etish.",
    category: "code",
    icon: "Code2",
  },
];

export const TESTIMONIALS = [
  {
    name: "Alisher Qodirov",
    role: "Senior Product Manager",
    company: "Fintech Lab",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    content: "Yangicha.com loyihasidagi vositalar jamoamiz ish unumdorligini 3 barobarga oshirdi. Ayniqsa Prompt Arxitektori va biznes g'oyalar vositasi nihoyatda pishiq ishlangan.",
    rating: 5,
  },
  {
    name: "Malika Yusupova",
    role: "Head of Marketing",
    company: "TrendMedia",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    content: "O'zbek tilida bunchalik silliq va aqlli ishlaydigan SaaS platformasini anchadan beri kutgandik. Yangicha uslub va estetika shunchaki ajoyib!",
    rating: 5,
  },
  {
    name: "Farrux Zokirov",
    role: "Fullstack Developer & Startup Founder",
    company: "NeoCraft",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content: "Dizayn, tezlik, API integratsiyasi va kod tahlilchisi meni lol qoldirdi. Yangicha.com nomi o'ziga 100% yarashgan — mutlaqo yangi standart.",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "Yangicha.com nima va u kimlar uchun mo'ljallangan?",
    a: "Yangicha.com — zamonaviy mutaxassislar, startapchilar, dasturchilar, marketologlar va tadbirkorlar uchun sun'iy intellektga asoslangan raqamli innovatsiyalar va SaaS vositalari markazidir.",
  },
  {
    q: "Platformadagi vositalardan bepul foydalanish mumkinmi?",
    a: "Ha! Asosiy vositalar bepul taqdim etiladi. Pro va Enterprise rejalari esa yuqori limitlar, API kirish va jamoaviy ishlash imkoniyatlarini taqdim etadi.",
  },
  {
    q: "Ma'lumotlarim xavfsizligi kafolatlanganmi?",
    a: "Albatta. Barcha ma'lumotlar TLS 1.3 shifrlash orqali uzatiladi va sizning kiritgan shaxsiy ma'lumotlaringiz uchinchi shaxslarga berilmaydi.",
  },
  {
    q: "O'z tizimimga Yangicha AI API'sini ulashim mumkinmi?",
    a: "Ha, biz dasturchilar uchun qulay RESTful API va SDK taqdim etamiz. Istalgan Telegram bot yoki CRM tizimiga 5 daqiqada integratsiya qilish mumkin.",
  },
];

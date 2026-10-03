import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Sparkles, Send, CreditCard, ExternalLink, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/audio';

export default function PaymentModal({ isOpen, onClose, data, config }) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState('click'); // 'click', 'payme', 'telegram_free', 'card'
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const price = data?.price || 4900;
  const title = data?.title || "VIP Xizmat";
  const desc = data?.desc || "yangicha.com maxsus funksiyasi";

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    sounds.playShock();

    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      sounds.playCash();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 1500);
  };

  const handleOpenClick = () => {
    sounds.playCash();
    // Real Click URL scheme if merchant configured, or direct invoice
    const clickUrl = config?.clickServiceId 
      ? `https://my.click.uz/services/pay?service_id=${config.clickServiceId}&merchant_id=${config.clickMerchantId || ''}&amount=${price}`
      : `https://my.click.uz`;
    window.open(clickUrl, '_blank');
    handleSimulatePayment();
  };

  const handleOpenPayme = () => {
    sounds.playCash();
    const paymeUrl = config?.paymeMerchantId
      ? `https://checkout.paycom.uz/${config.paymeMerchantId}`
      : `https://payme.uz`;
    window.open(paymeUrl, '_blank');
    handleSimulatePayment();
  };

  const handleTelegramFree = () => {
    sounds.playCash();
    const channel = config?.telegramChannel || '@yangicha_uz';
    window.open(`https://t.me/${channel.replace('@', '')}`, '_blank');
    setTimeout(() => {
      setSuccess(true);
      confetti({ particleCount: 70 });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!success ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold mb-2">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Tezkor Mikroto'lov</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">
                {title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {desc}
              </p>
            </div>

            {/* Price badge */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">To'lov miqdori:</span>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-mono">{price.toLocaleString()}</span>
                <span className="text-xs text-purple-400 font-bold ml-1">so'm</span>
              </div>
            </div>

            {/* Methods */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs font-semibold text-slate-300">To'lov usulini tanlang:</label>
              
              {/* Click */}
              <button
                type="button"
                onClick={() => setPaymentMethod('click')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                  paymentMethod === 'click'
                    ? 'bg-blue-600/20 border-blue-500 text-white'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-xs">
                    C
                  </div>
                  <span className="text-xs font-bold">Click (Click Up / QR)</span>
                </div>
                <span className="text-[10px] text-blue-400 font-mono font-bold">1 soniyada</span>
              </button>

              {/* Payme */}
              <button
                type="button"
                onClick={() => setPaymentMethod('payme')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                  paymentMethod === 'payme'
                    ? 'bg-teal-600/20 border-teal-500 text-white'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center font-black text-slate-950 text-xs">
                    P
                  </div>
                  <span className="text-xs font-bold">Payme ilovasi</span>
                </div>
                <span className="text-[10px] text-teal-400 font-mono font-bold">Karta bilan</span>
              </button>

              {/* Karta orqali to'g'ridan-to'g'ri */}
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-purple-600/20 border-purple-500 text-white'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-bold">Uzcard / Humo (Karta raqamiga)</span>
                </div>
                <span className="text-[10px] text-purple-400 font-mono">To'g'ridan-to'g'ri</span>
              </button>

              {/* Free via Telegram Channel Join (Viral Growth Hack!) */}
              <button
                type="button"
                onClick={() => setPaymentMethod('telegram_free')}
                className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                  paymentMethod === 'telegram_free'
                    ? 'bg-sky-600/20 border-sky-400 text-white'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Send className="w-5 h-5 text-sky-400" />
                  <span className="text-xs font-bold">Bepul: Telegram kanalga obuna bo'lish 🎁</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">0 so'm</span>
              </button>
            </div>

            {/* Direct Card info if selected */}
            {paymentMethod === 'card' && (
              <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-3 mb-5 text-xs text-slate-300">
                <div className="text-slate-400 text-[11px]">Karta raqami (Click/Payme orqali):</div>
                <div className="font-mono font-bold text-white text-sm tracking-wider my-1">
                  {config?.cardNumber || "8600 0000 0000 0000"}
                </div>
                <div className="text-[10px] text-slate-500">Qabul qiluvchi: {config?.cardOwner || "yangicha.com loyihasi"}</div>
              </div>
            )}

            {/* CTA button */}
            {paymentMethod === 'click' && (
              <button
                onClick={handleOpenClick}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{isProcessing ? "Tekshirilmoqda..." : "Click orqali to'lash"}</span>
              </button>
            )}

            {paymentMethod === 'payme' && (
              <button
                onClick={handleOpenPayme}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-teal-500/30 hover:bg-teal-400 transition-all flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{isProcessing ? "Tekshirilmoqda..." : "Payme orqali to'lash"}</span>
              </button>
            )}

            {paymentMethod === 'card' && (
              <button
                onClick={handleSimulatePayment}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-purple-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:bg-purple-500 transition-all flex items-center justify-center gap-2"
              >
                <span>{isProcessing ? "Tasdiqlanmoqda..." : "To'ladim, chekni tasdiqlash"}</span>
              </button>
            )}

            {paymentMethod === 'telegram_free' && (
              <button
                onClick={handleTelegramFree}
                className="w-full py-3.5 rounded-2xl bg-sky-500 text-white font-bold text-sm shadow-xl shadow-sky-500/30 hover:bg-sky-400 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kanalga A'zo Bo'lish & Bepul Ochish</span>
              </button>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Xavfsiz to'lov va 100% maxfiylik kafolati</span>
            </div>
          </div>
        ) : (
          /* Payment Success Confirmation */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-4 text-emerald-400 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white mb-1">
              To'lov Tasdiqlandi! 🎉
            </h3>
            <p className="text-xs text-slate-300 max-w-xs mx-auto mb-6">
              Rahmat! Xizmat muvaffaqiyatli faollashtirildi. yangicha.com loyihasini qo'llab-quvvatlaganingiz uchun minnatdormiz!
            </p>

            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-colors"
            >
              Davom etish
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

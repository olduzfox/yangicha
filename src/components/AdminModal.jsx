import React, { useState } from 'react';
import { X, Settings, Save, Check, ShieldCheck, DollarSign, Send, Eye } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function AdminModal({ isOpen, onClose, config, onSaveConfig }) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    clickServiceId: config?.clickServiceId || '',
    clickMerchantId: config?.clickMerchantId || '',
    paymeMerchantId: config?.paymeMerchantId || '',
    cardNumber: config?.cardNumber || '8600 1234 5678 9012',
    cardOwner: config?.cardOwner || 'YANGICHA MEDIA',
    telegramChannel: config?.telegramChannel || '@yangicha_uz',
    telegramAdmin: config?.telegramAdmin || '@yangicha_admin',
    bannerActive: config?.bannerActive ?? true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveConfig(formData);
    sounds.playCash();
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-bold mb-2">
            <Settings className="w-3.5 h-3.5 text-purple-400" />
            <span>Loyiha Egasi Boshqaruvi</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Monetizatsiya & Reklama Sozlamalari
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            yangicha.com orqali to'g'ridan-to'g'ri o'z hamyoningizga pul tushirish sozlamalari
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Click Payments */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-blue-500/30 space-y-3">
            <div className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <span>Click To'lov Tizimi</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Click Service ID</label>
                <input
                  type="text"
                  name="clickServiceId"
                  value={formData.clickServiceId}
                  onChange={handleChange}
                  placeholder="masalan: 12345"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Click Merchant ID</label>
                <input
                  type="text"
                  name="clickMerchantId"
                  value={formData.clickMerchantId}
                  onChange={handleChange}
                  placeholder="masalan: 67890"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Payme */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-teal-500/30 space-y-3">
            <div className="text-xs font-bold text-teal-400">Payme Tizimi</div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Payme Merchant ID</label>
              <input
                type="text"
                name="paymeMerchantId"
                value={formData.paymeMerchantId}
                onChange={handleChange}
                placeholder="Paycom merchant kaliti"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Direct Card */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/30 space-y-3">
            <div className="text-xs font-bold text-purple-400">To'g'ridan-to'g'ri Karta (Uzcard/Humo)</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Karta raqami</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="8600 ...."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Karta egasi</label>
                <input
                  type="text"
                  name="cardOwner"
                  value={formData.cardOwner}
                  onChange={handleChange}
                  placeholder="Ism Familiya"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Telegram Traffic Engine */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-sky-500/30 space-y-3">
            <div className="text-xs font-bold text-sky-400">Telegram Trafik Boshqaruvi</div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Obunachilar yig'iladigan kanal</label>
                <input
                  type="text"
                  name="telegramChannel"
                  value={formData.telegramChannel}
                  onChange={handleChange}
                  placeholder="@yangicha_uz"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block mb-1">Reklama bo'yicha admin</label>
                <input
                  type="text"
                  name="telegramAdmin"
                  value={formData.telegramAdmin}
                  onChange={handleChange}
                  placeholder="@yangicha_admin"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 shadow-lg shadow-purple-600/30 transition-all"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? "Sozlamalar Saqlandi!" : "Sozlamalarni Saqlash"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}

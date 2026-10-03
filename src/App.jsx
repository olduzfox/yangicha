import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import RoastXona from './components/RoastXona';
import ErkakchaShartnoma from './components/ErkakchaShartnoma';
import BahonaGenerator from './components/BahonaGenerator';
import QaynonaDetektor from './components/QaynonaDetektor';
import MonetizationBanner from './components/MonetizationBanner';
import PaymentModal from './components/PaymentModal';
import AdminModal from './components/AdminModal';
import Footer from './components/Footer';

const DEFAULT_CONFIG = {
  clickServiceId: '',
  clickMerchantId: '',
  paymeMerchantId: '',
  cardNumber: '8600 1234 5678 9012',
  cardOwner: 'YANGICHA MEDIA',
  telegramChannel: '@yangicha_uz',
  telegramAdmin: '@yangicha_admin',
  bannerActive: true,
};

export default function App() {
  const [activeTab, setActiveTab] = useState('roast'); // 'roast', 'shartnoma', 'bahona', 'moslik'
  const [paymentData, setPaymentData] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('yangicha_config');
      if (saved) {
        setConfig(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveConfig = (newConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('yangicha_config', JSON.stringify(newConfig));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenPayment = (data) => {
    setPaymentData(data);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-purple-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenPayment={handleOpenPayment}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Live Counters & Ads Bar */}
        <MonetizationBanner config={config} />

        {/* Tab Components */}
        {activeTab === 'roast' && (
          <RoastXona onOpenPayment={handleOpenPayment} />
        )}

        {activeTab === 'shartnoma' && (
          <ErkakchaShartnoma onOpenPayment={handleOpenPayment} />
        )}

        {activeTab === 'bahona' && (
          <BahonaGenerator onOpenPayment={handleOpenPayment} />
        )}

        {activeTab === 'moslik' && (
          <QaynonaDetektor onOpenPayment={handleOpenPayment} />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} config={config} />

      {/* Payment Checkout Modal (Click, Payme, Telegram Join) */}
      <PaymentModal
        isOpen={!!paymentData}
        onClose={() => setPaymentData(null)}
        data={paymentData}
        config={config}
      />

      {/* Admin Settings Modal for Domain Owner */}
      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}

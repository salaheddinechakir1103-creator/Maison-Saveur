import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider } from './context/CartContext';
import { ReservationProvider } from './context/ReservationContext';
import { Navbar } from './components/Navigation/Navbar';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/Cart/CartDrawer';
import { CinematicPreloader } from './components/Preloader/CinematicPreloader';
import { EventsSimulatorModal } from './components/Events/EventsSimulatorModal';
import { Currency } from './utils/currency';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { StoryPage } from './pages/StoryPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [currency, setCurrency] = useState<Currency>('MAD');
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  // Sync route with URL hash for easy sharing & deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'menu', 'story', 'gallery', 'reservation', 'contact', 'admin'].includes(hash)) {
        setActivePage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (page: string) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <ReservationProvider>
          {/* Cinematic Brand Intro Preloader */}
          {!isPreloaderDone && (
            <CinematicPreloader onComplete={() => setIsPreloaderDone(true)} />
          )}

          <div className="min-h-screen flex flex-col bg-[#0a0a0c] text-[#f7f4ee] font-sans">
            {/* Top Navigation */}
            <Navbar 
              activePage={activePage} 
              setActivePage={handlePageChange}
              currency={currency}
              setCurrency={setCurrency}
              onOpenEventsSimulator={() => setIsEventsModalOpen(true)}
            />

            {/* Main Content Router */}
            <main className="flex-1">
              {activePage === 'home' && <HomePage setActivePage={handlePageChange} />}
              {activePage === 'menu' && <MenuPage />}
              {activePage === 'story' && <StoryPage />}
              {activePage === 'gallery' && <GalleryPage />}
              {activePage === 'reservation' && <ReservationPage setActivePage={handlePageChange} />}
              {activePage === 'contact' && <ContactPage />}
              {activePage === 'admin' && <AdminDashboard setActivePage={handlePageChange} />}
            </main>

            {/* Cart Slide-Over Drawer */}
            <CartDrawer />

            {/* Global Events Simulator Modal */}
            <EventsSimulatorModal
              isOpen={isEventsModalOpen}
              onClose={() => setIsEventsModalOpen(false)}
            />

            {/* Luxury Footer */}
            <Footer setActivePage={handlePageChange} />
          </div>
        </ReservationProvider>
      </CartProvider>
    </LanguageProvider>
  );
}

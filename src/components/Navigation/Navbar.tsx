import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { Currency } from '../../utils/currency';
import { soundscape } from '../../utils/audioSoundscape';
import { 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  Globe, 
  ShieldCheck, 
  Volume2, 
  VolumeX,
  Coins
} from 'lucide-react';

interface Props {
  activePage: string;
  setActivePage: (page: string) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenEventsSimulator?: () => void;
}

export const Navbar: React.FC<Props> = ({ 
  activePage, 
  setActivePage,
  currency,
  setCurrency,
  onOpenEventsSimulator
}) => {
  const { t, language, setLanguage } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const navLinks = [
    { id: 'home', label: t('navHome') },
    { id: 'menu', label: t('navMenu') },
    { id: 'story', label: t('navStory') },
    { id: 'gallery', label: t('navGallery') },
    { id: 'reservation', label: t('navReservation') },
    { id: 'contact', label: t('navContact') }
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  const toggleAudio = () => {
    const next = soundscape.toggle();
    setIsAudioPlaying(next);
  };

  const cycleCurrency = () => {
    const list: Currency[] = ['MAD', 'EUR', 'USD'];
    const nextIdx = (list.indexOf(currency) + 1) % list.length;
    setCurrency(list[nextIdx]);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#0a0a0c]/90 backdrop-blur-md border-b border-[#d4af37]/20 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 xl:gap-6">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-[15px] sm:text-xl xl:text-2xl font-cinzel font-bold tracking-[0.08em] sm:tracking-widest text-[#fcfaf6] hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
          >
            MAISON SAVEUR
          </button>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs uppercase tracking-widest font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 py-1 transition-colors relative cursor-pointer ${
                  activePage === link.id
                    ? 'text-[#d4af37] font-semibold'
                    : 'text-[#e5e0d8]/80 hover:text-[#fcfaf6]'
                }`}
              >
                {link.label}
                {activePage === link.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#d4af37] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + Language, Currency, Sound, Cart & Admin utility */}
          <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
            
            {/* Currency Switcher */}
            <button
              onClick={cycleCurrency}
              className="px-2 py-1.5 text-xs text-[#d4af37] border border-[#d4af37]/30 rounded-lg hover:bg-[#d4af37]/10 transition-colors cursor-pointer font-semibold"
              title="Devise : MAD / EUR / USD"
            >
              {currency}
            </button>

            {/* Procedural Audio Ambient Soundscape Toggle */}
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isAudioPlaying 
                  ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#d4af37]' 
                  : 'bg-[#121217] border-white/10 text-[#a1a1aa] hover:text-white'
              }`}
              title={isAudioPlaying ? 'Couper l\'ambiance sonore' : 'Activer l\'ambiance sonore acoustique'}
              aria-label="Ambiance sonore"
            >
              {isAudioPlaying ? <Volume2 className="w-4 h-4 text-[#d4af37]" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Direct Admin Access Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg transition-colors cursor-pointer border ${
                activePage === 'admin'
                  ? 'bg-[#d4af37] text-[#0a0a0c] font-bold border-[#d4af37]'
                  : 'bg-[#14141c] text-[#d4af37] border-[#d4af37]/30 hover:bg-[#d4af37]/15'
              }`}
              title="Dashboard Admin / Espace Direction"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-wider text-[11px] hidden sm:inline">Admin</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#d4af37] border border-[#d4af37]/30 rounded-lg hover:bg-[#d4af37]/10 transition-colors cursor-pointer"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-wider">{language === 'fr' ? 'AR' : 'FR'}</span>
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#fcfaf6] hover:text-[#d4af37] transition-colors rounded-lg cursor-pointer"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#d4af37] text-[#0a0a0c] font-bold text-[10px] rounded-full flex items-center justify-center shadow-md">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Primary Action Button (Desktop) */}
            <button
              onClick={() => handleNavClick('reservation')}
              className="hidden md:inline-flex items-center px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0a0a0c] bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#c5a059] rounded-lg hover:shadow-lg hover:shadow-[#d4af37]/25 hover:brightness-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
            >
              {t('bookTable')}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-[#fcfaf6] hover:text-[#d4af37] transition-colors cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 z-40 bg-[#0a0a0c]/98 backdrop-blur-xl border-b border-[#d4af37]/20 flex flex-col p-6 animate-fadeIn">
          <nav className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-lg font-cinzel tracking-wider transition-colors py-2 border-b border-white/5 cursor-pointer ${
                  activePage === link.id ? 'text-[#d4af37] font-bold' : 'text-[#f7f4ee]'
                }`}
              >
                {link.label}
              </button>
            ))}

            {onOpenEventsSimulator && (
              <button
                onClick={() => { setMobileMenuOpen(false); onOpenEventsSimulator(); }}
                className="text-left text-sm font-semibold tracking-wider text-[#d4af37] py-2 flex items-center gap-2 border-b border-white/5 cursor-pointer"
              >
                <span>Privatisation & Salons VIP</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('admin')}
              className="text-left text-sm font-semibold tracking-wider text-[#d4af37] py-2 flex items-center gap-2 border-b border-white/5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Espace Direction (Dashboard Admin)</span>
            </button>
          </nav>
          
          <div className="mt-auto pt-6 flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('reservation')}
              className="w-full py-3.5 text-center text-xs font-semibold uppercase tracking-widest text-[#0a0a0c] bg-[#d4af37] rounded-xl cursor-pointer"
            >
              {t('bookTable')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};



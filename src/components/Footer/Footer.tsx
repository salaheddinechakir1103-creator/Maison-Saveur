import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, MapPin, Clock, Phone, Mail, Check, ShieldCheck } from 'lucide-react';

interface Props {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<Props> = ({ setActivePage }) => {
  const { t } = useLanguage();
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
        setNewsletterSubscribed(false);
      }, 3500);
    }
  };

  const navigateTo = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070709] border-t border-[#d4af37]/20 text-[#a1a1aa] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <span className="text-xl font-cinzel font-bold tracking-widest text-[#fcfaf6] block">
              MAISON SAVEUR
            </span>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              {t('tagline')}
            </p>
            <div className="pt-2 text-xs text-[#d4af37] space-y-1">
              <p>Marrakech · L'Hivernage</p>
              <p>Casablanca · Triangle d'Or</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#fcfaf6] font-semibold">
              Exploration
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  {t('navHome')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('menu')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  {t('navMenu')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('story')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  {t('navStory')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('gallery')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  {t('navGallery')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('reservation')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  {t('navReservation')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  {t('navContact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#fcfaf6] font-semibold">
              {t('hours')}
            </h4>
            <div className="space-y-2 text-xs text-[#d8d3c8]">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#fcfaf6] font-medium">{t('lunch')}</p>
                  <p className="text-[11px] text-[#a1a1aa]">Du Mardi au Dimanche</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#fcfaf6] font-medium">{t('dinner')}</p>
                  <p className="text-[11px] text-[#a1a1aa]">Chaque soir dès 19h30</p>
                </div>
              </div>
              <p className="text-[11px] text-[#a1a1aa] pt-2">
                {t('dressCodeDesc')}
              </p>
            </div>
          </div>

          {/* Newsletter / Circle Épicure */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#fcfaf6] font-semibold">
              Cercle des Épicuriens
            </h4>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Recevez les invitations privilégiées aux ouvertures des saisons de truffes et menus d'exception.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="votre.email@domaine.com"
                  required
                  className="w-full text-xs bg-[#121217] border border-white/10 rounded-xl px-3.5 py-2.5 text-[#f7f4ee] placeholder-white/20 focus:outline-none focus:border-[#d4af37]/50"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#1a1a24] hover:bg-[#d4af37] hover:text-[#0a0a0c] text-[#fcfaf6] font-semibold rounded-xl text-xs uppercase tracking-wider transition-all border border-[#d4af37]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {newsletterSubscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Invitation Enregistrée</span>
                  </>
                ) : (
                  <span>Rejoindre le Cercle</span>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <div>
            <p>© {new Date().getFullYear()} Maison Saveur. Tous droits réservés.</p>
            <p className="text-[11px] mt-0.5">{t('demoNotice')}</p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => navigateTo('admin')}
              className="text-[#d4af37]/80 hover:text-[#d4af37] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t('adminLink')}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  Car, 
  ShieldCheck, 
  MessageCircle 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSent(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSent(false);
    }, 4000);
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto min-h-screen space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
          Conciergerie & Relations Privées
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#fcfaf6]">
          Nous Contacter
        </h1>
        <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
          Pour vos privatisations de salons, dîners de gala ou demandes œnologiques personnalisées, notre équipe de direction se tient à votre entière disposition.
        </p>
      </div>

      {/* Grid: Contact Info + Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Contact Info & Addresses */}
        <div className="space-y-8">
          
          {/* Adresses */}
          <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <h3 className="text-sm uppercase tracking-widest text-[#d4af37] font-cinzel font-semibold">
              Nos Deux Écrins Gastronomiques
            </h3>

            <div className="space-y-5 text-xs text-[#d8d3c8]">
              <div className="flex items-start gap-3.5 pb-4 border-b border-white/5">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#fcfaf6]">Maison Saveur Marrakech</h4>
                  <p className="mt-1 text-[#a1a1aa]">{t('marrakechAddress')}</p>
                  <p className="text-[11px] text-[#d4af37] mt-0.5">Tél : +212 524 43 00 12 · Service Voiturier</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#fcfaf6]">Maison Saveur Casablanca</h4>
                  <p className="mt-1 text-[#a1a1aa]">{t('casablancaAddress')}</p>
                  <p className="text-[11px] text-[#d4af37] mt-0.5">Tél : +212 522 20 88 44 · Salon Cigares & Lounge</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Direct Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="https://wa.me/212661889900"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 bg-[#121217] hover:bg-[#1a1a24] border border-[#d4af37]/30 rounded-2xl flex items-center gap-3 transition-colors group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#a1a1aa] block">WhatsApp Concierge</span>
                <span className="text-xs font-bold text-[#fcfaf6] group-hover:text-[#d4af37] transition-colors">+212 661 88 99 00</span>
              </div>
            </a>

            <div className="p-5 bg-[#121217] border border-white/10 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#a1a1aa] block">E-mail Officiel</span>
                <span className="text-xs font-bold text-[#fcfaf6]">direction@maisonsaveur.ma</span>
              </div>
            </div>
          </div>

          {/* Dress code & Valet */}
          <div className="p-6 bg-[#0e0e13] border border-white/5 rounded-2xl flex items-start gap-4">
            <Car className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <h4 className="font-bold text-[#fcfaf6]">{t('dressCode')}</h4>
              <p className="text-[#a1a1aa] leading-relaxed">
                {t('dressCodeDesc')}
              </p>
            </div>
          </div>

        </div>

        {/* Inquiry Form */}
        <div className="bg-[#121217] border border-[#d4af37]/25 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <h3 className="text-lg font-cinzel font-bold text-[#fcfaf6] mb-6">
            Message Privé au Maître de Maison
          </h3>

          {isSent ? (
            <div className="py-16 text-center space-y-3 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif-luxury font-bold text-[#fcfaf6]">
                Message Transmis avec Succès
              </h4>
              <p className="text-xs text-[#a1a1aa]">
                Notre secrétariat de direction vous répondra sous 4 heures ouvrées.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-[#a1a1aa] mb-1.5">{t('fullName')} *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                  className="w-full text-xs sm:text-sm bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a1a1aa] mb-1.5">{t('email')} *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="votre.email@domaine.com"
                  className="w-full text-xs sm:text-sm bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a1a1aa] mb-1.5">Objet de la Demande</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Privatisation, événement, presse..."
                  className="w-full text-xs sm:text-sm bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#a1a1aa] mb-1.5">Message Détaillé *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Détaillez vos souhaits et le nombre approximatif d'invités..."
                  className="w-full text-xs bg-[#0a0a0e] border border-white/10 rounded-xl p-3 text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer la Demande</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};

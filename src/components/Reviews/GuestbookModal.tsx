import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ReviewItem } from '../../types';
import { X, Star, Sparkles, Send, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: ReviewItem) => void;
}

export const GuestbookModal: React.FC<Props> = ({ isOpen, onClose, onSubmitReview }) => {
  const { language } = useLanguage();

  const [author, setAuthor] = useState('');
  const [city, setCity] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-guest-${Date.now()}`,
      author: author.trim(),
      city: city.trim() || 'Marrakech',
      roleFr: 'Hôte Privilégié',
      roleAr: 'ضيف مميز',
      quoteFr: quote.trim(),
      quoteAr: quote.trim(),
      rating,
      source: 'Livre d\'Or Officiel'
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-[#121217] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
              Témoignage & Mémoire
            </span>
            <h2 className="text-2xl font-serif-luxury font-bold text-[#fcfaf6]">
              Signer le Livre d'Or
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-[#a1a1aa] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif-luxury font-bold text-white">
              Votre Témoignage a été Gravé
            </h3>
            <p className="text-xs text-[#a1a1aa]">
              Toute l'équipe de Maison Saveur vous remercie pour ces mots chaleureux.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Rating Stars */}
            <div>
              <label className="block text-[#a1a1aa] mb-2 font-medium">Votre Impression d'Ensemble</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-2xl transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-[#d4af37] fill-[#d4af37]' : 'text-white/20'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a1a1aa] mb-1 font-medium">Votre Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ex : Karim Bennani"
                  className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[#a1a1aa] mb-1 font-medium">Ville ou Pays</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex : Casablanca, Paris, Genève..."
                  className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1 font-medium">Votre Témoignage Épicurien *</label>
              <textarea
                rows={4}
                required
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Racontez votre expérience sensorielle, vos plats favoris ou l'accueil du service..."
                className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-[#a1a1aa] hover:text-white"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] font-bold uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Publier dans le Livre d'Or</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Sparkles, Send, Users, Wine, Music, Calendar } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EventsSimulatorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  const [eventType, setEventType] = useState<'affaires' | 'mariage' | 'gala'>('affaires');
  const [guestCount, setGuestCount] = useState<number>(30);
  const [salon, setSalon] = useState<'salon' | 'terrasse' | 'domaine'>('salon');
  const [formula, setFormula] = useState<'cocktail' | 'gala5' | 'degustation7'>('gala5');
  const [entertainment, setEntertainment] = useState<'luth' | 'cordes' | 'jazz'>('luth');
  const [wineAccord, setWineAccord] = useState<boolean>(true);

  if (!isOpen) return null;

  // Formula cost per guest (MAD)
  const formulaRates = {
    cocktail: 650,
    gala5: 950,
    degustation7: 1350
  };

  // Salon privatization fee (MAD)
  const salonFees = {
    salon: 8000,
    terrasse: 12000,
    domaine: 25000
  };

  // Entertainment fee (MAD)
  const musicFees = {
    luth: 4500,
    cordes: 7000,
    jazz: 6000
  };

  const wineAccordPerGuest = wineAccord ? 280 : 0;
  const foodTotal = guestCount * (formulaRates[formula] + wineAccordPerGuest);
  const estimatedTotalMad = foodTotal + salonFees[salon] + musicFees[entertainment];

  const handleSendWhatsAppQuote = () => {
    const text = `Bonjour Maison Saveur,\n\nJe souhaite obtenir un devis de privatisation d'exception :\n\n` +
      `• Type d'événement : ${eventType === 'affaires' ? "Dîner d'Affaires VIP" : eventType === 'mariage' ? "Fiançailles / Célébration d'Exception" : "Soirée de Gala"}\n` +
      `• Nombre de convives : ${guestCount} personnes\n` +
      `• Espace souhaité : ${salon === 'salon' ? "Le Grand Salon Impérial" : salon === 'terrasse' ? "La Terrasse Jardin & Fontaines" : "Privatisation Complète du Domaine"}\n` +
      `• Formule : ${formula === 'cocktail' ? "Cocktail Dînatoire 5 Temps (650 MAD/p)" : formula === 'gala5' ? "Dîner de Gala 5 Temps (950 MAD/p)" : "Menu Dégustation Royale 7 Temps (1350 MAD/p)"}\n` +
      `• Accords Élixirs & Grands Crus : ${wineAccord ? "Oui (+280 MAD/p)" : "Non"}\n` +
      `• Ambiance Musicale : ${entertainment === 'luth' ? "Luth & Oud Acoustique en Live" : entertainment === 'cordes' ? "Quatuor à Cordes Classique" : "Trio Jazz & Lounge"}\n\n` +
      `*Estimation indicative : ${estimatedTotalMad.toLocaleString()} MAD*\n\n` +
      `Merci de me contacter pour convenir d'une visite privée et ajuster les détails.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/212661889900?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-[#121217] border border-[#d4af37]/35 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
              Privatisations & Salons Particuliers
            </span>
            <h2 className="text-2xl font-serif-luxury font-bold text-[#fcfaf6] mt-0.5">
              Simulateur d'Événements d'Exception
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-5 text-xs text-[#d8d3c8]">
          
          {/* Event Type */}
          <div>
            <label className="block text-[#a1a1aa] mb-2 font-medium">Type d'Événement</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'affaires', label: 'Dîner d\'Affaires VIP' },
                { id: 'mariage', label: 'Fiançailles & Réceptions' },
                { id: 'gala', label: 'Soirée de Gala' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setEventType(item.id as any)}
                  className={`py-2.5 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                    eventType === item.id
                      ? 'bg-[#d4af37] text-[#0a0a0c] font-bold border-[#d4af37]'
                      : 'bg-[#0a0a0e] text-[#a1a1aa] border-white/10 hover:border-white/20'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Guest Count Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[#a1a1aa] font-medium flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Nombre d'Invités</span>
              </label>
              <span className="text-sm font-bold font-cinzel text-[#d4af37]">
                {guestCount} personnes
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={120}
              step={5}
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="w-full accent-[#d4af37] bg-white/10 h-1.5 rounded-lg cursor-pointer"
            />
          </div>

          {/* Salon Choice */}
          <div>
            <label className="block text-[#a1a1aa] mb-2 font-medium">Espace Réservé</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'salon', label: 'Salon Impérial (jusqu\'à 50p)' },
                { id: 'terrasse', label: 'Terrasse Jardin (jusqu\'à 80p)' },
                { id: 'domaine', label: 'Privatisation Totale (120p)' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSalon(item.id as any)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    salon === item.id
                      ? 'bg-[#d4af37]/20 text-[#fcfaf6] border-[#d4af37]'
                      : 'bg-[#0a0a0e] text-[#a1a1aa] border-white/10'
                  }`}
                >
                  <span className="font-semibold block">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Culinary Formula */}
          <div>
            <label className="block text-[#a1a1aa] mb-2 font-medium">Formule Gastronomique</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'cocktail', label: 'Cocktail Dînatoire', price: '650 MAD / pers.' },
                { id: 'gala5', label: 'Dîner de Gala (5 Temps)', price: '950 MAD / pers.' },
                { id: 'degustation7', label: 'Dégustation Royale (7 Temps)', price: '1 350 MAD / pers.' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormula(item.id as any)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    formula === item.id
                      ? 'bg-[#d4af37]/20 text-[#fcfaf6] border-[#d4af37]'
                      : 'bg-[#0a0a0e] text-[#a1a1aa] border-white/10'
                  }`}
                >
                  <span className="font-bold text-[#fcfaf6] block">{item.label}</span>
                  <span className="text-[11px] text-[#d4af37] block mt-0.5">{item.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Options Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-[#a1a1aa] mb-1.5 font-medium flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Intermède Musical</span>
              </label>
              <select
                value={entertainment}
                onChange={(e: any) => setEntertainment(e.target.value)}
                className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl p-2.5 text-xs text-white"
              >
                <option value="luth">Luth & Oud Acoustique en Live (+4 500 MAD)</option>
                <option value="cordes">Quatuor à Cordes Classique (+7 000 MAD)</option>
                <option value="jazz">Trio Jazz & Lounge Contemporain (+6 000 MAD)</option>
              </select>
            </div>

            <div>
              <label className="block text-[#a1a1aa] mb-1.5 font-medium flex items-center gap-1.5">
                <Wine className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Accords Élixirs & Grands Crus</span>
              </label>
              <button
                type="button"
                onClick={() => setWineAccord(!wineAccord)}
                className={`w-full p-2.5 rounded-xl border text-xs text-left transition-colors flex items-center justify-between cursor-pointer ${
                  wineAccord ? 'bg-[#d4af37]/15 border-[#d4af37] text-white' : 'bg-[#0a0a0e] border-white/10 text-[#a1a1aa]'
                }`}
              >
                <span>Accords mets & nectars (+280 MAD/p)</span>
                <span className="font-bold text-[#d4af37]">{wineAccord ? 'Inclus' : 'Non'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Total & Action Bar */}
        <div className="p-5 bg-[#0d0d12] border border-[#d4af37]/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#a1a1aa] block">
              Budget Prévisionnel Estimé (TTC)
            </span>
            <span className="text-2xl font-cinzel font-bold text-[#d4af37] tabular-nums">
              {estimatedTotalMad.toLocaleString()} MAD
            </span>
            <span className="text-[11px] text-[#71717a] block">
              Soit environ {Math.round(estimatedTotalMad / guestCount).toLocaleString()} MAD / convive
            </span>
          </div>

          <button
            onClick={handleSendWhatsAppQuote}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Transmettre la Demande au Concierge</span>
          </button>
        </div>

      </div>
    </div>
  );
};

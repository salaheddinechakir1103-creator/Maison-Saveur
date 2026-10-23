import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { useReservation } from '../context/ReservationContext';
import { DiningArea, Reservation } from '../types';
import { InteractiveFloorPlan, RestaurantTable } from '../components/Reservation/InteractiveFloorPlan';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  PhoneCall, 
  Copy, 
  Check,
  LayoutGrid
} from 'lucide-react';

interface Props {
  setActivePage?: (page: string) => void;
}

export const ReservationPage: React.FC<Props> = ({ setActivePage }) => {
  const { t, language } = useLanguage();
  const { addReservation, getAreaName } = useReservation();

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('20:30');
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState<DiningArea>('salon');
  const [selectedTableId, setSelectedTableId] = useState<string | null>('t-1');
  const [selectedTableName, setSelectedTableName] = useState<string>('Alcôve Royale (Table #1)');
  const [specialRequests, setSpecialRequests] = useState('');
  const [showFloorPlan, setShowFloorPlan] = useState(true);

  // Confirmation result
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const timeSlots = [
    { label: '12:30', service: 'Déjeuner' },
    { label: '13:00', service: 'Déjeuner' },
    { label: '13:30', service: 'Déjeuner' },
    { label: '19:30', service: 'Dîner' },
    { label: '20:00', service: 'Dîner' },
    { label: '20:30', service: 'Dîner' },
    { label: '21:00', service: 'Dîner' },
    { label: '21:30', service: 'Dîner' },
  ];

  const handleSelectTable = (table: RestaurantTable) => {
    setSelectedTableId(table.id);
    setSelectedTableName(`${table.nameFr} (Table #${table.number})`);
    setArea(table.area);
    if (table.capacity < guests) {
      setGuests(table.capacity);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    const notesWithTable = `${selectedTableName ? `[Table réservée : ${selectedTableName}] ` : ''}${specialRequests.trim()}`;

    const newRes = addReservation({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      date,
      time,
      guests,
      area,
      specialRequests: notesWithTable.trim() || undefined
    });

    setConfirmedReservation(newRes);

    // Launch celebratory gold confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#fcfaf6', '#c5a059']
      });
    } catch {
      // ignore
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyRef = () => {
    if (confirmedReservation) {
      navigator.clipboard.writeText(confirmedReservation.reference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="py-16 px-6 max-w-5xl mx-auto min-h-screen">
      
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
          Conciergerie Privée
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#fcfaf6]">
          {t('resTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
          {t('resSubtitle')}
        </p>
      </div>

      {confirmedReservation ? (
        /* Confirmed State Display */
        <div className="bg-[#121217] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl space-y-8 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] mx-auto flex items-center justify-center text-[#d4af37]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-cinzel block">
              Confirmation de Table
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#fcfaf6]">
              {t('bookingSuccessTitle')}
            </h2>
            <p className="text-xs text-[#d8d3c8]">
              Un e-mail récapitulatif a été transmis à <strong>{confirmedReservation.email}</strong>.
            </p>
          </div>

          {/* Reference Card */}
          <div className="p-6 bg-[#0a0a0e] border border-white/10 rounded-2xl space-y-4 text-left">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-xs text-[#a1a1aa]">{t('bookingRef')}</span>
              <div className="flex items-center gap-2">
                <span className="text-base font-cinzel font-bold text-[#d4af37] tracking-wider">
                  {confirmedReservation.reference}
                </span>
                <button
                  onClick={handleCopyRef}
                  className="p-1 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                  title="Copier la référence"
                >
                  {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[#71717a] block">Invité Principal</span>
                <span className="text-[#fcfaf6] font-medium">{confirmedReservation.name}</span>
              </div>
              <div>
                <span className="text-[#71717a] block">Téléphone</span>
                <span className="text-[#fcfaf6] font-medium">{confirmedReservation.phone}</span>
              </div>
              <div>
                <span className="text-[#71717a] block">Date & Heure</span>
                <span className="text-[#fcfaf6] font-medium">{confirmedReservation.date} à {confirmedReservation.time}</span>
              </div>
              <div>
                <span className="text-[#71717a] block">Convives & Espace</span>
                <span className="text-[#fcfaf6] font-medium">
                  {confirmedReservation.guests} pers. · {getAreaName(confirmedReservation.area, language)}
                </span>
              </div>
            </div>

            {confirmedReservation.specialRequests && (
              <div className="pt-2 text-xs border-t border-white/5">
                <span className="text-[#71717a] block">Demandes Particulières :</span>
                <span className="text-[#d8d3c8] italic">{confirmedReservation.specialRequests}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setConfirmedReservation(null)}
              className="px-6 py-3 bg-[#1a1a24] hover:bg-[#222230] text-[#fcfaf6] rounded-xl text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors cursor-pointer"
            >
              Effectuer une autre réservation
            </button>
            {setActivePage && (
              <button
                onClick={() => setActivePage('menu')}
                className="px-6 py-3 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
              >
                Découvrir la carte
              </button>
            )}
          </div>
        </div>
      ) : (
        /* The Booking Form */
        <div className="bg-[#121217] border border-[#d4af37]/25 rounded-3xl p-8 sm:p-12 shadow-2xl max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Section 1: Guest Info */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-widest text-[#d4af37] font-semibold border-b border-white/5 pb-2">
                01. Coordonnées de l'Hôte
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#a1a1aa] mb-1.5">{t('fullName')} *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="M. ou Mme ..."
                    className="w-full text-xs sm:text-sm bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a1a1aa] mb-1.5">{t('phone')} *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+212 6..."
                    className="w-full text-xs sm:text-sm bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#a1a1aa] mb-1.5">{t('email')} *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@exemple.com"
                  className="w-full text-xs sm:text-sm bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Section 2: Table & Time Details */}
            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-widest text-[#d4af37] font-semibold border-b border-white/5 pb-2">
                02. Date, Heure & Convives
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#a1a1aa] mb-1.5">{t('date')} *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-[#0a0a0e] border border-white/10 rounded-xl px-4 py-3 text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#a1a1aa] mb-1.5">{t('guestsCount')} *</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 4, 6, 8].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`flex-1 py-3 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                          guests === num
                            ? 'bg-[#d4af37] text-[#0a0a0c] border-[#d4af37]'
                            : 'bg-[#0a0a0e] text-[#a1a1aa] border-white/10 hover:border-white/20'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs text-[#a1a1aa] mb-2">{t('time')} *</label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.label}
                      type="button"
                      onClick={() => setTime(slot.label)}
                      className={`py-2 px-1 text-xs font-medium rounded-lg text-center transition-all cursor-pointer ${
                        time === slot.label
                          ? 'bg-[#d4af37] text-[#0a0a0c] font-bold shadow'
                          : 'bg-[#0a0a0e] text-[#a1a1aa] hover:text-white border border-white/5'
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Table Selection & Floor Plan */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-2">
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>03. Plan de Salle & Choix de Table Interactif</span>
                    </label>
                    <p className="text-[11px] text-[#a1a1aa] mt-0.5">
                      Sélectionnez votre table d'exception directement sur le plan de Maison Saveur.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowFloorPlan(!showFloorPlan)}
                    className="text-xs text-[#d4af37] hover:underline"
                  >
                    {showFloorPlan ? 'Masquer le plan' : 'Afficher le plan'}
                  </button>
                </div>

                {showFloorPlan && (
                  <div className="pt-2">
                    <InteractiveFloorPlan
                      selectedTableId={selectedTableId}
                      onSelectTable={handleSelectTable}
                    />
                  </div>
                )}
              </div>

              {/* Area Preferences */}
              <div className="pt-2">
                <label className="block text-xs text-[#a1a1aa] mb-2">{t('areaPreference')}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'salon', label: t('areaSalon') },
                    { id: 'terrasse', label: t('areaTerrasse') },
                    { id: 'chef', label: t('areaChef') }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setArea(item.id as DiningArea)}
                      className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer ${
                        area === item.id
                          ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#fcfaf6]'
                          : 'bg-[#0a0a0e] border-white/10 text-[#a1a1aa] hover:border-white/20'
                      }`}
                    >
                      <span className="text-xs font-semibold block">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary notes */}
              <div>
                <label className="block text-xs text-[#a1a1aa] mb-1.5">{t('specialNotes')}</label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Ex : Anniversaire de mariage, convive intolérant aux crustacés..."
                  className="w-full text-xs bg-[#0a0a0e] border border-white/10 rounded-xl p-3 text-[#f7f4ee] placeholder-white/20 focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-white/10">
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#c5a059] text-[#0a0a0c] font-bold text-xs uppercase tracking-widest rounded-xl hover:shadow-xl hover:shadow-[#d4af37]/25 transition-all cursor-pointer"
              >
                {t('confirmBooking')}
              </button>
              <p className="text-[11px] text-center text-[#71717a] mt-3">
                Confirmation instantanée. Données enregistrées dans votre espace de démonstration.
              </p>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Printer, QrCode, Sparkles, Wifi } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableQrModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-[#121217] border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Card Area with ID for print CSS */}
        <div id="printable-qr-card" className="p-8 bg-[#0d0d11] border-2 border-[#d4af37]/40 rounded-2xl text-center space-y-6">
          
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
              Haute Gastronomie & Café
            </span>
            <h2 className="text-2xl font-cinzel font-bold text-[#fcfaf6] mt-1 tracking-wider">
              MAISON SAVEUR
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-1">
              Marrakech · Casablanca
            </p>
          </div>

          {/* Luxury QR Representation SVG */}
          <div className="p-4 bg-white rounded-xl mx-auto w-48 h-48 flex items-center justify-center shadow-lg border border-[#d4af37]/30">
            <svg viewBox="0 0 100 100" className="w-40 h-40">
              {/* Corner position markers */}
              <rect x="5" y="5" width="25" height="25" fill="#0a0a0c" rx="4" />
              <rect x="9" y="9" width="17" height="17" fill="white" rx="2" />
              <rect x="13" y="13" width="9" height="9" fill="#d4af37" rx="1" />

              <rect x="70" y="5" width="25" height="25" fill="#0a0a0c" rx="4" />
              <rect x="74" y="9" width="17" height="17" fill="white" rx="2" />
              <rect x="78" y="13" width="9" height="9" fill="#d4af37" rx="1" />

              <rect x="5" y="70" width="25" height="25" fill="#0a0a0c" rx="4" />
              <rect x="9" y="74" width="17" height="17" fill="white" rx="2" />
              <rect x="13" y="78" width="9" height="9" fill="#d4af37" rx="1" />

              {/* Data matrix pattern */}
              <rect x="35" y="10" width="5" height="15" fill="#121217" />
              <rect x="45" y="5" width="8" height="5" fill="#121217" />
              <rect x="58" y="12" width="6" height="10" fill="#121217" />
              <rect x="35" y="35" width="30" height="30" fill="#0a0a0c" rx="3" />
              <rect x="40" y="40" width="20" height="20" fill="white" />
              <text x="50" y="54" fontSize="12" fill="#d4af37" textAnchor="middle" fontWeight="bold" fontFamily="Cinzel">MS</text>
              
              <rect x="10" y="38" width="8" height="8" fill="#121217" />
              <rect x="22" y="45" width="6" height="12" fill="#121217" />
              <rect x="72" y="38" width="15" height="6" fill="#121217" />
              <rect x="80" y="48" width="8" height="12" fill="#121217" />
              <rect x="38" y="75" width="14" height="6" fill="#121217" />
              <rect x="58" y="72" width="8" height="16" fill="#121217" />
              <rect x="75" y="75" width="15" height="15" fill="#121217" />
            </svg>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-semibold text-[#fcfaf6] uppercase tracking-wider">
              {language === 'ar' ? 'امسح الرمز للاطلاع على القائمة والأسعار' : 'Scannez pour découvrir la carte & les millésimes'}
            </p>
            <div className="flex items-center justify-center gap-2 text-[11px] text-[#a1a1aa] pt-2">
              <Wifi className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Wi-Fi Invités : <strong>MaisonSaveur-Guest</strong></span>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
          >
            Fermer
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer le Chevalet</span>
          </button>
        </div>

      </div>
    </div>
  );
};

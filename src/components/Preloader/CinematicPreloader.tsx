import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export const CinematicPreloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeProgress, setFadeProgress] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeProgress(1);
    }, 1200);

    const timer2 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 1700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] transition-opacity duration-700 pointer-events-none"
      style={{ opacity: fadeProgress === 1 ? 0 : 1 }}
    >
      <div className="text-center space-y-4 px-6">
        <div className="w-14 h-14 rounded-full border border-[#d4af37] mx-auto flex items-center justify-center text-[#d4af37] shadow-lg shadow-[#d4af37]/20">
          <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-cinzel block">
            Haute Gastronomie
          </span>
          <h1 className="text-3xl sm:text-4xl font-cinzel font-bold text-[#fcfaf6] tracking-widest">
            MAISON SAVEUR
          </h1>
          <p className="text-xs text-[#a1a1aa] font-serif-luxury italic tracking-wide">
            "L'Art du Goût" · Marrakech & Casablanca
          </p>
        </div>

        {/* Minimalist hairline load bar */}
        <div className="w-48 h-[2px] bg-white/10 mx-auto rounded-full overflow-hidden mt-6">
          <div className="h-full bg-[#d4af37] animate-[pulse_1.5s_ease-in-out_infinite] w-full" />
        </div>
      </div>
    </div>
  );
};

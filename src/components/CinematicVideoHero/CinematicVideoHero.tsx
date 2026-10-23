import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Play, 
  Pause, 
  Maximize2, 
  Volume2, 
  VolumeX, 
  Film, 
  Box, 
  Info, 
  Sparkles,
  ArrowRight,
  Calendar
} from 'lucide-react';

interface Props {
  onExploreMenu: () => void;
  onBookTable: () => void;
  mode: 'film' | 'three';
  onToggleMode: (mode: 'film' | 'three') => void;
  onOpenStoryboard: () => void;
}

export const CinematicVideoHero: React.FC<Props> = ({
  onExploreMenu,
  onBookTable,
  mode,
  onToggleMode,
  onOpenStoryboard
}) => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => {
        setIsPlaying(false);
      });
    };

    const handleError = () => {
      console.warn("Hero video loading notice; fallback to poster.");
      setHasError(true);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      video.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="relative w-full h-[94vh] min-h-[660px] flex items-center justify-center overflow-hidden bg-[#07070a]">
      
      {/* Actual MP4 Moving Cinematic 3D Video Asset */}
      <video
        ref={videoRef}
        src="/videos/hero.mp4"
        poster="/src/assets/images/dish_truffle_gastronomy_1792754320242.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{
          filter: 'contrast(1.06) brightness(0.92) saturate(1.1)'
        }}
      />

      {/* Cinematic Vignette Overlays & Atmospheric Lighting Gradient */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/25 to-black/60 pointer-events-none" />

      {/* Mode Switcher HUD (Top Right) */}
      <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-[#0a0a0e]/85 backdrop-blur-md p-1 rounded-xl border border-[#d4af37]/30 shadow-2xl">
          <button
            onClick={() => onToggleMode('film')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'film' 
                ? 'bg-[#d4af37] text-[#0a0a0c] shadow-md' 
                : 'text-[#a1a1aa] hover:text-white'
            }`}
            title="Film Cinématique 3D 1080p"
          >
            <Film className="w-3.5 h-3.5" />
            <span>Film 3D</span>
          </button>
          
          <button
            onClick={() => onToggleMode('three')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              mode === 'three' 
                ? 'bg-[#d4af37] text-[#0a0a0c] shadow-md' 
                : 'text-[#a1a1aa] hover:text-white'
            }`}
            title="Scène 3D Interactive WebGL"
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Interactif</span>
          </button>
        </div>

        <button
          onClick={onOpenStoryboard}
          className="p-2 bg-[#0a0a0e]/85 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 rounded-xl hover:bg-[#d4af37]/20 transition-colors cursor-pointer"
          title="Consulter le Storyboard du Film & Prompts de Production"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Floating Editorial Narrative (Left/Top) */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full h-full flex flex-col justify-between py-12 pointer-events-none">
        
        {/* Top Kicker */}
        <div className="max-w-xl pointer-events-auto mt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-[10px] uppercase tracking-[0.25em] font-cinzel mb-3">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
            <span>Film Commercial 3D Haute Définition</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-[#fcfaf6] leading-[1.08] text-balance">
            {t('heroTitleLine1')} <br />
            <span className="italic font-light text-[#d4af37]">{t('heroTitleLine2')}</span>
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#d8d3c8]/90 max-w-md leading-relaxed hidden sm:block">
            {t('heroSubtitle')}
          </p>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={onExploreMenu}
              className="px-6 py-3 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#d4af37]/30 flex items-center gap-2 cursor-pointer"
            >
              <span>{t('discoverMenu')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onBookTable}
              className="px-6 py-3 bg-black/50 hover:bg-black/70 text-[#fcfaf6] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{t('bookTable')}</span>
            </button>
          </div>
        </div>

        {/* Bottom Discreet Film Timeline & Control Dock */}
        <div className="pointer-events-auto flex flex-col gap-2">
          
          {/* Timeline hairline */}
          <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#fcfaf6] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between text-xs text-[#a1a1aa] pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1.5 hover:text-white transition-colors cursor-pointer"
                title={isPlaying ? 'Pause' : 'Lecture'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-[#d4af37]" /> : <Play className="w-4 h-4 text-[#d4af37]" />}
              </button>

              <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-cinzel hidden sm:inline">
                Séquence 3D Cinématique · 5 Plans Clés
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] text-[#71717a] hidden md:inline">
                Résolution Source : 1920×1080 Full HD · Rendu 60fps
              </span>

              <button
                onClick={toggleFullscreen}
                className="p-1.5 hover:text-white transition-colors cursor-pointer"
                title="Plein écran"
              >
                <Maximize2 className="w-4 h-4 text-[#a1a1aa] hover:text-[#d4af37]" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

import fixedImage0 from '../assets/images/chef_culinary_portrait_1792754319896.jpg';
import fixedImage1 from '../assets/images/hero_culinary_restaurant_1792754318347.jpg';
import fixedImage2 from '../assets/images/restaurant_terrace_morocco_1792754319947.jpg';
import fixedImage3 from '../assets/images/specialty_coffee_cafe_1792755657913.jpg';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CulinaryPlateScene } from '../components/ThreeCanvas/CulinaryPlateScene';
import { CinematicVideoHero } from '../components/CinematicVideoHero/CinematicVideoHero';
import { StoryboardModal } from '../components/CinematicVideoHero/StoryboardModal';
import { INITIAL_MENU_ITEMS, REVIEWS } from '../data/menuData';
import { MenuItem, ReviewItem } from '../types';
import { DishModal } from '../components/Menu/DishModal';
import { GuestbookModal } from '../components/Reviews/GuestbookModal';
import { EventsSimulatorModal } from '../components/Events/EventsSimulatorModal';
import { useCart } from '../context/CartContext';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Star, 
  Award, 
  Clock, 
  UtensilsCrossed, 
  Plus, 
  Check,
  Film,
  Box
} from 'lucide-react';

interface Props {
  setActivePage: (page: string) => void;
}

export const HomePage: React.FC<Props> = ({ setActivePage }) => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [addedDishId, setAddedDishId] = useState<string | null>(null);

  // Hero Mode: 'film' (Real 1080p Cinematic 3D Video) or 'three' (Interactive WebGL Plate)
  const [heroMode, setHeroMode] = useState<'film' | 'three'>('film');
  const [isStoryboardOpen, setIsStoryboardOpen] = useState(false);

  // Guestbook & Events simulator modals
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const [isEventsSimulatorOpen, setIsEventsSimulatorOpen] = useState(false);

  // Reviews state with LocalStorage persistence
  const [allReviews, setAllReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_saveur_guestbook');
      return saved ? JSON.parse(saved) : REVIEWS;
    } catch {
      return REVIEWS;
    }
  });

  const handleNewReview = (rev: ReviewItem) => {
    const updated = [rev, ...allReviews];
    setAllReviews(updated);
    try {
      localStorage.setItem('maison_saveur_guestbook', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Take top 3 signatures for preview
  const signatureDishes = INITIAL_MENU_ITEMS.filter(d => d.isChefSpecial).slice(0, 3);

  const handleQuickAdd = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    addItem(dish);
    setAddedDishId(dish.id);
    setTimeout(() => setAddedDishId(null), 1500);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION: Dual Cinematic Video & Interactive 3D Experience
      ========================================================================= */}
      {heroMode === 'film' ? (
        <CinematicVideoHero
          mode="film"
          onToggleMode={setHeroMode}
          onExploreMenu={() => setActivePage('menu')}
          onBookTable={() => setActivePage('reservation')}
          onOpenStoryboard={() => setIsStoryboardOpen(true)}
        />
      ) : (
        <section className="relative w-full h-[100svh] min-h-[560px] sm:h-[94vh] sm:min-h-[660px] flex items-center justify-center overflow-hidden bg-radial from-[#15151c] via-[#0a0a0c] to-[#060608]">
          {/* Mode Switcher HUD (Top Right) */}
          <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
            <div className="flex items-center gap-1 bg-[#0a0a0e]/85 backdrop-blur-md p-1 rounded-xl border border-[#d4af37]/30 shadow-2xl">
              <button
                onClick={() => setHeroMode('film')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] hover:text-white transition-all cursor-pointer"
                title="Passer au Film Cinématique 3D"
              >
                <Film className="w-3.5 h-3.5" />
                <span>Film 3D</span>
              </button>
              
              <button
                onClick={() => setHeroMode('three')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider bg-[#d4af37] text-[#0a0a0c] shadow-md transition-all cursor-pointer"
                title="Scène 3D Interactive WebGL active"
              >
                <Box className="w-3.5 h-3.5" />
                <span>3D Interactif</span>
              </button>
            </div>

            <button
              onClick={() => setIsStoryboardOpen(true)}
              className="p-2 bg-[#0a0a0e]/85 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 rounded-xl hover:bg-[#d4af37]/20 transition-colors cursor-pointer"
              title="Consulter le Storyboard du Film & Prompts de Production"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>

          {/* Central 3D Gourmet Culinary Canvas */}
          <div className="absolute inset-0 z-0">
            <CulinaryPlateScene />
          </div>

          {/* Cinematic Vignette Overlays */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0a0a0c] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent pointer-events-none" />

          {/* Floating Editorial Narrative (Left/Top) */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full h-full flex flex-col justify-between py-8 sm:py-12 pointer-events-none">
            <div className="max-w-xl pointer-events-auto mt-6">
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#d4af37] font-cinzel block mb-2">
                {t('heroPreTitle')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-[#fcfaf6] leading-[1.08] text-balance">
                {t('heroTitleLine1')} <br />
                <span className="italic font-light text-[#d4af37]">{t('heroTitleLine2')}</span>
              </h1>
              <p className="mt-4 text-xs sm:text-sm text-[#d8d3c8]/85 max-w-md leading-relaxed hidden sm:block">
                {t('heroSubtitle')}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => setActivePage('menu')}
                  className="px-6 py-3 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-[#d4af37]/30 flex items-center gap-2 cursor-pointer"
                >
                  <span>{t('discoverMenu')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('reservation')}
                  className="px-6 py-3 bg-black/40 hover:bg-black/60 text-[#fcfaf6] border border-[#d4af37]/40 hover:border-[#d4af37] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{t('bookTable')}</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#a1a1aa] pointer-events-auto border-t border-white/5 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#d4af37]" />
                  <span className="tracking-wide">Prix de l'Excellence Culinaire 2026</span>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <UtensilsCrossed className="w-4 h-4 text-[#d4af37]" />
                  <span>Terroirs du Maroc & Haute École Française</span>
                </div>
              </div>
              
              <span className="text-[11px] text-[#d4af37] font-cinzel">
                Service Voiturier & Conciergerie Privée
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Storyboard Modal */}
      <StoryboardModal
        isOpen={isStoryboardOpen}
        onClose={() => setIsStoryboardOpen(false)}
      />

      {/* =========================================================================
          CHAPTER 01: SIGNATURE DISHES (Featured Collection)
      ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#d4af37]/20">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block mb-2">
              01. Chapitre Premier
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#fcfaf6]">
              {t('signaturesTitle')}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#a1a1aa] max-w-xl">
              {t('signaturesSubtitle')}
            </p>
          </div>

          <button
            onClick={() => setActivePage('menu')}
            className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] hover:text-[#fcfaf6] flex items-center gap-2 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>Voir toute la carte ({INITIAL_MENU_ITEMS.length} créations)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Column Luxury Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {signatureDishes.map((dish) => {
            const name = language === 'ar' ? dish.nameAr : dish.nameFr;
            const desc = language === 'ar' ? dish.descriptionAr : dish.descriptionFr;
            const isAdded = addedDishId === dish.id;

            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="group bg-[#101015] border border-white/10 hover:border-[#d4af37]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d4af37]/10 flex flex-col cursor-pointer"
              >
                {/* 65-75% Card Image */}
                <div className="relative h-64 overflow-hidden bg-[#181820]">
                  <img
                    src={dish.image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101015] via-transparent to-transparent opacity-80" />
                  
                  {dish.isChefSpecial && (
                    <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#0a0a0c]/80 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-cinzel font-bold uppercase tracking-wider rounded-lg">
                      Signature
                    </div>
                  )}

                  <div className="absolute bottom-3 right-4">
                    <span className="text-base font-cinzel font-bold text-[#d4af37] tabular-nums">
                      {dish.priceMad.toLocaleString()} {t('currency')}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-serif-luxury font-bold text-[#fcfaf6] group-hover:text-[#d4af37] transition-colors leading-snug">
                      {name}
                    </h3>
                    <p className="mt-2 text-xs text-[#a1a1aa] line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-[#d4af37] underline underline-offset-4 group-hover:text-[#fcfaf6] transition-colors">
                      {t('viewDetails')}
                    </span>
                    
                    <button
                      onClick={(e) => handleQuickAdd(e, dish)}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#1a1a24] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0a0a0c]'
                      }`}
                      title={t('addToCart')}
                    >
                      {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 02: THE CHEF & FRANCO-MOROCCAN HARMONY
      ========================================================================= */}
      <section className="py-24 bg-[#0d0d12] border-y border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Chef High-Res Editorial Photography */}
          <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl group">
            <img
              src={fixedImage0}
              alt="Chef Amine Benjelloun au passe de dressage"
              className="w-full h-[480px] lg:h-[560px] object-cover transition-transform duration-700 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-transparent to-transparent opacity-60" />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0a0a0e]/90 backdrop-blur-md rounded-xl border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-cinzel block">
                Chef Exécutif & Fondateur
              </span>
              <p className="text-sm font-semibold text-[#fcfaf6]">
                Amine Benjelloun · Ancien de la Maison Troisgros & Ducasse
              </p>
            </div>
          </div>

          {/* Story Narrative */}
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
              02. L'Âme du Goût
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#fcfaf6] leading-tight">
              {t('chefStoryTitle')}
            </h2>
            
            <p className="text-sm text-[#d8d3c8] leading-relaxed">
              {t('chefStoryBody1')}
            </p>

            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Dans notre atelier culinaire, la haute tradition française des réductions de fonds, des émulsions précises et des cuissons sous vide rencontre la puissance des arômes méditerranéens : pistaches d'Al-Haouz torréfiées sur place, huile d'argan pressée à froid au sud d'Essaouira et eau de fleur d'oranger distillée à Fès.
            </p>

            {/* Editorial Quote Box */}
            <div className="p-6 bg-[#14141c] border-l-2 border-[#d4af37] rounded-r-xl space-y-2">
              <p className="text-base italic font-serif-luxury text-[#fcfaf6]">
                "Cuisiner, c'est offrir une émotion pure où chaque convive oublie le temps."
              </p>
              <span className="text-xs text-[#d4af37] block font-cinzel">
                — Amine Benjelloun
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActivePage('story')}
                className="px-6 py-3 bg-transparent hover:bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/40 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Découvrir l'histoire complète</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CHAPTER 03: THE SETTING & ATMOSPHERE (Marrakech Terrace & Imperial Salons)
      ========================================================================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block mb-2">
            03. Les Espaces & Les Salons
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#fcfaf6]">
            {t('atmosphereTitle')}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#a1a1aa]">
            {t('atmosphereSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imperial Salon Card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 group h-96 lg:h-[420px]">
            <img
              src={fixedImage1}
              alt="Salon Impérial Maison Saveur"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="text-[11px] font-cinzel uppercase tracking-widest text-[#d4af37]">
                Intérieur Feutré
              </span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white">
                Le Grand Salon Impérial
              </h3>
              <p className="text-xs text-[#d8d3c8] max-w-md">
                Lustres en cristal champagne, boiseries en cèdre sculpté et banquettes de velours pour un dîner inoubliable en toute intimité.
              </p>
            </div>
          </div>

          {/* Garden Terrace Card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 group h-96 lg:h-[420px]">
            <img
              src={fixedImage2}
              alt="Terrasse Jardin sous les lanternes"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 space-y-2">
              <span className="text-[11px] font-cinzel uppercase tracking-widest text-[#d4af37]">
                Plein Air Féérique
              </span>
              <h3 className="text-2xl font-serif-luxury font-bold text-white">
                La Terrasse Jardin & Fontaines
              </h3>
              <p className="text-xs text-[#d8d3c8] max-w-md">
                Dînez sous les étoiles et la lueur tamisée de lanternes d'artisans au milieu des orangers et palmiers de l'Hivernage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 03.5: LE CAFÉ D'EXCEPTION & HAUTE PÂTISSERIE
      ========================================================================= */}
      <section className="py-20 bg-[#0e0e14] border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
              L'Art du Café & Salon de Thé
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#fcfaf6]">
              Cafés de Spécialité & Douceurs d'Auteur
            </h2>
            <p className="text-sm text-[#d8d3c8] leading-relaxed">
              Dès 09h00, Maison Saveur ouvre les portes de son salon de café. Nos maîtres baristas extraient à la commande des micro-lots de café de terroir (Éthiopie Yirgacheffe, Colombie Geisha) infusés au siphon en laiton ou espresso sur mesure, accompagnés de créations de notre chef pâtissière.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setActivePage('menu')}
                className="px-6 py-3 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] font-semibold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Découvrir la Pâtisserie & Cafés
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl group">
            <img
              src={fixedImage3}
              alt="Salon de Café de Spécialité Maison Saveur"
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-cinzel">
                Barista & Extraction Lente
              </span>
              <p className="text-sm font-semibold text-white">Service au comptoir de marbre de 09h00 à 18h00</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 04: GASTRONOMIC REVIEWS & CRITIQUES (With Guestbook Modal)
      ========================================================================= */}
      <section className="py-24 bg-[#0a0a0e] border-t border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/5">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block mb-2">
                04. Le Livre d'Or
              </span>
              <h2 className="text-3xl font-serif-luxury font-bold text-[#fcfaf6]">
                Ce Que Disent les Épicuriens
              </h2>
            </div>

            <button
              onClick={() => setIsGuestbookOpen(true)}
              className="px-5 py-2.5 bg-[#14141c] hover:bg-[#d4af37] hover:text-[#0a0a0c] text-[#d4af37] border border-[#d4af37]/40 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all self-start md:self-auto cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signer le Livre d'Or</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allReviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-[#121217] border border-white/10 rounded-2xl p-8 flex flex-col justify-between space-y-6 hover:border-[#d4af37]/40 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1 text-[#d4af37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm font-serif-luxury italic text-[#e5e0d8] leading-relaxed">
                    "{language === 'ar' ? rev.quoteAr : rev.quoteFr}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h4 className="text-xs font-bold text-[#fcfaf6]">{rev.author}</h4>
                  <p className="text-[11px] text-[#a1a1aa] mt-0.5">{language === 'ar' ? rev.roleAr : rev.roleFr}</p>
                  <span className="text-[10px] text-[#d4af37] font-cinzel tracking-wider block mt-1">
                    {rev.source} · {rev.city}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 05: RESERVATION BANNER & PRIVATISATION SIMULATOR
      ========================================================================= */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-8">
        <div className="bg-gradient-to-r from-[#171720] via-[#1a1a24] to-[#121218] border border-[#d4af37]/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-12 h-12 rounded-full border border-[#d4af37] mx-auto flex items-center justify-center text-[#d4af37]">
            <Sparkles className="w-5 h-5" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-[#fcfaf6]">
            Votre Table Vous Attend
          </h2>

          <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-lg mx-auto">
            Réservation recommandée 48 heures à l'avance pour les dîners du week-end et le service privé de la Table du Chef.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActivePage('reservation')}
              className="px-8 py-3.5 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl hover:shadow-[#d4af37]/30 cursor-pointer"
            >
              Réserver Maintenant
            </button>
            <button
              onClick={() => setIsEventsSimulatorOpen(true)}
              className="px-8 py-3.5 bg-white/5 hover:bg-white/10 text-[#d4af37] border border-[#d4af37]/40 font-semibold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Privatisation & Salons VIP</span>
            </button>
          </div>
        </div>
      </section>

      {/* Dish Detail Modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />

      {/* Guestbook Modal */}
      <GuestbookModal
        isOpen={isGuestbookOpen}
        onClose={() => setIsGuestbookOpen(false)}
        onSubmitReview={handleNewReview}
      />

      {/* VIP Events Simulator Modal */}
      <EventsSimulatorModal
        isOpen={isEventsSimulatorOpen}
        onClose={() => setIsEventsSimulatorOpen(false)}
      />
    </div>
  );
};

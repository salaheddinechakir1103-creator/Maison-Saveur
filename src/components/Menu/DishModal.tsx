import React from 'react';
import { MenuItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { X, Sparkles, Plus, Check, Wine, AlertCircle, Flame } from 'lucide-react';

interface Props {
  dish: MenuItem | null;
  onClose: () => void;
}

export const DishModal: React.FC<Props> = ({ dish, onClose }) => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = React.useState(false);

  if (!dish) return null;

  const handleAddToCart = () => {
    addItem(dish);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const name = language === 'ar' ? dish.nameAr : dish.nameFr;
  const description = language === 'ar' ? dish.descriptionAr : dish.descriptionFr;
  const ingredients = language === 'ar' ? dish.ingredientsAr : dish.ingredientsFr;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#121217] border border-[#d4af37]/30 rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dish Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={dish.image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-[#121217]/20 to-transparent" />
          
          {dish.isChefSpecial && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#d4af37] text-[#0a0a0c] font-cinzel text-xs font-bold uppercase tracking-wider rounded-lg shadow-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('chefSpecial')}</span>
            </div>
          )}

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#fcfaf6] leading-tight">
              {name}
            </h3>
            <span className="text-xl sm:text-2xl font-cinzel font-bold text-[#d4af37] shrink-0 ml-4 tabular-nums">
              {dish.priceMad.toLocaleString()} {t('currency')}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Description */}
          <p className="text-sm sm:text-base text-[#e5e0d8]/90 leading-relaxed font-normal">
            {description}
          </p>

          {/* Ingredients list */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-2.5">
              Composition & Noblesse des Produits
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-[#a1a1aa]">
              {ingredients.map((ing, i) => (
                <span key={i} className="px-3 py-1 bg-[#1a1a24] rounded-lg border border-white/5">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Wine / Elixir Pairing */}
          {dish.winePairing && (
            <div className="p-4 bg-[#181822] border border-[#d4af37]/20 rounded-xl flex items-start gap-3">
              <Wine className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block">
                  Accord Épicurien Suggéré
                </span>
                <p className="text-xs text-[#d8d3c8] mt-0.5">
                  {dish.winePairing}
                </p>
              </div>
            </div>
          )}

          {/* Allergens & Calories */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-[#a1a1aa] pt-2 border-t border-white/5">
            {dish.allergens && dish.allergens.length > 0 && (
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Allergènes : {dish.allergens.join(', ')}</span>
              </div>
            )}
            {dish.calories && (
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#d4af37]" />
                <span>{dish.calories} kcal</span>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            >
              Fermer
            </button>
            <button
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-[#e6ca65] via-[#d4af37] to-[#c5a059] text-[#0a0a0c] hover:shadow-lg hover:shadow-[#d4af37]/30'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t('addedToCart')}</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>{t('addToCart')}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

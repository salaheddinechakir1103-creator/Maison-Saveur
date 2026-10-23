import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { INITIAL_MENU_ITEMS } from '../data/menuData';
import { MenuItem, MenuCategory } from '../types';
import { DishModal } from '../components/Menu/DishModal';
import { PrintableQrModal } from '../components/Menu/PrintableQrModal';
import { 
  Search, 
  QrCode, 
  Sparkles, 
  Plus, 
  Check, 
  Eye, 
  SlidersHorizontal 
} from 'lucide-react';

export const MenuPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { addItem } = useCart();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [addedDishId, setAddedDishId] = useState<string | null>(null);

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: t('allCategories') },
    { id: 'entrees', label: t('catEntrees') },
    { id: 'plats', label: t('catPlats') },
    { id: 'patisserie', label: t('catPatisserie') },
    { id: 'boissons', label: t('catBoissons') },
    { id: 'degustation', label: t('catDegustation') }
  ];

  const filteredDishes = useMemo(() => {
    return INITIAL_MENU_ITEMS.filter((dish) => {
      // Category filter
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesFr = dish.nameFr.toLowerCase().includes(query) || 
                          dish.descriptionFr.toLowerCase().includes(query) ||
                          dish.ingredientsFr.some(i => i.toLowerCase().includes(query));
        const matchesAr = dish.nameAr.toLowerCase().includes(query) || 
                          dish.descriptionAr.toLowerCase().includes(query) ||
                          dish.ingredientsAr.some(i => i.toLowerCase().includes(query));
        return matchesFr || matchesAr;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, dish: MenuItem) => {
    e.stopPropagation();
    addItem(dish);
    setAddedDishId(dish.id);
    setTimeout(() => setAddedDishId(null), 1500);
  };

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto min-h-screen">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
          Haute Gastronomie & Salon de Thé
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#fcfaf6]">
          {t('menuHeader')}
        </h1>
        <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
          Nos créations évoluent selon les cueillettes maraîchères de la vallée de l'Ourika et les arrivages des criées de Méditerranée et d'Atlantique. Tous nos prix s'entendent en dirhams marocains (MAD), service et taxes compris.
        </p>

        {/* QR Code Action Button */}
        <div className="pt-2">
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#121217] hover:bg-[#1a1a24] text-[#d4af37] border border-[#d4af37]/30 rounded-xl text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>{t('printQrMenu')}</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Search + Categories */}
      <div className="space-y-6 mb-12">
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-11 pr-4 py-3 bg-[#121217] border border-white/10 rounded-2xl text-xs sm:text-sm text-[#f7f4ee] placeholder-white/30 focus:outline-none focus:border-[#d4af37]/60 transition-colors shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#a1a1aa] hover:text-white"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Categories Segmented Bar */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#d4af37] text-[#0a0a0c] font-semibold shadow-md shadow-[#d4af37]/20'
                    : 'bg-[#121217] text-[#a1a1aa] hover:text-white border border-white/5 hover:border-white/15'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Dishes Count / Search result indicator */}
      <div className="flex items-center justify-between text-xs text-[#a1a1aa] mb-8 pb-3 border-b border-white/5">
        <span>{filteredDishes.length} créations culinaires disponibles</span>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-[#d4af37] hover:underline"
          >
            Réinitialiser les filtres
          </button>
        )}
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <p className="text-sm text-[#a1a1aa]">Aucun plat ne correspond à votre recherche "{searchQuery}".</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="text-xs text-[#d4af37] underline"
          >
            Voir tous les plats
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => {
            const name = language === 'ar' ? dish.nameAr : dish.nameFr;
            const desc = language === 'ar' ? dish.descriptionAr : dish.descriptionFr;
            const isAdded = addedDishId === dish.id;

            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="group bg-[#101015] border border-white/10 hover:border-[#d4af37]/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#d4af37]/10 flex flex-col cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-[#16161e]">
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

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-serif-luxury font-bold text-[#fcfaf6] group-hover:text-[#d4af37] transition-colors leading-snug">
                      {name}
                    </h3>
                    <p className="mt-2 text-xs text-[#a1a1aa] line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-[#d4af37] underline underline-offset-4 group-hover:text-[#fcfaf6] transition-colors">
                      {t('viewDetails')}
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(e, dish)}
                      className={`p-2.5 rounded-xl transition-all cursor-pointer ${
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
      )}

      {/* Dish Modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />

      {/* Printable QR Code Modal */}
      <PrintableQrModal isOpen={isQrModalOpen} onClose={() => setIsQrModalOpen(false)} />

    </div>
  );
};

import fixedImage0 from '../assets/images/hero_culinary_restaurant_1792754318347.jpg';
import fixedImage1 from '../assets/images/dish_truffle_gastronomy_1792754320242.jpg';
import fixedImage2 from '../assets/images/restaurant_terrace_morocco_1792754319947.jpg';
import fixedImage3 from '../assets/images/chef_culinary_portrait_1792754319896.jpg';
import fixedImage4 from '../assets/images/patisserie_haute_couture_1792754336647.jpg';
import fixedImage5 from '../assets/images/moroccan_fusion_cocktail_1792754336693.jpg';
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, ZoomIn, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  titleFr: string;
  titleAr: string;
  category: 'espaces' | 'gastronomie' | 'patisserie' | 'mixologie';
  image: string;
  subtitleFr: string;
  subtitleAr: string;
}

export const GalleryPage: React.FC = () => {
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'gal-1',
      titleFr: 'Le Grand Salon Impérial',
      titleAr: 'الصالون الإمبراطوري الكبير',
      category: 'espaces',
      image: fixedImage0,
      subtitleFr: 'Lustres de cristal doré et tables drapées de lin immaculé',
      subtitleAr: 'ثريات الكريستال المذهب والطاولات المغطاة بالكتان الفاخر'
    },
    {
      id: 'gal-2',
      titleFr: 'Filet Mignon & Truffe Noire',
      titleAr: 'فيليه مينيون بالكمأة السوداء',
      category: 'gastronomie',
      image: fixedImage1,
      subtitleFr: 'Cuisson millimétrée, truffe de l\'Atlas et feuille d\'or 24K',
      subtitleAr: 'طهو دقيق، كمأة جبال الأطلس وورق الذهب الخالص'
    },
    {
      id: 'gal-3',
      titleFr: 'La Terrasse Sous les Étoiles',
      titleAr: 'شرفة الحديقة تحت النجوم',
      category: 'espaces',
      image: fixedImage2,
      subtitleFr: 'Lanternes traditionnelles et ambiance tamisée à Marrakech',
      subtitleAr: 'فوانيس تقليدية وأجواء ساحرة في مراكش'
    },
    {
      id: 'gal-4',
      titleFr: 'L\'Atelier de Dressage du Chef',
      titleAr: 'ورشة إعداد وإبداع الشيف',
      category: 'gastronomie',
      image: fixedImage3,
      subtitleFr: 'La précision chirurgicale de la haute gastronomie',
      subtitleAr: 'الدقة المتناهية في تقديم الأطباق الراقية'
    },
    {
      id: 'gal-5',
      titleFr: 'Entremets Grand Cru & Sucre Filé',
      titleAr: 'حلوى الشوكولاتة بالسكر المغزول',
      category: 'patisserie',
      image: fixedImage4,
      subtitleFr: 'Chocolat noir Guanaja 70% et dôme croustillant',
      subtitleAr: 'شوكولاتة داكنة 70% مع قبة مقرمشة'
    },
    {
      id: 'gal-6',
      titleFr: 'Élixir "Nuit de Marrakech"',
      titleAr: 'مشروب "ليالي مراكش" الفاخر',
      category: 'mixologie',
      image: fixedImage5,
      subtitleFr: 'Safran royal, grenade fraîche et brume de cèdre fumé',
      subtitleAr: 'زعفران ملكي، رمان طازج ودخان خشب الأرز'
    }
  ];

  const filters = [
    { id: 'all', label: language === 'ar' ? 'الكل' : 'Toutes les Vues' },
    { id: 'espaces', label: language === 'ar' ? 'الأماكن والصالونات' : 'Salons & Espaces' },
    { id: 'gastronomie', label: language === 'ar' ? 'الأطباق الفاخرة' : 'Haute Gastronomie' },
    { id: 'patisserie', label: language === 'ar' ? 'الحلويات الراقية' : 'Pâtisserie' },
    { id: 'mixologie', label: language === 'ar' ? 'المشروبات المبتكرة' : 'Mixologie' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto min-h-screen">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
          Photographies & Instants Précieux
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#fcfaf6]">
          Galerie des Sens
        </h1>
        <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
          Immersion visuelle au cœur de notre univers : l'harmonie des matières nobles, la flamme des candélabres et la grâce de nos assiettes signées.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id)}
            className={`px-4 py-2 text-xs font-medium rounded-xl transition-all cursor-pointer ${
              activeFilter === f.id
                ? 'bg-[#d4af37] text-[#0a0a0c] font-semibold shadow-md'
                : 'bg-[#121217] text-[#a1a1aa] hover:text-white border border-white/5'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setLightboxImage(item)}
            className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#d4af37]/50 shadow-xl cursor-pointer bg-[#14141c] h-80 sm:h-96"
          >
            <img
              src={item.image}
              alt={item.titleFr}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            <div className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn className="w-4 h-4 text-[#d4af37]" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-cinzel block">
                {item.category}
              </span>
              <h3 className="text-xl font-serif-luxury font-bold text-white">
                {language === 'ar' ? item.titleAr : item.titleFr}
              </h3>
              <p className="text-xs text-[#d8d3c8] line-clamp-1">
                {language === 'ar' ? item.subtitleAr : item.subtitleFr}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 z-50 p-4 sm:p-8 flex items-center justify-center bg-black/95 backdrop-blur-md">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-black/50 rounded-full border border-white/20 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={lightboxImage.image}
              alt={lightboxImage.titleFr}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl border border-[#d4af37]/30 shadow-2xl"
            />
            <div className="text-center mt-4 space-y-1">
              <h3 className="text-xl font-serif-luxury font-bold text-[#fcfaf6]">
                {language === 'ar' ? lightboxImage.titleAr : lightboxImage.titleFr}
              </h3>
              <p className="text-xs text-[#d4af37]">
                {language === 'ar' ? lightboxImage.subtitleAr : lightboxImage.subtitleFr}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

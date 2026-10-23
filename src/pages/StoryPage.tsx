import fixedImage0 from '../assets/images/chef_culinary_portrait_1792754319896.jpg';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Award, Heart, Leaf, Compass } from 'lucide-react';

export const StoryPage: React.FC = () => {
  const { t, language } = useLanguage();

  const timeline = [
    {
      year: '2018',
      titleFr: 'L\'Étincelle à Paris',
      titleAr: 'الشرارة الأولى في باريس',
      descFr: 'Après une décennie dans les brigades triplement étoilées de la Place Vendôme, le Chef Amine Benjelloun mûrit le rêve de faire dialoguer la haute technique française avec la noblesse des épices de son enfance.',
      descAr: 'بعد عقد من الزمن في مطابخ باريس الحائزة على ثلاث نجوم ميشلان، نضج حلم الشيف أمين بنجلون للجمع بين تقنيات الطهي الفرنسي العالي ونبل التوابل المغربية.'
    },
    {
      year: '2021',
      titleFr: 'L\'Écrin de Marrakech',
      titleAr: 'افتتاح صرح مراكش',
      descFr: 'Ouverture de Maison Saveur au cœur du quartier de l\'Hivernage. Un havre de paix où marbre noir de Khénifra, lustres en cristal et lanternes de cuivre martelé créent une scénographie féerique.',
      descAr: 'افتتاح ميزون سافور في قلب الحي الشتوي بمراكش، حيث يلتقي رخام خنيفرة الأسود بالثريات الكريستالية والفوانيس النحاسية المنحوتة يدوياً.'
    },
    {
      year: '2024',
      titleFr: 'La Consécration Internationale',
      titleAr: 'التتويج الدولي والاعتراف العالمي',
      descFr: 'Élu Meilleur Restaurant Gastronomique d\'Afrique du Nord par le Guide des Grandes Tables. Reconnaissance unanime pour le travail des jus infusés et le respect de la saisonnalité.',
      descAr: 'تم اختياره كأفضل مطعم فاخر في شمال إفريقيا مع إشادة دولية بتناغم النكهات واحترام مواسم المحاصيل الزراعية النادرة.'
    },
    {
      year: '2026',
      titleFr: 'L\'Ère Expérientielle 3D & La Table d\'Or',
      titleAr: 'العصر التجريبي ثلاثي الأبعاد وطاولة الذهب',
      descFr: 'Lancement de notre expérience culinaire immersive où chaque plat est une œuvre d\'art sculpturale, révélée sous une cloche d\'or gravée et célébrée dans nos deux adresses de Marrakech et Casablanca.',
      descAr: 'إطلاق التجربة الرقمية والحسية الغامرة ثلاثية الأبعاد، مع الحفاظ على أسمى تقاليد الضيافة في فرعي مراكش والدار البيضاء.'
    }
  ];

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto min-h-screen space-y-24">
      
      {/* Hero Narrative Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block">
          Notre Genèse & Nos Valeurs
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-bold text-[#fcfaf6]">
          La Quête de la Pureté Émotionnelle
        </h1>
        <p className="text-sm text-[#d8d3c8] leading-relaxed">
          Chez Maison Saveur, nous considérons la gastronomie non comme une simple nourriture, mais comme une forme d'art vivante capable d'évoquer des souvenirs intimes et de graver des moments précieux.
        </p>
      </div>

      {/* Two Column Visual Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-cinzel block">
            Le Terroir Sublime
          </span>
          <h2 className="text-3xl font-serif-luxury font-bold text-[#fcfaf6] leading-snug">
            Des Montagnes de l'Atlas aux Rivages de l'Atlantique
          </h2>
          <p className="text-sm text-[#a1a1aa] leading-relaxed">
            Chaque ingrédient provient de partenariats exclusifs avec des artisans et coopératives d'exception : le safran biologique de Taliouine cueilli à l'aube, les truffes noires fraîches des chênes de l'Atlas, l'huile d'argan vierge torréfiée à la meule de pierre, et les agrumes anciens d'Al-Haouz.
          </p>
          <p className="text-sm text-[#a1a1aa] leading-relaxed">
            Nous transformons ces joyaux de la terre marocaine grâce aux techniques de la grande cuisine française : réductions lentes de 36 heures, émulsions montées au beurre cru AOP, et cuissons millimétrées au degré près.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="p-4 bg-[#121217] rounded-xl border border-white/5">
              <Leaf className="w-5 h-5 text-[#d4af37] mb-2" />
              <h4 className="text-xs font-bold text-[#fcfaf6]">100% Produits Traçables</h4>
              <p className="text-[11px] text-[#a1a1aa] mt-1">Domaines maraîchers et pêche durable</p>
            </div>
            <div className="p-4 bg-[#121217] rounded-xl border border-white/5">
              <Award className="w-5 h-5 text-[#d4af37] mb-2" />
              <h4 className="text-xs font-bold text-[#fcfaf6]">Haute École Culinaire</h4>
              <p className="text-[11px] text-[#a1a1aa] mt-1">Brigade formée aux maisons étoilées</p>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl">
          <img
            src={fixedImage0}
            alt="Chef à l'œuvre"
            className="w-full h-[480px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-center">
            <span className="text-xs font-serif-luxury italic text-[#fcfaf6]">
              "La précision n'est rien sans l'émotion."
            </span>
          </div>
        </div>
      </div>

      {/* The Timeline */}
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-cinzel block mb-2">
            Chronologie
          </span>
          <h2 className="text-3xl font-serif-luxury font-bold text-[#fcfaf6]">
            Les Grandes Heures de la Maison
          </h2>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:bg-[#d4af37]/25 hidden md:block">
          {timeline.map((step, idx) => (
            <div 
              key={idx}
              className={`relative flex items-center ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`w-5/12 bg-[#121217] border border-white/10 p-6 rounded-2xl shadow-xl hover:border-[#d4af37]/40 transition-colors ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <span className="text-sm font-cinzel font-bold text-[#d4af37] block">
                  {step.year}
                </span>
                <h3 className="text-lg font-serif-luxury font-bold text-[#fcfaf6] mt-1">
                  {language === 'ar' ? step.titleAr : step.titleFr}
                </h3>
                <p className="text-xs text-[#a1a1aa] mt-2 leading-relaxed">
                  {language === 'ar' ? step.descAr : step.descFr}
                </p>
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d4af37] border-4 border-[#0a0a0c] shadow" />
            </div>
          ))}
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-6">
          {timeline.map((step, idx) => (
            <div key={idx} className="bg-[#121217] border border-white/10 p-6 rounded-2xl">
              <span className="text-sm font-cinzel font-bold text-[#d4af37] block">
                {step.year}
              </span>
              <h3 className="text-lg font-serif-luxury font-bold text-[#fcfaf6] mt-1">
                {language === 'ar' ? step.titleAr : step.titleFr}
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-2 leading-relaxed">
                {language === 'ar' ? step.descAr : step.descFr}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

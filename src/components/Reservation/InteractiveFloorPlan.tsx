import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { DiningArea } from '../../types';
import { Sparkles, Users, Check, Flame, TreePine, ChefHat } from 'lucide-react';

export interface RestaurantTable {
  id: string;
  number: number;
  nameFr: string;
  nameAr: string;
  area: DiningArea;
  capacity: number;
  highlightFr: string;
  highlightAr: string;
  isOccupied?: boolean;
}

export const RESTAURANT_TABLES: RestaurantTable[] = [
  // Salon Impérial (Tables 1 à 4)
  {
    id: 't-1',
    number: 1,
    nameFr: 'Alcôve Royale',
    nameAr: 'المخدع الملكي',
    area: 'salon',
    capacity: 4,
    highlightFr: 'Intimité feutrée & vue sur les lustres en cristal',
    highlightAr: 'خصوصية دافئة وإطلالة على الثريات الكريستالية',
    isOccupied: false
  },
  {
    id: 't-2',
    number: 2,
    nameFr: 'Cheminée en Cèdre',
    nameAr: 'مدفأة خشب الأرز',
    area: 'salon',
    capacity: 2,
    highlightFr: 'Idéale pour dîner romantique près de la cheminée',
    highlightAr: 'مثالية لعشاء رومانسي بجانب المدفأة الحجرية',
    isOccupied: true
  },
  {
    id: 't-3',
    number: 3,
    nameFr: 'Grand Cercle Impérial',
    nameAr: 'الدائرة الإمبراطورية',
    area: 'salon',
    capacity: 6,
    highlightFr: 'Banquette semi-circulaire en velours d\'or',
    highlightAr: 'أريكة نصف دائرية مخملية باللون الذهبي',
    isOccupied: false
  },
  {
    id: 't-4',
    number: 4,
    nameFr: 'Baie d\'Orangerie',
    nameAr: 'شرفة بيت البرتقال',
    area: 'salon',
    capacity: 4,
    highlightFr: 'Grandes verrières avec vue sur la fontaine',
    highlightAr: 'واجهة زجاجية مطلة على النافورة',
    isOccupied: false
  },

  // Terrasse Jardin (Tables 5 à 8)
  {
    id: 't-5',
    number: 5,
    nameFr: 'Fontaine de Marbre',
    nameAr: 'نافورة الرخام',
    area: 'terrasse',
    capacity: 2,
    highlightFr: 'Sous les orangers avec le murmure de l\'eau',
    highlightAr: 'تحت أشجار البرتقال مع خرير الماء العذب',
    isOccupied: false
  },
  {
    id: 't-6',
    number: 6,
    nameFr: 'Sous les Palmiers',
    nameAr: 'تحت النخيل',
    area: 'terrasse',
    capacity: 4,
    highlightFr: 'Lanternes traditionnelles de Marrakech',
    highlightAr: 'فوانيس مراكشية أصيلة وإضاءة دافئة',
    isOccupied: true
  },
  {
    id: 't-7',
    number: 7,
    nameFr: 'Pavillon des Étoiles',
    nameAr: 'جناح النجوم',
    area: 'terrasse',
    capacity: 8,
    highlightFr: 'Table d\'apparat pour grandes tablées et célébrations',
    highlightAr: 'طاولة للمجموعات الكبيرة والاحتفالات الخاصة',
    isOccupied: false
  },
  {
    id: 't-8',
    number: 8,
    nameFr: 'Pergola Jasmin',
    nameAr: 'عرائش الياسمين',
    area: 'terrasse',
    capacity: 2,
    highlightFr: 'Senteurs nocturnes de jasmin et bougies',
    highlightAr: 'عطور الياسمين الليلي مع الشموع',
    isOccupied: false
  },

  // Table Privée du Chef (Table 9)
  {
    id: 't-9',
    number: 9,
    nameFr: 'La Table Privée du Chef',
    nameAr: 'طاولة الشيف الحصرية',
    area: 'chef',
    capacity: 6,
    highlightFr: 'Immersion gastronomique avec vue directe sur le dressage de la brigade',
    highlightAr: 'تجربة حصرية مع إطلالة مباشرة على إبداعات الشيف وفريقه',
    isOccupied: false
  }
];

interface Props {
  selectedTableId: string | null;
  onSelectTable: (table: RestaurantTable) => void;
  isAdminView?: boolean;
}

export const InteractiveFloorPlan: React.FC<Props> = ({ 
  selectedTableId, 
  onSelectTable, 
  isAdminView = false 
}) => {
  const { language } = useLanguage();
  const [activeAreaFilter, setActiveAreaFilter] = useState<'all' | DiningArea>('all');

  const filteredTables = activeAreaFilter === 'all'
    ? RESTAURANT_TABLES
    : RESTAURANT_TABLES.filter(t => t.area === activeAreaFilter);

  const selectedTable = RESTAURANT_TABLES.find(t => t.id === selectedTableId);

  return (
    <div className="space-y-6">
      
      {/* Area Selector Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-1.5 bg-[#0a0a0e] p-1 rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setActiveAreaFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeAreaFilter === 'all' ? 'bg-[#d4af37] text-[#0a0a0c]' : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            Tous les Espaces
          </button>
          <button
            type="button"
            onClick={() => setActiveAreaFilter('salon')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAreaFilter === 'salon' ? 'bg-[#d4af37] text-[#0a0a0c]' : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            <Flame className="w-3 h-3" />
            <span>Salon Impérial</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveAreaFilter('terrasse')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAreaFilter === 'terrasse' ? 'bg-[#d4af37] text-[#0a0a0c]' : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            <TreePine className="w-3 h-3" />
            <span>Terrasse Jardin</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveAreaFilter('chef')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeAreaFilter === 'chef' ? 'bg-[#d4af37] text-[#0a0a0c]' : 'text-[#a1a1aa] hover:text-white'
            }`}
          >
            <ChefHat className="w-3 h-3" />
            <span>Table du Chef</span>
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-[11px] text-[#a1a1aa]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#1e1e28] border border-[#d4af37]" />
            <span>Disponible</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
            <span>Réservée</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#d4af37] border border-white" />
            <span>Sélectionnée</span>
          </div>
        </div>
      </div>

      {/* Visual Architectural Grid Plan */}
      <div className="p-6 bg-[#0a0a0f] border border-[#d4af37]/25 rounded-2xl relative overflow-hidden shadow-inner">
        
        {/* Background architectural floor grid watermark */}
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {filteredTables.map((table) => {
            const isSelected = selectedTableId === table.id;
            const isReserved = table.isOccupied;

            return (
              <div
                key={table.id}
                onClick={() => {
                  if (!isReserved || isAdminView) {
                    onSelectTable(table);
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#d4af37]/20 border-[#d4af37] shadow-lg shadow-[#d4af37]/15 ring-1 ring-[#d4af37]'
                    : isReserved
                    ? 'bg-[#15151e]/60 border-amber-500/20 opacity-75'
                    : 'bg-[#121219] border-white/10 hover:border-[#d4af37]/60 hover:bg-[#181822]'
                }`}
              >
                {/* Table Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-cinzel font-bold text-xs ${
                      isSelected ? 'bg-[#d4af37] text-[#0a0a0c]' : 'bg-[#1e1e28] text-[#d4af37]'
                    }`}>
                      #{table.number}
                    </span>
                    <h4 className="text-xs font-bold text-[#fcfaf6]">
                      {language === 'ar' ? table.nameAr : table.nameFr}
                    </h4>
                  </div>

                  <span className="text-[11px] text-[#a1a1aa] flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#d4af37]" />
                    <span>{table.capacity}p</span>
                  </span>
                </div>

                {/* Highlight */}
                <p className="text-[11px] text-[#a1a1aa] mt-2 line-clamp-2">
                  {language === 'ar' ? table.highlightAr : table.highlightFr}
                </p>

                {/* Table Footer Status */}
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                  <span className="uppercase tracking-wider text-[#d4af37] font-cinzel">
                    {table.area === 'salon' ? 'Salon Impérial' : table.area === 'terrasse' ? 'Terrasse Jardin' : 'Table du Chef'}
                  </span>

                  {isSelected ? (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>Sélectionnée</span>
                    </span>
                  ) : isReserved ? (
                    <span className="text-amber-400/90 font-medium">
                      Réservée ce service
                    </span>
                  ) : (
                    <span className="text-[#a1a1aa] group-hover:text-white">
                      Choisir cette table
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Table Detail Ribbon */}
      {selectedTable && (
        <div className="p-4 bg-[#14141d] border border-[#d4af37]/40 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#d4af37] font-cinzel block">
              Table Choisie pour Votre Réservation
            </span>
            <p className="text-sm font-bold text-[#fcfaf6] mt-0.5">
              Table #{selectedTable.number} — {selectedTable.nameFr} ({selectedTable.capacity} convives max)
            </p>
            <p className="text-[11px] text-[#a1a1aa]">{selectedTable.highlightFr}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#d4af37] text-[#0a0a0c] flex items-center justify-center font-bold">
            <Check className="w-5 h-5" />
          </div>
        </div>
      )}

    </div>
  );
};

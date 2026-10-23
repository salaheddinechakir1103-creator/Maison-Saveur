import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useReservation } from '../context/ReservationContext';
import { INITIAL_MENU_ITEMS } from '../data/menuData';
import { MenuItem, Reservation, ReservationStatus, DiningArea } from '../types';
import { InteractiveFloorPlan } from '../components/Reservation/InteractiveFloorPlan';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Calendar, 
  Utensils, 
  Search, 
  Filter, 
  Check, 
  X, 
  Trash2, 
  Plus, 
  Sparkles, 
  RefreshCw, 
  ArrowLeft, 
  AlertTriangle 
} from 'lucide-react';

interface Props {
  setActivePage: (page: string) => void;
}

export const AdminDashboard: React.FC<Props> = ({ setActivePage }) => {
  const { t, language } = useLanguage();
  const { reservations, updateStatus, deleteReservation, resetToDemo, getAreaName } = useReservation();

  // Local menu item manager
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_saveur_custom_menu');
      return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [activeTab, setActiveTab] = useState<'reservations' | 'plan' | 'menu' | 'stats'>('reservations');
  const [searchResQuery, setSearchResQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ReservationStatus>('all');
  const [selectedAdminTable, setSelectedAdminTable] = useState<string | null>(null);

  // New Dish Modal / Drawer state
  const [isAddDishOpen, setIsAddDishOpen] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState<'entrees' | 'plats' | 'patisserie' | 'boissons' | 'degustation'>('plats');
  const [newDishPrice, setNewDishPrice] = useState('320');
  const [newDishDesc, setNewDishDesc] = useState('');

  // Export CSV service sheet
  const handleExportCsv = () => {
    let csv = "Date;Heure;Reference;Client;Telephone;Email;Convives;Espace;Statut;Notes\n";
    reservations.forEach(r => {
      csv += `"${r.date}";"${r.time}";"${r.reference}";"${r.name}";"${r.phone}";"${r.email}";"${r.guests}";"${r.area}";"${r.status}";"${r.specialRequests || ''}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Maison_Saveur_Service_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Persist menu changes
  const saveMenuItems = (newItems: MenuItem[]) => {
    setMenuItems(newItems);
    try {
      localStorage.setItem('maison_saveur_custom_menu', JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const handleAddDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;

    const dish: MenuItem = {
      id: `dish-custom-${Date.now()}`,
      nameFr: newDishName.trim(),
      nameAr: newDishName.trim(),
      category: newDishCategory,
      priceMad: parseFloat(newDishPrice) || 250,
      descriptionFr: newDishDesc.trim() || 'Création du Chef exécutif.',
      descriptionAr: newDishDesc.trim() || 'إبداع الشيف التنفيذي.',
      ingredientsFr: ['Ingrédients nobles de saison'],
      ingredientsAr: ['مكونات نبيلة منتقاة'],
      image: '/src/assets/images/dish_truffle_gastronomy_1792754320242.jpg',
      isChefSpecial: true
    };

    saveMenuItems([dish, ...menuItems]);
    setIsAddDishOpen(false);
    setNewDishName('');
    setNewDishDesc('');
  };

  const handleDeleteDish = (id: string) => {
    saveMenuItems(menuItems.filter(item => item.id !== id));
  };

  // KPIs
  const totalReservations = reservations.length;
  const confirmedReservations = reservations.filter(r => r.status === 'confirmée').length;
  const totalGuests = reservations
    .filter(r => r.status === 'confirmée')
    .reduce((sum, r) => sum + r.guests, 0);
  // Average ticket estimate: 650 MAD per guest
  const estimatedRevenueMad = totalGuests * 650;

  // Filtered reservations
  const filteredReservations = reservations.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchResQuery.trim()) {
      const q = searchResQuery.toLowerCase();
      return r.name.toLowerCase().includes(q) || 
             r.reference.toLowerCase().includes(q) ||
             r.phone.includes(q) ||
             r.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto min-h-screen space-y-8">
      
      {/* Top Banner Demo Notice */}
      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs text-amber-300">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
          <span>
            <strong>Espace de Direction & Démonstration :</strong> Toutes les données, réservations et transactions sont persistées en mémoire locale (LocalStorage) à des fins de simulation.
          </span>
        </div>
        <button
          onClick={resetToDemo}
          className="text-amber-200 underline hover:text-white flex items-center gap-1 shrink-0 ml-4 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Réinitialiser</span>
        </button>
      </div>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <button
            onClick={() => setActivePage('home')}
            className="text-xs text-[#d4af37] flex items-center gap-1.5 hover:underline mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au site public</span>
          </button>
          <h1 className="text-3xl font-cinzel font-bold text-[#fcfaf6]">
            Maison Saveur · Direction Générale
          </h1>
          <p className="text-xs text-[#a1a1aa] mt-0.5">
            Tableau de bord de gestion des tables, de la carte et des performances du service.
          </p>
        </div>

        {/* Tab Switcher & Export */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 bg-[#14141c] hover:bg-[#1e1e28] text-[#d4af37] border border-[#d4af37]/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Télécharger la feuille de service du Maître d'Hôtel"
          >
            <span>Feuille de Service (CSV)</span>
          </button>

          <div className="flex items-center gap-1 bg-[#121217] p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab('reservations')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'reservations' ? 'bg-[#d4af37] text-[#0a0a0c]' : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Réservations ({reservations.length})
            </button>
            <button
              onClick={() => setActiveTab('plan')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'plan' ? 'bg-[#d4af37] text-[#0a0a0c]' : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Plan de Salle
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'menu' ? 'bg-[#d4af37] text-[#0a0a0c]' : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              La Carte ({menuItems.length})
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === 'stats' ? 'bg-[#d4af37] text-[#0a0a0c]' : 'text-[#a1a1aa] hover:text-white'
              }`}
            >
              Métriques
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-[#121217] border border-white/10 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#a1a1aa]">
            <span>Chiffre d'Affaires Prévisionnel</span>
            <DollarSign className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="text-2xl font-bold font-cinzel text-[#d4af37] tabular-nums">
            {estimatedRevenueMad.toLocaleString()} MAD
          </p>
          <span className="text-[11px] text-emerald-400 block font-medium">
            +18.4% vs semaine précédente
          </span>
        </div>

        <div className="p-6 bg-[#121217] border border-white/10 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#a1a1aa]">
            <span>Réservations Confirmées</span>
            <Calendar className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="text-2xl font-bold font-cinzel text-[#fcfaf6] tabular-nums">
            {confirmedReservations} <span className="text-xs text-[#71717a]">/ {totalReservations}</span>
          </p>
          <span className="text-[11px] text-[#a1a1aa] block">
            Taux de confirmation : {totalReservations ? Math.round((confirmedReservations / totalReservations) * 100) : 0}%
          </span>
        </div>

        <div className="p-6 bg-[#121217] border border-white/10 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#a1a1aa]">
            <span>Couverts Confirmés</span>
            <Users className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="text-2xl font-bold font-cinzel text-[#fcfaf6] tabular-nums">
            {totalGuests} convives
          </p>
          <span className="text-[11px] text-[#a1a1aa] block">
            Moyenne : {confirmedReservations ? (totalGuests / confirmedReservations).toFixed(1) : 0} pers. / table
          </span>
        </div>

        <div className="p-6 bg-[#121217] border border-white/10 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#a1a1aa]">
            <span>Plats Actifs à la Carte</span>
            <Utensils className="w-4 h-4 text-[#d4af37]" />
          </div>
          <p className="text-2xl font-bold font-cinzel text-[#fcfaf6] tabular-nums">
            {menuItems.length} créations
          </p>
          <span className="text-[11px] text-[#d4af37] block font-medium">
            5 catégories d'exception
          </span>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: RESERVATIONS MANAGER
      ========================================================================= */}
      {activeTab === 'reservations' && (
        <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
              <input
                type="text"
                value={searchResQuery}
                onChange={(e) => setSearchResQuery(e.target.value)}
                placeholder="Rechercher nom, réf, téléphone..."
                className="w-full pl-10 pr-4 py-2 bg-[#0a0a0e] border border-white/10 rounded-xl text-xs text-[#f7f4ee] focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              {(['all', 'confirmée', 'en_attente', 'annulée'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-[#d4af37] text-[#0a0a0c] font-semibold'
                      : 'bg-[#0a0a0e] text-[#a1a1aa] hover:text-white'
                  }`}
                >
                  {st === 'all' ? 'Toutes' : st === 'confirmée' ? 'Confirmées' : st === 'en_attente' ? 'En attente' : 'Annulées'}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#a1a1aa]">
              <thead className="bg-[#0d0d12] text-[#fcfaf6] uppercase text-[10px] tracking-wider border-b border-white/10">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Réf</th>
                  <th className="py-3.5 px-4 font-semibold">Invité</th>
                  <th className="py-3.5 px-4 font-semibold">Date & Heure</th>
                  <th className="py-3.5 px-4 font-semibold">Convives & Espace</th>
                  <th className="py-3.5 px-4 font-semibold">Statut</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredReservations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#71717a]">
                      Aucune réservation ne correspond aux critères.
                    </td>
                  </tr>
                ) : (
                  filteredReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-4 font-cinzel font-bold text-[#d4af37]">
                        {res.reference}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-[#fcfaf6] font-medium">{res.name}</div>
                        <div className="text-[11px] text-[#71717a]">{res.phone} · {res.email}</div>
                      </td>
                      <td className="py-3 px-4 text-[#f7f4ee]">
                        {res.date} à {res.time}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[#fcfaf6] font-medium">{res.guests} pers.</span>
                        <span className="text-[11px] text-[#71717a] block">{getAreaName(res.area, 'fr')}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          res.status === 'confirmée'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : res.status === 'en_attente'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-red-500/15 text-red-400 border border-red-500/30'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {res.status !== 'confirmée' && (
                            <button
                              onClick={() => updateStatus(res.id, 'confirmée')}
                              className="p-1.5 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Valider la réservation"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          {res.status !== 'annulée' && (
                            <button
                              onClick={() => updateStatus(res.id, 'annulée')}
                              className="p-1.5 text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Annuler"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteReservation(res.id)}
                            className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                            title="Supprimer définitivement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 1.5: INTERACTIVE FLOOR PLAN (Maître d'Hôtel View)
      ========================================================================= */}
      {activeTab === 'plan' && (
        <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-cinzel font-bold text-[#fcfaf6]">
                Plan de Salle & Disponibilité en Temps Réel
              </h3>
              <p className="text-xs text-[#a1a1aa]">
                Visualisation des tables du Salon Impérial, de la Terrasse Jardin et de la Table du Chef pour le service de ce soir.
              </p>
            </div>
            <span className="text-xs text-[#d4af37] font-cinzel font-semibold">
              9 Tables Principales · 36 Couverts Maximaux
            </span>
          </div>

          <InteractiveFloorPlan
            selectedTableId={selectedAdminTable}
            onSelectTable={(table) => setSelectedAdminTable(table.id)}
            isAdminView={true}
          />
        </div>
      )}

      {/* =========================================================================
          TAB 2: MENU MANAGER
      ========================================================================= */}
      {activeTab === 'menu' && (
        <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-cinzel font-bold text-[#fcfaf6]">Gestion de la Carte Gastronomique</h3>
              <p className="text-xs text-[#a1a1aa]">Ajoutez de nouvelles créations du Chef ou ajustez les prix en MAD.</p>
            </div>
            <button
              onClick={() => setIsAddDishOpen(true)}
              className="px-4 py-2 bg-[#d4af37] hover:bg-[#e6ca65] text-[#0a0a0c] font-semibold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Nouveau Plat</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((dish) => (
              <div key={dish.id} className="p-4 bg-[#0d0d12] border border-white/10 rounded-xl space-y-3 flex flex-col justify-between">
                <div className="flex gap-3">
                  <img
                    src={dish.image}
                    alt={dish.nameFr}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#fcfaf6]">{dish.nameFr}</h4>
                    <span className="text-[11px] text-[#d4af37] uppercase tracking-wider block mt-0.5">
                      {dish.category}
                    </span>
                    <span className="text-xs font-cinzel font-bold text-white tabular-nums">
                      {dish.priceMad} MAD
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                  <button
                    onClick={() => handleDeleteDish(dish.id)}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Retirer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: STATS & SERVICE CHARTS
      ========================================================================= */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-base font-cinzel font-bold text-[#fcfaf6]">
              Répartition des Réservations par Espace
            </h3>
            
            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between text-[#a1a1aa] mb-1">
                  <span>Grand Salon Impérial</span>
                  <span className="text-white font-medium">55%</span>
                </div>
                <div className="w-full h-2.5 bg-[#0a0a0e] rounded-full overflow-hidden">
                  <div className="w-[55%] h-full bg-[#d4af37] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#a1a1aa] mb-1">
                  <span>Terrasse Jardin & Lanternes</span>
                  <span className="text-white font-medium">35%</span>
                </div>
                <div className="w-full h-2.5 bg-[#0a0a0e] rounded-full overflow-hidden">
                  <div className="w-[35%] h-full bg-[#c5a059] rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[#a1a1aa] mb-1">
                  <span>Table du Chef (Privilège)</span>
                  <span className="text-white font-medium">10%</span>
                </div>
                <div className="w-full h-2.5 bg-[#0a0a0e] rounded-full overflow-hidden">
                  <div className="w-[10%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#121217] border border-white/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-base font-cinzel font-bold text-[#fcfaf6]">
              Services Préférés (Déjeuner vs Dîner)
            </h3>

            <div className="flex items-center justify-around py-8">
              <div className="text-center space-y-2">
                <div className="w-24 h-24 rounded-full border-4 border-[#d4af37] flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold font-cinzel text-[#d4af37]">78%</span>
                </div>
                <span className="text-xs font-semibold text-[#fcfaf6] block">Service du Dîner</span>
                <span className="text-[11px] text-[#71717a]">Ambiance feutrée & bougies</span>
              </div>

              <div className="text-center space-y-2">
                <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center mx-auto">
                  <span className="text-xl font-bold font-cinzel text-white">22%</span>
                </div>
                <span className="text-xs font-semibold text-[#fcfaf6] block">Service du Déjeuner</span>
                <span className="text-[11px] text-[#71717a]">Déjeuners d'affaires & terrasse</span>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Add Dish Modal */}
      {isAddDishOpen && (
        <div className="fixed inset-0 z-50 p-4 flex items-center justify-center bg-black/80 backdrop-blur-md">
          <div className="bg-[#121217] border border-[#d4af37]/30 rounded-2xl p-6 sm:p-8 max-w-md w-full space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-cinzel font-bold text-[#fcfaf6]">Ajouter un Plat d'Exception</h3>
              <button onClick={() => setIsAddDishOpen(false)} className="text-[#a1a1aa] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDish} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#a1a1aa] mb-1">Nom du Plat *</label>
                <input
                  type="text"
                  required
                  value={newDishName}
                  onChange={(e) => setNewDishName(e.target.value)}
                  placeholder="Ex : Sole Meunière à l'Émulsion de Citron Confit"
                  className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#a1a1aa] mb-1">Catégorie</label>
                  <select
                    value={newDishCategory}
                    onChange={(e: any) => setNewDishCategory(e.target.value)}
                    className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl p-2.5 text-white"
                  >
                    <option value="entrees">Entrées</option>
                    <option value="plats">Plats Signatures</option>
                    <option value="patisserie">Pâtisserie</option>
                    <option value="boissons">Boissons & Thés</option>
                    <option value="degustation">Dégustation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#a1a1aa] mb-1">Prix (MAD)</label>
                  <input
                    type="number"
                    value={newDishPrice}
                    onChange={(e) => setNewDishPrice(e.target.value)}
                    className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#a1a1aa] mb-1">Description Gastronomique</label>
                <textarea
                  rows={3}
                  value={newDishDesc}
                  onChange={(e) => setNewDishDesc(e.target.value)}
                  placeholder="Description sensorielle..."
                  className="w-full bg-[#0a0a0e] border border-white/10 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddDishOpen(false)}
                  className="px-4 py-2 text-[#a1a1aa] hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#d4af37] text-[#0a0a0c] font-bold rounded-xl uppercase tracking-wider"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

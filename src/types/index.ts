export type Language = 'fr' | 'ar';

export type MenuCategory = 
  | 'all'
  | 'entrees'
  | 'plats'
  | 'patisserie'
  | 'boissons'
  | 'degustation';

export interface MenuItem {
  id: string;
  nameFr: string;
  nameAr: string;
  category: 'entrees' | 'plats' | 'patisserie' | 'boissons' | 'degustation';
  priceMad: number;
  descriptionFr: string;
  descriptionAr: string;
  ingredientsFr: string[];
  ingredientsAr: string[];
  allergens?: string[];
  winePairing?: string;
  image: string;
  isChefSpecial?: boolean;
  calories?: number;
}

export type DiningArea = 'salon' | 'terrasse' | 'chef';
export type ReservationStatus = 'confirmée' | 'en_attente' | 'annulée';

export interface Reservation {
  id: string;
  reference: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  area: DiningArea;
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  notes?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  city: string;
  roleFr: string;
  roleAr: string;
  quoteFr: string;
  quoteAr: string;
  rating: number;
  source: string;
}

export type SceneCameraView = 'perspective' | 'top' | 'macro' | 'cloche';
export type SceneLighting = 'studio' | 'candlelight' | 'midnight';

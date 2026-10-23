import React, { createContext, useContext, useState, useEffect } from 'react';
import { Reservation, ReservationStatus, DiningArea } from '../types';
import { INITIAL_RESERVATIONS } from '../data/menuData';

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (data: Omit<Reservation, 'id' | 'reference' | 'status' | 'createdAt'>) => Reservation;
  updateStatus: (id: string, status: ReservationStatus) => void;
  deleteReservation: (id: string) => void;
  resetToDemo: () => void;
  getAreaName: (area: DiningArea, lang: 'fr' | 'ar') => string;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

const RESERVATIONS_KEY = 'maison_saveur_reservations_data';

export const ReservationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(RESERVATIONS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_RESERVATIONS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
    } catch {
      // ignore
    }
  }, [reservations]);

  const addReservation = (data: Omit<Reservation, 'id' | 'reference' | 'status' | 'createdAt'>): Reservation => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const newReservation: Reservation = {
      ...data,
      id: `res-${Date.now()}`,
      reference: `MS-${randomCode}`,
      status: 'confirmée',
      createdAt: new Date().toISOString()
    };

    setReservations(prev => [newReservation, ...prev]);
    return newReservation;
  };

  const updateStatus = (id: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const deleteReservation = (id: string) => {
    setReservations(prev => prev.filter(r => r.id !== id));
  };

  const resetToDemo = () => {
    setReservations(INITIAL_RESERVATIONS);
  };

  const getAreaName = (area: DiningArea, lang: 'fr' | 'ar'): string => {
    if (area === 'salon') {
      return lang === 'ar' ? 'الصالون الإمبراطوري' : 'Salon Impérial';
    }
    if (area === 'terrasse') {
      return lang === 'ar' ? 'شرفة الحديقة' : 'Terrasse Jardin';
    }
    return lang === 'ar' ? 'طاولة الشيف' : 'Table du Chef';
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        updateStatus,
        deleteReservation,
        resetToDemo,
        getAreaName
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservation = (): ReservationContextType => {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservation must be used within a ReservationProvider');
  }
  return context;
};

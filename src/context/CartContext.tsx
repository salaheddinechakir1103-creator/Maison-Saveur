import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (dish: MenuItem, quantity?: number, notes?: string) => void;
  removeItem: (dishId: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalPriceMad: number;
  generateWhatsAppLink: (customerNotes?: string) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'maison_saveur_cart';
const WHATSAPP_PHONE = '212661889900'; // Luxury concierge WhatsApp

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage unavailable
    }
  }, [items]);

  const addItem = (dish: MenuItem, quantity: number = 1, notes?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.dish.id === dish.id);
      if (existing) {
        return prev.map(i => 
          i.dish.id === dish.id 
            ? { ...i, quantity: i.quantity + quantity, notes: notes || i.notes }
            : i
        );
      }
      return [...prev, { dish, quantity, notes }];
    });
  };

  const removeItem = (dishId: string) => {
    setItems(prev => prev.filter(i => i.dish.id !== dishId));
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(dishId);
      return;
    }
    setItems(prev => 
      prev.map(i => i.dish.id === dishId ? { ...i, quantity } : i)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPriceMad = items.reduce((sum, item) => sum + (item.dish.priceMad * item.quantity), 0);

  const generateWhatsAppLink = (customerNotes?: string): string => {
    if (items.length === 0) return '';

    let text = `Bonjour Maison Saveur,\n\nJe souhaite passer une commande gastronomique d'exception :\n\n`;
    items.forEach((item, index) => {
      text += `${index + 1}. *${item.dish.nameFr}* x${item.quantity} — ${(item.dish.priceMad * item.quantity).toLocaleString()} MAD\n`;
      if (item.notes) {
        text += `   _Note: ${item.notes}_\n`;
      }
    });

    text += `\n*Total : ${totalPriceMad.toLocaleString()} MAD*\n`;
    if (customerNotes?.trim()) {
      text += `\nInstructions client : ${customerNotes.trim()}\n`;
    }
    text += `\nMerci de me confirmer la disponibilité et le délai de préparation.`;

    const encoded = encodeURIComponent(text);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalCount,
        totalPriceMad,
        generateWhatsAppLink,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

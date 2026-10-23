import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { X, Plus, Minus, Trash2, Send, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    totalPriceMad, 
    generateWhatsAppLink, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();
  const { t, language } = useLanguage();
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isCartOpen) return null;

  const handleWhatsAppOrder = () => {
    const link = generateWhatsAppLink(customerNotes);
    if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className={`fixed inset-y-0 ${language === 'ar' ? 'left-0' : 'right-0'} max-w-md w-full bg-[#121217] border-l border-[#d4af37]/20 shadow-2xl flex flex-col z-10 animate-slideIn`}>
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
            <h3 className="text-lg font-cinzel font-bold text-[#fcfaf6]">{t('cartTitle')}</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#a1a1aa] hover:text-[#fcfaf6] transition-colors rounded-lg cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
          {items.length === 0 ? (
            <div className="py-16 text-center text-[#a1a1aa]">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#d4af37]" />
              <p className="text-sm">{t('emptyCart')}</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.dish.id} className="pt-4 first:pt-0 flex gap-4 items-center">
                <img
                  src={item.dish.image}
                  alt={item.dish.nameFr}
                  className="w-16 h-16 rounded-xl object-cover border border-[#d4af37]/20 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#fcfaf6] truncate">
                    {language === 'ar' ? item.dish.nameAr : item.dish.nameFr}
                  </h4>
                  <p className="text-xs text-[#d4af37] font-medium mt-0.5 tabular-nums">
                    {item.dish.priceMad.toLocaleString()} {t('currency')}
                  </p>
                  
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-white/10 rounded-lg bg-[#0a0a0e] overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity - 1)}
                        className="p-1 hover:bg-white/10 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.dish.id, item.quantity + 1)}
                        className="p-1 hover:bg-white/10 text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.dish.id)}
                      className="text-xs text-red-400/80 hover:text-red-400 transition-colors p-1 cursor-pointer"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold text-[#fcfaf6] tabular-nums">
                    {(item.dish.priceMad * item.quantity).toLocaleString()} {t('currency')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with WhatsApp Generator */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0c0c10] space-y-4">
            
            {/* Notes textarea */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#a1a1aa] mb-1.5 font-medium">
                {t('cartNotePlaceholder')}
              </label>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={2}
                placeholder="Ex : Cuisson à point, sauce à part..."
                className="w-full text-xs bg-[#16161d] border border-white/10 rounded-xl p-2.5 text-[#f7f4ee] placeholder-white/20 focus:outline-none focus:border-[#d4af37]/50 resize-none"
              />
            </div>

            {/* Total */}
            <div className="flex items-center justify-between py-2 border-t border-white/10">
              <span className="text-sm text-[#a1a1aa] font-medium">{t('total')}</span>
              <span className="text-xl font-bold font-cinzel text-[#d4af37] tabular-nums">
                {totalPriceMad.toLocaleString()} {t('currency')}
              </span>
            </div>

            {/* WhatsApp CTA Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-600/30 active:scale-[0.98] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{t('orderViaWhatsApp')}</span>
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-[#a1a1aa] hover:text-white transition-colors cursor-pointer"
            >
              {t('clearCart')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export type Currency = 'MAD' | 'EUR' | 'USD';

export const CURRENCY_RATES: Record<Currency, { rate: number; symbol: string; label: string }> = {
  MAD: { rate: 1, symbol: 'MAD', label: 'Dirham Marocain (MAD)' },
  EUR: { rate: 0.092, symbol: '€', label: 'Euro (€)' },
  USD: { rate: 0.10, symbol: '$', label: 'US Dollar ($)' }
};

export const formatPrice = (madPrice: number, currency: Currency): string => {
  const { rate, symbol } = CURRENCY_RATES[currency];
  const converted = madPrice * rate;

  if (currency === 'MAD') {
    return `${madPrice.toLocaleString()} MAD`;
  }
  return `${converted.toFixed(0)} ${symbol}`;
};

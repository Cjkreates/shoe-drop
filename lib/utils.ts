import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  // Auto-Conversion: If price is less than 5000, assume it's USD and convert to KES
  const convertedPrice = price < 5000 ? price * 130 : price;
  
  // Format using Intl.NumberFormat with Kenyan locale
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(convertedPrice);
}

// Keep formatCurrency for backward compatibility (deprecated)
export function formatCurrency(amount: number): string {
  return formatPrice(amount);
}


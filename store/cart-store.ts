"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  isOpen: boolean;
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addItem: (product: { id: string; name: string; price: number; image: string }, size: string) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, delta: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      _hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          _hasHydrated: state,
        });
      },
      addItem: (product, size) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === product.id && item.size === size
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === product.id && item.size === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, size, quantity: 1 }],
          };
        }),
      removeItem: (id, size) =>
        set((state) => ({
          items: state.items.filter((item) => !(item.id === id && item.size === size)),
        })),
      updateQuantity: (id, size, delta) =>
        set((state) => {
          const item = state.items.find((item) => item.id === id && item.size === size);
          if (!item) return state;
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) {
            return {
              items: state.items.filter((item) => !(item.id === id && item.size === size)),
            };
          }
          return {
            items: state.items.map((item) =>
              item.id === id && item.size === size
                ? { ...item, quantity: newQuantity }
                : item
            ),
          };
        }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "shoe-drop-storage",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : undefined)),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);


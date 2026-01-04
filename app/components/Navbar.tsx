"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold uppercase text-zinc-50">
          AERO
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-zinc-50 hover:text-zinc-300 transition-colors uppercase text-sm font-medium">
            Shop
          </Link>
          <Link href="/collections" className="text-zinc-50 hover:text-zinc-300 transition-colors uppercase text-sm font-medium">
            Collections
          </Link>
          <Link href="/about" className="text-zinc-50 hover:text-zinc-300 transition-colors uppercase text-sm font-medium">
            About
          </Link>
        </div>
        
        <button
          onClick={() => useCartStore.getState().toggleCart()}
          className="text-zinc-50 hover:text-zinc-300 transition-colors"
        >
          <ShoppingCart size={24} />
        </button>
      </div>
    </nav>
  );
};


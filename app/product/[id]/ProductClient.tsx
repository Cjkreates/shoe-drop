"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

// Mock related products - In a real app, you'd pass these as a prop or fetch them
const RELATED_PRODUCTS = [
  { id: '1', name: 'Air Max Pulse', price: 18000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070' },
  { id: '2', name: 'Dunk Low Retro', price: 15500, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925' },
  { id: '3', name: 'Jordan 1 High', price: 24000, image: 'https://images.unsplash.com/photo-1584063576939-2a911e3b5e43?q=80&w=2070' },
  { id: '4', name: 'Zoom Vomero 5', price: 19500, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1887' },
];

const ProductClient = ({ product }: { product: any }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const { addItem, toggleCart } = useCartStore();

  const sizes = ["7", "8", "9", "10", "11", "12"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      selectedSize
    );
    toggleCart();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Product Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto py-12 px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16"
      >
        {/* --- LEFT: CINEMATIC GALLERY --- */}
        <div className="lg:col-span-7 space-y-6">
          <div className="group relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden rounded-sm">
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
              <span className="bg-white text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                Originals
              </span>
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">
                Limited Release
              </span>
            </div>
            
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 0.98 }}
                className="relative aspect-square bg-zinc-900 cursor-crosshair overflow-hidden rounded-sm border border-zinc-800"
              >
                <Image src={product.image} alt="View" fill className="object-cover opacity-60 hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- RIGHT: PURCHASE INTERFACE --- */}
        <div className="lg:col-span-5 flex flex-col justify-center sticky top-24 h-fit">
          <header className="mb-10">
            <motion.h1 
              initial={{ x: 20 }} 
              animate={{ x: 0 }}
              className="text-7xl font-black uppercase italic tracking-tighter leading-[0.85] mb-4"
            >
              {product.name}
            </motion.h1>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-light text-zinc-400 tracking-tight">
                {formatPrice(product.price)}
              </p>
              <div className="h-[1px] flex-1 bg-zinc-800" />
            </div>
          </header>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">Select Size (UK)</p>
              <button className="text-[10px] uppercase underline tracking-widest text-zinc-600 hover:text-white transition-colors">Size Guide</button>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-5 transition-all text-sm font-bold border ${
                    selectedSize === size
                      ? "bg-white text-black border-white"
                      : "bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            
            <AnimatePresence>
              {shake && !selectedSize && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 text-[10px] uppercase font-bold mt-4 tracking-widest text-center"
                >
                  ⚠ Please select your size
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.95 }}
            animate={shake ? { x: [-4, 4, -4, 4, 0] } : {}}
            className="group w-full bg-white text-black py-6 font-black uppercase text-xl tracking-tighter hover:bg-zinc-200 transition-all flex justify-between px-10 items-center overflow-hidden relative"
          >
            <span className="z-10">Add To Drop</span>
            <span className="z-10 group-hover:translate-x-2 transition-transform">→</span>
            <div className="absolute inset-0 bg-zinc-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>

          <div className="mt-12 space-y-4">
            <details className="group border-b border-zinc-900 pb-4 cursor-pointer">
              <summary className="flex justify-between items-center list-none uppercase text-xs font-bold tracking-widest">
                Description <span className="group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="mt-4 text-zinc-500 text-sm leading-relaxed italic">
                {product.description || "The 'Shoe Drop' edition features industrial-grade mesh, responsive cushioning, and a brutalist silhouette designed for the modern collector."}
              </p>
            </details>
          </div>
        </div>
      </motion.div>

      {/* --- RELATED PRODUCTS SECTION --- */}
      <section className="border-t border-zinc-900 mt-20 py-20 px-4 md:px-12 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">You Might Also Like</h2>
              <p className="text-zinc-500 text-xs uppercase tracking-[0.3em] mt-2">Curated for your style</p>
            </div>
            <Link href="/" className="text-[10px] font-bold uppercase border-b border-white pb-1 hover:text-zinc-400 hover:border-zinc-400 transition-all">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {RELATED_PRODUCTS.map((item) => (
              <Link href={`/product/${item.id}`} key={item.id} className="group">
                <div className="relative aspect-[3/4] bg-zinc-900 overflow-hidden mb-4 border border-zinc-800">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black text-[10px] font-black px-4 py-2 uppercase tracking-tighter">View Drop</span>
                  </div>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-tight group-hover:underline">{item.name}</h3>
                <p className="text-zinc-500 text-sm mt-1">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductClient;
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

const ProductClient = ({ product }: { product: any }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const { addItem, toggleCart } = useCartStore();

  const sizes = ["7", "8", "9", "10", "11"];

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-6"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative w-full aspect-square rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={`${product.name} view ${i}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sticky top-20 h-fit">
          <h1 className="text-5xl font-bold uppercase tracking-tight mb-4 text-zinc-50">
            {product.name}
          </h1>
          <p className="text-2xl text-zinc-400 mb-8">{formatPrice(product.price)}</p>

          <div className="mb-8">
            <p className="text-sm uppercase font-bold mb-4 text-zinc-50">Size</p>
            <div className="grid grid-cols-5 gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 px-4 transition-all uppercase font-bold ${
                    selectedSize === size
                      ? "border-zinc-50 bg-zinc-50 text-zinc-950 border-4"
                      : "border-2 border-zinc-700 text-zinc-50 hover:border-zinc-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            onClick={handleAddToCart}
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="w-full bg-zinc-50 text-zinc-950 py-6 font-bold uppercase text-lg tracking-wide hover:bg-zinc-200 transition-colors"
          >
            ADD TO CART
          </motion.button>

          <p className="mt-8 text-zinc-400 text-base leading-relaxed">
            Engineered for the future. Premium materials meet brutalist design.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductClient;

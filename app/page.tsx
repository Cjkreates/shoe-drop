"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <section className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-12 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6">
              FUTURE WALK
            </h1>
            <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-md">
              Step into tomorrow. Where innovation meets street style.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-zinc-50 text-zinc-950 px-8 py-4 font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 bg-zinc-900 flex items-center justify-center min-h-[50vh] md:min-h-screen overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop"
            alt="Future Walk Sneaker"
            className="w-full h-full object-contain max-w-2xl"
            style={{
              filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))",
              transform: "rotate(-15deg)",
            }}
            initial={{ y: 0 }}
            animate={{ y: [0, -20, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </section>

      <section className="py-12 md:py-24 px-6 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-8 md:mb-12 text-center">Latest Drops</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <motion.div
                className="bg-zinc-900 overflow-hidden cursor-pointer relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {product.new && (
                  <div className="absolute top-4 right-4 z-10 bg-zinc-50 text-zinc-950 px-3 py-1 text-xs font-bold uppercase">
                    NEW
                  </div>
                )}
                <div className="relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold uppercase mb-2">{product.name}</h3>
                  <p className="text-zinc-400">{formatCurrency(product.price)}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

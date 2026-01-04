"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="sticky bottom-0 z-0 bg-zinc-950 text-zinc-50 border-t border-zinc-800">
      <div className="grid grid-cols-1 md:grid-cols-4 border-t border-zinc-800">
        {/* Col 1: Brand */}
        <div className="border-l border-zinc-800 p-6 md:p-8">
          <h2 className="text-3xl font-bold uppercase mb-2">AERO</h2>
          <p className="text-sm uppercase tracking-widest text-zinc-400">NAKURU • KENYA</p>
        </div>

        {/* Col 2: Shop */}
        <div className="border-l border-zinc-800 p-6 md:p-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4">SHOP</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                Latest Drops
              </Link>
            </li>
            <li>
              <Link href="/shop?category=men" className="text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                Men
              </Link>
            </li>
            <li>
              <Link href="/shop?category=women" className="text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                Women
              </Link>
            </li>
            <li>
              <Link href="/shop?sale=true" className="text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Support */}
        <div className="border-l border-zinc-800 p-6 md:p-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4">SUPPORT</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/order-status" className="text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                Order Status
              </Link>
            </li>
            <li>
              <Link href="/returns" className="text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="border-l border-zinc-800 p-6 md:p-8">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4">NEVER MISS A DROP</h3>
          <form onSubmit={handleSubscribe} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="EMAIL"
              className="w-full bg-transparent border-b border-zinc-700 text-zinc-50 placeholder-zinc-500 uppercase text-sm tracking-widest focus:outline-none focus:border-zinc-50 transition-colors pb-2"
              required
            />
            <button
              type="submit"
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              SUBSCRIBE
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800 px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm uppercase tracking-widest text-zinc-400">
        <p>© 2026 AERO INC.</p>
        <p>SECURED BY PAYSTACK • M-PESA ACCEPTED</p>
      </div>
    </footer>
  );
};


"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6"
    >
      <div className="text-center max-w-2xl">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold uppercase tracking-tight mb-6"
        >
          PAYMENT RECEIVED.
        </motion.h1>
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8"
        >
          YOUR DROP IS SECURED.
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-zinc-400 mb-12"
        >
          An M-Pesa/Card receipt has been sent to your email.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="inline-block bg-zinc-50 text-zinc-950 px-8 py-4 font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}




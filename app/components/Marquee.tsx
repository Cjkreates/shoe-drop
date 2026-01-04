"use client";

import { motion } from "framer-motion";

export const Marquee = () => {
  const text = "WORLDWIDE SHIPPING • LIMITED DROP • AERO V1 AVAILABLE NOW • ";

  return (
    <div className="w-full overflow-hidden bg-zinc-50 text-zinc-950">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-100%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        <span className="text-sm font-bold uppercase px-4 py-2 inline-block">
          {text}
          {text}
          {text}
          {text}
          {text}
          {text}
        </span>
        <span className="text-sm font-bold uppercase px-4 py-2 inline-block">
          {text}
          {text}
          {text}
          {text}
          {text}
          {text}
        </span>
      </motion.div>
    </div>
  );
};


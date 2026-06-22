"use client";

import { motion } from "framer-motion";

export default function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line py-5">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {row.map((it, i) => (
          <span
            key={i}
            className="font-display text-2xl font-semibold tracking-tight text-fg/70 sm:text-3xl"
          >
            {it}
            <span className="mx-10 text-warm">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

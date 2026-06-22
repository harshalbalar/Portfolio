"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { useApp } from "./AppProvider";

function AgentLog({ lines }) {
  const [done, setDone] = useState([]);
  const [current, setCurrent] = useState("");
  const idx = useRef(0);
  const char = useRef(0);

  useEffect(() => {
    setDone([]);
    setCurrent("");
    idx.current = 0;
    char.current = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(lines);
      return;
    }
    let timer;
    const type = () => {
      if (idx.current >= lines.length) return;
      const line = lines[idx.current];
      if (char.current <= line.length) {
        setCurrent(line.slice(0, char.current));
        char.current += 1;
        timer = setTimeout(type, 26 + Math.random() * 40);
      } else {
        setDone((d) => [...d, line]);
        setCurrent("");
        idx.current += 1;
        char.current = 0;
        timer = setTimeout(type, 360);
      }
    };
    timer = setTimeout(type, 700);
    return () => clearTimeout(timer);
  }, [lines]);

  return (
    <div className="w-full max-w-md rounded-xl border border-line bg-surface/60 p-4 font-mono text-[12.5px] leading-relaxed text-muted backdrop-blur sm:text-[13px]">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-warm/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-cool/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <span className="ml-2 text-[10px] uppercase tracking-widest text-muted/70">agent.log</span>
      </div>
      {done.map((l, i) => (
        <div key={i}>
          <span className="text-cool">›</span> {l}
        </div>
      ))}
      {current !== "" || done.length < lines.length ? (
        <div>
          <span className="text-cool">›</span> {current}
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-warm" />
        </div>
      ) : null}
    </div>
  );
}

export default function Hero() {
  const { t, lang } = useApp();
  const words = profile.name.split(" ");
  const logLines = profile.agentLog[lang] || profile.agentLog.en;

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 sm:px-8">
        <h1 className="font-display font-extrabold leading-[0.86] tracking-tight">
          {words.map((w, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block text-[16vw] sm:text-[13vw] lg:text-[11rem]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === words.length - 1 ? (
                  <span className="bg-gradient-to-r from-warm via-fg to-cool bg-clip-text text-transparent">
                    {w}
                  </span>
                ) : (
                  w
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.hero.intro}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
          >
            <AgentLog lines={logLines} />
          </motion.div>
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-14 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted hover:text-fg"
        >
          <span className="animate-bounce">↓</span>{` ${t.hero.scroll}`}
        </motion.a>
      </div>
    </section>
  );
}

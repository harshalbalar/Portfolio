"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { profile } from "@/lib/data";
import { useApp } from "./AppProvider";

export default function Nav() {
  const { t, lang, toggleLang, theme, toggleTheme } = useApp();
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const tick = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: profile.timezone,
          }).format(new Date())
        );
      } catch {
        setTime("");
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-ink/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="font-mono text-xs tracking-widest text-fg/90">
          {`© ${profile.name.split(" ")[0].toUpperCase()}`}
        </a>

        <nav className="hidden items-center gap-7 font-mono text-[11px] uppercase tracking-widest text-muted lg:flex">
          <a className="link-underline hover:text-fg" href="#about">{t.nav.about}</a>
          <a className="link-underline hover:text-fg" href="#skills">{t.nav.skills}</a>
          <a className="link-underline hover:text-fg" href="#work">{t.nav.work}</a>
          <a className="link-underline hover:text-fg" href="#contact">{t.nav.contact}</a>
        </nav>

        <div className="flex items-center gap-3 font-mono text-[11px] text-muted">
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="interactive flex items-center gap-1 rounded-full border border-line px-2.5 py-1 uppercase tracking-widest hover:text-fg"
          >
            <span className={lang === "de" ? "text-fg" : ""}>DE</span>
            <span className="opacity-40">/</span>
            <span className={lang === "en" ? "text-fg" : ""}>EN</span>
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="interactive flex h-7 w-7 items-center justify-center rounded-full border border-line hover:text-fg"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
          <span className="relative flex h-2 w-2">
            {profile.available && (
              <>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cool opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cool" />
              </>
            )}
          </span>
          <span className="hidden tabular-nums sm:inline">{`${time} CET`}</span>
        </div>
      </div>
    </motion.header>
  );
}

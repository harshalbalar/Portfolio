"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict } from "@/lib/i18n";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLangState] = useState("de");
  const [theme, setThemeState] = useState("dark");

  // Sync from what the inline <head> script already applied (no flash).
  useEffect(() => {
    const el = document.documentElement;
    const storedTheme = el.getAttribute("data-theme") || "dark";
    const storedLang = el.getAttribute("lang") || "de";
    setThemeState(storedTheme);
    setLangState(storedLang);
  }, []);

  const setTheme = (t) => {
    setThemeState(t);
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
  };
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const setLang = (l) => {
    setLangState(l);
    document.documentElement.setAttribute("lang", l);
    try {
      localStorage.setItem("lang", l);
    } catch {}
  };
  const toggleLang = () => setLang(lang === "de" ? "en" : "de");

  return (
    <AppContext.Provider value={{ lang, setLang, toggleLang, theme, setTheme, toggleTheme, t: dict[lang] }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

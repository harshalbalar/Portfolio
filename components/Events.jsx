"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight, FiImage, FiCalendar, FiMapPin, FiArrowRight } from "react-icons/fi";
import Reveal from "./Reveal";
import { events } from "@/lib/data";
import { useApp } from "./AppProvider";

function Chip({ children, subtle }) {
  return (
    <span className={`rounded-full px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide ${subtle ? "bg-fg/[0.06] text-muted" : "bg-warm/15 text-warm"}`}>
      {children}
    </span>
  );
}

export default function Events() {
  const { t, lang } = useApp();
  const [detail, setDetail] = useState(null);          // event for detail popup
  const [gallery, setGallery] = useState(null);        // { ev, index } for fullscreen gallery

  const next = useCallback(() => setGallery((g) => g && { ...g, index: (g.index + 1) % g.ev.images.length }), []);
  const prev = useCallback(() => setGallery((g) => g && { ...g, index: (g.index - 1 + g.ev.images.length) % g.ev.images.length }), []);

  useEffect(() => {
    if (!gallery) return;
    const onKey = (e) => {
      if (e.key === "Escape") setGallery(null);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gallery, next, prev]);

  useEffect(() => {
    const open = detail || gallery;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [detail, gallery]);

  return (
    <section id="events" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{`04 — ${t.events.eyebrow}`}</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{t.events.heading}</h2>
        <p className="mt-4 max-w-xl text-base text-muted">{t.events.subtitle}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev, i) => (
          <Reveal key={ev.title} delay={(i % 3) * 0.07}>
            <article className="card interactive group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/40 transition-colors hover:border-fg/25 hover:bg-surface">
              <button onClick={() => setDetail(ev)} className="relative block aspect-[16/10] w-full overflow-hidden">
                <img src={ev.images[0]} alt={ev.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/65 px-2 py-1 font-mono text-[10px] text-white backdrop-blur">
                  <FiImage className="text-[11px]" /> {ev.images.length} {t.events.media}
                </span>
              </button>

              <div className="flex flex-1 flex-col p-6">
                <button onClick={() => setDetail(ev)} className="text-left">
                  <h3 className="font-display text-xl font-semibold leading-tight tracking-tight hover:text-warm">{ev.title}</h3>
                </button>
                <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted"><FiCalendar /> {ev.date[lang]}</div>
                <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-muted"><FiMapPin /> {ev.location}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{ev.about[lang]}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {ev.tags.slice(0, 3).map((tag) => <Chip key={tag}>{tag}</Chip>)}
                  {ev.tags.length > 3 && <Chip subtle>+{ev.tags.length - 3}</Chip>}
                </div>

                <button
                  onClick={() => setGallery({ ev, index: 0 })}
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-cool hover:text-fg"
                >
                  {t.events.viewGallery} <FiArrowRight />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* DETAIL POPUP */}
      <AnimatePresence>
        {detail && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setDetail(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-line bg-ink"
            >
              <button onClick={() => setDetail(null)} className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70" aria-label="Close"><FiX /></button>
              <button onClick={() => { const ev = detail; setDetail(null); setGallery({ ev, index: 0 }); }} className="relative block aspect-[16/9] w-full overflow-hidden">
                <img src={detail.images[0]} alt={detail.title} className="h-full w-full object-cover" />
              </button>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold tracking-tight">{detail.title}</h3>
                <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-muted"><FiCalendar /> {detail.date[lang]}</div>
                <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-muted"><FiMapPin /> {detail.location}</div>

                <div className="mt-5 border-t border-line pt-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{t.events.about}</p>
                  <p className="mt-2 text-sm leading-relaxed text-fg/90">{detail.about[lang]}</p>
                </div>

                <div className="mt-5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{t.events.topics}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">{detail.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
                </div>

                <button
                  onClick={() => { const ev = detail; setDetail(null); setGallery({ ev, index: 0 }); }}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-warm py-3 font-mono text-[12px] font-medium uppercase tracking-widest text-ink transition-opacity hover:opacity-90"
                >
                  <FiImage /> {t.events.viewGallery} ({detail.images.length} {t.events.media})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN GALLERY */}
      <AnimatePresence>
        {gallery && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setGallery(null)}
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button onClick={() => setGallery(null)} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10" aria-label="Close"><FiX /></button>

            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 sm:left-8" aria-label="Previous"><FiChevronLeft className="text-xl" /></button>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 sm:right-8" aria-label="Next"><FiChevronRight className="text-xl" /></button>

            <AnimatePresence mode="wait">
              <motion.img
                key={gallery.index}
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                src={gallery.ev.images[gallery.index]}
                alt=""
                onClick={(e) => e.stopPropagation()}
                className="max-h-[78vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              />
            </AnimatePresence>

            <div className="mt-5 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2">
                {gallery.ev.images.map((_, idx) => (
                  <button key={idx} onClick={() => setGallery((g) => ({ ...g, index: idx }))} className={`h-1.5 rounded-full transition-all ${idx === gallery.index ? "w-6 bg-warm" : "w-1.5 bg-white/30 hover:bg-white/50"}`} aria-label={`Go to image ${idx + 1}`} />
                ))}
              </div>
              <p className="font-mono text-xs text-white/80">{gallery.index + 1} / {gallery.ev.images.length}</p>
              <p className="font-mono text-[10px] text-white/40">{t.events.navHint}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

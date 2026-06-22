"use client";

import { motion } from "framer-motion";
import { profile, socials } from "@/lib/data";
import { useApp } from "./AppProvider";

export default function Contact() {
  const { t } = useApp();
  return (
    <footer id="contact" className="relative border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {`04 — ${t.contact.eyebrow}`}
        </p>

        <motion.a
          href={`mailto:${profile.email}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="interactive group block font-display text-[11vw] font-extrabold leading-[0.9] tracking-tight lg:text-[8.5rem]"
        >
          <span className="bg-gradient-to-r from-warm via-fg to-cool bg-clip-text text-transparent">
            {t.contact.cta1}
          </span>
          <br />
          <span className="inline-flex items-center gap-4">
            {t.contact.cta2}
            <span className="text-[4vw] transition-transform duration-300 group-hover:translate-x-3 lg:text-5xl">
              ↗
            </span>
          </span>
        </motion.a>

        <div className="mt-16 flex flex-col justify-between gap-10 border-t border-line pt-10 sm:flex-row">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.contact.email}
            </p>
            <a href={`mailto:${profile.email}`} className="link-underline mt-2 inline-block text-lg text-fg">
              {profile.email}
            </a>
            <p className="mt-2 font-mono text-[11px] text-muted">{profile.locationNow}</p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {t.contact.elsewhere}
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link-underline text-lg text-fg">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-muted">
          <span>{`© ${new Date().getFullYear()} — ${t.contact.edition}`}</span>
          <span>{t.contact.built}</span>
        </div>
      </div>
    </footer>
  );
}

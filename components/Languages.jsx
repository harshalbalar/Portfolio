"use client";

import Reveal from "./Reveal";
import { languages } from "@/lib/data";
import { useApp } from "./AppProvider";

export default function Languages() {
  const { t, lang } = useApp();
  return (
    <section id="languages" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {`03 — ${t.languages.eyebrow}`}
        </p>
        <h2 className="mb-14 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          {t.languages.heading}
        </h2>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {languages.map((l, i) => (
          <Reveal key={l.name.en} delay={(i % 4) * 0.06}>
            <div className="h-full bg-ink p-7 transition-colors hover:bg-surface">
              <h3 className="font-display text-2xl font-semibold tracking-tight">{l.name[lang]}</h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-muted">
                {l.level[lang]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

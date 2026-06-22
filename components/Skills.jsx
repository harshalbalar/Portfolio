"use client";

import Reveal from "./Reveal";
import { skillGroups } from "@/lib/data";
import { useApp } from "./AppProvider";

export default function Skills() {
  const { t, lang } = useApp();
  return (
    <section id="skills" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <Reveal>
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {`02 — ${t.skills.eyebrow}`}
        </p>
        <h2 className="mb-14 font-display text-3xl font-bold tracking-tight sm:text-5xl">
          {t.skills.heading}
        </h2>
      </Reveal>

      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.title.en} delay={(i % 3) * 0.06}>
            <div className="h-full bg-ink p-7 transition-colors hover:bg-surface">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {g.title[lang]}
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="interactive rounded-full border border-line px-3 py-1.5 text-sm text-fg/90 transition-colors hover:border-warm hover:text-warm"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import Reveal from "./Reveal";
import { education, languages } from "@/lib/data";
import { useApp } from "./AppProvider";

export default function About() {
  const { t, lang } = useApp();
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <Reveal>
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {`01 — ${t.about.eyebrow}`}
        </p>
      </Reveal>
      <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Reveal>
            <p className="font-display text-2xl font-semibold leading-[1.2] tracking-tight sm:text-4xl">
              {t.about.paragraph}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {t.languages.heading}
              </p>
              <p className="mt-2 text-base text-fg/90">
                {languages.map((l) => `${l.name[lang]} (${l.level[lang]})`).join("  ·  ")}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />
          <div className="flex flex-col gap-10">
            {education.map((e, i) => {
              const accent = e.temp === "warm" ? "bg-warm" : "bg-cool";
              const text = e.temp === "warm" ? "text-warm" : "text-cool";
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="relative pl-8">
                    <span className={`absolute left-0 top-1.5 h-4 w-4 rounded-full ${accent} ring-4 ring-ink`} />
                    <p className={`font-mono text-[11px] uppercase tracking-widest ${text}`}>
                      {`${e.period} · ${e.place[lang]}`}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{e.degree}</h3>
                    <p className="text-sm text-fg/80">{e.school}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{e.focus[lang]}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

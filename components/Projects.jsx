"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar, FiGithub } from "react-icons/fi";
import { autoDescribe } from "@/lib/i18n";
import { useApp } from "./AppProvider";

const LANG_COLOR = {
  Python: "#3DD6C4",
  JavaScript: "#F2D45C",
  TypeScript: "#5C9CF2",
  Java: "#E76F51",
  "C++": "#9B7EDE",
  PHP: "#8892BF",
  HTML: "#FF8A47",
  CSS: "#5C9CF2",
  Jupyter: "#FF8A47",
};

function Card({ p, i, lang }) {
  const live = p.homepage && p.homepage.startsWith("http");
  const description = p.description?.trim() ? p.description : autoDescribe(p, lang);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="interactive group relative flex flex-col justify-between rounded-2xl border border-line bg-surface/40 p-6 transition-colors hover:border-fg/25 hover:bg-surface"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          {live ? (
            <a
              href={p.homepage}
              target="_blank"
              rel="noreferrer"
              className="relative z-10 inline-flex items-center gap-1 rounded-full bg-cool/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cool transition-colors hover:bg-cool/25"
            >
              live ↗
            </a>
          ) : (
            <span />
          )}
          <FiArrowUpRight className="text-xl text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
        </div>

        <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight">
          <a
            href={p.html_url}
            target="_blank"
            rel="noreferrer"
            className="after:absolute after:inset-0 after:content-['']"
          >
            {p.name}
          </a>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{description}</p>

        {p.topics?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.topics.slice(0, 4).map((tg) => (
              <span
                key={tg}
                className="rounded-md bg-fg/[0.05] px-2 py-0.5 font-mono text-[10.5px] text-muted"
              >
                {tg}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          {p.language && (
            <>
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: LANG_COLOR[p.language] || "#8B97A5" }}
              />
              {p.language}
            </>
          )}
        </span>
        <span className="flex items-center gap-3">
          {p.stars > 0 && (
            <span className="flex items-center gap-1">
              <FiStar /> {p.stars}
            </span>
          )}
          <FiGithub />
        </span>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }) {
  const { t, lang } = useApp();
  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <div className="mb-14">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
          {`03 — ${t.work.eyebrow}`}
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">
          {t.work.heading}
        </h2>
      </div>

      {projects.length === 0 ? (
        <p className="font-mono text-sm text-muted">{t.work.empty}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Card key={`${p.name}-${i}`} p={p} i={i} lang={lang} />
          ))}
        </div>
      )}
    </section>
  );
}

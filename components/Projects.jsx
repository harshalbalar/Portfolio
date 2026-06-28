"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUpRight, FiStar, FiGithub, FiPlay, FiX } from "react-icons/fi";
import { autoDescribe } from "@/lib/i18n";
import { projectVideos } from "@/lib/data";
import { useApp } from "./AppProvider";

const LANG_COLOR = {
  Python: "#3DD6C4", JavaScript: "#F2D45C", TypeScript: "#5C9CF2", Java: "#E76F51",
  "C++": "#9B7EDE", PHP: "#8892BF", HTML: "#FF8A47", CSS: "#5C9CF2", Jupyter: "#FF8A47",
};

// Turn a video URL into an embeddable form. Supports YouTube, Loom, Vimeo, direct mp4.
function getEmbed(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");
    if (host.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return { type: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }
    if (host === "youtu.be") return { type: "iframe", src: `https://www.youtube.com/embed${u.pathname}` };
    if (host.includes("loom.com")) return { type: "iframe", src: url.replace("/share/", "/embed/") };
    if (host.includes("vimeo.com")) return { type: "iframe", src: `https://player.vimeo.com/video${u.pathname}` };
    if (u.pathname.endsWith(".mp4") || u.pathname.endsWith(".webm")) return { type: "video", src: url };
    return { type: "iframe", src: url };
  } catch {
    return null;
  }
}

function Card({ p, i, lang, onPlay }) {
  const live = p.homepage && p.homepage.startsWith("http");
  const hasVideo = !!getEmbed(p.video);
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
          <div className="flex flex-wrap items-center gap-2">
            {hasVideo && (
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPlay(p); }}
                className="relative z-10 inline-flex items-center gap-1 rounded-full bg-warm/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-warm transition-colors hover:bg-warm/25"
              >
                <FiPlay className="text-[9px]" /> demo
              </button>
            )}
            {live && (
              <a
                href={p.homepage}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-1 rounded-full bg-cool/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-cool transition-colors hover:bg-cool/25"
              >
                live ↗
              </a>
            )}
          </div>
          <FiArrowUpRight className="text-xl text-muted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
        </div>

        <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight">
          <a href={p.html_url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0 after:content-['']">
            {p.name}
          </a>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">{description}</p>

        {p.topics?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.topics.slice(0, 4).map((tg) => (
              <span key={tg} className="rounded-md bg-fg/[0.05] px-2 py-0.5 font-mono text-[10.5px] text-muted">{tg}</span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          {p.language && (
            <>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: LANG_COLOR[p.language] || "#8B97A5" }} />
              {p.language}
            </>
          )}
        </span>
        <span className="flex items-center gap-3">
          {p.stars > 0 && (<span className="flex items-center gap-1"><FiStar /> {p.stars}</span>)}
          <FiGithub />
        </span>
      </div>
    </motion.div>
  );
}

export default function Projects({ projects }) {
  const { t, lang } = useApp();
  const [video, setVideo] = useState(null); // { project, embed }

  const open = (p) => setVideo({ project: p, embed: getEmbed(p.video) });

  return (
    <section id="work" className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
      <div className="mb-14">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{`03 — ${t.work.eyebrow}`}</p>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-5xl">{t.work.heading}</h2>
      </div>

      {projects.length === 0 ? (
        <p className="font-mono text-sm text-muted">{t.work.empty}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const pv = { ...p, video: p.video || projectVideos[p.name] };
            return <Card key={`${p.name}-${i}`} p={pv} i={i} lang={lang} onPlay={open} />;
          })}
        </div>
      )}

      <AnimatePresence>
        {video?.embed && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setVideo(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <button onClick={() => setVideo(null)} aria-label="Close"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10">
              <FiX />
            </button>
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="aspect-video w-full max-w-4xl overflow-hidden rounded-xl bg-black shadow-2xl"
            >
              {video.embed.type === "video" ? (
                <video src={video.embed.src} controls autoPlay className="h-full w-full" />
              ) : (
                <iframe src={video.embed.src} title="Demo" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full" />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

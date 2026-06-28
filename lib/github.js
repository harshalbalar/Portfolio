import { profile, manualProjects, projectVideos } from "./data";
import { getNotionProjects } from "./notion";

const ghHeaders = () => ({
  Accept: "application/vnd.github+json",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
});

async function ghJson(url) {
  try {
    const res = await fetch(url, { headers: ghHeaders(), next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Turn a README into a clean 1–2 line summary.
export function summarizeReadme(md) {
  if (!md) return "";
  let text = md;
  text = text.replace(/```[\s\S]*?```/g, " ");        // code fences
  text = text.replace(/<[^>]+>/g, " ");                 // html tags
  text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");    // images
  text = text.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");  // links -> text
  text = text.replace(/^\[[^\]]*\]:.*$/gm, " ");        // link defs

  const paras = [];
  let buf = [];
  for (const raw of text.split(/\r?\n/)) {
    let line = raw.trim();
    if (!line) { if (buf.length) { paras.push(buf.join(" ")); buf = []; } continue; }
    if (/^#{1,6}\s/.test(line)) { if (buf.length) { paras.push(buf.join(" ")); buf = []; } continue; }
    if (/^[-*=_]{3,}$/.test(line)) continue;            // horizontal rule
    line = line.replace(/^>\s?/, "").replace(/^[-*+]\s+/, "").replace(/^\d+\.\s+/, "");
    line = line.replace(/[*_`~]/g, "").replace(/\s+/g, " ").trim();
    if (line) buf.push(line);
  }
  if (buf.length) paras.push(buf.join(" "));

  const first = paras.find((p) => p.split(/\s+/).length >= 4) || paras[0] || "";
  if (!first) return "";
  const sentences = first.match(/[^.!?]+[.!?]+/g);
  let summary = sentences ? sentences.slice(0, 2).join(" ").trim() : first;
  const MAX = 180;
  if (summary.length > MAX) summary = summary.slice(0, MAX).replace(/\s+\S*$/, "") + "…";
  return summary;
}

async function readmeSummary(fullName) {
  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}/readme`, {
      headers: { ...ghHeaders(), Accept: "application/vnd.github.raw" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return "";
    return summarizeReadme(await res.text());
  } catch {
    return "";
  }
}

export async function getProjects() {
  const src = profile.projectSource || { mode: "manual" };

  if (src.mode === "manual") return manualProjects;

  if (src.mode === "notion") {
    const notion = await getNotionProjects();
    if (notion && notion.length) return notion.slice(0, 12);
    return manualProjects; // fallback until your Notion DB is connected
  }

  let repos = [];
  if (src.mode === "starred") {
    repos = (await ghJson(`https://api.github.com/users/${profile.github}/starred?per_page=30&sort=updated`)) || [];
  } else {
    const all = (await ghJson(`https://api.github.com/users/${profile.github}/repos?per_page=100&sort=updated&type=owner`)) || [];
    repos = all.filter((r) => !r.fork && !r.archived);
    if (src.mode === "topic") {
      // Only repos you've tagged with the topic — predictable, fully under your control.
      repos = repos.filter((r) => (r.topics || []).includes(src.topic));
    }
  }

  repos = repos
    .sort(
      (a, b) =>
        (b.stargazers_count || 0) - (a.stargazers_count || 0) ||
        new Date(b.updated_at) - new Date(a.updated_at)
    )
    .slice(0, 9);

  const projects = await Promise.all(
    repos.map(async (r) => ({
      name: r.name,
      description: (await readmeSummary(r.full_name)) || r.description || "",
      language: r.language || "",
      topics: r.topics || [],
      html_url: r.html_url,
      homepage: r.homepage || "",
      stars: r.stargazers_count || 0,
      video: projectVideos[r.name] || "",
    }))
  );
  if (src.mode === "topic" && projects.length === 0) return manualProjects; // until you tag repos
  return projects;
}

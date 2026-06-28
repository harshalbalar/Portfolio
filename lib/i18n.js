// UI chrome strings. Content data (bio, education, languages) lives in data.js.
export const dict = {
  de: {
    nav: { about: "Über mich", skills: "Fähigkeiten", languages: "Sprachen", work: "Projekte", events: "Events", contact: "Kontakt" },
    hero: {
      intro:
        "Ich arbeite an der Schnittstelle von Web und maschineller Intelligenz – von animierten, produktionsreifen Interfaces bis zu KI-Systemen und Agenten, die wirklich live gehen.",
      scroll: "scrollen",
    },
    about: {
      eyebrow: "Über mich",
      paragraph:
        "Ich habe in Indien mit Web und Software begonnen und bin dann nach Deutschland gezogen, um mich auf maschinelles Lernen und agentische KI zu spezialisieren. Heute bin ich auf beiden Seiten zu Hause – ich gestalte animierte, produktionsreife Frontends und baue die KI-Systeme dahinter.",
    },
    skills: { eyebrow: "Fähigkeiten", heading: "Das Toolkit" },
    languages: { eyebrow: "Sprachen", heading: "Sprachen" },
    work: {
      eyebrow: "Projekte",
      heading: "Ausgewählte Projekte",
      empty: "Noch keine markierten Repos – markiere ein Repo auf GitHub mit ★ und es erscheint hier.",
    },
    events: {
      eyebrow: "Events",
      heading: "Featured Events",
      subtitle: "Konferenzen und Karriere-Events, die ich besucht habe.",
      about: "Über dieses Event",
      topics: "Themen & Skills",
      viewGallery: "Galerie ansehen",
      media: "Medien",
      navHint: "Mit den Pfeiltasten navigieren. ESC zum Schließen.",
    },
    contact: {
      eyebrow: "Kontakt",
      cta1: "Lass uns",
      cta2: "zusammenarbeiten",
      email: "E-Mail",
      elsewhere: "Woanders",
      built: "Gebaut mit Next.js · deployed auf Vercel",
      edition: "Ausgabe 2025",
    },
    theme: { toLight: "Hell", toDark: "Dunkel" },
  },
  en: {
    nav: { about: "About", skills: "Skills", languages: "Languages", work: "Work", events: "Events", contact: "Contact" },
    hero: {
      intro:
        "I build at the seam between web and machine intelligence — from animated, production-grade interfaces to AI systems and agents that actually ship.",
      scroll: "scroll",
    },
    about: {
      eyebrow: "About",
      paragraph:
        "I started in web and software back in India, then moved to Germany to go deep on machine learning and agentic AI. Today I sit comfortably on both sides — designing animated, production-grade front ends and building the AI systems behind them.",
    },
    skills: { eyebrow: "Skills", heading: "The toolkit" },
    languages: { eyebrow: "Languages", heading: "Languages" },
    work: {
      eyebrow: "Work",
      heading: "Selected projects",
      empty: "No starred repos yet — star a repo on GitHub and it appears here.",
    },
    events: {
      eyebrow: "Events",
      heading: "Featured Events",
      subtitle: "Conferences and career events I've attended.",
      about: "About This Event",
      topics: "Topics & Skills",
      viewGallery: "View Gallery",
      media: "media",
      navHint: "Use arrow keys to navigate. Press ESC to close.",
    },
    contact: {
      eyebrow: "Contact",
      cta1: "Let's work",
      cta2: "together",
      email: "Email",
      elsewhere: "Elsewhere",
      built: "Built with Next.js · deployed on Vercel",
      edition: "2025 Edition",
    },
    theme: { toLight: "Light", toDark: "Dark" },
  },
};

// Build a project description from repo metadata when GitHub has none.
export function autoDescribe(p, lang) {
  const pretty = (p.name || "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
  const topics = (p.topics || []).slice(0, 3).join(", ");
  if (lang === "de") {
    let s = `${pretty} – ein ${p.language || "Code"}-Projekt`;
    if (topics) s += `, das sich mit ${topics} beschäftigt`;
    return s + ".";
  }
  let s = `${pretty} — a ${p.language || "code"} project`;
  if (topics) s += ` exploring ${topics}`;
  return s + ".";
}

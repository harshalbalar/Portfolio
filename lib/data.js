// Single source of truth for editable content.
// Bilingual fields use { en, de }.

export const profile = {
  name: "Harshal Balar",
  role: "AI & Web Developer",
  github: "harshalbalar", // starred repos are pulled from here
  email: "balarharshal2002@gmail.com",
  locationNow: "Braunschweig, DE",
  timezone: "Europe/Berlin",
  available: true,
  // Project source. mode:
  //   "manual"  -> the projectsList array below (static; just edit this file)
  //   "notion"  -> a Notion database (see NOTION_SETUP.md)
  //   "topic"   -> your own GitHub repos tagged with `topic`
  //   "repos"   -> all your own public repos     |   "starred" -> repos you've starred
  projectSource: { mode: "topic", topic: "portfolio" },
  intro:
    "I build at the seam between web and machine intelligence — animated, production-grade interfaces and the AI systems behind them.",
  // Hero agent-log lines (bilingual).
  agentLog: {
    de: [
      "initialisiere agent · harshal.balar",
      "fokus: ml · agentic ai · genai",
      "aktuell: entwickle agentische ki-systeme",
      "status: offen für zusammenarbeit_",
    ],
    en: [
      "initializing agent · harshal.balar",
      "focus: ml · agentic ai · genai",
      "currently: building agentic ai systems",
      "status: open to collaboration_",
    ],
  },
};

export const education = [
  {
    temp: "cool",
    period: "04/2024 – Present",
    degree: "M.Sc. Digital Technologies",
    school: "Ostfalia University of Applied Sciences",
    place: { en: "Germany", de: "Deutschland" },
    focus: {
      en: "Machine Learning · Agentic AI · Generative AI",
      de: "Maschinelles Lernen · Agentische KI · Generative KI",
    },
  },
  {
    temp: "warm",
    period: "06/2020 – 04/2023",
    degree: "B.Sc. Information Technology",
    school: "Uka Tarsadia University",
    place: { en: "India", de: "Indien" },
    focus: {
      en: "Programming · Databases · Web Dev · Software Engineering · OS & Networks",
      de: "Programmierung · Datenbanken · Webentwicklung · Software Engineering · Betriebssysteme & Netzwerke",
    },
  },
];

export const skillGroups = [
  { title: { en: "Programming", de: "Programmierung" }, items: ["Python", "JavaScript", "TypeScript", "Java", "C++", "PHP"] },
  { title: { en: "Web Development", de: "Webentwicklung" }, items: ["React", "Next.js", "Node.js", "HTML5", "CSS3", "Tailwind", "Bootstrap", "jQuery", "GSAP"] },
  { title: { en: "AI / ML", de: "KI / ML" }, items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face", "LangChain", "RAG", "Agentic AI", "GenAI", "Computer Vision", "OpenCV"] },
  { title: { en: "Databases", de: "Datenbanken" }, items: ["MySQL", "MongoDB", "SQLite", "PostgreSQL"] },
  { title: { en: "Tools & Cloud", de: "Tools & Cloud" }, items: ["Git", "GitHub", "Docker", "Streamlit", "Vercel", "Render", "ROS"] },
];

// Spoken languages. NOTE: proficiency levels are guesses — edit to match reality.
export const languages = [
  { name: { en: "English", de: "Englisch" }, level: { en: "Professional", de: "Verhandlungssicher" } },
  { name: { en: "German", de: "Deutsch" }, level: { en: "Conversational", de: "Gute Kenntnisse" } },
  { name: { en: "Hindi", de: "Hindi" }, level: { en: "Native", de: "Muttersprache" } },
  { name: { en: "Gujarati", de: "Gujarati" }, level: { en: "Native", de: "Muttersprache" } },
];

// Your projects (static). Add/edit/remove entries here, then commit & push to update the site.
// Copy a block to add a new one. `homepage` = the live deploy URL (becomes the "live ↗" button; "" hides it).
export const manualProjects = [
  {
    name: "TurtleBot Card Detection",
    description: "Computer-vision pipeline on a TurtleBot that detects and classifies cards in real time.",
    language: "Python",
    topics: ["computer-vision", "robotics", "ros"],
    html_url: "https://github.com/harshalbalar/Turtlebot-card-detection",
    homepage: "",
    stars: 0,
  },
  {
    name: "Streamlit AI App",
    description: "Interactive ML / data app deployed on Streamlit Cloud.",
    language: "Python",
    topics: ["streamlit", "machine-learning"],
    html_url: "https://github.com/harshalbalar",
    homepage: "https://kqfz7cfqf44khxqe5kfrga.streamlit.app/",
    stars: 0,
  },
  {
    name: "Noted",
    description: "Full-stack note-taking app deployed on Render.",
    language: "JavaScript",
    topics: ["fullstack", "web-app"],
    html_url: "https://github.com/harshalbalar",
    homepage: "https://noted-ut5g.onrender.com/",
    stars: 0,
  },
];

// Conferences / events. Each event shows its photos in a gallery.
// Conferences / events. Each opens a detail popup and a full-screen gallery.
export const events = [
  {
    title: "ITCS 2026 — IT & Career Summit",
    year: "2026",
    date: { en: "June 2026", de: "Juni 2026" },
    location: "Hamburg, Germany",
    about: {
      en: "Returned to ITCS Hamburg — Germany's IT & Career Summit, blending a tech conference, IT job fair, and festival. Attended talks on AI and software engineering, met product and engineering teams, and explored Werkstudent and graduate opportunities.",
      de: "Erneut auf der ITCS Hamburg — Deutschlands IT & Career Summit aus Tech-Konferenz, IT-Jobmesse und Festival. Talks zu KI und Software-Engineering besucht, Produkt- und Engineering-Teams getroffen und Werkstudenten- sowie Einstiegsmöglichkeiten erkundet.",
    },
    tags: ["Tech Conference", "IT Job Fair", "AI", "Networking", "Recruiting"],
    images: ["/events/itcs-2026-1.jpg", "/events/itcs-2026-2.jpg"],
  },
  {
    title: "ITCS 2025 — IT & Career Summit",
    year: "2025",
    date: { en: "July 2025", de: "Juli 2025" },
    location: "Hamburg, Germany",
    about: {
      en: "Attended ITCS Hamburg, the IT & Career Summit — a tech conference, IT job fair, and festival. Connected with companies across the German tech scene, explored AI and software roles, and grew my professional network.",
      de: "Besuch der ITCS Hamburg, dem IT & Career Summit — Tech-Konferenz, IT-Jobmesse und Festival. Austausch mit Unternehmen der deutschen Tech-Szene, Einblicke in KI- und Software-Rollen und Ausbau meines Netzwerks.",
    },
    tags: ["Tech Conference", "IT Job Fair", "AI", "Career", "Networking"],
    images: ["/events/itcs-2025-1.jpg", "/events/itcs-2025-2.jpg", "/events/itcs-2025-3.jpg"],
  },
];

// Optional demo videos per project, keyed by GitHub repo name (or manualProjects name).
// Add a URL to show a "Demo" button on that card. Supports YouTube, Loom, Vimeo, or a
// direct .mp4 link. Leave a repo out (or empty) and no demo button appears for it.
export const projectVideos = {
  // "ask-vela-RAG-assistant": "https://youtu.be/your-video-id",
  // "docmind-ai": "https://www.loom.com/share/your-id",
};

export const socials = [
  { label: "GitHub", href: "https://github.com/harshalbalar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harshal-balar-a37b24235/" },
  { label: "Instagram", href: "https://www.instagram.com/harshalbalar/" },
  { label: "Twitter", href: "https://twitter.com/HarshalBalar" },
];

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
  // How projects are pulled from GitHub. mode:
  //   "topic"   -> your own repos tagged with `topic` (recommended; falls back to recent repos if none tagged)
  //   "repos"   -> all your own public repos (non-fork, non-archived)
  //   "starred" -> repos you've starred (old behaviour)
  // Project source. mode:
  //   "notion"  -> a Notion database (set NOTION_TOKEN + NOTION_DATABASE_ID env vars; see NOTION_SETUP.md)
  //   "topic"   -> your own repos tagged with `topic` on GitHub
  //   "repos"   -> all your own public repos
  //   "starred" -> repos you've starred
  // While Notion isn't configured yet, the manualProjects list below is shown.
  projectSource: { mode: "notion", topic: "portfolio" },
  // Optional: rename if your Notion columns differ from the defaults.
  // notion: { props: { name:"Name", description:"Description", live:"Live URL", repo:"Repo URL", language:"Language", tags:"Tags", order:"Order", published:"Published" } },
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

// Shown until your Notion database is connected (or if Notion is unreachable).
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
  {
    name: "Vela RAG Assistant ",
    description: "Production-style RAG assistant over a company knowledge base — hybrid search, cross-encoder re-ranking, and measured retrieval + answer-quality evaluation. FastAPI + Gemini.",
    language: "Python",
    topics: ["fullstack", "web-app"],
    html_url: "https://github.com/harshalbalar/ask-vela-RAG-assistant.git",
    homepage: "",
    stars: 0,
  },
  {
    name: "AssemblyAI Universal Transcriber",
    description: "A dynamic Gradio web application that transcribes both audio and video files using AssemblyAI's Universal models. It automatically detects the language and displays the appropriate media player preview based on your upload.",
    language: "Python",
    topics: ["fullstack", "web-app"],
    html_url: "https://github.com/harshalbalar/assemblyai-transcriber.git",
    homepage: "https://huggingface.co/spaces/Harshalbalar/Universal-Transcriber",
    stars: 0,
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/harshalbalar" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/harshal-balar-a37b24235/" },
  { label: "Instagram", href: "https://www.instagram.com/harshalbalar/" },
  { label: "Twitter", href: "https://twitter.com/HarshalBalar" },
];

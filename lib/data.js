export const PROFILE = {
  name: "Rakshit Yadav",
  role: "Full-Stack & AI Developer",
  motto: "Think like an engineer. Build like a racer.",
  tagline: "Crafting modern web applications backed by intelligent systems.",
  bio: "I'm drawn to the details that make things work better: cleaner systems, smarter solutions, and every millisecond worth optimizing. For me, building software is a constant race between a good idea and a better execution.",
  email: "rakshityadav006@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Rakshit6456" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rakshit-yadav-7290b6256/" },
    { label: "Twitter / X", href: "https://x.com/rakshityadav006" },
  ],
};

export const EXPERIENCE = [
  {
    role: "Frontend Developer Intern",
    company: "QNNX",
    place: "Gurugram, India",
    period: "Jul — Aug 2026",
    length: "2 months",
  },
];

export const RESUME = "/Rakshit-Yadav-resume.pdf";

export const STATS = [
  { value: 1, suffix: "+", label: "Years building" },
  { value: 5, suffix: "+", label: "Projects shipped" },
  { value: 12, suffix: "+", label: "Technologies used" },
];

export const PROJECTS = [
  {
    id: "project-1",
    title: "UniSecureShare",
    kind: "Role-based university portal",
    description:
      "A role-based portal for IILM University with dedicated student, faculty, and admin dashboards for secure file sharing, announcements, timetables, and assignments.",
    tags: ["Next.js", "React", "Role-Based Access"],
    href: "https://github.com/Rakshit6456/UniSecureShare",
    demo: "https://unisecurshare-preview.vercel.app",
    image: "/projects/unisecureshare.webp",
  },
  // {
  //   id: "project-2",
  //   title: "Highlyt",
  //   description:
  //     "Paste a YouTube URL and get auto-captioned, vertical highlight clips — transcription, highlight detection, and face-tracked cropping all run client-side in the browser.",
  //   tags: ["React", "Express", "Hugging Face", "MediaPipe"],
  //   href: "https://github.com/Rakshit6456/Highlyt",
  //   demo: "https://highlyt-web.vercel.app",
  //   image: "/projects/highlyt.webp",
  // },
  {
    id: "project-3",
    title: "ApexF1",
    kind: "Live data web app",
    description:
      "An F1 hub with live standings, race results, head-to-head driver comparisons, a race calendar, and news, wrapped in an animated Next.js interface.",
    tags: ["Next.js", "Three.js", "Tailwind", "Radix UI"],
    href: "https://github.com/Rakshit6456/apex-f1",
    demo: "https://apexf1-hub.vercel.app",
    image: "/projects/apexf1.webp",
  },
  {
    id: "project-4",
    title: "RaiseIt",
    kind: "Full-stack complaint platform",
    description:
      "A campus complaint management platform for IILM University — students report issues, departments resolve them, and admins get full oversight, with Gemini-powered image verification and duplicate-aware severity escalation.",
    tags: ["Next.js", "Firebase", "Gemini AI", "Recharts"],
    href: "https://github.com/Rakshit6456/RaiseIt",
    demo: null,
    image: "/projects/raiseit.webp",
  },
];

export const MOCKUPS = [
  { id: "apexf1", title: "ApexF1", note: "Race results and head-to-head", src: "/mockups/apexf1.webp" },
  { id: "yapye", title: "YapYe", note: "Quote archive, on mobile", src: "/mockups/yapye.webp" },
  { id: "unisecureshare", title: "UniSecureShare", note: "Student dashboard", src: "/mockups/unisecureshare.webp" },
  { id: "raiseit", title: "RaiseIt", note: "Campus complaint platform", src: "/mockups/raiseit.webp" },
];

export const HORIZONTAL_SCROLL_ITEMS = [
  "Design",
  "Develop",
  "Deploy",
  "Iterate",
  "Ship",
  "Repeat",
];

export const SKILLS = [
  {
    category: "Languages",
    items: [
      { name: "C", icon: "c" },
      { name: "Python", icon: "py" },
      { name: "Java", icon: "java" },
      { name: "JavaScript", icon: "js" },
      { name: "TypeScript", icon: "ts" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Three.js", src: "/tools/threejs.svg", plate: "light" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Firebase", icon: "firebase" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    category: "Tooling",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Linux", icon: "linux" },
      { name: "Claude Code", src: "/tools/claude-code.svg" },
      { name: "ChatGPT", src: "/tools/chatgpt.svg", plate: "light" },
      { name: "Antigravity", src: "/tools/antigravity.svg" },
    ],
  },
  {
    category: "Creative",
    items: [
      { name: "Figma", icon: "figma" },
      { name: "CapCut", src: "/tools/capcut.svg", plate: "dark" },
    ],
  },
];

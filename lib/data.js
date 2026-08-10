export const PROFILE = {
  name: "Rakshit Yadav",
  role: "Full-Stack & AI Developer",
  tagline: "Crafting modern web applications backed by intelligent systems.",
  bio: "I'm a full-stack developer passionate about building products that solve real-world problems. I enjoy turning ideas into fast, intuitive web applications by combining thoughtful design, scalable backends, and modern technologies. Every project is an opportunity to learn, experiment, and create something meaningful.",
  email: "rakshityadav006@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Rakshit6456" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rakshit-yadav-7290b6256/" },
    { label: "Twitter / X", href: "https://x.com/rakshityadav006" },
  ],
};

export const STATS = [
  { value: 1, suffix: "+", label: "Years building" },
  { value: 5, suffix: "+", label: "Projects shipped" },
  { value: 12, suffix: "+", label: "Technologies used" },
];

export const PROJECTS = [
  {
    id: "01",
    title: "UniSecureShare",
    description:
      "A role-based portal for IILM University with dedicated student, faculty, and admin dashboards for secure file sharing, announcements, timetables, and assignments.",
    tags: ["Next.js", "React", "Role-Based Access"],
    href: "https://github.com/Rakshit6456/UniSecureShare",
    demo: "https://unisecurshare-preview.vercel.app",
    image: "/projects/unisecureshare.webp",
  },
  {
    id: "02",
    title: "Highlyt",
    description:
      "Paste a YouTube URL and get auto-captioned, vertical highlight clips — transcription, highlight detection, and face-tracked cropping all run client-side in the browser.",
    tags: ["React", "Express", "Hugging Face", "MediaPipe"],
    href: "https://github.com/Rakshit6456/Highlyt",
    demo: "https://highlyt-web.vercel.app",
    image: "/projects/highlyt.webp",
  },
  {
    id: "03",
    title: "ApexF1",
    description:
      "An F1 hub with live standings, race results, head-to-head driver comparisons, a race calendar, and news, wrapped in an animated Next.js interface.",
    tags: ["Next.js", "Three.js", "Tailwind", "Radix UI"],
    href: "https://github.com/Rakshit6456/apex-f1",
    demo: "https://apexf1-hub.vercel.app",
    image: "/projects/apexf1.webp",
  },
  {
    id: "04",
    title: "RaiseIt",
    description:
      "A campus complaint management platform for IILM University — students report issues, departments resolve them, and admins get full oversight, with Gemini-powered image verification and duplicate-aware severity escalation.",
    tags: ["Next.js", "Firebase", "Gemini AI", "Recharts"],
    href: "https://github.com/Rakshit6456/RaiseIt",
    demo: null,
    image: "/projects/raiseit.webp",
  },
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
    category: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "ts" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Three.js", icon: "threejs" },
    ],
  },
  {
    category: "Backend & Cloud",
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
    ],
  },
];

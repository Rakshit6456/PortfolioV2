import { Archivo, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { PROFILE, PROJECTS, SKILLS } from "../lib/data";

const SITE = "https://rakshityadav.is-a.dev";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: `${PROFILE.name} — Portfolio`,
      inLanguage: "en",
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: PROFILE.name,
      jobTitle: PROFILE.role,
      description: PROFILE.bio,
      url: SITE,
      email: `mailto:${PROFILE.email}`,
      image: `${SITE}/opengraph-image`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gurugram",
        addressCountry: "IN",
      },
      sameAs: PROFILE.socials.map((s) => s.href),
      knowsAbout: SKILLS.flatMap((g) => g.items.map((i) => i.name)),
      workedFor: { "@type": "Organization", name: "QNNX" },
    },
    ...PROJECTS.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      description: p.description,
      url: p.demo || p.href,
      sameAs: p.href,
      author: { "@id": `${SITE}/#person` },
      keywords: p.tags.join(", "),
    })),
  ],
};

const sans = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
});
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata = {
  metadataBase: new URL("https://rakshityadav.is-a.dev"),
  alternates: { canonical: "/" },
  title: "Rakshit Yadav — Full-Stack & AI Developer Portfolio",
  description:
    "Explore projects, web development experience, and software engineering work by Rakshit Yadav, a Computer Science student at IILM University..",
  keywords: ["Rakshit Yadav", "full-stack developer", "AI developer", "Next.js", "React", "portfolio", "Gurugram"],
  authors: [{ name: "Rakshit Yadav" }],
  openGraph: {
    title: "Rakshit Yadav — Full-Stack & AI Developer",
    description:
      "Full-stack and AI developer building modern web applications backed by intelligent systems.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rakshit Yadav — Full-Stack & AI Developer",
    description:
      "Full-stack and AI developer building modern web applications backed by intelligent systems.",
    creator: "@rakshityadav006",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// sets the theme before first paint so there is no flash
const THEME_INIT = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

"use client";

import { useSmoothScroll } from "../lib/useSmoothScroll";
import { Header } from "../components/Header";
import { Cursor } from "../components/Cursor";
import { SocialRail } from "../components/SocialRail";
import { useReveal } from "../lib/useReveal";
import { useEmail } from "../lib/useEmail";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";

const NAV_ITEMS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Contact", href: "#contact" },
];

export default function Page() {
  const { email, href } = useEmail();
  useSmoothScroll();
  useReveal();

  return (
    <>
      <Cursor />
      <SocialRail />
      <Header items={NAV_ITEMS} email={email} mailHref={href} />
      <a className="skip-link" href="#work">Skip to content</a>
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
        <Analytics />
      </main>
    </>
  );
}

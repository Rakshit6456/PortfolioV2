"use client";

import { useSmoothScroll } from "../lib/useSmoothScroll";
import PillNav from "../components/PillNav";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { HorizontalScroller } from "../components/HorizontalScroller";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Toolkit", href: "#toolkit" },
  { label: "Contact", href: "#contact" },
];

export default function Page() {
  useSmoothScroll();

  return (
    <>
      <PillNav
        logo="/favicon.svg"
        logoAlt="Rakshit Yadav"
        items={NAV_ITEMS}
        baseColor="var(--accent)"
        pillColor="var(--bg)"
        hoveredPillTextColor="var(--bg)"
      />
      <main>
        <Hero />
        <About />
        <HorizontalScroller />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

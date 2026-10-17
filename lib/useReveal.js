"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Rises every [data-reveal] element once as it enters, staggered within a batch.
export function useReveal() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = gsap.utils.toArray("[data-reveal]");
      gsap.set(targets, { y: 28, opacity: 0 });
      ScrollTrigger.batch(targets, {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.08 }),
      });
    });
    return () => mm.revert();
  }, []);
}

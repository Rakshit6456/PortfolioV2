"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "../lib/data";

const Scene = dynamic(() => import("./Scene").then((m) => m.Scene), {
  ssr: false,
});

export function Hero() {
  const sectionRef = useRef(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <div className="hero__canvas">
        <Scene scrollProgress={scrollProgress} />
      </div>
      <div className="hero__vignette" />
      <div className="hero__content">
        <p className="hero__eyebrow">Hello I Am</p>
        <h1 className="hero__name">{PROFILE.name}</h1>
        <p className="hero__role">{PROFILE.role}</p>
        <p className="hero__tagline">{PROFILE.tagline}</p>
      </div>
      <div className="hero__scrollcue">
        <span />
        Scroll
      </div>
    </section>
  );
}

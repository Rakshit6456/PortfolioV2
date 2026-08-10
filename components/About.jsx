"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PROFILE, STATS } from "../lib/data";

export function About() {
  const rootRef = useRef(null);
  const statRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about__bio", {
        y: 40,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      STATS.forEach((stat, i) => {
        const el = statRefs.current[i];
        if (!el) return;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(counter.value) + stat.suffix;
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={rootRef}>
      <div className="about__grid">
        <div>
          <p className="section-label">About</p>
          <p className="about__bio">{PROFILE.bio}</p>
        </div>
        <div className="about__stats">
          {STATS.map((stat, i) => (
            <div className="stat" key={stat.label}>
              <span
                className="stat__value"
                ref={(el) => {
                  statRefs.current[i] = el;
                }}
              >
                0{stat.suffix}
              </span>
              <span className="stat__label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

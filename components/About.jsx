"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PROFILE, STATS } from "../lib/data";

const WORDS = PROFILE.bio.split(" ");

export function About() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const statRefs = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // the section pins while the bio lights up letter by letter
      gsap.fromTo(
        ".about__char",
        { "--on": 0 },
        {
          "--on": 1,
          ease: "none",
          stagger: 0.5,
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: "+=170%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
          },
        }
      );

      STATS.forEach((stat, i) => {
        const el = statRefs.current[i];
        if (!el) return;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.value,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(counter.value) + stat.suffix;
          },
        });
      });
    }, rootRef);
    return () => mm.revert();
  }, []);

  return (
    <section className="about" id="about" ref={rootRef}>
      <div className="about__stage" ref={stageRef}>
        <div className="wrap">
          <header className="section-head" data-reveal>
            <h2>{PROFILE.motto}</h2>
            <p className="mono">(About)</p>
          </header>
          <p className="about__bio" aria-label={PROFILE.bio}>
            {WORDS.map((w, i) => (
              <span className="about__word" key={i} aria-hidden="true">
                {w.split("").map((c, j) => (
                  <span className="about__char" key={j}>
                    {c}
                  </span>
                ))}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="wrap">
        <dl className="about__stats">
          {STATS.map((stat, i) => (
            <div key={stat.label} data-reveal>
              <dd
                ref={(el) => {
                  statRefs.current[i] = el;
                }}
              >
                {stat.value}
                {stat.suffix}
              </dd>
              <dt className="mono">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

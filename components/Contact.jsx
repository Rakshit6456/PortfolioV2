"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PROFILE } from "../lib/data";
import { Magnetic } from "./Magnetic";

const STATEMENT = [
  { text: "Let's" },
  { text: "build" },
  { text: "something" },
  { text: "worth", accent: true },
  { text: "remembering.", accent: true },
];

export function Contact() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact__word-inner", {
        yPercent: 110,
        duration: 1,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
      gsap.from(".contact__reveal", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.35,
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" id="contact" ref={rootRef}>
      <p className="section-label">Get in touch</p>
      <h2 className="contact__statement">
        {STATEMENT.map((word, i) => (
          <span className="contact__word" key={i}>
            <span
              className={`contact__word-inner${word.accent ? " is-accent" : ""}`}
            >
              {word.text}
            </span>
          </span>
        ))}
      </h2>

      <Magnetic
        as="a"
        href={`mailto:${PROFILE.email}`}
        className="contact__cta contact__reveal"
        strength={0.35}
      >
        <span className="contact__cta-text">{PROFILE.email}</span>
        <span className="contact__cta-icon" aria-hidden="true">
          ↗
        </span>
      </Magnetic>
      
      

      <ul className="contact__socials">
        {PROFILE.socials.map((s) => (
          <li className="contact__reveal" key={s.label}>
            <Magnetic as="a" href={s.href} target="_blank" rel="noreferrer" strength={0.5}>
              {s.label}
            </Magnetic>
          </li>
        ))}
      </ul>
    </section>
  );
}

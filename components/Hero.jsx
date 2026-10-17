"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PROFILE } from "../lib/data";
import { LocalTime } from "./LocalTime";
import { NeuralField } from "./NeuralField";
import { Terminal } from "./Terminal";

const TAGS = ["Design", "Build", "AI", "Next.js", "React", "Firebase", "Supabase", "Three.js"];

const REST = { wght: 800, wdth: 62 };
const NEAR = { wght: 220, wdth: 125 };

const Letters = ({ text }) =>
  text.split("").map((c, i) => (
    <span className="hero__mask" key={i}>
      <span className="hero__char">{c}</span>
    </span>
  ));

export function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [first, last] = PROFILE.name.split(" ");

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".hero__char", { yPercent: 115, duration: 1.3, stagger: 0.045 })
        .from(".hero__meta > *, .hero__row > *", { y: 20, opacity: 0, duration: 1, stagger: 0.08 }, "-=0.9")
        .from(".hero__ticker", { opacity: 0, duration: 1 }, "-=0.7");

      // letters near the pointer go wide and light, the rest stay heavy and narrow
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
      const title = titleRef.current;
      const chars = [...title.querySelectorAll(".hero__char")].map((el) => ({
        el,
        wght: REST.wght,
        wdth: REST.wdth,
      }));
      const mouse = { x: -9999, y: -9999, on: false };
      let raf = 0;

      const tick = () => {
        const fs = parseFloat(getComputedStyle(title).fontSize) || 200;
        const radius = fs * 1.15;
        let moving = false;
        for (const ch of chars) {
          const r = ch.el.getBoundingClientRect();
          let k = 0;
          if (mouse.on) {
            const dx = mouse.x - (r.left + r.width / 2);
            const dy = mouse.y - (r.top + r.height / 2);
            k = Math.max(0, 1 - Math.hypot(dx, dy * 0.55) / radius);
            k = k * k * (3 - 2 * k); // smoothstep
          }
          const tw = REST.wght + (NEAR.wght - REST.wght) * k;
          const tx = REST.wdth + (NEAR.wdth - REST.wdth) * k;
          ch.wght += (tw - ch.wght) * 0.14;
          ch.wdth += (tx - ch.wdth) * 0.14;
          if (Math.abs(tw - ch.wght) > 0.5 || Math.abs(tx - ch.wdth) > 0.05) moving = true;
          ch.el.style.fontWeight = ch.wght.toFixed(1);
          ch.el.style.fontStretch = `${ch.wdth.toFixed(1)}%`;
        }
        raf = moving || mouse.on ? requestAnimationFrame(tick) : 0;
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };
      const onMove = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.on = true;
        kick();
      };
      const onLeave = () => {
        mouse.on = false;
        kick();
      };
      const section = sectionRef.current;
      section.addEventListener("pointermove", onMove);
      section.addEventListener("pointerleave", onLeave);
      return () => {
        cancelAnimationFrame(raf);
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
      };
    }, sectionRef);

    return () => mm.revert();
  }, []);

  return (
    <section className="hero" id="home" ref={sectionRef}>
      <NeuralField />
      <div className="hero__inner">
        <div className="hero__meta mono">
          <span>(Portfolio / &copy;{new Date().getFullYear()})</span>
          <span>{PROFILE.role}</span>
          <LocalTime />
        </div>

        <h1 className="hero__title" ref={titleRef} aria-label={`${PROFILE.name} — ${PROFILE.role}`}>
          <span className="hero__line hero__line--first" aria-hidden="true">
            <Letters text={first} />
          </span>
          <span className="hero__line hero__line--last" aria-hidden="true">
            <Letters text={last} />
          </span>
        </h1>

        <div className="hero__row">
          <div className="hero__left">
            <p className="hero__intro">{PROFILE.tagline}</p>
            <Terminal />
          </div>
          <a className="hero__link" href="#work">
            See the work →
          </a>
        </div>
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1].map((n) => (
            <ul key={n}>
              {TAGS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}

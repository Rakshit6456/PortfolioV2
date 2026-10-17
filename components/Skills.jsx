"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { SKILLS } from "../lib/data";

const RADIUS = 170; // px of pointer influence on the tiles

export function Skills() {
  const fieldRef = useRef(null);
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const [shown, setShown] = useState(false);

  const tools = useMemo(
    () => SKILLS.flatMap((g) => g.items.map((t) => ({ ...t, category: g.category }))),
    []
  );
  const categories = ["All", ...SKILLS.map((g) => g.category)];

  useEffect(() => {
    const field = fieldRef.current;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tiles = gsap.utils.toArray(".tool", field);
      const icons = tiles.map((t) => t.querySelector(".tool__icon"));

      // each icon drifts on its own slow loop
      icons.forEach((el) => {
        gsap.to(el, {
          y: gsap.utils.random(-8, 8),
          x: gsap.utils.random(-4, 4),
          rotation: gsap.utils.random(-4, 4),
          duration: gsap.utils.random(2.4, 4.2),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: gsap.utils.random(0, 2),
        });
      });

      // pointer proximity: tiles swell and lean toward the cursor, dock style
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        const setters = tiles.map((t) => ({
          s: gsap.quickTo(t, "scale", { duration: 0.35, ease: "power3.out" }),
          x: gsap.quickTo(t, "x", { duration: 0.45, ease: "power3.out" }),
          y: gsap.quickTo(t, "y", { duration: 0.45, ease: "power3.out" }),
        }));
        const onMove = (e) => {
          tiles.forEach((t, i) => {
            const r = t.getBoundingClientRect();
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const d = Math.hypot(dx, dy);
            const k = Math.max(0, 1 - d / RADIUS);
            setters[i].s(1 + k * k * 0.7);
            setters[i].x(dx * k * 0.18);
            setters[i].y(dy * k * 0.18);
            t.style.zIndex = k > 0.5 ? 2 : 1;
          });
        };
        const onLeave = () =>
          setters.forEach((q) => {
            q.s(1);
            q.x(0);
            q.y(0);
          });
        field.addEventListener("pointermove", onMove);
        field.addEventListener("pointerleave", onLeave);
        return () => {
          field.removeEventListener("pointermove", onMove);
          field.removeEventListener("pointerleave", onLeave);
        };
      }
    }, fieldRef);

    return () => mm.revert();
  }, []);

  // entrance is CSS-driven so the tiles can never get stuck hidden
  useEffect(() => {
    const field = fieldRef.current;
    const timer = setTimeout(() => setShown(true), 2500);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(field);
    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  const match = (t) => filter === "All" || t.category === filter;

  return (
    <section className="toolkit" id="toolkit">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <h2>
            Toolkit <sup>({String(tools.length).padStart(2, "0")})</sup>
          </h2>
          <p className="mono">(Hover an icon)</p>
        </header>

        <div className="toolkit__filters" role="group" aria-label="Filter tools" data-reveal>
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip${filter === c ? " is-on" : ""}`}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <ul className={`toolkit__field${shown ? " is-in" : ""}`} ref={fieldRef}>
          {tools.map((t, i) => (
            <li
              className={`tool${match(t) ? "" : " is-dim"}`}
              key={t.name}
              style={{ "--d": `${((i * 7) % tools.length) * 45}ms` }}
              data-cursor={t.name}
              onPointerEnter={() => setActive(t)}
              onPointerLeave={() => setActive(null)}
            >
              <button
                type="button"
                className="tool__btn"
                aria-label={`${t.name}, ${t.category}`}
                onFocus={() => setActive(t)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(t)}
              >
                <span className={`tool__icon${t.plate ? ` tool__icon--${t.plate}` : ""}`}>
                  <img
                    src={t.src || `https://skillicons.dev/icons?i=${t.icon}`}
                    alt={`${t.name} logo`}
                    width={64}
                    height={64}
                    loading="lazy"
                    draggable={false}
                  />
                </span>
                <span className="tool__name">{t.name}</span>
              </button>
            </li>
          ))}
        </ul>

        <p className="toolkit__caption mono" aria-live="polite">
          {active ? (
            <>
              <strong>{active.name}</strong> / {active.category}
            </>
          ) : (
            "Move across the field"
          )}
        </p>
      </div>
    </section>
  );
}

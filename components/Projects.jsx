"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { PROJECTS } from "../lib/data";
import { getLenis } from "../lib/useSmoothScroll";

const pad = (n) => String(n).padStart(2, "0");

export function Projects() {
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const [paused, setPaused] = useState(false);
  const [openIndex, setOpenIndex] = useState(null); // which project the dialog shows
  const [shown, setShown] = useState(false); // drives the open/close animation

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "";
  }, [paused]);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray(".work__media").forEach((media) => {
        gsap.fromTo(
          media,
          { clipPath: "inset(14% 22% round 16px)" },
          {
            clipPath: "inset(0% 0% round 8px)",
            ease: "none",
            scrollTrigger: { trigger: media, start: "top 95%", end: "top 45%", scrub: true },
          }
        );
        gsap.fromTo(
          media.querySelector("img"),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    }, rootRef);
    return () => mm.revert();
  }, []);

  const open = (i, e) => {
    lastFocus.current = e.currentTarget;
    setOpenIndex(i);
    requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
  };

  const close = useCallback(() => {
    setShown(false);
    setTimeout(() => {
      setOpenIndex(null);
      lastFocus.current?.focus?.();
    }, 650);
  }, []);

  // scroll lock, Escape, and focus handling while the dialog is up
  useEffect(() => {
    if (openIndex === null) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.classList.add("modal-open");
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      lenis?.start();
      document.documentElement.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close]);

  const p = openIndex === null ? null : PROJECTS[openIndex];

  return (
    <section className="work" id="work" ref={rootRef}>
      <div className="wrap">
        <header className="section-head" data-reveal>
          <h2>
            Selected work <sup>({pad(PROJECTS.length)})</sup>
          </h2>
          <button
            type="button"
            className="pause"
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
          >
            ({paused ? "Resume motion" : "Pause motion"})
          </button>
        </header>

        <div className="work__grid">
          {PROJECTS.map((project, i) => (
            <article className="work__card" key={project.id} data-reveal>
              <button
                type="button"
                className="work__open"
                data-cursor="Open"
                aria-haspopup="dialog"
                aria-label={`${project.title} — open project details`}
                onClick={(e) => open(i, e)}
              >
                <div className="work__media">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="work__meta">
                  <span className="mono">{pad(i + 1)}</span>
                  <h3>{project.title}</h3>
                  <span className="work__go">Details +</span>
                </div>
                <p className="work__tags mono">{project.tags.join(" / ")}</p>
              </button>
              <div className="sr-only">
                <p>{project.description}</p>
                <a href={project.href}>{project.title} source code on GitHub</a>
                {project.demo && <a href={project.demo}>{project.title} live demo</a>}
              </div>
            </article>
          ))}
        </div>
      </div>

      {p && (
        <div
          className={`modal${shown ? " is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="modal__backdrop" onClick={close} />
          <div className="modal__panel">
            <button ref={closeRef} type="button" className="modal__close" onClick={close}>
              Close <span aria-hidden="true">×</span>
            </button>

            <div className="modal__media">
              {p.image && (
                <Image
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  fill
                  sizes="(max-width: 900px) 100vw, 55vw"
                />
              )}
            </div>

            <div className="modal__body">
              <p className="mono modal__count" style={{ "--i": 0 }}>
                ({pad(openIndex + 1)} / {pad(PROJECTS.length)}) {p.kind}
              </p>
              <h3 id="modal-title" className="modal__title" style={{ "--i": 1 }}>
                {p.title}
              </h3>
              <p className="modal__desc" style={{ "--i": 2 }}>
                {p.description}
              </p>

              <div className="modal__stack" style={{ "--i": 3 }}>
                <p className="mono">(Stack)</p>
                <ul>
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <div className="modal__actions" style={{ "--i": 4 }}>
                {p.demo && (
                  <a className="btn" href={p.demo} target="_blank" rel="noopener noreferrer">
                    Visit project ↗
                  </a>
                )}
                {p.href && (
                  <a
                    className="btn btn--ghost"
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See code ↗
                  </a>
                )}
                {!p.demo && <span className="mono">(Live demo not deployed yet)</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getLenis } from "../lib/useSmoothScroll";
import { LocalTime } from "./LocalTime";

export function Header({ items, email, mailHref }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);

  // hide on the way down, return on the way up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (e, href) => {
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    setOpen(false);
    const lenis = getLenis();
    setTimeout(() => {
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else target.scrollIntoView({ behavior: "smooth" });
    }, open ? 450 : 0);
  };

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <>
      <header className={`header${hidden && !open ? " is-hidden" : ""}`}>
        <a className="header__logo" href="#home" onClick={(e) => go(e, "#home")}>
          <b>RAKSHIT</b>
          <span className="header__mark">y</span>
          <em>adav</em>
        </a>
        <LocalTime />
        <nav className="header__nav" aria-label="Primary">
          {items.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => go(e, item.href)}>
              {item.label}
            </a>
          ))}
          <a className="header__cta" href={mailHref}>
            Start a project
          </a>
        </nav>
        <div className="header__tools">
          <button type="button" className="header__theme" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <button
            type="button"
            className="header__menu"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <div className={`menu${open ? " is-open" : ""}`} id="menu" inert={!open}>
        <ol className="menu__list">
          {[{ label: "Home", href: "#home" }, ...items, { label: "Contact", href: "#contact" }]
            .filter((it, i, a) => a.findIndex((x) => x.href === it.href) === i)
            .map((item, i) => (
              <li key={item.href} style={{ "--i": i }}>
                <a href={item.href} onClick={(e) => go(e, item.href)}>
                  <span>{item.label}</span>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                </a>
              </li>
            ))}
        </ol>
        <a className="menu__mail" href={mailHref}>
          {email || "\u00a0"}
        </a>
      </div>
    </>
  );
}

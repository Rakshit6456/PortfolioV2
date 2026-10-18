"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "../lib/data";
import { useEmail } from "../lib/useEmail";

const ICONS = {
  LinkedIn: (
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
  ),
  "Twitter / X": (
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  ),
  GitHub: (
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  ),
};

const Mail = (
  <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M3 7l9 6.5L21 7" />
  </g>
);

// Floats on the right once the hero is gone, and steps aside at the contact section,
// which already carries the same links.
export function SocialRail() {
  const { href: mailHref } = useEmail();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const contact = document.getElementById("contact");
    const update = () => {
      const pastHero = hero ? window.scrollY > hero.offsetHeight * 0.75 : window.scrollY > 400;
      const atContact = contact
        ? contact.getBoundingClientRect().top < window.innerHeight * 0.65
        : false;
      setShow(pastHero && !atContact);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const links = [
    ...PROFILE.socials.map((s) => ({ label: s.label, href: s.href, icon: ICONS[s.label] })),
    { label: "Email", href: mailHref, icon: Mail, mail: true },
  ];

  return (
    <aside className={`rail${show ? " is-in" : ""}`} aria-label="Social links" inert={!show}>
      <ul>
        {links.map((l, i) => (
          <li key={l.label} style={{ "--i": i }}>
            <a
              href={l.href}
              {...(l.mail ? {} : { target: "_blank", rel: "noreferrer" })}
              aria-label={l.label}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                {l.icon}
              </svg>
              <span>{l.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

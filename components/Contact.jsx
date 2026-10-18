"use client";

import { PROFILE } from "../lib/data";
import { useEmail } from "../lib/useEmail";

export function Contact() {
  const { email, href } = useEmail();
  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <p className="mono" data-reveal>(Contact)</p>
        <h2 className="contact__title" data-reveal>
          Got something
          <br />
          in mind?
        </h2>
        <div className="contact__row" data-reveal>
          <a className="btn" href={href}>
            Let&apos;s talk
          </a>
          <a className="contact__mail" href={href}>
            {email || "\u00a0"}
          </a>
          <ul className="contact__social">
            {PROFILE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

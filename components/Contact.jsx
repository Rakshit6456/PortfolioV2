"use client";

import { PROFILE } from "../lib/data";

export function Contact() {
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
          <a className="btn" href={`mailto:${PROFILE.email}`}>
            Let&apos;s talk
          </a>
          <a className="contact__mail" href={`mailto:${PROFILE.email}`}>
            {PROFILE.email}
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

"use client";

import { EXPERIENCE, RESUME } from "../lib/data";

export function Experience() {
  return (
    <section className="exp" id="experience">
      <div className="wrap">
        <header className="section-head" data-reveal>
          <h2>Experience</h2>
          <p className="mono">(Career)</p>
        </header>

        <ol className="exp__list">
          {EXPERIENCE.map((job) => (
            <li className="exp__row" key={job.company + job.period} data-reveal>
              <p className="exp__period mono">({job.period})</p>
              <div>
                <h3 className="exp__role">{job.role}</h3>
                <p className="exp__co">
                  {job.company} <span>/ {job.place}</span>
                </p>
              </div>
              <p className="exp__length mono">{job.length}</p>
            </li>
          ))}
        </ol>

        <div className="exp__open" data-reveal>
          <p className="exp__status">
            <i aria-hidden="true" />
            Looking for internships
          </p>
          <a className="btn" href={RESUME} target="_blank" rel="noopener noreferrer">
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5M9 13h6M9 17h4" />
            </svg>
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}

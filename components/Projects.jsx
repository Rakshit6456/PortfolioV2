"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { PROJECTS } from "../lib/data";

export function Projects() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".project-card").forEach((card) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="projects" id="work" ref={rootRef}>
      <p className="section-label">Selected Work</p>
      <div className="projects__list">
        {PROJECTS.map((project) => (
          <article
            className={`project-card${project.image ? " project-card--media" : ""}`}
            key={project.id}
          >
            <div className="project-card__content">
              <span className="project-card__id">{project.id}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="project-card__tags">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="project-card__links">
                {project.href && (
                  <a href={project.href} target="_blank" rel="noopener noreferrer">
                    Code
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
            {project.image && (
              <div className="project-card__media">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 780px) 100vw, 45vw"
                  className="project-card__media-img"
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

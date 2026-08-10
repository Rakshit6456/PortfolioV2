"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SKILLS } from "../lib/data";

export function Skills() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skill-icon", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        scrollTrigger: { trigger: rootRef.current, start: "top 80%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="skills" id="toolkit" ref={rootRef}>
      <p className="section-label">Toolkit</p>
      <div className="skills__groups">
        {SKILLS.map((group, index) => (
          <div className="skills__group" key={group.category}>
            <div className="skills__group-header">
              <span className="skills__group-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="skills__group-title">{group.category}</h4>
            </div>
            <div className="skills__icon-grid">
              {group.items.map((skill) => (
                <div className="skill-icon" key={skill.name} title={skill.name}>
                  <img
                    src={`https://skillicons.dev/icons?i=${skill.icon}`}
                    alt={skill.name}
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

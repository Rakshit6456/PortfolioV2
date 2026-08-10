"use client";

import { useRef } from "react";
import gsap from "gsap";

export function Magnetic({ as: Tag = "div", strength = 0.4, className, children, ...props }) {
  const elRef = useRef(null);
  const quickRef = useRef(null);

  const ensureQuick = () => {
    if (!quickRef.current && elRef.current) {
      quickRef.current = {
        x: gsap.quickTo(elRef.current, "x", { duration: 0.5, ease: "power3.out" }),
        y: gsap.quickTo(elRef.current, "y", { duration: 0.5, ease: "power3.out" }),
      };
    }
    return quickRef.current;
  };

  const handleMouseMove = (e) => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    const quick = ensureQuick();
    quick.x(relX * strength);
    quick.y(relY * strength);
  };

  const handleMouseLeave = () => {
    const quick = ensureQuick();
    quick.x(0);
    quick.y(0);
  };

  return (
    <Tag
      ref={elRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}

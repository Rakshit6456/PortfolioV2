"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Dot follows the pointer exactly, ring trails it and swells over links.
export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    const dx = gsap.quickTo(dot, "x", { duration: 0.05 });
    const dy = gsap.quickTo(dot, "y", { duration: 0.05 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      root.classList.add("cursor-on");
    };
    const over = (e) => {
      const t = e.target.closest?.("a, button, [data-cursor]");
      ring.classList.toggle("is-link", !!t);
      const text = t?.dataset?.cursor;
      ring.classList.toggle("is-label", !!text);
      label.textContent = text || "";
    };
    const leave = () => root.classList.remove("cursor-on");

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerover", over);
    document.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-cursor", "cursor-on");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden="true">
        <span ref={labelRef} />
      </div>
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}

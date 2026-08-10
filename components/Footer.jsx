"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PROFILE } from "../lib/data";
import { Magnetic } from "./Magnetic";

const MARQUEE_TEXT =
  "Available for freelance & full-time roles /// Let's build something great /// ";

export function Footer() {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const loopWidth = track.scrollWidth / 2;
      tweenRef.current = gsap.to(track, {
        x: -loopWidth,
        duration: 24,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      {/* <div
        className="site-footer__marquee"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.resume()}
      >
        <div className="site-footer__track" ref={trackRef}>
          <span>{MARQUEE_TEXT}</span>
          <span>{MARQUEE_TEXT}</span>
        </div>
      </div>

      <div className="site-footer__bottom">
        

        
      </div> */}
    </footer>
  );
}

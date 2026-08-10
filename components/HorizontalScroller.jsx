"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { HORIZONTAL_SCROLL_ITEMS } from "../lib/data";

export function HorizontalScroller() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="horizontal-scroll" ref={rootRef}>
      <div className="horizontal-scroll__track" ref={trackRef}>
        {HORIZONTAL_SCROLL_ITEMS.map((item, i) => (
          <span className="horizontal-scroll__item" key={item + i}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

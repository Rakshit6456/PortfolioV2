"use client";

import { useEffect } from "react";

// Sizes a single-line element so it spans the full width of its parent.
export function useFitText(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.getBoundingClientRect().width;
      if (w > 0) el.style.fontSize = `${(97 * el.parentElement.clientWidth) / w}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [ref]);
}

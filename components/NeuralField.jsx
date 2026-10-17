"use client";

import { useEffect, useRef } from "react";

const LINK = 150; // max distance between two linked nodes, px
const REACH = 220; // cursor influence, px

// A drifting network of nodes behind the hero. The cursor becomes one more node:
// it pulls its neighbours in and wires itself to them.
export function NeuralField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let nodes = [];
    let raf = 0;
    let visible = true;
    let accent = "127,168,255";
    let ink = "237,234,228";
    const mouse = { x: 0, y: 0, on: false };

    const rgb = (hex) => {
      const v = hex.replace("#", "").trim();
      if (v.length !== 6) return null;
      return [0, 2, 4].map((i) => parseInt(v.slice(i, i + 2), 16)).join(",");
    };
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      accent = rgb(cs.getPropertyValue("--accent")) || accent;
      ink = rgb(cs.getPropertyValue("--text")) || ink;
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(120, Math.max(36, (w * h) / 15000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 1 + Math.random() * 1.6,
      }));
      readColors();
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const paused = document.documentElement.dataset.motion === "paused";
      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!paused && !reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          if (mouse.on) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < REACH && d > 1) {
              const f = (1 - d / REACH) * 0.035;
              n.x += dx * f;
              n.y += dy * f;
            }
          }
        }
      }

      // links between nodes
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${ink},${(1 - d / LINK) * 0.13})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // the cursor wires itself to nearby nodes in the accent colour
        if (mouse.on) {
          const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (d < REACH) {
            ctx.strokeStyle = `rgba(${accent},${(1 - d / REACH) * 0.75})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        let glow = 0;
        if (mouse.on) glow = Math.max(0, 1 - Math.hypot(n.x - mouse.x, n.y - mouse.y) / REACH);
        ctx.fillStyle = glow > 0.05 ? `rgba(${accent},${0.35 + glow * 0.65})` : `rgba(${ink},0.28)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const onMove = (e) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };

    build();
    const ro = new ResizeObserver(build);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(host);
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="neural" aria-hidden="true" />;
}

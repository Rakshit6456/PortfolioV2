"use client";

import { useEffect, useRef } from "react";

const RAMP = [".", ":", "-", "=", "+", "*", "#", "%", "@"];
const SCRAMBLE = "01<>/{}[]#@$%&*+=~^";
const RADIUS = 7; // cursor influence, in cells
const LINES_NARROW = ["RAKSHIT", "YADAV"];
const LINE_WIDE = "RAKSHIT YADAV";

// The name rendered as a field of characters that part around the cursor.
export function AsciiName({ lines2 = LINES_NARROW, line1 = LINE_WIDE, label }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cols = 0;
    let rows = 0;
    let cw = 0;
    let ch = 0;
    let cover = []; // per-cell coverage 0..1
    let colors = { text: "#edeae4", accent: "#7fa8ff" };
    let raf = 0;
    let visible = true;
    const mouse = { x: -999, y: -999, on: false };
    const ripples = [];
    const start = performance.now();

    const readColors = () => {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        text: cs.getPropertyValue("--text").trim() || colors.text,
        accent: cs.getPropertyValue("--accent").trim() || colors.accent,
      };
    };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.parentElement.clientWidth;
      const narrow = width < 700;
      const lines = narrow ? lines2 : [line1];
      cols = Math.max(48, Math.round(width / (narrow ? 6 : 8.5)));
      cw = width / cols;
      ch = cw * 1.85;
      const aspect = narrow ? 3.1 : 6.4;
      rows = Math.max(lines.length * 8, Math.round(width / aspect / ch));
      const height = rows * ch;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // rasterise the name into a tiny canvas: one pixel per character cell
      const mask = document.createElement("canvas");
      mask.width = cols;
      mask.height = rows;
      const m = mask.getContext("2d", { willReadFrequently: true });
      const family = getComputedStyle(document.body).fontFamily;
      const lineH = rows / lines.length;
      m.fillStyle = "#fff";
      m.textBaseline = "alphabetic";
      lines.forEach((text, i) => {
        m.save();
        m.font = `800 100px ${family}`;
        const w = m.measureText(text).width || 1;
        const size = lineH / 0.74; // cap height is ~0.7 of the font size
        m.font = `800 ${size}px ${family}`;
        const sx = (cols * 0.985) / (m.measureText(text).width || w);
        m.translate(cols * 0.0075, lineH * i + lineH * 0.9);
        m.scale(sx, 1);
        m.fillText(text, 0, 0);
        m.restore();
      });
      const data = m.getImageData(0, 0, cols, rows).data;
      cover = new Array(cols * rows);
      for (let i = 0; i < cover.length; i++) cover[i] = data[i * 4 + 3] / 255;

      ctx.font = `600 ${cw * 1.5}px ui-monospace, "SF Mono", Menlo, monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      readColors();
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      if (!visible) return;
      const t = reduced ? 0 : (now - start) / 1000;
      const paused = document.documentElement.dataset.motion === "paused";
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mc = mouse.x / cw;
      const mr = mouse.y / ch;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cov = cover[r * cols + c];
          let dx = 0;
          let dy = 0;
          let hot = 0;

          if (mouse.on) {
            const ddx = c - mc;
            const ddy = (r - mr) * 1.85;
            const d = Math.hypot(ddx, ddy);
            if (d < RADIUS) {
              hot = 1 - d / RADIUS;
              const push = hot * hot * cw * 2.4;
              const len = d || 1;
              dx = (ddx / len) * push;
              dy = (ddy / len) * push * 0.5;
            }
          }

          let ripple = 0;
          for (const rp of ripples) {
            const age = (now - rp.t) / 1000;
            const rad = age * 38;
            const dd = Math.hypot(c - rp.c, (r - rp.r) * 1.85);
            const band = 1 - Math.min(1, Math.abs(dd - rad) / 3);
            if (band > 0) ripple = Math.max(ripple, band * (1 - age / 1.4));
          }

          // empty cells only appear as faint dust near the cursor or a ripple
          if (cov < 0.08) {
            const dust = Math.max(hot * 0.5, ripple * 0.7);
            if (dust < 0.06) continue;
            ctx.globalAlpha = dust;
            ctx.fillStyle = colors.accent;
            ctx.fillText("·", c * cw + cw / 2 + dx, r * ch + ch / 2 + dy);
            continue;
          }

          const wave = paused ? 0 : Math.sin(t * 1.6 + c * 0.22 + r * 0.45) * 0.5 + 0.5;
          let level = Math.min(RAMP.length - 1, Math.floor(cov * RAMP.length));
          // the wave nudges density up and down so the letters shimmer
          level = Math.max(0, Math.min(RAMP.length - 1, level - (wave > 0.82 ? 1 : 0)));
          let glyph = RAMP[level];
          if ((hot > 0.15 || ripple > 0.2) && Math.random() < 0.15 + hot * 0.35) {
            glyph = SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
          }

          const active = hot > 0.2 || ripple > 0.15;
          ctx.globalAlpha = Math.min(1, 0.35 + cov * 0.65 + hot * 0.3 + ripple * 0.4);
          ctx.fillStyle = active ? colors.accent : colors.text;
          ctx.fillText(glyph, c * cw + cw / 2 + dx, r * ch + ch / 2 + dy);
        }
      }
      ctx.globalAlpha = 1;
      while (ripples.length && now - ripples[0].t > 1500) ripples.shift();
    };

    const toLocal = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMove = (e) => {
      toLocal(e);
      mouse.on = true;
    };
    const onLeave = () => {
      mouse.on = false;
    };
    const onDown = (e) => {
      toLocal(e);
      ripples.push({ c: mouse.x / cw, r: mouse.y / ch, t: performance.now() });
      mouse.on = e.pointerType === "mouse";
    };

    build();
    document.fonts?.ready.then(build);
    const ro = new ResizeObserver(build);
    ro.observe(canvas.parentElement);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);
    const mo = new MutationObserver(readColors);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("pointerdown", onDown);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, [lines2, line1]);

  return <canvas ref={canvasRef} className="ascii-name" role="img" aria-label={label} />;
}

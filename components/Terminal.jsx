"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { cmd: "npm run ship", out: "build passed. shipped to production" },
  { cmd: "git push origin main", out: "pushed. checks are green" },
  { cmd: "claude code --build", out: "feature built. ready for review" },
  { cmd: "node deploy.js", out: "deployed in 1.4s" },
];

// A prompt that types a command, prints its result, then moves to the next one.
export function Terminal() {
  const [text, setText] = useState("");
  const [out, setOut] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(STEPS[0].cmd);
      setOut(STEPS[0].out);
      return;
    }
    let i = 0;
    let timer;
    const wait = (fn, ms) => {
      timer = setTimeout(fn, ms);
    };
    const type = (n) => {
      const { cmd, out: result } = STEPS[i];
      if (n <= cmd.length) {
        setText(cmd.slice(0, n));
        wait(() => type(n + 1), 55 + Math.random() * 70);
      } else {
        wait(() => {
          setOut(result);
          wait(erase, 2400);
        }, 450);
      }
    };
    const erase = () => {
      setOut("");
      setText("");
      i = (i + 1) % STEPS.length;
      wait(() => type(0), 500);
    };
    wait(() => type(0), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="term mono" aria-hidden="true">
      <p>
        <span className="term__prompt">$</span> {text}
        <span className="term__caret" />
      </p>
      <p className="term__out">{out ? `✓ ${out}` : " "}</p>
    </div>
  );
}

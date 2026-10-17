"use client";

import { useEffect, useState } from "react";

const KEY = "portfolio-liked";

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(null);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === "1") setLiked(true);
    } catch {}
    fetch("/api/likes", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setCount(d.count);
        if (d.liked) setLiked(true);
      })
      .catch(() => {});
  }, []);

  const like = () => {
    if (liked) return;
    setLiked(true);
    setBurst((n) => n + 1);
    setCount((c) => (c === null ? c : c + 1));
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    fetch("/api/likes", { method: "POST" })
      .then((r) => r.json())
      .then((d) => {
        if (d.count !== null) setCount(d.count);
      })
      .catch(() => {});
  };

  return (
    <button
      type="button"
      className={`like${liked ? " is-liked" : ""}`}
      onClick={like}
      aria-pressed={liked}
      aria-label={liked ? "You liked this portfolio" : "Like this portfolio"}
      data-cursor="hover"
    >
      <span className="like__heart" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.8 4.5 6.6 4.5c2.1 0 3.9 1.1 5.4 3 1.5-1.9 3.3-3 5.4-3 3.8 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21z" />
        </svg>
        {burst > 0 && (
          <span key={burst} className="like__burst">
            {Array.from({ length: 6 }, (_, i) => (
              <i key={i} style={{ "--a": `${i * 60}deg` }} />
            ))}
          </span>
        )}
      </span>
      <span>{liked ? "Thanks for the love" : "Like this portfolio"}</span>
      {count !== null && <span className="like__count">{count}</span>}
    </button>
  );
}

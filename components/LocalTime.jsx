"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Kolkata",
});

// Live clock for Gurugram. Renders after mount so server and client markup agree.
export function LocalTime({ place = "Gurugram, India" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <p className="local-time">
      {place} <span aria-hidden="true">/</span> <time>{time || "--:--"}</time>
    </p>
  );
}

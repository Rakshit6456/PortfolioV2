import { ImageResponse } from "next/og";

export const alt = "Rakshit Yadav — Full-Stack & AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#111010",
          color: "#edeae4",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#b9b4ac" }}>
          rakshityadav.is-a.dev
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 168,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -6,
            }}
          >
            RAKSHIT
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 168,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -6,
              color: "#7fa8ff",
            }}
          >
            YADAV
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 36 }}>
          Full-Stack & AI Developer — Gurugram, India
        </div>
      </div>
    ),
    size
  );
}

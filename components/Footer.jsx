"use client";

import { PROFILE } from "../lib/data";
import { AsciiName } from "./AsciiName";
import { LikeButton } from "./LikeButton";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top mono">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to top ↑
          </a>
          <LikeButton />
        </div>
        <div className="footer__fit">
          <AsciiName label={PROFILE.name} />
        </div>
        <p className="footer__hint mono">(Move through it. Click to send a ripple)</p>
        <div className="footer__bottom mono">
          <span>{PROFILE.role}</span>
          <span>(Portfolio / &copy;{new Date().getFullYear()})</span>
        </div>
      </div>
    </footer>
  );
}

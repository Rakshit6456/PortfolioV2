"use client";

import { useEffect, useState } from "react";
import { PROFILE } from "./data";

// The address is only filled in after hydration, so it never appears in the
// server HTML. Cloudflare rewrites emails found there into /cdn-cgi/ links
// that crawlers report as broken.
export function useEmail() {
  const [email, setEmail] = useState("");
  useEffect(() => setEmail(PROFILE.email), []);
  return {
    email,
    href: email ? `mailto:${email}` : "#contact",
  };
}

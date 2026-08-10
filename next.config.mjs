import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // react-three-fiber's WebGL render loop lives outside React's render
  // cycle; Strict Mode's dev-only double-invoke of effects can kill the
  // animation loop after the first frame (rotating sphere freezes).
  reactStrictMode: false,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

import Link from "next/link";

export const metadata = {
  title: "Page not found — Rakshit Yadav",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className="notfound">
      <p className="mono">(Error / 404)</p>
      <h1 className="notfound__title">Lost the track.</h1>
      <p className="notfound__text">
        This page doesn&apos;t exist, or it moved. Head back to the start line.
      </p>
      <Link className="btn" href="/">
        Back home
      </Link>
    </main>
  );
}

import "./globals.css";

export const metadata = {
  title: "Rakshit Yadav — Portfolio",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

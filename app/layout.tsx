import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (not fetched from Google Fonts at build/runtime) for reliability and Core Web Vitals.
const instrumentSerif = localFont({
  src: [
    {
      path: "../public/fonts/instrument-serif-normal-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/instrument-serif-italic-400.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/space-grotesk-variable.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "ThriveClip Productions — Scale Your Content Without Scaling Your Workload",
  description:
    "ThriveClip Productions is a creative video marketing and content production agency helping businesses, brands, and creators grow faster with premium video content.",
  icons: {
    icon: "/logo/favicon.png",
    apple: "/logo/favicon.png",
  },
  other: {
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${spaceGrotesk.variable}`}
    >
      <body
        style={{
          fontFamily: "var(--font-body), sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {children}
      </body>
    </html>
  );
}

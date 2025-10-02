import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "your café persona | matchame.cafe",
  description: "Discover your café personality in this fun, minimal personality test",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  openGraph: {
    title: "your café persona | matchame.cafe",
    description: "Discover your café personality in this fun quiz. Are you a Matcha Latte, Espresso, or maybe a Croissant?",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "your café persona | matchame.cafe",
    description: "Take this fun personality quiz to find your café match!",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  themeColor: "#fdfcfb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}

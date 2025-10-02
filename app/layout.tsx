import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "What Café Item Are You?",
  description: "Discover your café personality in this fun, minimal personality test",
  openGraph: {
    title: "What Café Item Are You?",
    description: "Discover your café personality in this fun quiz. Are you a Matcha Latte, Espresso, or maybe a Croissant?",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Café Item Are You?",
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

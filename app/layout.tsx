import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "What Café Item Are You?",
  description: "Discover your café personality in this fun, minimal personality test",
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

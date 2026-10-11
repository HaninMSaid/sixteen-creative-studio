import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/editorial";
export const metadata: Metadata = {
  title: { default: "Sixteen — Creative Studio", template: "%s — Sixteen" },
  description:
    "A considered world of spaces, materials and objects. Sixteen Creative Studio design prototype.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <Footer />
      </body>
    </html>
  );
}

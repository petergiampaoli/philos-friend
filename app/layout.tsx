import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Philos-Friend — a philosophy friend for the question you're actually asking",
  description:
    "A philosophy friend that answers with one sourced quote at a time.",
};

export const viewport: Viewport = {
  themeColor: "#0f0e0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="page-shell">
          <SiteHeader />
          <main>{children}</main>
          <footer className="site-footer">
            <div>
              <span className="footer-mark">Philos-Friend</span>
            </div>
            <div className="footer-note">
              <Link href="/privacy">Privacy</Link>
              <span className="footer-dot">·</span>
              <Link href="/terms">Terms</Link>
              <span className="footer-dot">·</span>
              <Link href="/credits">Credits</Link>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://learn.abmatic.ai"),
  title: {
    default: "Abmatic AI — Learn",
    template: "%s | Abmatic AI",
  },
  description:
    "Practical, cited, and honest content on ABM, intent data, agentic marketing, and the modern B2B growth stack — from the Abmatic team.",
  openGraph: {
    siteName: "Abmatic AI",
    type: "website",
    url: "https://learn.abmatic.ai",
  },
  twitter: {
    card: "summary_large_image",
    site: "@AbmaticAI",
  },
  icons: { icon: "/favicon.ico" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Abmatic deanonymization pixel — required per docs/PAGE_REQUIREMENTS.md */}
        <Script
          src="https://clients.abmatic.ai/AkX9vu5KLybU.js"
          strategy="afterInteractive"
        />
        <header className="site-header">
          <nav>
            <a href="/learn" className="brand">
              Abmatic <span>Learn</span>
            </a>
            <div className="nav-right">
              <a href="https://abmatic.ai/" rel="noopener">
                Platform
              </a>
              <a href="https://abmatic.ai/demo" className="cta" rel="noopener">
                Book a demo
              </a>
            </div>
          </nav>
        </header>
        <main className="prose" id="main">{children}</main>
        <footer className="site-footer">
          <small>
            © {new Date().getFullYear()} Abmatic AI. Published by Compound, our autonomous growth agency.
          </small>
        </footer>
      </body>
    </html>
  );
}

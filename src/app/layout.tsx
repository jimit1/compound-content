import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import "./globals.css";

const SITE = "https://learn.abmatic.ai";
const PRIMARY = "https://abmatic.ai";
const DEMO = "https://abmatic.ai/demo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Abmatic AI",
    template: "%s | Abmatic AI",
  },
  description:
    "Practical, cited content on account-based marketing, intent data, agentic AI, and the modern B2B growth stack — from the Abmatic AI team.",
  applicationName: "Abmatic AI",
  authors: [{ name: "Abmatic AI", url: PRIMARY }],
  publisher: "Abmatic AI",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    siteName: "Abmatic AI",
    type: "website",
    url: SITE,
    images: [{ url: "/og-image.png", width: 1200, height: 627, alt: "Abmatic AI" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AbmaticAI",
    images: ["/og-image.png"],
  },
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
            <a href={PRIMARY} className="brand" aria-label="Abmatic AI home">
              <Image
                src="/brand/logo-horizontal.png"
                alt="Abmatic AI"
                width={160}
                height={42}
                priority
              />
            </a>
            <div className="nav-right">
              <a href="/" className="nav-link">Learn</a>
              <a href={`${PRIMARY}/blog`} className="nav-link" rel="noopener">Blog</a>
              <a href={`${PRIMARY}/pricing`} className="nav-link" rel="noopener">Pricing</a>
              <a href={DEMO} className="cta" rel="noopener">Book a demo</a>
            </div>
          </nav>
        </header>
        <main className="prose" id="main">{children}</main>
        <footer className="site-footer">
          <div className="site-footer-inner">
            <a href={PRIMARY} className="footer-brand" rel="noopener">
              <Image
                src="/brand/logo-horizontal.png"
                alt="Abmatic AI"
                width={120}
                height={32}
              />
            </a>
            <nav className="footer-nav">
              <a href={PRIMARY} rel="noopener">Platform</a>
              <a href={`${PRIMARY}/blog`} rel="noopener">Blog</a>
              <a href={`${PRIMARY}/pricing`} rel="noopener">Pricing</a>
              <a href={`${PRIMARY}/security`} rel="noopener">Security</a>
              <a href={DEMO} rel="noopener">Book a demo</a>
            </nav>
            <small>© {new Date().getFullYear()} Abmatic AI. All rights reserved.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}

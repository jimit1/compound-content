import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import NewsletterCapture from "@/components/NewsletterCapture";
import { entries } from "@/lib/entries";
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

const NAV_LINKS = [
  { href: "/alternatives-to/", label: "Alternatives" },
  { href: "/compare/", label: "Compare" },
  { href: "/glossary/", label: "Glossary" },
  { href: "/learn/", label: "Learn" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const searchIndex = entries.map((e) => ({
    href: e.href,
    title: e.title,
    summary: e.summary,
    tag: e.category ?? e.tag,
    keywords: e.keywords,
  }));
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body>
        {/* Abmatic deanonymization pixel — required per docs/PAGE_REQUIREMENTS.md */}
        <Script
          src="https://clients.abmatic.ai/AkX9vu5KLybU.js"
          strategy="afterInteractive"
        />

        <header className="site-header">
          <div className="site-header__inner">
            <a href="/" className="site-header__brand" aria-label="Abmatic AI Learn home">
              <Image
                src="/brand/logo-horizontal.png"
                alt="Abmatic AI"
                width={160}
                height={42}
                priority
              />
            </a>

            <nav className="site-header__nav" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="site-header__link">
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="site-header__right">
              <SearchBar entries={searchIndex} triggerLabel="Search" />
              <a href={DEMO} className="site-header__cta" rel="noopener">
                Book a demo
              </a>
            </div>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="site-footer">
          <div className="site-footer__top">
            <div className="site-footer__col site-footer__col--newsletter">
              <NewsletterCapture
                variant="footer"
                eyebrow="Newsletter"
                headline="The B2B growth read, weekly"
                blurb="Practical, cited, no filler. Unsubscribe anytime."
              />
            </div>
            <div className="site-footer__col">
              <h4 className="site-footer__h">Topics</h4>
              <ul>
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="site-footer__col">
              <h4 className="site-footer__h">Abmatic AI</h4>
              <ul>
                <li><a href={PRIMARY} rel="noopener">Platform</a></li>
                <li><a href={`${PRIMARY}/pricing`} rel="noopener">Pricing</a></li>
                <li><a href={`${PRIMARY}/security`} rel="noopener">Security</a></li>
                <li><a href={DEMO} rel="noopener">Book a demo</a></li>
              </ul>
            </div>
          </div>
          <div className="site-footer__bottom">
            <a href="/" className="site-footer__brand" aria-label="Abmatic AI home">
              <Image
                src="/brand/logo-horizontal.png"
                alt="Abmatic AI"
                width={120}
                height={32}
              />
            </a>
            <small>© {year} Abmatic AI. All rights reserved.</small>
          </div>
        </footer>
      </body>
    </html>
  );
}

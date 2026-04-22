import type { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "What Is Intent Data? Definition, Types, and How B2B Teams Use It (2026)",
  description:
    "Intent data is behavioral signals that show a B2B buyer is in-market. Learn first-party vs third-party intent, how AI agents use it, and where it gets stale.",
  alternates: { canonical: "https://learn.abmatic.ai/glossary/intent-data/" },
  keywords: [
    "what is intent data",
    "intent data definition",
    "intent data meaning",
    "intent data explained",
    "first party intent data",
    "third party intent data",
    "b2b intent data",
  ],
  openGraph: {
    title: "What Is Intent Data? | Abmatic AI",
    description:
      "First vs third-party intent, common sources, how AI agents use it, and where third-party data gets stale.",
    url: "https://learn.abmatic.ai/glossary/intent-data/",
    type: "article",
    publishedTime: "2026-04-22",
    modifiedTime: "2026-04-22",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Intent Data?",
    description:
      "First vs third-party intent, common sources, and how AI agents use it in 2026.",
  },
};

export default function Page() {
  return <Content />;
}

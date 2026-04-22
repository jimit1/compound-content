import React from "react";
import { formatDate } from "@/lib/entries";

export type FeaturedHeroProps = {
  href: string;
  title: string;
  summary: string;
  category: string;
  image: string;
  author?: string;
  publishedAt?: string;
  readMinutes?: number;
  eyebrow?: string;
};

/**
 * Top-of-home featured article. Big 3:2 image left on ≥900px, content right.
 * Stacks below. Whole card is a link.
 */
export default function FeaturedHero({
  href,
  title,
  summary,
  category,
  image,
  author = "Abmatic AI editorial",
  publishedAt = "2026-04-22",
  readMinutes = 8,
  eyebrow = "Featured",
}: FeaturedHeroProps) {
  return (
    <a href={href} className="featured-hero">
      <div className="featured-hero__image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          width={1200}
          height={800}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="featured-hero__content">
        <span className="featured-hero__eyebrow">{eyebrow}</span>
        <span className="featured-hero__chip">{category}</span>
        <h2 className="featured-hero__title">{title}</h2>
        <p className="featured-hero__dek">{summary}</p>
        <div className="featured-hero__meta">
          <span>{author}</span>
          <span className="featured-hero__dot" aria-hidden="true">·</span>
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          <span className="featured-hero__dot" aria-hidden="true">·</span>
          <span>{readMinutes} min read</span>
        </div>
      </div>
    </a>
  );
}

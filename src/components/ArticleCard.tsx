import React from "react";
import { formatDate } from "@/lib/entries";

export type ArticleCardProps = {
  href: string;
  title: string;
  summary: string;
  category: string;
  image?: string;
  author?: string;
  publishedAt?: string;
  readMinutes?: number;
  size?: "default" | "compact";
  priority?: boolean;
};

/**
 * Editorial article card — image on top, chip + title + 2-line dek + byline
 * row below. Matches the HubSpot/Stripe restraint standard.
 *
 * Static-export friendly: plain <img> w/ explicit dims, no next/image runtime.
 */
export default function ArticleCard({
  href,
  title,
  summary,
  category,
  image = "/images/hero/home.jpg",
  author = "Abmatic AI editorial",
  publishedAt = "2026-04-22",
  readMinutes = 8,
  size = "default",
  priority = false,
}: ArticleCardProps) {
  return (
    <a href={href} className={`article-card article-card--${size}`}>
      <div className="article-card__thumb">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          width={800}
          height={450}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="article-card__body">
        <span className="article-card__chip">{category}</span>
        <h3 className="article-card__title">{title}</h3>
        <p className="article-card__dek">{summary}</p>
        <div className="article-card__meta">
          <span className="article-card__author">{author}</span>
          <span className="article-card__dot" aria-hidden="true">·</span>
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          <span className="article-card__dot" aria-hidden="true">·</span>
          <span>{readMinutes} min read</span>
        </div>
      </div>
    </a>
  );
}

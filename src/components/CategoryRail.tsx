import React from "react";
import ArticleCard, { type ArticleCardProps } from "./ArticleCard";

type CategoryRailProps = {
  title: string;
  viewAllHref: string;
  articles: ArticleCardProps[];
  id?: string;
};

/**
 * Rail = H2 title + "View all →" link + responsive ArticleCard grid.
 * 1 / 2 / 3 / 4 columns at 0 / 680 / 1000 / 1280 px.
 */
export default function CategoryRail({ title, viewAllHref, articles, id }: CategoryRailProps) {
  if (!articles.length) return null;
  return (
    <section className="rail" id={id} aria-labelledby={id ? `${id}-h` : undefined}>
      <div className="rail__head">
        <h2 className="rail__title" id={id ? `${id}-h` : undefined}>{title}</h2>
        <a className="rail__viewall" href={viewAllHref}>
          View all <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="rail__grid">
        {articles.map((a) => (
          <ArticleCard key={a.href} {...a} />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

export type SearchEntry = {
  href: string;
  title: string;
  summary: string;
  tag: string;
  keywords?: string[];
};

type Props = {
  entries: SearchEntry[];
  placeholder?: string;
};

/**
 * Client-side fuzzy-filter search. No backend. Uses simple token matching on
 * title + summary + tag + keywords. Static-export friendly (fires after hydration).
 */
export default function SearchBar({ entries, placeholder = "Search articles…" }: Props) {
  const [q, setQ] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => setIsReady(true), []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return entries;
    const tokens = query.split(/\s+/).filter(Boolean);
    return entries
      .map((e) => {
        const haystack = [
          e.title,
          e.summary,
          e.tag,
          ...(e.keywords ?? []),
        ].join(" ").toLowerCase();
        const score = tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
        return { entry: e, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.entry);
  }, [q, entries]);

  return (
    <>
      <div className="search-wrap">
        <input
          type="search"
          className="search-input"
          placeholder={isReady ? placeholder : "Loading…"}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search articles"
          autoComplete="off"
          spellCheck={false}
        />
      </div>

      {q.trim() && (
        <p
          style={{
            textAlign: "center",
            color: "var(--fg-muted)",
            fontSize: "0.88rem",
            margin: "12px 0 0",
          }}
        >
          {results.length === 0 ? "No matches. Try another term." : `${results.length} result${results.length === 1 ? "" : "s"}`}
        </p>
      )}

      <div className="card-grid">
        {(q.trim() ? results : entries).map((e) => (
          <a key={e.href} href={e.href} className="card">
            <div className="card-thumb" aria-hidden="true" />
            <div className="card-body">
              <span className="tag">{e.tag}</span>
              <h3>{e.title}</h3>
              <p>{e.summary}</p>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

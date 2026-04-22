"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type SearchEntry = {
  href: string;
  title: string;
  summary: string;
  tag: string;
  keywords?: string[];
};

type ListProps = {
  entries: SearchEntry[];
  placeholder?: string;
  /** When true, render as an inline input + grid (legacy mode). */
  inline?: true;
  /** Unused in inline mode. */
  triggerLabel?: never;
};

type ModalProps = {
  entries: SearchEntry[];
  placeholder?: string;
  inline?: false;
  /** Label shown on the header trigger button. */
  triggerLabel?: string;
};

type Props = ListProps | ModalProps;

function scoreEntries(entries: SearchEntry[], q: string): SearchEntry[] {
  const query = q.trim().toLowerCase();
  if (!query) return entries;
  const tokens = query.split(/\s+/).filter(Boolean);
  return entries
    .map((e) => {
      const haystack = [e.title, e.summary, e.tag, ...(e.keywords ?? [])]
        .join(" ")
        .toLowerCase();
      const score = tokens.reduce((acc, t) => acc + (haystack.includes(t) ? 1 : 0), 0);
      return { entry: e, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.entry);
}

/**
 * Default: modal search triggered from header w/ Cmd+K / Ctrl+K.
 * Pass `inline` to get the legacy inline-input + card-grid on category pages.
 */
export default function SearchBar(props: Props) {
  if (props.inline) return <InlineSearch {...props} />;
  return <ModalSearch {...(props as ModalProps)} />;
}

/* ─────────────── Inline variant (category pages) ─────────────── */

function InlineSearch({ entries, placeholder = "Search articles…" }: ListProps) {
  const [q, setQ] = useState("");
  const [isReady, setIsReady] = useState(false);
  useEffect(() => setIsReady(true), []);

  const results = useMemo(() => scoreEntries(entries, q), [q, entries]);

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
        <p className="search-count">
          {results.length === 0
            ? "No matches. Try another term."
            : `${results.length} result${results.length === 1 ? "" : "s"}`}
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

/* ─────────────── Modal variant (header Cmd+K) ─────────────── */

function ModalSearch({
  entries,
  placeholder = "Search articles…",
  triggerLabel = "Search",
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
    }
  }, []);

  const results = useMemo(() => scoreEntries(entries, q).slice(0, 8), [q, entries]);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(0);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, Math.max(0, results.length - 1)));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const hit = results[active];
        if (hit) {
          e.preventDefault();
          window.location.href = hit.href;
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, close]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 10);
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <span className="search-trigger__label">{triggerLabel}</span>
        <kbd className="search-trigger__kbd">{isMac ? "⌘" : "Ctrl"}K</kbd>
      </button>

      {open && (
        <div className="search-modal" role="dialog" aria-modal="true" aria-label="Search">
          <div className="search-modal__backdrop" onClick={close} aria-hidden="true" />
          <div className="search-modal__panel">
            <div className="search-modal__inputrow">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                ref={inputRef}
                type="search"
                className="search-modal__input"
                placeholder={placeholder}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search articles"
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="search-modal__close" onClick={close} aria-label="Close">
                Esc
              </button>
            </div>

            <ul className="search-modal__results" role="listbox">
              {results.length === 0 ? (
                <li className="search-modal__empty">
                  {q.trim() ? "No matches. Try another term." : "Start typing to search…"}
                </li>
              ) : (
                results.map((r, i) => (
                  <li key={r.href}>
                    <a
                      className={`search-modal__hit${i === active ? " is-active" : ""}`}
                      href={r.href}
                      onMouseEnter={() => setActive(i)}
                      role="option"
                      aria-selected={i === active}
                    >
                      <span className="search-modal__chip">{r.tag}</span>
                      <span className="search-modal__hit-body">
                        <span className="search-modal__hit-title">{r.title}</span>
                        <span className="search-modal__hit-dek">{r.summary}</span>
                      </span>
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

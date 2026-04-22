"use client";

import React, { useState } from "react";

type Variant = "inline" | "footer";

type Props = {
  variant?: Variant;
  eyebrow?: string;
  headline?: string;
  blurb?: string;
};

/**
 * Newsletter capture. Two variants:
 *   - "inline": restrained strip between home rails.
 *   - "footer": compact left-column footer form.
 *
 * Wiring TODO (documented in /Users/jimabmatic.ai/compound/docs/CREDENTIALS_NEEDED.md):
 *   - ConvertKit: POST https://api.convertkit.com/v3/forms/<FORM_ID>/subscribe
 *     Needs: FORM_ID + api_key (public).
 *   - Mailchimp: POST https://<dc>.list-manage.com/subscribe/post?u=<U>&id=<ID>
 *
 * Until wired, submission shows a local success state. No network call yet.
 */
export default function NewsletterCapture({
  variant = "inline",
  eyebrow = "Newsletter",
  headline = "The B2B growth read, once a week",
  blurb = "Practical, cited, no filler. Unsubscribe in one click.",
}: Props) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || state === "submitting") return;
    setState("submitting");
    // Placeholder wiring. Replace with real endpoint once credentials land.
    try {
      // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise((r) => setTimeout(r, 350));
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <section className={`newsletter newsletter--${variant}`} aria-label="Newsletter signup">
      <div className="newsletter__text">
        {eyebrow && <span className="newsletter__eyebrow">{eyebrow}</span>}
        <h2 className="newsletter__headline">{headline}</h2>
        <p className="newsletter__blurb">{blurb}</p>
      </div>
      <form className="newsletter__form" onSubmit={onSubmit}>
        <label htmlFor={`nl-email-${variant}`} className="sr-only">Email address</label>
        <input
          id={`nl-email-${variant}`}
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="newsletter__input"
          disabled={state === "submitting" || state === "done"}
        />
        <button
          type="submit"
          className="newsletter__button"
          disabled={state === "submitting" || state === "done"}
        >
          {state === "submitting" ? "Subscribing…" : state === "done" ? "Subscribed" : "Subscribe"}
        </button>
        {state === "done" && (
          <p className="newsletter__confirm" role="status">
            You're in. Welcome.
          </p>
        )}
        {state === "error" && (
          <p className="newsletter__error" role="alert">
            Something broke — try again?
          </p>
        )}
      </form>
    </section>
  );
}

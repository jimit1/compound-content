import React from "react";

type Props = {
  src: string;
  alt: string;
  credit?: { name: string; url: string };
  eager?: boolean;
};

/**
 * Article/index hero image. Uses plain <img> with explicit width/height so it
 * works with `output: "export"` (Next Image is set to unoptimized anyway,
 * but <img> keeps the surface simple for static export).
 */
export default function Hero({ src, alt, credit, eager = true }: Props) {
  return (
    <figure className="hero">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1600}
        height={900}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
      />
      {credit && (
        <figcaption className="hero-credit">
          Photo: <a href={credit.url} rel="noopener nofollow">{credit.name}</a> on Unsplash
        </figcaption>
      )}
    </figure>
  );
}

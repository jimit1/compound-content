import React from "react";

type SchemaProps = {
  type: string;
  data: Record<string, unknown>;
};

/**
 * Emits a JSON-LD <script> block. The `@context` defaults to schema.org.
 * Used inline in MDX: <Schema type="Article" data={{ headline: "..." }} />
 */
export default function Schema({ type, data }: SchemaProps) {
  const json = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

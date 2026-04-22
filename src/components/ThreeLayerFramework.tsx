import React from "react";

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const w of words) {
    const next = current ? current + " " + w : w;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = w;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 2);
}

/**
 * Pure-SVG diagram for the agentic-marketing glossary page.
 * Layer 1 (AI-assisted) -> Layer 2 (AI copilot) -> Layer 3 (Agentic).
 *
 * Uses currentColor for fg text and --accent for the Layer 3 highlight.
 * No external assets; safe for static export and dark/light prints.
 */
export default function ThreeLayerFramework() {
  const rows = [
    {
      id: 1,
      label: "Layer 1",
      title: "AI-assisted",
      body: "AI suggests, human decides. Subject-line recommenders, first-draft copy, predictive lead scores surfaced for a human to action.",
    },
    {
      id: 2,
      label: "Layer 2",
      title: "AI copilot",
      body: "AI drafts under supervision. A copilot writes a full sequence; the human reviews every artifact before it ships.",
    },
    {
      id: 3,
      label: "Layer 3",
      title: "Agentic",
      body: "AI plans, executes, optimizes inside guardrails. The human sets goals and reviews outcomes — not every action.",
      highlight: true,
    },
  ];
  const width = 640;
  const rowHeight = 104;
  const gap = 14;
  const height = rows.length * rowHeight + (rows.length - 1) * gap + 40;

  return (
    <figure className="three-layer-framework" aria-labelledby="tlf-title">
      <figcaption id="tlf-title" className="sr-caption">
        The three-layer framework for AI in the marketing stack: AI-assisted,
        AI copilot, and agentic.
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="auto"
        role="img"
        aria-label="Three stacked layers showing the progression from AI-assisted to AI copilot to agentic marketing"
        style={{ maxWidth: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="tlf-accent" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        {rows.map((r, i) => {
          const y = 20 + i * (rowHeight + gap);
          const fill = r.highlight ? "url(#tlf-accent)" : "#ffffff";
          const stroke = r.highlight ? "var(--accent)" : "var(--rule)";
          return (
            <g key={r.id}>
              <rect
                x={10}
                y={y}
                width={width - 20}
                height={rowHeight}
                rx={10}
                ry={10}
                fill={fill}
                stroke={stroke}
                strokeWidth={r.highlight ? 1.6 : 1}
              />
              <text
                x={30}
                y={y + 30}
                fontSize={12}
                fontWeight={600}
                letterSpacing={1.4}
                fill={r.highlight ? "var(--accent)" : "var(--fg-dim)"}
                style={{ textTransform: "uppercase" }}
              >
                {r.label}
              </text>
              <text
                x={30}
                y={y + 56}
                fontSize={20}
                fontWeight={700}
                fill="currentColor"
              >
                {r.title}
              </text>
              {wrapText(r.body, 78).map((line, li) => (
                <text
                  key={li}
                  x={30}
                  y={y + 80 + li * 16}
                  fontSize={13}
                  fill="var(--fg-dim)"
                >
                  {line}
                </text>
              ))}
              {i < rows.length - 1 && (
                <g>
                  <line
                    x1={width / 2}
                    y1={y + rowHeight + 2}
                    x2={width / 2}
                    y2={y + rowHeight + gap - 2}
                    stroke="var(--rule)"
                    strokeWidth={1}
                  />
                  <polygon
                    points={`${width / 2 - 4},${y + rowHeight + gap - 5} ${width / 2 + 4},${y + rowHeight + gap - 5} ${width / 2},${y + rowHeight + gap + 1}`}
                    fill="var(--rule)"
                  />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

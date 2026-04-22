/**
 * Estimate reading time for a given word count.
 * Average adult reader: 200-250 wpm. We use 220 (B2B reader tends to skim).
 */
export function readingTime(wordCount: number): string {
  const minutes = Math.max(1, Math.round(wordCount / 220));
  return `${minutes} min read`;
}

/**
 * Approximate word count from a plain-text string.
 */
export function countWords(text: string): number {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

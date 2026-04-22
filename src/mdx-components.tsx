import type { MDXComponents } from "mdx/types";
import Schema from "@/components/Schema";
import ComparisonTable from "@/components/ComparisonTable";
import CTAInline from "@/components/CTAInline";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Schema,
    ComparisonTable,
    CTAInline,
    ...components,
  };
}

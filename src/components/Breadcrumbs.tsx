import React from "react";

type Crumb = { label: string; href?: string };

type Props = {
  items: Crumb[];
};

/**
 * Visual breadcrumb trail. Pair with a <Schema type="BreadcrumbList" ... />
 * block where structured data is also required. This component is visual only.
 */
export default function Breadcrumbs({ items }: Props) {
  if (!items || items.length === 0) return null;
  return (
    <nav aria-label="breadcrumb" className="breadcrumbs">
      <ol>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i}>
              {item.href && !isLast ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

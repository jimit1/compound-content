import React from "react";

type Link = { label: string; href: string };
type Props = {
  primary: Link;
  secondary?: Link;
};

export default function CTAInline({ primary, secondary }: Props) {
  return (
    <div className="cta-inline" role="region" aria-label="Call to action">
      <a className="cta-primary" href={primary.href} rel="noopener">
        {primary.label}
      </a>
      {secondary && (
        <a className="cta-secondary" href={secondary.href} rel="noopener">
          {secondary.label}
        </a>
      )}
    </div>
  );
}

"use client";

import { Anchor, Flex } from "ui-lab-components";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function InlineTextPreview() {
  return (
    <p className="text-sm text-foreground max-w-prose leading-relaxed">
      Read the{" "}
      <Anchor href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a">
        MDN documentation
      </Anchor>{" "}
      for a full reference on anchor semantics, or check the{" "}
      <Anchor href="https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html">
        WCAG link purpose guidelines
      </Anchor>{" "}
      for accessibility requirements.
    </p>
  );
}

function UnderlineVariantsPreview() {
  return (
    <Flex gap="lg" align="center">
      <Anchor href="#">
        Solid
      </Anchor>
      <Anchor href="#">
        <Anchor.Underline variant="dashed" />
        Dashed
      </Anchor>
      <Anchor href="#">
        <Anchor.Underline variant="dotted" />
        Dotted
      </Anchor>
    </Flex>
  );
}

function PreviewTooltipPreview() {
  return (
    <Flex gap="lg" align="center">
      <Anchor
        href="https://github.com"
        preview={
          <span className="text-xs text-foreground-400">github.com</span>
        }
      >
        GitHub
      </Anchor>
      <Anchor href="https://vercel.com">
        <Anchor.Preview>
          <span className="text-xs text-foreground-400">vercel.com</span>
        </Anchor.Preview>
        Vercel
      </Anchor>
    </Flex>
  );
}

function BreadcrumbPreview() {
  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "ui-lab", href: "/projects/ui-lab" },
  ];

  return (
    <Flex gap="xs" align="center" className="text-sm">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href} className="flex items-center gap-xs">
          {i > 0 && <span className="text-foreground-400 mx-1">/</span>}
          {i < crumbs.length - 1 ? (
            <Anchor href={crumb.href}>{crumb.label}</Anchor>
          ) : (
            <span className="text-foreground-400">{crumb.label}</span>
          )}
        </span>
      ))}
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "inline-text",
    title: "Inline Text",
    description: "Anchor used inline within a paragraph — the primary use case for navigational links.",
    preview: <InlineTextPreview />,
  },
  {
    id: "underline-variants",
    title: "Underline Variants",
    description: "Three underline styles available via Anchor.Underline: solid (default), dashed, and dotted.",
    preview: <UnderlineVariantsPreview />,
  },
  {
    id: "preview-tooltip",
    title: "Preview Tooltip",
    description: "Hover over the links to see a tooltip preview — composed via the preview prop or Anchor.Preview.",
    preview: <PreviewTooltipPreview />,
  },
  {
    id: "breadcrumb",
    title: "Breadcrumb",
    description: "Anchor used as navigational crumbs — the last segment is non-interactive text.",
    preview: <BreadcrumbPreview />,
  },
];

export default function AnchorExamplesPage() {
  return (
    <DevExampleLayout
      title="Anchor Examples"
      description="Link component with underline variants and optional hover preview tooltips."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}

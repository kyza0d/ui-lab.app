"use client";

import { useState } from "react";

import { Badge, Flex } from "ui-lab-components";
import { FaTag, FaCircleCheck, FaTriangleExclamation, FaArrowRight, FaStar } from "react-icons/fa6";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function StatusBadgesPreview() {
  return (
    <Flex gap="sm" align="center" justify="center" wrap="wrap">
      <Badge variant="default">Draft</Badge>
      <Badge variant="default">In Review</Badge>
      <Badge variant="default">Published</Badge>
      <Badge variant="default">Archived</Badge>
    </Flex>
  );
}

function IconPositionPreview() {
  return (
    <Flex gap="xs" align="center" justify="center" wrap="wrap">
      <Badge icon={{ left: <FaCircleCheck size={10} /> }}>Verified</Badge>
      <Badge icon={{ left: <FaTriangleExclamation size={10} /> }}>Warning</Badge>
      <Badge icon={{ right: <FaArrowRight size={10} /> }}>Continue</Badge>
      <Badge icon={{ right: <FaStar size={10} /> }}>Featured</Badge>
    </Flex>
  );
}

function IconBadgePreview() {
  const tags = ["design", "frontend", "api", "docs"];
  const [active, setActive] = useState<string[]>(["design"]);

  function toggle(tag: string) {
    setActive((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <Flex gap="xs" align="center" justify="center" wrap="wrap">
      {tags.map((tag) => (
        <Badge
          key={tag}
          icon={<FaTag size={10} />}
          onClick={() => toggle(tag)}
          style={{
            cursor: "pointer",
            opacity: active.includes(tag) ? 1 : 0.45,
          }}
        >
          {tag}
        </Badge>
      ))}
    </Flex>
  );
}

function DismissiblePreview() {
  const initial = ["React", "TypeScript", "CSS Modules", "Next.js", "Radix UI"];
  const [tags, setTags] = useState(initial);

  return (
    <Flex gap="xs" align="center" justify="center" wrap="wrap">
      {tags.map((tag) => (
        <Badge
          key={tag}
          dismissible
          onDismiss={() => setTags((prev) => prev.filter((t) => t !== tag))}
        >
          {tag}
        </Badge>
      ))}
      {tags.length === 0 && (
        <span
          className="text-sm text-foreground-400 cursor-pointer"
          onClick={() => setTags(initial)}
        >
          All dismissed — click to reset
        </span>
      )}
    </Flex>
  );
}

function SemanticColorsPreview() {
  return (
    <Flex gap="sm" align="center" justify="center" wrap="wrap">
      <Badge className="bg-success-500/20 text-success-500 border-none">Success</Badge>
      <Badge className="bg-warning-500/20 text-warning-500 border-none">Warning</Badge>
      <Badge className="bg-danger-500/20 text-danger-500 border-none">Danger</Badge>
      <Badge className="bg-info-500/20 text-info-500 border-none">Info</Badge>
      <Badge className="bg-accent-500/20 text-accent-500 border-none">Accent</Badge>
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "status-badges",
    title: "Status Labels",
    description: "Inline status labels alongside text content, such as document or workflow states.",
    preview: <StatusBadgesPreview />,
  },
  {
    id: "icon-position",
    title: "Icon Position",
    description: "Icons placed on the left or right of the label — left for status/type indicators, right for directional cues.",
    preview: <IconPositionPreview />,
  },
  {
    id: "icon-tag",
    title: "Selectable Tags",
    description: "Icon-prefixed tags that toggle active state, e.g. for filtering or labeling.",
    preview: <IconBadgePreview />,
  },
  {
    id: "dismissible",
    title: "Dismissible Tags",
    description: "Applied label chips in a multi-select input or filter bar that can be individually removed.",
    preview: <DismissiblePreview />,
  },
  {
    id: "semantic-colors",
    title: "Semantic Colors",
    description: "Badges styled with design system semantic color tokens for success, warning, danger, info, and accent states.",
    preview: <SemanticColorsPreview />,
  },
];

export default function BadgeExamplesPage() {
  return (
    <DevExampleLayout
      title="Badge Examples"
      description="Focused examples showing Badge in real product contexts."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}

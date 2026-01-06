import type { ComponentCategory } from "ui-lab-registry";

export interface ExperimentalComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  relatedComponents: string[];
  tags?: string[];
  accessibility?: {
    hasAriaSupport: boolean;
    notes?: string[];
  };
  experimental: true;
}

export const experimentalRegistry: ExperimentalComponentMetadata[] = [
  {
    id: "frame",
    name: "Frame",
    description: "A decorative border/frame component for wrapping and highlighting content.",
    category: "container",
    relatedComponents: [],
    tags: ["frame", "border", "decorator", "wrapper"],
    accessibility: {
      hasAriaSupport: false,
      notes: [
        "Semantic div element for layout purposes",
        "No built-in ARIA roles - use for decorative framing",
        "Compose with accessible child components",
      ],
    },
    experimental: true,
  },
  {
    id: "toast",
    name: "Toast",
    description: "A notification component for displaying temporary messages.",
    category: "feedback",
    relatedComponents: [],
    tags: ["notification", "feedback", "temporary"],
    accessibility: {
      hasAriaSupport: true,
      notes: [
        "ARIA live regions",
        "Role=\"status\"",
        "Auto-dismiss support"
      ],
    },
    experimental: true,
  },
];

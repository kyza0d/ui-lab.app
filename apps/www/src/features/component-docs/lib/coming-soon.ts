import type { ComponentCategory } from "ui-lab-registry";

export type SiteOnlyComponentCategory = "media";
export type SiteComponentCategory = ComponentCategory | SiteOnlyComponentCategory;

export type SiteComponentCategoryDefinition = {
  id: SiteComponentCategory;
  name: string;
  label: string;
  description: string;
  iconName: string;
};

type ComingSoonComponent = {
  id: string;
  name: string;
  description: string;
  category: SiteComponentCategory;
};

export const siteOnlyComingSoonCategories = {
  media: {
    id: "media",
    label: "Media",
    name: "Media Components",
    description: "Components for presenting images, video, icons, and rich visual assets.",
    iconName: "Image",
  },
} satisfies Record<SiteOnlyComponentCategory, SiteComponentCategoryDefinition>;

export const comingSoonComponents: ComingSoonComponent[] = [
  {
    id: "toolbar",
    name: "Toolbar",
    description: "Groups action buttons into a structured strip for operations.",
    category: "composition",
  },
  {
    id: "voice",
    name: "Voice",
    description: "Captures voice input with recording controls and audio visualization.",
    category: "action",
  },
  {
    id: "carousel",
    name: "Carousel",
    description: "Cycles through content slides with navigation controls for browsing.",
    category: "navigation",
  },
  {
    id: "timeline",
    name: "Timeline",
    description: "Shows events along a chronological axis for history and progress.",
    category: "information",
  },
  {
    id: "skeleton",
    name: "Skeleton",
    description: "Renders placeholder shapes that mirror content while loading.",
    category: "feedback",
  },
  {
    id: "loading",
    name: "Loading",
    description: "Displays an animated indicator to communicate ongoing activity.",
    category: "feedback",
  },
  {
    id: "alert",
    name: "Alert",
    description: "Surfaces important messages inline to inform or warn users.",
    category: "feedback",
  },
  {
    id: "chart",
    name: "Chart",
    description: "Visualizes structured data with bars, lines, and trend displays.",
    category: "display",
  },
  {
    id: "image",
    name: "Image",
    description: "Displays responsive images with framing, loading, and presentation controls.",
    category: "media",
  },
  {
    id: "icon",
    name: "Icon",
    description: "Renders scalable symbols with consistent sizing, color, and accessibility.",
    category: "media",
  },
  {
    id: "video",
    name: "Video",
    description: "Embeds video content with playback framing and responsive presentation.",
    category: "media",
  },
];

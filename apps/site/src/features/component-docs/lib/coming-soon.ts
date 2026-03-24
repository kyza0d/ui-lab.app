type ComingSoonComponent = {
  id: string;
  name: string;
  description: string;
  category: string;
};

export const comingSoonComponents: ComingSoonComponent[] = [
  {
    id: "toolbar",
    name: "Toolbar",
    description: "Groups action buttons into a structured strip for operations.",
    category: "composition",
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
];

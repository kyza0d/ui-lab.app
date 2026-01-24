import {
  FaPalette,
  FaFill,
  FaIcons,
  FaWandMagicSparkles,
  FaBook,
  FaShapes,
  FaBox,
  FaCube,
} from "react-icons/fa6";
import type { ComponentType } from "react";

export interface NavigationItem {
  name: string;
  label: string;
  isDropdown?: boolean;
  icon?: ComponentType;
}

export const navigationData: NavigationItem[] = [
  { name: "documentation", label: "Documentation", isDropdown: true, icon: FaBook },
  { name: "components", label: "Components", icon: FaShapes },
  { name: "elements", label: "Elements", icon: FaCube },
  // { name: "roadmap", label: "Roadmap" },
  // { name: "marketplace", label: "Marketplace" },
  { name: "tools", label: "Tools", isDropdown: true },
] as const;

export const documentationItems = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
];

export const getDocumentationLink = (id: string) =>
  id === "overview" ? "/docs" : `/docs/${id}`;

export const toolsItems = [
  {
    title: "Color Palette Generator",
    description: "Generate beautiful color schemes.",
    href: "/tools/color-palette",
    icon: FaPalette,
  },
  {
    title: "Gradient Generator",
    description: "Create smooth CSS gradients easily.",
    href: "/tools/gradient",
    icon: FaFill,
  },
  {
    title: "Icon Finder",
    description: "Search and copy any icon instantly.",
    href: "/tools/icons",
    icon: FaIcons,
  },
  {
    title: "CSS Gradient Animator",
    description: "Animate gradients with pure CSS.",
    href: "/tools/css-animator",
    icon: FaWandMagicSparkles,
  },
];

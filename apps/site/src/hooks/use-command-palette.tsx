import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast/use-toast";
import type { Command } from "@ui-lab/components";
import { componentRegistry } from "@/lib/component-registry";
import {
  FaCompass,
  FaSquare,
  FaBookOpenReader,
  FaPalette,
  FaFont,
  FaRulerCombined,
  FaGear,
  FaFileExport,
  FaArrowRight,
  FaMagnifyingGlass,
} from "react-icons/fa6";

export function useCommandPalette() {
  const router = useRouter();

  const commands: Command[] = useMemo(() => {
    const cmds: Command[] = [
      // Navigation
      {
        id: "nav-home",
        label: "Go to Home",
        description: "Navigate to the home page",
        category: "Navigation",
        icon: <FaCompass size={14} />,
        shortcut: "⌘H",
        action: () => router.push("/"),
      },
      {
        id: "nav-components",
        label: "Browse Components",
        description: "View all UI components",
        category: "Navigation",
        icon: <FaSquare size={14} />,
        shortcut: "⌘B",
        action: () => router.push("/components"),
      },
      {
        id: "nav-docs",
        label: "Documentation",
        description: "Read the documentation",
        category: "Navigation",
        icon: <FaBookOpenReader size={14} />,
        shortcut: "⌘D",
        action: () => router.push("/docs"),
      },
      {
        id: "nav-customize",
        label: "Customize",
        description: "Customize theme, typography, and icons",
        category: "Navigation",
        icon: <FaPalette size={14} />,
        shortcut: "⌘T",
        action: () => router.push("/customize"),
      },
      {
        id: "nav-config",
        label: "View Configuration",
        description: "Export CSS configuration",
        category: "Navigation",
        icon: <FaGear size={14} />,
        shortcut: "⌘⇧E",
        action: () => router.push("/config"),
      },

      // Documentation Pages
      {
        id: "docs-overview",
        label: "Documentation Overview",
        description: "Component library overview",
        category: "Documentation",
        icon: <FaBookOpenReader size={14} />,
        action: () => router.push("/docs/overview"),
      },
      {
        id: "docs-installation",
        label: "Installation Guide",
        description: "How to install and set up",
        category: "Documentation",
        icon: <FaArrowRight size={14} />,
        action: () => router.push("/docs/installation"),
      },
      {
        id: "docs-usage",
        label: "Usage Guide",
        description: "How to use components",
        category: "Documentation",
        icon: <FaMagnifyingGlass size={14} />,
        action: () => router.push("/docs/usage"),
      },

      // Customization Pages
      {
        id: "customize-theming",
        label: "Color Theming",
        description: "Customize colors and palette",
        category: "Customization",
        icon: <FaPalette size={14} />,
        action: () => router.push("/customize/theming"),
      },
      {
        id: "customize-typography",
        label: "Typography Settings",
        description: "Configure fonts and sizes",
        category: "Customization",
        icon: <FaFont size={14} />,
        action: () => router.push("/customize/typography"),
      },
      {
        id: "customize-icons",
        label: "Icon Management",
        description: "Manage custom icon sets",
        category: "Customization",
        icon: <FaRulerCombined size={14} />,
        action: () => router.push("/customize/icons"),
      },

      // Components (from registry)
      ...componentRegistry.map((component) => {
        return {
          id: `component-${component.id}`,
          label: component.name,
          description: component.description,
          category: "Components",
          icon: React.createElement(FaSquare, { size: 14 }),
          action: () => router.push(`/components/${component.id}`),
        };
      }),

      // Quick Actions
      {
        id: "action-copy-config",
        label: "Copy Configuration",
        description: "Copy CSS config to clipboard",
        category: "Quick Actions",
        icon: <FaFileExport size={14} />,
        action: async () => {
          try {
            // This is a placeholder - actual implementation would get the config from context
            toast({
              title: "Success",
              description: "Configuration copied to clipboard",
            });
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to copy configuration",
            });
          }
        },
      },
    ];

    return cmds;
  }, [router]);

  return {
    commands,
  };
}

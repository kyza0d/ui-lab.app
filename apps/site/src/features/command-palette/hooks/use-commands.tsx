import { useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  FaBook,
  FaWrench,
  FaPlug,
  FaGithub,
  FaMoon,
  FaSun,
} from "react-icons/fa6";
import { componentRegistry, getCategoryIcon } from "@/features/component-docs";
import { toolsItems } from "@/features/layout/components/header/data";
import type { Command } from "ui-lab-components";

interface UseCommandsParams {
  currentThemeMode: "light" | "dark";
  setCurrentThemeMode: (mode: "light" | "dark") => void;
}

export function useCommands({
  currentThemeMode,
  setCurrentThemeMode,
}: UseCommandsParams) {
  const router = useRouter();

  return useMemo(() => {
    const cmds: Command[] = [];

    cmds.push({
      id: "docs-overview",
      label: "Documentation Overview",
      description: "View the documentation home page",
      category: "Documentation",
      icon: <FaBook className="w-4 h-4" />,
      keywords: ["docs", "overview", "documentation"],
      action: () => router.push("/docs"),
    });

    cmds.push({
      id: "docs-installation",
      label: "Installation Guide",
      description: "How to install and set up UI Lab",
      category: "Documentation",
      icon: <FaBook className="w-4 h-4" />,
      keywords: ["install", "setup", "guide"],
      action: () => router.push("/docs/installation"),
    });

    cmds.push({
      id: "docs-usage",
      label: "Usage Guide",
      description: "Learn how to use UI Lab components",
      category: "Documentation",
      icon: <FaBook className="w-4 h-4" />,
      keywords: ["usage", "how-to", "guide"],
      action: () => router.push("/docs/usage"),
    });

    componentRegistry.forEach((component) => {
      cmds.push({
        id: `component-${component.id}`,
        label: component.name,
        description: component.description,
        category: "Components",
        icon: getCategoryIcon(component.category as any),
        keywords: [component.id, component.name.toLowerCase()],
        action: () => router.push(`/components/${component.id}`),
      });
    });

    toolsItems.forEach((tool) => {
      cmds.push({
        id: `tool-${tool.title.toLowerCase().replace(/\s+/g, "-")}`,
        label: tool.title,
        description: tool.description,
        category: "Tools",
        icon: <FaWrench className="w-4 h-4" />,
        keywords: [tool.title.toLowerCase()],
        action: () => router.push(tool.href),
      });
    });

    cmds.push({
      id: "agents-mcps",
      label: "Agents & MCPs",
      description: "View agents and MCP documentation",
      category: "Navigation",
      icon: <FaPlug className="w-4 h-4" />,
      keywords: ["agents", "mcps", "plugins"],
      action: () => router.push("/agents-mcps"),
    });

    cmds.push({
      id: "github",
      label: "GitHub Repository",
      description: "Open UI Lab on GitHub",
      category: "Navigation",
      icon: <FaGithub className="w-4 h-4" />,
      keywords: ["github", "source", "repo"],
      action: () => {
        window.open("https://github.com/kyza0d/ui-lab.app", "_blank");
      },
    });

    cmds.push({
      id: "theme-toggle",
      label: `Switch to ${currentThemeMode === "light" ? "Dark" : "Light"} Mode`,
      description: `Toggle between light and dark themes`,
      category: "Settings",
      icon:
        currentThemeMode === "light" ? (
          <FaMoon className="w-4 h-4" />
        ) : (
          <FaSun className="w-4 h-4" />
        ),
      keywords: ["theme", "dark", "light", "mode"],
      action: () =>
        setCurrentThemeMode(currentThemeMode === "light" ? "dark" : "light"),
    });

    return cmds;
  }, [router, currentThemeMode, setCurrentThemeMode]);
}

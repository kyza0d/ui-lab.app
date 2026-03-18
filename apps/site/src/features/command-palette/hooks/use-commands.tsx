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
import { useDocsNavigationData } from "@/features/navigation/lib/docs-navigation-context";
import { getPagesForDomain } from "@/features/navigation/lib/sidebar-registry-resolver";
import { toolsItems } from "@/features/layout/components/header/data";
import type { CommandItem } from "ui-lab-components";

interface UseCommandsParams {
  currentThemeMode: "light" | "dark";
  setCurrentThemeMode: (mode: "light" | "dark") => void;
}

export function useCommands({
  currentThemeMode,
  setCurrentThemeMode,
}: UseCommandsParams) {
  const router = useRouter();
  const docsNavigationData = useDocsNavigationData();

  return useMemo(() => {
    const cmds: CommandItem[] = [];


    (["docs", "design-system"] as const).forEach((domain) => {
      getPagesForDomain(docsNavigationData, domain).forEach((page) => {
        const categoryPrefix = domain === "docs" ? "Docs" : "Design System";
        const category = page.isIndex
          ? categoryPrefix
          : page.section
            ? `${categoryPrefix} - ${page.section}`
            : categoryPrefix;

        cmds.push({
          id: `${domain}-${page.slug}`,
          label: page.title,
          description: page.description ?? undefined,
          category,
          icon: <FaBook className="w-4 h-4" />,
          keywords: [
            domain,
            page.slug,
            page.title.toLowerCase(),
            ...(page.section ? [page.section.toLowerCase()] : []),
            ...page.tags,
          ],
          action: () => router.push(page.url),
        });
      });
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
  }, [router, currentThemeMode, docsNavigationData, setCurrentThemeMode]);
}

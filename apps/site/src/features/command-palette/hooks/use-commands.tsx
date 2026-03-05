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
import { SIDEBAR_REGISTRY } from "@/features/navigation/lib/generated-sidebar-registry";
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

  return useMemo(() => {
    const cmds: CommandItem[] = [];









    Object.entries(SIDEBAR_REGISTRY).forEach(([domain, domainRegistry]) => {
      Object.values(domainRegistry.fileMap).forEach((file) => {
        const categoryPrefix =
          domain === "docs"
            ? "Docs"
            : domain === "design-system"
              ? "Design System"
              : "";
        const category = categoryPrefix ? `${categoryPrefix} - ${file.category}` : file.category;

        cmds.push({
          id: `${domain}-${file.slug}`,
          label: file.title,
          description: file.description,
          category: category || categoryPrefix,
          icon: <FaBook className="w-4 h-4" />,
          keywords: [
            domain,
            file.slug,
            file.title.toLowerCase(),
            ...(file.category ? [file.category.toLowerCase()] : []),
          ],
          action: () => router.push(`/${domain}/${file.slug}`),
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
  }, [router, currentThemeMode, setCurrentThemeMode]);
}

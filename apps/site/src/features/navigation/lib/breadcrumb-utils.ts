import { BREADCRUMB_REGISTRY } from "../lib/generated-breadcrumb-registry";
import { getComponentMetadata, categoryMap } from "@/features/component-docs";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  // Normalize trailing slashes for lookups
  const normalizedPath = pathname.endsWith('/') && pathname !== '/'
    ? pathname.slice(0, -1)
    : pathname;

  const registryItem = BREADCRUMB_REGISTRY.items.find(
    (item) => item.path === normalizedPath
  );

  if (registryItem) {
    return registryItem.breadcrumbs;
  }

  // Fallback for components - they're dynamically registered, not pre-discovered
  if (normalizedPath.startsWith('/components/')) {
    const componentId = normalizedPath.slice('/components/'.length);
    const metadata = getComponentMetadata(componentId);

    if (metadata) {
      const categoryKey = metadata.category as keyof typeof categoryMap;
      const categoryLabel = categoryMap[categoryKey]?.label || categoryKey;

      return [
        { label: "Components", href: "/components" },
        { label: categoryLabel },
        { label: metadata.name },
      ];
    }

    return [
      { label: "Components", href: "/components" },
      { label: componentId },
    ];
  }

  // Fallback: generic domain-based breadcrumb for unknown paths
  for (const domain of BREADCRUMB_REGISTRY.domains) {
    if (normalizedPath === domain.path || normalizedPath.startsWith(domain.path + '/')) {
      return [{ label: domain.label, href: domain.path }];
    }
  }

  return [];
}

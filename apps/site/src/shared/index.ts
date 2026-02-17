// Hooks
export { usePrefetchOnHover } from "./hooks/use-prefetch-on-hover";

// Utilities
export * from "./lib/layout-utils";
export { cn } from "./lib/utils";
export { generateMetadata, type SiteMetadataConfig } from "./lib/metadata";
export { extractDocMetadata, extractComponentMetadata, extractElementMetadata, type ExtractedMetadata, type DocMetadata, type ComponentMetadata, type ElementMetadata } from "./lib/metadata-extractors";
export { Dashboard } from "./lib/demos/dashboard";

// Re-export from features for backward compatibility
export { getHeaderHeight, shouldShowHeaderTabs, getActiveTabValue, getDomainsWithTabs, shouldShowHeaderSearch, shouldApplyRevealCollapse, DOMAINS, getTabGroupForPathname, getActiveTabForPathname, shouldShowTabsForPathname, TAB_GROUPS, type TabConfig, type TabGroup } from "@/features/layout/lib/route-config";
export { Logo, Sidebar } from "@/features/layout/components";
export { copyToClipboard, generateFullThemeConfig } from "@/features/theme/config";

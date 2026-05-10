// Hooks
export { usePrefetchOnHover } from "./hooks/use-prefetch-on-hover";
export { useUrlSearchParams } from "./hooks/use-url-search-params";

// Utilities
export * from "./lib/layout-utils";
export { cn } from "./lib/utils";
export { generateMetadata } from "./lib/metadata";
export { Dashboard } from "./lib/demos/dashboard";

// Re-export from features for backward compatibility
export { Logo, Sidebar } from "@/features/layout/components";
export { getTabGroupForPathname, getActiveTabForPathname, shouldApplyRevealCollapse, type TabConfig } from "@/features/layout/lib/route-config";

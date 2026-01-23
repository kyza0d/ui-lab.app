// Components
export { default as Aura } from "./components/aura";
export { CodeBlock } from "./components/code-block";
export { CodeBlockWithPackageManager } from "./components/code-block-with-package-manager";
export { CopyButton } from "./components/copy-button";
export { EnumUnionHighlight } from "./components/enum-union-highlight";
export { InlineCodeHighlight } from "./components/inline-code-highlight";
export { InstallationFlow } from "./components/installation-flow";
export { PackageManagerTabs } from "./components/package-manager-tabs";
export { PrefetchLink } from "./components/prefetch-link";
export { Logo } from "./components/ui/logo";
export { Sidebar } from "./components/sidebar";

// Hooks
export { useExternalWindow } from "./hooks/use-external-window";
export { usePrefetchOnHover } from "./hooks/use-prefetch-on-hover";

// Utilities
export * from "./lib/config-generator";
export { getHeaderHeight, shouldShowHeaderTabs, getActiveTabValue, getDomainsWithTabs, shouldShowHeaderSearch, shouldApplyRevealCollapse, DOMAINS, getTabGroupForPathname, getActiveTabForPathname, shouldShowTabsForPathname, TAB_GROUPS, type TabConfig, type TabGroup } from "./lib/route-config";
export * from "./lib/typography-utils";
export { useCodeHighlight } from "./lib/use-code-highlight";
export { cn } from "./lib/utils";
export { generateMetadata, type SiteMetadataConfig } from "./lib/metadata";
export { extractDocMetadata, extractComponentMetadata, extractElementMetadata, type ExtractedMetadata, type DocMetadata, type ComponentMetadata, type ElementMetadata } from "./lib/metadata-extractors";
export { Dashboard } from "./lib/demos/dashboard";

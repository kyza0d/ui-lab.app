export interface BreadcrumbSegment {
  label: string;
  href?: string;
}

export interface BreadcrumbRegistryItem {
  path: string;
  domain: string;
  domainLabel: string;
  breadcrumbs: BreadcrumbSegment[];
}

export interface BreadcrumbRegistry {
  items: BreadcrumbRegistryItem[];
  domains: Array<{ path: string; label: string }>;
}

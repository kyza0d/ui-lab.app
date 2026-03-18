export type DocsNavigationDomain = 'docs' | 'design-system';

export interface DocsNavigationPage {
  domain: DocsNavigationDomain;
  slug: string;
  url: string;
  title: string;
  description: string | null;
  section: string | null;
  isIndex: boolean;
  tags: string[];
}

interface DocsNavigationPageTreeItem {
  id: string;
  label: string;
  slug: string;
  url: string;
}

interface DocsNavigationPageTreeSection {
  label: string;
  items: DocsNavigationPageTreeItem[];
}

interface DocsNavigationDomainData {
  pageTree: DocsNavigationPageTreeSection[];
  pages: DocsNavigationPage[];
}

export interface DocsNavigationData {
  docs: DocsNavigationDomainData;
  'design-system': DocsNavigationDomainData;
}

export function getSectionsForDomain(data: DocsNavigationData, domain: DocsNavigationDomain) {
  return data[domain].pageTree.map((section) => ({
    label: section.label,
    items: section.items.map((item) => ({
      id: item.slug,
      label: item.label,
    })),
  }));
}

export function getPagesForDomain(data: DocsNavigationData, domain: DocsNavigationDomain) {
  return data[domain].pages;
}

function getFileMetadata(data: DocsNavigationData, domain: DocsNavigationDomain, slug: string) {
  return data[domain].pages.find((page) => page.slug === slug) ?? null;
}

function getAllSlugsForDomain(data: DocsNavigationData, domain: DocsNavigationDomain) {
  return data[domain].pages.map((page) => page.slug);
}

function validateSlugExists(data: DocsNavigationData, domain: DocsNavigationDomain, slug: string) {
  const allSlugs = getAllSlugsForDomain(data, domain);
  return allSlugs.includes(slug);
}

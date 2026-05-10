import {
  DOCS_MANIFEST,
  type DocsDomain,
  type GeneratedDocsPageManifest,
  type GeneratedDocsPageTreeSection,
} from './generated-docs-manifest';

export type DocsSourceDomain = DocsDomain;
export type DocsSourcePageMetadata = GeneratedDocsPageManifest;
type DocsSourcePageTree = GeneratedDocsPageTreeSection[];

export interface DocsSourcePage extends DocsSourcePageMetadata {
  body: string;
}

export interface DocsAdjacentPages {
  prev: DocsSourcePageMetadata | null;
  next: DocsSourcePageMetadata | null;
}

interface DocsSource {
  getPageMetadata(domain: DocsSourceDomain, slug: string): DocsSourcePageMetadata | null;
  getRootPageMetadata(domain: DocsSourceDomain): DocsSourcePageMetadata | null;
  getPageBody(domain: DocsSourceDomain, slug: string): Promise<string | null>;
  getPage(domain: DocsSourceDomain, slug: string): Promise<DocsSourcePage | null>;
  getRootPage(domain: DocsSourceDomain): Promise<DocsSourcePage | null>;
  getPageTree(domain: DocsSourceDomain): DocsSourcePageTree;
  generateParams(domain: DocsSourceDomain): Array<{ slug: string }>;
  getAllPages(domain: DocsSourceDomain): DocsSourcePageMetadata[];
  getAdjacentPages(domain: DocsSourceDomain, slug?: string): DocsAdjacentPages;
}

const PAGE_LOOKUPS = Object.fromEntries(
  (Object.keys(DOCS_MANIFEST) as DocsSourceDomain[]).map((domain) => [
    domain,
    new Map(DOCS_MANIFEST[domain].pages.map((page) => [page.slug, page])),
  ])
) as Record<DocsSourceDomain, Map<string, GeneratedDocsPageManifest>>;

function normalizeSlug(slug: string): string {
  return decodeURIComponent(slug)
    .replace(/^\/+|\/+$/g, '')
    .replace(/\/+/g, '-')
}

function getPageMetadata(domain: DocsSourceDomain, slug: string): GeneratedDocsPageManifest | null {
  return PAGE_LOOKUPS[domain].get(normalizeSlug(slug)) ?? null;
}

function getRootPageMetadata(domain: DocsSourceDomain): GeneratedDocsPageManifest | null {
  return DOCS_MANIFEST[domain].pages.find((page) => page.isIndex) ?? null;
}

async function getPageBody(domain: DocsSourceDomain, slug: string): Promise<string | null> {
  const { DOCS_BODIES } = await import('./generated-docs-bodies');
  return DOCS_BODIES[domain][normalizeSlug(slug)] ?? null;
}

async function getPage(domain: DocsSourceDomain, slug: string): Promise<DocsSourcePage | null> {
  const page = getPageMetadata(domain, slug);
  if (!page) {
    return null;
  }

  const body = await getPageBody(domain, page.slug);
  if (body === null) {
    return null;
  }

  return {
    ...page,
    body,
  };
}

async function getRootPage(domain: DocsSourceDomain): Promise<DocsSourcePage | null> {
  const rootPage = getRootPageMetadata(domain);
  if (!rootPage) {
    return null;
  }

  return getPage(domain, rootPage.slug);
}

function getPageTree(domain: DocsSourceDomain): DocsSourcePageTree {
  return DOCS_MANIFEST[domain].pageTree;
}

function generateParams(domain: DocsSourceDomain): Array<{ slug: string }> {
  return DOCS_MANIFEST[domain].pages
    .filter((page) => !page.isIndex)
    .map((page) => ({ slug: page.slug }));
}

function getAllPages(domain: DocsSourceDomain): DocsSourcePageMetadata[] {
  return DOCS_MANIFEST[domain].pages;
}

function getAdjacentPages(domain: DocsSourceDomain, slug?: string): DocsAdjacentPages {
  const pages = DOCS_MANIFEST[domain].pages.filter((p) => !p.isIndex);
  if (!slug) {
    return { prev: null, next: pages[0] ?? null };
  }
  const idx = pages.findIndex((p) => p.slug === normalizeSlug(slug));
  if (idx === -1) {
    return { prev: null, next: pages[0] ?? null };
  }
  return {
    prev: idx > 0 ? pages[idx - 1] : null,
    next: idx < pages.length - 1 ? pages[idx + 1] : null,
  };
}

export const docsSource: DocsSource = {
  getPageMetadata,
  getRootPageMetadata,
  getPageBody,
  getPage,
  getRootPage,
  getPageTree,
  generateParams,
  getAllPages,
  getAdjacentPages,
};

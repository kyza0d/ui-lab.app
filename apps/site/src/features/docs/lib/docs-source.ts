import 'server-only';

import {
  DOCS_MANIFEST,
  type DocsDomain,
  type GeneratedDocsPageManifest,
  type GeneratedDocsPageTreeSection,
} from './generated-docs-manifest';

export type DocsSourceDomain = DocsDomain;
export type DocsSourcePageMetadata = GeneratedDocsPageManifest;
export type DocsSourcePageTree = GeneratedDocsPageTreeSection[];

export interface DocsSourcePage extends DocsSourcePageMetadata {
  body: string;
}

export interface DocsSource {
  getPageMetadata(domain: DocsSourceDomain, slug: string): DocsSourcePageMetadata | null;
  getRootPageMetadata(domain: DocsSourceDomain): DocsSourcePageMetadata | null;
  getPageBody(domain: DocsSourceDomain, slug: string): Promise<string | null>;
  getPage(domain: DocsSourceDomain, slug: string): Promise<DocsSourcePage | null>;
  getRootPage(domain: DocsSourceDomain): Promise<DocsSourcePage | null>;
  getPageTree(domain: DocsSourceDomain): DocsSourcePageTree;
  generateParams(domain: DocsSourceDomain): Array<{ slug: string }>;
  getAllPages(domain: DocsSourceDomain): DocsSourcePageMetadata[];
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

export const docsSource: DocsSource = {
  getPageMetadata,
  getRootPageMetadata,
  getPageBody,
  getPage,
  getRootPage,
  getPageTree,
  generateParams,
  getAllPages,
};

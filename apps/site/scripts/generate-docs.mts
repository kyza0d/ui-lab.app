import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DOMAINS = {
  docs: {
    contentDir: path.join(__dirname, '../content/docs'),
    baseUrl: '/docs',
  },
  'design-system': {
    contentDir: path.join(__dirname, '../content/design-system'),
    baseUrl: '/design-system',
  },
} as const;

const OUTPUT_FILES = {
  manifest: path.join(__dirname, '../src/features/docs/lib/generated-docs-manifest.ts'),
  bodies: path.join(__dirname, '../src/features/docs/lib/generated-docs-bodies.ts'),
} as const;

type DocsDomain = keyof typeof CONTENT_DOMAINS;

interface GeneratedTocItem {
  id: string;
  title: string;
  level: number;
}

interface GeneratedDocsPageManifest {
  domain: DocsDomain;
  slug: string;
  url: string;
  title: string;
  label: string;
  description: string | null;
  section: string | null;
  toc: GeneratedTocItem[];
  isIndex: boolean;
  order: number;
  sectionOrder: number;
  publishedOn: string | null;
  tags: string[];
}

interface GeneratedDocsPageTreeItem {
  id: string;
  label: string;
  slug: string;
  url: string;
}

interface GeneratedDocsPageTreeSection {
  label: string;
  items: GeneratedDocsPageTreeItem[];
}

interface GeneratedDocsDomainManifest {
  pages: GeneratedDocsPageManifest[];
  pageTree: GeneratedDocsPageTreeSection[];
}

interface GeneratedDocsManifest {
  docs: GeneratedDocsDomainManifest;
  'design-system': GeneratedDocsDomainManifest;
}

type GeneratedDocsBodies = Record<DocsDomain, Record<string, string>>;

interface FolderMetaPageEntry {
  name: string;
  title?: string;
}

interface FolderMeta {
  title?: string;
  pages?: FolderMetaPageEntry[];
}

interface ContentFile {
  filePath: string;
  name: string;
}

interface ContentDirectory {
  dirPath: string;
  name: string;
  meta: FolderMeta | null;
  files: ContentFile[];
  directories: ContentDirectory[];
}

interface OrderedDirectoryEntryBase {
  name: string;
  title?: string;
}

interface OrderedDirectoryFileEntry extends OrderedDirectoryEntryBase {
  kind: 'file';
  file: ContentFile;
}

interface OrderedDirectoryDirectoryEntry extends OrderedDirectoryEntryBase {
  kind: 'directory';
  directory: ContentDirectory;
}

type OrderedDirectoryEntry = OrderedDirectoryFileEntry | OrderedDirectoryDirectoryEntry;

interface TraversalContext {
  domain: DocsDomain;
  baseUrl: string;
  rawSegments: string[];
  section: string | null;
  sectionOrder: number;
  label?: string;
}

function isGroupingFolder(name: string): boolean {
  return /^\(.+\)$/.test(name);
}

function stripGroupingFolder(name: string): string {
  return isGroupingFolder(name) ? name.slice(1, -1) : name;
}

function slugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function extractHeadings(markdown: string): GeneratedTocItem[] {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings: GeneratedTocItem[] = [];
  const idCounts = new Map<string, number>();

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawTitle = match[2];
    const title = rawTitle.replace(/<[^>]*>?/gm, '').trim();

    let id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const count = (idCounts.get(id) ?? 0) + 1;
    idCounts.set(id, count);

    if (count > 1) {
      id = `${id}-${count}`;
    }

    headings.push({ id, title, level });
  }

  return headings;
}

function parseFolderMeta(metaPath: string): FolderMeta | null {
  if (!fs.existsSync(metaPath)) {
    return null;
  }

  const parsed = JSON.parse(fs.readFileSync(metaPath, 'utf8')) as { title?: unknown; pages?: unknown };
  const title = typeof parsed.title === 'string' && parsed.title.length > 0 ? parsed.title : undefined;
  const pages = Array.isArray(parsed.pages)
    ? parsed.pages.flatMap((entry) => {
        if (typeof entry === 'string' && entry.length > 0) {
          return [{ name: entry } satisfies FolderMetaPageEntry];
        }

        if (
          typeof entry === 'object' &&
          entry !== null &&
          'name' in entry &&
          typeof entry.name === 'string' &&
          entry.name.length > 0
        ) {
          return [
            {
              name: entry.name,
              title:
                'title' in entry && typeof entry.title === 'string' && entry.title.length > 0
                  ? entry.title
                  : undefined,
            } satisfies FolderMetaPageEntry,
          ];
        }

        return [];
      })
    : undefined;

  return {
    title,
    pages,
  };
}

function scanContentDirectory(dirPath: string, name = ''): ContentDirectory {
  const entries = fs.existsSync(dirPath) ? fs.readdirSync(dirPath, { withFileTypes: true }) : [];
  const directories: ContentDirectory[] = [];
  const files: ContentFile[] = [];

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      directories.push(scanContentDirectory(entryPath, entry.name));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      files.push({
        filePath: entryPath,
        name: entry.name.replace(/\.mdx$/, ''),
      });
    }
  }

  return {
    dirPath,
    name,
    meta: parseFolderMeta(path.join(dirPath, 'meta.json')),
    files,
    directories,
  };
}

function getDirectoryPageFile(directory: ContentDirectory): ContentFile | null {
  return directory.files.find((file) => file.name === 'page') ?? directory.files.find((file) => file.name === 'index') ?? null;
}

function getOrderedDirectoryEntries(directory: ContentDirectory): OrderedDirectoryEntry[] {
  const metaPageMap = new Map((directory.meta?.pages ?? []).map((entry, index) => [entry.name, { index, title: entry.title }]));
  const entries: OrderedDirectoryEntry[] = [
    ...directory.directories.map((child) => ({
      kind: 'directory' as const,
      name: child.name,
      title: metaPageMap.get(child.name)?.title,
      directory: child,
    })),
    ...directory.files
      .filter((file) => file.name !== 'page' && file.name !== 'index')
      .map((file) => ({
        kind: 'file' as const,
        name: file.name,
        title: metaPageMap.get(file.name)?.title,
        file,
      })),
  ];

  return entries.sort((a, b) => {
    const aOrder = metaPageMap.get(a.name)?.index ?? Number.MAX_SAFE_INTEGER;
    const bOrder = metaPageMap.get(b.name)?.index ?? Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.name.localeCompare(b.name);
  });
}

function createPageManifest(
  filePath: string,
  context: TraversalContext,
  order: number
): { page: GeneratedDocsPageManifest; body: string } {
  const source = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(source);
  const slugSegments = context.rawSegments.filter((segment) => !isGroupingFolder(segment));
  const slug = slugSegments.length > 0 ? slugSegments.join('-') : 'index';
  const isIndex = slug === 'index';
  const title =
    typeof data.title === 'string' && data.title.length > 0
      ? data.title
      : slugToTitle(slugSegments.at(-1) ?? slug);
  const description = typeof data.description === 'string' ? data.description : null;
  const section = isIndex ? null : context.section ?? (typeof data.category === 'string' ? data.category : null);
  const publishedOn = typeof data.publishedOn === 'string' ? data.publishedOn : null;
  const tags = Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : [];

  return {
    page: {
      domain: context.domain,
      slug,
      url: isIndex ? context.baseUrl : `${context.baseUrl}/${slug}`,
      title,
      label: context.label ?? title,
      description,
      section,
      toc: extractHeadings(content),
      isIndex,
      order,
      sectionOrder: context.section ? context.sectionOrder : 999,
      publishedOn,
      tags,
    } satisfies GeneratedDocsPageManifest,
    body: content,
  };
}

function collectDirectoryPages(
  directory: ContentDirectory,
  context: TraversalContext,
  orderState: Map<string, number>,
  pages: Array<{ page: GeneratedDocsPageManifest; body: string }>
): void {
  const directoryPageFile = getDirectoryPageFile(directory);
  const orderKey = context.section ?? '__root__';

  if (directoryPageFile && context.rawSegments.length > 0) {
    const order = orderState.get(orderKey) ?? 0;
    orderState.set(orderKey, order + 1);
    pages.push(createPageManifest(directoryPageFile.filePath, context, order));
  }

  for (const entry of getOrderedDirectoryEntries(directory)) {
    if (entry.kind === 'directory') {
      collectDirectoryPages(
        entry.directory,
        {
          domain: context.domain,
          baseUrl: context.baseUrl,
          rawSegments: [...context.rawSegments, entry.directory.name],
          section: context.section,
          sectionOrder: context.sectionOrder,
          label: entry.title,
        },
        orderState,
        pages
      );
      continue;
    }

    const order = orderState.get(orderKey) ?? 0;
    orderState.set(orderKey, order + 1);
    pages.push(
      createPageManifest(
        entry.file.filePath,
        {
          domain: context.domain,
          baseUrl: context.baseUrl,
          rawSegments: [...context.rawSegments, entry.file.name],
          section: context.section,
          sectionOrder: context.sectionOrder,
          label: entry.title,
        },
        order
      )
    );
  }
}

function isSectionDirectory(directory: ContentDirectory): boolean {
  return isGroupingFolder(directory.name) || getDirectoryPageFile(directory) === null;
}

function getSectionLabel(directory: ContentDirectory): string {
  return directory.meta?.title ?? slugToTitle(stripGroupingFolder(directory.name));
}

function comparePages(a: GeneratedDocsPageManifest, b: GeneratedDocsPageManifest): number {
  if (a.isIndex !== b.isIndex) {
    return a.isIndex ? -1 : 1;
  }

  if (a.sectionOrder !== b.sectionOrder) {
    return a.sectionOrder - b.sectionOrder;
  }

  if (a.order !== b.order) {
    return a.order - b.order;
  }

  return a.slug.localeCompare(b.slug);
}

function buildPageTree(pages: GeneratedDocsPageManifest[]): GeneratedDocsPageTreeSection[] {
  const sectionMap = new Map<string, GeneratedDocsPageTreeItem[]>();

  for (const page of pages) {
    if (page.isIndex || !page.section) {
      continue;
    }

    if (!sectionMap.has(page.section)) {
      sectionMap.set(page.section, []);
    }

    sectionMap.get(page.section)?.push({
      id: page.slug,
      label: page.label,
      slug: page.slug,
      url: page.url,
    });
  }

  return Array.from(sectionMap.entries()).map(([label, items]) => ({
    label,
    items,
  }));
}

function readDomainContent(domain: DocsDomain): { pages: GeneratedDocsPageManifest[]; bodies: Record<string, string> } {
  const { contentDir, baseUrl } = CONTENT_DOMAINS[domain];
  const rootDirectory = scanContentDirectory(contentDir);
  const rawPages: Array<{ page: GeneratedDocsPageManifest; body: string }> = [];
  const rootPageFile = getDirectoryPageFile(rootDirectory);
  const orderState = new Map<string, number>();

  if (rootPageFile) {
    rawPages.push(
      createPageManifest(
        rootPageFile.filePath,
        {
          domain,
          baseUrl,
          rawSegments: [],
          section: null,
          sectionOrder: 999,
        },
        -1
      )
    );
  }

  let sectionOrder = 0;

  for (const entry of getOrderedDirectoryEntries(rootDirectory)) {
    if (entry.kind === 'directory') {
      if (isSectionDirectory(entry.directory)) {
        collectDirectoryPages(
          entry.directory,
          {
            domain,
            baseUrl,
            rawSegments: [entry.directory.name],
            section: getSectionLabel(entry.directory),
            sectionOrder,
          },
          orderState,
          rawPages
        );
        sectionOrder += 1;
        continue;
      }

      collectDirectoryPages(
        entry.directory,
        {
          domain,
          baseUrl,
          rawSegments: [entry.directory.name],
          section: null,
          sectionOrder: 999,
          label: entry.title,
        },
        orderState,
        rawPages
      );
      continue;
    }

    const orderKey = '__root__';
    const order = orderState.get(orderKey) ?? 0;
    orderState.set(orderKey, order + 1);
    rawPages.push(
      createPageManifest(
        entry.file.filePath,
        {
          domain,
          baseUrl,
          rawSegments: [entry.file.name],
          section: null,
          sectionOrder: 999,
          label: entry.title,
        },
        order
      )
    );
  }

  const pages = rawPages.map(({ page }) => page).sort(comparePages);
  const bodies = Object.fromEntries(rawPages.map(({ page, body }) => [page.slug, body]));

  return { pages, bodies };
}

function generateManifestModule(manifest: GeneratedDocsManifest): string {
  return `import 'server-only';

export type DocsDomain = 'docs' | 'design-system';

export interface GeneratedDocsTocItem {
  id: string;
  title: string;
  level: number;
}

export interface GeneratedDocsPageManifest {
  domain: DocsDomain;
  slug: string;
  url: string;
  title: string;
  label: string;
  description: string | null;
  section: string | null;
  toc: GeneratedDocsTocItem[];
  isIndex: boolean;
  order: number;
  sectionOrder: number;
  publishedOn: string | null;
  tags: string[];
}

export interface GeneratedDocsPageTreeItem {
  id: string;
  label: string;
  slug: string;
  url: string;
}

export interface GeneratedDocsPageTreeSection {
  label: string;
  items: GeneratedDocsPageTreeItem[];
}

export interface GeneratedDocsDomainManifest {
  pages: GeneratedDocsPageManifest[];
  pageTree: GeneratedDocsPageTreeSection[];
}

export interface GeneratedDocsManifest {
  docs: GeneratedDocsDomainManifest;
  'design-system': GeneratedDocsDomainManifest;
}

export const DOCS_MANIFEST: GeneratedDocsManifest = ${JSON.stringify(manifest, null, 2)};
`;
}

function generateBodiesModule(bodies: GeneratedDocsBodies): string {
  return `import 'server-only';

import type { DocsDomain } from './generated-docs-manifest';

export type GeneratedDocsBodies = Record<DocsDomain, Record<string, string>>;

export const DOCS_BODIES: GeneratedDocsBodies = ${JSON.stringify(bodies, null, 2)};
`;
}

function writeOutputFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ Generated ${path.relative(path.join(__dirname, '..'), filePath)}`);
}

async function generate(): Promise<void> {
  const manifest = {} as GeneratedDocsManifest;
  const bodies = {} as GeneratedDocsBodies;

  for (const domain of Object.keys(CONTENT_DOMAINS) as DocsDomain[]) {
    const { pages, bodies: domainBodies } = readDomainContent(domain);
    const pageTree = buildPageTree(pages);

    manifest[domain] = { pages, pageTree };
    bodies[domain] = domainBodies;

    console.log(`Processed ${domain}: ${pages.length} pages`);
  }

  writeOutputFile(OUTPUT_FILES.manifest, generateManifestModule(manifest));
  writeOutputFile(OUTPUT_FILES.bodies, generateBodiesModule(bodies));
}

generate().catch((error) => {
  console.error('Failed to generate documentation:', error);
  process.exit(1);
});

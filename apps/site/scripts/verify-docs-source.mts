import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

type DocsDomain = 'docs' | 'design-system';

interface GeneratedDocsTocItem {
  id: string;
  title: string;
  level: number;
}

interface GeneratedDocsPageManifest {
  slug: string;
  url: string;
  toc: GeneratedDocsTocItem[];
  isIndex: boolean;
}

interface GeneratedDocsPageTreeItem {
  slug: string;
  url: string;
}

interface GeneratedDocsPageTreeSection {
  items: GeneratedDocsPageTreeItem[];
}

interface GeneratedDocsDomainManifest {
  pages: GeneratedDocsPageManifest[];
  pageTree: GeneratedDocsPageTreeSection[];
}

type GeneratedDocsManifest = Record<DocsDomain, GeneratedDocsDomainManifest>;
type GeneratedDocsBodies = Record<DocsDomain, Record<string, string>>;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function readGeneratedConst<T>(filePath: string, exportName: string): T {
  const source = fs.readFileSync(filePath, 'utf8');
  const exportIndex = source.indexOf(`export const ${exportName}`);
  const objectStart = source.indexOf('{', exportIndex);
  const objectEnd = source.lastIndexOf('};');

  if (exportIndex === -1 || objectStart === -1 || objectEnd === -1) {
    throw new Error(`Unable to read ${exportName} from ${filePath}`);
  }

  return JSON.parse(source.slice(objectStart, objectEnd + 1)) as T;
}

function extractHeadings(markdown: string): GeneratedDocsTocItem[] {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings: GeneratedDocsTocItem[] = [];
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

function fail(message: string): never {
  throw new Error(message);
}

const DOCS_MANIFEST = readGeneratedConst<GeneratedDocsManifest>(
  path.join(__dirname, '../src/features/docs/lib/generated-docs-manifest.ts'),
  'DOCS_MANIFEST'
);
const DOCS_BODIES = readGeneratedConst<GeneratedDocsBodies>(
  path.join(__dirname, '../src/features/docs/lib/generated-docs-bodies.ts'),
  'DOCS_BODIES'
);
const allUrls = new Map<string, string>();

for (const domain of Object.keys(DOCS_MANIFEST) as DocsDomain[]) {
  const manifest = DOCS_MANIFEST[domain];
  const pagesBySlug = new Map(manifest.pages.map((page) => [page.slug, page]));
  const rootPage = manifest.pages.find((page) => page.isIndex);

  if (!rootPage) {
    fail(`Missing root page for ${domain}`);
  }

  for (const page of manifest.pages) {
    const existingDomain = allUrls.get(page.url);
    if (existingDomain) {
      fail(`Duplicate URL ${page.url} found in ${existingDomain} and ${domain}`);
    }

    allUrls.set(page.url, domain);

    const body = DOCS_BODIES[domain][page.slug];
    if (typeof body !== 'string') {
      fail(`Missing body for ${domain}/${page.slug}`);
    }

    const headings = extractHeadings(body);
    if (headings.length > 0 && page.toc.length === 0) {
      fail(`Missing TOC for ${domain}/${page.slug}`);
    }

    if (JSON.stringify(headings) !== JSON.stringify(page.toc)) {
      fail(`TOC mismatch for ${domain}/${page.slug}`);
    }
  }

  for (const section of manifest.pageTree) {
    for (const item of section.items) {
      const page = pagesBySlug.get(item.slug);
      if (!page) {
        fail(`Missing pageTree target for ${domain}/${item.slug}`);
      }

      if (page.isIndex) {
        fail(`pageTree includes root page for ${domain}/${item.slug}`);
      }

      if (page.url !== item.url) {
        fail(`pageTree URL mismatch for ${domain}/${item.slug}`);
      }
    }
  }

  console.log(`${domain}: ${manifest.pages.length} pages, ${manifest.pageTree.length} sections`);
}

console.log('Docs source verified');

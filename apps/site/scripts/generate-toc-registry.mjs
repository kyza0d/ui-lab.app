import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '../content/docs');
const DESIGN_SYSTEM_DIR = path.join(__dirname, '../content/design-system');
const OUTPUT_FILE = path.join(__dirname, '../src/features/docs/lib/generated-toc-registry.ts');

function extractHeadings(markdown) {
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  const headings = [];
  const idCounts = new Map();

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2];
    let id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const count = (idCounts.get(id) || 0) + 1;
    idCounts.set(id, count);
    if (count > 1) {
      id = `${id}-${count}`;
    }

    headings.push({ level, title, id });
  }

  return headings;
}

function processDirectory(dir, tocRegistry) {
  if (!fs.existsSync(dir)) {
    return 0;
  }

  const files = fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'));
  let totalHeadings = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const slug = file.replace(/\.mdx$/, '');

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const { content: markdown } = matter(content);
      const headings = extractHeadings(markdown);

      if (headings.length > 0) {
        tocRegistry[slug] = headings.map((h) => ({
          id: h.id,
          title: h.title,
          level: h.level,
        }));
        totalHeadings += headings.length;
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  return totalHeadings;
}

function generateTocRegistry() {
  const tocRegistry = {};
  let totalHeadings = 0;
  let totalFiles = 0;

  totalHeadings += processDirectory(DOCS_DIR, tocRegistry);
  totalHeadings += processDirectory(DESIGN_SYSTEM_DIR, tocRegistry);

  const docsFiles = fs.existsSync(DOCS_DIR) ? fs.readdirSync(DOCS_DIR).filter((f) => f.endsWith('.mdx')).length : 0;
  const dsFiles = fs.existsSync(DESIGN_SYSTEM_DIR) ? fs.readdirSync(DESIGN_SYSTEM_DIR).filter((f) => f.endsWith('.mdx')).length : 0;
  totalFiles = docsFiles + dsFiles;

  // Generate TypeScript file
  const output = `// This file is auto-generated. Do not edit manually.
// To regenerate, run: npm run generate:docs

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export type TocRegistry = Record<string, TocItem[]>;

export const tocRegistry: TocRegistry = ${JSON.stringify(tocRegistry, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`✓ Generated TOC registry: ${OUTPUT_FILE}`);
  console.log(`  Found ${totalFiles} documentation files`);
  console.log(`  Extracted ${totalHeadings} total headings`);
}

try {
  generateTocRegistry();
} catch (error) {
  console.error('Failed to generate TOC registry:', error);
  process.exit(1);
}

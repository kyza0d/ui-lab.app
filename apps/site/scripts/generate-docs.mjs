import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.join(__dirname, '../content/docs');
const OUTPUT_FILE = path.join(__dirname, '../src/lib/generated-docs.ts');
const TOC_GENERATOR = path.join(__dirname, './generate-toc-registry.mjs');

/**
 * @typedef {Object} DocMetadata
 * @property {string} id
 * @property {string} title
 * @property {number} [order]
 */

/**
 * @param {string} filePath
 * @returns {DocMetadata | null}
 */
function getDocMetadata(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    const filename = path.basename(filePath, '.mdx');

    // Skip index, but keep all other files including installation
    if (filename === 'index') {
      return null;
    }

    return {
      id: filename,
      title: data.title || filename,
      order: data.order || 999,
    };
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function generateDocumentation() {
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`Docs directory not found: ${DOCS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DOCS_DIR).filter((file) => file.endsWith('.mdx'));
  const docs = files
    .map((file) => getDocMetadata(path.join(DOCS_DIR, file)))
    .filter((doc) => doc !== null)
    .sort((a, b) => a.order - b.order);

  // Organize sections
  const sections = [];

  // Getting Started
  sections.push({
    label: 'Getting Started',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'installation', label: 'Installation' },
      { id: 'getting-started', label: 'Getting Started' },
    ].filter((item) =>
      item.id === 'introduction' || docs.some((doc) => doc.id === item.id)
    ),
  });

  // Development
  const developmentDocs = docs.filter((doc) =>
    ['styling', 'best-practices', 'cli-guide'].includes(doc.id)
  );
  if (developmentDocs.length > 0) {
    const order = ['cli-guide', 'styling', 'best-practices'];
    sections.push({
      label: 'Development',
      items: developmentDocs
        .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
        .map((doc) => ({
          id: doc.id,
          label: doc.title,
        })),
    });
  }

  // Architecture & Advanced
  const advancedDocs = docs.filter((doc) =>
    ['architecture', 'advanced'].includes(doc.id)
  );
  if (advancedDocs.length > 0) {
    const order = ['architecture', 'advanced'];
    sections.push({
      label: 'Architecture & Advanced',
      items: advancedDocs
        .sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id))
        .map((doc) => ({
          id: doc.id,
          label: doc.title,
        })),
    });
  }

  // Generate TypeScript file
  const output = `// This file is auto-generated. Do not edit manually.
// To regenerate, run: npm run generate:docs

interface SidebarSection {
  label: string;
  items: Array<{
    id: string;
    label: string;
  }>;
}

export const DOCUMENTATION_SECTIONS: SidebarSection[] = ${JSON.stringify(
    sections,
    null,
    2
  )};
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`✓ Generated documentation registry: ${OUTPUT_FILE}`);
  console.log(`  Found ${docs.length} documentation pages`);
  console.log(`  Organized into ${sections.length} sections`);
}

function runTocGenerator() {
  return new Promise((resolve, reject) => {
    const process = spawn('node', [TOC_GENERATOR]);

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`TOC generator exited with code ${code}`));
      } else {
        resolve();
      }
    });

    process.on('error', (err) => {
      reject(err);
    });
  });
}

async function generate() {
  try {
    generateDocumentation();
    await runTocGenerator();
  } catch (error) {
    console.error('Failed to generate documentation:', error);
    process.exit(1);
  }
}

generate();

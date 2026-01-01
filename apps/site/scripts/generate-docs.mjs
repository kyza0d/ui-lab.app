import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { scanContentDirectory } from './lib/file-scanner.mjs';
import { extractAllMetadata } from './lib/metadata-extractor.mjs';
import { organizeFilesIntoSections, buildFileMap } from './lib/section-organizer.mjs';
import { NAV_STRUCTURE } from './lib/nav-structure-config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DOMAINS = {
  docs: path.join(__dirname, '../content/docs'),
  'agents-mcps': path.join(__dirname, '../content/agents-mcps'),
  cli: path.join(__dirname, '../content/cli'),
  'design-system': path.join(__dirname, '../content/design-system'),
};

const OUTPUT_FILE = path.join(__dirname, '../src/features/navigation/lib/generated-sidebar-registry.ts');
const LEGACY_OUTPUT_FILE = path.join(__dirname, '../src/features/docs/lib/generated-docs.ts');
const TOC_GENERATOR = path.join(__dirname, './generate-toc-registry.mjs');
const BREADCRUMB_GENERATOR = path.join(__dirname, './generate-breadcrumb-registry.mjs');

async function generateSidebarRegistry() {
  const registry = {};

  for (const [domain, contentDir] of Object.entries(CONTENT_DOMAINS)) {
    console.log(`\nProcessing domain: ${domain}`);
    console.log(`  Content directory: ${contentDir}`);

    const files = await scanContentDirectory(contentDir, domain);
    console.log(`  Found ${files.length} content files`);

    const metadata = await extractAllMetadata(files, domain);
    console.log(`  Extracted metadata for ${metadata.length} files`);

    const sections = organizeFilesIntoSections(metadata, domain);
    const fileMap = buildFileMap(metadata);
    const navSectionMap = buildNavSectionMap(sections, domain);

    registry[domain] = { sections, fileMap, navSectionMap };

    console.log(`  Organized into ${sections.length} sections:`);
    sections.forEach(s => console.log(`    - ${s.label} (${s.items.length} items)`));

    if (navSectionMap && Object.keys(navSectionMap).length > 0) {
      console.log(`  Navigation mappings for sub-items:`);
      Object.entries(navSectionMap).forEach(([nav, labels]) => {
        console.log(`    - ${nav}: [${labels.join(', ')}]`);
      });
    }
  }

  return registry;
}

function buildNavSectionMap(sections, domain) {
  const navStructure = NAV_STRUCTURE[domain];
  if (!navStructure?.subNav) return null;

  const navSectionMap = {};
  const sectionLabels = sections.map(s => s.label);

  for (const [navItem, allowedLabels] of Object.entries(navStructure.subNav)) {
    navSectionMap[navItem] = allowedLabels.filter(label => sectionLabels.includes(label));
  }

  return navSectionMap;
}

function generateTypeScriptOutput(registry) {
  const registryEntries = Object.entries(registry)
    .map(([domain, data]) => {
      const quotedDomain = domain.includes('-') ? `'${domain}'` : domain;
      return `  ${quotedDomain}: {
    sections: ${JSON.stringify(data.sections, null, 6)},
    fileMap: ${JSON.stringify(data.fileMap, null, 6)},
    navSectionMap: ${JSON.stringify(data.navSectionMap, null, 6)},
  }`;
    })
    .join(',\n');

  const output = `// This file is auto-generated. Do not edit manually.
// To regenerate, run: npm run generate:docs

interface SidebarItem {
  id: string;
  label: string;
}

interface SidebarSection {
  label: string;
  items: SidebarItem[];
}

interface FileMetadata {
  title: string;
  description: string;
  slug: string;
  category: string | null;
}

interface DomainRegistry {
  sections: SidebarSection[];
  fileMap: Record<string, FileMetadata>;
  navSectionMap: Record<string, string[]> | null;
}

export interface SidebarRegistry {
  docs: DomainRegistry;
  'agents-mcps': DomainRegistry;
  cli: DomainRegistry;
  'design-system': DomainRegistry;
}

export const SIDEBAR_REGISTRY: SidebarRegistry = {
${registryEntries},
};
`;

  return output;
}

function generateLegacyDocsOutput(registry) {
  const docsSections = registry.docs.sections;

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
    docsSections,
    null,
    2
  )};
`;

  return output;
}

function writeOutputFiles(registry) {
  const registryOutput = generateTypeScriptOutput(registry);
  fs.writeFileSync(OUTPUT_FILE, registryOutput, 'utf-8');
  console.log(`\n✓ Generated sidebar registry: ${OUTPUT_FILE}`);

  const legacyOutput = generateLegacyDocsOutput(registry);
  fs.writeFileSync(LEGACY_OUTPUT_FILE, legacyOutput, 'utf-8');
  console.log(`✓ Generated legacy docs output: ${LEGACY_OUTPUT_FILE}`);
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

function runBreadcrumbGenerator() {
  return new Promise((resolve, reject) => {
    const process = spawn('node', [BREADCRUMB_GENERATOR]);

    process.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Breadcrumb generator exited with code ${code}`));
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
    console.log('Generating sidebar registry...');
    const registry = await generateSidebarRegistry();
    writeOutputFiles(registry);
    await runBreadcrumbGenerator();
    await runTocGenerator();
    console.log('\n✓ All generators completed successfully');
  } catch (error) {
    console.error('Failed to generate documentation:', error);
    process.exit(1);
  }
}

generate();

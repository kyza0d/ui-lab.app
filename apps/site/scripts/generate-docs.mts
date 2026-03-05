import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import { scanContentDirectory } from './lib/file-scanner.mts';
import { extractAllMetadata } from './lib/metadata-extractor.mts';
import { organizeFilesIntoSections, buildFileMap } from './lib/section-organizer.mts';
import { NAV_STRUCTURE } from './lib/nav-structure-config.mts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DOMAINS = {
  docs: path.join(__dirname, '../content/docs'),
  'design-system': path.join(__dirname, '../content/design-system'),
};

const OUTPUT_FILE = path.join(__dirname, '../src/features/navigation/lib/generated-sidebar-registry.ts');
const LEGACY_OUTPUT_FILE = path.join(__dirname, '../src/features/docs/lib/generated-docs.ts');
const TOC_GENERATOR = path.join(__dirname, './generate-toc-registry.mts');
const BREADCRUMB_GENERATOR = path.join(__dirname, './generate-breadcrumb-registry.mts');

// Internal interfaces for documentation generation
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

type Domain = 'docs' | 'agents-mcps' | 'cli' | 'design-system';

type SidebarRegistry = Record<string, DomainRegistry>;

async function generateSidebarRegistry(): Promise<SidebarRegistry> {
  const registry: SidebarRegistry = {};

  for (const [domainKey, contentDir] of Object.entries(CONTENT_DOMAINS)) {
    const domain = domainKey as Domain;
    console.log(`\nProcessing domain: ${domain}`);
    console.log(`  Content directory: ${contentDir}`);

    const files = await scanContentDirectory(contentDir);
    console.log(`  Found ${files.length} content files`);

    const metadata = await extractAllMetadata(files, domainKey);
    console.log(`  Extracted metadata for ${metadata.length} files`);

    const sections = organizeFilesIntoSections(metadata, domain) as SidebarSection[];
    const fileMap = buildFileMap(metadata) as Record<string, FileMetadata>;
    const navSectionMap = buildNavSectionMap(sections, domain);

    registry[domain] = { sections, fileMap, navSectionMap };

    console.log(`  Organized into ${sections.length} sections:`);
    sections.forEach((s: SidebarSection) => console.log(`    - ${s.label} (${s.items.length} items)`));

    if (navSectionMap && Object.keys(navSectionMap).length > 0) {
      console.log(`  Navigation mappings for sub-items:`);
      Object.entries(navSectionMap).forEach(([nav, labels]) => {
        const labelsList = labels as string[];
        console.log(`    - ${nav}: [${labelsList.join(', ')}]`);
      });
    }
  }

  return registry;
}

function buildNavSectionMap(sections: SidebarSection[], domain: Domain): Record<string, string[]> | null {
  const navStructure = (NAV_STRUCTURE as Record<string, any>)[domain];
  if (!navStructure?.subNav) return null;

  const navSectionMap: Record<string, string[]> = {};
  const sectionLabels = sections.map(s => s.label);

  const subNav = navStructure.subNav as Record<string, string[]>;
  for (const [navItem, allowedLabels] of Object.entries(subNav)) {
    navSectionMap[navItem] = (allowedLabels as string[]).filter(label => sectionLabels.includes(label));
  }

  return navSectionMap;
}

function generateTypeScriptOutput(registry: SidebarRegistry): string {
  const registryEntries = Object.entries(registry)
    .map(([domain, data]: [string, DomainRegistry]) => {
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
  'design-system': DomainRegistry;
  [key: string]: DomainRegistry;
}

export const SIDEBAR_REGISTRY: SidebarRegistry = {
${registryEntries},
};
`;

  return output;
}

function generateLegacyDocsOutput(registry: SidebarRegistry): string {
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

function writeOutputFiles(registry: SidebarRegistry) {
  const registryOutput = generateTypeScriptOutput(registry);
  fs.writeFileSync(OUTPUT_FILE, registryOutput, 'utf-8');
  console.log(`\n✓ Generated sidebar registry: ${OUTPUT_FILE}`);

  const legacyOutput = generateLegacyDocsOutput(registry);
  fs.writeFileSync(LEGACY_OUTPUT_FILE, legacyOutput, 'utf-8');
  console.log(`✓ Generated legacy docs output: ${LEGACY_OUTPUT_FILE}`);
}

function runTocGenerator(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const process = spawn('tsx', [TOC_GENERATOR]);

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

function runBreadcrumbGenerator(): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const process = spawn('tsx', [BREADCRUMB_GENERATOR]);

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

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_BASE = path.join(__dirname, '../content');
const OUTPUT_FILE = path.join(__dirname, '../src/features/navigation/lib/generated-breadcrumb-registry.ts');

const DOMAIN_CONFIG = {
  docs: {
    path: '/docs',
    label: 'UI Lab Overview',
    contentDir: path.join(CONTENT_BASE, 'docs'),
    sections: {
      'Getting Started': ['introduction', 'installation'],
      'Customization': ['customization-theming'],
      'Agents & MCPs': ['agents-mcps-installation', 'agents-mcps-workflows'],
    },
  },
  'design-system': {
    path: '/design-system',
    label: 'Design System',
    contentDir: path.join(CONTENT_BASE, 'design-system'),
    sections: {
      'Foundation': ['colors', 'typography', 'spacing'],
      'Systems': ['tokens', 'variables'],
      'Guidelines': ['components-guidelines', 'accessibility'],
    },
  },
  'agents-mcps': {
    path: '/agents-mcps',
    label: 'Agents & MCPs',
    contentDir: path.join(CONTENT_BASE, 'agents-mcps'),
    sections: {
      'Getting Started': ['introduction', 'installation', 'quick-start', 'core-concepts'],
      'Building Workflows': ['designing-ai-workflows', 'prompting-strategies', 'state-management', 'examples-use-cases'],
      'Technical Reference': ['mcps-overview', 'custom-mcps', 'integrations', 'api-reference'],
    },
  },
};

const COMPONENT_CATEGORIES = {
  'primitive': 'Primitive',
  'layout': 'Layout',
  'form': 'Form',
  'overlay': 'Overlay',
  'display': 'Display',
  'other': 'Other',
  'experimental': 'Experimental',
};

function getDomainLabel(filePath) {
  const parts = filePath.split('/');
  const idx = parts.indexOf('content');
  if (idx === -1) return null;
  return parts[idx + 1];
}

function findSectionForFile(domainKey, fileId) {
  const config = DOMAIN_CONFIG[domainKey];
  if (!config) return null;

  for (const [sectionLabel, fileIds] of Object.entries(config.sections)) {
    if (fileIds.includes(fileId)) {
      return sectionLabel;
    }
  }
  return null;
}

function readTitleFromMdx(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (match) {
      const yaml = match[1];
      const titleMatch = yaml.match(/^title:\s*(.+)$/m);
      if (titleMatch) {
        return titleMatch[1].trim();
      }
    }
  } catch (e) {
    // Silently continue if file can't be read
  }
  return null;
}

function generateFileLabel(fileId) {
  return fileId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function discoverPages(domainKey, domainConfig) {
  const pages = [];
  const contentDir = domainConfig.contentDir;

  if (!fs.existsSync(contentDir)) {
    return pages;
  }

  function scanDir(dir, relativePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        scanDir(fullPath, relPath);
      } else if (entry.name.endsWith('.mdx') && entry.name !== 'index.mdx') {
        const fileId = entry.name.replace('.mdx', '');
        const pathname = `${domainConfig.path}/${fileId}`;
        const section = findSectionForFile(domainKey, fileId);

        let label = readTitleFromMdx(fullPath);
        if (!label) {
          label = generateFileLabel(fileId);
        }

        const breadcrumbs = [{ label: domainConfig.label, href: domainConfig.path }];

        if (section) {
          breadcrumbs.push({ label: section });
        }

        breadcrumbs.push({ label });

        pages.push({
          path: pathname,
          domain: domainConfig.path,
          domainLabel: domainConfig.label,
          breadcrumbs,
        });
      }
    }
  }

  scanDir(contentDir);
  return pages;
}

function generateRegistry() {
  const items = [];

  for (const [domainKey, domainConfig] of Object.entries(DOMAIN_CONFIG)) {
    const pages = discoverPages(domainKey, domainConfig);
    items.push(...pages);

    items.push({
      path: domainConfig.path,
      domain: domainConfig.path,
      domainLabel: domainConfig.label,
      breadcrumbs: [{ label: domainConfig.label, href: domainConfig.path }],
    });
  }

  items.push({
    path: '/components',
    domain: '/components',
    domainLabel: 'Components',
    breadcrumbs: [{ label: 'Components', href: '/components' }],
  });

  const registry = {
    items,
    domains: [
      { path: '/docs', label: 'UI Lab Overview' },
      { path: '/design-system', label: 'Design System' },
      { path: '/components', label: 'Components' },
      { path: '/agents-mcps', label: 'Agents & MCPs' },
    ],
  };

  const output = `// This file is auto-generated. Do not edit manually.
// To regenerate, run: npm run generate:docs

import type { BreadcrumbRegistry } from './breadcrumb-registry';

export const BREADCRUMB_REGISTRY: BreadcrumbRegistry = ${JSON.stringify(
    registry,
    null,
    2
  )};
`;

  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`✓ Generated breadcrumb registry: ${OUTPUT_FILE}`);
  console.log(`  Found ${items.length} breadcrumb paths across ${new Set(items.map(i => i.domain)).size} domains`);
}

try {
  generateRegistry();
} catch (error) {
  console.error('Failed to generate breadcrumb registry:', error);
  process.exit(1);
}

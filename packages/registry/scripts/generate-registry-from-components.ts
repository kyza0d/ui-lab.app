import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_SRC_PATH = path.resolve(__dirname, '../src');
const COMPONENTS_PATH = path.resolve(REGISTRY_SRC_PATH, 'components');
const REGISTRY_OUTPUT_PATH = path.resolve(REGISTRY_SRC_PATH, 'registry.ts');

interface ComponentExample {
  title: string;
  description: string;
  code: string;
}

interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  experimental?: boolean;
  source: {
    packageName: string;
    exportName: string;
    packagePath: string;
  };
  relatedComponents: string[];
  tags?: string[];
  accessibility?: {
    hasAriaSupport: boolean;
    notes?: string[];
  };
}

interface ComponentEntry {
  metadata: ComponentMetadata;
  examples: ComponentExample[];
}

function loadComponentData(componentPath: string): ComponentEntry | null {
  const metadataPath = path.join(componentPath, 'metadata.json');
  const examplesPath = path.join(componentPath, 'examples.json');

  if (!fs.existsSync(metadataPath)) {
    return null;
  }

  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) as ComponentMetadata;
  const examples: ComponentExample[] = [];

  if (fs.existsSync(examplesPath)) {
    const examplesJson = JSON.parse(fs.readFileSync(examplesPath, 'utf-8'));
    examples.push(...Object.values(examplesJson) as ComponentExample[]);
  }

  return { metadata, examples };
}

function generateRegistryContent(components: Record<string, ComponentEntry>): string {
  const imports = `import type { ComponentRegistry } from './types.js';`;

  const registryEntries = Object.entries(components)
    .map(([id, { metadata, examples }]) => {
      const examplesArray = examples.length > 0 ? JSON.stringify(examples, null, 4) : '[]';
      const keyQuotes = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(id) ? '' : '"';

      return `
  ${keyQuotes}${id}${keyQuotes}: {
    id: ${JSON.stringify(metadata.id)},
    name: ${JSON.stringify(metadata.name)},
    description: ${JSON.stringify(metadata.description)},
    category: ${JSON.stringify(metadata.category)},
    ${metadata.experimental ? `experimental: ${JSON.stringify(metadata.experimental)},\n    ` : ''}source: ${JSON.stringify(metadata.source, null, 2)},
    relatedComponents: ${JSON.stringify(metadata.relatedComponents)},
    tags: ${JSON.stringify(metadata.tags)},
    accessibility: ${JSON.stringify(metadata.accessibility)},
    examples: ${examplesArray},
  },`;
    })
    .join('\n');

  return `${imports}

export const componentRegistry: ComponentRegistry = {${registryEntries}
};

export const componentMetadata = Object.values(componentRegistry).map(comp => ({
  id: comp.id,
  name: comp.name,
  description: comp.description,
  category: comp.category,
  tags: comp.tags || []
}));
`;
}

async function generateRegistryFromComponents() {
  console.log('🔧 Generating registry.ts from components...\n');

  if (!fs.existsSync(COMPONENTS_PATH)) {
    console.error('❌ Components directory not found:', COMPONENTS_PATH);
    process.exit(1);
  }

  try {
    const componentDirs = fs
      .readdirSync(COMPONENTS_PATH, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    const components: Record<string, ComponentEntry> = {};
    let successCount = 0;
    let skipCount = 0;

    for (const componentDir of componentDirs) {
      const componentPath = path.join(COMPONENTS_PATH, componentDir);
      const componentData = loadComponentData(componentPath);

      if (componentData) {
        // Use kebab-case ID for the key in registry
        const id = componentData.metadata.id;
        components[id] = componentData;
        console.log(`✅ ${componentData.metadata.name} (${componentData.examples.length} examples)`);
        successCount++;
      } else {
        console.log(`⏭️  ${componentDir} - missing metadata.json`);
        skipCount++;
      }
    }

    // Generate registry.ts
    const registryContent = generateRegistryContent(components);
    fs.writeFileSync(REGISTRY_OUTPUT_PATH, registryContent);

    console.log(`\n✨ Registry generated!`);
    console.log(`   📝 ${REGISTRY_OUTPUT_PATH}`);
    console.log(`   ✅ ${successCount} components`);
    console.log(`   ⏭️  ${skipCount} skipped`);
    console.log(`\n   Total examples: ${Object.values(components).reduce((sum, c) => sum + c.examples.length, 0)}`);
  } catch (error) {
    console.error('❌ Error generating registry:', error);
    process.exit(1);
  }
}

generateRegistryFromComponents();

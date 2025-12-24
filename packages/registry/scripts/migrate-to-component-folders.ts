import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_SRC_PATH = path.resolve(__dirname, '../src');
const COMPONENTS_OUTPUT_PATH = path.resolve(REGISTRY_SRC_PATH, 'components');

interface ComponentExample {
  name: string;
  description: string;
  code: string;
}

interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
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

function kebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function pascalCase(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function generateExampleTsx(example: ComponentExample, index: number): string {
  const code = example.code.trim();
  const lines = code.split('\n');

  // Extract import statements
  const imports: string[] = [];
  let bodyStartIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('import ')) {
      imports.push(lines[i]);
    } else if (line && !line.startsWith('export')) {
      bodyStartIndex = i;
      break;
    }
  }

  // Find and extract the function body (content between opening and closing braces)
  let braceCount = 0;
  let bodyStart = -1;
  let bodyEnd = -1;

  for (let i = bodyStartIndex; i < lines.length; i++) {
    const line = lines[i];
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '{') {
        if (bodyStart === -1) bodyStart = i;
        braceCount++;
      }
      if (line[j] === '}') {
        braceCount--;
        if (braceCount === 0 && bodyStart !== -1) {
          bodyEnd = i;
          break;
        }
      }
    }
    if (bodyEnd !== -1) break;
  }

  // Extract the function body content
  const bodyLines: string[] = [];
  if (bodyStart !== -1 && bodyEnd !== -1) {
    for (let i = bodyStart + 1; i < bodyEnd; i++) {
      bodyLines.push(lines[i]);
    }
  }

  // Remove leading/trailing empty lines from body
  while (bodyLines.length > 0 && !bodyLines[0].trim()) {
    bodyLines.shift();
  }
  while (bodyLines.length > 0 && !bodyLines[bodyLines.length - 1].trim()) {
    bodyLines.pop();
  }

  // Build the final file
  const importLines = ['import React from \'react\';', ...imports].filter(Boolean);
  const importSection = importLines.length > 0 ? importLines.join('\n') + '\n\n' : '';

  return `${importSection}export const metadata = {
  title: ${JSON.stringify(example.name)},
  description: ${JSON.stringify(example.description)}
};

export default function Example() {
${bodyLines.map(line => `  ${line}`).join('\n')}
}
`;
}

function toPascalCase(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

async function importRegistry() {
  // Dynamically import the registry to get component metadata and examples
  const registryModule = await import('../src/registry.js');
  return registryModule.componentRegistry;
}

async function importExamples(componentId: string) {
  try {
    const examplesModule = await import(`../src/examples/${componentId.replace('-', '')}.example.js`);
    return examplesModule[`${componentId.replace('-', '')}Examples`] || [];
  } catch {
    return [];
  }
}

async function migrateToComponentFolders() {
  console.log('🔄 Starting registry migration...\n');

  try {
    // Create components directory if it doesn't exist
    if (!fs.existsSync(COMPONENTS_OUTPUT_PATH)) {
      fs.mkdirSync(COMPONENTS_OUTPUT_PATH, { recursive: true });
    }

    const registry = await importRegistry();
    let migratedCount = 0;
    let examplesCount = 0;

    for (const [componentId, metadata] of Object.entries(registry)) {
      const componentMeta = metadata as ComponentMetadata;
      const componentFolder = pascalCase(componentId);
      const componentPath = path.join(COMPONENTS_OUTPUT_PATH, componentFolder);

      // Create component folder
      fs.mkdirSync(componentPath, { recursive: true });

      // Write metadata.json
      const metadataJson = {
        id: componentMeta.id,
        name: componentMeta.name,
        description: componentMeta.description,
        category: componentMeta.category,
        source: componentMeta.source,
        relatedComponents: componentMeta.relatedComponents,
        tags: componentMeta.tags,
        accessibility: componentMeta.accessibility
      };

      fs.writeFileSync(
        path.join(componentPath, 'metadata.json'),
        JSON.stringify(metadataJson, null, 2)
      );

      // Get and process examples
      const examples = await importExamples(componentId);
      if (Array.isArray(examples) && examples.length > 0) {
        const examplesPath = path.join(componentPath, 'examples');
        fs.mkdirSync(examplesPath, { recursive: true });

        const exampleExports: string[] = [];
        const exampleFileNames: string[] = [];

        // Generate .tsx files for each example
        examples.forEach((example: ComponentExample, index: number) => {
          const exampleName = kebabCase(example.name);
          const paddedIndex = String(index + 1).padStart(2, '0');
          const fileName = `${paddedIndex}-${exampleName}.tsx`;
          const filePath = path.join(examplesPath, fileName);

          // Generate the .tsx file content
          const tsxContent = generateExampleTsx(example, index);
          fs.writeFileSync(filePath, tsxContent);

          exampleFileNames.push(fileName);
          const exportName = `Example${index + 1}`;
          exampleExports.push(`export { default as ${exportName} } from './${fileName.replace('.tsx', '.js')}';\nexport { metadata as metadata${index + 1} } from './${fileName.replace('.tsx', '.js')}';\n`);

          examplesCount++;
        });

        // Generate examples/index.ts
        const indexContent = `${exampleExports.join('\n')}
export const ${kebabCase(componentMeta.name)}Examples = [
${examples
  .map((_, i) => `  Example${i + 1}`)
  .join(',\n')}
];
`;

        fs.writeFileSync(path.join(examplesPath, 'index.ts'), indexContent);

        console.log(`✅ ${componentMeta.name} - ${examples.length} examples migrated`);
      } else {
        console.log(`⚠️  ${componentMeta.name} - no examples found`);
      }

      migratedCount++;
    }

    console.log(`\n✨ Migration complete!`);
    console.log(`   📦 ${migratedCount} components migrated`);
    console.log(`   📝 ${examplesCount} examples created`);
    console.log(`\nNext steps:`);
    console.log(`1. Review the generated structure in src/components/`);
    console.log(`2. Run: pnpm tsx scripts/generate-examples-json.ts`);
    console.log(`3. Run: pnpm tsx scripts/generate-registry-from-components.ts`);
    console.log(`4. Run: pnpm tsx scripts/validate-registry.ts`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateToComponentFolders();

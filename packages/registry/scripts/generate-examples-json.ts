import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_SRC_PATH = path.resolve(__dirname, '../src');
const COMPONENTS_PATH = path.resolve(REGISTRY_SRC_PATH, 'components');

interface ExampleMetadata {
  title: string;
  description: string;
  code: string;
}

interface ExamplesJson {
  [key: string]: ExampleMetadata;
}

function extractMetadataFromTsx(content: string): { title: string; description: string } | null {
  const metadataMatch = content.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?});/);
  if (!metadataMatch) return null;

  try {
    // Create a safe context to evaluate the metadata object
    const metadataStr = metadataMatch[1];
    // Parse the object literal
    const title = metadataStr.match(/title\s*:\s*['"`]([^'"`]+)['"`]/)?.[1] || '';
    const description = metadataStr.match(/description\s*:\s*['"`]([^'"`]+)['"`]/)?.[1] || '';
    return { title, description };
  } catch {
    return null;
  }
}

function stripMetadata(content: string): string {
  // Remove the metadata export and return only the component
  return content
    .replace(/export\s+const\s+metadata\s*=\s*{[\s\S]*?};\n\n?/, '')
    .trim();
}

function generateExamplesJson(componentPath: string): boolean {
  const examplesDir = path.join(componentPath, 'examples');

  if (!fs.existsSync(examplesDir)) {
    return false;
  }

  const files = fs
    .readdirSync(examplesDir)
    .filter(f => f.endsWith('.tsx'))
    .sort();

  if (files.length === 0) {
    return false;
  }

  const examples: ExamplesJson = {};

  for (const file of files) {
    const filePath = path.join(examplesDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const metadata = extractMetadataFromTsx(content);
    if (!metadata) {
      console.warn(`⚠️  Could not extract metadata from ${file}`);
      continue;
    }

    const code = stripMetadata(content);
    const key = file.replace('.tsx', '');

    examples[key] = {
      title: metadata.title,
      description: metadata.description,
      code
    };
  }

  // Write examples.json
  const outputPath = path.join(componentPath, 'examples.json');
  fs.writeFileSync(outputPath, JSON.stringify(examples, null, 2) + '\n');

  return true;
}

async function generateAllExamplesJson() {
  console.log('📝 Generating examples.json files...\n');

  if (!fs.existsSync(COMPONENTS_PATH)) {
    console.error('❌ Components directory not found:', COMPONENTS_PATH);
    process.exit(1);
  }

  try {
    const components = fs
      .readdirSync(COMPONENTS_PATH, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name);

    let generatedCount = 0;
    let skippedCount = 0;

    for (const component of components) {
      const componentPath = path.join(COMPONENTS_PATH, component);
      const generated = generateExamplesJson(componentPath);

      if (generated) {
        console.log(`✅ ${component}`);
        generatedCount++;
      } else {
        console.log(`⏭️  ${component} - no examples`);
        skippedCount++;
      }
    }

    console.log(`\n✨ Done!`);
    console.log(`   ✅ ${generatedCount} components with examples.json`);
    console.log(`   ⏭️  ${skippedCount} components skipped`);
  } catch (error) {
    console.error('❌ Error generating examples:', error);
    process.exit(1);
  }
}

generateAllExamplesJson();

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Variation {
  name: string;
  description: string;
  demoPath: string;
  exportName: string;
  files: any[];
}

function generateDemoMap(): string {
  const elementsPath = path.join(__dirname, '..', 'src', 'elements');
  const elements = fs
    .readdirSync(elementsPath)
    .filter(
      (f) =>
        fs.statSync(path.join(elementsPath, f)).isDirectory() &&
        !f.startsWith('.')
    )
    .sort();

  const entries: string[] = [];

  for (const elementName of elements) {
    const elementPath = path.join(elementsPath, elementName);
    const variationsPath = path.join(elementPath, 'variations.json');

    if (!fs.existsSync(variationsPath)) {
      continue;
    }

    const variations: Record<string, Variation> = JSON.parse(
      fs.readFileSync(variationsPath, 'utf-8')
    );

    for (const [key, variation] of Object.entries(variations)) {
      entries.push(
        `  '${variation.demoPath}': dynamic(() => import('ui-lab-registry/elements/${elementName}/variations/${key}').then(mod => ({ default: mod.${variation.exportName} }))),`
      );
    }
  }

  return `import dynamic from 'next/dynamic';

type DemoComponent = React.ComponentType<object>;

const demoComponentMap: Record<string, DemoComponent> = {
${entries.join('\n')}
};

export function getDemoComponent(demoPath: string): DemoComponent | null {
  return demoComponentMap[demoPath] || null;
}
`;
}

async function main() {
  try {
    console.log('\n🗺️  Generating demo component map...\n');

    const demoMapContent = generateDemoMap();
    const appDemoPath = path.join(
      __dirname,
      '../../..',
      'apps/site/src/features/elements/lib/get-element-demo.ts'
    );

    fs.writeFileSync(appDemoPath, demoMapContent);
    console.log(`  ✓ get-element-demo.ts`);

    console.log('\n✅ Demo map generation complete!\n');
  } catch (error) {
    console.error(
      '\n❌ Error during demo map generation:',
      error instanceof Error ? error.message : String(error)
    );
    process.exit(1);
  }
}

main();

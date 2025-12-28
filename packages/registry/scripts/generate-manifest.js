import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractExportName(variationKey) {
  const parts = variationKey.split('-');
  const name = parts.slice(1).join('-');
  return name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function generateManifest(elementName) {
  const elementPath = path.join(__dirname, '..', 'src', 'elements', elementName);
  const variationsPath = path.join(elementPath, 'variations.json');

  if (!fs.existsSync(variationsPath)) {
    console.error(`variations.json not found for ${elementName}`);
    return null;
  }

  const variations = JSON.parse(fs.readFileSync(variationsPath, 'utf-8'));
  const demoPaths = [];

  for (const [variationKey, variationMeta] of Object.entries(variations)) {
    const { demoPath } = variationMeta;
    const exportName = extractExportName(variationKey);
    demoPaths.push({ demoPath, variationKey, exportName });
  }

  const tsContent = `export const DEMO_PATH_MAP = {
${demoPaths.map(item => `  '${item.demoPath}': { variationKey: '${item.variationKey}', exportName: '${item.exportName}' },`).join('\n')}
} as const;

export type DemoPaths = keyof typeof DEMO_PATH_MAP;
`;

  const outputPath = path.join(elementPath, 'manifest.ts');
  fs.writeFileSync(outputPath, tsContent);

  console.log(`Generated manifest.ts for ${elementName} at ${outputPath}`);
  return demoPaths;
}

const header = generateManifest('Header');
console.log('Header demo paths:', header);
const sidebar = generateManifest('Sidebar');
console.log('Sidebar demo paths:', sidebar);

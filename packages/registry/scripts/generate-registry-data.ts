import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { extractAllComponentAPIs } from './generate-api-data';
import { extractAllComponentStyles } from './generate-styles-data';
import { extractAllComponentSources } from './extract-source';
import { componentDependencies, coreNpmDependencies, corePeerDependencies } from '../src/component-dependencies';
import { componentRegistry } from '../src/registry.js';
import type { ComponentRegistry, ComponentAPI, ComponentStyles, ComponentSourceCode, ComponentDeps } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_PATH = path.resolve(__dirname, '../src/registry.ts');
const GENERATED_DATA_PATH = path.resolve(__dirname, '../src/generated-data.ts');
const COMPONENTS_DIR = path.resolve(__dirname, '../../@ui/src/components');
const PACKAGE_JSON_PATH = path.resolve(__dirname, '../package.json');

const REACT_ARIA_PLACEHOLDERS: Record<string, string> = {
  button: 'https://react-spectrum.adobe.com/react-aria/useButton.html',
  checkbox: 'https://react-spectrum.adobe.com/react-aria/useCheckbox.html',
  radio: 'https://react-spectrum.adobe.com/react-aria/useRadioGroup.html',
  switch: 'https://react-spectrum.adobe.com/react-aria/useSwitch.html',
  slider: 'https://react-spectrum.adobe.com/react-aria/useSlider.html',
  select: 'https://react-spectrum.adobe.com/react-aria/useSelect.html',
  modal: 'https://react-spectrum.adobe.com/react-aria/useDialog.html',
  popover: 'https://react-spectrum.adobe.com/react-aria/usePopover.html',
  tooltip: 'https://react-spectrum.adobe.com/react-aria/useTooltip.html',
  tabs: 'https://react-spectrum.adobe.com/react-aria/useTabs.html',
  menu: 'https://react-spectrum.adobe.com/react-aria/useMenu.html',
  input: 'https://react-spectrum.adobe.com/react-aria/useTextField.html',
  textarea: 'https://react-spectrum.adobe.com/react-aria/useTextField.html',
  label: 'https://react-spectrum.adobe.com/react-aria/useLabel.html',
  progress: 'https://react-spectrum.adobe.com/react-aria/useProgressBar.html',
  breadcrumbs: 'https://react-spectrum.adobe.com/react-aria/useBreadcrumbs.html',
  table: 'https://react-spectrum.adobe.com/react-aria/useTable.html',
  toast: '',
  badge: '',
  card: '',
  divider: '',
  flex: '',
  fold: '',
  grid: '',
  group: '',
  form: '',
  confirm: '',
  'command-palette': '',
};

function getComponentIds(): string[] {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    console.error('Components directory not found:', COMPONENTS_DIR);
    return [];
  }

  return fs
    .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function getPackageMetadata(): { version: string } {
  try {
    if (!fs.existsSync(PACKAGE_JSON_PATH)) {
      throw new Error('package.json not found');
    }
    const packageJson = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
    return { version: packageJson.version || '0.0.0' };
  } catch (error) {
    console.error('Error reading package metadata:', error);
    return { version: '0.0.0' };
  }
}

function toKebabCase(pascalCase: string): string {
  return pascalCase
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function generateDataFile(
  apiData: Record<string, ComponentAPI>,
  stylesData: Record<string, ComponentStyles>,
  sourceData: Record<string, ComponentSourceCode>,
  reactAriaUrls: Record<string, string>,
  packageMetadata: { version: string }
): void {
  const content = `import type { ComponentAPI, ComponentStyles, ComponentSourceCode, ComponentDeps, PackageMetadata } from './types';

export const generatedAPI: Record<string, ComponentAPI> = ${JSON.stringify(apiData, null, 2)};

export const generatedStyles: Record<string, ComponentStyles> = ${JSON.stringify(stylesData, null, 2)};

export const generatedSourceCode: Record<string, ComponentSourceCode> = ${JSON.stringify(sourceData, null, 2)};

export const reactAriaUrls: Record<string, string> = ${JSON.stringify(reactAriaUrls, null, 2)};

export const generatedComponentDependencies: Record<string, ComponentDeps> = ${JSON.stringify(componentDependencies, null, 2)};

export const generatedCoreNpmDependencies = ${JSON.stringify(Array.from(coreNpmDependencies), null, 2)};

export const generatedCorePeerDependencies = ${JSON.stringify(Array.from(corePeerDependencies), null, 2)};

export const packageMetadata: PackageMetadata = ${JSON.stringify(packageMetadata, null, 2)};
`;

  fs.writeFileSync(GENERATED_DATA_PATH, content, 'utf-8');
  console.log(`Generated data written to: ${GENERATED_DATA_PATH}`);
}

async function main() {
  console.log('Starting registry data extraction...\n');

  const componentIds = getComponentIds();
  console.log(`Found ${componentIds.length} components: ${componentIds.join(', ')}\n`);

  console.log('Extracting API documentation...');
  const apiData = extractAllComponentAPIs(componentIds);
  console.log(`Extracted API for ${Object.keys(apiData).length} components\n`);

  console.log('Extracting styles data...');
  const stylesData = extractAllComponentStyles(componentIds);
  console.log(`Extracted styles for ${Object.keys(stylesData).length} components\n`);

  console.log('Extracting source code...');
  const sourceData = extractAllComponentSources(componentIds);
  console.log(`Extracted source code for ${Object.keys(sourceData).length} components\n`);

  const reactAriaUrls: Record<string, string> = {};
  for (const id of componentIds) {
    const kebabId = toKebabCase(id);
    reactAriaUrls[kebabId] = REACT_ARIA_PLACEHOLDERS[kebabId] || '';
  }

  console.log('Extracting package metadata...');
  const packageMetadata = getPackageMetadata();
  console.log(`Package version: ${packageMetadata.version}\n`);

  generateDataFile(apiData, stylesData, sourceData, reactAriaUrls, packageMetadata);

  console.log('\nSummary:');
  console.log('--------');
  for (const id of componentIds) {
    const kebabId = toKebabCase(id);
    const hasApi = kebabId in apiData;
    const hasStyles = kebabId in stylesData;
    const hasSource = kebabId in sourceData;
    const hasReactAria = reactAriaUrls[kebabId] !== '';
    console.log(
      `${id}: API=${hasApi ? '✓' : '✗'} Styles=${hasStyles ? '✓' : '✗'} Source=${hasSource ? '✓' : '✗'} ReactAria=${hasReactAria ? '✓' : '-'}`
    );
  }

  console.log('\nDone! Run `pnpm build` to rebuild the registry package.');
}

main().catch(console.error);

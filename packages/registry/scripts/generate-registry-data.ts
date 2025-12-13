import * as fs from 'fs';
import * as path from 'path';
import { extractAllComponentAPIs } from './extract-api';
import { extractAllComponentStyles } from './extract-styles';
import type { ComponentRegistry, ComponentAPI, ComponentStyles } from '../src/types';

const REGISTRY_PATH = path.resolve(__dirname, '../src/registry.ts');
const GENERATED_DATA_PATH = path.resolve(__dirname, '../src/generated-data.ts');
const COMPONENTS_DIR = path.resolve(__dirname, '../../components/src/components');

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

function generateDataFile(
  apiData: Record<string, ComponentAPI>,
  stylesData: Record<string, ComponentStyles>,
  reactAriaUrls: Record<string, string>
): void {
  const content = `import type { ComponentAPI, ComponentStyles } from './types';

export const generatedAPI: Record<string, ComponentAPI> = ${JSON.stringify(apiData, null, 2)};

export const generatedStyles: Record<string, ComponentStyles> = ${JSON.stringify(stylesData, null, 2)};

export const reactAriaUrls: Record<string, string> = ${JSON.stringify(reactAriaUrls, null, 2)};
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

  const reactAriaUrls: Record<string, string> = {};
  for (const id of componentIds) {
    reactAriaUrls[id] = REACT_ARIA_PLACEHOLDERS[id] || '';
  }

  generateDataFile(apiData, stylesData, reactAriaUrls);

  console.log('\nSummary:');
  console.log('--------');
  for (const id of componentIds) {
    const hasApi = id in apiData;
    const hasStyles = id in stylesData;
    const hasReactAria = reactAriaUrls[id] !== '';
    console.log(
      `${id}: API=${hasApi ? '✓' : '✗'} Styles=${hasStyles ? '✓' : '✗'} ReactAria=${hasReactAria ? '✓' : '-'}`
    );
  }

  console.log('\nDone! Run `pnpm build` to rebuild the registry package.');
}

main().catch(console.error);

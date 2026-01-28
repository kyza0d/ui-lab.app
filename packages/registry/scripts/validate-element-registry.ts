import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REGISTRY_ROOT = path.join(__dirname, '../src/elements');
const DEMO_MAP_PATH = path.join(__dirname, '../src/demo-registry.ts');

interface ValidationError {
  type: string;
  element: string;
  variation?: string;
  issue: string;
  location: string;
  fix: string;
}

interface ValidationResult {
  passed: boolean;
  errors: ValidationError[];
  summary: {
    totalElements: number;
    totalVariations: number;
    validationsRun: number;
    validationsPassed: number;
  };
}

const errors: ValidationError[] = [];
let totalElements = 0;
let totalVariations = 0;
let validationsPassed = 0;

const ALLOWED_CATEGORIES = ['layout', 'form', 'navigation', 'content', 'card', 'documentation', 'ai', 'other'];

function isPascalCase(str: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(str);
}

function isKebabCase(str: string): boolean {
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/.test(str);
}

function getElementsFromDisk(): string[] {
  if (!fs.existsSync(REGISTRY_ROOT)) {
    throw new Error(`Registry root not found: ${REGISTRY_ROOT}`);
  }

  const elements: string[] = [];

  function discoverInDirectory(dirPath: string, relativePath: string = '') {
    const folders = fs.readdirSync(dirPath).filter(f => {
      const fullPath = path.join(dirPath, f);
      return fs.statSync(fullPath).isDirectory() && f !== 'node_modules' && !f.startsWith('.');
    });

    for (const folderName of folders) {
      const elementPath = path.join(dirPath, folderName);
      const variationsPath = path.join(elementPath, 'variations');
      const hasVariations = fs.existsSync(variationsPath);
      const fullPath = relativePath ? `${relativePath}/${folderName}` : folderName;

      if (hasVariations) {
        elements.push(fullPath);
      } else {
        discoverInDirectory(elementPath, fullPath);
      }
    }
  }

  discoverInDirectory(REGISTRY_ROOT);
  return elements;
}

function getVariationsFromDisk(elementId: string): string[] {
  const variationsPath = path.join(REGISTRY_ROOT, elementId, 'variations');
  if (!fs.existsSync(variationsPath)) {
    return [];
  }
  return fs.readdirSync(variationsPath).filter(f => {
    const fullPath = path.join(variationsPath, f);
    return fs.statSync(fullPath).isDirectory() && /^\d{2}-/.test(f);
  }).sort();
}

function readMetadata(elementId: string): any {
  const metadataPath = path.join(REGISTRY_ROOT, elementId, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
  } catch (e) {
    return null;
  }
}

function readVariationsJson(elementId: string): any {
  const variationsPath = path.join(REGISTRY_ROOT, elementId, 'variations.json');
  if (!fs.existsSync(variationsPath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(variationsPath, 'utf-8'));
  } catch (e) {
    return null;
  }
}

function readVariationExport(elementId: string, variationKey: string): { exportName?: string; hasDefault: boolean; error?: string } {
  const indexPath = path.join(REGISTRY_ROOT, elementId, 'variations', variationKey, 'index.tsx');
  if (!fs.existsSync(indexPath)) {
    return { hasDefault: false, error: 'index.tsx not found' };
  }

  try {
    const content = fs.readFileSync(indexPath, 'utf-8');

    // Check for default export
    const hasDefault = /export\s+default\s+/.test(content);

    // Find named exports
    const namedExportMatch = content.match(/export\s+(?:function|const)\s+([A-Za-z_$][A-Za-z0-9_$]*)/);
    const exportName = namedExportMatch ? namedExportMatch[1] : undefined;

    return { exportName, hasDefault };
  } catch (e) {
    return { hasDefault: false, error: `Error reading file: ${(e as Error).message}` };
  }
}

function getDemoMapEntries(): Set<string> {
  const entries = new Set<string>();

  if (!fs.existsSync(DEMO_MAP_PATH)) {
    return entries;
  }

  try {
    const content = fs.readFileSync(DEMO_MAP_PATH, 'utf-8');
    // Match object keys in elementDemoMap specifically - look for 'key': or "key": after export const elementDemoMap
    const elementMapMatch = content.match(/export const elementDemoMap[^{]*\{([\s\S]*?)\};/);
    if (elementMapMatch) {
      const matches = elementMapMatch[1].match(/['"`]([a-z][a-z0-9-]*)['"`]\s*:/g);
      if (matches) {
        matches.forEach(m => {
          // Extract just the key name
          const keyMatch = m.match(/['"`]([a-z][a-z0-9-]*)['"`]/);
          if (keyMatch) {
            entries.add(keyMatch[1]);
          }
        });
      }
    }
  } catch (e) {
    // Unable to read demo map
  }

  return entries;
}

function addError(type: string, element: string, issue: string, location: string, fix: string, variation?: string) {
  errors.push({
    type,
    element,
    variation,
    issue,
    location,
    fix,
  });
}

// Validation 1: Variation Export Validation
function validateVariationExports() {
  const elements = getElementsFromDisk();

  elements.forEach(elementId => {
    const variations = getVariationsFromDisk(elementId);

    variations.forEach(variationKey => {
      const result = readVariationExport(elementId, variationKey);

      if (result.error) {
        addError(
          'VARIATION_EXPORT',
          elementId,
          `Missing or invalid index.tsx: ${result.error}`,
          path.join(REGISTRY_ROOT, elementId, 'variations', variationKey, 'index.tsx'),
          'Ensure index.tsx exists and contains a named export',
          variationKey
        );
        return;
      }

      if (!result.exportName) {
        addError(
          'VARIATION_EXPORT',
          elementId,
          'No named export found in index.tsx',
          path.join(REGISTRY_ROOT, elementId, 'variations', variationKey, 'index.tsx'),
          'Add a named export: export function YourComponentName() { ... }',
          variationKey
        );
        return;
      }

      if (result.hasDefault) {
        addError(
          'VARIATION_EXPORT',
          elementId,
          'Found default export instead of named export',
          path.join(REGISTRY_ROOT, elementId, 'variations', variationKey, 'index.tsx'),
          'Remove default export and use named export instead',
          variationKey
        );
        return;
      }

      if (!isPascalCase(result.exportName)) {
        addError(
          'VARIATION_EXPORT',
          elementId,
          `Export name '${result.exportName}' does not follow PascalCase pattern`,
          path.join(REGISTRY_ROOT, elementId, 'variations', variationKey, 'index.tsx'),
          `Rename export to follow PascalCase (e.g., ${elementId.charAt(0).toUpperCase() + elementId.slice(1)}${variationKey.replace(/^\d{2}-/, '').split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')})`,
          variationKey
        );
        return;
      }

      validationsPassed++;
    });
  });
}

// Validation 2: variations.json Consistency Validation
function validateVariationsJsonConsistency() {
  const elements = getElementsFromDisk();
  const allDemoPaths = new Map<string, string>();

  elements.forEach(elementId => {
    const variationsJson = readVariationsJson(elementId);
    if (!variationsJson) {
      addError(
        'VARIATIONS_JSON',
        elementId,
        'variations.json not found or invalid',
        path.join(REGISTRY_ROOT, elementId, 'variations.json'),
        'Regenerate variations.json by running: pnpm generate',
        undefined
      );
      return;
    }

    Object.entries(variationsJson).forEach(([variationKey, data]: [string, any]) => {
      // Check demoPath exists and is unique
      if (!data.demoPath) {
        addError(
          'VARIATIONS_JSON',
          elementId,
          'demoPath is missing',
          path.join(REGISTRY_ROOT, elementId, 'variations.json'),
          `Add demoPath property to variation ${variationKey}`,
          variationKey
        );
        return;
      }

      if (!isKebabCase(data.demoPath)) {
        addError(
          'VARIATIONS_JSON',
          elementId,
          `demoPath '${data.demoPath}' does not follow kebab-case convention`,
          path.join(REGISTRY_ROOT, elementId, 'variations.json'),
          `Change demoPath to kebab-case format: ${data.demoPath.toLowerCase().replace(/\s+/g, '-')}`,
          variationKey
        );
        return;
      }

      if (allDemoPaths.has(data.demoPath)) {
        addError(
          'VARIATIONS_JSON',
          elementId,
          `demoPath '${data.demoPath}' is duplicated (also in ${allDemoPaths.get(data.demoPath)})`,
          path.join(REGISTRY_ROOT, elementId, 'variations.json'),
          `Ensure each demoPath is globally unique. Rename to: ${data.demoPath}-2`,
          variationKey
        );
        return;
      }
      allDemoPaths.set(data.demoPath, elementId);

      // Check files array is not empty
      if (!Array.isArray(data.files) || data.files.length === 0) {
        addError(
          'VARIATIONS_JSON',
          elementId,
          'files array is empty',
          path.join(REGISTRY_ROOT, elementId, 'variations.json'),
          'Add file entries to files array for variation',
          variationKey
        );
        return;
      }

      // Check at least one file has isEntryPoint: true
      const hasEntryPoint = data.files.some((f: any) => f.isEntryPoint === true);
      if (!hasEntryPoint) {
        addError(
          'VARIATIONS_JSON',
          elementId,
          'No file marked as entry point',
          path.join(REGISTRY_ROOT, elementId, 'variations.json'),
          'Mark index.tsx with isEntryPoint: true in files array',
          variationKey
        );
        return;
      }

      // Check name and description are non-empty
      if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
        addError(
          'VARIATIONS_JSON',
          elementId,
          'name is missing or empty',
          path.join(REGISTRY_ROOT, elementId, 'variations.json'),
          'Add non-empty name property',
          variationKey
        );
        return;
      }

      if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
        addError(
          'VARIATIONS_JSON',
          elementId,
          'description is missing or empty',
          path.join(REGISTRY_ROOT, elementId, 'variations.json'),
          'Add non-empty description property',
          variationKey
        );
        return;
      }

      validationsPassed++;
    });
  });
}

// Validation 3: Demo Component Map Validation
function validateDemoComponentMap() {
  const elements = getElementsFromDisk();
  const demoMapEntries = getDemoMapEntries();
  const allDemoPaths = new Set<string>();

  elements.forEach(elementId => {
    const variationsJson = readVariationsJson(elementId);
    if (!variationsJson) {
      return;
    }

    // Also add preview path for element itself
    const previewPath = `${elementId.toLowerCase()}-preview`;
    allDemoPaths.add(previewPath);

    Object.entries(variationsJson).forEach(([variationKey, data]: [string, any]) => {
      if (data.demoPath) {
        allDemoPaths.add(data.demoPath);

        if (!demoMapEntries.has(data.demoPath)) {
          addError(
            'DEMO_MAP_MISSING',
            elementId,
            `demoPath '${data.demoPath}' not found in elementDemoMap`,
            path.join(REGISTRY_ROOT, elementId, 'variations.json'),
            `Add '${data.demoPath}' to elementDemoMap in ${DEMO_MAP_PATH}`,
            variationKey
          );
          return;
        }

        validationsPassed++;
      }
    });
  });

  // Check for orphaned entries in demo map (entries that don't correspond to any variation)
  demoMapEntries.forEach(entry => {
    if (!allDemoPaths.has(entry) && !entry.includes('-preview')) {
      addError(
        'DEMO_MAP_ORPHANED',
        'unknown',
        `Orphaned entry '${entry}' in elementDemoMap with no corresponding variation`,
        DEMO_MAP_PATH,
        `Remove entry '${entry}' from elementDemoMap or create the corresponding variation`,
        undefined
      );
    }
  });
}

// Validation 4: Element Registry Validation
function validateElementRegistry() {
  const elements = getElementsFromDisk();

  elements.forEach(elementId => {
    const metadata = readMetadata(elementId);

    if (!metadata) {
      addError(
        'ELEMENT_METADATA',
        elementId,
        'metadata.json not found or invalid',
        path.join(REGISTRY_ROOT, elementId, 'metadata.json'),
        'Create or fix metadata.json with required fields: id, name, description, category, tags',
        undefined
      );
      return;
    }

    // Check element ID matches folder name (lowercase version of just the element folder, not the full path)
    const elementFolderName = elementId.split('/').pop() || elementId;
    const expectedId = elementFolderName.toLowerCase();
    if (metadata.id !== expectedId) {
      addError(
        'ELEMENT_REGISTRY',
        elementId,
        `Element ID '${metadata.id}' does not match folder name '${elementFolderName}' (expected '${expectedId}')`,
        path.join(REGISTRY_ROOT, elementId, 'metadata.json'),
        `Change id in metadata.json to '${expectedId}'`,
        undefined
      );
      return;
    }

    // Check required fields
    if (!metadata.name || typeof metadata.name !== 'string') {
      addError(
        'ELEMENT_REGISTRY',
        elementId,
        'name field is missing or invalid',
        path.join(REGISTRY_ROOT, elementId, 'metadata.json'),
        'Add name field with string value',
        undefined
      );
      return;
    }

    if (!metadata.description || typeof metadata.description !== 'string') {
      addError(
        'ELEMENT_REGISTRY',
        elementId,
        'description field is missing or invalid',
        path.join(REGISTRY_ROOT, elementId, 'metadata.json'),
        'Add description field with string value',
        undefined
      );
      return;
    }

    if (!metadata.category || !ALLOWED_CATEGORIES.includes(metadata.category)) {
      addError(
        'ELEMENT_REGISTRY',
        elementId,
        `category '${metadata.category}' is not allowed`,
        path.join(REGISTRY_ROOT, elementId, 'metadata.json'),
        `Use one of: ${ALLOWED_CATEGORIES.join(', ')}`,
        undefined
      );
      return;
    }

    // Check at least one variant exists
    const variations = getVariationsFromDisk(elementId);
    if (variations.length === 0) {
      addError(
        'ELEMENT_REGISTRY',
        elementId,
        'No variations found in variations/ directory',
        path.join(REGISTRY_ROOT, elementId, 'variations'),
        'Create at least one variation in variations/01-basic/ or similar',
        undefined
      );
      return;
    }

    totalElements++;
    totalVariations += variations.length;
    validationsPassed++;
  });
}

// Validation 5: Cross-Element Uniqueness Validation
function validateCrossElementUniqueness() {
  const elements = getElementsFromDisk();
  const elementIds = new Set<string>();
  const allDemoPaths = new Set<string>();
  const elementNames = new Set<string>();

  elements.forEach(elementId => {
    // Check for duplicate IDs
    if (elementIds.has(elementId)) {
      addError(
        'ELEMENT_UNIQUENESS',
        elementId,
        `Duplicate element ID '${elementId}'`,
        path.join(REGISTRY_ROOT, elementId),
        'Rename the element folder to have a unique ID',
        undefined
      );
      return;
    }
    elementIds.add(elementId);

    const metadata = readMetadata(elementId);
    const variationsJson = readVariationsJson(elementId);

    // Check for duplicate names
    if (metadata && metadata.name) {
      const lowerName = metadata.name.toLowerCase();
      if (elementNames.has(lowerName)) {
        addError(
          'ELEMENT_UNIQUENESS',
          elementId,
          `Element name '${metadata.name}' is duplicated`,
          path.join(REGISTRY_ROOT, elementId, 'metadata.json'),
          'Change the element name to be unique',
          undefined
        );
        return;
      }
      elementNames.add(lowerName);
    }

    // Check for duplicate demoPath values
    if (variationsJson) {
      Object.entries(variationsJson).forEach(([variationKey, data]: [string, any]) => {
        if (data.demoPath) {
          if (allDemoPaths.has(data.demoPath)) {
            addError(
              'ELEMENT_UNIQUENESS',
              elementId,
              `demoPath '${data.demoPath}' is duplicated across elements`,
              path.join(REGISTRY_ROOT, elementId, 'variations.json'),
              `Rename demoPath to be globally unique`,
              variationKey
            );
            return;
          }
          allDemoPaths.add(data.demoPath);
        }
      });
    }
  });

  if (errors.length === 0) {
    validationsPassed++;
  }
}

// Validation 6: Type Safety Validation
function validateTypeSafety() {
  const elements = getElementsFromDisk();
  let typeErrors = 0;

  elements.forEach(elementId => {
    const variationsJson = readVariationsJson(elementId);
    if (!variationsJson) {
      return;
    }

    Object.entries(variationsJson).forEach(([variationKey, data]: [string, any]) => {
      // Check that files array is valid
      if (!Array.isArray(data.files)) {
        typeErrors++;
        addError(
          'TYPE_SAFETY',
          elementId,
          'files property is not an array',
          path.join(REGISTRY_ROOT, elementId, 'variations.json'),
          'Ensure files is an array of objects with { filename, code, isEntryPoint }',
          variationKey
        );
      }

      // Check that each file has required properties
      if (Array.isArray(data.files)) {
        data.files.forEach((file: any, idx: number) => {
          if (!file.filename || typeof file.filename !== 'string') {
            typeErrors++;
            addError(
              'TYPE_SAFETY',
              elementId,
              `File at index ${idx} missing or invalid filename`,
              path.join(REGISTRY_ROOT, elementId, 'variations.json'),
              'Ensure each file has a filename property',
              variationKey
            );
          }
          if (!file.code || typeof file.code !== 'string') {
            typeErrors++;
            addError(
              'TYPE_SAFETY',
              elementId,
              `File '${file.filename}' missing or invalid code`,
              path.join(REGISTRY_ROOT, elementId, 'variations.json'),
              'Ensure each file has a code property with string content',
              variationKey
            );
          }
        });
      }
    });
  });

  if (typeErrors === 0) {
    validationsPassed++;
  }
}

function runAllValidations(): ValidationResult {
  try {
    validateVariationExports();
    validateVariationsJsonConsistency();
    validateDemoComponentMap();
    validateElementRegistry();
    validateCrossElementUniqueness();
    validateTypeSafety();

    return {
      passed: errors.length === 0,
      errors,
      summary: {
        totalElements,
        totalVariations,
        validationsRun: 6,
        validationsPassed,
      },
    };
  } catch (e) {
    console.error('Fatal error during validation:', (e as Error).message);
    process.exit(1);
  }
}

function formatOutput(result: ValidationResult): void {
  if (result.passed) {
    console.log('\n✓ Element Registry Validation Complete\n');
    console.log('Summary:');
    console.log(`  Total Elements: ${result.summary.totalElements}`);
    console.log(`  Total Variations: ${result.summary.totalVariations}\n`);
    console.log('Validations Passed:');
    console.log(`  ✓ Variation Exports`);
    console.log(`  ✓ variations.json Consistency`);
    console.log(`  ✓ Demo Component Map`);
    console.log(`  ✓ Element Registry`);
    console.log(`  ✓ Cross-Element Uniqueness`);
    console.log(`  ✓ Type Safety\n`);
    console.log('Build can proceed.');
  } else {
    console.log(`\n✗ Element Registry Validation Failed\n`);
    result.errors.forEach((error, idx) => {
      console.log(`Error ${idx + 1}: [${error.type}] Element: ${error.element}${error.variation ? `, Variation: ${error.variation}` : ''}`);
      console.log(`> Issue: ${error.issue}`);
      console.log(`> Location: ${error.location}`);
      console.log(`> Fix: ${error.fix}\n`);
    });
    console.log(`Total errors: ${result.errors.length}\n`);
    console.log('Build failed. Fix errors above and retry.');
  }
}

// Run validation and exit with appropriate code
const result = runAllValidations();
formatOutput(result);
process.exit(result.passed ? 0 : 1);

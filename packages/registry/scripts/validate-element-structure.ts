import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ValidationError {
  severity: 'error' | 'warning';
  element: string;
  variation?: string;
  message: string;
  suggestion?: string;
}

class ValidationReporter {
  errors: ValidationError[] = [];
  warnings: ValidationError[] = [];

  addError(
    element: string,
    message: string,
    variation?: string,
    suggestion?: string
  ) {
    this.errors.push({ severity: 'error', element, variation, message, suggestion });
  }

  addWarning(
    element: string,
    message: string,
    variation?: string,
    suggestion?: string
  ) {
    this.warnings.push({ severity: 'warning', element, variation, message, suggestion });
  }

  report() {
    if (this.warnings.length > 0) {
      console.warn('\n⚠️  VALIDATION WARNINGS:');
      this.warnings.forEach((w) => {
        const location = [w.element, w.variation].filter(Boolean).join(' > ');
        console.warn(`  ${location}: ${w.message}`);
        if (w.suggestion) {
          console.warn(`    💡 ${w.suggestion}`);
        }
      });
    }

    if (this.errors.length > 0) {
      console.error('\n❌ VALIDATION ERRORS:');
      this.errors.forEach((e) => {
        const location = [e.element, e.variation].filter(Boolean).join(' > ');
        console.error(`  ${location}: ${e.message}`);
        if (e.suggestion) {
          console.error(`    💡 ${e.suggestion}`);
        }
      });
      process.exit(1);
    }

    console.log('\n✅ Validation passed!');
  }
}

function validateMetadataIndex(
  elementPath: string,
  elementName: string,
  reporter: ValidationReporter
): boolean {
  const indexTsPath = path.join(elementPath, 'index.ts');
  const indexTsxPath = path.join(elementPath, 'index.tsx');
  const indexPath = fs.existsSync(indexTsPath) ? indexTsPath :
                    fs.existsSync(indexTsxPath) ? indexTsxPath : null;

  if (!indexPath) {
    reporter.addError(
      elementName,
      'index.ts or index.tsx not found',
      undefined,
      `Create ${elementName}/index.ts or index.tsx with metadata export`
    );
    return false;
  }

  try {
    const content = fs.readFileSync(indexPath, 'utf-8');

    if (!content.includes('export const metadata')) {
      reporter.addError(
        elementName,
        'metadata export not found',
        undefined,
        `Add "export const metadata = { id, name, description, ... }" to ${elementName}/index.ts or index.tsx`
      );
      return false;
    }

    return true;
  } catch (error) {
    reporter.addError(
      elementName,
      `index file read error: ${error instanceof Error ? error.message : String(error)}`
    );
    return false;
  }
}

function validateVariationStructure(
  variationPath: string,
  elementName: string,
  variationKey: string,
  reporter: ValidationReporter
): boolean {
  const indexPath = path.join(variationPath, 'index.tsx');

  if (!fs.existsSync(indexPath)) {
    reporter.addError(
      elementName,
      `Missing index.tsx`,
      variationKey,
      `Create ${elementName}/variations/${variationKey}/index.tsx with an exported component`
    );
    return false;
  }

  const indexContent = fs.readFileSync(indexPath, 'utf-8');

  if (!indexContent.includes('export ')) {
    reporter.addError(
      elementName,
      'index.tsx does not export a component',
      variationKey,
      'Add "export function MyComponent() { ... }" or "export const MyComponent = () => { ... }"'
    );
    return false;
  }

  const exportMatches = indexContent.match(/export\s+(?:function|const)\s+(\w+)/g);
  if (!exportMatches || exportMatches.length === 0) {
    reporter.addError(
      elementName,
      'Could not find exported component declaration',
      variationKey
    );
    return false;
  }

  return true;
}

function validateVariationsJson(
  elementPath: string,
  elementName: string,
  reporter: ValidationReporter,
  allDemoPaths: Set<string>
): boolean {
  const variationsPath = path.join(elementPath, 'variations.json');

  if (!fs.existsSync(variationsPath)) {
    reporter.addError(
      elementName,
      'variations.json not found (run pnpm generate to create it)'
    );
    return false;
  }

  try {
    const variations = JSON.parse(fs.readFileSync(variationsPath, 'utf-8'));

    for (const [key, variation] of Object.entries(variations)) {
      if (!variation.name || !variation.description) {
        reporter.addWarning(
          elementName,
          'Missing name or description in variations.json',
          key,
          `Add JSDoc @name and @description to ${elementName}/variations/${key}/index.tsx`
        );
      }

      if (!variation.demoPath) {
        reporter.addError(
          elementName,
          'Missing demoPath in variations.json',
          key
        );
        return false;
      }

      if (allDemoPaths.has(variation.demoPath)) {
        reporter.addError(
          elementName,
          `Duplicate demoPath: ${variation.demoPath}`,
          key,
          'Each variation must have a unique demoPath'
        );
        return false;
      }

      allDemoPaths.add(variation.demoPath);

      if (!variation.exportName) {
        reporter.addError(
          elementName,
          'Missing exportName in variations.json',
          key,
          'Run pnpm generate to regenerate variations.json with export names'
        );
        return false;
      }

      if (!/^[A-Z][a-zA-Z0-9]*$/.test(variation.exportName)) {
        reporter.addError(
          elementName,
          `Invalid exportName: ${variation.exportName} (must be PascalCase)`,
          key,
          `Update the exported component name in ${elementName}/variations/${key}/index.tsx to use PascalCase`
        );
        return false;
      }
    }

    return true;
  } catch (error) {
    reporter.addError(
      elementName,
      `variations.json is invalid JSON: ${error instanceof Error ? error.message : String(error)}`
    );
    return false;
  }
}

async function validateAll() {
  const elementsPath = path.join(__dirname, '..', 'src', 'elements');

  const reporter = new ValidationReporter();
  const allDemoPaths = new Set<string>();

  console.log('\n🔍 Validating element structure...\n');

  function validateInDirectory(dirPath: string, relativePath: string = '') {
    const folders = fs
      .readdirSync(dirPath)
      .filter(
        (f) =>
          fs.statSync(path.join(dirPath, f)).isDirectory() &&
          !f.startsWith('.')
      )
      .sort();

    for (const folderName of folders) {
      const elementPath = path.join(dirPath, folderName);
      const variationsDir = path.join(elementPath, 'variations');
      const hasVariations = fs.existsSync(variationsDir);
      const fullPath = relativePath ? `${relativePath}/${folderName}` : folderName;

      if (hasVariations) {
        if (!validateMetadataIndex(elementPath, fullPath, reporter)) {
          continue;
        }

        const variationFolders = fs
          .readdirSync(variationsDir)
          .filter((f) => /^\d{2}-/.test(f))
          .sort();

        for (const variationKey of variationFolders) {
          const variationPath = path.join(variationsDir, variationKey);
          validateVariationStructure(
            variationPath,
            fullPath,
            variationKey,
            reporter
          );
        }

        validateVariationsJson(elementPath, fullPath, reporter, allDemoPaths);
      } else {
        validateInDirectory(elementPath, fullPath);
      }
    }
  }

  validateInDirectory(elementsPath);

  reporter.report();
}

validateAll();

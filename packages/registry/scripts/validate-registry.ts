import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REGISTRY_SRC_PATH = path.resolve(__dirname, '../src');
const OLD_REGISTRY_PATH = path.resolve(REGISTRY_SRC_PATH, 'registry.ts');
const GENERATED_REGISTRY_PATH = path.resolve(REGISTRY_SRC_PATH, 'registry.ts');
const COMPONENTS_PATH = path.resolve(REGISTRY_SRC_PATH, 'components');

interface ValidationResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    oldComponentCount: number;
    newComponentCount: number;
    oldExampleCount: number;
    newExampleCount: number;
  };
}

async function loadRegistry(registryPath: string) {
  try {
    const module = await import(registryPath);
    return module.componentRegistry || {};
  } catch (error) {
    console.error('Failed to load registry from', registryPath);
    return {};
  }
}

function countExamples(registry: any): number {
  let count = 0;
  for (const component of Object.values(registry)) {
    if ((component as any).examples && Array.isArray((component as any).examples)) {
      count += (component as any).examples.length;
    }
  }
  return count;
}

function validateComponentStructure(componentPath: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  const metadataPath = path.join(componentPath, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    errors.push(`Missing metadata.json`);
  }

  const examplesDir = path.join(componentPath, 'examples');
  if (fs.existsSync(examplesDir)) {
    const files = fs.readdirSync(examplesDir);
    const tsxFiles = files.filter(f => f.endsWith('.tsx'));
    const hasIndex = files.includes('index.ts');

    if (tsxFiles.length === 0) {
      errors.push(`No .tsx example files found`);
    }
    if (!hasIndex) {
      errors.push(`Missing examples/index.ts`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

async function validateRegistry(): Promise<ValidationResult> {
  console.log('🔍 Validating registry migration...\n');

  const result: ValidationResult = {
    success: true,
    errors: [],
    warnings: [],
    stats: {
      oldComponentCount: 0,
      newComponentCount: 0,
      oldExampleCount: 0,
      newExampleCount: 0
    }
  };

  try {
    // Check if components directory exists and has content
    if (!fs.existsSync(COMPONENTS_PATH)) {
      result.errors.push('Components directory does not exist');
      return result;
    }

    const componentDirs = fs
      .readdirSync(COMPONENTS_PATH, { withFileTypes: true })
      .filter(d => d.isDirectory());

    result.stats.newComponentCount = componentDirs.length;

    // Validate each component folder
    for (const componentDir of componentDirs) {
      const componentPath = path.join(COMPONENTS_PATH, componentDir.name);
      const validation = validateComponentStructure(componentPath);

      if (!validation.valid) {
        validation.errors.forEach(error => {
          result.warnings.push(`${componentDir.name}: ${error}`);
        });
      }

      // Count examples
      const examplesPath = path.join(componentPath, 'examples.json');
      if (fs.existsSync(examplesPath)) {
        const examplesJson = JSON.parse(fs.readFileSync(examplesPath, 'utf-8'));
        result.stats.newExampleCount += Object.keys(examplesJson).length;
      }
    }

    // Validation checks
    if (result.stats.newComponentCount === 0) {
      result.errors.push('No components found in components directory');
    }

    if (result.stats.newExampleCount === 0) {
      result.warnings.push('No examples found - may be normal for fresh migration');
    }

    result.success = result.errors.length === 0;

    return result;
  } catch (error) {
    result.success = false;
    result.errors.push(`Validation error: ${error instanceof Error ? error.message : String(error)}`);
    return result;
  }
}

async function printValidationResults(result: ValidationResult) {
  console.log('📊 Validation Results\n');

  if (result.errors.length > 0) {
    console.log('❌ Errors:');
    result.errors.forEach(error => console.log(`   • ${error}`));
    console.log();
  }

  if (result.warnings.length > 0) {
    console.log('⚠️  Warnings:');
    result.warnings.forEach(warning => console.log(`   • ${warning}`));
    console.log();
  }

  console.log('📈 Statistics:');
  console.log(`   Components: ${result.stats.newComponentCount}`);
  console.log(`   Examples: ${result.stats.newExampleCount}`);
  console.log();

  if (result.success) {
    console.log('✅ Validation passed!');
  } else {
    console.log('❌ Validation failed!');
    process.exit(1);
  }
}

(async () => {
  const result = await validateRegistry();
  printValidationResults(result);
})();

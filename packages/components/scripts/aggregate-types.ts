import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getAllComponentNames, getArtifactDir } from './component-cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(PACKAGE_DIR, 'dist');
const SRC_DIR = path.resolve(PACKAGE_DIR, 'src');
const TEMP_INDEX = path.resolve(PACKAGE_DIR, '.cache', 'index-for-types.ts');

/**
 * Generates type definitions by creating an index.d.ts that re-exports from src/
 * This allows TypeScript consumers to get proper types when importing from the package
 */
export async function generateTypes(componentNames: string[]): Promise<void> {
  if (componentNames.length === 0) {
    return;
  }

  console.log('Generating type definitions...');

  try {
    generateRootTypes();
  } catch (error) {
    console.warn('Warning: Failed to generate types:', error);
    // Don't fail the entire build - types can be regenerated
  }
}

/**
 * Combines all .d.ts files from artifacts into dist/
 */
export function aggregateTypes(): void {
  const componentNames = getAllComponentNames();
  const distComponentsDir = path.resolve(DIST_DIR, 'components');

  // Create dist/components directory if it doesn't exist
  if (!fs.existsSync(distComponentsDir)) {
    fs.mkdirSync(distComponentsDir, { recursive: true });
  }

  // Copy type files from each component artifact
  for (const componentName of componentNames) {
    const artifactDir = getArtifactDir(componentName);
    const artifactTypePath = path.resolve(artifactDir, 'index.d.ts');
    const distTypePath = path.resolve(distComponentsDir, componentName, 'index.d.ts');

    if (fs.existsSync(artifactTypePath)) {
      const distTypeDir = path.dirname(distTypePath);
      if (!fs.existsSync(distTypeDir)) {
        fs.mkdirSync(distTypeDir, { recursive: true });
      }

      fs.copyFileSync(artifactTypePath, distTypePath);

      // Also copy .d.ts.map if it exists
      const mapPath = `${artifactTypePath}.map`;
      if (fs.existsSync(mapPath)) {
        fs.copyFileSync(mapPath, `${distTypePath}.map`);
      }
    }
  }
}

/**
 * Generates the root index.d.ts file by running tsc on src/
 */
export function generateRootTypes(): void {
  try {
    // Use tsc to generate type definitions from src/
    // Override noEmit and outDir from tsconfig.json
    execSync(
      `tsc --noEmit false --declaration --emitDeclarationOnly --outDir "${DIST_DIR}" --target es2017 --module esnext`,
      {
        cwd: PACKAGE_DIR,
        stdio: 'pipe',
      }
    );
    console.log('✓ Type definitions generated');
  } catch (error) {
    console.warn('Warning: tsc type generation encountered issues, types may be incomplete');
    // Create a basic index.d.ts as fallback
    const componentNames = getAllComponentNames();
    const exports = [
      `// Auto-generated types from component library`,
      ...componentNames.map((name) => `export * from './${name}/index.js';`),
    ].join('\n');

    const rootTypePath = path.resolve(DIST_DIR, 'index.d.ts');
    fs.writeFileSync(rootTypePath, exports, 'utf-8');
  }
}

/**
 * Main function to handle all type generation and aggregation
 */
export async function handleTypes(changedComponents: string[]): Promise<void> {
  try {
    // Generate types for changed components
    await generateTypes(changedComponents);

    // Aggregate all types
    aggregateTypes();

    // Generate root index.d.ts
    generateRootTypes();
  } catch (error) {
    console.error('Failed to handle type generation:', error);
    throw error;
  }
}

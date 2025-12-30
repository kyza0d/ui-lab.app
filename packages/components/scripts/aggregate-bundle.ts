import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getAllComponentNames, getArtifactDir } from './component-cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(PACKAGE_DIR, 'dist');
const TEMP_ENTRY = path.resolve(PACKAGE_DIR, '.cache', 'entry.js');

/**
 * Generates a virtual entry point that exports all components from artifacts + shared utilities
 */
export function generateVirtualEntry(): string {
  const componentNames = getAllComponentNames();

  // Export from component artifacts
  const componentImports = componentNames
    .map((name) => {
      const artifactDir = getArtifactDir(name);
      const artifactPath = path.relative(path.dirname(TEMP_ENTRY), artifactDir);
      const relativePath = './' + artifactPath.replace(/\\/g, '/');
      return `export * from '${relativePath}/index.js';`;
    })
    .join('\n');

  // Export from shared utilities (these aren't in artifacts, they're in src/)
  const PACKAGE_DIR = path.resolve(path.dirname(__filename), '..');
  const sharedFiles = ['lib/utils.ts', 'utils/easing.ts'];

  const sharedImports = sharedFiles
    .filter((file) => {
      const filePath = path.resolve(PACKAGE_DIR, 'src', file);
      return fs.existsSync(filePath);
    })
    .map((file) => {
      const srcPath = path.resolve(PACKAGE_DIR, 'src', file);
      const relativePath = path.relative(path.dirname(TEMP_ENTRY), srcPath).replace(/\\/g, '/');
      // Remove .ts extension for the import
      const withoutExt = relativePath.replace(/\.ts$/, '');
      return `export * from '${withoutExt}';`;
    })
    .join('\n');

  const allImports = [componentImports, sharedImports].filter(Boolean).join('\n\n');
  return allImports;
}

/**
 * Writes the virtual entry point to disk
 */
function writeVirtualEntry(): void {
  const entryContent = generateVirtualEntry();
  const entryDir = path.dirname(TEMP_ENTRY);

  if (!fs.existsSync(entryDir)) {
    fs.mkdirSync(entryDir, { recursive: true });
  }

  fs.writeFileSync(TEMP_ENTRY, entryContent, 'utf-8');
}

/**
 * Bundles all component artifacts into ES module format
 */
async function buildESBundle(): Promise<void> {
  writeVirtualEntry();

  try {
    await esbuild.build({
      entryPoints: [TEMP_ENTRY],
      outfile: path.resolve(DIST_DIR, 'ui-lab-ui.es.js'),
      format: 'esm',
      target: 'es2017',
      bundle: true,
      external: ['react', 'react-dom'],
      sourcemap: true,
      minify: false,
      splitting: false,
      treeShaking: true,
    });

    console.log('✓ ES bundle generated');
  } catch (error) {
    console.error('Failed to build ES bundle:', error);
    throw error;
  }
}

/**
 * Bundles all component artifacts into UMD format
 */
async function buildUMDBundle(): Promise<void> {
  writeVirtualEntry();

  try {
    await esbuild.build({
      entryPoints: [TEMP_ENTRY],
      outfile: path.resolve(DIST_DIR, 'ui-lab-ui.umd.js'),
      format: 'iife',
      globalName: 'UILabComponents',
      target: 'es2017',
      bundle: true,
      external: ['react', 'react-dom'],
      sourcemap: true,
      minify: false,
      splitting: false,
      treeShaking: true,
    });

    console.log('✓ UMD bundle generated');
  } catch (error) {
    console.error('Failed to build UMD bundle:', error);
    throw error;
  }
}

/**
 * Aggregates all component artifacts into final bundles
 */
export async function aggregateBundle(): Promise<void> {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }

  console.log('Aggregating bundles...');

  try {
    // Build both formats in parallel
    await Promise.all([buildESBundle(), buildUMDBundle()]);

    // Clean up temporary entry
    if (fs.existsSync(TEMP_ENTRY)) {
      fs.unlinkSync(TEMP_ENTRY);
    }

    console.log('✓ Bundle aggregation complete');
  } catch (error) {
    console.error('Failed to aggregate bundles:', error);
    throw error;
  }
}

import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { getArtifactDir, getAllComponentNames, updateComponentCache, updateArtifactMtime, type ComponentCache } from './component-cache';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_DIR = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.resolve(PACKAGE_DIR, 'src/components');

/**
 * CSS modules plugin for esbuild
 * Handles .module.css files by extracting them and returning CSS references
 */
const cssModulesPlugin: esbuild.Plugin = {
  name: 'css-modules',
  setup(build) {
    build.onLoad({ filter: /\.module\.css$/ }, async (args) => {
      const css = await esbuild.default.transform('', {
        loader: 'css',
      });

      return {
        contents: `export default {};`,
        loader: 'js',
      };
    });

    build.onLoad({ filter: /\.css$/, namespace: 'file' }, async (args) => {
      const contents = await import('fs').then((fs) => fs.promises.readFile(args.path, 'utf8'));

      return {
        contents: `export default \`${contents.replace(/`/g, '\\`')}\`;`,
        loader: 'js',
      };
    });
  },
};

/**
 * Builds a single component with esbuild
 */
export async function buildComponent(componentName: string, componentCache: ComponentCache): Promise<void> {
  const componentDir = path.resolve(COMPONENTS_DIR, componentName);

  // Try to find entry point in order of preference
  let entryPoint: string | null = null;
  const candidates = [
    path.resolve(componentDir, 'index.tsx'),
    path.resolve(componentDir, 'index.ts'),
    path.resolve(componentDir, `${componentName}.tsx`),
    path.resolve(componentDir, `${componentName}.ts`),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      entryPoint = candidate;
      break;
    }
  }

  if (!entryPoint) {
    throw new Error(`No entry point found for component ${componentName}. Checked: ${candidates.join(', ')}`);
  }

  const outDir = getArtifactDir(componentName);
  const allComponentNames = getAllComponentNames();

  // Build the externals list - all other components and shared libs
  const externals = [
    'react',
    'react-dom',
    'react-aria',
    'react-stately',
    '@floating-ui/react-dom',
    '@gsap/react',
    'gsap',
    'class-variance-authority',
    'clsx',
    'lucide-react',
    'postcss',
    'react-icons',
  ];

  // Add other components as externals
  for (const name of allComponentNames) {
    if (name !== componentName) {
      externals.push(`@/components/${name}`);
    }
  }

  // Add shared libraries
  externals.push('@/lib/utils', '@/utils/easing');

  try {
    await esbuild.build({
      entryPoints: { index: entryPoint },
      outdir: outDir,
      format: 'esm',
      target: 'es2017',
      jsx: 'automatic',
      splitting: false,
      bundle: true,
      external: externals,
      alias: {
        '@': path.resolve(PACKAGE_DIR, 'src'),
      },
      loader: {
        '.css': 'text',
        '.module.css': 'local-css',
      },
      plugins: [cssModulesPlugin],
      sourcemap: false,
      minify: false,
      treeShaking: true,
    });

    // Update cache with artifact mtime
    updateComponentCache(componentName, componentCache);
    updateArtifactMtime(componentName, componentCache);
  } catch (error) {
    console.error(`Failed to build component ${componentName}:`, error);
    throw error;
  }
}

/**
 * Builds multiple components in parallel
 */
export async function buildChangedComponents(
  componentNames: string[],
  componentCache: ComponentCache
): Promise<void> {
  if (componentNames.length === 0) {
    return;
  }

  console.log(`Building ${componentNames.length} changed components...`);

  // Build in parallel with Promise.all
  const buildPromises = componentNames.map((name) => buildComponent(name, componentCache));

  try {
    await Promise.all(buildPromises);
    console.log(`✓ Built ${componentNames.length} components`);
  } catch (error) {
    console.error('Failed to build components:', error);
    throw error;
  }
}

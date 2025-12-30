import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_DIR = path.resolve(__dirname, '..');
const CACHE_DIR = path.resolve(PACKAGE_DIR, '.cache');
const CACHE_FILE = path.resolve(CACHE_DIR, 'build-cache.json');

interface BuildCache {
  timestamp: number;
  version: string;
  buildSuccess: boolean;
  files: {
    sourceFiles: number;
    packageJson: number;
    viteConfig: number;
    postcssConfig: number;
    tsconfig: number;
  };
  outputs: {
    esBundle: boolean;
    umdBundle: boolean;
    cssMain: boolean;
    cssVite: boolean;
    typesRoot: boolean;
    typesMap: boolean;
  };
}

function getDefaultCache(): BuildCache {
  return {
    timestamp: 0,
    version: '1.0.0',
    buildSuccess: false,
    files: {
      sourceFiles: 0,
      packageJson: 0,
      viteConfig: 0,
      postcssConfig: 0,
      tsconfig: 0,
    },
    outputs: {
      esBundle: false,
      umdBundle: false,
      cssMain: false,
      cssVite: false,
      typesRoot: false,
      typesMap: false,
    },
  };
}

function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function loadBuildCache(): BuildCache {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return getDefaultCache();
    }

    const content = fs.readFileSync(CACHE_FILE, 'utf-8');
    const cache = JSON.parse(content) as BuildCache;

    if (!cache.version || !cache.files || !cache.outputs) {
      return getDefaultCache();
    }

    return cache;
  } catch (error) {
    return getDefaultCache();
  }
}

function saveBuildCache(cache: BuildCache): void {
  try {
    ensureCacheDir();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch (error) {
    console.warn('Failed to save build cache:', error);
  }
}

function getFileMtime(filePath: string): number {
  try {
    if (!fs.existsSync(filePath)) {
      return 0;
    }
    const stat = fs.statSync(filePath);
    return stat.mtimeMs;
  } catch (error) {
    return Date.now();
  }
}

function getSourceFilesMtime(): number {
  const srcDir = path.resolve(PACKAGE_DIR, 'src');
  if (!fs.existsSync(srcDir)) return 0;

  let maxMtime = 0;

  function walkDir(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name !== 'tests' && entry.name !== 'node_modules' && entry.name !== 'dist') {
          walkDir(fullPath);
        }
      } else if (entry.isFile() && /\.(ts|tsx|css)$/.test(entry.name)) {
        if (!entry.name.endsWith('.test.ts') && !entry.name.endsWith('.test.tsx')) {
          try {
            const stat = fs.statSync(fullPath);
            maxMtime = Math.max(maxMtime, stat.mtimeMs);
          } catch (error) {
            return Date.now() as any;
          }
        }
      }
    }
  }

  walkDir(srcDir);
  return maxMtime;
}

function getConfigFilesMtime(): BuildCache['files'] {
  return {
    sourceFiles: getSourceFilesMtime(),
    packageJson: getFileMtime(path.resolve(PACKAGE_DIR, 'package.json')),
    viteConfig: getFileMtime(path.resolve(PACKAGE_DIR, 'vite.config.ts')),
    postcssConfig: getFileMtime(path.resolve(PACKAGE_DIR, 'postcss.config.mjs')),
    tsconfig: getFileMtime(path.resolve(PACKAGE_DIR, 'tsconfig.json')),
  };
}

function verifyOutputs(): BuildCache['outputs'] {
  const distDir = path.resolve(PACKAGE_DIR, 'dist');

  return {
    esBundle: fs.existsSync(path.resolve(distDir, 'ui-lab-ui.es.js')),
    umdBundle: fs.existsSync(path.resolve(distDir, 'ui-lab-ui.umd.js')),
    cssMain: fs.existsSync(path.resolve(distDir, 'styles.css')),
    cssVite: fs.existsSync(path.resolve(distDir, 'style.css')),
    typesRoot: fs.existsSync(path.resolve(distDir, 'index.d.ts')),
    typesMap: fs.existsSync(path.resolve(distDir, 'index.d.ts.map')),
  };
}

function isCacheValid(cache: BuildCache): boolean {
  if (!cache.buildSuccess) {
    return false;
  }

  const currentOutputs = verifyOutputs();
  if (!Object.values(currentOutputs).every((exists) => exists)) {
    return false;
  }

  const currentFiles = getConfigFilesMtime();

  return (
    cache.files.sourceFiles === currentFiles.sourceFiles &&
    cache.files.packageJson === currentFiles.packageJson &&
    cache.files.viteConfig === currentFiles.viteConfig &&
    cache.files.postcssConfig === currentFiles.postcssConfig &&
    cache.files.tsconfig === currentFiles.tsconfig
  );
}

function updateCache(): BuildCache {
  const currentFiles = getConfigFilesMtime();
  const currentOutputs = verifyOutputs();

  return {
    timestamp: Date.now(),
    version: '1.0.0',
    buildSuccess: true,
    files: currentFiles,
    outputs: currentOutputs,
  };
}

function invalidateCache(): void {
  const cache = loadBuildCache();
  cache.buildSuccess = false;
  saveBuildCache(cache);
}

async function main(): Promise<void> {
  const cache = loadBuildCache();

  // Skip cache in CI
  if (process.env.CI === 'true') {
    console.log('CI environment detected - running full build');
    runBuild();
    return;
  }

  // Check if cache is valid
  if (isCacheValid(cache)) {
    console.log('✓ Build cache valid - skipping build');
    console.log(`  Last built: ${new Date(cache.timestamp).toLocaleString()}`);
    console.log('  Use "npm run build:force" to rebuild anyway');
    process.exit(0);
  }

  // Cache is invalid - need to rebuild
  const reason = !cache.buildSuccess ? 'previous build failed' : 'source files changed';

  console.log(`Building @components package (${reason})...`);
  runBuild();
}

function runBuild(): void {
  try {
    console.log('Running vite build...');
    execSync('vite build', { cwd: process.cwd(), stdio: 'inherit' });

    console.log('Running CSS build...');
    execSync('npm run build:css', { cwd: process.cwd(), stdio: 'inherit' });

    // Build succeeded - update cache
    const updatedCache = updateCache();
    saveBuildCache(updatedCache);

    console.log('✓ Build completed successfully and cached');

    process.exit(0);
  } catch (error) {
    // Build failed - invalidate cache
    console.error('✗ Build failed');
    invalidateCache();
    console.log('Cache invalidated - next build will retry');
    process.exit(1);
  }
}

// Run the main function
main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});

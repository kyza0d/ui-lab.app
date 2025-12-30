import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PACKAGE_DIR = path.resolve(__dirname, '..');
const CACHE_DIR = path.resolve(PACKAGE_DIR, '.cache');
const CACHE_FILE = path.resolve(CACHE_DIR, 'component-cache.json');
const ARTIFACTS_DIR = path.resolve(CACHE_DIR, 'artifacts');
const COMPONENTS_DIR = path.resolve(PACKAGE_DIR, 'src/components');

const CACHE_VERSION = '2.0.0';

/**
 * Component-level cache structure
 */
export interface ComponentArtifact {
  sourceMtime: number;
  files: Record<string, number>;
  artifactPath: string;
  artifactMtime: number;
}

export interface ComponentCache {
  version: string;
  timestamp: number;
  components: Record<string, ComponentArtifact>;
  shared: Record<string, number>;
}

/**
 * Gets the default cache object
 */
function getDefaultCache(): ComponentCache {
  return {
    version: CACHE_VERSION,
    timestamp: 0,
    components: {},
    shared: {
      'lib/utils.ts': 0,
      'utils/easing.ts': 0,
    },
  };
}

/**
 * Ensures the cache directory exists
 */
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
  if (!fs.existsSync(ARTIFACTS_DIR)) {
    fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
  }
}

/**
 * Loads the component cache from disk
 */
export function loadComponentCache(): ComponentCache {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return getDefaultCache();
    }

    const content = fs.readFileSync(CACHE_FILE, 'utf-8');
    const cache = JSON.parse(content) as ComponentCache;

    // Validate cache structure
    if (!cache.version || !cache.components || !cache.shared) {
      console.warn('Cache structure invalid, starting fresh');
      return getDefaultCache();
    }

    // Check version compatibility
    if (cache.version !== CACHE_VERSION) {
      console.warn(`Cache version mismatch (${cache.version} != ${CACHE_VERSION}), rebuilding`);
      return getDefaultCache();
    }

    return cache;
  } catch (error) {
    console.warn('Failed to load component cache, starting fresh');
    return getDefaultCache();
  }
}

/**
 * Saves the component cache to disk
 */
export function saveComponentCache(cache: ComponentCache): void {
  try {
    ensureCacheDir();
    cache.timestamp = Date.now();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch (error) {
    console.warn('Failed to save component cache:', error);
  }
}

/**
 * Gets all component names from src/components/
 */
export function getAllComponentNames(): string[] {
  try {
    if (!fs.existsSync(COMPONENTS_DIR)) {
      return [];
    }

    return fs
      .readdirSync(COMPONENTS_DIR, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort();
  } catch (error) {
    console.error('Failed to read components directory:', error);
    return [];
  }
}

/**
 * Gets the maximum modification time of a component's files
 */
export function getComponentMtime(componentName: string): number {
  const componentDir = path.resolve(COMPONENTS_DIR, componentName);

  try {
    if (!fs.existsSync(componentDir)) {
      return 0;
    }

    // Get all source files (ts, tsx, css) excluding tests
    const files = glob.sync(`${componentDir}/**/*.{ts,tsx,css}`, {
      ignore: [`${componentDir}/**/*.test.*`, `${componentDir}/**/tests/**`],
    });

    if (files.length === 0) {
      return 0;
    }

    let maxMtime = 0;
    const fileMap: Record<string, number> = {};

    for (const file of files) {
      try {
        const stat = fs.statSync(file);
        const mtime = stat.mtimeMs;
        maxMtime = Math.max(maxMtime, mtime);

        const relativePath = path.relative(componentDir, file);
        fileMap[relativePath] = mtime;
      } catch (error) {
        // If any stat fails, invalidate cache by returning current time
        return Date.now();
      }
    }

    // Store file details for debugging
    if (!globalThis.__componentFileMap) {
      globalThis.__componentFileMap = {};
    }
    (globalThis as any).__componentFileMap[componentName] = fileMap;

    return maxMtime;
  } catch (error) {
    console.error(`Failed to get mtime for component ${componentName}:`, error);
    return Date.now();
  }
}

/**
 * Gets the modification times of shared utilities
 */
function getSharedFilesMtime(): Record<string, number> {
  const shared: Record<string, number> = {};

  for (const sharedFile of ['lib/utils.ts', 'utils/easing.ts']) {
    const filePath = path.resolve(PACKAGE_DIR, 'src', sharedFile);
    try {
      if (fs.existsSync(filePath)) {
        const stat = fs.statSync(filePath);
        shared[sharedFile] = stat.mtimeMs;
      } else {
        shared[sharedFile] = 0;
      }
    } catch (error) {
      shared[sharedFile] = Date.now();
    }
  }

  return shared;
}

/**
 * Detects which components have changed since last build
 */
export function detectChangedComponents(cache: ComponentCache): string[] {
  const changed: string[] = [];
  const allComponents = getAllComponentNames();

  // Check if shared files changed - if so, rebuild everything
  const currentShared = getSharedFilesMtime();
  const sharedChanged = Object.entries(currentShared).some(
    ([file, mtime]) => !cache.shared[file] || cache.shared[file] !== mtime
  );

  if (sharedChanged) {
    console.log('Shared utilities changed - rebuilding all components');
    return allComponents;
  }

  // Check each component
  for (const componentName of allComponents) {
    const currentMtime = getComponentMtime(componentName);
    const cached = cache.components[componentName];

    // Component is new or changed
    if (!cached || cached.sourceMtime !== currentMtime) {
      changed.push(componentName);
    }
  }

  // Prune cache entries for deleted components
  for (const cachedName of Object.keys(cache.components)) {
    if (!allComponents.includes(cachedName)) {
      delete cache.components[cachedName];
    }
  }

  return changed;
}

/**
 * Updates cache entry for a component
 */
export function updateComponentCache(componentName: string, cache: ComponentCache): ComponentCache {
  const mtime = getComponentMtime(componentName);
  const artifactPath = path.resolve(ARTIFACTS_DIR, componentName, `${componentName}.js`);

  // Get file-level mtimes for debugging
  const fileMap = (globalThis as any).__componentFileMap?.[componentName] || {};

  cache.components[componentName] = {
    sourceMtime: mtime,
    files: fileMap,
    artifactPath,
    artifactMtime: 0, // Will be updated after build
  };

  // Update shared files mtime
  cache.shared = getSharedFilesMtime();

  return cache;
}

/**
 * Updates artifact mtime after successful build
 */
export function updateArtifactMtime(componentName: string, cache: ComponentCache): void {
  const artifactFile = path.resolve(ARTIFACTS_DIR, componentName, `${componentName}.js`);

  if (cache.components[componentName]) {
    try {
      if (fs.existsSync(artifactFile)) {
        const stat = fs.statSync(artifactFile);
        cache.components[componentName].artifactMtime = stat.mtimeMs;
      }
    } catch (error) {
      console.warn(`Failed to update artifact mtime for ${componentName}:`, error);
    }
  }
}

/**
 * Gets the artifact directory for a component
 */
export function getArtifactDir(componentName: string): string {
  return path.resolve(ARTIFACTS_DIR, componentName);
}

/**
 * Clears the entire cache and artifacts
 */
export function clearCache(): void {
  try {
    if (fs.existsSync(CACHE_DIR)) {
      fs.rmSync(CACHE_DIR, { recursive: true, force: true });
      console.log('Cache and artifacts cleared');
    }
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}

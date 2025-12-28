import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import type { ComponentAPI } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_DIR = path.resolve(__dirname, '../.cache');
const CACHE_FILE = path.resolve(CACHE_DIR, 'api-data.json');

interface CacheEntry {
  mtime: number;
  api: ComponentAPI | null;
}

interface ApiCache {
  timestamp: number;
  version: string;
  files: Record<string, CacheEntry>;
}

/**
 * Ensures the cache directory exists
 */
function ensureCacheDir(): void {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

/**
 * Loads the API cache from disk
 */
export function loadApiCache(): ApiCache {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return { timestamp: 0, version: '1.0.0', files: {} };
    }

    const content = fs.readFileSync(CACHE_FILE, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.warn('Failed to load API cache, starting fresh:', error);
    return { timestamp: 0, version: '1.0.0', files: {} };
  }
}

/**
 * Saves the API cache to disk
 */
export function saveApiCache(cache: ApiCache): void {
  try {
    ensureCacheDir();
    fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
  } catch (error) {
    console.warn('Failed to save API cache:', error);
  }
}

/**
 * Gets the modification time of component files
 * Returns the most recent mtime across all component files
 */
function getComponentsMtime(componentDirName: string, componentsDir: string): number {
  const componentDir = path.join(componentsDir, componentDirName);
  if (!fs.existsSync(componentDir)) return 0;

  const files = fs.readdirSync(componentDir);
  const tsxFiles = files.filter(f => f.endsWith('.tsx') && !f.endsWith('.test.tsx'));

  let maxMtime = 0;
  for (const file of tsxFiles) {
    const filePath = path.join(componentDir, file);
    try {
      const stat = fs.statSync(filePath);
      maxMtime = Math.max(maxMtime, stat.mtimeMs);
    } catch (error) {
      // If file stat fails, invalidate cache
      return Date.now();
    }
  }

  return maxMtime;
}

/**
 * Checks if a component's cache entry is still valid
 */
export function isCacheValid(
  componentDirName: string,
  cache: ApiCache,
  componentsDir: string
): boolean {
  const cacheEntry = cache.files[componentDirName];
  if (!cacheEntry) {
    return false;
  }

  const currentMtime = getComponentsMtime(componentDirName, componentsDir);
  return cacheEntry.mtime === currentMtime;
}

/**
 * Gets cached API data if available and valid, otherwise returns null
 */
export function getCachedAPI(
  componentDirName: string,
  cache: ApiCache,
  componentsDir: string
): ComponentAPI | null {
  if (!isCacheValid(componentDirName, cache, componentsDir)) {
    return null;
  }

  const cacheEntry = cache.files[componentDirName];
  return cacheEntry?.api || null;
}

/**
 * Updates cache entry for a component
 */
export function updateCacheEntry(
  componentDirName: string,
  cache: ApiCache,
  api: ComponentAPI | null,
  componentsDir: string
): ApiCache {
  const mtime = getComponentsMtime(componentDirName, componentsDir);

  return {
    ...cache,
    timestamp: Date.now(),
    files: {
      ...cache.files,
      [componentDirName]: {
        mtime,
        api,
      },
    },
  };
}

/**
 * Removes entries from cache for components that no longer exist
 */
export function pruneCache(cache: ApiCache, componentsDir: string): ApiCache {
  const activeComponents = new Set(
    fs.existsSync(componentsDir)
      ? fs
          .readdirSync(componentsDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
      : []
  );

  const prunedFiles: Record<string, CacheEntry> = {};
  for (const [componentName, entry] of Object.entries(cache.files)) {
    if (activeComponents.has(componentName)) {
      prunedFiles[componentName] = entry;
    }
  }

  return {
    ...cache,
    files: prunedFiles,
  };
}

/**
 * Clears the entire cache
 */
export function clearCache(): void {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      fs.unlinkSync(CACHE_FILE);
      console.log('Cache cleared');
    }
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}

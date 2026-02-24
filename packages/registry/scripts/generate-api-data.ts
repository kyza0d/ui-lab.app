import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { withCustomConfig, type ComponentDoc, type PropItem } from 'react-docgen-typescript';
import type { PropDefinition, ComponentAPI } from '../src/types';
import { componentRegistry } from '../src/registry.js';
import {
  loadApiCache,
  saveApiCache,
  getCachedAPI,
  updateCacheEntry,
  pruneCache,
} from './cache-api-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../../@ui/src/components');

const parser = withCustomConfig(path.resolve(__dirname, '../../@ui/tsconfig.json'), {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop: PropItem) => {
    if (prop.declarations && prop.declarations.length > 0) {
      const hasPropAdditionalDescription = prop.declarations.find((declaration) => {
        return !declaration.fileName.includes('node_modules');
      });
      return Boolean(hasPropAdditionalDescription);
    }
    return true;
  },
});

function toKebabCase(pascalCase: string): string {
  return pascalCase
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function formatType(type: string): string {
  return type
    .replace(/\s+/g, ' ')
    .replace(/\| undefined/g, '')
    .trim();
}

function extractEnumValues(prop: PropItem): string[] | undefined {
  const typeObj = (prop.type as any);

  if (typeObj.name === 'enum' && Array.isArray(typeObj.value)) {
    return typeObj.value
      .map((item: any) => {
        const val = item.value || '';
        return val.replace(/^["']|["']$/g, '');
      })
      .filter((val: string) => val.length > 0);
  }

  return undefined;
}

function extractPropsFromDoc(doc: ComponentDoc): PropDefinition[] {
  return Object.entries(doc.props).map(([name, prop]) => {
    const enumValues = extractEnumValues(prop);
    return {
      name,
      type: enumValues ? enumValues.join(' | ') : formatType(prop.type.name),
      required: prop.required,
      defaultValue: prop.defaultValue?.value,
      description: prop.description || undefined,
      enumValues,
    };
  });
}

function getComponentFiles(componentDirName: string): string[] {
  const componentDir = path.join(COMPONENTS_DIR, componentDirName);
  if (!fs.existsSync(componentDir)) return [];

  const mainFileName = `${componentDirName}.tsx`;
  return fs.readdirSync(componentDir)
    .filter(f => f.endsWith('.tsx') && !f.endsWith('.test.tsx'))
    .sort((a, b) => {
      // Main component file first so allDocs[0] is always the root component
      if (a === mainFileName) return -1;
      if (b === mainFileName) return 1;
      return a.localeCompare(b);
    })
    .map(f => path.join(componentDir, f));
}

export function extractComponentAPI(componentDirName: string): ComponentAPI | null {
  const files = getComponentFiles(componentDirName);
  if (files.length === 0) return null;

  const allDocs: ComponentDoc[] = [];
  for (const file of files) {
    try {
      const docs = parser.parse(file);
      allDocs.push(...docs);
    } catch (e) {
      console.warn(`Failed to parse ${file}:`, e);
    }
  }

  if (allDocs.length === 0) return null;

  // Prefer the doc whose displayName matches the component directory name (e.g. "Modal" for Modal dir)
  const mainDoc = allDocs.find(d => d.displayName === componentDirName) || allDocs[0];
  const mainProps = extractPropsFromDoc(mainDoc);

  const subComponents: Record<string, PropDefinition[]> = {};
  for (const doc of allDocs) {
    if (doc.displayName && doc.displayName !== mainDoc.displayName) {
      subComponents[doc.displayName] = extractPropsFromDoc(doc);
    }
  }

  return {
    props: mainProps,
    subComponents: Object.keys(subComponents).length > 0 ? subComponents : undefined,
  };
}

export function extractAllComponentAPIs(componentDirNames: string[]): Record<string, ComponentAPI> {
  const result: Record<string, ComponentAPI> = {};
  let cache = loadApiCache();

  const cachedCount = Object.keys(cache.files).length;
  if (cachedCount > 0) {
    console.log(`Loaded API cache with ${cachedCount} entries`);
  }

  let parsedCount = 0;
  let cacheHitCount = 0;

  for (const dirName of componentDirNames) {
    const kebabId = toKebabCase(dirName);

    // Try to get cached API first
    const cachedAPI = getCachedAPI(dirName, cache, COMPONENTS_DIR);
    if (cachedAPI !== null) {
      result[kebabId] = cachedAPI;
      cacheHitCount++;
    } else {
      // Parse and cache
      const api = extractComponentAPI(dirName);
      if (api) {
        result[kebabId] = api;
        cache = updateCacheEntry(dirName, cache, api, COMPONENTS_DIR);
        parsedCount++;
      } else {
        // Component parse failed, cache null result
        cache = updateCacheEntry(dirName, cache, null, COMPONENTS_DIR);
      }
    }

    // Add examples from registry metadata
    const metadata = componentRegistry[kebabId];
    if (metadata?.examples && result[kebabId]) {
      result[kebabId].examples = metadata.examples;
    }
  }

  // Prune cache entries for deleted components
  cache = pruneCache(cache, COMPONENTS_DIR);

  // Save updated cache
  saveApiCache(cache);

  console.log(
    `Cache: ${cacheHitCount} hits, ${parsedCount} parsed, total ${Object.keys(result).length} components`
  );

  return result;
}

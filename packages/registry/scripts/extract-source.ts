import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import type { ComponentSourceCode } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../../components/src/components');

function toKebabCase(pascalCase: string): string {
  return pascalCase
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function transformImports(content: string): string {
  // Transform @/lib/utils imports to ./utils
  content = content.replace(/from ["']@\/lib\/utils["']/g, 'from "./utils"');

  // Remove "use client" directive for now (can be added at file write time if needed)
  // Keep it for now as it's important for client components

  return content;
}

function extractComponentSource(componentDirName: string): ComponentSourceCode | null {
  const componentDir = path.join(COMPONENTS_DIR, componentDirName);

  if (!fs.existsSync(componentDir)) {
    return null;
  }

  const tsxPath = path.join(componentDir, `${componentDirName}.tsx`);
  const cssPath = path.join(componentDir, `${componentDirName}.module.css`);
  const cssTypesPath = path.join(componentDir, `${componentDirName}.module.css.d.ts`);

  if (!fs.existsSync(tsxPath)) {
    return null;
  }

  try {
    const tsx = fs.readFileSync(tsxPath, 'utf-8');
    const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf-8') : '';
    const cssTypes = fs.existsSync(cssTypesPath) ? fs.readFileSync(cssTypesPath, 'utf-8') : '';

    return {
      tsx: transformImports(tsx),
      css,
      cssTypes,
    };
  } catch (error) {
    console.warn(`Failed to extract source for ${componentDirName}:`, error);
    return null;
  }
}

export function extractAllComponentSources(componentDirNames: string[]): Record<string, ComponentSourceCode> {
  const result: Record<string, ComponentSourceCode> = {};

  for (const dirName of componentDirNames) {
    const source = extractComponentSource(dirName);
    if (source) {
      const kebabId = toKebabCase(dirName);
      result[kebabId] = source;
    }
  }

  return result;
}

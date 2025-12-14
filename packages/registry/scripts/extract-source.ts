import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import type { ComponentSourceCode } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../../components/src/components');

function transformImports(content: string): string {
  // Transform @/lib/utils imports to ./utils
  content = content.replace(/from ["']@\/lib\/utils["']/g, 'from "./utils"');

  // Remove "use client" directive for now (can be added at file write time if needed)
  // Keep it for now as it's important for client components

  return content;
}

function extractComponentSource(componentId: string): ComponentSourceCode | null {
  const componentDir = path.join(COMPONENTS_DIR, componentId);

  if (!fs.existsSync(componentDir)) {
    return null;
  }

  // Read the main component file
  const tsxPath = path.join(componentDir, `${componentId}.tsx`);
  const cssPath = path.join(componentDir, `${componentId}.module.css`);
  const cssTypesPath = path.join(componentDir, `${componentId}.module.css.d.ts`);

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
    console.warn(`Failed to extract source for ${componentId}:`, error);
    return null;
  }
}

export function extractAllComponentSources(componentIds: string[]): Record<string, ComponentSourceCode> {
  const result: Record<string, ComponentSourceCode> = {};

  for (const id of componentIds) {
    const source = extractComponentSource(id);
    if (source) {
      result[id] = source;
    }
  }

  return result;
}

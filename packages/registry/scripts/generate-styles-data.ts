import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../../@ui/src/components');

function toKebabCase(pascalCase: string): string {
  return pascalCase
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function getCssFile(componentDirName: string): string | null {
  const componentDir = path.join(COMPONENTS_DIR, componentDirName);
  if (!fs.existsSync(componentDir)) return null;

  const cssPath = path.join(componentDir, `${componentDirName}.module.css`);
  return fs.existsSync(cssPath) ? cssPath : null;
}

export function extractComponentStyles(componentDirName: string): string | null {
  const cssFile = getCssFile(componentDirName);
  if (!cssFile) return null;

  try {
    return fs.readFileSync(cssFile, 'utf-8');
  } catch (e) {
    console.warn(`Failed to read CSS for ${componentDirName}:`, e);
    return null;
  }
}

export function extractAllComponentStyles(componentDirNames: string[]): Record<string, string> {
  const result: Record<string, string> = {};

  for (const dirName of componentDirNames) {
    const css = extractComponentStyles(dirName);
    if (css) {
      const kebabId = toKebabCase(dirName);
      result[kebabId] = css;
    }
  }

  return result;
}

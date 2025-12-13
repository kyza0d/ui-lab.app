import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import type { ComponentStyles, StyleVariable, StyleClass } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../../components/src/components');

const CSS_VAR_REGEX = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g;
const CLASS_REGEX = /\.([a-zA-Z][a-zA-Z0-9-_]*)\s*[{,]/g;

function getCssFile(componentId: string): string | null {
  const componentDir = path.join(COMPONENTS_DIR, componentId);
  if (!fs.existsSync(componentDir)) return null;

  const files = fs.readdirSync(componentDir);
  const cssFile = files.find(f => f.endsWith('.module.css') && !f.endsWith('.d.ts'));
  return cssFile ? path.join(componentDir, cssFile) : null;
}

function extractCssVariables(css: string): StyleVariable[] {
  const variables: StyleVariable[] = [];
  const matches = css.matchAll(CSS_VAR_REGEX);

  for (const match of matches) {
    const name = `--${match[1]}`;
    const value = match[2].trim();
    if (!variables.find(v => v.name === name)) {
      variables.push({ name, defaultValue: value });
    }
  }

  return variables;
}

function extractClasses(css: string): StyleClass[] {
  const classes: StyleClass[] = [];
  const seenClasses = new Set<string>();
  const matches = css.matchAll(CLASS_REGEX);

  for (const match of matches) {
    const name = match[1];
    if (!seenClasses.has(name)) {
      seenClasses.add(name);
      classes.push({ name });
    }
  }

  return classes;
}

function inferVariants(classes: StyleClass[]): Record<string, string[]> | undefined {
  const variants: Record<string, string[]> = {};

  const variantPatterns: Record<string, string[]> = {
    variant: ['primary', 'secondary', 'outline', 'ghost', 'destructive', 'link', 'default'],
    size: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    state: ['active', 'disabled', 'loading', 'error', 'success', 'warning'],
  };

  for (const [variantType, possibleValues] of Object.entries(variantPatterns)) {
    const found = classes
      .filter(c => possibleValues.includes(c.name))
      .map(c => c.name);

    if (found.length > 0) {
      variants[variantType] = found;
    }
  }

  return Object.keys(variants).length > 0 ? variants : undefined;
}

function inferSizes(classes: StyleClass[]): string[] | undefined {
  const sizePatterns = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const found = classes
    .filter(c => sizePatterns.includes(c.name))
    .map(c => c.name);

  return found.length > 0 ? found : undefined;
}

export function extractComponentStyles(componentId: string): ComponentStyles | null {
  const cssFile = getCssFile(componentId);
  if (!cssFile) return null;

  try {
    const css = fs.readFileSync(cssFile, 'utf-8');
    const cssVariables = extractCssVariables(css);
    const classes = extractClasses(css);
    const variants = inferVariants(classes);
    const sizes = inferSizes(classes);

    return {
      cssVariables,
      classes,
      variants,
      sizes,
    };
  } catch (e) {
    console.warn(`Failed to parse CSS for ${componentId}:`, e);
    return null;
  }
}

export function extractAllComponentStyles(componentIds: string[]): Record<string, ComponentStyles> {
  const result: Record<string, ComponentStyles> = {};

  for (const id of componentIds) {
    const styles = extractComponentStyles(id);
    if (styles) {
      result[id] = styles;
    }
  }

  return result;
}

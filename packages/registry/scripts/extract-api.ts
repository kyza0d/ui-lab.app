import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { withCustomConfig, type ComponentDoc, type PropItem } from 'react-docgen-typescript';
import type { PropDefinition, ComponentAPI } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.resolve(__dirname, '../../components/src/components');

const parser = withCustomConfig(path.resolve(__dirname, '../../components/tsconfig.json'), {
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

function formatType(type: string): string {
  return type
    .replace(/\s+/g, ' ')
    .replace(/\| undefined/g, '')
    .trim();
}

function extractEnumValues(prop: PropItem): string[] | undefined {
  const typeObj = (prop.type as any);

  // Check if this is an enum type with value array
  if (typeObj.name === 'enum' && Array.isArray(typeObj.value)) {
    return typeObj.value
      .map((item: any) => {
        // Extract the string value and remove surrounding quotes
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

function getComponentFiles(componentId: string): string[] {
  const componentDir = path.join(COMPONENTS_DIR, componentId);
  if (!fs.existsSync(componentDir)) return [];

  const files = fs.readdirSync(componentDir);
  return files
    .filter(f => f.endsWith('.tsx') && !f.endsWith('.test.tsx'))
    .map(f => path.join(componentDir, f));
}

export function extractComponentAPI(componentId: string): ComponentAPI | null {
  const files = getComponentFiles(componentId);
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

  const mainDoc = allDocs[0];
  const mainProps = extractPropsFromDoc(mainDoc);

  const subComponents: Record<string, PropDefinition[]> = {};
  for (let i = 1; i < allDocs.length; i++) {
    const doc = allDocs[i];
    if (doc.displayName && doc.displayName !== mainDoc.displayName) {
      subComponents[doc.displayName] = extractPropsFromDoc(doc);
    }
  }

  return {
    props: mainProps,
    subComponents: Object.keys(subComponents).length > 0 ? subComponents : undefined,
  };
}

export function extractAllComponentAPIs(componentIds: string[]): Record<string, ComponentAPI> {
  const result: Record<string, ComponentAPI> = {};

  for (const id of componentIds) {
    const api = extractComponentAPI(id);
    if (api) {
      result[id] = api;
    }
  }

  return result;
}

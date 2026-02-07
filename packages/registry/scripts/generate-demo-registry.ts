import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sectionsDir = path.join(__dirname, '../src/sections');
const elementsDir = path.join(__dirname, '../src/elements');
const demoRegistryPath = path.join(__dirname, '../src/demo-registry.ts');

interface VariationInfo {
  key: string;
  folderName: string;
  exportName: string;
}

interface SectionInfo {
  id: string;
  folderName: string;
  variations: VariationInfo[];
}

interface ElementInfo {
  id: string;
  importPath: string;
  variations: VariationInfo[];
}

function getAllSections(): SectionInfo[] {
  const sections: SectionInfo[] = [];

  const sectionFolders = fs.readdirSync(sectionsDir).filter(file => {
    const fullPath = path.join(sectionsDir, file);
    return fs.statSync(fullPath).isDirectory() && file[0] === file[0].toUpperCase();
  });

  for (const folderName of sectionFolders) {
    const sectionPath = path.join(sectionsDir, folderName);
    const variationsPath = path.join(sectionPath, 'variations');

    const section: SectionInfo = {
      id: folderName.toLowerCase(),
      folderName,
      variations: [],
    };

    if (fs.existsSync(variationsPath)) {
      const variationFolders = fs.readdirSync(variationsPath)
        .filter(f => /^\d{2}-/.test(f))
        .sort();

      for (const varFolder of variationFolders) {
        const indexPath = path.join(variationsPath, varFolder, 'index.tsx');
        if (fs.existsSync(indexPath)) {
          const content = fs.readFileSync(indexPath, 'utf-8');

          const exportMatch = content.match(/export function (\w+)/);
          if (exportMatch) {
            const exportName = exportMatch[1];
            section.variations.push({
              key: varFolder,
              folderName: varFolder,
              exportName,
            });
          }
        }
      }
    }

    sections.push(section);
  }

  return sections;
}

function getAllElements(): ElementInfo[] {
  const elements: ElementInfo[] = [];

  function discoverInDirectory(dirPath: string, relativePath: string = '') {
    const folders = fs.readdirSync(dirPath).filter(f => {
      const fullPath = path.join(dirPath, f);
      return fs.statSync(fullPath).isDirectory() && !f.startsWith('.');
    });

    for (const folderName of folders) {
      const elementPath = path.join(dirPath, folderName);
      const variationsPath = path.join(elementPath, 'variations');
      const hasVariations = fs.existsSync(variationsPath);
      const fullPath = relativePath ? `${relativePath}/${folderName}` : folderName;

      if (hasVariations) {
        const element: ElementInfo = {
          id: folderName.toLowerCase(),
          importPath: fullPath,
          variations: [],
        };

        const variationFolders = fs.readdirSync(variationsPath)
          .filter(f => /^\d{2}-/.test(f))
          .sort();

        for (const varFolder of variationFolders) {
          const indexPath = path.join(variationsPath, varFolder, 'index.tsx');
          if (fs.existsSync(indexPath)) {
            const content = fs.readFileSync(indexPath, 'utf-8');
            const exportMatch = content.match(/export function (\w+)/);
            if (exportMatch) {
              const exportName = exportMatch[1];
              element.variations.push({
                key: varFolder,
                folderName: varFolder,
                exportName,
              });
            }
          }
        }

        elements.push(element);
      } else {
        discoverInDirectory(elementPath, fullPath);
      }
    }
  }

  discoverInDirectory(elementsDir);
  return elements;
}

function generateDemoRegistryContent(sections: SectionInfo[]): string {
  const elements = getAllElements();
  const elementDemoEntries: string[] = [];

  for (const element of elements) {
    for (const variation of element.variations) {
      const demoPath = `${element.id}-${variation.folderName.split('-').slice(1).join('-')}`;
      elementDemoEntries.push(
        `'${demoPath}': () => dynamic(() => import('./elements/${element.importPath}/variations/${variation.folderName}').then(m => ({ default: m.${variation.exportName} })))`
      );
    }
  }

  const sectionPreviewEntries: string[] = [];

  for (const section of sections) {
    sectionPreviewEntries.push(
      `  ${section.id}: () => dynamic(() => import('./sections/${section.folderName}').then(mod => ({ default: () => mod.getPreview() })))`
    );

    for (const variation of section.variations) {
      const demoPath = `${section.id}-${variation.folderName.split('-').slice(1).join('-')}`;
      sectionPreviewEntries.push(
        `  '${demoPath}': () => dynamic(() => import('./sections/${section.folderName}/variations/${variation.folderName}').then(m => ({ default: m.${variation.exportName} })))`
      );
    }
  }

  return `import dynamic from 'next/dynamic';
import type React from 'react';

export type DemoComponent = React.ComponentType<object>;

// Lazy-loaded element demos - dynamic() called on demand
const elementDemoLoaders: Record<string, () => DemoComponent> = {
  ${elementDemoEntries.join(',\n  ')},
};

// Lazy-loaded section previews - dynamic() called on demand
const sectionPreviewLoaders: Record<string, () => DemoComponent> = {
${sectionPreviewEntries.join(',\n')},
};

// Cached instances
const elementDemoCache = new Map<string, DemoComponent>();
const sectionPreviewCache = new Map<string, DemoComponent>();

// Getter for element demos - lazy-loads and caches
export function getElementDemo(demoPath: string): DemoComponent | null {
  if (!elementDemoLoaders[demoPath]) return null;
  if (!elementDemoCache.has(demoPath)) {
    elementDemoCache.set(demoPath, elementDemoLoaders[demoPath]());
  }
  return elementDemoCache.get(demoPath) || null;
}

// Getter for section previews - lazy-loads and caches
export function getSectionPreview(sectionId: string): DemoComponent | null {
  if (!sectionPreviewLoaders[sectionId]) return null;
  if (!sectionPreviewCache.has(sectionId)) {
    sectionPreviewCache.set(sectionId, sectionPreviewLoaders[sectionId]());
  }
  return sectionPreviewCache.get(sectionId) || null;
}
`;
}

const sections = getAllSections();
const content = generateDemoRegistryContent(sections);

fs.writeFileSync(demoRegistryPath, content, 'utf-8');
console.log(`✓ Generated demo-registry.ts with ${sections.length} sections`);

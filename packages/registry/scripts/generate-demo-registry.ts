import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sectionsDir = path.join(__dirname, '../src/sections');
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

function generateDemoRegistryContent(sections: SectionInfo[]): string {
  const elementDemoEntries: string[] = [
    "'header-basic': dynamic(() => import('./elements/Header/variations/01-basic').then(m => ({ default: m.BasicHeader })))",
    "'page-basic': dynamic(() => import('./elements/Page/variations/01-basic').then(m => ({ default: m.BasicPage })))",
    "'sidebar-basic': dynamic(() => import('./elements/Sidebar/variations/01-basic').then(m => ({ default: m.BasicSidebar })))",
  ];

  const sectionPreviewEntries: string[] = [];

  for (const section of sections) {
    sectionPreviewEntries.push(
      `  ${section.id}: dynamic(() => import('./sections/${section.folderName}').then(mod => ({ default: () => mod.getPreview() })))`
    );

    for (const variation of section.variations) {
      const demoPath = `${section.id}-${variation.folderName.split('-').slice(1).join('-')}`;
      sectionPreviewEntries.push(
        `  '${demoPath}': dynamic(() => import('./sections/${section.folderName}/variations/${variation.folderName}').then(m => ({ default: m.${variation.exportName} })))`
      );
    }
  }

  return `import dynamic from 'next/dynamic';
import type React from 'react';

export type DemoComponent = React.ComponentType<object>;

// Cached element demos - dynamic() called ONCE at module load
export const elementDemoMap: Record<string, DemoComponent> = {
  ${elementDemoEntries.join(',\n  ')},
};

// Cached section previews - dynamic() called ONCE at module load
export const sectionPreviewMap: Record<string, DemoComponent> = {
${sectionPreviewEntries.join(',\n')},
};

// Getter for element demos - returns cached dynamic component
export function getElementDemo(demoPath: string): DemoComponent | null {
  return elementDemoMap[demoPath] || null;
}

// Getter for section previews - returns cached dynamic component
export function getSectionPreview(sectionId: string): DemoComponent | null {
  return sectionPreviewMap[sectionId] || null;
}
`;
}

const sections = getAllSections();
const content = generateDemoRegistryContent(sections);

fs.writeFileSync(demoRegistryPath, content, 'utf-8');
console.log(`✓ Generated demo-registry.ts with ${sections.length} sections`);

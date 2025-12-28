import React from 'react';
import metadata from './metadata.json';
import variationsGenerated from './variations.json';
import type { ElementMetadata, LayoutConfig } from '../../types';
import { BasicSidebar } from './variations/01-basic';
import { SidebarWithContent } from './variations/02-with-content';

function SidebarPreview() {
  return (
    <aside className="h-full w-20 bg-background-800 border-r border-background-700 flex flex-col items-center py-3 gap-2">
      <div className="w-6 h-6 bg-accent-500 rounded flex-shrink-0" />
      <div className="w-3 h-3 bg-background-700 rounded-full" />
      <div className="w-3 h-3 bg-background-700 rounded-full" />
      <div className="w-3 h-3 bg-background-700 rounded-full" />
    </aside>
  );
}

const variationComponentMap = {
  '01-basic': BasicSidebar,
  '02-with-content': SidebarWithContent,
};

const sidebar: ElementMetadata = {
  id: metadata.id,
  name: metadata.name,
  description: metadata.description,
  category: metadata.category as 'layout' | 'form' | 'navigation' | 'content' | 'card' | 'other',
  tags: metadata.tags,
  layout: metadata.layout as Partial<LayoutConfig> | undefined,
  variants: Object.entries(variationsGenerated).map(([key, variation]) => ({
    name: variation.name,
    description: variation.description,
    demoPath: variation.demoPath,
    files: variation.files,
  })),
  componentDependencies: ['react-icons'],
};

export const demoComponents = {
  'sidebar-preview': SidebarPreview,
  ...Object.entries(variationsGenerated).reduce(
    (acc, [key, variation]) => ({
      ...acc,
      [variation.demoPath]: variationComponentMap[key as keyof typeof variationComponentMap],
    }),
    {} as Record<string, React.ComponentType<object>>
  ),
};

export { metadata, BasicSidebar, SidebarWithContent, SidebarPreview };
export default sidebar;

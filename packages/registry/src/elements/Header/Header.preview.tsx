import React from 'react';
import { FaBell, FaGear, FaUser } from 'react-icons/fa6';
import metadata from './metadata.json';
import variationsGenerated from './variations.json';
import type { ElementMetadata, LayoutConfig } from '../../types';
import { BasicHeader } from './variations/01-basic';
import { HeaderWithActions } from './variations/02-with-actions';

function HeaderPreview() {
  return (
    <header className="bg-background-800 border-b border-background-700 w-full">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-6 h-6 bg-accent-500 rounded-md flex-shrink-0" />
          <div className="w-16 h-4 bg-background-700 rounded flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 bg-background-700 rounded flex-shrink-0" />
          <div className="w-8 h-3 bg-background-700 rounded flex-shrink-0" />
          <div className="w-px h-5 bg-background-700" />
          <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors flex-shrink-0">
            <FaBell className="w-4 h-4" />
          </button>
          <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors flex-shrink-0">
            <FaGear className="w-4 h-4" />
          </button>
          <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors flex-shrink-0">
            <FaUser className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

const variationComponentMap = {
  '01-basic': BasicHeader,
  '02-with-actions': HeaderWithActions,
};

const header: ElementMetadata = {
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
  'header-preview': HeaderPreview,
  ...Object.entries(variationsGenerated).reduce(
    (acc, [key, variation]) => ({
      ...acc,
      [variation.demoPath]: variationComponentMap[key as keyof typeof variationComponentMap],
    }),
    {} as Record<string, React.ComponentType<object>>
  ),
};

export { metadata, BasicHeader, HeaderWithActions, HeaderPreview };
export default header;

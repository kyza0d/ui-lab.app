import React from 'react';
import { FaBell, FaGear, FaUser } from 'react-icons/fa6';
import metadata from './metadata.json';
import variationsGenerated from './variations.json';
import type { ElementMetadata } from '../../types';
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

const header: ElementMetadata = {
  id: metadata.id,
  name: metadata.name,
  description: metadata.description,
  category: metadata.category as 'layout' | 'form' | 'navigation' | 'content' | 'card' | 'other',
  tags: metadata.tags,
  variants: [
    {
      name: variationsGenerated['01-basic'].name,
      description: variationsGenerated['01-basic'].description,
      demoPath: variationsGenerated['01-basic'].demoPath,
      files: variationsGenerated['01-basic'].files,
    },
    {
      name: variationsGenerated['02-with-actions'].name,
      description: variationsGenerated['02-with-actions'].description,
      demoPath: variationsGenerated['02-with-actions'].demoPath,
      files: variationsGenerated['02-with-actions'].files,
    },
  ],
  componentDependencies: ['react-icons'],
};

export const demoComponents = {
  'header-preview': HeaderPreview,
  'header-basic': BasicHeader,
  'header-actions': HeaderWithActions,
};

export { metadata, BasicHeader, HeaderWithActions, HeaderPreview };
export default header;

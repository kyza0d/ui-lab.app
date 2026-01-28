import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json';

const baseMetadata = {
  id: 'chat',
  name: 'Chat',
  description: 'Container component for displaying chat conversations with user and AI messages.',
  category: 'content' as const,
  tags: ['chat', 'conversation', 'ai', 'messaging'],
  layout: {
    layoutClass: 'chat',
    columnSpan: 2,
    rowSpan: 3,
  },
  componentDependencies: [],
};

const elementMetadata: ElementMetadata = {
  ...baseMetadata,
  variants: Object.entries(variationsData).map(([_key, variation]: any) => ({
    name: variation.name,
    description: variation.description,
    demoPath: variation.demoPath,
    files: variation.files,
  })),
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex flex-col h-full w-full bg-background-900 rounded-sm border border-background-700 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-3 p-3">
        <div className="flex justify-start">
          <div className="bg-background-700 rounded px-3 py-2 max-w-xs text-xs text-foreground-400">
            Hello, how can I help?
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-accent-500 rounded px-3 py-2 max-w-xs text-xs text-foreground-50">
            I need some assistance
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-background-700 rounded px-3 py-2 max-w-xs text-xs text-foreground-400">
            I'm here to help!
          </div>
        </div>
      </div>
      <div className="border-t border-background-700 p-2 bg-background-800">
        <div className="h-6 bg-background-700 rounded text-xs flex items-center px-2 text-foreground-500">
          Type a message...
        </div>
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicChat } from './variations';
export type { ChatVariations } from './variations';

export { DEMO_MAP, variationComponentMap } from './variations';

import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'aichatinput',
  name: 'AI Chat Input',
  description: 'Specialized input field component for AI chat prompts with suggestions and formatting support.',
  category: 'form' as const,
  tags: ['input', 'chat', 'ai', 'prompt', 'form'],
  layout: {
    layoutClass: 'ai-chat-input',
    columnSpan: 2,
    rowSpan: 1,
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
    <div className="flex items-center gap-2 w-full h-full p-3 bg-background-900 rounded-sm border border-background-700">
      <input
        type="text"
        placeholder="Ask AI..."
        className="flex-1 bg-background-800 border border-background-700 rounded px-2 py-1 text-xs text-foreground-400 placeholder-foreground-500"
        readOnly
      />
      <button className="px-2 py-1 bg-accent-500 text-foreground-50 rounded text-xs font-medium hover:bg-accent-600">
        →
      </button>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicAIChatInput } from './variations/index.js';
export type { AIChatInputVariations } from './variations/index.js';

export { DEMO_MAP, variationComponentMap } from './variations/index.js';

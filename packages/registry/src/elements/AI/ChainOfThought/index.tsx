import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'chainofthought',
  name: 'Chain of Thought',
  description: 'Component displaying step-by-step AI reasoning and thought process with detailed explanations.',
  category: 'content' as const,
  tags: ['reasoning', 'ai', 'thought-process', 'steps', 'explanation'],
  layout: {
    layoutClass: 'chain-of-thought',
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
    <div className="flex flex-col gap-2 w-full h-full p-3 bg-background-900 rounded-sm border border-background-700">
      <div className="space-y-2 text-xs">
        <div className="flex items-start gap-2">
          <span className="text-accent-500 font-bold">1.</span>
          <div className="text-foreground-400">Analyzing the problem</div>
        </div>
        <div className="flex items-start gap-2 ml-2 text-foreground-500">
          <span>→</span>
          <div>Breaking down requirements</div>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-accent-500 font-bold">2.</span>
          <div className="text-foreground-400">Evaluating options</div>
        </div>
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicChainOfThought } from './variations/index.js';
export type { ChainOfThoughtVariations } from './variations/index.js';

export { DEMO_MAP, variationComponentMap } from './variations/index.js';

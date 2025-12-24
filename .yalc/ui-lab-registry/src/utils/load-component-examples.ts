import React from 'react';
import type { SiteComponentExample } from '@/types';

export interface ExampleData {
  id: string;
  Component: React.ComponentType;
  metadata: {
    title: string;
    description: string;
  };
}

export interface ExamplesJsonEntry {
  title: string;
  description: string;
  code: string;
}

/**
 * Loads component examples by merging examplesData with code from examples.json
 *
 * @param examplesData - Array of example data with id, Component, and metadata
 * @param examplesJson - Object with example codes keyed by example id
 * @returns Array of SiteComponentExample objects ready for rendering
 */
export function loadComponentExamples(
  examplesData: ExampleData[],
  examplesJson: Record<string, ExamplesJsonEntry>
): SiteComponentExample[] {
  return examplesData.map((example, index) => {
    const jsonEntry = examplesJson[example.id];
    return {
      id: `example-${index + 1}`,
      title: example.metadata.title,
      description: example.metadata.description,
      code: jsonEntry?.code || '',
      preview: React.createElement(example.Component),
    };
  });
}

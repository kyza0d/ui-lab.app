import React from 'react';
import type { SiteComponentExample } from '@/types';

interface ExampleData {
  id: string;
  Component: React.ComponentType;
  metadata: {
    title: string;
    description: string;
  };
  controls?: SiteComponentExample['controls'];
  renderPreview?: SiteComponentExample['renderPreview'];
  previewLayout?: SiteComponentExample['previewLayout'];
  resizable?: boolean;
}

interface ExamplesJsonEntry {
  title: string;
  description: string;
  code: string;
}

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
      controls: example.controls,
      renderPreview: example.renderPreview,
      previewLayout: example.previewLayout,
      resizable: example.resizable,
    };
  });
}

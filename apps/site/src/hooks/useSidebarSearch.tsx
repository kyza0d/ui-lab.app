import { useMemo } from 'react';
import { getComponentsGroupedByCategory, categoryMap } from '@/lib/component-registry';

export interface SearchResult {
  type: 'component' | 'documentation' | 'customization';
  id: string;
  label: string;
  category: string;
}

const DOCUMENTATION_ITEMS = [
  { id: 'overview', label: 'Overview', section: 'Getting Started' },
  { id: 'installation', label: 'Installation', section: 'Getting Started' },
  { id: 'usage', label: 'Usage', section: 'Getting Started' },
];

const CUSTOMIZATION_ITEMS = [
  { id: 'theming', label: 'Theming', section: 'Customization' },
  { id: 'typography', label: 'Typography', section: 'Customization' },
  { id: 'icons', label: 'Icons', section: 'Customization' },
];

export function useSidebarSearch(query: string) {
  return useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();

    if (!normalizedQuery) {
      return {
        allResults: [],
        docResults: [],
        componentResults: [],
        customizationResults: [],
        resultCounts: {
          documentation: 3,
          components: 22,
          customization: 3,
        },
      };
    }

    const groupedComponents = getComponentsGroupedByCategory();
    const allComponents = Object.values(groupedComponents).flat();

    const componentResults: SearchResult[] = allComponents
      .filter(comp =>
        comp.name.toLowerCase().includes(normalizedQuery) ||
        comp.description.toLowerCase().includes(normalizedQuery)
      )
      .map(comp => ({
        type: 'component' as const,
        id: comp.id,
        label: comp.name,
        category: categoryMap[comp.category].label,
      }));

    const docResults: SearchResult[] = DOCUMENTATION_ITEMS
      .filter(item =>
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.section.toLowerCase().includes(normalizedQuery)
      )
      .map(item => ({
        type: 'documentation' as const,
        id: item.id,
        label: item.label,
        category: item.section,
      }));

    const customizationResults: SearchResult[] = CUSTOMIZATION_ITEMS
      .filter(item =>
        item.label.toLowerCase().includes(normalizedQuery) ||
        item.section.toLowerCase().includes(normalizedQuery)
      )
      .map(item => ({
        type: 'customization' as const,
        id: item.id,
        label: item.label,
        category: item.section,
      }));

    return {
      allResults: [...docResults, ...componentResults, ...customizationResults],
      docResults,
      componentResults,
      customizationResults,
      resultCounts: {
        documentation: docResults.length,
        components: componentResults.length,
        customization: customizationResults.length,
      },
    };
  }, [query]);
}

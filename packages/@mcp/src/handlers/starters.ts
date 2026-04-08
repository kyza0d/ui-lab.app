import { startersAdapter } from '../adapters/starters-adapter.js';
import { registryAdapter } from '../adapters/registry-adapter.js';

export async function handleGetStarter(input: { id: string }): Promise<any> {
  const starter = startersAdapter.getById(input.id);
  if (!starter) {
    throw new Error(
      `Starter not found: "${input.id}". Use search_starters to find available starters.`
    );
  }

  return {
    success: true,
    starter: {
      id: starter.id,
      name: starter.name,
      description: starter.description,
      category: starter.category,
      tags: starter.tags,
      files: starter.files,
      componentDependencies: starter.componentDependencies,
      bundledElements: starter.bundledElements,
    },
    message: `Starter "${starter.name}" includes ${starter.files?.length || 0} files. Use get_component_source to find import paths for individual components.`,
  };
}

export async function handleSearchStarters(input: { query: string }): Promise<any> {
  const results = startersAdapter.search(input.query, 10);
  return {
    success: true,
    starters: results.map((s: any) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      category: s.category,
      tags: s.tags,
    })),
    count: results.length,
    message:
      results.length === 0
        ? `No starters found for "${input.query}". Try: "nextjs", "vite", "astro", "dashboard", or "landing".`
        : `Found ${results.length} starter(s). Use get_starter(id) to see complete setup files and configuration.`,
  };
}

export async function handleGetComponentSource(input: { id: string }): Promise<any> {
  const component = registryAdapter.getComponentById(input.id);
  if (!component) {
    throw new Error(
      `Component not found: "${input.id}". Use search_components to find available components.`
    );
  }

  // Component source info from registry metadata
  const source = component.source || {
    packageName: 'ui-lab-components',
    exportName: input.id.charAt(0).toUpperCase() + input.id.slice(1),
    packagePath: 'ui-lab-components',
  };

  // Determine if likely client or server component
  const clientOnlyPatterns = [
    'button',
    'input',
    'select',
    'checkbox',
    'toggle',
    'dialog',
    'modal',
    'popover',
    'dropdown',
    'menu',
    'tabs',
    'accordion',
    'slider',
    'tooltip',
    'form',
    'date-picker',
    'time-picker',
    'color-picker',
    'file-input',
    'search',
    'pagination',
  ];

  const isLikelyClientComponent = clientOnlyPatterns.some((pattern) =>
    input.id.toLowerCase().includes(pattern)
  );

  return {
    success: true,
    component: {
      id: input.id,
      name: component.name,
      importPath: source.packagePath,
      packageName: source.packageName,
      exportName: source.exportName,
      importStatement: `import { ${source.exportName} } from '${source.packagePath}';`,
      isLikelyClientComponent,
      usage: isLikelyClientComponent
        ? `This is likely a client component. In Next.js, add "use client" at the top of files using this component.`
        : `This component can be used in both server and client contexts.`,
    },
  };
}

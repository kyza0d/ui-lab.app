/**
 * MCP Tools Implementation
 * Defines all agent-callable tools for the MCP server
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { registryAdapter } from './adapters/registry-adapter.js';
import {
  generateImports,
  generateComponentFile,
  validateProps,
} from './utils/code-generator.js';

import type {
  SearchComponentsInput,
  SearchComponentsOutput,
  GetComponentDetailsInput,
  GetComponentDetailsOutput,
  GetComponentApiInput,
  GetComponentApiOutput,
  ResolveDependenciesInput,
  ResolveDependenciesOutput,
  GenerateComponentCodeInput,
  GenerateComponentCodeOutput,
  GetInstallationPlanInput,
  GetInstallationPlanOutput,
  GetComponentExamplesInput,
  GetComponentExamplesOutput,
} from './types.js';

/**
 * Tool: search_components
 * Allows agents to discover components by searching
 */
export const searchComponentsTool: Tool = {
  name: 'search_components',
  description:
    'Search for UI Lab components by name, description, or category. Returns matching components with metadata.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description: 'Search query (component name, description, or keywords)',
      },
      category: {
        type: 'string',
        enum: [
          'input',
          'information',
          'feedback',
          'navigation',
          'container',
          'action',
          'composition',
          'layout',
          'data',
          'experimental',
        ],
        description: 'Optional category filter',
      },
      limit: {
        type: 'number',
        description: 'Maximum number of results (default: 20)',
      },
    },
    required: ['query'],
  },
};

export async function handleSearchComponents(
  input: SearchComponentsInput
): Promise<SearchComponentsOutput> {
  const results = registryAdapter.search(
    input.query,
    input.category as any,
    input.limit || 20
  );

  return {
    components: results,
    count: results.length,
  };
}

/**
 * Tool: get_component_details
 * Returns full component metadata for a specific component
 */
export const getComponentDetailsTool: Tool = {
  name: 'get_component_details',
  description:
    'Get detailed information about a specific component, including its API, category, related components, and accessibility info.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component_id: {
        type: 'string',
        description: 'Component ID (e.g., "button", "input", "menu")',
      },
    },
    required: ['component_id'],
  },
};

export async function handleGetComponentDetails(
  input: GetComponentDetailsInput
): Promise<GetComponentDetailsOutput> {
  const component = registryAdapter.getComponentById(input.component_id);

  if (!component) {
    throw new Error(`Component not found: ${input.component_id}`);
  }

  return component;
}

/**
 * Tool: get_component_api
 * Returns the component API with prop type information
 */
export const getComponentApiTool: Tool = {
  name: 'get_component_api',
  description:
    'Get the API definition for a component, including all props, their types, required flags, and sub-component definitions.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component_id: {
        type: 'string',
        description: 'Component ID (e.g., "button", "input", "menu")',
      },
    },
    required: ['component_id'],
  },
};

export async function handleGetComponentApi(
  input: GetComponentApiInput
): Promise<GetComponentApiOutput> {
  const component = registryAdapter.getComponentById(input.component_id);

  if (!component) {
    throw new Error(`Component not found: ${input.component_id}`);
  }

  if (!component.api) {
    throw new Error(`No API information available for: ${input.component_id}`);
  }

  return component.api;
}

/**
 * Tool: resolve_dependencies
 * Returns npm packages and internal components required for given components
 */
export const resolveDependenciesTool: Tool = {
  name: 'resolve_dependencies',
  description:
    'Resolve all npm packages and internal component dependencies for a list of components. Helps understand what needs to be installed.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component_ids: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of component IDs to resolve dependencies for',
      },
    },
    required: ['component_ids'],
  },
};

export async function handleResolveDependencies(
  input: ResolveDependenciesInput
): Promise<ResolveDependenciesOutput> {
  const npmPackages = new Map<string, { components: Set<string>; version: string }>();
  const internalComponents = new Set<string>();

  // Known npm package versions (from registry)
  const knownVersions: Record<string, string> = {
    'react-aria': '^3.44.0',
    '@floating-ui/react-dom': '^2.1.6',
    clsx: '^2.1.1',
    'class-variance-authority': '^0.7.1',
    'react-stately': '^3.39.0',
    cmdk: '^0.2.0',
    gsap: '^3.12.2',
    '@gsap/react': '^2.1.1',
    'lucide-react': '^0.357.0',
    'react-icons': '^5.0.1',
  };

  // Map component dependencies (from registry or hardcoded)
  const componentDeps: Record<string, { npm: string[]; internal: string[] }> = {
    button: { npm: ['react-aria'], internal: [] },
    input: { npm: ['react-aria'], internal: [] },
    label: { npm: ['react-aria'], internal: [] },
    select: { npm: ['react-aria', '@floating-ui/react-dom'], internal: ['card', 'badge', 'divider'] },
    menu: { npm: ['react-aria', '@floating-ui/react-dom'], internal: ['card', 'badge', 'divider'] },
    popover: { npm: ['react-aria', '@floating-ui/react-dom'], internal: [] },
    tooltip: { npm: ['react-aria', '@floating-ui/react-dom'], internal: [] },
    'command-palette': { npm: ['cmdk', 'react-aria', '@floating-ui/react-dom'], internal: ['card', 'badge', 'divider'] },
    card: { npm: [], internal: [] },
    badge: { npm: [], internal: [] },
    divider: { npm: [], internal: [] },
    tabs: { npm: ['react-aria'], internal: [] },
    dialog: { npm: ['react-aria'], internal: [] },
    form: { npm: ['react-aria'], internal: ['input', 'label', 'button'] },
    grid: { npm: [], internal: [] },
    flex: { npm: [], internal: [] },
    fold: { npm: ['gsap', '@gsap/react'], internal: [] },
  };

  for (const componentId of input.component_ids) {
    const component = registryAdapter.getComponentById(componentId);

    if (!component) {
      continue;
    }

    // Get dependencies for this component
    const deps = componentDeps[componentId] || { npm: [], internal: [] };

    // Add npm packages
    for (const pkg of deps.npm) {
      const version = knownVersions[pkg] || '*';
      const current = npmPackages.get(pkg);

      if (current) {
        current.components.add(componentId);
      } else {
        npmPackages.set(pkg, {
          version,
          components: new Set([componentId]),
        });
      }
    }

    // Add internal components
    for (const internalId of deps.internal) {
      internalComponents.add(internalId);
    }
  }

  return {
    npmPackages: Array.from(npmPackages.entries()).map(([name, data]) => ({
      name,
      version: data.version,
      components: Array.from(data.components),
    })),
    internalComponents: Array.from(internalComponents),
    hasConflicts: false,
    conflicts: [],
  };
}

/**
 * Tool: generate_component_code
 * Generates TSX code for a component
 */
export const generateComponentCodeTool: Tool = {
  name: 'generate_component_code',
  description:
    'Generate working TSX code for a component with proper imports, props, and structure.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component_id: {
        type: 'string',
        description: 'Component ID to generate code for',
      },
      variant: {
        type: 'string',
        description: 'Optional variant (e.g., "primary", "outlined")',
      },
      props: {
        type: 'object',
        description: 'Optional prop values as JSON object',
      },
      children: {
        type: 'string',
        description: 'Optional children content',
      },
    },
    required: ['component_id'],
  },
};

export async function handleGenerateComponentCode(
  input: GenerateComponentCodeInput
): Promise<GenerateComponentCodeOutput> {
  const component = registryAdapter.getComponentById(input.component_id);

  if (!component) {
    throw new Error(`Component not found: ${input.component_id}`);
  }

  // Validate props if API is available
  if (input.props && component.api?.props) {
    const validation = validateProps(input.props, component.api.props);
    if (!validation.valid) {
      throw new Error(
        `Invalid props: ${validation.errors.join('; ')}`
      );
    }
  }

  const imports = generateImports(input.component_id);
  const code = generateComponentFile(
    input.component_id,
    input.variant,
    input.props,
    input.children
  );

  return {
    code,
    imports,
    description: `Generated component code for ${component.name}${input.variant ? ` (${input.variant})` : ''}`,
  };
}

/**
 * Tool: get_installation_plan
 * Returns installation instructions for components
 */
export const getInstallationPlanTool: Tool = {
  name: 'get_installation_plan',
  description:
    'Get installation instructions for one or more components, including npm commands, imports, and setup steps.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component_ids: {
        type: 'array',
        items: { type: 'string' },
        description: 'List of component IDs to create installation plan for',
      },
      project_context: {
        type: 'object',
        description: 'Optional project context (framework, package manager, etc.)',
        properties: {
          framework: { type: 'string' },
          packageManager: { type: 'string' },
        },
      },
    },
    required: ['component_ids'],
  },
};

export async function handleGetInstallationPlan(
  input: GetInstallationPlanInput
): Promise<GetInstallationPlanOutput> {
  // Resolve dependencies
  const deps = await handleResolveDependencies({
    component_ids: input.component_ids,
  });

  // Generate import statements
  const imports = input.component_ids
    .map((id) => `import { ${id.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')} } from '@ui-lab/components'`)
    .filter((v, i, a) => a.indexOf(v) === i);

  // Generate npm install command
  const packageManager = input.project_context?.packageManager || 'npm';
  const npmPackagesList = deps.npmPackages.map((p) => `${p.name}@${p.version}`).join(' ');
  const npmInstallCommand =
    packageManager === 'pnpm'
      ? `pnpm add ${npmPackagesList}`
      : packageManager === 'yarn'
        ? `yarn add ${npmPackagesList}`
        : `npm install ${npmPackagesList}`;

  // Estimate total size (rough estimate)
  const estimatedSize = `${deps.npmPackages.length * 25 + input.component_ids.length * 5} KB`;

  return {
    steps: [
      {
        type: 'npm-install',
        command: npmInstallCommand,
        packages: deps.npmPackages.map((p) => `${p.name}@${p.version}`),
        description: 'Install required npm packages',
      },
      {
        type: 'update-imports',
        imports,
        description: 'Add import statements to your component files',
      },
    ],
    estimatedSize,
    compatibilityNotes: ['Requires React 18+', 'Works with Next.js 13+ and Vite'],
    npmInstallCommand,
    imports,
  };
}

/**
 * Tool: get_component_examples
 * Returns code examples for a component
 */
export const getComponentExamplesTool: Tool = {
  name: 'get_component_examples',
  description:
    'Get code examples and usage patterns for a component, including basic usage and common variants.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component_id: {
        type: 'string',
        description: 'Component ID to get examples for',
      },
      pattern: {
        type: 'string',
        description: 'Optional pattern name (e.g., "basic", "with-icons", "disabled")',
      },
    },
    required: ['component_id'],
  },
};

export async function handleGetComponentExamples(
  input: GetComponentExamplesInput
): Promise<GetComponentExamplesOutput> {
  const component = registryAdapter.getComponentById(input.component_id);

  if (!component) {
    throw new Error(`Component not found: ${input.component_id}`);
  }

  // Generate basic usage
  const basicUsage = generateComponentFile(input.component_id);

  // Generate variant examples based on component type
  const variants: Record<string, string> = {};

  if (component.styles?.variants) {
    for (const variantName of Object.keys(component.styles.variants)) {
      variants[variantName] = generateComponentFile(
        input.component_id,
        variantName
      );
    }
  }

  return {
    basicUsage,
    variants,
    accessibility: `${component.name} supports ${
      component.accessibility?.hasAriaSupport ? 'full ARIA' : 'basic'
    } accessibility with keyboard navigation and focus management.${
      component.accessibility?.notes ? ` Notes: ${component.accessibility.notes.join('; ')}` : ''
    }`,
    description: component.description,
  };
}

/**
 * Export all tools
 */
export const tools = [
  searchComponentsTool,
  getComponentDetailsTool,
  getComponentApiTool,
  resolveDependenciesTool,
  generateComponentCodeTool,
  getInstallationPlanTool,
  getComponentExamplesTool,
];

/**
 * Tool handler dispatch
 */
export async function handleTool(
  toolName: string,
  toolInput: Record<string, unknown>
): Promise<unknown> {
  switch (toolName) {
    case 'search_components':
      return handleSearchComponents(toolInput as unknown as SearchComponentsInput);
    case 'get_component_details':
      return handleGetComponentDetails(toolInput as unknown as GetComponentDetailsInput);
    case 'get_component_api':
      return handleGetComponentApi(toolInput as unknown as GetComponentApiInput);
    case 'resolve_dependencies':
      return handleResolveDependencies(toolInput as unknown as ResolveDependenciesInput);
    case 'generate_component_code':
      return handleGenerateComponentCode(toolInput as unknown as GenerateComponentCodeInput);
    case 'get_installation_plan':
      return handleGetInstallationPlan(toolInput as unknown as GetInstallationPlanInput);
    case 'get_component_examples':
      return handleGetComponentExamples(toolInput as unknown as GetComponentExamplesInput);
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

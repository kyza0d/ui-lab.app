/**
 * MCP Tools - Simplified (5 Core Tools)
 *
 * The refactored MCP provides exactly 5 core tools:
 * 1. get_component(id) - Get component metadata + design guidance
 * 2. get_semantic_color(component, intent) - Get ONE recommended color
 * 3. generate_component(spec) - Generate TSX from spec
 * 4. transform_ui(filePath) - Transform entire UI file
 * 5. get_theme_setup(include_fouc_script) - Get theme system setup instructions
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { registryAdapter } from './adapters/registry-adapter.js';
import { designTokensAdapter } from './adapters/design-tokens-adapter.js';
import { generateComponentCode } from './generation/component-generator.js';
import { formatDesignGuidelines } from './context/design-guidelines.js';
import { transformUIFile } from './orchestrators/ui-transformer.js';

import type {
  ComponentGenerationSpec,
} from './types/index.js';

/**
 * Tool 1: search_components
 * Search for components by natural language query
 * Optimized for agent queries like "input form field" or "button primary action"
 */
export const searchComponentsTool: Tool = {
  name: 'search_components',
  description:
    'Search for UI Lab components using natural language queries. Understands multi-word searches and semantic meaning (e.g., "input form field text" finds Input component). Returns up to 10 matching components ranked by relevance.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'Search query (e.g., "input form field", "button primary action", "form container card"). Use natural language - the search understands keywords and will find relevant components.',
      },
    },
    required: ['query'],
  },
};

/**
 * Tool 1b: get_component
 * Get full component metadata + design guidance
 * Merged from: get_component_details, get_component_examples
 */
export const getComponentTool: Tool = {
  name: 'get_component',
  description:
    'Get complete metadata for a component by ID, including its API, examples, and design guidance. Use after search_components to get detailed information about a specific component.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      id: {
        type: 'string',
        description: 'Component ID (e.g., "button", "input", "card")',
      },
    },
    required: ['id'],
  },
};

export async function handleSearchComponents(input: {
  query: string;
}): Promise<any> {
  const results = registryAdapter.search(input.query, undefined, 10);
  return {
    success: true,
    components: results,
    count: results.length,
    message:
      results.length === 0
        ? `No components found for query "${input.query}". Try broader search terms.`
        : `Found ${results.length} component(s) matching "${input.query}"`,
  };
}

export async function handleGetComponent(input: {
  id: string;
}): Promise<any> {
  const component = registryAdapter.getComponentById(input.id);
  if (!component) {
    throw new Error(`Component not found: ${input.id}`);
  }
  return {
    success: true,
    component,
    designGuidelines: formatDesignGuidelines(),
  };
}

/**
 * Tool 2: get_semantic_color
 * Get ONE recommended color for a component:intent combination
 * No options, no alternatives - just the right choice
 * Merged from: get_color_guidance, validate_color_usage
 */
export const getSemanticColorTool: Tool = {
  name: 'get_semantic_color',
  description:
    'Get the recommended semantic color for a component with a specific intent. Returns ONE choice (not options) with full color pairing info (background, text, border, hover, active, disabled) and WCAG compliance details. Use before generating component code to determine correct colors.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      component: {
        type: 'string',
        description: 'Component ID (e.g., "button", "alert", "badge")',
      },
      semantic_intent: {
        type: 'string',
        description:
          'Semantic intent: "primary", "secondary", "danger", "success", "warning", "info"',
      },
    },
    required: ['component', 'semantic_intent'],
  },
};

export async function handleGetSemanticColor(input: {
  component: string;
  semantic_intent: string;
}): Promise<any> {
  const colorRecommendation = designTokensAdapter.getSemanticColor(input.component, input.semantic_intent);
  return {
    ...colorRecommendation,
    designGuidelines: formatDesignGuidelines(),
  };
}

/**
 * Tool 3: generate_component
 * Generate TSX code from a ComponentGenerationSpec
 * Accepts a specification, returns ready-to-use code
 */
export const generateComponentTool: Tool = {
  name: 'generate_component',
  description:
    'Generate production-ready TSX code from a component specification. Accepts a ComponentGenerationSpec with component ID, variant, props, children, and design tokens. Returns validated code, imports, and detailed validation results. Specification-driven approach ensures modular, isolated, reliable code generation.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      spec: {
        type: 'object',
        description:
          'Component generation spec with component, props, children, and design',
      },
    },
    required: ['spec'],
  },
};

export async function handleGenerateComponent(input: {
  spec: ComponentGenerationSpec;
}): Promise<any> {
  const result = generateComponentCode(input.spec);
  return {
    ...result,
    designGuidelines: formatDesignGuidelines(),
  };
}

/**
 * Tool 4: transform_ui
 * Transform an entire UI file using single-pass orchestration
 * Simplified from: iterate_ui_to_lab_components
 */
export const transformUITool: Tool = {
  name: 'transform_ui',
  description:
    'Transform an entire UI file to use UI Lab components. Single-pass orchestration: analyzes file, maps patterns to components, generates code, validates all in one call. Returns analysis, code, and validation report.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      file_path: {
        type: 'string',
        description: 'Path to the UI file to transform',
      },
      context: {
        type: 'string',
        description: 'Optional context about the file purpose',
      },
    },
    required: ['file_path'],
  },
};

export async function handleTransformUI(input: {
  file_path: string;
  context?: string;
}): Promise<any> {
  const result = await transformUIFile(input.file_path, input.context);
  return {
    ...result,
    designGuidelines: formatDesignGuidelines(),
  };
}

/**
 * Tool 5: get_theme_setup
 * Get complete setup instructions and code for light/dark mode theme system
 * Returns provider setup, toggle component code, and integration guide
 */
export const getThemeSetupTool: Tool = {
  name: 'get_theme_setup',
  description:
    'Get complete setup instructions and code for UI Lab theme system with light/dark mode. Returns provider setup, toggle component code, and integration guide. Includes automatic FOUC prevention, localStorage persistence, and device preference detection.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      include_fouc_script: {
        type: 'boolean',
        description: 'Include FOUC prevention script details in response',
        default: true,
      },
    },
  },
};

export async function handleGetThemeSetup(input: {
  include_fouc_script?: boolean;
}): Promise<any> {
  // Query registry for theme provider metadata
  const themeProvider = registryAdapter.getProviderById('theme');
  if (!themeProvider) {
    throw new Error('Theme provider not found in registry');
  }

  // Build hooks object from registry data
  const hooks: Record<string, any> = {};
  for (const hook of themeProvider.hooks) {
    hooks[hook.name] = {
      import: hook.import,
      description: hook.description,
      signature: hook.signature,
      returns: hook.returns,
    };
  }

  // Build features object from registry data
  const features = themeProvider.features.map((feature: any) => ({
    name: feature.name,
    description: feature.description,
    status: feature.status,
    details: feature.details,
  }));

  return {
    success: true,
    provider: {
      id: themeProvider.id,
      name: themeProvider.name,
      description: themeProvider.description,
      packageName: themeProvider.packageName,
      exportName: themeProvider.exportName,
      version: themeProvider.version,
    },
    setup: {
      provider: {
        import: "import { ThemeProvider } from '@ui/providers'",
        code: `export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}`,
        path: 'app/providers.tsx',
        usage: 'Wrap your entire app root in <Providers>',
        instructions: [
          'Create file: app/providers.tsx',
          'Copy the code above',
          'In app/layout.tsx, import Providers: import { Providers } from "./providers"',
          'Wrap children: <Providers>{children}</Providers>',
        ],
      },
      hooks,
      toggleComponent: {
        import: "import { useTheme } from '@ui/providers'",
        code: `'use client'

import { useTheme } from '@ui/providers'
import { Button } from 'ui-lab-components'

export function ThemeToggle() {
  const { themeMode, toggleThemeMode } = useTheme()

  return (
    <Button
      variant="ghost"
      onPress={toggleThemeMode}
      aria-label="Toggle theme"
    >
      {themeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </Button>
  )
}`,
        path: 'components/theme-toggle.tsx',
        usage: 'Import and place in header/navigation',
      },
      fouc_prevention: input.include_fouc_script
        ? {
            name: 'FOUC Prevention (Flash of Unstyled Content)',
            status: 'Automatic - No setup required',
            details:
              'ThemeProvider automatically injects a blocking script in document.head on mount. This prevents the flash of unstyled content before theme CSS variables are applied.',
            script_location: 'Injected via document.head in <ThemeProvider>',
            initialization_order: [
              '1. Script is injected with ID "theme-provider-script"',
              '2. Script reads localStorage for saved theme',
              '3. Script applies CSS variables immediately',
              '4. Page renders with correct colors (no flash)',
            ],
          }
        : undefined,
      features,
      colorBehavior: {
        title: 'Automatic Color Inversion',
        explanation:
          'All semantic color tokens automatically invert. No dark: prefixes needed.',
        shadeMap: {
          '50': '↔ 950 (lightest ↔ darkest)',
          '100': '↔ 900',
          '200': '↔ 800',
          '300': '↔ 700',
          '400': '↔ 600',
          '500': '↔ 500 (constant)',
        },
        example: {
          code: '<div className="bg-background-900 text-foreground-300">Content</div>',
          darkMode: 'bg-background-900 (very dark), text-foreground-300 (light)',
          lightMode: 'bg-background-100 (very light), text-foreground-700 (dark)',
          result: 'Single code works perfectly in both themes',
        },
      },
      integrationSteps: themeProvider.integrationSteps,
      bestPractices: themeProvider.bestPractices || [],
    },
    designGuidelines: formatDesignGuidelines(),
  };
}

/**
 * Export all tools
 */
export const tools: Tool[] = [
  searchComponentsTool,
  getComponentTool,
  getSemanticColorTool,
  generateComponentTool,
  transformUITool,
  getThemeSetupTool,
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
      return handleSearchComponents(toolInput as any);
    case 'get_component':
      return handleGetComponent(toolInput as any);
    case 'get_semantic_color':
      return handleGetSemanticColor(toolInput as any);
    case 'generate_component':
      return handleGenerateComponent(toolInput as any);
    case 'transform_ui':
      return handleTransformUI(toolInput as any);
    case 'get_theme_setup':
      return handleGetThemeSetup(toolInput as any);
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

/**
 * MCP Tools - Simplified (4 Core Tools)
 *
 * The refactored MCP provides exactly 4 core tools:
 * 1. get_component(id) - Get component metadata + design guidance
 * 2. get_semantic_color(component, intent) - Get ONE recommended color
 * 3. generate_component(spec) - Generate TSX from spec
 * 4. transform_ui(filePath) - Transform entire UI file
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { registryAdapter } from './adapters/registry-adapter.js';
import { designTokensAdapter } from './adapters/design-tokens-adapter.js';
import { generateComponentCode } from './generation/component-generator.js';
import { formatDesignGuidelines } from './context/design-guidelines.js';

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

export async function handleTransformUI(_input: {
  file_path: string;
  context?: string;
}): Promise<any> {
  // TODO: Implement single-pass orchestrator
  return {
    success: false,
    message: 'Transform UI not yet implemented',
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
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

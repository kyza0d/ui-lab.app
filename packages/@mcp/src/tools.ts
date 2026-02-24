import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { registryAdapter } from './adapters/registry-adapter.js';
import { designTokensAdapter } from './adapters/design-tokens-adapter.js';
import { patternsAdapter } from './adapters/patterns-adapter.js';
import { packagesAdapter } from './adapters/packages-adapter.js';
import { sectionsAdapter } from './adapters/sections-adapter.js';
import { searchInspirations, getVariationCode } from './adapters/inspiration-adapter.js';
import { formatDesignGuidelines } from './context/design-guidelines.js';

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
      detail: {
        type: 'string',
        enum: ['api', 'examples', 'full'],
        description:
          '"api" = props+subComponents only (no examples, no design guidelines — use when writing code). "examples" = description+examples only. "full" = complete response with design guidelines (default).',
        default: 'full',
      },
    },
    required: ['id'],
  },
};

export async function handleSearchComponents(input: { query: string }): Promise<any> {
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

export async function handleGetComponent(input: { id: string; detail?: 'api' | 'examples' | 'full' }): Promise<any> {
  const component = registryAdapter.getComponentById(input.id);
  if (!component) {
    throw new Error(`Component not found: ${input.id}`);
  }

  const detail = input.detail ?? 'full';

  if (detail === 'api') {
    return {
      success: true,
      component: {
        id: component.id,
        name: component.name,
        api: component.api
          ? { props: component.api.props, subComponents: component.api.subComponents }
          : undefined,
      },
    };
  }

  if (detail === 'examples') {
    return {
      success: true,
      component: {
        id: component.id,
        name: component.name,
        description: component.description,
        api: component.api ? { examples: component.api.examples } : undefined,
      },
    };
  }

  return {
    success: true,
    component,
    designGuidelines: formatDesignGuidelines(),
  };
}

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

export async function handleGetThemeSetup(input: { include_fouc_script?: boolean }): Promise<any> {
  const themeProvider = registryAdapter.getProviderById('theme');
  if (!themeProvider) {
    throw new Error('Theme provider not found in registry');
  }

  const hooks: Record<string, any> = {};
  for (const hook of themeProvider.hooks) {
    hooks[hook.name] = {
      import: hook.import,
      description: hook.description,
      signature: hook.signature,
      returns: hook.returns,
    };
  }

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
          lightMode: 'bg-background-100 (very light), text-foreground-400 (medium)',
          result: 'Single code works perfectly in both themes',
        },
      },
      integrationSteps: themeProvider.integrationSteps,
      bestPractices: themeProvider.bestPractices || [],
    },
    designGuidelines: formatDesignGuidelines(),
  };
}

export const searchPatternsTool: Tool = {
  name: 'search_patterns',
  description:
    'Search for UI Lab design patterns by use case or intent. Returns patterns with working code examples that use correct design tokens and compound components. Use this before building from scratch to find an existing pattern foundation.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'Search query describing what you want to build (e.g., "delete confirmation", "settings form", "empty state", "pricing cards", "auth login")',
      },
    },
    required: ['query'],
  },
};

export const getPatternTool: Tool = {
  name: 'get_pattern',
  description:
    'Get a specific design pattern by ID, including its working TSX code and design notes explaining why each token and component choice was made. Use after search_patterns to get the full pattern implementation.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      id: {
        type: 'string',
        description:
          'Pattern ID (e.g., "auth-form", "destructive-confirm", "empty-state", "status-list-item", "settings-form-layout")',
      },
    },
    required: ['id'],
  },
};

export async function handleSearchPatterns(input: { query: string }): Promise<any> {
  const results = patternsAdapter.search(input.query);
  return {
    success: true,
    patterns: results.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      complexity: p.complexity,
      tags: p.tags,
      hasCode: !!p.code,
    })),
    count: results.length,
    message:
      results.length === 0
        ? `No patterns found for "${input.query}". Try: "form", "modal", "empty state", "auth", "list", "grid", "header", "pricing".`
        : `Found ${results.length} pattern(s). Use get_pattern(id) to get the full code for a match.`,
  };
}

export async function handleGetPattern(input: { id: string }): Promise<any> {
  const pattern = patternsAdapter.getById(input.id);
  if (!pattern) {
    throw new Error(`Pattern not found: "${input.id}". Use search_patterns to find valid IDs.`);
  }
  return {
    success: true,
    pattern,
    designGuidelines: formatDesignGuidelines(),
  };
}

export const searchElementsTool: Tool = {
  name: 'search_elements',
  description:
    'Search for UI Lab elements by use case or intent. Elements are pre-built, multi-component UI blocks (e.g., Chat interface, AIChatInput, TOC, Sidebar). Use before building complex UI to find a ready-made element foundation.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'Search query describing the UI block you want (e.g., "chat interface", "sidebar navigation", "table of contents", "AI input")',
      },
    },
    required: ['query'],
  },
};

export const getElementTool: Tool = {
  name: 'get_element',
  description:
    'Get a specific UI Lab element by ID, including its variations, files, and design notes. Use after search_elements to get the full element structure.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      id: {
        type: 'string',
        description: 'Element ID (e.g., "chat", "sidebar", "toc", "aichatinput")',
      },
    },
    required: ['id'],
  },
};

export async function handleSearchElements(input: { query: string }): Promise<any> {
  const results = packagesAdapter.search(input.query, 10);
  return {
    success: true,
    elements: results.map((e: any) => ({
      id: e.id,
      name: e.name,
      description: e.description,
      category: e.category,
      tags: e.tags,
      packageId: e.packageId,
    })),
    count: results.length,
    message:
      results.length === 0
        ? `No elements found for "${input.query}". Try: "chat", "sidebar", "toc", "AI input", "header", "page".`
        : `Found ${results.length} element(s). Use get_element(id) to get the full structure and variations.`,
  };
}

export async function handleGetElement(input: { id: string }): Promise<any> {
  const element = packagesAdapter.getById(input.id);
  if (!element) {
    throw new Error(`Element not found: "${input.id}". Use search_elements to find valid IDs.`);
  }
  return {
    success: true,
    element,
  };
}

export const searchSectionsTool: Tool = {
  name: 'search_sections',
  description:
    'Search for UI Lab page sections by intent. Sections are full-width landing page blocks (Hero, Features, CTA, Pricing, Testimonials). Use when building marketing pages or landing pages.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'Search query describing the page section (e.g., "hero", "pricing cards", "feature grid", "testimonials", "call to action")',
      },
    },
    required: ['query'],
  },
};

export const getSectionTool: Tool = {
  name: 'get_section',
  description:
    'Get a specific UI Lab section by ID, including its variations and design notes.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      id: {
        type: 'string',
        description: 'Section ID (e.g., "hero", "features", "cta", "pricing", "testimonials")',
      },
    },
    required: ['id'],
  },
};

export async function handleSearchSections(input: { query: string }): Promise<any> {
  const results = sectionsAdapter.search(input.query, 10);
  return {
    success: true,
    sections: results.map((s: any) => ({
      id: s.id,
      name: s.name,
      description: s.description,
      category: s.category,
      tags: s.tags,
    })),
    count: results.length,
    message:
      results.length === 0
        ? `No sections found for "${input.query}". Try: "hero", "features", "pricing", "cta", "testimonials".`
        : `Found ${results.length} section(s). Use get_section(id) to get the full variations.`,
  };
}

export async function handleGetSection(input: { id: string }): Promise<any> {
  const section = sectionsAdapter.getById(input.id);
  if (!section) {
    throw new Error(`Section not found: "${input.id}". Use search_sections to find valid IDs.`);
  }
  return {
    success: true,
    section,
  };
}

export const getInspirationTool: Tool = {
  name: 'get_inspiration',
  description:
    'Discover relevant Elements, Sections, and Patterns from the UI Lab registry. Returns lightweight metadata (purpose, tags, structure hints) for design reasoning—no full source code. Use during ideation to find existing patterns that match your design needs.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'Search query describing what you want to build or discover (e.g., "file list", "auth form", "empty state", "hero landing", "sidebar navigation"). Supports fuzzy matching across IDs, descriptions, and tags.',
      },
      category: {
        type: 'string',
        enum: ['elements', 'sections', 'patterns', 'all'],
        description:
          '"elements" = multi-component UI blocks (Chat, Sidebar, TOC), "sections" = full-width landing blocks (Hero, Pricing, Features), "patterns" = reusable atomic patterns (media-object, empty-state), "all" = search everything (default)',
        default: 'all',
      },
      limit: {
        type: 'number',
        description: 'Maximum results to return (default: 10)',
        default: 10,
      },
    },
    required: ['query'],
  },
};

export async function handleGetInspiration(input: {
  query: string;
  category?: 'elements' | 'sections' | 'patterns' | 'all';
  limit?: number;
}): Promise<any> {
  const result = searchInspirations(input.query, input.category, input.limit ?? 10);
  return {
    success: true,
    ...result,
    message:
      result.totalMatches === 0
        ? `No inspiration found for "${input.query}". Try: "list", "form", "hero", "empty state", "sidebar", "chat", "pricing".`
        : `Found ${result.totalMatches} result(s) for "${input.query}". Each includes purpose, codeStructureHint, and tags for design reasoning.`,
  };
}

export const getVariationCodeTool: Tool = {
  name: 'get_variation_code',
  description:
    'Fetch the source code for a specific variation of an Element, Section, or Pattern discovered via get_inspiration. Returns only the requested variation—no other variations, no full metadata. Use this to drill into a specific implementation without polluting context.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      type: {
        type: 'string',
        enum: ['element', 'section', 'pattern'],
        description: 'The type of item to fetch code for',
      },
      id: {
        type: 'string',
        description: 'The item ID from get_inspiration results (e.g., "chat", "hero", "media-object")',
      },
      variation: {
        type: 'string',
        description:
          'Which variation to fetch. Accepts: 1-based index ("1", "2", "3"), variation name substring ("filter toolbar", "with actions"), demoPath ("chat-basic"), or pattern variation ID ("media-object-sm"). Omit to get the first/main variation.',
      },
    },
    required: ['type', 'id'],
  },
};

export async function handleGetVariationCode(input: {
  type: 'element' | 'section' | 'pattern';
  id: string;
  variation?: string;
}): Promise<any> {
  const result = getVariationCode(input.type, input.id, input.variation);
  if (!result) {
    const hint = input.variation
      ? `Variation "${input.variation}" not found in ${input.type} "${input.id}". Use get_inspiration to see variationsSummary for valid identifiers.`
      : `${input.type} "${input.id}" not found. Use get_inspiration to discover valid IDs.`;
    return { success: false, message: hint };
  }
  return { success: true, ...result };
}

export const tools: Tool[] = [
  searchComponentsTool,
  getComponentTool,
  getSemanticColorTool,
  getThemeSetupTool,
  searchPatternsTool,
  getPatternTool,
  searchElementsTool,
  getElementTool,
  searchSectionsTool,
  getSectionTool,
  getInspirationTool,
  getVariationCodeTool,
];

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
    case 'get_theme_setup':
      return handleGetThemeSetup(toolInput as any);
    case 'search_patterns':
      return handleSearchPatterns(toolInput as any);
    case 'get_pattern':
      return handleGetPattern(toolInput as any);
    case 'search_elements':
      return handleSearchElements(toolInput as any);
    case 'get_element':
      return handleGetElement(toolInput as any);
    case 'search_sections':
      return handleSearchSections(toolInput as any);
    case 'get_section':
      return handleGetSection(toolInput as any);
    case 'get_inspiration':
      return handleGetInspiration(toolInput as any);
    case 'get_variation_code':
      return handleGetVariationCode(toolInput as any);
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

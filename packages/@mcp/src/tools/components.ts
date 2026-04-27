import { Tool } from '@modelcontextprotocol/sdk/types.js';

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
        enum: ['api', 'examples', 'usage', 'full'],
        description:
          '"api" = props+subComponents only. "examples" = description+examples only. "usage" = composition guidance, when-to-use, and anti-patterns. "full" = complete response with design guidance (default).',
        default: 'full',
      },
    },
    required: ['id'],
  },
};

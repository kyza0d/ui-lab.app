import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const getStarterTool: Tool = {
  name: 'get_starter',
  description:
    'Get a complete starter template for a framework. Starters include all files, dependencies, and configuration needed to begin a new UI Lab project. Use get_starters first to find available starters.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      id: {
        type: 'string',
        description: 'Starter ID (e.g., "nextjs", "vite", "astro"). Use get_starters to see available options.',
      },
    },
    required: ['id'],
  },
};

export const searchStartersTool: Tool = {
  name: 'search_starters',
  description:
    'Search for project starters by framework or category. Returns available templates for setting up new UI Lab projects with different frameworks (Next.js, Vite, Astro, etc).',
  inputSchema: {
    type: 'object' as const,
    properties: {
      query: {
        type: 'string',
        description:
          'Search query (e.g., "nextjs setup", "vite starter", "dashboard template"). Can be framework name or project type.',
      },
    },
    required: ['query'],
  },
};

export const getComponentSourceTool: Tool = {
  name: 'get_component_source',
  description:
    'Get import path and source information for a component. Returns where to import the component from and whether it\'s a client or server component.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      id: {
        type: 'string',
        description: 'Component ID (e.g., "button", "input")',
      },
    },
    required: ['id'],
  },
};

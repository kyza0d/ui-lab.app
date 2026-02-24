/**
 * MCP Server Implementation
 * Implements the Model Context Protocol for UI Lab
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError,
  Resource,
  TextResourceContents,
} from '@modelcontextprotocol/sdk/types.js';

import { tools, handleTool } from './tools.js';
import { registryAdapter } from './adapters/registry-adapter.js';
import { patternsAdapter } from './adapters/patterns-adapter.js';
import { packagesAdapter } from './adapters/packages-adapter.js';
import { sectionsAdapter } from './adapters/sections-adapter.js';

/**
 * Create and configure the MCP server
 */
export async function createServer(): Promise<Server> {
  const server = new Server(
    {
      name: 'ui-lab-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  /**
   * Handle ListTools requests
   * Returns the list of available tools
   */
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools,
    };
  });

  /**
   * Handle CallTool requests
   * Executes a tool and returns results
   */
  server.setRequestHandler(CallToolRequestSchema, async (request: { params: { name: string; arguments?: Record<string, unknown> } }) => {
    const { name, arguments: args = {} } = request.params;

    try {
      const result = await handleTool(name, args as Record<string, unknown>);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new McpError(ErrorCode.InternalError, errorMessage);
    }
  });

  /**
   * Handle ListResources requests
   * Returns the list of available components as resources
   */
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const componentIds = registryAdapter.getAllComponentIds();
    const componentResources: Resource[] = componentIds.map((id: string) => {
      const component = registryAdapter.getComponentById(id);
      return {
        uri: `component://${id}`,
        name: component?.name || id,
        description: component?.description || `UI Lab ${id} component`,
        mimeType: 'application/json',
      };
    });

    const patternResources: Resource[] = patternsAdapter.getAll().map((p: any) => ({
      uri: `pattern://${p.id}`,
      name: p.name,
      description: p.description || `UI Lab ${p.id} pattern`,
      mimeType: 'application/json',
    }));

    const elementResources: Resource[] = packagesAdapter.search('', 100).map((e: any) => ({
      uri: `element://${e.id}`,
      name: e.name,
      description: e.description || `UI Lab ${e.id} element`,
      mimeType: 'application/json',
    }));

    const sectionResources: Resource[] = sectionsAdapter.getAll().map((s: any) => ({
      uri: `section://${s.id}`,
      name: s.name,
      description: s.description || `UI Lab ${s.id} section`,
      mimeType: 'application/json',
    }));

    return {
      resources: [...componentResources, ...patternResources, ...elementResources, ...sectionResources],
    };
  });

  /**
   * Handle ReadResource requests
   * Returns resource details for component://, pattern://, element://, section:// URIs
   */
  server.setRequestHandler(ReadResourceRequestSchema, async (request: { params: { uri: string } }) => {
    const uri = request.params.uri;

    const componentMatch = uri.match(/^component:\/\/(.+)$/);
    if (componentMatch) {
      const component = registryAdapter.getComponentById(componentMatch[1]);
      if (!component) {
        throw new McpError(ErrorCode.InvalidRequest, `Component not found: ${componentMatch[1]}`);
      }
      return { contents: [{ uri, text: JSON.stringify(component, null, 2), mimeType: 'application/json' } as TextResourceContents] };
    }

    const patternMatch = uri.match(/^pattern:\/\/(.+)$/);
    if (patternMatch) {
      const pattern = patternsAdapter.getById(patternMatch[1]);
      if (!pattern) {
        throw new McpError(ErrorCode.InvalidRequest, `Pattern not found: ${patternMatch[1]}`);
      }
      return { contents: [{ uri, text: JSON.stringify(pattern, null, 2), mimeType: 'application/json' } as TextResourceContents] };
    }

    const elementMatch = uri.match(/^element:\/\/(.+)$/);
    if (elementMatch) {
      const element = packagesAdapter.getById(elementMatch[1]);
      if (!element) {
        throw new McpError(ErrorCode.InvalidRequest, `Element not found: ${elementMatch[1]}`);
      }
      return { contents: [{ uri, text: JSON.stringify(element, null, 2), mimeType: 'application/json' } as TextResourceContents] };
    }

    const sectionMatch = uri.match(/^section:\/\/(.+)$/);
    if (sectionMatch) {
      const section = sectionsAdapter.getById(sectionMatch[1]);
      if (!section) {
        throw new McpError(ErrorCode.InvalidRequest, `Section not found: ${sectionMatch[1]}`);
      }
      return { contents: [{ uri, text: JSON.stringify(section, null, 2), mimeType: 'application/json' } as TextResourceContents] };
    }

    throw new McpError(ErrorCode.InvalidRequest, `Invalid resource URI: ${uri}`);
  });

  return server;
}

/**
 * Start the MCP server with stdio transport
 */
export async function startServer(): Promise<void> {
  const server = await createServer();
  const transport = new StdioServerTransport();

  await server.connect(transport);

  console.error('[UI Lab MCP] Server started successfully');
  console.error('[UI Lab MCP] Listening for connections...');
}

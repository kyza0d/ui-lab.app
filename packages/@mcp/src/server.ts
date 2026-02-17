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
    const resources: Resource[] = componentIds.map((id: string) => {
      const component = registryAdapter.getComponentById(id);
      return {
        uri: `component://${id}`,
        name: component?.name || id,
        description: component?.description || `UI Lab ${id} component`,
        mimeType: 'application/json',
      };
    });

    return {
      resources,
    };
  });

  /**
   * Handle ReadResource requests
   * Returns component details for a specific resource
   */
  server.setRequestHandler(ReadResourceRequestSchema, async (request: { params: { uri: string } }) => {
    const uri = request.params.uri;

    // Parse component://component-id format
    const match = uri.match(/^component:\/\/(.+)$/);
    if (!match) {
      throw new McpError(ErrorCode.InvalidRequest, `Invalid resource URI: ${uri}`);
    }

    const componentId = match[1];
    const component = registryAdapter.getComponentById(componentId);

    if (!component) {
      throw new McpError(ErrorCode.InvalidRequest, `Component not found: ${componentId}`);
    }

    const contents: TextResourceContents = {
      uri,
      text: JSON.stringify(component, null, 2),
      mimeType: 'application/json',
    };

    return {
      contents: [contents],
    };
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

/**
 * MCP Server Implementation
 * Implements the Model Context Protocol for UI Lab
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';

import { tools, handleTool } from './tools.js';

/**
 * Design System Context Integration
 *
 * The design system context is available to agents through:
 * 1. Agent system prompt: Use getAgentSystemPrompt() from context/agent-system-prompt.ts
 *    - Includes comprehensive design token guidelines with examples
 *    - Includes design-guidelines.ts with MANDATORY color rules and prohibitions
 * 2. Tool responses: Every tool response includes formatDesignGuidelines()
 *    - get_component(), get_semantic_color(), generate_component() all include guidelines
 *    - Ensures agents see guidelines regardless of how they use tools
 * 3. Design tokens: getSemanticColor() provides color family metadata with CSS variables
 *
 * Agents should use getAgentSystemPrompt() to receive complete design system guidelines
 * at initialization time, ensuring consistent semantic color usage throughout generation.
 *
 * MANDATORY DESIGN RULES (Non-negotiable):
 * - ONLY use Tailwind design token classes: bg-family-shade, text-family-shade, border-family-shade
 * - NEVER use arbitrary Tailwind colors: white, zinc-*, red-*, slate-*, gray-*, etc.
 * - NEVER use gradients or shadows
 * - Background colors: ONLY use bg-background-600 to bg-background-950 (600=lightest, 950=darkest)
 * - Text/border colors: ONLY use text-foreground-50 to text-foreground-600 (50=lightest, 600=darkest)
 * - Semantic colors: ONLY use 50-950 range for accent, success, danger, warning, info
 */

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

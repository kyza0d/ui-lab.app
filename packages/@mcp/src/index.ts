#!/usr/bin/env node

/**
 * UI Lab MCP Server
 * Entry point for the MCP server
 */

import { startServer } from './server.js';

/**
 * Start the server and handle errors
 */
startServer().catch((error) => {
  console.error('[UI Lab MCP] Fatal error:', error);
  process.exit(1);
});

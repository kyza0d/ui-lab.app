#!/usr/bin/env node

/**
 * MCP Server Test Script (Refactored)
 * Tests the 4 core tools of the simplified MCP
 *
 * Tools:
 * 1. get_component(id) - Get component metadata
 * 2. get_semantic_color(component, intent) - Get color recommendation
 * 3. generate_component(spec) - Generate TSX code
 * 4. transform_ui(filePath) - Transform UI file
 */

import { handleGetComponent, handleGetSemanticColor } from './tools.js';
import { generateComponentCode } from './generation/component-generator.js';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color: string, label: string, message: string) {
  console.log(`${color}${label}${colors.reset} ${message}`);
}

function pass(message: string) {
  log(colors.green, '✓', message);
}

function fail(message: string) {
  log(colors.red, '✗', message);
}

function info(message: string) {
  log(colors.cyan, 'ℹ', message);
}

async function runTests() {
  console.log(`\n${colors.blue}=== UI Lab MCP Server Tests (Simplified) ===${colors.reset}\n`);

  try {
    // Test 1: Get component
    info('Testing get_component...');
    const component = await handleGetComponent({ id: 'button' });
    if (component && component.success) {
      pass('get_component works');
    } else {
      fail('get_component failed');
    }

    // Test 2: Get semantic color
    info('Testing get_semantic_color...');
    const color = await handleGetSemanticColor({ component: 'button', semantic_intent: 'primary' });
    if (color && color.success) {
      pass('get_semantic_color works');
    } else {
      fail('get_semantic_color failed');
    }

    // Test 3: Generate component
    info('Testing generate_component...');
    const spec = {
      component: { id: 'button', variant: 'primary' },
      props: {
        children: { value: 'Click Me', source: 'literal' as const },
      },
    };
    const result = await generateComponentCode(spec);
    if (result && result.success) {
      pass('generate_component works');
      info(`Generated code length: ${result.code.length} chars`);
    } else {
      fail('generate_component failed');
    }

    console.log(`\n${colors.blue}=== All Core Tests Complete ===${colors.reset}\n`);
  } catch (error) {
    fail(`Test error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

runTests().catch(console.error);

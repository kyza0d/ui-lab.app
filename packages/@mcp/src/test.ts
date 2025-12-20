#!/usr/bin/env node

/**
 * MCP Server Test Script
 * Tests core functionality of the MCP server
 */

import { registryAdapter } from './adapters/registry-adapter.js';
import {
  handleSearchComponents,
  handleGetComponentDetails,
  handleGetComponentApi,
  handleResolveDependencies,
  handleGenerateComponentCode,
  handleGetInstallationPlan,
  handleGetComponentExamples,
} from './tools.js';

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
  console.log(`\n${colors.blue}=== UI Lab MCP Server Tests ===${colors.reset}\n`);

  let passed = 0;
  let failed = 0;

  // Test 1: Registry Adapter - Get all components
  try {
    info('Test 1: Registry Adapter - Listing all components');
    const componentIds = registryAdapter.getAllComponentIds();
    if (componentIds.length > 0) {
      pass(`Found ${componentIds.length} components`);
      passed++;
    } else {
      fail('No components found in registry');
      failed++;
    }
  } catch (error) {
    fail(`Registry adapter failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Test 2: Registry Adapter - Get specific component
  try {
    info('Test 2: Registry Adapter - Getting button component');
    const button = registryAdapter.getComponentById('button');
    if (button && button.name === 'Button') {
      pass(`Button component found: ${button.description}`);
      passed++;
    } else {
      fail('Button component not found or invalid');
      failed++;
    }
  } catch (error) {
    fail(`Get component failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Test 3: Search Components Tool
  try {
    info('Test 3: search_components tool - Searching for "button"');
    const results = await handleSearchComponents({
      query: 'button',
      limit: 10,
    });
    if (results.components.length > 0) {
      pass(`Found ${results.components.length} components matching "button"`);
      results.components.slice(0, 2).forEach((c) => {
        console.log(`   - ${c.name}: ${c.description}`);
      });
      passed++;
    } else {
      fail('No components found for "button" search');
      failed++;
    }
  } catch (error) {
    fail(`search_components failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Test 4: Get Component Details Tool
  try {
    info('Test 4: get_component_details tool - Getting button details');
    const details = await handleGetComponentDetails({ component_id: 'button' });
    if (details && details.name === 'Button') {
      pass(`Button details retrieved`);
      console.log(`   - Category: ${details.category}`);
      console.log(`   - Description: ${details.description}`);
      if (details.api?.props) {
        console.log(`   - Props: ${details.api.props.length} defined`);
      }
      passed++;
    } else {
      fail('Invalid button details');
      failed++;
    }
  } catch (error) {
    fail(`get_component_details failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Test 5: Get Component API Tool
  try {
    info('Test 5: get_component_api tool - Getting button API');
    const api = await handleGetComponentApi({ component_id: 'button' });
    if (api && api.props) {
      pass(`Button API retrieved with ${api.props.length} props`);
      api.props.slice(0, 3).forEach((p) => {
        console.log(`   - ${p.name} (${p.type}) ${p.required ? '[required]' : '[optional]'}`);
      });
      passed++;
    } else {
      fail('Invalid button API');
      failed++;
    }
  } catch (error) {
    fail(`get_component_api failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Test 6: Resolve Dependencies Tool
  try {
    info('Test 6: resolve_dependencies tool - Resolving menu dependencies');
    const deps = await handleResolveDependencies({
      component_ids: ['menu', 'tooltip'],
    });
    if (deps.npmPackages.length > 0) {
      pass(`Resolved dependencies for menu and tooltip`);
      console.log(`   - NPM packages: ${deps.npmPackages.length}`);
      deps.npmPackages.forEach((p) => {
        console.log(`     • ${p.name}@${p.version}`);
      });
      passed++;
    } else {
      fail('No dependencies resolved');
      failed++;
    }
  } catch (error) {
    fail(`resolve_dependencies failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Test 7: Generate Component Code Tool
  try {
    info('Test 7: generate_component_code tool - Generating button code');
    const code = await handleGenerateComponentCode({
      component_id: 'button',
      variant: 'primary',
      props: { disabled: false },
      children: 'Click me',
    });
    if (code.code && code.imports.length > 0) {
      pass(`Generated button code`);
      console.log(`   - Imports: ${code.imports.length}`);
      console.log(`   - Code preview: ${code.code.substring(0, 60)}...`);
      passed++;
    } else {
      fail('Invalid generated code');
      failed++;
    }
  } catch (error) {
    fail(`generate_component_code failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Test 8: Get Installation Plan Tool
  try {
    info('Test 8: get_installation_plan tool - Planning installation');
    const plan = await handleGetInstallationPlan({
      component_ids: ['button', 'input'],
    });
    if (plan.npmInstallCommand && plan.imports.length > 0) {
      pass(`Installation plan created`);
      console.log(`   - Command: ${plan.npmInstallCommand}`);
      console.log(`   - Imports: ${plan.imports.length}`);
      console.log(`   - Estimated size: ${plan.estimatedSize}`);
      passed++;
    } else {
      fail('Invalid installation plan');
      failed++;
    }
  } catch (error) {
    fail(`get_installation_plan failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Test 9: Get Component Examples Tool
  try {
    info('Test 9: get_component_examples tool - Getting button examples');
    const examples = await handleGetComponentExamples({
      component_id: 'button',
    });
    if (examples.basicUsage && examples.accessibility) {
      pass(`Button examples retrieved`);
      console.log(`   - Basic usage: ${examples.basicUsage.substring(0, 50)}...`);
      console.log(`   - Accessibility: ${examples.accessibility.substring(0, 60)}...`);
      if (examples.variants) {
        console.log(`   - Variants: ${Object.keys(examples.variants).length}`);
      }
      passed++;
    } else {
      fail('Invalid examples');
      failed++;
    }
  } catch (error) {
    fail(`get_component_examples failed: ${error instanceof Error ? error.message : 'unknown error'}`);
    failed++;
  }

  // Summary
  console.log(`\n${colors.blue}=== Test Results ===${colors.reset}`);
  console.log(
    `${colors.green}✓ Passed: ${passed}${colors.reset} | ${colors.red}✗ Failed: ${failed}${colors.reset}`
  );
  console.log(`${colors.cyan}Total: ${passed + failed}${colors.reset}\n`);

  if (failed === 0) {
    pass('All tests passed! MCP server is ready.');
    process.exit(0);
  } else {
    fail(`${failed} test(s) failed`);
    process.exit(1);
  }
}

runTests().catch((error) => {
  fail(`Fatal error: ${error instanceof Error ? error.message : 'unknown error'}`);
  process.exit(1);
});

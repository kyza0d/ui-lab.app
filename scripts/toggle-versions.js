#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// Configuration
const PACKAGES = {
  'ui-lab-registry': path.join(rootDir, 'packages/registry/package.json'),
  'ui-lab-components': path.join(rootDir, 'packages/components/package.json'),
};

const TARGET_FILES = [
  path.join(rootDir, 'package.json'),
  path.join(rootDir, 'apps/site/package.json'),
  path.join(rootDir, 'packages/registry/package.json'),
];

function readPackageJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writePackageJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

function getPackageVersions() {
  const versions = {};
  for (const [name, filePath] of Object.entries(PACKAGES)) {
    const pkg = readPackageJson(filePath);
    versions[name] = pkg.version;
  }
  return versions;
}

function isWorkspaceVersion(value) {
  return typeof value === 'string' && value === 'workspace:*';
}

function isVersionNumber(value, packageName) {
  return typeof value === 'string' && /^\d+\.\d+\.\d+/.test(value);
}

function getCurrentMode(versions) {
  for (const filePath of TARGET_FILES) {
    if (!fs.existsSync(filePath)) continue;

    const pkg = readPackageJson(filePath);

    for (const [name, version] of Object.entries(versions)) {
      if ((pkg.dependencies?.[name] || pkg.devDependencies?.[name]) === 'workspace:*') {
        return 'workspace';
      }
      if ((pkg.dependencies?.[name] || pkg.devDependencies?.[name]) === version) {
        return 'version';
      }
    }
  }
  return null;
}

function toggleVersions(targetMode) {
  const versions = getPackageVersions();
  const currentMode = getCurrentMode(versions);

  if (targetMode === 'toggle') {
    targetMode = currentMode === 'workspace' ? 'version' : 'workspace';
  }

  if (targetMode === currentMode) {
    console.log(`Already in ${currentMode} mode. No changes needed.`);
    return;
  }

  let changedCount = 0;

  for (const filePath of TARGET_FILES) {
    if (!fs.existsSync(filePath)) continue;

    const pkg = readPackageJson(filePath);
    let modified = false;

    for (const [name, version] of Object.entries(versions)) {
      const deps = pkg.dependencies?.[name];
      const devDeps = pkg.devDependencies?.[name];

      if (targetMode === 'workspace') {
        if (isVersionNumber(deps, name)) {
          pkg.dependencies[name] = 'workspace:*';
          modified = true;
          changedCount++;
          console.log(`✓ Updated ${name} in ${path.relative(rootDir, filePath)} to workspace:*`);
        }
        if (isVersionNumber(devDeps, name)) {
          pkg.devDependencies[name] = 'workspace:*';
          modified = true;
          changedCount++;
          console.log(`✓ Updated ${name} in ${path.relative(rootDir, filePath)} to workspace:*`);
        }
      } else if (targetMode === 'version') {
        if (isWorkspaceVersion(deps)) {
          pkg.dependencies[name] = version;
          modified = true;
          changedCount++;
          console.log(`✓ Updated ${name} in ${path.relative(rootDir, filePath)} to ^${version}`);
        }
        if (isWorkspaceVersion(devDeps)) {
          pkg.devDependencies[name] = version;
          modified = true;
          changedCount++;
          console.log(`✓ Updated ${name} in ${path.relative(rootDir, filePath)} to ^${version}`);
        }
      }
    }

    if (modified) {
      writePackageJson(filePath, pkg);
    }
  }

  console.log(`\n${changedCount} package reference(s) updated successfully.`);
  console.log(`Mode: workspace:* → actual versions`);
}

function showStatus() {
  const versions = getPackageVersions();
  const currentMode = getCurrentMode(versions);

  console.log('\n📦 Package Versions:');
  for (const [name, version] of Object.entries(versions)) {
    console.log(`  ${name}: ${version}`);
  }

  console.log('\n📋 Current Mode:', currentMode || 'mixed/unknown');

  console.log('\n📝 Current References:');
  for (const filePath of TARGET_FILES) {
    if (!fs.existsSync(filePath)) continue;

    const pkg = readPackageJson(filePath);
    const relativePath = path.relative(rootDir, filePath);

    for (const [name, version] of Object.entries(versions)) {
      const deps = pkg.dependencies?.[name] || pkg.devDependencies?.[name];
      if (deps) {
        console.log(`  ${relativePath} → ${name}: ${deps}`);
      }
    }
  }
  console.log('');
}

function showHelp() {
  console.log(`
Toggle Version Script - Switch between workspace:* and version numbers

Usage:
  node scripts/toggle-versions.js [command]

Commands:
  to-workspace    Switch all references to workspace:*
  to-version      Switch all references to actual version numbers
  toggle          Toggle between current mode and the other (default)
  status          Show current status and references
  help            Show this help message

Examples:
  node scripts/toggle-versions.js                    # Toggle mode
  node scripts/toggle-versions.js to-workspace       # Use workspace:*
  node scripts/toggle-versions.js to-version         # Use version numbers
  node scripts/toggle-versions.js status             # Show current state
`);
}

const command = process.argv[2] || 'toggle';

switch (command) {
  case 'to-workspace':
    toggleVersions('workspace');
    break;
  case 'to-version':
    toggleVersions('version');
    break;
  case 'toggle':
    toggleVersions('toggle');
    break;
  case 'status':
    showStatus();
    break;
  case 'help':
  case '-h':
  case '--help':
    showHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    showHelp();
    process.exit(1);
}

#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

const PACKAGES_TO_SWITCH = ['ui-lab-registry', 'ui-lab-components'];

function findAllPackageJsons(dir = rootDir) {
  const results = [];

  function walk(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.yalc' || entry.name === 'dist') {
        continue;
      }

      const fullPath = path.join(currentPath, entry.name);

      if (entry.name === 'package.json') {
        results.push(fullPath);
      } else if (entry.isDirectory()) {
        walk(fullPath);
      }
    }
  }

  walk(dir);
  return results;
}

function getPackagesWithDependencies() {
  const packageJsons = findAllPackageJsons();
  const packagesWithDeps = [];

  for (const pkgJsonPath of packageJsons) {
    const content = fs.readFileSync(pkgJsonPath, 'utf-8');
    const pkg = JSON.parse(content);
    const dir = path.dirname(pkgJsonPath);

    const hasDep = PACKAGES_TO_SWITCH.some(
      pkgName => pkg.dependencies?.[pkgName] || pkg.devDependencies?.[pkgName]
    );

    if (hasDep) {
      packagesWithDeps.push({
        path: pkgJsonPath,
        dir,
        name: pkg.name,
        pkg,
        depCount: Object.keys(pkg.dependencies || {}).length + Object.keys(pkg.devDependencies || {}).length,
      });
    }
  }

  return packagesWithDeps.sort((a, b) => a.depCount - b.depCount);
}

function switchToLocal(packages) {
  console.log('\n🔄 Switching to local (yalc) mode...\n');

  for (const { path: pkgJsonPath, pkg } of packages) {
    for (const pkgName of PACKAGES_TO_SWITCH) {
      if (pkg.dependencies?.[pkgName]) {
        pkg.dependencies[pkgName] = `file:.yalc/${pkgName}`;
        console.log(`✓ ${pkg.name}: updated ${pkgName} to local`);
      }
      if (pkg.devDependencies?.[pkgName]) {
        pkg.devDependencies[pkgName] = `file:.yalc/${pkgName}`;
        console.log(`✓ ${pkg.name}: updated ${pkgName} (dev) to local`);
      }
    }

    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n');
  }

  const lockFile = path.join(rootDir, 'pnpm-lock.yaml');
  if (fs.existsSync(lockFile)) {
    console.log('\n🗑️  Removing pnpm lockfile to ensure clean install...');
    fs.unlinkSync(lockFile);
  }

  console.log('\n📦 Running pnpm install...');
  execSync('pnpm install', { cwd: rootDir, stdio: 'inherit' });
  console.log('✅ Switched to local mode successfully!\n');
}

function switchToProduction(packages) {
  console.log('\n🔄 Switching to production (npm) mode...\n');

  for (const { path: pkgJsonPath, pkg } of packages) {
    for (const pkgName of PACKAGES_TO_SWITCH) {
      if (pkg.dependencies?.[pkgName]) {
        pkg.dependencies[pkgName] = '^0.1.0';
        console.log(`✓ ${pkg.name}: updated ${pkgName} to production`);
      }
      if (pkg.devDependencies?.[pkgName]) {
        pkg.devDependencies[pkgName] = '^0.1.0';
        console.log(`✓ ${pkg.name}: updated ${pkgName} (dev) to production`);
      }
    }

    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n');
  }

  const lockFile = path.join(rootDir, 'pnpm-lock.yaml');
  if (fs.existsSync(lockFile)) {
    console.log('\n🗑️  Removing pnpm lockfile to ensure clean install...');
    fs.unlinkSync(lockFile);
  }

  console.log('\n📦 Running pnpm install...');
  execSync('pnpm install', { cwd: rootDir, stdio: 'inherit' });
  console.log('✅ Switched to production mode successfully!\n');
}

function getCurrentMode(packages) {
  for (const { pkg } of packages) {
    for (const pkgName of PACKAGES_TO_SWITCH) {
      const version = pkg.dependencies?.[pkgName] || pkg.devDependencies?.[pkgName];
      if (version?.startsWith('file:')) {
        return 'local';
      }
    }
  }
  return 'production';
}

const mode = process.argv[2];
const packages = getPackagesWithDependencies();

if (!packages.length) {
  console.error('❌ No packages found that depend on ui-lab-registry or ui-lab-components');
  process.exit(1);
}

const currentMode = getCurrentMode(packages);

if (mode === 'status' || mode === 'check') {
  console.log(`\n📌 Current mode: ${currentMode}`);
  console.log(`\n📍 Affected packages (${packages.length}):\n`);
  packages.forEach(p => console.log(`  - ${p.name}`));
  console.log();
  process.exit(0);
}

console.log(`\n📍 Found ${packages.length} packages to update:\n`);
packages.forEach(p => console.log(`  - ${p.name} (${p.dir})`));
console.log(`\n📌 Current mode: ${currentMode}\n`);

if (mode === 'local') {
  if (currentMode === 'local') {
    console.log('ℹ️  Already in local mode');
    process.exit(0);
  }
  switchToLocal(packages);
} else if (mode === 'prod' || mode === 'production') {
  if (currentMode === 'production') {
    console.log('ℹ️  Already in production mode');
    process.exit(0);
  }
  switchToProduction(packages);
} else {
  console.log('Usage: node scripts/switch-packages.mjs [status|local|prod]');
  console.log('\nCommands:');
  console.log('  status      # Check current mode');
  console.log('  local       # Switch to yalc (local development)');
  console.log('  prod        # Switch to npm (production)\n');
  console.log('Examples:');
  console.log('  npm run use:local   # Switch all packages to yalc');
  console.log('  npm run use:prod    # Switch all packages to npm');
  console.log('  npm run status      # Check current mode');
  process.exit(1);
}

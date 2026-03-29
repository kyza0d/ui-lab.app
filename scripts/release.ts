#!/usr/bin/env node
// Run from monorepo root: node scripts/release.js
// Requires: clean git tree + at least one pending changeset (pnpm changeset)

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function run(cmd, cwd = rootDir) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

function checkCleanTree() {
  const out = execSync('git status --porcelain', { cwd: rootDir }).toString().trim();
  if (out) {
    console.error('\nUncommitted changes detected. Commit or stash first.\n');
    process.exit(1);
  }
}

function hasPendingChangesets() {
  const dir = path.join(rootDir, '.changeset');
  return fs.readdirSync(dir).some(f => f.endsWith('.md') && f !== 'README.md');
}

checkCleanTree();

if (!hasPendingChangesets()) {
  console.error('\nNo pending changesets found. Run `pnpm changeset` to describe your changes.\n');
  process.exit(1);
}

// 1. Bump versions + generate changelogs from pending changesets
run('pnpm changeset version');

// 2. Build components first (vite + CSS + postcss)
run('pnpm --filter ui-lab-components run build');

// 3. Generate styles docs from compiled @ui CSS into registry/src
//    Must run after components build and before registry build
run('node scripts/generate-styles-docs.mjs');

// 4. Build registry (codegen scripts + tsc) with fresh generated styles
run('pnpm --filter ui-lab-registry run build');

// 5. Sync all consumer references (apps/site, etc.) to the new version numbers
run('tsx scripts/toggle-versions.ts to-version');

// 6. Publish to npm — pnpm replaces workspace:* in published packages automatically
run('pnpm changeset publish');

// 7. Update root lockfile so Vercel resolves published npm versions
run('pnpm install');

// 8. Update site lockfile
run('pnpm install', path.join(rootDir, 'apps/site'));

// 9. Verify the site builds with the newly published versions
run('pnpm --filter site run build');

// 10. Commit: version bumps, CHANGELOG updates, ref sync, lockfiles
run('git add -A');
run('git commit -m "chore: release"');

// 11. Push commits + the version tags created by changeset publish
run('git push --follow-tags');

console.log('\n✓ Release complete');

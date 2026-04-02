#!/usr/bin/env tsx
// Bumps package versions by incrementing the patch number by 1.
// e.g. 0.3.4 -> 0.3.5, 0.3.41 -> 0.3.42
// Consumes pending changeset files and updates CHANGELOG.md.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const PACKAGES = [
  { name: 'ui-lab-components', dir: 'packages/@ui' },
  { name: 'ui-lab-registry', dir: 'packages/registry' },
  { name: 'ui-lab-theme-onyx', dir: 'packages/themes/onyx' },
  { name: 'ui-lab-mcp', dir: 'packages/@mcp' },
]

function bumpVersion(current: string): string {
  const parts = current.split('.')
  parts[2] = String(parseInt(parts[2], 10) + 1)
  return parts.join('.')
}

const changesetDir = path.join(rootDir, '.changeset')
const changesetFiles = fs.readdirSync(changesetDir)
  .filter(f => f.endsWith('.md') && f !== 'README.md')
  .map(f => path.join(changesetDir, f))

if (changesetFiles.length === 0) {
  console.error('No pending changesets found. Run /changeset first.')
  process.exit(1)
}

const summaries = changesetFiles.map(f => {
  const content = fs.readFileSync(f, 'utf8')
  const lines = content.split('\n')
  const endFrontmatter = lines.indexOf('---', 1)
  return lines.slice(endFrontmatter + 1).join('\n').trim()
}).filter(Boolean)

for (const pkg of PACKAGES) {
  const pkgJsonPath = path.join(rootDir, pkg.dir, 'package.json')
  if (!fs.existsSync(pkgJsonPath)) continue

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
  const oldVersion = pkgJson.version
  const newVersion = bumpVersion(oldVersion)
  pkgJson.version = newVersion
  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n', 'utf8')
  console.log(`${pkg.name}: ${oldVersion} -> ${newVersion}`)

  const changelogPath = path.join(rootDir, pkg.dir, 'CHANGELOG.md')
  const entry = `## ${newVersion}\n\n### Patch Changes\n\n- ${summaries.join('\n\n- ')}\n\n`

  if (fs.existsSync(changelogPath)) {
    const existing = fs.readFileSync(changelogPath, 'utf8')
    const insertAt = existing.indexOf('\n## ')
    if (insertAt !== -1) {
      fs.writeFileSync(changelogPath, existing.slice(0, insertAt + 1) + entry + existing.slice(insertAt + 1), 'utf8')
    } else {
      fs.writeFileSync(changelogPath, existing + '\n' + entry, 'utf8')
    }
  } else {
    fs.writeFileSync(changelogPath, `# ${pkg.name}\n\n${entry}`, 'utf8')
  }
}

for (const f of changesetFiles) {
  fs.unlinkSync(f)
  console.log(`Consumed: ${path.basename(f)}`)
}

console.log('Version bump complete.')

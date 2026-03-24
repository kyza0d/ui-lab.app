#!/usr/bin/env tsx
// Usage: tsx scripts/write-changeset.ts "<summary>" [patch|minor|major]
// Writes a non-interactive changeset file for ui-lab-components + ui-lab-registry.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const summary = process.argv[2]
const type = (process.argv[3] ?? 'patch') as 'patch' | 'minor' | 'major'

if (!summary) {
  console.error('Usage: tsx scripts/write-changeset.ts "<summary>" [patch|minor|major]')
  process.exit(1)
}

if (!['patch', 'minor', 'major'].includes(type)) {
  console.error(`Invalid type "${type}". Must be patch, minor, or major.`)
  process.exit(1)
}

const id = crypto.randomBytes(6).toString('hex')
const filename = path.join(rootDir, '.changeset', `${id}.md`)

const content = `---
"ui-lab-components": ${type}
"ui-lab-registry": ${type}
"ui-lab-theme-onyx": ${type}
---

${summary}
`

fs.writeFileSync(filename, content, 'utf8')
console.log(`Created .changeset/${id}.md (${type})`)

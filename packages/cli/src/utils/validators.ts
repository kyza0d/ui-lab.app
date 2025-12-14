import { getAllComponentIds, getComponentById } from 'ui-lab-registry'
import type { UILabConfig } from '../types/index.js'

export function validateComponentIds(ids: string[]): { valid: string[]; invalid: string[] } {
  const allIds = new Set(getAllComponentIds())
  const valid: string[] = []
  const invalid: string[] = []

  for (const id of ids) {
    if (allIds.has(id)) {
      valid.push(id)
    } else {
      invalid.push(id)
    }
  }

  return { valid, invalid }
}

export function componentExists(id: string): boolean {
  return getComponentById(id) !== undefined
}

export function validateConfig(config: unknown): config is UILabConfig {
  if (!config || typeof config !== 'object') return false

  const c = config as Record<string, unknown>

  if (typeof c.version !== 'string') return false
  if (!c.theme || typeof c.theme !== 'object') return false

  const theme = c.theme as Record<string, unknown>
  if (typeof theme.preset !== 'string') return false
  if (theme.mode !== 'light' && theme.mode !== 'dark') return false

  if (typeof c.typescript !== 'boolean') return false
  if (!Array.isArray(c.installedComponents)) return false
  if (!c.installedComponents.every((id: unknown) => typeof id === 'string')) return false

  return true
}

export function isValidPresetName(name: string): boolean {
  const validPresets = ['vitesse-dark', 'vitesse-light', 'custom']
  return validPresets.includes(name)
}

export function normalizeComponentId(input: string): string {
  return input.toLowerCase().trim().replace(/\s+/g, '-')
}

export function findSimilarComponents(invalidId: string): string[] {
  const allIds = getAllComponentIds()
  const normalized = normalizeComponentId(invalidId)

  return allIds.filter(id => {
    if (id.includes(normalized) || normalized.includes(id)) return true
    const distance = levenshteinDistance(id, normalized)
    return distance <= 2
  }).slice(0, 3)
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      )
    }
  }

  return matrix[b.length][a.length]
}

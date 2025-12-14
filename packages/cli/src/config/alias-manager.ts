import * as p from '@clack/prompts'
import path from 'node:path'
import { exists, readJson, writeJson } from '../utils/file-utils.js'

/**
 * Alias definition with path mapping
 */
export interface AliasDefinition {
  name: string
  path: string
}

/**
 * Selected aliases configuration
 */
export interface SelectedAliases {
  [aliasName: string]: string
}

/**
 * tsconfig.json structure (partial)
 */
interface TsConfig {
  compilerOptions?: {
    paths?: Record<string, string[]>
    [key: string]: unknown
  }
  [key: string]: unknown
}

/**
 * Default aliases that should be available for configuration
 */
export const DEFAULT_ALIASES: AliasDefinition[] = [
  { name: 'components', path: '@/components' },
  { name: 'utils', path: '@/lib/utils' },
  { name: 'ui', path: '@/components/ui' },
  { name: 'lib', path: '@/lib' },
  { name: 'hooks', path: '@/hooks' },
]

/**
 * Check if the project is a Next.js project by looking for next.config files
 */
export function isNextJsProject(cwd: string): boolean {
  const extensions = ['ts', 'js', 'mjs', 'cjs']

  for (const ext of extensions) {
    const configPath = path.join(cwd, `next.config.${ext}`)
    if (exists(configPath)) {
      return true
    }
  }

  return false
}

/**
 * Display a multi-select prompt for alias configuration
 * All aliases are selected by default
 */
export async function promptAliasSelection(): Promise<AliasDefinition[]> {
  const answer = await p.multiselect({
    message: 'Select path aliases to configure:',
    options: DEFAULT_ALIASES.map(alias => ({
      value: alias,
      label: `${alias.name} → ${alias.path}`,
    })),
    initialValues: DEFAULT_ALIASES, // All checked by default
  })

  if (typeof answer === 'symbol') {
    p.cancel('Path alias setup cancelled.')
    process.exit(1)
  }

  return answer as AliasDefinition[]
}

/**
 * Update tsconfig.json with selected aliases
 * This replaces any existing paths configuration
 */
export function updateTsconfigWithAliases(
  cwd: string,
  selectedAliases: AliasDefinition[]
): { success: boolean; error?: string } {
  const tsconfigPath = path.join(cwd, 'tsconfig.json')

  // Read existing tsconfig.json
  const tsconfig = readJson<TsConfig>(tsconfigPath)

  if (!tsconfig) {
    // If tsconfig doesn't exist, we can't update it
    return {
      success: false,
      error: 'tsconfig.json not found',
    }
  }

  // Ensure compilerOptions exists
  if (!tsconfig.compilerOptions) {
    tsconfig.compilerOptions = {}
  }

  // Build the paths object
  const paths: Record<string, string[]> = {
    '@/*': ['./src/*'], // Base path alias
  }

  // Add selected aliases
  for (const alias of selectedAliases) {
    // Convert alias path format (e.g., @/components) to tsconfig paths format
    // The path is what the user specified in the alias definition
    const aliasPath = alias.path
    paths[aliasPath] = [`./${aliasPath.replace('@/', 'src/')}`]
  }

  // Replace the paths in compilerOptions
  tsconfig.compilerOptions.paths = paths

  // Write back to tsconfig.json
  const writeSuccess = writeJson(tsconfigPath, tsconfig, true)

  if (!writeSuccess) {
    return {
      success: false,
      error: 'Failed to write tsconfig.json',
    }
  }

  return { success: true }
}

/**
 * Get a formatted string of selected aliases for display
 */
export function formatSelectedAliases(aliases: AliasDefinition[]): string {
  if (aliases.length === 0) {
    return 'No aliases selected'
  }

  return aliases
    .map(alias => `${alias.name} (${alias.path})`)
    .join(', ')
}

import path from 'node:path'
import * as p from '@clack/prompts'
import pc from 'picocolors'
import { exists } from './file-utils.js'
import { ConfigManager } from '../core/config-manager.js'

export interface ComponentPathResolution {
  path: string
  useSrc: boolean
}

/**
 * Resolves the component path based on project structure and user preference.
 *
 * Flow:
 * 1. If config has useSrc preference stored, use it
 * 2. If src/ directory exists and no preference, ask user
 * 3. Otherwise default to components/ui (no src/)
 *
 * The resolved path is: 'src/components/ui' or 'components/ui'
 */
export async function resolveComponentPath(
  cwd: string,
  config: ConfigManager,
  interactive: boolean = false
): Promise<ComponentPathResolution> {
  // Check if preference is already stored in config
  const existingConfig = config.read()
  if (existingConfig?.useSrc !== undefined) {
    const componentPath = existingConfig.useSrc ? 'src/components/ui' : 'components/ui'
    return {
      path: componentPath,
      useSrc: existingConfig.useSrc,
    }
  }

  // Check if src/ directory exists
  const srcPath = path.join(cwd, 'src')
  const srcExists_ = exists(srcPath)

  // If src/ doesn't exist, default to components/ui
  if (!srcExists_) {
    return {
      path: 'components/ui',
      useSrc: false,
    }
  }

  // src/ exists but no preference stored
  // If interactive mode, ask user. Otherwise default to using src/
  if (interactive) {
    const answer = await p.confirm({
      message: 'Use the src/ directory for components?',
      initialValue: true,
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return {
      path: answer ? 'src/components/ui' : 'components/ui',
      useSrc: answer,
    }
  }

  // Non-interactive mode: default to using src/ when it exists
  return {
    path: 'src/components/ui',
    useSrc: true,
  }
}

/**
 * Stores the src/ preference in the config file.
 * Safely updates config without overwriting other fields.
 */
export function storeComponentPathPreference(
  config: ConfigManager,
  useSrc: boolean
): boolean {
  const currentConfig = config.read()
  if (!currentConfig) {
    return false
  }

  currentConfig.useSrc = useSrc
  return config.write(currentConfig)
}

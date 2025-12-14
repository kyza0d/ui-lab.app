import path from 'node:path'
import { ensureDir, writeFile } from '../utils/file-utils.js'
import { Logger } from '../utils/logger.js'
import { createConfigManager } from './config-manager.js'
import { generatedSourceCode } from 'ui-lab-registry'
import type { ComponentSourceCode } from 'ui-lab-registry'

export class HeadlessInstaller {
  private cwd: string
  private logger: Logger
  private componentsDir: string
  private relativeComponentDir: string
  private configManager: ReturnType<typeof createConfigManager>

  constructor(cwd: string, logger: Logger, componentDir?: string) {
    this.cwd = cwd
    this.logger = logger
    this.configManager = createConfigManager(cwd)
    // Use provided componentDir or default to components/ui
    const resolvedComponentDir = componentDir || 'components/ui'
    this.componentsDir = path.join(cwd, resolvedComponentDir)
    // Store the relative path for output messages
    this.relativeComponentDir = resolvedComponentDir
  }

  private transformComponentImports(tsx: string): string {
    // Transform imports from relative ./utils to centralized @/lib/utils
    const config = this.configManager.read()
    const pathAlias = config?.pathAlias || '@/'
    const utilsImportPath = `${pathAlias}lib/utils`

    // Replace "./utils" with the centralized utils path
    return tsx.replace(/from ["']\.\/utils["']/g, `from "${utilsImportPath}"`)
  }

  async installComponentFiles(componentIds: string[]): Promise<{ success: boolean; filesCreated: string[]; error?: string }> {
    const filesCreated: string[] = []

    try {
      // Ensure components directory exists
      if (!ensureDir(this.componentsDir)) {
        return {
          success: false,
          filesCreated,
          error: `Failed to create ${this.relativeComponentDir} directory`
        }
      }

      // Install each component
      for (const componentId of componentIds) {
        const source = generatedSourceCode[componentId]

        if (!source) {
          this.logger.warn(`Component ${componentId} source not found in registry`)
          continue
        }

        const componentDir = path.join(this.componentsDir, componentId)

        // Create component directory
        if (!ensureDir(componentDir)) {
          this.logger.warn(`Failed to create component directory for ${componentId}`)
          continue
        }

        // Transform and write TSX file (update relative utils imports to centralized path)
        const transformedTsx = this.transformComponentImports(source.tsx)
        const tsxPath = path.join(componentDir, `${componentId}.tsx`)
        if (writeFile(tsxPath, transformedTsx)) {
          filesCreated.push(`${this.relativeComponentDir}/${componentId}/${componentId}.tsx`)
          this.logger.success(`Created ${componentId}.tsx`)
        } else {
          this.logger.warn(`Failed to write ${componentId}.tsx`)
          continue
        }

        // Write CSS module file
        const cssPath = path.join(componentDir, `${componentId}.module.css`)
        if (source.css && writeFile(cssPath, source.css)) {
          filesCreated.push(`${this.relativeComponentDir}/${componentId}/${componentId}.module.css`)
          this.logger.success(`Created ${componentId}.module.css`)
        }

        // Write CSS types file
        const cssTypesPath = path.join(componentDir, `${componentId}.module.css.d.ts`)
        if (source.cssTypes && writeFile(cssTypesPath, source.cssTypes)) {
          filesCreated.push(`${this.relativeComponentDir}/${componentId}/${componentId}.module.css.d.ts`)
          this.logger.success(`Created ${componentId}.module.css.d.ts`)
        }

        // Create index.ts for convenience
        const indexPath = path.join(componentDir, 'index.ts')
        const indexContent = `export * from "./${componentId}";
export { ${this.getExportName(componentId)} } from "./${componentId}";
`
        if (writeFile(indexPath, indexContent)) {
          filesCreated.push(`${this.relativeComponentDir}/${componentId}/index.ts`)
          this.logger.success(`Created ${componentId}/index.ts`)
        }
      }

      return {
        success: true,
        filesCreated
      }
    } catch (error) {
      return {
        success: false,
        filesCreated,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  private getExportName(componentId: string): string {
    // Convert kebab-case to PascalCase
    return componentId
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }
}

export function createHeadlessInstaller(cwd: string, logger: Logger, componentDir?: string): HeadlessInstaller {
  return new HeadlessInstaller(cwd, logger, componentDir)
}

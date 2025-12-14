import path from 'node:path'
import { RegistryClient, createRegistryClient } from './registry-client.js'
import { DependencyResolver, createDependencyResolver } from './dependency-resolver.js'
import { PackageManagerService, createPackageManager } from './package-manager.js'
import { ConfigManager, createConfigManager } from './config-manager.js'
import { ThemeGenerator, createThemeGenerator } from './theme-generator.js'
import { createHeadlessInstaller } from './headless-installer.js'
import { Logger, createLogger } from '../utils/logger.js'
import { writeFile, ensureDir } from '../utils/file-utils.js'
import { getPreset } from '../data/presets.js'
import type { InstallResult, InitResult, ThemeMode, LoggerOptions } from '../types/index.js'

export interface InstallerOptions {
  cwd?: string
  logger?: LoggerOptions
  yes?: boolean
  dryRun?: boolean
}

export class Installer {
  private registry: RegistryClient
  private resolver: DependencyResolver
  private pm: PackageManagerService
  private config: ConfigManager
  private themeGen: ThemeGenerator
  private logger: Logger
  private cwd: string
  private options: InstallerOptions

  constructor(options: InstallerOptions = {}) {
    this.cwd = options.cwd ?? process.cwd()
    this.options = options
    this.registry = createRegistryClient()
    this.resolver = createDependencyResolver()
    this.pm = createPackageManager(this.cwd)
    this.config = createConfigManager(this.cwd)
    this.themeGen = createThemeGenerator()
    this.logger = createLogger(options.logger ?? {})
  }

  private generateUtilsFile(): { success: boolean; filePath?: string; error?: string } {
    try {
      const config = this.config.read()
      if (!config) {
        return {
          success: false,
          error: 'No configuration found'
        }
      }

      // Resolve the utils file path
      // utils are stored at @/lib/utils, which maps to src/lib/utils.ts or lib/utils.ts
      const useSrc = config.useSrc ?? true
      const baseDir = useSrc ? 'src' : ''
      const utilsDirPath = path.join(this.cwd, baseDir, 'lib')
      const utilsFilePath = path.join(utilsDirPath, 'utils.ts')

      // Ensure the directory exists
      if (!ensureDir(utilsDirPath)) {
        return {
          success: false,
          error: `Failed to create utils directory at ${utilsDirPath}`
        }
      }

      // Generate the utils.ts content
      const utilsContent = `import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names using clsx
 * Used throughout the application to conditionally apply CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
`

      // Write the utils file
      if (!writeFile(utilsFilePath, utilsContent)) {
        return {
          success: false,
          error: `Failed to write utils.ts at ${utilsFilePath}`
        }
      }

      // Return relative path for logging
      const relativePath = path.relative(this.cwd, utilsFilePath)
      this.logger.success('Created centralized utils.ts')
      return {
        success: true,
        filePath: relativePath
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }
    }
  }

  async init(preset: string, mode: ThemeMode, typescript: boolean, installationType: 'headless' | 'pre-packaged' = 'headless', skipAlreadyInitializedCheck: boolean = false): Promise<InitResult> {
    const result: InitResult = {
      success: false,
      command: 'init',
      theme: { preset, mode },
      filesCreated: [],
      packagesInstalled: [],
      nextSteps: []
    }

    try {
      if (!skipAlreadyInitializedCheck && this.config.isInitialized()) {
        result.error = 'Project is already initialized. Run `ui-lab install` to add components.'
        return result
      }

      if (!this.pm.hasPackageJson()) {
        result.error = 'No package.json found. Please run this command in a Node.js project.'
        return result
      }

      const themePreset = getPreset(preset)
      if (!themePreset) {
        result.error = `Unknown theme preset: ${preset}. Available presets: vitesse-dark, vitesse-light`
        return result
      }

      this.logger.info('Initializing ui-lab project...')

      const globalsPath = path.join(this.cwd, 'src', 'app', 'globals.css')
      const globalsCss = this.themeGen.generateGlobalsCss(themePreset)

      if (!this.options.dryRun) {
        if (writeFile(globalsPath, globalsCss)) {
          result.filesCreated.push('src/app/globals.css')
          this.logger.success('Created globals.css with theme')
        } else {
          const altPath = path.join(this.cwd, 'src', 'globals.css')
          if (writeFile(altPath, globalsCss)) {
            result.filesCreated.push('src/globals.css')
            this.logger.success('Created globals.css with theme')
          }
        }
      }

      // Read existing config to preserve componentDir and other settings
      const existingConfig = this.config.read()

      let configToWrite
      if (existingConfig) {
        // Preserve existing config but update theme and typescript settings
        configToWrite = {
          ...existingConfig,
          theme: { preset, mode },
          typescript,
          installationType
        }
      } else {
        // Create new default config if none exists
        configToWrite = this.config.createDefaultConfig(preset, mode, typescript, installationType)
      }

      const configCreated = this.options.dryRun || this.config.write(configToWrite)

      if (configCreated) {
        result.filesCreated.push('ui-lab.config.json')
        this.logger.success('Created ui-lab.config.json')
      }

      if (installationType === 'pre-packaged') {
        this.logger.info('Installing ui-lab-components...')

        if (!this.options.dryRun) {
          const installResult = await this.pm.install(['ui-lab-components'])
          if (installResult.success) {
            result.packagesInstalled.push('ui-lab-components')
            this.logger.success('Installed ui-lab-components')
          } else {
            this.logger.warn(`Package installation warning: ${installResult.error}`)
          }
        }

        result.success = true
        result.nextSteps = [
          'Install components:',
          '  npx ui-lab install button',
          '',
          'Use components:',
          '  import { Button } from "ui-lab-components";'
        ]
      } else {
        // Headless mode - generate centralized utils.ts
        if (!this.options.dryRun) {
          const utilsResult = this.generateUtilsFile()
          if (utilsResult.success && utilsResult.filePath) {
            result.filesCreated.push(utilsResult.filePath)
          } else {
            this.logger.warn(`Failed to generate utils.ts: ${utilsResult.error}`)
          }
        }

        result.success = true
        result.nextSteps = [
          'Install components:',
          '  npx ui-lab install button',
          '',
          'Use components:',
          '  import { Button } from "@/components/ui/button";'
        ]
      }

      return result
    } catch (error) {
      result.error = error instanceof Error ? error.message : 'Unknown error occurred'
      return result
    }
  }

  async installComponents(componentIds: string[]): Promise<InstallResult> {
    const result: InstallResult = {
      success: false,
      command: 'install',
      components: componentIds,
      resolvedDependencies: {
        npmPackages: [],
        internalComponents: [],
        hasConflicts: false,
        conflicts: []
      },
      importStatements: [],
      nextSteps: []
    }

    try {
      if (!this.config.isInitialized()) {
        result.error = 'Project not initialized. Run `npx ui-lab init` first.'
        return result
      }

      const config = this.config.read()
      if (!config) {
        result.error = 'Failed to read config'
        return result
      }

      const { valid, invalid } = this.registry.validateComponentIds(componentIds)

      if (invalid.length > 0) {
        result.error = `Invalid component(s): ${invalid.join(', ')}`
        return result
      }

      if (valid.length === 0) {
        result.error = 'No valid components specified.'
        return result
      }

      // Handle pre-packaged mode
      if (config.installationType === 'pre-packaged') {
        this.logger.info(`Components available in ui-lab-components:`)

        for (const id of valid) {
          const exportName = this.registry.getComponentExportName(id)
          result.importStatements.push(`import { ${exportName} } from "ui-lab-components";`)
          this.logger.info(`  ${exportName}`)
        }

        if (!this.options.dryRun) {
          this.config.addInstalledComponents(valid)
          this.logger.success('Updated ui-lab.config.json')
        }

        result.success = true
        result.nextSteps = [
          'Import the component(s):',
          ...result.importStatements.map(s => `  ${s}`)
        ]

        return result
      }

      // Handle headless mode
      this.logger.info(`Installing components in headless mode...`)

      const resolved = this.resolver.resolve(valid)
      result.resolvedDependencies = resolved

      if (resolved.hasConflicts) {
        result.error = `Dependency conflicts detected: ${resolved.conflicts.map(c => c.package).join(', ')}`
        return result
      }

      this.logger.info(`Resolving dependencies for: ${valid.join(', ')}`)
      this.logger.info(`Components to install: ${resolved.internalComponents.join(', ')}`)

      // Install component files
      if (!this.options.dryRun) {
        // Get component directory from config, or use default
        const config = this.config.read()
        const componentDir = config?.componentDir || 'components/ui'
        const headless = createHeadlessInstaller(this.cwd, this.logger, componentDir)
        const installResult = await headless.installComponentFiles(resolved.internalComponents)

        if (!installResult.success) {
          result.error = `Failed to install component files: ${installResult.error}`
          return result
        }

        this.logger.success('Installed component files')
      }

      // Install npm packages
      let packagesToInstall = resolved.npmPackages
        .map(p => p.name)
        .filter(name => !this.pm.isInstalled(name))

      if (packagesToInstall.length > 0) {
        this.logger.info(`Installing npm packages: ${packagesToInstall.join(', ')}`)

        if (!this.options.dryRun) {
          const installResult = await this.pm.install(packagesToInstall)
          if (!installResult.success) {
            result.error = `Failed to install packages: ${installResult.error}`
            return result
          }
          this.logger.success('Installed npm packages')
        }
      } else {
        this.logger.info('All required npm packages already installed')
      }

      if (!this.options.dryRun) {
        this.config.addInstalledComponents(resolved.internalComponents)
        this.logger.success('Updated ui-lab.config.json')
      }

      // Generate import statements using config values
      const configForImports = this.config.read()
      const componentDirForImports = configForImports?.componentDir || 'components/ui'
      const pathAlias = configForImports?.pathAlias || '@/'

      // Remove 'src/' prefix if present to get the import path
      const importComponentDir = componentDirForImports.startsWith('src/')
        ? componentDirForImports.slice(4)
        : componentDirForImports

      result.importStatements = valid.map(id => {
        return `import { ${this.registry.getComponentExportName(id)} } from "${pathAlias}${importComponentDir}/${id}";`
      })

      result.success = true
      result.nextSteps = [
        'Import the component(s):',
        ...result.importStatements.map(s => `  ${s}`)
      ]

      return result
    } catch (error) {
      result.error = error instanceof Error ? error.message : 'Unknown error occurred'
      return result
    }
  }

  getLogger(): Logger {
    return this.logger
  }
}

export function createInstaller(options?: InstallerOptions): Installer {
  return new Installer(options)
}

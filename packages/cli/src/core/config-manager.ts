import path from 'node:path'
import { exists, readJson, writeJson } from '../utils/file-utils.js'
import { validateConfig } from '../utils/validators.js'
import type { UILabConfig, ThemeMode, Framework } from '../types/index.js'

const CONFIG_FILENAME = 'ui-lab.config.json'
const CONFIG_VERSION = '2.0.0'
const LEGACY_CONFIG_VERSION = '1.0.0'

export class ConfigManager {
  private configPath: string

  constructor(cwd: string = process.cwd()) {
    this.configPath = path.join(cwd, CONFIG_FILENAME)
  }

  read(): UILabConfig | null {
    const config = readJson<UILabConfig>(this.configPath)
    if (!config) return null
    if (!validateConfig(config)) return null

    // Migrate old config versions
    if (config.version === LEGACY_CONFIG_VERSION) {
      return this.migrateFromV1(config)
    }

    return config
  }

  private migrateFromV1(config: UILabConfig): UILabConfig {
    // Add new fields with intelligent defaults
    return {
      ...config,
      version: CONFIG_VERSION,
      framework: (process.env.INIT_FRAMEWORK as Framework) || 'nextjs',
      componentDir: process.env.INIT_COMPONENT_DIR || 'components/ui',
      globalCssPath: process.env.INIT_GLOBAL_CSS || 'src/app/globals.css',
      pathAlias: '@/',
    }
  }

  write(config: UILabConfig): boolean {
    return writeJson(this.configPath, config)
  }

  updatePartial(updates: Partial<UILabConfig>): boolean {
    const currentConfig = this.read()
    if (!currentConfig) return false

    const mergedConfig = { ...currentConfig, ...updates }
    return this.write(mergedConfig)
  }

  isInitialized(): boolean {
    return exists(this.configPath) && this.read() !== null
  }

  createDefaultConfig(
    preset: string,
    mode: ThemeMode,
    typescript: boolean,
    installationType: 'headless' | 'pre-packaged' = 'headless',
    framework?: Framework,
    componentDir?: string,
    globalCssPath?: string,
    pathAlias?: string
  ): UILabConfig {
    return {
      $schema: 'https://ui-lab.app/schema/config.json',
      version: CONFIG_VERSION,
      theme: {
        preset,
        mode
      },
      typescript,
      installationType,
      installedComponents: [],
      // New v2.0.0 fields
      framework: framework || (process.env.INIT_FRAMEWORK as Framework) || 'nextjs',
      componentDir: componentDir || process.env.INIT_COMPONENT_DIR || 'components/ui',
      globalCssPath: globalCssPath || process.env.INIT_GLOBAL_CSS || 'src/app/globals.css',
      pathAlias: pathAlias || '@/',
    }
  }

  addInstalledComponent(componentId: string): boolean {
    const config = this.read()
    if (!config) return false

    if (!config.installedComponents.includes(componentId)) {
      config.installedComponents.push(componentId)
      config.installedComponents.sort()
    }

    return this.write(config)
  }

  addInstalledComponents(componentIds: string[]): boolean {
    const config = this.read()
    if (!config) return false

    for (const id of componentIds) {
      if (!config.installedComponents.includes(id)) {
        config.installedComponents.push(id)
      }
    }
    config.installedComponents.sort()

    return this.write(config)
  }

  removeInstalledComponent(componentId: string): boolean {
    const config = this.read()
    if (!config) return false

    const index = config.installedComponents.indexOf(componentId)
    if (index !== -1) {
      config.installedComponents.splice(index, 1)
    }

    return this.write(config)
  }

  getInstalledComponents(): string[] {
    const config = this.read()
    return config?.installedComponents ?? []
  }

  isComponentInstalled(componentId: string): boolean {
    const config = this.read()
    return config?.installedComponents.includes(componentId) ?? false
  }

  updateTheme(preset: string, mode: ThemeMode): boolean {
    const config = this.read()
    if (!config) return false

    config.theme = { preset, mode }
    return this.write(config)
  }

  getConfigPath(): string {
    return this.configPath
  }
}

export function createConfigManager(cwd?: string): ConfigManager {
  return new ConfigManager(cwd)
}

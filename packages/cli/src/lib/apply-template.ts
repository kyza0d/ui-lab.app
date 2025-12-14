import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'
import type { ApplyTemplateResult, Framework, FrameworkTemplate, TemplatesConfig } from '../types/index.js'
import { readFile, writeFile } from '../utils/file-utils.js'

/**
 * Load the frameworks template configuration from the templates/frameworks.json file
 */
function loadFrameworksConfig(): TemplatesConfig {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url))
    const templatesPath = path.join(__dirname, '../templates/frameworks.json')
    const configContent = readFileSync(templatesPath, 'utf-8')
    return JSON.parse(configContent) as TemplatesConfig
  } catch (error) {
    throw new Error(
      `Failed to load frameworks template configuration: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

/**
 * Get a specific framework template by name
 */
function getFrameworkTemplate(frameworkName: string): FrameworkTemplate | null {
  try {
    const config = loadFrameworksConfig()
    return config[frameworkName] || null
  } catch (error) {
    console.error('Error loading framework template:', error)
    return null
  }
}

/**
 * Merge template configuration into package.json, preserving existing fields
 */
function mergePackageJson(
  existingPackageJson: Record<string, any>,
  template: FrameworkTemplate
): Record<string, any> {
  const merged = { ...existingPackageJson }

  // Add template package metadata
  if (template.packageJson.type) {
    merged.type = template.packageJson.type
  }

  // Merge scripts (template scripts override existing ones for framework-specific scripts)
  merged.scripts = {
    ...merged.scripts,
    ...template.packageJson.scripts,
  }

  // Merge dependencies (avoid duplicates, prefer template version)
  merged.dependencies = {
    ...merged.dependencies,
    ...template.packageJson.dependencies,
  }

  // Merge devDependencies (avoid duplicates, prefer template version)
  merged.devDependencies = {
    ...merged.devDependencies,
    ...template.packageJson.devDependencies,
  }

  return merged
}

/**
 * Apply a framework template to a package.json file
 * Loads the template, merges it with existing package.json, and writes back to disk
 */
export async function applyTemplate(
  frameworkName: string,
  packageJsonPath: string,
  preserveExisting: boolean = true
): Promise<ApplyTemplateResult> {
  try {
    // Validate framework exists
    const template = getFrameworkTemplate(frameworkName)
    if (!template) {
      return {
        success: false,
        message: `Framework template '${frameworkName}' not found`,
        error: `Unknown framework: ${frameworkName}`,
      }
    }

    // Read existing package.json if it exists and we want to preserve it
    let packageJson: Record<string, any> = {}
    if (preserveExisting) {
      const fileContent = readFile(packageJsonPath)
      if (fileContent) {
        try {
          packageJson = JSON.parse(fileContent)
        } catch (parseError) {
          return {
            success: false,
            message: 'Failed to parse existing package.json',
            error: parseError instanceof Error ? parseError.message : 'Invalid JSON',
          }
        }
      }
    }

    // Merge template into package.json
    const mergedPackageJson = mergePackageJson(packageJson, template)

    // Write merged package.json back to disk
    const jsonString = JSON.stringify(mergedPackageJson, null, 2)
    const written = writeFile(packageJsonPath, jsonString)

    if (!written) {
      return {
        success: false,
        message: 'Failed to write package.json to disk',
        error: 'File system error',
      }
    }

    return {
      success: true,
      message: `Successfully applied ${template.displayName} template to package.json`,
      mergedPackageJson,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error applying framework template',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Get all available framework templates
 */
export function getAvailableFrameworks(): FrameworkTemplate[] {
  try {
    const config = loadFrameworksConfig()
    return Object.values(config)
  } catch (error) {
    console.error('Error loading available frameworks:', error)
    return []
  }
}

/**
 * Check if a framework template exists
 */
export function frameworkTemplateExists(frameworkName: string): boolean {
  return getFrameworkTemplate(frameworkName) !== null
}

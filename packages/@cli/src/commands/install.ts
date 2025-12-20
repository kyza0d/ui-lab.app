import * as p from '@clack/prompts'
import pc from 'picocolors'
import { createInstaller } from '../core/installer.js'
import { createConfigManager } from '../core/config-manager.js'
import { createRegistryClient } from '../core/registry-client.js'
import { createDependencyResolver } from '../core/dependency-resolver.js'
import { findSimilarComponents } from '../utils/validators.js'
import type { InstallResult } from '../types/index.js'
import { ExitCodes } from '../types/index.js'

export interface InstallOptions {
  yes?: boolean
  dryRun?: boolean
  json?: boolean
}

export async function installCommand(components: string[], options: InstallOptions): Promise<void> {
  const cwd = process.cwd()
  const config = createConfigManager(cwd)
  const registry = createRegistryClient()
  const resolver = createDependencyResolver()

  if (!config.isInitialized()) {
    if (options.json) {
      console.log(JSON.stringify({
        success: false,
        command: 'install',
        error: 'Project not initialized. Run `npx ui-lab init` first.'
      }))
    } else {
      console.log(pc.yellow('Project not initialized. Run `npx ui-lab init` first.'))
    }
    process.exit(ExitCodes.NOT_INITIALIZED)
  }

  if (components.length === 0) {
    if (options.json) {
      console.log(JSON.stringify({
        success: false,
        command: 'install',
        error: 'No components specified. Usage: ui-lab install <component...>'
      }))
    } else {
      console.log(pc.yellow('No components specified. Usage: ui-lab install <component...>'))
      console.log()
      console.log('Available components:')
      const allComponents = registry.getAllComponentIds()
      const columns = 4
      for (let i = 0; i < allComponents.length; i += columns) {
        const row = allComponents.slice(i, i + columns)
        console.log('  ' + row.map(c => c.padEnd(18)).join(''))
      }
    }
    process.exit(ExitCodes.INVALID_COMPONENT)
  }

  const { valid, invalid } = registry.validateComponentIds(components)

  if (invalid.length > 0) {
    if (options.json) {
      console.log(JSON.stringify({
        success: false,
        command: 'install',
        error: `Invalid component(s): ${invalid.join(', ')}`,
        invalidComponents: invalid
      }))
    } else {
      console.log(pc.red(`Invalid component(s): ${invalid.join(', ')}`))
      console.log()
      invalid.forEach(inv => {
        const similar = findSimilarComponents(inv)
        if (similar.length > 0) {
          console.log(pc.dim(`  Did you mean: ${similar.join(', ')}?`))
        }
      })
    }
    process.exit(ExitCodes.INVALID_COMPONENT)
  }

  const plan = resolver.getInstallationPlan(valid)
  const alreadyInstalled = config.getInstalledComponents()
  const newComponents = plan.components.filter(c => !alreadyInstalled.includes(c))

  if (newComponents.length === 0) {
    if (options.json) {
      console.log(JSON.stringify({
        success: true,
        command: 'install',
        components: valid,
        message: 'All requested components are already installed'
      }))
    } else {
      console.log(pc.green('All requested components are already installed.'))
    }
    return
  }

  if (!options.yes && !options.json) {
    p.intro(pc.cyan('ui-lab install'))

    console.log()
    console.log(pc.bold('Installation plan:'))
    console.log()
    console.log(pc.dim('Components to configure:'))
    const newRequested = plan.requested.filter(c => !alreadyInstalled.includes(c))
    newRequested.forEach(c => {
      console.log(`  ${pc.green('+')} ${c}`)
    })

    const newDependencies = plan.dependencies.filter(c => !alreadyInstalled.includes(c))
    if (newDependencies.length > 0) {
      console.log()
      console.log(pc.dim('Dependencies:'))
      newDependencies.forEach(c => {
        console.log(`  ${pc.green('+')} ${c}`)
      })
    }

    if (plan.npmPackages.length > 0) {
      console.log()
      console.log(pc.dim('npm packages to install:'))
      plan.npmPackages.forEach(pkg => {
        if (typeof pkg === 'string') {
          console.log(`  ${pc.blue('+')} ${pkg}`)
        } else {
          const annotation = pkg.components ? ` (for ${pkg.components.join(', ')})` : ''
          console.log(`  ${pc.blue('+')} ${pkg.name}${annotation}`)
        }
      })
    }
    console.log()

    const confirm = await p.confirm({
      message: 'Proceed with installation?',
      initialValue: true
    })

    if (p.isCancel(confirm) || !confirm) {
      p.cancel('Installation cancelled.')
      process.exit(ExitCodes.GENERAL_ERROR)
    }
  }

  const installer = createInstaller({
    cwd,
    logger: { json: options.json, quiet: options.json },
    dryRun: options.dryRun
  })

  if (!options.json) {
    const spinner = p.spinner()
    spinner.start('Installing components...')

    const result = await installer.installComponents(valid)

    if (result.success) {
      spinner.stop('Components installed successfully!')
      printInstallSuccess(result)
    } else {
      spinner.stop('Installation failed')
      console.log(pc.red(`Error: ${result.error}`))
      process.exit(ExitCodes.GENERAL_ERROR)
    }
  } else {
    const result = await installer.installComponents(valid)
    console.log(JSON.stringify(result, null, 2))

    if (!result.success) {
      process.exit(ExitCodes.GENERAL_ERROR)
    }
  }
}

function printInstallSuccess(result: InstallResult) {
  console.log()
  console.log(pc.green('Components configured:'))
  result.resolvedDependencies.internalComponents.forEach(c => {
    console.log(`  ${pc.dim('•')} ${c}`)
  })

  if (result.resolvedDependencies.npmPackages.length > 0) {
    console.log()
    console.log(pc.green('npm packages:'))
    result.resolvedDependencies.npmPackages.forEach(p => {
      const annotation = p.components ? ` (${p.components.join(', ')})` : ''
      console.log(`  ${pc.dim('•')} ${p.name}${annotation}`)
    })
  }

  console.log()
  console.log(pc.cyan('Usage:'))
  result.importStatements.forEach(stmt => {
    console.log(pc.dim(`  ${stmt}`))
  })
  console.log()
}

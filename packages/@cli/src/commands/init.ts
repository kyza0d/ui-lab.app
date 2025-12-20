import * as p from '@clack/prompts'
import pc from 'picocolors'
import { createInstaller } from '../core/installer.js'
import { createConfigManager } from '../core/config-manager.js'
import type { ThemeMode, InitResult } from '../types/index.js'
import { ExitCodes } from '../types/index.js'
import { createProjectAnalyzer } from '../detectors/project-analyzer.js'
import { createNextJsScaffolder } from '../scaffolders/nextjs-scaffolder.js'
import { createViteScaffolder } from '../scaffolders/vite-scaffolder.js'
import { createInteractivePrompts } from '../initialization/interactive-prompts.js'
import { ensureDir, exists } from '../utils/file-utils.js'
import { isNextJsProject, updateTsconfigWithAliases, formatSelectedAliases, DEFAULT_ALIASES, type AliasDefinition } from '../config/alias-manager.js'
import path from 'node:path'

export interface InitOptions {
  yes?: boolean
  preset?: string
  json?: boolean
  framework?: string
  componentDir?: string
  globalCss?: string
  scaffold?: boolean
}

export async function initCommand(options: InitOptions): Promise<void> {
  const cwd = process.cwd()
  const config = createConfigManager(cwd)

  if (config.isInitialized()) {
    if (options.json) {
      console.log(
        JSON.stringify({
          success: false,
          command: 'init',
          error: 'Project is already initialized',
        })
      )
    } else {
      console.log(
        pc.yellow(
          'Project is already initialized. Run `ui-lab install` to add components.'
        )
      )
    }
    process.exit(ExitCodes.ALREADY_INITIALIZED)
  }

  // Analyze current project
  const analyzer = createProjectAnalyzer(cwd)
  let analysis = analyzer.analyze()

  // Show UI in interactive mode
  if (!options.json && !options.yes) {
    p.intro(pc.cyan('ui-lab init'))
  }

  // Handle headless mode
  if (options.yes) {
    return handleHeadlessInit(cwd, config, analysis, options)
  }

  // Interactive mode
  return handleInteractiveInit(cwd, config, analysis)
}

async function handleHeadlessInit(
  cwd: string,
  config: any,
  analysis: any,
  options: InitOptions
): Promise<void> {
  // Use environment variables or intelligent defaults
  const framework = options.framework || process.env.INIT_FRAMEWORK || 'nextjs'

  // Resolve component path in headless mode (no interactive prompts)
  let componentDir = options.componentDir || process.env.INIT_COMPONENT_DIR
  const userProvidedComponentDir = !!componentDir

  if (!componentDir) {
    // Auto-detect: use src/ if it exists, otherwise use root
    const srcExists_ = exists(path.join(cwd, 'src'))
    componentDir = srcExists_ ? 'src/components/ui' : 'components/ui'
  }

  const globalCssPath = options.globalCss || process.env.INIT_GLOBAL_CSS

  // Scaffold if needed
  if (!analysis.hasProject) {
    const spinner = p.spinner()
    spinner.start(`Scaffolding ${framework} project...`)

    try {
      const scaffolder =
        framework === 'vite'
          ? createViteScaffolder(cwd)
          : createNextJsScaffolder(cwd)

      const result = await scaffolder.scaffold()

      if (!result.success) {
        spinner.stop('Scaffolding failed')
        console.log(pc.red(`Error: ${result.error}`))
        process.exit(ExitCodes.SCAFFOLDING_FAILED)
      }

      spinner.stop('Project scaffolded successfully!')

      // Re-analyze after scaffolding
      const analyzer = createProjectAnalyzer(cwd)
      analysis = analyzer.analyze()

      // Re-detect componentDir after scaffolding if it was auto-detected
      // Always re-detect in headless mode since scaffolding creates src/
      if (!userProvidedComponentDir) {
        const srcExistsAfterScaffold = exists(path.join(cwd, 'src'))
        componentDir = srcExistsAfterScaffold ? 'src/components/ui' : 'components/ui'
      }
    } catch (error) {
      spinner.stop('Scaffolding failed')
      console.log(pc.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`))
      process.exit(ExitCodes.SCAFFOLDING_FAILED)
    }
  }

  // Determine paths - ensure componentDir is re-detected one final time if auto-detected
  if (!userProvidedComponentDir) {
    const srcExistsFinal = exists(path.join(cwd, 'src'))
    componentDir = srcExistsFinal ? 'src/components/ui' : 'components/ui'
  }

  const finalComponentDir = componentDir || analysis.paths.componentDir.recommended.path
  const finalGlobalCss = globalCssPath || analysis.paths.globalCss

  // Create directories
  ensureDir(path.join(cwd, path.dirname(finalComponentDir)))

  // Use defaults for remaining options
  const preset = options.preset ?? 'vitesse-dark'
  const mode: ThemeMode = preset.includes('light') ? 'light' : 'dark'
  const typescript = true
  const installationType: 'headless' | 'pre-packaged' = 'headless'

  // Create config
  const uiConfig = config.createDefaultConfig(
    preset,
    mode,
    typescript,
    installationType,
    framework as any,
    finalComponentDir,
    finalGlobalCss,
    '@/'
  )

  // Store the useSrc preference (detected from path structure and current directory state)
  const detectedUseSrc = finalComponentDir.startsWith('src/') || exists(path.join(cwd, 'src'))
  uiConfig.useSrc = detectedUseSrc

  config.write(uiConfig)

  // Apply path aliases for Next.js projects in headless mode
  if (isNextJsProject(cwd)) {
    const aliasResult = updateTsconfigWithAliases(cwd, DEFAULT_ALIASES)
    if (!aliasResult.success && !options.json) {
      console.log(pc.yellow(`⚠ Failed to configure aliases: ${aliasResult.error}`))
    }
  }

  // Run installer for theme generation
  const installer = createInstaller({
    cwd,
    logger: { json: true, quiet: true },
  })

  const result = await installer.init(preset, mode, typescript, installationType, true)

  if (options.json) {
    console.log(
      JSON.stringify(
        {
          ...result,
          framework,
          componentDir: finalComponentDir,
          globalCssPath: finalGlobalCss,
        },
        null,
        2
      )
    )
  }

  if (!result.success) {
    process.exit(ExitCodes.GENERAL_ERROR)
  }
}

async function handleInteractiveInit(
  cwd: string,
  config: any,
  analysis: any
): Promise<void> {
  const prompts = createInteractivePrompts()

  // Display framework detection
  prompts.displayFrameworkDetection(analysis.framework)

  // If no project, offer to scaffold
  if (!analysis.hasProject) {
    const shouldScaffold = await prompts.promptScaffoldDecision()

    if (shouldScaffold) {
      let framework = analysis.framework.framework || 'nextjs'

      // If no framework detected, ask user
      if (!analysis.framework.framework) {
        framework = await prompts.promptFrameworkChoice()
      }

      const spinner = p.spinner()
      spinner.start(`Scaffolding ${framework} project...`)

      try {
        const scaffolder =
          framework === 'vite'
            ? createViteScaffolder(cwd)
            : createNextJsScaffolder(cwd)

        const result = await scaffolder.scaffold()

        if (!result.success) {
          spinner.stop('Scaffolding failed')
          console.log(pc.red(`Error: ${result.error}`))
          process.exit(ExitCodes.SCAFFOLDING_FAILED)
        }

        spinner.stop('Project scaffolded successfully!')

        // Re-analyze after scaffolding
        const analyzer = createProjectAnalyzer(cwd)
        analysis = analyzer.analyze()
      } catch (error) {
        spinner.stop('Scaffolding failed')
        console.log(
          pc.red(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
        )
        process.exit(ExitCodes.SCAFFOLDING_FAILED)
      }
    }
  }

  // Resolve component path with user input if src/ exists
  // (Check AFTER potential scaffolding, since new projects are scaffolded with src/)
  let useSrc = false
  const srcExists_ = exists(path.join(cwd, 'src'))

  if (srcExists_) {
    useSrc = await prompts.promptUseSrc()
  }

  const resolvedPath = useSrc ? 'src/components/ui' : 'components/ui'

  // Collect settings
  const framework = analysis.framework.framework || 'nextjs'
  const componentDir = resolvedPath
  const globalCss = await prompts.promptGlobalCssPath(analysis.paths.globalCss)
  const preset = await prompts.promptPreset()
  const mode: ThemeMode = preset.includes('light') ? 'light' : 'dark'
  const typescript = await prompts.promptTypeScript(analysis.hasTypeScript)
  const installationType = await prompts.promptInstallationType()

  // Setup path aliases if it's a Next.js project
  let selectedAliases: AliasDefinition[] = []
  if (isNextJsProject(cwd)) {
    selectedAliases = await prompts.promptAliasSelection()
  }

  // Confirm
  const confirmSettings: Record<string, unknown> = {
    framework,
    'component-dir': componentDir,
    'global-css': globalCss,
    preset,
    typescript: typescript ? 'yes' : 'no',
    'install-type': installationType,
  }

  if (selectedAliases.length > 0) {
    confirmSettings['path-aliases'] = formatSelectedAliases(selectedAliases)
  }

  const confirmed = await prompts.promptConfirm(confirmSettings)

  if (!confirmed) {
    p.cancel('Operation cancelled.')
    process.exit(ExitCodes.GENERAL_ERROR)
  }

  // Create directories
  ensureDir(path.join(cwd, path.dirname(componentDir)))

  // Create config
  const uiConfig = config.createDefaultConfig(
    preset,
    mode,
    typescript,
    installationType,
    framework as any,
    componentDir,
    globalCss,
    '@/'
  )

  // Store the useSrc preference
  uiConfig.useSrc = useSrc

  config.write(uiConfig)

  // Apply path alias configuration to tsconfig.json
  if (selectedAliases.length > 0 && isNextJsProject(cwd)) {
    const aliasResult = updateTsconfigWithAliases(cwd, selectedAliases)
    if (!aliasResult.success) {
      console.log(pc.yellow(`⚠ Failed to configure aliases: ${aliasResult.error}`))
    }
  }

  // Run installer
  const spinner = p.spinner()
  spinner.start('Initializing project...')

  const installer = createInstaller({
    cwd,
    logger: { json: false, quiet: false },
  })

  const result = await installer.init(preset, mode, typescript, installationType, true)

  if (result.success) {
    spinner.stop('Project initialized successfully!')
    printInitSuccess(result)
  } else {
    spinner.stop('Initialization failed')
    console.log(pc.red(`Error: ${result.error}`))
    process.exit(ExitCodes.GENERAL_ERROR)
  }
}

function printInitSuccess(result: InitResult) {
  console.log()
  console.log(pc.green('Files created:'))
  result.filesCreated.forEach(f => {
    console.log(`  ${pc.dim('•')} ${f}`)
  })

  if (result.packagesInstalled.length > 0) {
    console.log()
    console.log(pc.green('Packages installed:'))
    result.packagesInstalled.forEach(p => {
      console.log(`  ${pc.dim('•')} ${p}`)
    })
  }

  console.log()
  console.log(pc.cyan('Next steps:'))
  result.nextSteps.forEach(step => {
    if (step.startsWith('  ')) {
      console.log(pc.dim(step))
    } else if (step === '') {
      console.log()
    } else {
      console.log(`  ${step}`)
    }
  })
  console.log()
}

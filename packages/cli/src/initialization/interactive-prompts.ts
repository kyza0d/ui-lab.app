import * as p from '@clack/prompts'
import pc from 'picocolors'
import type {
  Framework,
  FrameworkDetectionResult,
  PathDetectionResult,
} from '../types/index.js'
import { getPresetDisplayNames } from '../data/presets.js'
import { DEFAULT_ALIASES, type AliasDefinition } from '../config/alias-manager.js'

export interface InitPromptAnswers {
  shouldScaffold?: boolean
  frameworkChoice?: Framework
  framework: Framework
  componentDir: string
  globalCssPath: string
  preset: string
  typescript: boolean
  installationType: 'headless' | 'pre-packaged'
}

export class InteractivePrompts {
  async promptScaffoldDecision(): Promise<boolean> {
    const answer = await p.confirm({
      message: 'No project detected. Would you like to scaffold a new project?',
      initialValue: true,
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer
  }

  async promptFrameworkChoice(): Promise<Framework> {
    const answer = await p.select({
      message: 'Select a framework:',
      options: [
        { value: 'nextjs', label: 'Next.js 16+ (App Router)' },
        { value: 'vite', label: 'Vite + React' },
      ],
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer as Framework
  }

  displayFrameworkDetection(detection: FrameworkDetectionResult): void {
    if (detection.framework === null) {
      console.log(pc.yellow('⚠ No framework detected'))
      return
    }

    const emoji =
      detection.framework === 'nextjs' ? '⚡' : detection.framework === 'vite' ? '⚡' : '?'
    const confidence =
      detection.confidence === 'high'
        ? pc.green(detection.confidence)
        : detection.confidence === 'medium'
          ? pc.yellow(detection.confidence)
          : pc.red(detection.confidence)

    console.log()
    console.log(
      `${emoji} Detected framework: ${pc.cyan(detection.framework)} (${confidence})`
    )
    console.log()
  }

  async promptUseSrc(): Promise<boolean> {
    const answer = await p.confirm({
      message: 'Use the src/ directory for components?',
      initialValue: true,
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer
  }

  async promptComponentDir(paths: PathDetectionResult): Promise<string> {
    const defaultValue = paths.componentDir.recommended.path
    const suggestions = paths.componentDir.alternatives
      .slice(0, 2)
      .map(c => c.path)

    console.log(pc.gray(`  Recommended: ${defaultValue}`))
    if (suggestions.length > 0) {
      console.log(pc.gray(`  Alternatives: ${suggestions.join(', ')}`))
    }
    console.log()

    const answer = await p.text({
      message: 'Component directory:',
      placeholder: defaultValue,
      initialValue: defaultValue,
      validate: (value) => {
        if (!value.trim()) return 'Directory is required'
        return undefined
      },
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer
  }

  async promptGlobalCssPath(globalCss: string): Promise<string> {
    console.log(pc.gray(`  Default: ${globalCss}`))
    console.log()

    const answer = await p.text({
      message: 'Global CSS path:',
      placeholder: globalCss,
      initialValue: globalCss,
      validate: (value) => {
        if (!value.trim()) return 'Path is required'
        return undefined
      },
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer
  }

  async promptPreset(): Promise<string> {
    const presets = getPresetDisplayNames()

    const answer = await p.select({
      message: 'Select a theme preset:',
      options: presets.map(p => ({
        value: p.name,
        label: p.displayName,
      })),
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer as string
  }

  async promptTypeScript(defaultValue: boolean = true): Promise<boolean> {
    const answer = await p.confirm({
      message: 'Using TypeScript?',
      initialValue: defaultValue,
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer
  }

  async promptInstallationType(): Promise<'headless' | 'pre-packaged'> {
    const answer = await p.select({
      message: 'How would you like to install components?',
      options: [
        {
          value: 'headless',
          label: 'Headless - Install component source files',
        },
        {
          value: 'pre-packaged',
          label: 'Pre-packaged - Use ui-lab-components package',
        },
      ],
      initialValue: 'headless',
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer as 'headless' | 'pre-packaged'
  }

  async promptAliasSelection(): Promise<AliasDefinition[]> {
    console.log()
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

  async promptConfirm(settings: Record<string, unknown>): Promise<boolean> {
    console.log()
    console.log(pc.cyan('Configuration summary:'))
    for (const [key, value] of Object.entries(settings)) {
      console.log(pc.gray(`  ${key}: ${value}`))
    }
    console.log()

    const answer = await p.confirm({
      message: 'Proceed with initialization?',
      initialValue: true,
    })

    if (typeof answer === 'symbol') {
      p.cancel('Operation cancelled.')
      process.exit(1)
    }

    return answer
  }

  displaySuccess(message: string): void {
    console.log()
    console.log(pc.green(message))
    console.log()
  }

  displayNextSteps(steps: string[]): void {
    console.log(pc.cyan('Next steps:'))
    steps.forEach(step => {
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
}

export function createInteractivePrompts(): InteractivePrompts {
  return new InteractivePrompts()
}

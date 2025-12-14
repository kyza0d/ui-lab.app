import path from 'node:path'
import type {
  Framework,
  ConfidenceLevel,
  FrameworkDetectionResult,
  DetectionEvidence,
} from '../types/index.js'
import { exists, readJson } from '../utils/file-utils.js'

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export class FrameworkDetector {
  private cwd: string

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd
  }

  detect(): FrameworkDetectionResult {
    // Check environment variable override
    const envFramework = process.env.INIT_FRAMEWORK
    if (envFramework && this.isValidFramework(envFramework)) {
      return {
        framework: envFramework as Framework,
        confidence: 'env-override',
        score: 100,
        evidence: this.collectEvidence(),
      }
    }

    const evidence = this.collectEvidence()

    // Score both frameworks
    const nextScore = this.scoreNextJs(evidence)
    const viteScore = this.scoreVite(evidence)

    // Determine winner based on scores
    if (nextScore >= viteScore && nextScore > 0) {
      return {
        framework: 'nextjs',
        confidence: this.getConfidenceLevel(nextScore),
        score: nextScore,
        evidence,
      }
    } else if (viteScore > nextScore) {
      return {
        framework: 'vite',
        confidence: this.getConfidenceLevel(viteScore),
        score: viteScore,
        evidence,
      }
    }

    return {
      framework: null,
      confidence: 'none',
      score: 0,
      evidence,
    }
  }

  private collectEvidence(): DetectionEvidence {
    const pkgJsonPath = path.join(this.cwd, 'package.json')
    const pkgJson = readJson<PackageJson>(pkgJsonPath)

    return {
      packageJson: {
        exists: !!pkgJson,
        hasNext: this.hasDependency(pkgJson, 'next'),
        hasVite: this.hasDependency(pkgJson, 'vite'),
        nextVersion: this.getDependencyVersion(pkgJson, 'next'),
        viteVersion: this.getDependencyVersion(pkgJson, 'vite'),
      },
      configFiles: {
        nextConfig: this.findConfigFile('next.config'),
        viteConfig: this.findConfigFile('vite.config'),
      },
      directories: {
        hasAppDir: exists(path.join(this.cwd, 'app')),
        hasPagesDir: exists(path.join(this.cwd, 'pages')),
        hasSrcDir: exists(path.join(this.cwd, 'src')),
        hasMainEntry: this.hasMainEntry(),
      },
      tsconfig: this.analyzeTsConfig(),
    }
  }

  private hasDependency(
    pkgJson: PackageJson | null,
    packageName: string
  ): boolean {
    if (!pkgJson) return false

    return (
      (pkgJson.dependencies && packageName in pkgJson.dependencies) ||
      (pkgJson.devDependencies && packageName in pkgJson.devDependencies)
    )
  }

  private getDependencyVersion(
    pkgJson: PackageJson | null,
    packageName: string
  ): string | undefined {
    if (!pkgJson) return undefined

    return (
      pkgJson.dependencies?.[packageName] ||
      pkgJson.devDependencies?.[packageName]
    )
  }

  private findConfigFile(prefix: string): string | undefined {
    const extensions = ['.ts', '.js', '.mjs', '.cjs']

    for (const ext of extensions) {
      const filePath = path.join(this.cwd, `${prefix}${ext}`)
      if (exists(filePath)) {
        return filePath
      }
    }

    return undefined
  }

  private hasMainEntry(): boolean {
    const extensions = ['tsx', 'ts', 'jsx', 'js']

    for (const ext of extensions) {
      const mainPath = path.join(this.cwd, 'src', `main.${ext}`)
      if (exists(mainPath)) {
        return true
      }
    }

    return false
  }

  private analyzeTsConfig(): DetectionEvidence['tsconfig'] {
    const tsconfigPath = path.join(this.cwd, 'tsconfig.json')
    const tsconfig = readJson<Record<string, unknown>>(tsconfigPath)

    if (!tsconfig) {
      return {
        exists: false,
        hasNextPlugin: false,
      }
    }

    let hasNextPlugin = false
    let pathAliases: Record<string, string[]> | undefined

    // Check for Next.js plugin in compilerOptions.plugins
    const compilerOptions = tsconfig.compilerOptions as Record<string, unknown> | undefined
    if (compilerOptions) {
      const plugins = compilerOptions.plugins as Array<Record<string, unknown>> | undefined
      if (Array.isArray(plugins)) {
        hasNextPlugin = plugins.some(p => p.name === 'next')
      }

      // Extract path aliases
      const paths = compilerOptions.paths as Record<string, string[]> | undefined
      if (paths) {
        pathAliases = paths
      }
    }

    return {
      exists: true,
      hasNextPlugin,
      pathAliases,
    }
  }

  private scoreNextJs(evidence: DetectionEvidence): number {
    let score = 0

    // Package.json (40 points max)
    if (evidence.packageJson.hasNext) {
      score += 40
    }

    // Config file (30 points)
    if (evidence.configFiles.nextConfig) {
      score += 30
    }

    // Directory structure (20 points)
    if (evidence.directories.hasAppDir) {
      score += 15 // App Router
    } else if (evidence.directories.hasPagesDir) {
      score += 10 // Pages Router
    }

    // tsconfig.json Next.js plugin (10 points)
    if (evidence.tsconfig.hasNextPlugin) {
      score += 10
    }

    return Math.min(score, 100) // Cap at 100
  }

  private scoreVite(evidence: DetectionEvidence): number {
    let score = 0

    // Package.json (40 points max)
    if (evidence.packageJson.hasVite) {
      score += 40
    }

    // Config file (30 points)
    if (evidence.configFiles.viteConfig) {
      score += 30
    }

    // Main entry (20 points)
    if (evidence.directories.hasMainEntry) {
      score += 20
    }

    // index.html in root (10 points)
    const indexHtmlPath = path.join(this.cwd, 'index.html')
    if (exists(indexHtmlPath)) {
      score += 10
    }

    return Math.min(score, 100) // Cap at 100
  }

  private getConfidenceLevel(score: number): ConfidenceLevel {
    if (score >= 70) return 'high'
    if (score >= 40) return 'medium'
    if (score > 0) return 'low'
    return 'none'
  }

  private isValidFramework(framework: string): boolean {
    return ['nextjs', 'vite'].includes(framework)
  }
}

export function createFrameworkDetector(cwd?: string): FrameworkDetector {
  return new FrameworkDetector(cwd)
}

import path from 'node:path'
import type {
  Framework,
  DirectoryCandidate,
  ComponentDirResult,
  PathDetectionResult,
} from '../types/index.js'
import { exists, readJson } from '../utils/file-utils.js'

interface TsConfigCompilerOptions {
  paths?: Record<string, string[]>
}

interface TsConfig {
  compilerOptions?: TsConfigCompilerOptions
}

export class DirectoryDetector {
  private cwd: string

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd
  }

  detectPaths(framework: Framework | null): PathDetectionResult {
    const componentDir = this.detectComponentDir(framework)
    const globalCss = this.detectGlobalCssPath(framework)
    const tsconfigPath = path.join(this.cwd, 'tsconfig.json')
    const pathAlias = this.detectPathAlias(tsconfigPath)

    return {
      componentDir,
      globalCss,
      pathAlias,
      tsconfigPath: exists(tsconfigPath) ? tsconfigPath : undefined,
    }
  }

  private detectComponentDir(framework: Framework | null): ComponentDirResult {
    const candidates: DirectoryCandidate[] = []

    if (framework === 'nextjs') {
      // For Next.js, prefer src/components/ui if src/ exists
      if (this.srcExists()) {
        candidates.push({
          path: 'src/components/ui',
          priority: 90,
          exists: this.checkDirExists('src/components'),
          reason: 'Next.js with src/ (recommended)',
        })
      }

      candidates.push({
        path: 'components/ui',
        priority: 80,
        exists: this.checkDirExists('components'),
        reason: 'Next.js root components',
      })
    } else if (framework === 'vite') {
      // For Vite, prefer src/components
      candidates.push({
        path: 'src/components',
        priority: 90,
        exists: this.checkDirExists('src/components'),
        reason: 'Vite standard structure',
      })

      candidates.push({
        path: 'components',
        priority: 70,
        exists: this.checkDirExists('components'),
        reason: 'Vite root components',
      })
    } else {
      // Unknown framework - suggest both patterns
      candidates.push({
        path: 'src/components/ui',
        priority: 85,
        exists: this.checkDirExists('src/components'),
        reason: 'src/components/ui pattern',
      })

      candidates.push({
        path: 'components/ui',
        priority: 75,
        exists: this.checkDirExists('components'),
        reason: 'Root components/ui pattern',
      })

      candidates.push({
        path: 'src/components',
        priority: 80,
        exists: this.checkDirExists('src/components'),
        reason: 'src/components pattern',
      })

      candidates.push({
        path: 'components',
        priority: 70,
        exists: this.checkDirExists('components'),
        reason: 'Root components pattern',
      })
    }

    // Sort by: existing dirs first, then by priority
    candidates.sort((a, b) => {
      if (a.exists !== b.exists) return a.exists ? -1 : 1
      return b.priority - a.priority
    })

    // Remove duplicates while preserving order
    const uniqueCandidates = candidates.filter(
      (candidate, index, self) =>
        self.findIndex(c => c.path === candidate.path) === index
    )

    return {
      recommended: uniqueCandidates[0],
      alternatives: uniqueCandidates.slice(1),
      existing: uniqueCandidates.filter(c => c.exists),
    }
  }

  private detectGlobalCssPath(framework: Framework | null): string {
    const searchPaths: string[] = []

    if (framework === 'nextjs') {
      // Check App Router first
      if (this.checkDirExists('app')) {
        searchPaths.push('src/app/globals.css', 'app/globals.css')
      }

      // Check Pages Router
      if (this.checkDirExists('pages')) {
        searchPaths.push(
          'src/styles/globals.css',
          'styles/globals.css',
          'src/pages/globals.css',
          'pages/globals.css'
        )
      }

      // Defaults if no router detected
      if (this.srcExists()) {
        searchPaths.push('src/app/globals.css', 'src/styles/globals.css')
      }
      searchPaths.push('app/globals.css', 'styles/globals.css')
    } else if (framework === 'vite') {
      searchPaths.push('src/index.css', 'src/app.css', 'src/main.css', 'src/style.css')
    } else {
      // Unknown framework - suggest common paths
      searchPaths.push(
        'src/app/globals.css',
        'src/styles/globals.css',
        'src/index.css',
        'app/globals.css',
        'styles/globals.css'
      )
    }

    // Find first existing file
    for (const cssPath of searchPaths) {
      if (exists(path.join(this.cwd, cssPath))) {
        return cssPath
      }
    }

    // Return recommended path if none exist
    return searchPaths[0] ?? 'src/app/globals.css'
  }

  private detectPathAlias(tsconfigPath: string): string | undefined {
    const tsconfig = readJson<TsConfig>(tsconfigPath)

    if (!tsconfig?.compilerOptions?.paths) {
      return '@/'
    }

    const paths = tsconfig.compilerOptions.paths

    // Look for @/* pattern
    for (const [alias, pathArray] of Object.entries(paths)) {
      if (alias.endsWith('/*')) {
        const cleanAlias = alias.replace(/\/\*$/, '/')
        return cleanAlias
      }
    }

    // If no wildcard pattern found, return default
    return '@/'
  }

  private srcExists(): boolean {
    return exists(path.join(this.cwd, 'src'))
  }

  private checkDirExists(dirPath: string): boolean {
    return exists(path.join(this.cwd, dirPath))
  }
}

export function createDirectoryDetector(cwd?: string): DirectoryDetector {
  return new DirectoryDetector(cwd)
}

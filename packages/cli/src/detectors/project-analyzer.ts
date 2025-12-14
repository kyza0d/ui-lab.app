import path from 'node:path'
import type { ProjectAnalysisResult, MonorepoInfo } from '../types/index.js'
import { exists, readJson } from '../utils/file-utils.js'
import { FrameworkDetector } from './framework-detector.js'
import { DirectoryDetector } from './directory-detector.js'

interface PackageJson {
  name?: string
  workspaces?: string[]
}

export class ProjectAnalyzer {
  private cwd: string
  private frameworkDetector: FrameworkDetector
  private directoryDetector: DirectoryDetector

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd
    this.frameworkDetector = new FrameworkDetector(cwd)
    this.directoryDetector = new DirectoryDetector(cwd)
  }

  analyze(): ProjectAnalysisResult {
    const framework = this.frameworkDetector.detect()
    const paths = this.directoryDetector.detectPaths(framework.framework)
    const hasProject = this.checkProjectExists()
    const hasTypeScript = this.checkTypeScriptProject()
    const monorepo = this.detectMonorepo()

    return {
      hasProject,
      framework,
      paths,
      hasTypeScript,
      monorepo,
    }
  }

  private checkProjectExists(): boolean {
    const pkgJsonPath = path.join(this.cwd, 'package.json')
    return exists(pkgJsonPath)
  }

  private checkTypeScriptProject(): boolean {
    // Check for TypeScript files
    const tsConfigPath = path.join(this.cwd, 'tsconfig.json')
    if (exists(tsConfigPath)) {
      return true
    }

    // Check for TypeScript files in src directory
    const srcPath = path.join(this.cwd, 'src')
    if (exists(srcPath)) {
      // Simplified check - in reality would need to read directory
      return true
    }

    return false
  }

  private detectMonorepo(): MonorepoInfo {
    const cwd = this.cwd

    // Check for pnpm-workspace.yaml
    const pnpmWorkspacePath = path.join(cwd, 'pnpm-workspace.yaml')
    if (exists(pnpmWorkspacePath)) {
      return {
        isMonorepo: true,
        root: cwd,
        workspace: cwd,
      }
    }

    // Check for lerna.json
    const lernaJsonPath = path.join(cwd, 'lerna.json')
    if (exists(lernaJsonPath)) {
      return {
        isMonorepo: true,
        root: cwd,
        workspace: cwd,
      }
    }

    // Check for nx.json
    const nxJsonPath = path.join(cwd, 'nx.json')
    if (exists(nxJsonPath)) {
      return {
        isMonorepo: true,
        root: cwd,
        workspace: cwd,
      }
    }

    // Check package.json for workspaces
    const pkgJsonPath = path.join(cwd, 'package.json')
    const pkgJson = readJson<PackageJson>(pkgJsonPath)

    if (pkgJson?.workspaces) {
      return {
        isMonorepo: true,
        root: cwd,
        workspace: cwd,
      }
    }

    // Not a monorepo
    return {
      isMonorepo: false,
      root: cwd,
      workspace: cwd,
    }
  }
}

export function createProjectAnalyzer(cwd?: string): ProjectAnalyzer {
  return new ProjectAnalyzer(cwd)
}

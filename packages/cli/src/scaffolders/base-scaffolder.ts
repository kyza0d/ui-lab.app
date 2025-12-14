import path from 'node:path'
import type { Framework, ScaffoldResult } from '../types/index.js'
import { writeFile, ensureDir } from '../utils/file-utils.js'

export interface ScaffoldOptions {
  typescript?: boolean
  installDeps?: boolean
}

export abstract class BaseScaffolder {
  protected cwd: string

  constructor(cwd: string) {
    this.cwd = cwd
  }

  abstract scaffold(options: ScaffoldOptions): Promise<ScaffoldResult>

  protected writeTemplate(relativePath: string, content: string): boolean {
    const fullPath = path.join(this.cwd, relativePath)
    const dirPath = path.dirname(fullPath)

    // Ensure directory exists
    if (!ensureDir(dirPath)) {
      return false
    }

    return writeFile(fullPath, content)
  }

  protected getPackageJsonBase(name: string) {
    return {
      name,
      version: '0.1.0',
      private: true,
      packageManager: 'pnpm@10.21.0',
    }
  }

  protected getTsConfigBase() {
    return {
      compilerOptions: {
        target: 'ES2020',
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        module: 'ESNext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
      },
    }
  }
}

export function isBaseScaffolder(obj: any): obj is BaseScaffolder {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.scaffold === 'function'
  )
}

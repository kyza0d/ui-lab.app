import { spawn } from 'node:child_process'
import path from 'node:path'
import { exists, readJson } from '../utils/file-utils.js'
import type { PackageManager } from '../types/index.js'

export class PackageManagerService {
  private cwd: string
  private detected: PackageManager | null = null

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd
  }

  detect(): PackageManager {
    if (this.detected) return this.detected

    if (exists(path.join(this.cwd, 'pnpm-lock.yaml'))) {
      this.detected = 'pnpm'
    } else if (exists(path.join(this.cwd, 'bun.lockb'))) {
      this.detected = 'bun'
    } else if (exists(path.join(this.cwd, 'yarn.lock'))) {
      this.detected = 'yarn'
    } else if (exists(path.join(this.cwd, 'package-lock.json'))) {
      this.detected = 'npm'
    } else {
      const pkg = readJson<{ packageManager?: string }>(path.join(this.cwd, 'package.json'))
      if (pkg?.packageManager) {
        if (pkg.packageManager.startsWith('pnpm')) this.detected = 'pnpm'
        else if (pkg.packageManager.startsWith('yarn')) this.detected = 'yarn'
        else if (pkg.packageManager.startsWith('bun')) this.detected = 'bun'
        else this.detected = 'npm'
      } else {
        this.detected = 'npm'
      }
    }

    return this.detected
  }

  getInstallCommand(packages: string[], dev = false): { command: string; args: string[] } {
    const pm = this.detect()

    switch (pm) {
      case 'pnpm':
        return {
          command: 'pnpm',
          args: ['add', ...(dev ? ['-D'] : []), ...packages]
        }
      case 'yarn':
        return {
          command: 'yarn',
          args: ['add', ...(dev ? ['-D'] : []), ...packages]
        }
      case 'bun':
        return {
          command: 'bun',
          args: ['add', ...(dev ? ['-d'] : []), ...packages]
        }
      case 'npm':
      default:
        return {
          command: 'npm',
          args: ['install', ...(dev ? ['--save-dev'] : []), ...packages]
        }
    }
  }

  async install(packages: string[], options: { dev?: boolean } = {}): Promise<{ success: boolean; error?: string }> {
    const { command, args } = this.getInstallCommand(packages, options.dev)

    return new Promise((resolve) => {
      const child = spawn(command, args, {
        cwd: this.cwd,
        stdio: 'pipe',
        shell: true
      })

      let stderr = ''

      child.stderr?.on('data', (data) => {
        stderr += data.toString()
      })

      child.on('close', (code) => {
        if (code === 0) {
          resolve({ success: true })
        } else {
          resolve({ success: false, error: stderr || `Process exited with code ${code}` })
        }
      })

      child.on('error', (err) => {
        resolve({ success: false, error: err.message })
      })
    })
  }

  isInstalled(packageName: string): boolean {
    const pkg = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>(
      path.join(this.cwd, 'package.json')
    )
    if (!pkg) return false
    return !!(pkg.dependencies?.[packageName] || pkg.devDependencies?.[packageName])
  }

  getInstalledVersion(packageName: string): string | undefined {
    const pkg = readJson<{ dependencies?: Record<string, string>; devDependencies?: Record<string, string> }>(
      path.join(this.cwd, 'package.json')
    )
    if (!pkg) return undefined
    return pkg.dependencies?.[packageName] ?? pkg.devDependencies?.[packageName]
  }

  hasPackageJson(): boolean {
    return exists(path.join(this.cwd, 'package.json'))
  }
}

export function createPackageManager(cwd?: string): PackageManagerService {
  return new PackageManagerService(cwd)
}

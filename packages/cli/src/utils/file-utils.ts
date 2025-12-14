import fs from 'node:fs'
import path from 'node:path'

export function exists(filePath: string): boolean {
  return fs.existsSync(filePath)
}

export function readFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, 'utf-8')
  } catch {
    return null
  }
}

export function writeFile(filePath: string, content: string): boolean {
  try {
    const dir = path.dirname(filePath)
    if (!exists(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(filePath, content, 'utf-8')
    return true
  } catch {
    return false
  }
}

export function readJson<T>(filePath: string): T | null {
  const content = readFile(filePath)
  if (!content) return null
  try {
    return JSON.parse(content) as T
  } catch {
    return null
  }
}

export function writeJson(filePath: string, data: unknown, pretty = true): boolean {
  const content = pretty ? JSON.stringify(data, null, 2) + '\n' : JSON.stringify(data)
  return writeFile(filePath, content)
}

export function findUp(filename: string, startDir: string = process.cwd()): string | null {
  let dir = path.resolve(startDir)
  const root = path.parse(dir).root

  while (dir !== root) {
    const filePath = path.join(dir, filename)
    if (exists(filePath)) {
      return filePath
    }
    dir = path.dirname(dir)
  }

  const rootFile = path.join(root, filename)
  return exists(rootFile) ? rootFile : null
}

export function getProjectRoot(cwd: string = process.cwd()): string {
  const packageJson = findUp('package.json', cwd)
  return packageJson ? path.dirname(packageJson) : cwd
}

export function ensureDir(dirPath: string): boolean {
  try {
    if (!exists(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    return true
  } catch {
    return false
  }
}

export function isDirectory(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isDirectory()
  } catch {
    return false
  }
}

export function listFiles(dirPath: string, pattern?: RegExp): string[] {
  try {
    const files = fs.readdirSync(dirPath)
    if (pattern) {
      return files.filter(f => pattern.test(f))
    }
    return files
  } catch {
    return []
  }
}

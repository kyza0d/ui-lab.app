export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'
export type ThemeMode = 'light' | 'dark'
export type ShadeScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ColorRole = 'background' | 'foreground' | 'accent' | 'success' | 'danger' | 'warning' | 'info'

// Framework detection types
export type Framework = 'nextjs' | 'vite'
export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'none' | 'env-override'

export interface DetectionEvidence {
  packageJson: {
    exists: boolean
    hasNext: boolean
    hasVite: boolean
    nextVersion?: string
    viteVersion?: string
  }
  configFiles: {
    nextConfig?: string
    viteConfig?: string
  }
  directories: {
    hasAppDir: boolean
    hasPagesDir: boolean
    hasSrcDir: boolean
    hasMainEntry: boolean
  }
  tsconfig: {
    exists: boolean
    hasNextPlugin: boolean
    pathAliases?: Record<string, string[]>
  }
}

export interface FrameworkDetectionResult {
  framework: Framework | null
  confidence: ConfidenceLevel
  score: number
  evidence: DetectionEvidence
}

export interface DirectoryCandidate {
  path: string
  priority: number
  exists: boolean
  reason: string
}

export interface ComponentDirResult {
  recommended: DirectoryCandidate
  alternatives: DirectoryCandidate[]
  existing: DirectoryCandidate[]
}

export interface PathDetectionResult {
  componentDir: ComponentDirResult
  globalCss: string
  pathAlias?: string
  tsconfigPath?: string
}

export interface MonorepoInfo {
  isMonorepo: boolean
  root: string
  workspace: string
}

export interface ProjectAnalysisResult {
  hasProject: boolean
  framework: FrameworkDetectionResult
  paths: PathDetectionResult
  hasTypeScript: boolean
  monorepo: MonorepoInfo
}

export interface ScaffoldResult {
  success: boolean
  filesCreated: string[]
  framework: Framework
  error?: string
}

export interface OklchColor {
  l: number
  c: number
  h: number
}

export type ColorPalette = Record<ShadeScale, OklchColor>

export interface ThemePreset {
  name: string
  displayName: string
  mode: ThemeMode
  colors: {
    background: OklchColor
    foreground: OklchColor
    accent: OklchColor
  }
  semanticColors: {
    success: OklchColor
    danger: OklchColor
    warning: OklchColor
    info: OklchColor
  }
}

export interface UILabConfig {
  $schema?: string
  version: string
  theme: {
    preset: string
    mode: ThemeMode
  }
  typescript: boolean
  installationType: 'headless' | 'pre-packaged'
  installedComponents: string[]
  // New fields added in v2.0.0
  framework?: Framework
  componentDir?: string
  globalCssPath?: string
  pathAlias?: string
  // User preference for src/ directory usage
  useSrc?: boolean
}

export interface ComponentDeps {
  npm: string[]
  internal: string[]
}

export interface ResolvedDependencies {
  npmPackages: Array<{ name: string; version: string; components?: string[] }>
  internalComponents: string[]
  hasConflicts: boolean
  conflicts: ConflictInfo[]
}

export interface ConflictInfo {
  package: string
  versions: string[]
  resolution: string
}

export interface InstallResult {
  success: boolean
  command: 'install'
  components: string[]
  resolvedDependencies: ResolvedDependencies
  importStatements: string[]
  nextSteps: string[]
  error?: string
}

export interface InitResult {
  success: boolean
  command: 'init'
  theme: {
    preset: string
    mode: ThemeMode
  }
  filesCreated: string[]
  packagesInstalled: string[]
  nextSteps: string[]
  error?: string
}

export interface LoggerOptions {
  json?: boolean
  verbose?: boolean
  quiet?: boolean
}

export interface LogEntry {
  level: 'info' | 'success' | 'warn' | 'error'
  message: string
  data?: Record<string, unknown>
  timestamp: string
}

export interface FrameworkTemplate {
  name: string
  displayName: string
  description: string
  packageJson: {
    type?: 'module' | 'commonjs'
    scripts: Record<string, string>
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }
  tsconfig?: Record<string, any>
}

export interface TemplatesConfig {
  [key: string]: FrameworkTemplate
}

export interface ApplyTemplateResult {
  success: boolean
  message: string
  mergedPackageJson?: Record<string, any>
  error?: string
}

export const ExitCodes = {
  SUCCESS: 0,
  GENERAL_ERROR: 1,
  INVALID_COMPONENT: 2,
  DEPENDENCY_CONFLICT: 3,
  NOT_INITIALIZED: 4,
  ALREADY_INITIALIZED: 5,
  PACKAGE_MANAGER_ERROR: 6,
  FILE_SYSTEM_ERROR: 7,
  FRAMEWORK_DETECTION_FAILED: 8,
  AMBIGUOUS_FRAMEWORK: 9,
  SCAFFOLDING_FAILED: 11,
  PERMISSION_DENIED: 12,
} as const

export type ExitCode = (typeof ExitCodes)[keyof typeof ExitCodes]

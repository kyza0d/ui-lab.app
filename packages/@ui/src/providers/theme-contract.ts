export type ThemeMode = 'light' | 'dark'

export type ThemeTokenBatch = Record<string, string>

export interface ThemeStylesheetOptions {
  light?: ThemeTokenBatch
  dark?: ThemeTokenBatch
  defaultMode?: ThemeMode
  includeTailwindThemeInline?: boolean
}

const DEFAULT_DARK_VARIANT =
  '@custom-variant dark (&:where(.dark, .dark *, [data-theme="dark"], [data-theme="dark"] *));'

function ensureCssVariableName(token: string): string {
  return token.startsWith('--') ? token : `--${token}`
}

function stripCssVariablePrefix(token: string): string {
  return token.startsWith('--') ? token.slice(2) : token
}

export function normalizeThemeTokens(tokens: ThemeTokenBatch = {}): Record<`--${string}`, string> {
  const normalized = {} as Record<`--${string}`, string>

  Object.entries(tokens).forEach(([key, value]) => {
    const normalizedKey = ensureCssVariableName(key) as `--${string}`
    normalized[normalizedKey] = value
  })

  return normalized
}

export function applyThemeTokens(tokens: ThemeTokenBatch = {}, previousTokens?: ThemeTokenBatch): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  const nextTokens = normalizeThemeTokens(tokens)
  const previous = normalizeThemeTokens(previousTokens)

  Object.keys(previous).forEach((key) => {
    if (!(key in nextTokens)) {
      root.style.removeProperty(key)
    }
  })

  Object.entries(nextTokens).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

function renderCssVariables(tokens: Record<`--${string}`, string>, indent = '  '): string {
  return Object.entries(tokens)
    .map(([key, value]) => `${indent}${key}: ${value};`)
    .join('\n')
}

function collectTokenNames(...batches: Array<ThemeTokenBatch | undefined>): string[] {
  return [...new Set(
    batches.flatMap((batch) => Object.keys(normalizeThemeTokens(batch)).map(stripCssVariablePrefix))
  )].sort()
}

function renderTailwindAliases(tokenNames: string[]): string {
  return tokenNames
    .map((tokenName) => `  --color-${tokenName}: var(--${tokenName});`)
    .join('\n')
}

export function createThemeStylesheet(options: ThemeStylesheetOptions = {}): string {
  const light = normalizeThemeTokens(options.light)
  const dark = normalizeThemeTokens(options.dark)
  const tokenNames = collectTokenNames(options.light, options.dark)
  const includeTailwindThemeInline = options.includeTailwindThemeInline ?? true
  const defaultMode = options.defaultMode ?? 'light'
  const defaultTokens = defaultMode === 'dark' ? dark : light
  const alternateMode = defaultMode === 'dark' ? 'light' : 'dark'
  const alternateTokens = alternateMode === 'dark' ? dark : light

  const lines = [
    DEFAULT_DARK_VARIANT,
    '',
    ':root {',
    `  color-scheme: ${defaultMode};`,
    renderCssVariables(defaultTokens),
    '}',
  ]

  if (Object.keys(alternateTokens).length > 0) {
    lines.push(
      '',
      `:root[data-theme="${alternateMode}"] {`,
      `  color-scheme: ${alternateMode};`,
      renderCssVariables(alternateTokens),
      '}',
    )
  }

  if (includeTailwindThemeInline && tokenNames.length > 0) {
    lines.push(
      '',
      '@theme inline {',
      renderTailwindAliases(tokenNames),
      '}',
    )
  }

  return lines.join('\n')
}

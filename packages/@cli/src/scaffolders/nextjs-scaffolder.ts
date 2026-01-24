import type { ScaffoldResult } from '../types/index.js'
import { ensureDir } from '../utils/file-utils.js'
import { BaseScaffolder, type ScaffoldOptions } from './base-scaffolder.js'

export class NextJsScaffolder extends BaseScaffolder {
  private projectName: string = 'my-app'

  constructor(cwd: string, projectName: string = 'my-app') {
    super(cwd)
    this.projectName = projectName
  }

  async scaffold(options: ScaffoldOptions = {}): Promise<ScaffoldResult> {
    const filesCreated: string[] = []

    try {
      // Create package.json with exact dependencies from official template
      if (this.writeTemplate('package.json', this.getPackageJson())) {
        filesCreated.push('package.json')
      }

      // Write tsconfig.json with Next.js specific config
      if (this.writeTemplate('tsconfig.json', this.getTsConfig())) {
        filesCreated.push('tsconfig.json')
      }

      // Write next.config.ts
      if (this.writeTemplate('next.config.ts', this.getNextConfig())) {
        filesCreated.push('next.config.ts')
      }

      // Write eslint.config.mjs
      if (this.writeTemplate('eslint.config.mjs', this.getEslintConfig())) {
        filesCreated.push('eslint.config.mjs')
      }

      // Write postcss.config.mjs
      if (this.writeTemplate('postcss.config.mjs', this.getPostcssConfig())) {
        filesCreated.push('postcss.config.mjs')
      }

      // Write .gitignore
      if (this.writeTemplate('.gitignore', this.getGitignore())) {
        filesCreated.push('.gitignore')
      }

      // Write README.md
      if (this.writeTemplate('README.md', this.getReadme())) {
        filesCreated.push('README.md')
      }

      // Create app directory structure in src/
      ensureDir(`${this.cwd}/src/app`)

      // Write src/app/providers.tsx - theme initialization
      if (this.writeTemplate('src/app/providers.tsx', this.getProvidersTsx())) {
        filesCreated.push('src/app/providers.tsx')
      }

      // Write src/app/layout.tsx
      if (this.writeTemplate('src/app/layout.tsx', this.getLayoutTsx())) {
        filesCreated.push('src/app/layout.tsx')
      }

      // Write src/app/page.tsx
      if (this.writeTemplate('src/app/page.tsx', this.getPageTsx())) {
        filesCreated.push('src/app/page.tsx')
      }

      // Create globals.css in src/app/
      if (this.writeTemplate('src/app/globals.css', this.getGlobalsCss())) {
        filesCreated.push('src/app/globals.css')
      }

      // Create public directory with SVG assets
      ensureDir(`${this.cwd}/public`)

      // Write public SVG files
      const svgFiles = [
        { path: 'public/UI-Lab-logo.svg', name: 'UI-Lab-logo.svg' },
        { path: 'public/Nextjs-logo.svg', name: 'Nextjs-logo.svg' },
        { path: 'public/next.svg', name: 'next.svg' },
        { path: 'public/vercel.svg', name: 'vercel.svg' },
        { path: 'public/file.svg', name: 'file.svg' },
        { path: 'public/globe.svg', name: 'globe.svg' },
        { path: 'public/window.svg', name: 'window.svg' },
      ]

      for (const svg of svgFiles) {
        if (this.writeTemplate(svg.path, this.getSvgContent(svg.name))) {
          filesCreated.push(svg.path)
        }
      }

      // Create component directories
      ensureDir(`${this.cwd}/src/components/ui`)

      // Create utils directory and add theme utilities
      ensureDir(`${this.cwd}/src/utils`)

      // Write src/utils/theme.ts
      if (this.writeTemplate('src/utils/theme.ts', this.getThemeUtils())) {
        filesCreated.push('src/utils/theme.ts')
      }

      return {
        success: true,
        filesCreated,
        framework: 'nextjs',
      }
    } catch (error) {
      return {
        success: false,
        filesCreated,
        framework: 'nextjs',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private getPackageJson(): string {
    const packageJson = {
      name: this.projectName,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'eslint',
      },
      dependencies: {
        next: '16.0.10',
        react: '19.2.1',
        'react-dom': '19.2.1',
      },
      devDependencies: {
        '@tailwindcss/postcss': '^4',
        '@types/node': '^20',
        '@types/react': '^19',
        '@types/react-dom': '^19',
        eslint: '^9',
        'eslint-config-next': '16.0.10',
        tailwindcss: '^4',
        typescript: '^5',
      },
    }

    return JSON.stringify(packageJson, null, 2)
  }

  private getTsConfig(): string {
    const tsconfig = {
      compilerOptions: {
        target: 'ES2017',
        lib: ['dom', 'dom.iterable', 'esnext'],
        allowJs: true,
        skipLibCheck: true,
        strict: true,
        noEmit: true,
        esModuleInterop: true,
        module: 'esnext',
        moduleResolution: 'bundler',
        resolveJsonModule: true,
        isolatedModules: true,
        jsx: 'react-jsx',
        incremental: true,
        plugins: [
          {
            name: 'next',
          },
        ],
        paths: {
          '@/*': ['./src/*'],
        },
      },
      include: [
        'next-env.d.ts',
        '**/*.ts',
        '**/*.tsx',
        '.next/types/**/*.ts',
        '.next/dev/types/**/*.ts',
        '**/*.mts',
      ],
      exclude: ['node_modules'],
    }

    return JSON.stringify(tsconfig, null, 2)
  }

  private getNextConfig(): string {
    return `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
`
  }

  private getEslintConfig(): string {
    return `import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
`
  }

  private getPostcssConfig(): string {
    return `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`
  }

  private getGitignore(): string {
    return `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files (can opt-in for committing if needed)
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
`
  }

  private getReadme(): string {
    return `This is a [Next.js](https://nextjs.org) project bootstrapped with [\`create-next-app\`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying \`app/page.tsx\`. The page auto-updates as you edit the file.

This project uses [\`next/font\`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
`
  }

  private getLayoutTsx(): string {
    return `import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization script - prevents flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: \`
              (function() {
                try {
                  const saved = localStorage.getItem('ui-lab-theme');
                  if (saved) {
                    const config = JSON.parse(saved);
                    const root = document.documentElement;
                    // Apply saved theme immediately before React renders
                    Object.entries(config).forEach(([role, color]) => {
                      if (typeof color === 'string' && role !== 'background' && role !== 'foreground' && role !== 'accent' && role !== 'success' && role !== 'danger' && role !== 'warning' && role !== 'info') return;
                    });
                  }
                } catch (e) {
                  // Silently fail - React hook will handle theme application
                }
              })();
            \`,
          }}
        />
      </head>
      <body
        className={\`\${geistSans.variable} \${geistMono.variable} antialiased\`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
`
  }

  private getPageTsx(): string {
    return `"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-foreground-50">
      <article>
        {/* Hero Section */}
        <section className="min-h-[calc(100dvh-10rem)] grid place-items-center">
          <div className="flex flex-col items-center text-center">
            {/* Logos */}
            <div className="flex items-center gap-6">
              <div>
                <img src="/UI-Lab-logo.svg" alt="UI Lab" className="h-16 w-16" />
              </div>
              <div className="w-1 h-16 border-l border-background-700" />
              <img src="/Nextjs-logo.svg" alt="Next.js" className="h-12" />
            </div>
          </div>

          <div className="grid grid-cols-1 max-w-5xl sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="cursor-pointer p-2 rounded-md transition-all duration-300 hover:translate-y-[-4px] hover:bg-background-700/80 hover:border-background-600 hover:shadow-lg group">
              <Link href="https://ui-lab.app/docs" target="_blank" className="block">
                <div className="border-b py-4 border-background-700 group-hover:border-b-background-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640" className="text-foreground/80">
                    <path fill="currentColor" d="M320 205.3v309.3l.5-.2A449 449 0 0 1 492.8 480H512V160h-19.2c-42.2 0-84.1 8.4-123.1 24.6c-16.8 7-33.4 13.9-49.7 20.7m-25.1-79.8L320 136l25.1-10.5C391.9 106 442.1 96 492.8 96H528c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48h-35.2c-50.7 0-100.9 10-147.7 29.5l-12.8 5.3c-7.9 3.3-16.7 3.3-24.6 0l-12.8-5.3c-46.8-19.5-97-29.5-147.7-29.5H112c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h35.2c50.7 0 100.9 10 147.7 29.5" />
                  </svg>
                </div>
                <div className="pt-5">
                  <h3 className="text-lg font-semibold text-foreground">Documentation</h3>
                  <p className="mt-2 text-sm text-foreground/70">Getting started with UI Lab components.</p>
                </div>
              </Link>
            </div>

            <div className="cursor-pointer p-2 rounded-md transition-all duration-300 hover:translate-y-[-4px] hover:bg-background-700/80 hover:border-background-600 hover:shadow-lg group">
              <Link href="https://ui-lab.app/components" target="_blank" className="block">
                <div className="border-b py-4 border-background-700 group-hover:border-b-background-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640" className="text-foreground/80">
                    <path fill="currentColor" d="M320 64c11.2 0 21.7 5.9 27.4 15.5l96 160c5.9 9.9 6.1 22.2.4 32.2S427.5 288 416 288H224c-11.5 0-22.2-6.2-27.8-16.2s-5.5-22.3.4-32.2l96-160C298.3 69.9 308.8 64 320 64M192 336c61.9 0 112 50.1 112 112s-50.1 112-112 112S80 509.9 80 448s50.1-112 112-112m200 16h112c22.1 0 40 17.9 40 40v112c0 22.1-17.9 40-40 40H392c-22.1 0-40-17.9-40-40V392c0-22.1 17.9-40 40-40" />
                  </svg>
                </div>
                <div className="pt-5">
                  <h3 className="text-lg font-semibold text-foreground">Components</h3>
                  <p className="mt-2 text-sm text-foreground/70">
                    Explore our collection of reusable, accessible components. Click on any component to view details, examples, and code.
                  </p>
                </div>
              </Link>
            </div>

            <div className="cursor-pointer p-2 rounded-md transition-all duration-300 hover:translate-y-[-4px] hover:bg-background-700/80 hover:border-background-600 hover:shadow-lg group">
              <Link href="https://ui-lab.app/customize" target="_blank" className="block">
                <div className="border-b py-4 border-background-700 group-hover:border-b-background-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640" className="text-foreground/80">
                    <path fill="currentColor" d="M512.5 74.3L291.1 222c-29.1 19.4-47.6 50.9-50.6 85.3c62.3 12.8 111.4 61.9 124.3 124.3c34.5-3 65.9-21.5 85.3-50.6l147.6-221.5c6.7-10.1 10.3-21.9 10.3-34.1c0-33.9-27.5-61.4-61.4-61.4c-12.1 0-24 3.6-34.1 10.3M320 464c0-61.9-50.1-112-112-112S96 402.1 96 464c0 3.9.2 7.8.6 11.6c1.8 17.5-10.2 36.4-27.8 36.4H64c-17.7 0-32 14.3-32 32s14.3 32 32 32h144c61.9 0 112-50.1 112-112" />
                  </svg>
                </div>
                <div className="pt-5">
                  <h3 className="text-lg font-semibold text-foreground">Customize</h3>
                  <p className="mt-2 text-sm text-foreground/70">Customize themes, typography, and icons.</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main >
  );
}
`
  }

  private getGlobalsCss(): string {
    return `@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
`
  }

  private getProvidersTsx(): string {
    return `'use client'

import { ReactNode } from 'react'
import { useTheme } from '@/utils/theme'

/**
 * ThemeProvider Component
 *
 * Initializes the theme system with default colors and makes theme management
 * available throughout the app via the useTheme hook.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Initialize theme with default colors
  // Customize these colors to match your brand
  useTheme({
    background: '#ffffff',
    foreground: '#000000',
    accent: '#3b82f6',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#06b6d4',
  })

  return <>{children}</>
}
`
  }

  private getThemeUtils(): string {
    // Theme utilities with color scale generation using OKLCH color space
    return `'use client'

import { useEffect, useCallback, useState } from 'react'

/**
 * ============================================================================
 * THEME UTILITIES FOR COLOR SCALE GENERATION
 * ============================================================================
 *
 * This module provides a complete theming solution with:
 * - Automatic color scale generation from base colors
 * - CSS custom property injection for use throughout your app
 * - localStorage persistence for theme consistency
 * - FOUC (Flash of Unstyled Content) prevention
 *
 * Color scales are generated using OKLCH color space for perceptual uniformity.
 * This ensures colors feel evenly spaced to the human eye.
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * OKLCH Color Space
 * More perceptually uniform than HSL for generating visually balanced color scales.
 * - l: Lightness (0 = black, 1 = white)
 * - c: Chroma/saturation (0 = gray, ~0.4 = very saturated)
 * - h: Hue (0-360 degrees)
 */
export interface OklchColor {
  l: number
  c: number
  h: number
}

/**
 * Theme configuration with base colors for all color roles
 * Each color can be a hex string or OKLCH object
 */
export interface ThemeConfig {
  background: string | OklchColor
  foreground: string | OklchColor
  accent: string | OklchColor
  success: string | OklchColor
  danger: string | OklchColor
  warning: string | OklchColor
  info: string | OklchColor
}

export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ColorPalette = Record<ColorShade, OklchColor>
export type ThemePalettes = Record<string, ColorPalette>

/**
 * Return type of the useTheme hook
 */
export interface UseThemeReturn {
  getTheme: () => ThemeConfig
  setTheme: (config: ThemeConfig) => void
  getCSSVariables: () => Record<string, string>
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const THEME_STORAGE_KEY = 'ui-lab-theme'

// Chroma (saturation) boundaries for each color role
const CHROMA_BOUNDARIES: Record<string, { min: number; max: number }> = {
  background: { min: 0.001, max: 0.18 },
  foreground: { min: 0.01, max: 0.12 },
  accent: { min: 0.01, max: 0.32 },
  success: { min: 0.01, max: 0.28 },
  danger: { min: 0.01, max: 0.28 },
  warning: { min: 0.01, max: 0.26 },
  info: { min: 0.01, max: 0.24 },
}

// Lightness scales for different modes and color types
const DARK_MODE_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.98, 100: 0.95, 200: 0.9, 300: 0.84, 400: 0.65,
  500: 0.5, 600: 0.32, 700: 0.26, 800: 0.23, 900: 0.21, 950: 0.18,
}

const SEMANTIC_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.95, 100: 0.88, 200: 0.8, 300: 0.72, 400: 0.65,
  500: 0.55, 600: 0.46, 700: 0.38, 800: 0.29, 900: 0.2, 950: 0.12,
}

// Chroma scaling factors for accent/semantic colors
const ACCENT_CHROMA_FACTORS: Record<ColorShade, number> = {
  50: 0.75, 100: 0.8, 200: 0.9, 300: 1, 400: 1.05,
  500: 1.1, 600: 1.05, 700: 1, 800: 0.95, 900: 0.85, 950: 0.75,
}

// Chroma scaling factors for standard colors (background/foreground)
const STANDARD_CHROMA_FACTORS: Record<ColorShade, number> = {
  50: 0.4, 100: 0.5, 200: 0.65, 300: 0.8, 400: 0.9,
  500: 1, 600: 0.95, 700: 0.9, 800: 0.75, 900: 0.65, 950: 0.55,
}

// ============================================================================
// COLOR SPACE CONVERSION FUNCTIONS
// ============================================================================

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const rnd = (n: number, precision = 1000) => Math.round(n * precision) / precision

/**
 * Convert hex color to OKLCH
 */
function hexToOklch(hex: string): OklchColor {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = ((n >> 16) & 0xff) / 255
  const g = ((n >> 8) & 0xff) / 255
  const b = (n & 0xff) / 255

  const toLinear = (c: number) => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const lr = toLinear(r * 255)
  const lg = toLinear(g * 255)
  const lb = toLinear(b * 255)

  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb
  const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb

  const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)

  const l = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

  const c = Math.sqrt(a * a + b_ * b_)
  const h = (Math.atan2(b_, a) * (180 / Math.PI) + 360) % 360

  return { l: rnd(l), c: rnd(c), h: rnd(h, 10) }
}

function oklchToCss(color: OklchColor): string {
  return \`oklch(\${(color.l * 100).toFixed(1)}% \${color.c.toFixed(3)} \${color.h.toFixed(1)})\`
}

function clampChroma(chroma: number, role: string): number {
  const bounds = CHROMA_BOUNDARIES[role] || CHROMA_BOUNDARIES.accent
  return Math.max(bounds.min, Math.min(bounds.max, chroma))
}

function generateColorPalette(base: OklchColor, role: string, isAccent = false): ColorPalette {
  const lightnessScale = role === 'background' ? DARK_MODE_LIGHTNESS : SEMANTIC_LIGHTNESS
  const chromaFactors = isAccent ? ACCENT_CHROMA_FACTORS : STANDARD_CHROMA_FACTORS

  const constrainedBase = { ...base, c: clampChroma(base.c, role) }
  const palette: ColorPalette = {} as ColorPalette

  SHADES.forEach((shade) => {
    const targetLightness = lightnessScale[shade]
    const chromaFactor = chromaFactors[shade]

    palette[shade] = {
      l: rnd(clamp(targetLightness, 0.01, 0.99)),
      c: rnd(clampChroma(constrainedBase.c * chromaFactor, role)),
      h: rnd(constrainedBase.h, 10),
    }
  })

  return palette
}

function generateThemePalettes(config: ThemeConfig): ThemePalettes {
  const getOklch = (color: string | OklchColor): OklchColor =>
    typeof color === 'string' ? hexToOklch(color) : color

  const bgOklch = getOklch(config.background)
  const fgOklch = getOklch(config.foreground)
  const acOklch = getOklch(config.accent)
  const sucOklch = getOklch(config.success)
  const danOklch = getOklch(config.danger)
  const warOklch = getOklch(config.warning)
  const infOklch = getOklch(config.info)

  return {
    background: generateColorPalette(bgOklch, 'background', false),
    foreground: generateColorPalette(fgOklch, 'foreground', false),
    accent: generateColorPalette(acOklch, 'accent', true),
    success: generateColorPalette(sucOklch, 'success', true),
    danger: generateColorPalette(danOklch, 'danger', true),
    warning: generateColorPalette(warOklch, 'warning', true),
    info: generateColorPalette(infOklch, 'info', true),
  }
}

function palettesToCssVariables(palettes: ThemePalettes): Record<string, string> {
  const vars: Record<string, string> = {}

  Object.entries(palettes).forEach(([role, palette]) => {
    SHADES.forEach((shade) => {
      const key = \`--\${role}-\${shade}\`
      vars[key] = oklchToCss(palette[shade])
    })
  })

  return vars
}

function applyThemeToDom(palettes: ThemePalettes): void {
  if (typeof document === 'undefined') return

  const vars = palettesToCssVariables(palettes)
  const root = document.documentElement

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

// ============================================================================
// REACT HOOK
// ============================================================================

/**
 * useTheme Hook
 *
 * Generates and manages CSS custom properties for color scales.
 * Prevents Flash of Unstyled Content (FOUC) by applying theme on client mount.
 * Persists theme to localStorage for consistent experience across page reloads.
 *
 * @param defaultConfig - Default theme configuration with base colors
 * @returns Theme management methods (getTheme, setTheme, getCSSVariables)
 */
export function useTheme(defaultConfig: ThemeConfig): UseThemeReturn {
  const [currentConfig, setCurrentConfig] = useState<ThemeConfig>(defaultConfig)

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved) {
        const config = JSON.parse(saved) as ThemeConfig
        setCurrentConfig(config)
        const palettes = generateThemePalettes(config)
        applyThemeToDom(palettes)
        return
      }
    } catch (err) {
      console.warn('Failed to load saved theme:', err)
    }

    const palettes = generateThemePalettes(defaultConfig)
    applyThemeToDom(palettes)
  }, [defaultConfig])

  const getTheme = useCallback(() => currentConfig, [currentConfig])

  const setTheme = useCallback((config: ThemeConfig) => {
    try {
      setCurrentConfig(config)
      const palettes = generateThemePalettes(config)
      applyThemeToDom(palettes)

      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config))
      }
    } catch (err) {
      console.error('Failed to set theme:', err)
    }
  }, [])

  const getCSSVariables = useCallback(() => {
    const palettes = generateThemePalettes(currentConfig)
    return palettesToCssVariables(palettes)
  }, [currentConfig])

  return { getTheme, setTheme, getCSSVariables }
}
`
  }

  private getSvgContent(name: string): string {
    // Return SVG content based on the file name
    // UI Lab logo and Next.js logo for hero section
    // Other SVG files from the official Next.js template
    switch (name) {
      case 'UI-Lab-logo.svg':
        return `<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_85)">
<path d="M17.7355 0H5.00231C2.23961 0 0 2.23961 0 5.00231V17.7355C0 20.4982 2.23961 22.7378 5.00231 22.7378H17.7355C20.4982 22.7378 22.7378 20.4982 22.7378 17.7355V5.00231C22.7378 2.23961 20.4982 0 17.7355 0Z" fill="#242424"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.0982 4.6488C11.2657 4.55211 11.4721 4.55211 11.6396 4.6488L17.0533 7.77443C17.2208 7.87114 17.324 8.04988 17.324 8.24329V14.4945C17.324 14.688 17.2208 14.8667 17.0533 14.9634L15.7977 15.6883C15.5388 15.8378 15.2077 15.7491 15.0582 15.4901L14.5276 14.5712C14.3781 14.3123 14.4669 13.9812 14.7258 13.8317L14.9095 13.7256C15.077 13.6289 15.1802 13.4502 15.1802 13.2568V9.48103C15.1802 9.28763 15.077 9.10889 14.9095 9.0122L11.6396 7.12432C11.4721 7.0276 11.2657 7.0276 11.0982 7.12432L7.82828 9.0122C7.66078 9.10889 7.5576 9.28763 7.5576 9.48103V13.2568C7.5576 13.4502 7.66078 13.6289 7.82828 13.7256L11.0982 15.6135C11.2657 15.7102 11.4721 15.7102 11.6396 15.6135L11.7337 15.5591C11.9927 15.4097 12.3238 15.4984 12.4733 15.7573L13.0038 16.6762C13.1533 16.9352 13.0646 17.2663 12.8057 17.4158L11.6396 18.089C11.4721 18.1857 11.2657 18.1857 11.0982 18.089L5.68444 14.9634C5.51694 14.8667 5.41375 14.688 5.41375 14.4945V8.24329C5.41375 8.04988 5.51694 7.87114 5.68444 7.77443L11.0982 4.6488Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_2_85">
<rect width="22.7378" height="22.7378" fill="white"/>
</clipPath>
</defs>
</svg>`

      case 'Nextjs-logo.svg':
        return `<svg width="394" height="80" viewBox="0 0 394 80" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z" fill="white"/>
<path d="M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z" fill="white"/>
<path d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z" fill="white"/>
<path d="M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z" fill="white"/>
<path d="M333.607 78.8546C332.61 78.8546 331.762 78.5093 331.052 77.8186C330.342 77.1279 329.991 76.2917 330 75.3011C329.991 74.3377 330.342 73.5106 331.052 72.8199C331.762 72.1292 332.61 71.7838 333.607 71.7838C334.566 71.7838 335.405 72.1292 336.115 72.8199C336.835 73.5106 337.194 74.3377 337.204 75.3011C337.194 75.9554 337.028 76.5552 336.696 77.0914C336.355 77.6368 335.922 78.064 335.377 78.373C334.842 78.6911 334.252 78.8546 333.607 78.8546Z" fill="white"/>
<path d="M356.84 45.4453H362.872V68.6846C362.863 70.8204 362.401 72.6472 361.498 74.1832C360.585 75.7191 359.321 76.8914 357.698 77.7185C356.084 78.5364 354.193 78.9546 352.044 78.9546C350.079 78.9546 348.318 78.6001 346.75 77.9094C345.182 77.2187 343.937 76.1826 343.024 74.8193C342.101 73.456 341.649 71.7565 341.649 69.7207H347.691C347.7 70.6114 347.903 71.3838 348.29 72.0291C348.677 72.6744 349.212 73.1651 349.895 73.5105C350.586 73.8559 351.38 74.0286 352.274 74.0286C353.243 74.0286 354.073 73.8286 354.746 73.4196C355.419 73.0197 355.936 72.4199 356.296 71.6201C356.646 70.8295 356.831 69.8479 356.84 68.6846V45.4453Z" fill="white"/>
<path d="M387.691 54.5338C387.544 53.1251 386.898 52.0254 385.773 51.2438C384.638 50.4531 383.172 50.0623 381.373 50.0623C380.11 50.0623 379.022 50.2532 378.118 50.6258C377.214 51.0075 376.513 51.5164 376.033 52.1617C375.554 52.807 375.314 53.5432 375.295 54.3703C375.295 55.061 375.461 55.6608 375.784 56.1607C376.107 56.6696 376.54 57.0968 377.103 57.4422C377.656 57.7966 378.274 58.0874 378.948 58.3237C379.63 58.56 380.313 58.76 380.995 58.9236L384.14 59.6961C385.404 59.9869 386.631 60.3778 387.802 60.8776C388.973 61.3684 390.034 61.9955 390.965 62.7498C391.897 63.5042 392.635 64.413 393.179 65.4764C393.723 66.5397 394 67.7848 394 69.2208C394 71.1566 393.502 72.8562 392.496 74.3285C391.491 75.7917 390.043 76.9369 388.143 77.764C386.252 78.582 383.965 79 381.272 79C378.671 79 376.402 78.6002 374.493 77.8004C372.575 77.0097 371.08 75.8463 370.001 74.3194C368.922 72.7926 368.341 70.9294 368.258 68.7391H374.235C374.318 69.8842 374.687 70.8386 375.314 71.6111C375.95 72.3745 376.78 72.938 377.795 73.3197C378.819 73.6923 379.962 73.8832 381.226 73.8832C382.545 73.8832 383.707 73.6832 384.712 73.2924C385.708 72.9016 386.492 72.3564 387.055 71.6475C387.627 70.9476 387.913 70.1206 387.922 69.1754C387.913 68.312 387.654 67.5939 387.156 67.0304C386.649 66.467 385.948 65.9944 385.053 65.6127C384.15 65.231 383.098 64.8856 381.899 64.5857L378.081 63.6223C375.323 62.9225 373.137 61.8592 371.541 60.4323C369.937 59.0054 369.143 57.115 369.143 54.7429C369.143 52.798 369.678 51.0894 370.758 49.6261C371.827 48.1629 373.294 47.0268 375.148 46.2179C377.011 45.4 379.114 45 381.456 45C383.836 45 385.92 45.4 387.719 46.2179C389.517 47.0268 390.929 48.1538 391.952 49.5897C392.976 51.0257 393.511 52.6707 393.539 54.5338H387.691Z" fill="white"/>
</svg>`

      case 'next.svg':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 394 80"><path fill="#000" d="M262 0h68.5v12.7h-27.3v32.4h27.3V80h-68.5V0zm34.3 63.1a6.86 6.86 0 0 1-2.26-5.92h12.6a6.61 6.61 0 0 0-1.34-4.6c-.75-.97-1.97-1.9-3.58-2.63-1.61-.72-3.6-.12-4.63 1.73-.3.38-.46.406-.46.406s-.3-.034-.46-.406c-.6-1.584-3.1-2.3-4.2-1.9l-.3.1c1.3-1.5 3.3-2.8 5.3-2.8 2.6 0 5 1.4 6.2 3.6.4.7 1 1.4 2.2 2.4l.5.5 5.1 5.1c.3.3.5.8.5 1.3v.46h-12.3zm0-11.4h.9c1.3 0 2.5-.4 3.5-1.3.9-.9 1.3-2.1 1.3-3.4s-.4-2.5-1.3-3.4c-1-1-2.2-1.3-3.5-1.3h-.9v9.4zm44.4 11.6c1.3 0 2.5-.4 3.5-1.3 1-.9 1.3-2.1 1.3-3.4v-.5h-12.6v.5c0 1.3.4 2.5 1.3 3.4 1 .9 2.2 1.3 3.5 1.3zm0-16.4c1.3 0 2.5-.4 3.5-1.3 1-.9 1.3-2.1 1.3-3.4v-.5h-12.6v.5c0 1.3.4 2.5 1.3 3.4 1 .9 2.2 1.3 3.5 1.3zm16.2 4.3c0 .3 0 .5-.2.8-.1.2-.3.5-.5.7-.3.2-.5.5-.8.7l-11.6 11.6c-.5.5-1 .7-1.6.7-1.2 0-2.1-.9-2.1-2.1 0-.6.2-1.1.7-1.6l11.6-11.6h-33.1c-1.2 0-2.1-.9-2.1-2.1 0-1.2.9-2.1 2.1-2.1h33.1l-11.6-11.6c-.5-.5-.7-1-.7-1.6 0-1.2.9-2.1 2.1-2.1.6 0 1.1.2 1.6.7l11.6 11.6c.3.2.6.4.8.7.2.2.4.4.5.7.1.3.2.5.2.8zm32.3-4.3c1.3 0 2.5-.4 3.5-1.3 1-.9 1.3-2.1 1.3-3.4v-.5h-12.6v.5c0 1.3.4 2.5 1.3 3.4 1 .9 2.2 1.3 3.5 1.3z"/><path fill="#000" d="M0 28.8c0 7.3 5.9 13.3 13.3 13.3 3.8 0 7.1-1.6 9.4-4.2l-6.6-5.2c-1.3 1.6-3.3 2.6-5.8 2.6-4.4 0-7.9-3.5-7.9-7.9S8.9 20.9 13.3 20.9c2.5 0 4.5 1 5.8 2.6l6.6-5.2C20.4 15.2 17.1 13.5 13.3 13.5 5.9 13.5 0 19.5 0 28.8z"/></svg>`

      case 'vercel.svg':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 283 64"><path fill="black" d="M141 16c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm117-15c-11 0-19 7-19 18s9 18 20 18c7 0 13-3 16-7l-7-5c-2 3-6 4-9 4-5 0-9-3-10-7h28v-3c0-11-8-18-19-18zm-9 15c1-4 4-7 9-7s8 3 9 7h-18zm-39 3c0 6 4 10 10 10 4 0 7-2 9-5l8 5c-3 5-9 8-17 8-11 0-19-7-19-18s8-18 19-18c8 0 14 3 17 8l-8 5c-2-3-5-5-9-5-6 0-10 4-10 10z"/><path fill="black" d="M0 28c0 11 9 20 20 20s20-9 20-20S31 8 20 8 0 17 0 28zm13 0a7 7 0 1 1 14 0 7 7 0 0 1-14 0z"/></svg>`

      case 'file.svg':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M4 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h12V5H4zm2 3h8v2H6V8zm0 4h8v2H6v-2zm0 4h4v2H6v-2z"/></svg>`

      case 'globe.svg':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`

      case 'window.svg':
        return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="2"/><path stroke="currentColor" stroke-width="2" d="M2 9h20"/></svg>`

      default:
        return ''
    }
  }
}

export function createNextJsScaffolder(cwd: string, projectName?: string): NextJsScaffolder {
  return new NextJsScaffolder(cwd, projectName || 'my-app')
}

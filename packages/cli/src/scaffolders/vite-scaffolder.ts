import path from 'node:path'
import type { ScaffoldResult } from '../types/index.js'
import { ensureDir, writeFile } from '../utils/file-utils.js'
import { applyTemplate } from '../lib/apply-template.js'
import { BaseScaffolder, type ScaffoldOptions } from './base-scaffolder.js'

export class ViteScaffolder extends BaseScaffolder {
  async scaffold(options: ScaffoldOptions = {}): Promise<ScaffoldResult> {
    const filesCreated: string[] = []

    try {
      // Create base package.json with framework metadata
      const packageJsonPath = path.join(this.cwd, 'package.json')
      const basePackageJson = this.getPackageJsonBase('ui-lab-vite-app')
      if (writeFile(packageJsonPath, JSON.stringify(basePackageJson, null, 2))) {
        filesCreated.push('package.json')
      }

      // Apply Vite template configuration
      const templateResult = await applyTemplate('vite', packageJsonPath)
      if (!templateResult.success) {
        throw new Error(templateResult.error || 'Failed to apply Vite template')
      }

      // Write tsconfig.json
      if (this.writeTemplate('tsconfig.json', this.getTsConfig())) {
        filesCreated.push('tsconfig.json')
      }

      // Write vite.config.ts
      if (this.writeTemplate('vite.config.ts', this.getViteConfig())) {
        filesCreated.push('vite.config.ts')
      }

      // Write index.html
      if (this.writeTemplate('index.html', this.getIndexHtml())) {
        filesCreated.push('index.html')
      }

      // Create src directory structure
      ensureDir(`${this.cwd}/src`)
      ensureDir(`${this.cwd}/src/components`)

      // Write src/main.tsx
      if (this.writeTemplate('src/main.tsx', this.getMainTsx())) {
        filesCreated.push('src/main.tsx')
      }

      // Write src/App.tsx
      if (this.writeTemplate('src/App.tsx', this.getAppTsx())) {
        filesCreated.push('src/App.tsx')
      }

      // Write src/index.css
      if (this.writeTemplate('src/index.css', this.getIndexCss())) {
        filesCreated.push('src/index.css')
      }

      return {
        success: true,
        filesCreated,
        framework: 'vite',
      }
    } catch (error) {
      return {
        success: false,
        filesCreated,
        framework: 'vite',
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  private getTsConfig(): string {
    const tsconfig = {
      compilerOptions: {
        target: 'ES2020',
        useDefineForClassFields: true,
        lib: ['ES2020', 'DOM', 'DOM.Iterable'],
        module: 'ESNext',
        skipLibCheck: true,
        moduleResolution: 'bundler',
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: 'react-jsx',
        strict: true,
        noUnusedLocals: true,
        noUnusedParameters: true,
        noFallthroughCasesInSwitch: true,
        paths: {
          '@/*': ['./src/*'],
        },
      },
      include: ['src'],
      references: [{ path: './tsconfig.node.json' }],
    }

    return JSON.stringify(tsconfig, null, 2)
  }

  private getViteConfig(): string {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`
  }

  private getIndexHtml(): string {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>UI Lab Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  }

  private getMainTsx(): string {
    return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`
  }

  private getAppTsx(): string {
    return `export default function App() {
  return (
    <div>
      <h1>Welcome to UI Lab</h1>
      <p>Start building with ui-lab components</p>
    </div>
  )
}
`
  }

  private getIndexCss(): string {
    return `@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  border-color: hsl(var(--color-border));
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: hsl(var(--color-background));
  color: hsl(var(--color-foreground));
}
`
  }
}

export function createViteScaffolder(cwd: string): ViteScaffolder {
  return new ViteScaffolder(cwd)
}

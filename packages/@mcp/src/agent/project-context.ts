/**
 * Project Context Detector
 * Analyzes project structure and configuration to understand the project setup
 */

import * as fs from 'fs';
import * as path from 'path';

export interface UILabConfig {
  componentDir: string;
  globalCssPath: string;
  pathAlias: string;
  installedComponents: string[];
  themePreset?: string;
}

export type Framework = 'react' | 'next.js' | 'vue' | 'svelte' | 'other';
export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun';
export type BuildTool = 'vite' | 'webpack' | 'turbopack' | 'esbuild' | 'other';
export type CSSFramework = 'tailwind' | 'styled-components' | 'emotion' | 'sass' | 'postcss' | 'none';

export interface ProjectContext {
  rootDir: string;
  framework: Framework;
  packageManager: PackageManager;
  typescript: boolean;
  uiLabInitialized: boolean;
  uiLabConfig?: UILabConfig;
  buildTool: BuildTool;
  cssFramework: CSSFramework;
  nodeVersion?: string;
  packageJson?: Record<string, any>;
  tsConfigPath?: string;
  nextJsVersion?: string;
  reactVersion?: string;
  viteVersion?: string;
}

/**
 * Project Context Detector class
 */
export class ProjectContextDetector {
  private rootDir: string;

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }

  /**
   * Detect package manager
   */
  private detectPackageManager(): PackageManager {
    // Check for lock files
    if (fs.existsSync(path.join(this.rootDir, 'pnpm-lock.yaml'))) {
      return 'pnpm';
    }
    if (fs.existsSync(path.join(this.rootDir, 'yarn.lock'))) {
      return 'yarn';
    }
    if (fs.existsSync(path.join(this.rootDir, 'bun.lockb'))) {
      return 'bun';
    }
    // Default to npm
    return 'npm';
  }

  /**
   * Read package.json
   */
  private readPackageJson(): Record<string, any> | null {
    const packageJsonPath = path.join(this.rootDir, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return null;
    }

    try {
      const content = fs.readFileSync(packageJsonPath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  /**
   * Detect framework from dependencies
   */
  private detectFramework(packageJson: Record<string, any>): Framework {
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (deps['next']) {
      return 'next.js';
    }
    if (deps['react']) {
      return 'react';
    }
    if (deps['vue']) {
      return 'vue';
    }
    if (deps['svelte']) {
      return 'svelte';
    }

    return 'other';
  }

  /**
   * Detect build tool
   */
  private detectBuildTool(packageJson: Record<string, any>): BuildTool {
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (deps['vite']) {
      return 'vite';
    }
    if (deps['webpack']) {
      return 'webpack';
    }
    if (deps['turbopack']) {
      return 'turbopack';
    }
    if (deps['esbuild']) {
      return 'esbuild';
    }

    // Check for webpack in scripts
    const scripts = packageJson.scripts || {};
    if (Object.values(scripts).some((s) => typeof s === 'string' && s.includes('webpack'))) {
      return 'webpack';
    }

    return 'other';
  }

  /**
   * Detect CSS framework
   */
  private detectCSSFramework(packageJson: Record<string, any>): CSSFramework {
    const deps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (deps['tailwindcss']) {
      return 'tailwind';
    }
    if (deps['styled-components']) {
      return 'styled-components';
    }
    if (deps['@emotion/react']) {
      return 'emotion';
    }
    if (deps['sass'] || deps['node-sass']) {
      return 'sass';
    }

    // Check for Tailwind config file
    if (fs.existsSync(path.join(this.rootDir, 'tailwind.config.js')) ||
        fs.existsSync(path.join(this.rootDir, 'tailwind.config.ts'))) {
      return 'tailwind';
    }

    return 'none';
  }

  /**
   * Check if TypeScript is configured
   */
  private isTypeScriptConfigured(): boolean {
    return fs.existsSync(path.join(this.rootDir, 'tsconfig.json'));
  }

  /**
   * Check if UI Lab is initialized
   */
  private isUILabInitialized(): { initialized: boolean; config?: UILabConfig } {
    const configPath = path.join(this.rootDir, 'ui-lab.config.json');
    if (!fs.existsSync(configPath)) {
      return { initialized: false };
    }

    try {
      const configContent = fs.readFileSync(configPath, 'utf-8');
      const config = JSON.parse(configContent);
      return {
        initialized: true,
        config: {
          componentDir: config.componentDir || 'src/components/ui',
          globalCssPath: config.globalCssPath || 'src/app/globals.css',
          pathAlias: config.pathAlias || '@/',
          installedComponents: config.installedComponents || [],
          themePreset: config.themePreset,
        },
      };
    } catch {
      return { initialized: false };
    }
  }

  /**
   * Get React version
   */
  private getReactVersion(packageJson: Record<string, any>): string | undefined {
    const deps = packageJson.dependencies || {};
    return deps.react;
  }

  /**
   * Get Next.js version
   */
  private getNextJsVersion(packageJson: Record<string, any>): string | undefined {
    const deps = packageJson.dependencies || {};
    return deps.next;
  }

  /**
   * Get Vite version
   */
  private getViteVersion(packageJson: Record<string, any>): string | undefined {
    const deps = packageJson.devDependencies || {};
    return deps.vite;
  }

  /**
   * Main detect method
   */
  detect(): ProjectContext {
    const packageJson = this.readPackageJson();

    if (!packageJson) {
      // Return a basic context if no package.json found
      return {
        rootDir: this.rootDir,
        framework: 'other',
        packageManager: 'npm',
        typescript: this.isTypeScriptConfigured(),
        uiLabInitialized: false,
        buildTool: 'other',
        cssFramework: 'none',
      };
    }

    const framework = this.detectFramework(packageJson);
    const { initialized: uiLabInitialized, config: uiLabConfig } = this.isUILabInitialized();
    const typescript = this.isTypeScriptConfigured();

    return {
      rootDir: this.rootDir,
      framework,
      packageManager: this.detectPackageManager(),
      typescript,
      uiLabInitialized,
      uiLabConfig,
      buildTool: this.detectBuildTool(packageJson),
      cssFramework: this.detectCSSFramework(packageJson),
      packageJson,
      reactVersion: this.getReactVersion(packageJson),
      nextJsVersion: this.getNextJsVersion(packageJson),
      viteVersion: this.getViteVersion(packageJson),
      tsConfigPath: typescript ? path.join(this.rootDir, 'tsconfig.json') : undefined,
    };
  }

  /**
   * Static method for convenience
   */
  static detect(rootDir: string): ProjectContext {
    return new ProjectContextDetector(rootDir).detect();
  }

  /**
   * Get initialization guidance for UI Lab
   */
  static getInitializationGuidance(context: ProjectContext): string[] {
    const guidance: string[] = [];

    if (context.uiLabInitialized) {
      guidance.push('UI Lab is already initialized in this project.');
      return guidance;
    }

    guidance.push('UI Lab is not initialized. Here\'s what you need to do:');
    guidance.push('');
    guidance.push('1. Install the UI Lab CLI:');
    guidance.push(`   ${context.packageManager} install -D @ui-lab/cli`);
    guidance.push('');
    guidance.push('2. Initialize UI Lab:');

    if (context.framework === 'next.js') {
      guidance.push('   npx ui-lab init --framework next --type typescript');
    } else if (context.framework === 'react') {
      guidance.push('   npx ui-lab init --framework react --type typescript');
    } else {
      guidance.push('   npx ui-lab init');
    }

    guidance.push('');
    guidance.push('3. Follow the prompts to configure component directory and theme.');

    return guidance;
  }
}

export default ProjectContextDetector;

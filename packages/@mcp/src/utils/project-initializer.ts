/**
 * Project Initializer
 * Analyzes project structure and generates scaffolding code for theme setup
 */

import * as fs from 'fs';
import * as path from 'path';

export interface ProjectInitStatus {
  isInitialized: boolean;
  missingFiles: string[];
  missingSetup: string[];
  recommendations: string[];
  scaffoldingNeeded: {
    themeUtils: boolean;
    themeProvider: boolean;
    fouc: boolean;
    themeCss: boolean;
  };
}

export interface InitializationScript {
  files: Array<{
    path: string;
    content: string;
    description: string;
  }>;
  instructions: string[];
}

/**
 * Check if a project has the necessary theme initialization files
 */
export function analyzeProjectInitStatus(projectRoot: string): ProjectInitStatus {
  const status: ProjectInitStatus = {
    isInitialized: false,
    missingFiles: [],
    missingSetup: [],
    recommendations: [],
    scaffoldingNeeded: {
      themeUtils: true,
      themeProvider: true,
      fouc: true,
      themeCss: true,
    },
  };

  // Check for theme utilities file
  const themeUtilsPaths = [
    path.join(projectRoot, 'lib', 'theme-utils.ts'),
    path.join(projectRoot, 'lib', 'theme-utils.tsx'),
    path.join(projectRoot, 'src', 'lib', 'theme-utils.ts'),
    path.join(projectRoot, 'src', 'lib', 'theme-utils.tsx'),
  ];

  const hasThemeUtils = themeUtilsPaths.some((p) => fs.existsSync(p));
  if (!hasThemeUtils) {
    status.missingFiles.push('lib/theme-utils.ts');
    status.missingSetup.push('Theme utilities module for OKLCH color generation');
  } else {
    status.scaffoldingNeeded.themeUtils = false;
  }

  // Check for theme provider
  const providerPaths = [
    path.join(projectRoot, 'lib', 'theme-provider.tsx'),
    path.join(projectRoot, 'src', 'lib', 'theme-provider.tsx'),
    path.join(projectRoot, 'components', 'theme-provider.tsx'),
    path.join(projectRoot, 'src', 'components', 'theme-provider.tsx'),
  ];

  const hasProvider = providerPaths.some((p) => fs.existsSync(p));
  if (!hasProvider) {
    status.missingFiles.push('ThemeProvider component');
    status.missingSetup.push('Theme provider wrapper for root layout');
  } else {
    status.scaffoldingNeeded.themeProvider = false;
  }

  // Check for FOUC prevention in layout
  const layoutPaths = [
    path.join(projectRoot, 'app', 'layout.tsx'),
    path.join(projectRoot, 'src', 'app', 'layout.tsx'),
    path.join(projectRoot, 'pages', '_app.tsx'),
    path.join(projectRoot, 'src', 'pages', '_app.tsx'),
  ];

  let hasFoucScript = false;
  for (const layoutPath of layoutPaths) {
    if (fs.existsSync(layoutPath)) {
      try {
        const content = fs.readFileSync(layoutPath, 'utf-8');
        if (content.includes('ui-lab-theme')) {
          hasFoucScript = true;
          status.scaffoldingNeeded.fouc = false;
          break;
        }
      } catch {
        // Continue checking other paths
      }
    }
  }

  if (!hasFoucScript) {
    status.missingSetup.push('FOUC prevention script in layout file');
  }

  // Check for theme CSS in globals.css
  const globalsPath = [
    path.join(projectRoot, 'app', 'globals.css'),
    path.join(projectRoot, 'src', 'app', 'globals.css'),
    path.join(projectRoot, 'styles', 'globals.css'),
    path.join(projectRoot, 'src', 'styles', 'globals.css'),
  ];

  let hasThemeCss = false;
  for (const gPath of globalsPath) {
    if (fs.existsSync(gPath)) {
      try {
        const content = fs.readFileSync(gPath, 'utf-8');
        if (content.includes('@theme') && content.includes('--color-') && content.includes('oklch')) {
          hasThemeCss = true;
          status.scaffoldingNeeded.themeCss = false;
          break;
        }
      } catch {
        // Continue checking
      }
    }
  }

  if (!hasThemeCss) {
    status.missingSetup.push('Theme color variables in globals.css');
  }

  // Determine overall status
  status.isInitialized =
    hasThemeUtils && hasProvider && hasFoucScript && hasThemeCss;

  // Add recommendations
  if (!status.isInitialized) {
    status.recommendations.push(
      'Initialize UI Lab theme infrastructure before generating component designs'
    );
    if (status.scaffoldingNeeded.themeUtils) {
      status.recommendations.push(
        'Create lib/theme-utils.ts with OKLCH color generation utilities'
      );
    }
    if (status.scaffoldingNeeded.themeProvider) {
      status.recommendations.push(
        'Create ThemeProvider component and wrap your app root'
      );
    }
    if (status.scaffoldingNeeded.fouc) {
      status.recommendations.push(
        'Add FOUC prevention script to layout head to prevent flash of unstyled content'
      );
    }
    if (status.scaffoldingNeeded.themeCss) {
      status.recommendations.push(
        'Add @theme directive with color variables to globals.css'
      );
    }
  }

  return status;
}

/**
 * Generate theme provider component code
 */
export function generateThemeProvider(): string {
  return `'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { useTheme, type ThemeConfig } from './theme-utils'

interface ThemeContextType {
  theme: ThemeConfig | null
  setTheme: (config: ThemeConfig) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default theme configuration (OKLCH)
  const defaultConfig: ThemeConfig = {
    background: { l: 0.98, c: 0.001, h: 0 },
    foreground: { l: 0.15, c: 0.01, h: 0 },
    accent: { l: 0.55, c: 0.15, h: 250 },
    success: { l: 0.55, c: 0.12, h: 142 },
    danger: { l: 0.55, c: 0.11, h: 25 },
    warning: { l: 0.55, c: 0.11, h: 65 },
    info: { l: 0.55, c: 0.12, h: 255 },
  }

  const { getTheme, setTheme } = useTheme(defaultConfig)

  return (
    <ThemeContext.Provider value={{ theme: getTheme(), setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return context
}
`;
}

/**
 * Generate FOUC prevention script for layout
 */
export function generateFoucScript(): string {
  return `<script
    dangerouslySetInnerHTML={{
      __html: \`
  (function() {
    try {
      const saved = localStorage.getItem('ui-lab-theme-oklch');
      if (saved) {
        const config = JSON.parse(saved);
        const root = document.documentElement;

        // Convert OKLCH to CSS variable format
        const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
        const roles = ['background', 'foreground', 'accent', 'success', 'danger', 'warning', 'info'];

        // Generate color scales on the fly (same logic as useTheme hook)
        const DARK_MODE_LIGHTNESS = {
          50: 0.98, 100: 0.95, 200: 0.9, 300: 0.84, 400: 0.65,
          500: 0.5, 600: 0.32, 700: 0.26, 800: 0.23, 900: 0.21, 950: 0.18,
        };

        const SEMANTIC_LIGHTNESS = {
          50: 0.95, 100: 0.88, 200: 0.8, 300: 0.72, 400: 0.65,
          500: 0.55, 600: 0.46, 700: 0.38, 800: 0.29, 900: 0.2, 950: 0.12,
        };

        const ACCENT_CHROMA_FACTORS = {
          50: 0.75, 100: 0.8, 200: 0.9, 300: 1, 400: 1.05,
          500: 1.1, 600: 1.05, 700: 1, 800: 0.95, 900: 0.85, 950: 0.75,
        };

        const STANDARD_CHROMA_FACTORS = {
          50: 0.4, 100: 0.5, 200: 0.65, 300: 0.8, 400: 0.9,
          500: 1, 600: 0.95, 700: 0.9, 800: 0.75, 900: 0.65, 950: 0.55,
        };

        // Apply each color role
        roles.forEach(role => {
          const baseColor = config[role];
          if (!baseColor) return;

          const isAccent = ['accent', 'success', 'danger', 'warning', 'info'].includes(role);
          const lightnessScale = role === 'background' ? DARK_MODE_LIGHTNESS : SEMANTIC_LIGHTNESS;
          const chromaFactors = isAccent ? ACCENT_CHROMA_FACTORS : STANDARD_CHROMA_FACTORS;

          shades.forEach(shade => {
            const l = lightnessScale[shade];
            const chromaFactor = chromaFactors[shade];
            const c = baseColor.c * chromaFactor;
            const h = baseColor.h;

            const oklch = \`oklch(\${(l * 100).toFixed(1)}% \${c.toFixed(3)} \${h.toFixed(1)})\`;
            root.style.setProperty(\`--\${role}-\${shade}\`, oklch);
          });
        });
      }
    } catch (e) {
      // Silently fail - React hook will handle theme application
      console.warn('FOUC theme script failed:', e);
    }
  })();
\`
    }}
  />`;
}

/**
 * Generate initialization instructions
 */
export function generateInitializationInstructions(status: ProjectInitStatus): InitializationScript {
  const files: InitializationScript['files'] = [];
  const instructions: string[] = [];

  if (status.scaffoldingNeeded.themeUtils) {
    instructions.push(
      '1. Create lib/theme-utils.ts with theme utilities code'
    );
  }

  if (status.scaffoldingNeeded.themeProvider) {
    instructions.push(
      '2. Create lib/theme-provider.tsx with the ThemeProvider wrapper'
    );
  }

  if (status.scaffoldingNeeded.themeCss) {
    instructions.push(
      '3. Add @theme directive with color variables to app/globals.css'
    );
  }

  if (status.scaffoldingNeeded.fouc) {
    instructions.push(
      '4. Add FOUC prevention script to app/layout.tsx <head>'
    );
  }

  instructions.push('5. Wrap your app root with <ThemeProvider>');
  instructions.push(
    '6. Now you can generate UI Lab component designs with guaranteed theme support'
  );

  return { files, instructions };
}

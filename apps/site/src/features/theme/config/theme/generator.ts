import { generateColorPaletteVariables } from "../colors/generator";
import {
  generateTypographyCSS,
  generateLineHeightCSS,
} from "../typography/generator";
import { generateFontWeightCSS } from "../font-weight/generator";
import { generateRadiusScaleCSS, generateRadiusRootCSS, applyRadiusScalesToDOM } from "../radius/generator";
import { generateBorderWidthScaleCSS, applyBorderWidthScalesToDOM } from "../border-width/generator";
import { generateFluidSpacingCSS } from "../spacing/generator";
import { generateMaxWidthVariablesCSS, generateMaxWidthScaleCSS } from "../max-width/generator";
import { SEMANTIC_HTML_STYLES } from "../shared/constants";

export interface GeneratedThemeSetupFiles {
  themeCss: string
  globalsCss: string
  layoutTsx: string
  themeToggleTsx: string
  themeToggleModuleCss: string
  fullBundle: string
}

function renderCssVariables(variables: Record<string, string>): string {
  return Object.entries(variables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}

/**
 * Generates a complete @theme block with scaled radius and border-width values
 * @param radius - Base radius in rem (0 - 1.5)
 * @param borderWidth - Base border width in px (0 - 4)
 * @returns Formatted CSS string ready to copy/paste
 */
export function generateThemeConfig(
  radius: number,
  borderWidth: number,
): string {
  const radiusLines = generateRadiusScaleCSS(radius).split("\n");
  const borderLines = generateBorderWidthScaleCSS(borderWidth).split("\n");

  const css = `@theme {\n  /* Border Radius - customize as needed */\n${radiusLines.map((line) => line).join("\n")}\n\n  /* Border Width - customize as needed */\n${borderLines.map((line) => line).join("\n")}\n}`;

  return css;
}

/**
 * Applies dynamic theme scales to the DOM for radius and border-width only
 * Updates CSS variables for layout-related properties
 * @param radius - Base radius in rem (0 - 1.5)
 * @param borderWidth - Base border width in px (0 - 4)
 */
export function applyDynamicThemeScales(
  radius: number,
  borderWidth: number,
): void {
  applyRadiusScalesToDOM(radius);
  applyBorderWidthScalesToDOM(borderWidth);
}

/**
 * Generates a user-friendly message with instructions
 */
export function generateConfigMessage(
  radius: number,
  borderWidth: number,
): string {
  const config = generateThemeConfig(radius, borderWidth);

  return `${config}\n\n/* Usage Instructions:\n * 1. Copy the above configuration\n * 2. Open your project's src/app/globals.css\n * 3. Paste this @theme block (replacing or adding to your existing one)\n * 4. Use standard Tailwind utilities in your components:\n *    - rounded-md, rounded-md, rounded-full, etc.\n *    - border, border-2, border-4, etc.\n * All utilities will automatically respect your custom values.\n */`;
}

export function generateThemeSetupFiles(
  colors: any,
  mode: "light" | "dark",
  typeSizeRatio: number,
  fontSizeScale: number,
  fontWeightScale: number,
  headerFontWeightScale?: number,
  bodyFontWeightScale?: number,
  headerLineHeight?: number,
  bodyLineHeight?: number,
  radius?: number,
  borderWidth?: number,
  spacingScale?: number,
  maxWidthScale?: number,
): GeneratedThemeSetupFiles {
  const typographyCSS = generateTypographyCSS(typeSizeRatio, fontSizeScale);
  const leadingCSS = renderCssVariables(
    generateLineHeightCSS(headerLineHeight ?? 1.5, bodyLineHeight ?? 1.3),
  );
  const headerScale = headerFontWeightScale ?? fontWeightScale ?? 1;
  const bodyScale = bodyFontWeightScale ?? fontWeightScale ?? 1;
  const fontWeightCSS = generateFontWeightCSS(headerScale, bodyScale);
  const radiusCSS = generateRadiusScaleCSS(radius ?? 0.2);
  const radiusRootCSS = generateRadiusRootCSS(radius ?? 0.2);
  const borderWidthCSS = generateBorderWidthScaleCSS(borderWidth ?? 1);
  const spacingCSS = generateFluidSpacingCSS(spacingScale ?? 1);
  const maxWidthVariablesCSS = generateMaxWidthVariablesCSS(maxWidthScale ?? 1);
  const maxWidthUtilitiesCSS = generateMaxWidthScaleCSS(maxWidthScale ?? 1);
  const lightColorVariables = generateColorPaletteVariables(colors, "light");
  const darkColorVariables = generateColorPaletteVariables(colors, "dark");
  const defaultColorVariables = mode === "dark" ? darkColorVariables : lightColorVariables;
  const alternateMode = mode === "dark" ? "light" : "dark";
  const alternateColorVariables = alternateMode === "dark" ? darkColorVariables : lightColorVariables;

  const tokenNames = Array.from(
    new Set(
      [...Object.keys(lightColorVariables), ...Object.keys(darkColorVariables)]
        .map((name) => name.replace(/^--/, "")),
    ),
  );

  const themeInlineMapping = tokenNames
    .map((tokenName) => `  --color-${tokenName}: var(--${tokenName});`)
    .join("\n");

  const themeCss = `/* Default mode tokens live on :root. */
:root {
  color-scheme: ${mode};

${renderCssVariables(defaultColorVariables)}
}

/* Alternate mode tokens are activated by html[data-theme]. */
:root[data-theme='${alternateMode}'] {
  color-scheme: ${alternateMode};

${renderCssVariables(alternateColorVariables)}
}

/* Tailwind color utilities always point at the active tokens. */
@theme inline {
${themeInlineMapping}
}`;

  const globalsCss = `${radiusRootCSS}
@import "tailwindcss";
@import "./theme.css";
@import "ui-lab-components/styles.css";

@theme {
${typographyCSS}
${leadingCSS}

  --letter-spacing-tight: -0.01em;
  --letter-spacing-snug: -0.01em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;

${fontWeightCSS}

${spacingCSS}

${maxWidthVariablesCSS}

${radiusCSS}

${borderWidthCSS}
}

${maxWidthUtilitiesCSS}

@layer base {${SEMANTIC_HTML_STYLES}
}`;

  const layoutTsx = `import type { Metadata } from "next";
import { generateColorModeScript } from "ui-lab-components/theme-script";

import "./globals.css";

export const metadata: Metadata = {
  title: "My App",
  description: "My app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: generateColorModeScript() }} />
      </head>
      <body>{children}</body>
    </html>
  );
}`;

  const themeToggleTsx = `"use client";

import { FaMoon, FaSun } from "react-icons/fa6";
import { Button, useColorMode } from "ui-lab-components";

import styles from "./theme-toggle.module.css";

function ThemeToggleIcon() {
  return (
    <span aria-hidden="true" className={styles.icon}>
      <span className={\`\${styles.glyph} \${styles.moon}\`}>
        <FaMoon size={14} />
      </span>
      <span className={\`\${styles.glyph} \${styles.sun}\`}>
        <FaSun size={14} />
      </span>
    </span>
  );
}

export default function ThemeToggle() {
  const { toggleThemeMode } = useColorMode();

  return (
    <Button
      aria-label="Toggle color mode"
      onPress={toggleThemeMode}
      variant="ghost"
      icon={{
        left: <ThemeToggleIcon />,
      }}
      styles={{
        root: "p-2",
        icon: "text-current",
      }}
    />
  );
}`;

  const themeToggleModuleCss = `.icon {
  position: relative;
  display: block;
  width: 14px;
  height: 14px;
}

.glyph {
  position: absolute;
  inset: 0;
  align-items: center;
  justify-content: center;
}

.moon {
  display: inline-flex;
}

.sun {
  display: none;
}

:global(:root[data-theme="dark"]) .moon {
  display: none;
}

:global(:root[data-theme="dark"]) .sun {
  display: inline-flex;
}`;

  const fullBundle = `/* === app/theme.css === */
:root {
  color-scheme: ${mode};

${renderCssVariables(defaultColorVariables)}
}

:root[data-theme='${alternateMode}'] {
  color-scheme: ${alternateMode};

${renderCssVariables(alternateColorVariables)}
}

@theme inline {
${themeInlineMapping}
}

/* === app/globals.css === */
${globalsCss}

/* === app/layout.tsx === */
${layoutTsx}

/* === components/theme-toggle/index.tsx === */
${themeToggleTsx}

/* === components/theme-toggle/theme-toggle.module.css === */
${themeToggleModuleCss}`;

  return {
    themeCss,
    globalsCss,
    layoutTsx,
    themeToggleTsx,
    themeToggleModuleCss,
    fullBundle,
  };
}

/**
 * Generates a single bundled export containing every file required for the
 * current recommended theme setup.
 */
export function generateFullThemeConfig(
  colors: any,
  mode: "light" | "dark",
  typeSizeRatio: number,
  fontSizeScale: number,
  fontWeightScale: number,
  headerFontWeightScale?: number,
  bodyFontWeightScale?: number,
  headerLineHeight?: number,
  bodyLineHeight?: number,
  radius?: number,
  borderWidth?: number,
  spacingScale?: number,
  maxWidthScale?: number,
): string {
  return generateThemeSetupFiles(
    colors,
    mode,
    typeSizeRatio,
    fontSizeScale,
    fontWeightScale,
    headerFontWeightScale,
    bodyFontWeightScale,
    headerLineHeight,
    bodyLineHeight,
    radius,
    borderWidth,
    spacingScale,
    maxWidthScale,
  ).fullBundle
}

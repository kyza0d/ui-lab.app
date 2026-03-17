import { generateThemePalettes, paletteToCssVars } from "../../lib/color-utils";

function renderCssVariables(variables: Record<string, string>): string {
  return Object.entries(variables)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}

export function generateColorPaletteVariables(colors: any, mode: "light" | "dark"): Record<string, string> {
  const palettes = generateThemePalettes(
    colors.background,
    colors.foreground,
    colors.accent,
    mode,
    0,
    colors.semantic,
    colors.accentChromaLimit ?? 0.3,
    colors.accentEasing,
    colors.accentChromaScaling,
    colors.globalAdjustments,
  );

  const variables = {
    ...paletteToCssVars("background", palettes.background),
    ...paletteToCssVars("foreground", palettes.foreground),
    ...paletteToCssVars("accent", palettes.accent),
  };

  if (palettes.semantic) {
    Object.assign(
      variables,
      paletteToCssVars("success", palettes.semantic.success),
      paletteToCssVars("danger", palettes.semantic.danger),
      paletteToCssVars("warning", palettes.semantic.warning),
      paletteToCssVars("info", palettes.semantic.info),
    );
  }

  return variables;
}

function generateColorPaletteCSS(colors: any, mode: "light" | "dark"): string {
  return renderCssVariables(generateColorPaletteVariables(colors, mode));
}

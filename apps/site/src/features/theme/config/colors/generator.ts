export function generateColorPaletteCSS(colors: any, mode: "light" | "dark"): string {
  const {
    generateThemePalettes,
  } = require("../../lib/color-utils");

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
  );

  const lines: string[] = [];
  const paletteNames = ["background", "foreground", "accent"] as const;
  const semanticNames = ["success", "danger", "warning", "info"] as const;
  const shades = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ] as const;

  paletteNames.forEach((paletteName) => {
    const palette = palettes[paletteName];

    shades.forEach((shade) => {
      const color = palette[shade];
      if (color) {
        const oklchString = `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`;
        lines.push(
          `  --color-${paletteName}-${shade}: ${oklchString};`,
        );
      }
    });
  });

  if (palettes.semantic) {
    semanticNames.forEach((semanticName) => {
      const palette = palettes.semantic[semanticName];
      if (palette) {
        shades.forEach((shade) => {
          const color = palette[shade];
          if (color) {
            const oklchString = `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`;
            lines.push(
              `  --color-${semanticName}-${shade}: ${oklchString};`,
            );
          }
        });
      }
    });
  }

  return lines.join("\n");
}

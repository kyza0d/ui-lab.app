export function generateFontWeightCSS(
  headerFontWeightScale: number,
  bodyFontWeightScale: number,
): string {
  const weights = [
    { name: "thin", value: 100 },
    { name: "extralight", value: 200 },
    { name: "light", value: 300 },
    { name: "normal", value: 400 },
    { name: "medium", value: 500 },
    { name: "semibold", value: 600 },
    { name: "bold", value: 700 },
    { name: "extrabold", value: 800 },
    { name: "black", value: 900 },
  ];

  const lines: string[] = [];
  weights.forEach(({ name, value }) => {
    const headerScaled = value * headerFontWeightScale;
    const bodyScaled = value * bodyFontWeightScale;
    const headerClamped = Math.max(100, Math.min(900, Math.round(headerScaled)));
    const bodyClamped = Math.max(100, Math.min(900, Math.round(bodyScaled)));
    lines.push(`  --font-weight-header-${name}: ${headerClamped};`);
    lines.push(`  --font-weight-body-${name}: ${bodyClamped};`);
  });

  return lines.join("\n");
}

/**
 * Applies dynamic font weight scales to the DOM
 * Updates all --font-weight-header-* and --font-weight-body-* CSS variables
 * @param fontWeightScale - Font weight scale factor (for backward compatibility, unused if headerScale provided)
 * @param headerFontWeightScale - Header font weight scale factor (0.80 - 1.20)
 * @param bodyFontWeightScale - Body font weight scale factor (0.80 - 1.20)
 */
export function applyDynamicFontWeightScales(
  fontWeightScale?: number,
  headerFontWeightScale?: number,
  bodyFontWeightScale?: number,
): void {
  const root = document.documentElement;

  const baseFontWeightScale = [
    { name: "thin", value: 100 },
    { name: "extralight", value: 200 },
    { name: "light", value: 300 },
    { name: "normal", value: 400 },
    { name: "medium", value: 500 },
    { name: "semibold", value: 600 },
    { name: "bold", value: 700 },
    { name: "extrabold", value: 800 },
    { name: "black", value: 900 },
  ];

  const headerScale = headerFontWeightScale ?? fontWeightScale ?? 1;
  const bodyScale = bodyFontWeightScale ?? fontWeightScale ?? 1;

  baseFontWeightScale.forEach(({ name, value }) => {
    const headerScaled = value * headerScale;
    const bodyScaled = value * bodyScale;
    const headerClamped = Math.max(100, Math.min(900, Math.round(headerScaled)));
    const bodyClamped = Math.max(100, Math.min(900, Math.round(bodyScaled)));
    root.style.setProperty(`--font-weight-header-${name}`, headerClamped.toString());
    root.style.setProperty(`--font-weight-body-${name}`, bodyClamped.toString());
  });
}

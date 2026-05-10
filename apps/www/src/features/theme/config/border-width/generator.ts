import { getBorderWidthCssVariables } from "../shared/layout-variables";

export function generateBorderWidthScaleCSS(borderWidth: number): string {
  return Object.entries(getBorderWidthCssVariables(borderWidth))
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}

export function applyBorderWidthScalesToDOM(borderWidth: number): void {
  const root = document.documentElement;
  const vars = getBorderWidthCssVariables(borderWidth);

  Object.entries(vars).forEach(([varName, value]) => {
    root.style.setProperty(varName, value);
  });
}

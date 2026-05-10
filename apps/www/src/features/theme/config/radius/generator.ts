import { getRadiusCssVariables } from "../shared/layout-variables";

export function generateRadiusScaleCSS(radius: number): string {
  return Object.entries(getRadiusCssVariables(radius))
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}

export function generateRadiusRootCSS(radius: number): string {
  const lines: string[] = [":root {"];
  Object.entries(getRadiusCssVariables(radius)).forEach(([name, value]) => {
    if (name === "--radius-ratio") {
      return;
    }
    lines.push(`  ${name}: ${value};`);
  });
  lines.push("}");

  return lines.join("\n");
}

export function applyRadiusScalesToDOM(radius: number): void {
  const root = document.documentElement;
  const vars = getRadiusCssVariables(radius);

  Object.entries(vars).forEach(([varName, value]) => {
    root.style.setProperty(varName, value);
  });
}

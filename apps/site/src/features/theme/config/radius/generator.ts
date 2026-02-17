import { baseRadiusScale } from "./constants";

export function generateRadiusScaleCSS(radius: number): string {
  const baseRadiusRef = 0.2;
  const radiusScaleFactor = radius / baseRadiusRef;
  const lines: string[] = [];

  baseRadiusScale.forEach(({ name, value }) => {
    const scaledValue = value * radiusScaleFactor;
    const remValue =
      scaledValue > 100 ? "9999px" : `${scaledValue.toFixed(3)}rem`;
    lines.push(`  --radius-${name}: ${remValue};`);
  });

  lines.push(`  --radius-full: 9999px;`);
  lines.push(`  --radius-ratio: ${(radius / 0.2) * 0.5};`);

  return lines.join("\n");
}

export function generateRadiusRootCSS(radius: number): string {
  const baseRadiusRef = 0.2;
  const radiusScaleFactor = radius / baseRadiusRef;
  const lines: string[] = [":root {"];

  baseRadiusScale.forEach(({ name, value }) => {
    const scaledValue = value * radiusScaleFactor;
    const remValue =
      scaledValue > 100 ? "9999px" : `${scaledValue.toFixed(3)}rem`;
    lines.push(`  --radius-${name}: ${remValue};`);
  });

  lines.push(`  --radius-full: 9999px;`);
  lines.push("}");

  return lines.join("\n");
}

export function applyRadiusScalesToDOM(radius: number): void {
  const root = document.documentElement;

  const baseRadiusRef = 0.2;
  const radiusScaleFactor = radius / baseRadiusRef;

  baseRadiusScale.forEach(({ name, value }) => {
    const scaledValue = value * radiusScaleFactor;
    const remValue =
      scaledValue > 100 ? "9999px" : `${scaledValue.toFixed(3)}rem`;
    root.style.setProperty(`--radius-${name}`, remValue);
  });
  root.style.setProperty("--radius-full", "9999px");
  root.style.setProperty("--radius-ratio", String((radius / 0.2) * 0.5));
}

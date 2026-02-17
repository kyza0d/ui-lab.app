import { baseBorderScale } from "./constants";

export function generateBorderWidthScaleCSS(borderWidth: number): string {
  const baseBorderRef = 1;
  const borderScaleFactor = borderWidth / baseBorderRef;
  const lines: string[] = [];

  baseBorderScale.forEach(({ name, value }) => {
    const scaledValue = value * borderScaleFactor;
    lines.push(`  --border-width-${name}: ${scaledValue.toFixed(1)}px;`);
  });

  return lines.join("\n");
}

export function applyBorderWidthScalesToDOM(borderWidth: number): void {
  const root = document.documentElement;

  const baseBorderRef = 1;
  const borderScaleFactor = borderWidth / baseBorderRef;

  baseBorderScale.forEach(({ name, value }) => {
    const scaledValue = value * borderScaleFactor;
    const pxValue = `${scaledValue.toFixed(1)}px`;
    root.style.setProperty(`--border-width-${name}`, pxValue);
  });
}

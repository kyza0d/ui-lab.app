import { baseMaxWidth } from "./constants";

/**
 * Generates CSS variables for max-width scale using an exponential curve.
 * Variables calculate values dynamically based on --max-width-scale factor.
 */
export function generateMaxWidthVariablesCSS(scale: number): string {
  const lines: string[] = [];
  lines.push(`  --max-width-scale: ${scale}rem;`);
  lines.push("");
  baseMaxWidth.forEach(({ name, value }) => {
    lines.push(`  --max-w-${name}: calc(${value} * var(--max-width-scale));`);
  });
  return lines.join("\n");
}

/**
 * Generates @layer utilities with max-width utility classes.
 * Classes reference CSS variables for customization.
 */
export function generateMaxWidthScaleCSS(scale: number): string {
  const lines: string[] = ["@layer utilities {"];
  baseMaxWidth.forEach(({ name }) => {
    lines.push(`  .max-w-${name} { max-width: var(--max-w-${name}); }`);
  });
  lines.push("}");
  return lines.join("\n");
}

/**
 * Applies dynamic max-width scales to the DOM
 * @param scale - Max-width scale factor (e.g., 1 = 1rem base, 0.8 = 0.8rem base)
 */
export function applyMaxWidthScalesToDOM(scale: number): void {
  const root = document.documentElement;
  root.style.setProperty("--max-width-scale", `${scale}rem`);
}

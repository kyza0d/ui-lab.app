// Color conversion utilities
export interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
  a?: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
  a?: number;
}

/**
 * Convert hex color string to RGB
 * Supports #RGB, #RRGGBB, #RGBA, #RRGGBBAA formats
 */
export function hexToRgb(hex: string): RGB {
  hex = hex.replace(/^#/, "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const a =
    hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : undefined;

  return { r, g, b, a };
}

/**
 * Convert RGB to hex color string
 * Returns format: #RRGGBB or #RRGGBBAA (if alpha)
 */
export function rgbToHex(r: number, g: number, b: number, a?: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  if (a !== undefined) {
    return hex + toHex(a * 255);
  }

  return hex;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv(r: number, g: number, b: number): HSV {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

/**
 * Convert HSV to RGB
 */
export function hsvToRgb(h: number, s: number, v: number): RGB {
  h = h / 360;
  s = s / 100;
  v = v / 100;

  let r = 0;
  let g = 0;
  let b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Parse a color string (hex or rgb format) and return RGB object
 */
export function parseColor(
  color: string
): RGB & { format?: "hex" | "rgb" } {
  color = color.trim();

  if (color.startsWith("#")) {
    return { ...hexToRgb(color), format: "hex" };
  }

  if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match && match.length >= 3) {
      return {
        r: parseInt(match[0]),
        g: parseInt(match[1]),
        b: parseInt(match[2]),
        a: match.length === 4 ? parseInt(match[3]) / 255 : undefined,
        format: "rgb",
      };
    }
  }

  // Default to parsing as hex
  return { ...hexToRgb(color), format: "hex" };
}

/**
 * Format RGB color as hex string
 */
export function formatColorHex(r: number, g: number, b: number, a?: number): string {
  return rgbToHex(r, g, b, a);
}

/**
 * Format RGB color as RGB string
 */
export function formatColorRgb(
  r: number,
  g: number,
  b: number,
  a?: number
): string {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  if (a !== undefined && a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Recent colors management in localStorage
 */
const RECENT_COLORS_KEY = "ui-lab-recent-colors";
const MAX_RECENT_COLORS = 10;

export function getRecentColors(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(RECENT_COLORS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function addRecentColor(color: string): void {
  if (typeof window === "undefined") return;

  try {
    const recent = getRecentColors();
    const parsed = parseColor(color);
    const normalized = formatColorHex(parsed.r, parsed.g, parsed.b);

    // Remove if already in list
    const filtered = recent.filter((c) => c !== normalized);

    // Add to beginning
    const updated = [normalized, ...filtered].slice(0, MAX_RECENT_COLORS);

    localStorage.setItem(RECENT_COLORS_KEY, JSON.stringify(updated));
  } catch {
    // Silently fail if localStorage is not available
  }
}

/**
 * Validate color string
 */
export function isValidColor(color: string): boolean {
  const hex = /^#(?:[0-9a-f]{3}){1,2}(?:[0-9a-f]{2})?$/i;
  const rgb = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)$/i;

  return hex.test(color) || rgb.test(color);
}

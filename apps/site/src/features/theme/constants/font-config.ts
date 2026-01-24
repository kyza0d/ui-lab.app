export type FontKey = "Karla" | "Geist Sans" | "Inter" | "Work Sans" | "Ioskeley Mono" | "JetBrains Mono";
export type FontCategory = "sans" | "mono";

export interface FontMetrics {
  fontSizeScale: number;
  fontWeightScale: number;
  typeSizeRatio: number;
}

export interface FontConfig {
  name: FontKey;
  family: string;
  category: FontCategory;
  isDefault: boolean;
  metrics: FontMetrics;
}

export const SANS_FONTS: FontConfig[] = [
  {
    name: "Karla",
    family: '"Karla Variable", system-ui, sans-serif',
    category: "sans",
    isDefault: true,
    metrics: {
      fontSizeScale: 1,
      fontWeightScale: 1,
      typeSizeRatio: 1.2,
    },
  },
  {
    name: "Geist Sans",
    family: '"Geist Variable", system-ui, sans-serif',
    category: "sans",
    isDefault: false,
    metrics: {
      fontSizeScale: 1,
      fontWeightScale: 1,
      typeSizeRatio: 1.2,
    },
  },
  {
    name: "Inter",
    family: '"Inter Variable", system-ui, sans-serif',
    category: "sans",
    isDefault: false,
    metrics: {
      fontSizeScale: 0.95,
      fontWeightScale: 1.05,
      typeSizeRatio: 1.15,
    },
  },
  {
    name: "Work Sans",
    family: '"Work Sans Variable", system-ui, sans-serif',
    category: "sans",
    isDefault: false,
    metrics: {
      fontSizeScale: 1.05,
      fontWeightScale: 0.95,
      typeSizeRatio: 1.25,
    },
  },
];

export const MONO_FONTS: FontConfig[] = [
  {
    name: "Ioskeley Mono",
    family: '"Ioskeley Mono", monospace',
    category: "mono",
    isDefault: true,
    metrics: {
      fontSizeScale: 1,
      fontWeightScale: 1,
      typeSizeRatio: 1.2,
    },
  },
  {
    name: "JetBrains Mono",
    family: '"JetBrains Mono", monospace',
    category: "mono",
    isDefault: false,
    metrics: {
      fontSizeScale: 0.95,
      fontWeightScale: 1.05,
      typeSizeRatio: 1.15,
    },
  },
];

export function getFontConfig(name: FontKey, category: FontCategory): FontConfig | undefined {
  const fonts = category === "sans" ? SANS_FONTS : MONO_FONTS;
  return fonts.find((font) => font.name === name);
}

export function getDefaultSansFont(): FontConfig {
  return SANS_FONTS.find((f) => f.isDefault) || SANS_FONTS[0];
}

export function getDefaultMonoFont(): FontConfig {
  return MONO_FONTS.find((f) => f.isDefault) || MONO_FONTS[0];
}

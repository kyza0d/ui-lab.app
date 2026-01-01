import {
  type OklchColor,
  type SemanticColorType,
  type SemanticColorConfig,
  type SemanticColors,
} from "./color-utils";
import { themes } from "../constants/themes";

const DEFAULT_SEMANTIC_COLORS = themes["Vitesse"].dark.semantic!;

export function getSemanticColorSafely(
  semantic: SemanticColors | undefined,
  type: SemanticColorType,
  mode: "light" | "dark"
): OklchColor | null {
  if (!semantic || !semantic[type]) {
    const fallback = DEFAULT_SEMANTIC_COLORS[type];
    if (fallback && fallback[mode]?.color) {
      return fallback[mode].color;
    }
    return null;
  }

  const config = semantic[type];
  if (!config || !config[mode]?.color) {
    console.warn(
      `[SemanticColors] Missing color for ${type}.${mode}, using default`
    );
    return DEFAULT_SEMANTIC_COLORS[type][mode].color;
  }

  return config[mode].color;
}

export function getSemanticChromaLimit(
  semantic: SemanticColors | undefined,
  type: SemanticColorType,
  mode: "light" | "dark"
): number {
  if (!semantic || !semantic[type]) {
    return DEFAULT_SEMANTIC_COLORS[type][mode]?.chromaLimit ?? 0.025;
  }

  const config = semantic[type];
  return config[mode]?.chromaLimit ?? 0.025;
}

export function validateSemanticColorStructure(
  semantic: unknown
): SemanticColors | null {
  if (!semantic || typeof semantic !== "object") {
    return null;
  }

  const semanticObj = semantic as Record<string, unknown>;
  const result: Partial<SemanticColors> = {};
  const semanticTypes: SemanticColorType[] = [
    "success",
    "danger",
    "warning",
    "info",
  ];

  for (const type of semanticTypes) {
    if (!(type in semanticObj)) continue;

    const config = semanticObj[type];
    if (!config || typeof config !== "object") continue;

    const configObj = config as Record<string, unknown>;
    const light = configObj.light;
    const dark = configObj.dark;

    if (
      light &&
      typeof light === "object" &&
      (light as Record<string, unknown>).color
    ) {
      const lightConfig = light as Record<string, unknown>;
      const darkConfig = dark as Record<string, unknown>;

      result[type] = {
        light: {
          color: lightConfig.color as OklchColor,
          chromaLimit:
            (lightConfig.chromaLimit as number) ??
            DEFAULT_SEMANTIC_COLORS[type]?.light?.chromaLimit ??
            0.025,
        },
        dark: {
          color:
            (darkConfig?.color as OklchColor) ??
            DEFAULT_SEMANTIC_COLORS[type].dark.color,
          chromaLimit:
            (darkConfig?.chromaLimit as number) ??
            DEFAULT_SEMANTIC_COLORS[type]?.dark?.chromaLimit ??
            0.025,
        },
        hueRange: (configObj.hueRange as any) ?? undefined,
      };
    }
  }

  return Object.keys(result).length > 0 ? (result as SemanticColors) : null;
}

export function mergeSemanticColorsWithDefaults(
  loaded: SemanticColors | null | undefined
): SemanticColors {
  if (!loaded) {
    return DEFAULT_SEMANTIC_COLORS;
  }

  const semanticTypes: SemanticColorType[] = [
    "success",
    "danger",
    "warning",
    "info",
  ];
  const merged: SemanticColors = {
    success: loaded.success ?? DEFAULT_SEMANTIC_COLORS.success,
    danger: loaded.danger ?? DEFAULT_SEMANTIC_COLORS.danger,
    warning: loaded.warning ?? DEFAULT_SEMANTIC_COLORS.warning,
    info: loaded.info ?? DEFAULT_SEMANTIC_COLORS.info,
  };

  for (const type of semanticTypes) {
    const defaultConfig = DEFAULT_SEMANTIC_COLORS[type];
    const loadedConfig = loaded[type];

    if (loadedConfig) {
      merged[type] = {
        light: {
          color: loadedConfig.light?.color ?? defaultConfig.light.color,
          chromaLimit:
            loadedConfig.light?.chromaLimit ?? defaultConfig.light.chromaLimit,
        },
        dark: {
          color: loadedConfig.dark?.color ?? defaultConfig.dark.color,
          chromaLimit:
            loadedConfig.dark?.chromaLimit ?? defaultConfig.dark.chromaLimit,
        },
        hueRange: loadedConfig.hueRange ?? defaultConfig.hueRange,
      };
    }
  }

  return merged;
}

export function ensureSemanticColorIntegrity(
  semantic: SemanticColors | undefined
): SemanticColors {
  if (!semantic) {
    return DEFAULT_SEMANTIC_COLORS;
  }

  const validated = validateSemanticColorStructure(semantic);
  if (!validated) {
    console.warn(
      "[SemanticColors] Semantic colors failed validation, using defaults"
    );
    return DEFAULT_SEMANTIC_COLORS;
  }

  return mergeSemanticColorsWithDefaults(validated);
}

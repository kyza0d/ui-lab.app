"use client";

import { useState, useCallback, useEffect } from "react";
import type { FontKey } from "@/features/theme/constants/font-config";
import { SANS_FONTS } from "@/features/theme/constants/font-config";
import type { FontDevMetrics, FontDevConfigMap } from "../lib/types";
import { getDefaultMetrics } from "../lib/font-config-storage";

export function useFontConfigurations() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFont, setSelectedFont] = useState<FontKey>("Karla");
  const [configs, setConfigs] = useState<FontDevConfigMap>({} as FontDevConfigMap);

  useEffect(() => {
    const initialConfigs: FontDevConfigMap = {} as FontDevConfigMap;
    SANS_FONTS.forEach((font) => {
      initialConfigs[font.name] = getDefaultMetrics(font.name);
    });
    setConfigs(initialConfigs);
    setIsLoading(false);
  }, []);

  const updateFontMetric = useCallback(
    (fontName: FontKey, key: keyof FontDevMetrics, value: number) => {
      setConfigs((prev) => ({
        ...prev,
        [fontName]: {
          ...prev[fontName],
          [key]: value,
        },
      }));
    },
    [],
  );

  const switchFont = useCallback((fontName: FontKey) => {
    setSelectedFont(fontName);
  }, []);

  const resetFont = useCallback((fontName: FontKey) => {
    const defaults = getDefaultMetrics(fontName);
    setConfigs((prev) => ({
      ...prev,
      [fontName]: defaults,
    }));
  }, []);

  const getCurrentConfig = useCallback((): FontDevMetrics => {
    return configs[selectedFont] || getDefaultMetrics(selectedFont);
  }, [configs, selectedFont]);

  return {
    isLoading,
    selectedFont,
    configs,
    currentConfig: getCurrentConfig(),
    switchFont,
    updateFontMetric,
    resetFont,
  };
}

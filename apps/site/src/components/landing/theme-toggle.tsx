"use client";
import { useEffect, useState } from "react";
import { themes } from "@/constants/themes";
import { generateThemePalettes, paletteToCssVars } from "@/lib/color-utils";
import { cachePalette } from "@/lib/palette-cache";
import { type SimpleThemeColors } from "@/constants/themes";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useHeader } from "@/lib/header-context";

export const LandingThemeToggle = () => {
  const { currentThemeMode, setCurrentThemeMode, currentThemeColors, setCurrentThemeColors, isThemeInitialized } = useHeader();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isThemeInitialized && currentThemeColors) {
      applyTheme(currentThemeColors, currentThemeMode);
    }
  }, [isThemeInitialized]);

  const applyTheme = (colors: SimpleThemeColors, mode: "light" | "dark") => {
    // Generate complete color palettes including semantic colors
    const palettes = generateThemePalettes(
      colors.background,
      colors.foreground,
      colors.accent,
      mode,
      0,
      colors.semantic,
      colors.accentChromaLimit ?? 0.30,
      colors.accentEasing,
      colors.accentChromaScaling
    );

    // Convert palettes to CSS variables
    const bgVars = paletteToCssVars("background", palettes.background);
    const fgVars = paletteToCssVars("foreground", palettes.foreground);
    const accentVars = paletteToCssVars("accent", palettes.accent);

    let allColorVars = { ...bgVars, ...fgVars, ...accentVars };

    // Add semantic colors if available
    if (palettes.semantic) {
      const successVars = paletteToCssVars("success", palettes.semantic.success);
      const dangerVars = paletteToCssVars("danger", palettes.semantic.danger);
      const warningVars = paletteToCssVars("warning", palettes.semantic.warning);
      const infoVars = paletteToCssVars("info", palettes.semantic.info);

      allColorVars = { ...allColorVars, ...successVars, ...dangerVars, ...warningVars, ...infoVars };
    }

    // Apply CSS variables
    Object.entries(allColorVars).forEach(([varName, value]) => {
      document.documentElement.style.setProperty(varName, value);
    });

    // Cache the palette for instant load on refresh
    cachePalette(colors, allColorVars, mode);

    // Set data-theme attribute for CSS
    document.documentElement.setAttribute("data-theme", mode);
  };

  const toggleTheme = () => {
    const nextMode = currentThemeMode === "light" ? "dark" : "light";
    // Use current colors (from cache via context), fallback to defaults
    const colors = currentThemeColors || themes["Vitesse"][nextMode];

    setCurrentThemeMode(nextMode);
    setCurrentThemeColors(colors);
    applyTheme(colors, nextMode);
  };

  if (!isClient) {
    return (
      <button
        className="z-[250] cursor-pointer mr-2 rounded-xl hover:bg-theme-border/30 p-2"
        aria-label="Switch theme"
      >
        <FaMoon />
      </button>
    );
  }

  const nextMode = currentThemeMode === "light" ? "dark" : "light";

  return (
    <button
      onClick={toggleTheme}
      className="z-[250] cursor-pointer mr-4 rounded-xl hover:bg-theme-border/30 p-2"
      aria-label={`Switch to ${nextMode} theme`}
      title={`Current: ${currentThemeMode} → Next: ${nextMode}`}
    >
      {currentThemeMode === "light" ? (
        <FaMoon />
      ) : (
        <FaSun />
      )}
    </button>
  );
};

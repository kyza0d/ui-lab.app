"use client";
import { useEffect, useState } from "react";
import { themes } from "@/constants/themes";
import { FaMoon, FaSun } from "react-icons/fa6";
import { useHeader } from "@/lib/header-context";
import { useThemeStorage } from "@/hooks/use-theme-storage";

export const LandingThemeToggle = () => {
  const { currentThemeMode, setCurrentThemeMode, currentThemeColors, setCurrentThemeColors, isThemeInitialized } = useHeader();
  const [isClient, setIsClient] = useState(false);

  const { applyAndPersistColors, applyAndPersistMode } = useThemeStorage({
    onColorsChange: setCurrentThemeColors,
    onModeChange: setCurrentThemeMode,
    currentThemeMode,
  });

  useEffect(() => { setIsClient(true); }, []);

  useEffect(() => {
    if (isThemeInitialized && currentThemeColors) {
      applyAndPersistColors(currentThemeColors);
    }
  }, [isThemeInitialized]);

  const toggleTheme = () => {
    const nextMode = currentThemeMode === "light" ? "dark" : "light";
    const colors = currentThemeColors || themes["Vitesse"][nextMode];
    setCurrentThemeMode(nextMode);
    setCurrentThemeColors(colors);
    applyAndPersistMode(nextMode);
    applyAndPersistColors(colors);
  };

  if (!isClient) {
    return (
      <button className="z-[250] cursor-pointer mr-2 rounded-xl hover:bg-theme-border/30 p-2" aria-label="Switch theme">
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
      {currentThemeMode === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

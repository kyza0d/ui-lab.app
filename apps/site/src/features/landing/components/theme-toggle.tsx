"use client";
import { useEffect, useState } from "react";
import { themes, useApp, useThemeStorage } from "@/features/theme";
import { FaCircleHalfStroke } from "react-icons/fa6";

export const LandingThemeToggle = () => {
  const { currentThemeMode, setCurrentThemeMode, currentThemeColors, setCurrentThemeColors, isThemeInitialized } = useApp();
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

    document.documentElement.classList.add("theme-transition");

    setCurrentThemeMode(nextMode);
    setCurrentThemeColors(colors);
    applyAndPersistMode(nextMode);
    applyAndPersistColors(colors);

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 300);
  };

  const nextMode = currentThemeMode === "light" ? "dark" : "light";

  return (
    <button
      onClick={toggleTheme}
      className="z-[250] cursor-pointer rounded-xl hover:bg-theme-border/30 p-2"
      aria-label={`Switch to ${nextMode} theme`}
      title={`Current: ${currentThemeMode} → Next: ${nextMode}`}
    >
      <FaCircleHalfStroke size={15} />
    </button>
  );
};

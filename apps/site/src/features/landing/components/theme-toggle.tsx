"use client";
import { useEffect, useState } from "react";
import { themes, useApp, useThemeStorage } from "@/features/theme";
import { FaCircleHalfStroke } from "react-icons/fa6";

export const LandingThemeToggle = () => {
  const { currentThemeMode, setCurrentThemeMode, currentThemeColors, setCurrentThemeColors, isThemeInitialized } = useApp();
  const [isClient, setIsClient] = useState(false);

  const { applyAndPersistColors, applyAndPersistModeAndColors } = useThemeStorage({
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

    const startTransition = () => {
      document.documentElement.classList.add("theme-transition");
      setCurrentThemeMode(nextMode);
      setCurrentThemeColors(colors);
      applyAndPersistModeAndColors(nextMode, colors);

      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 300);
    };

    if (document.startViewTransition && typeof document.startViewTransition === "function") {
      document.startViewTransition(startTransition);
    } else {
      startTransition();
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="z-[250] cursor-pointer rounded-xl hover:bg-theme-border/30 p-2"
      aria-label="Toggle theme"
    >
      <FaCircleHalfStroke size={15} />
    </button>
  );
};

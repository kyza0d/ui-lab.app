"use client";
import { themes, useApp, useThemeStorage } from "@/features/theme";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { Button, Tooltip } from "ui-lab-components";

export const LandingThemeToggle = () => {
  const { currentThemeMode, setCurrentThemeMode, currentThemeColors, setCurrentThemeColors } = useApp();

  const { applyAndPersistModeAndColors } = useThemeStorage({
    onColorsChange: setCurrentThemeColors,
    onModeChange: setCurrentThemeMode,
    currentThemeMode,
  });

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
    <div suppressHydrationWarning>
      <Tooltip showArrow content="Toggle Theme" position="bottom" hint="d">
        <Button
          variant="ghost"
          aria-label="Toggle theme"
          className="p-2 hover:text-foreground-300 transition-colors text-foreground-300"
          onClick={toggleTheme}
        >
          <FaCircleHalfStroke size={15} />
        </Button>
      </Tooltip>
    </div>
  );
};

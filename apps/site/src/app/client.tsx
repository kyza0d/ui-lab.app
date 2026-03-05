'use client';

import { useEffect } from "react";
import { AppProvider, useApp, useThemeStorage, themes } from "@/features/theme";
import { ChatProvider, useChat } from "@/features/chat";

function KeyboardShortcuts() {
  const { toggleChat } = useChat();
  const { isSettingsPanelOpen, setIsSettingsPanelOpen, currentThemeMode, currentThemeColors, setCurrentThemeMode, setCurrentThemeColors } = useApp();
  const { applyAndPersistModeAndColors } = useThemeStorage({
    onColorsChange: setCurrentThemeColors,
    onModeChange: setCurrentThemeMode,
    currentThemeMode,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) return;

      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        toggleChat();
        return;
      }

      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (e.key === "d" || e.key === "D") {
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
          return;
        }
        if (e.key === "t" || e.key === "T") {
          setIsSettingsPanelOpen(!isSettingsPanelOpen);
          return;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleChat, isSettingsPanelOpen, setIsSettingsPanelOpen, currentThemeMode, currentThemeColors, setCurrentThemeMode, setCurrentThemeColors, applyAndPersistModeAndColors]);

  return null;
}

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <ChatProvider>
        <KeyboardShortcuts />
        {children}
      </ChatProvider>
    </AppProvider>
  );
}

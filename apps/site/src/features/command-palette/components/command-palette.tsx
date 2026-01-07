"use client";

import { Command } from "ui-lab-components";
import { useApp } from "@/features/theme";
import { useCommands } from "../hooks/use-commands";

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, currentThemeMode, setCurrentThemeMode } = useApp();
  const commands = useCommands({ currentThemeMode, setCurrentThemeMode });

  return (
    <Command
      open={isCommandPaletteOpen}
      onOpenChange={setIsCommandPaletteOpen}
      commands={commands}
      placeholder="Search commands, components, docs..."
      showCategories={true}
    />
  );
}
